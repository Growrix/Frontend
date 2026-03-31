# PART 2 — Payments & Billing Engineering

> **Scope**: Billing domain modeling, payment provider integration, subscription lifecycle, webhook reconciliation, entitlements, and all billing edge cases.
>
> **Not covered here**: API contract shape (see STANDARDS/API-BACKEND-RULES), auth for billing endpoints (see STACK_PROFILES/security/auth-security), general error handling (see STACK_PROFILES/architecture/error-handling-architecture).

---

## 2.1 Billing Domain Model

### Purpose

Billing is a distinct bounded context with its own entities, lifecycle, and invariants. Treating it as "just some Stripe calls" leads to state drift, lost revenue, and unrecoverable data.

### MUST Rules

1. **MUST model billing entities explicitly in your domain.** `Product`, `Price`, `Plan`, `Subscription`, `Invoice`, and `PaymentMethod` exist as domain entities in your codebase — they are not just Stripe API responses.
2. **MUST maintain a local source of truth for subscription state.** The local DB records the current plan, status, period dates, and seat count. Stripe is the *authoritative* source, but your code reads from local DB for real-time decisions and reconciles with Stripe via webhooks.
3. **MUST define a plan state machine.** Every subscription moves through explicit states with defined transitions:

```
                    ┌──────────┐
                    │   free   │
                    └────┬─────┘
                         │ start trial
                    ┌────▼─────┐
           ┌────────│  trialing │────────┐
           │        └────┬─────┘        │ trial expires
           │ convert     │              │ (no card)
           │             │ convert      │
      ┌────▼─────┐ ┌────▼─────┐  ┌─────▼──────┐
      │  active  │ │  active  │  │  expired   │
      └────┬─────┘ └────┬─────┘  └────────────┘
           │             │
           │ payment     │ cancel
           │ fails       │
      ┌────▼─────┐ ┌────▼─────┐
      │ past_due │ │ canceled │
      └────┬─────┘ └──────────┘
           │ payment
           │ recovered
      ┌────▼─────┐
      │  active  │
      └──────────┘
```

4. **MUST distinguish between product, price, and plan.** A `Product` is what you sell (e.g., "Pro Plan"). A `Price` is a specific pricing configuration (e.g., "$29/mo" or "$290/yr"). A `Plan` is the active assignment of a price to a tenant.
5. **MUST store Stripe IDs alongside local IDs.** Every billing entity stores both `id` (local) and `stripeId` (external) for reconciliation.

### MUST NOT Rules

1. **MUST NOT read subscription state from Stripe API on every request.** Cache state locally; sync via webhooks. Stripe API calls are for mutations, not reads.
2. **MUST NOT hardcode plan names or price IDs.** Use a plan configuration table/file that maps plan slugs to Stripe price IDs. This enables price migration.
3. **MUST NOT trust client-submitted plan or price information.** The server always looks up the canonical price from its own records.

### Billing Models Decision Matrix

| Model | When to Use | Stripe Primitive |
|---|---|---|
| **Flat-rate** | Single price, all features included | `subscription` with one `price` |
| **Tiered** | Price per unit decreases at volume thresholds | `price` with `tiers` |
| **Per-seat** | Charge per team member | `subscription` with `quantity` |
| **Usage-based** | Charge for what they consume (API calls, storage) | `price` with `metered` billing |
| **Hybrid** | Base fee + usage overage | `subscription` with multiple `price` items |
| **Credits** | Prepaid balance drawn down by usage | Custom ledger + Stripe for top-up |

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **Stripe-as-database** — querying Stripe API for current plan on every page load | Rate limits, latency, single point of failure |
| **Implicit state** — no explicit state machine; status derived from multiple flags | Impossible to reason about edge cases; bugs at every transition |
| **God billing service** — one 2000-line file that handles checkout, webhooks, entitlements, invoices, refunds | Untestable, un-debuggable, un-maintainable |
| **Optimistic billing** — grant access first, charge later without handling failure | Revenue leakage; users discover they can avoid paying |

### Checklist

- [ ] Billing entities defined in domain layer with local IDs + Stripe IDs
- [ ] Plan state machine documented and enforced in code
- [ ] Local DB stores current subscription state
- [ ] Plan configuration is data-driven (not hardcoded)
- [ ] Server-side validation for all plan/price selections

---

## 2.2 Stripe Integration Architecture

### Purpose

Stripe is the payment infrastructure, not the billing logic owner. Your application owns billing decisions; Stripe executes payment operations.

### MUST Rules

1. **MUST map Stripe Customer to your user or org.** One Stripe Customer per billing entity (org or user, depending on your model). Store `stripeCustomerId` on the org/user record.
2. **MUST create Stripe Customer at org/user creation time** (or at first billing interaction). Don't wait until checkout.
3. **MUST use Checkout Sessions or Payment Elements for collecting payment info.** Never handle raw card numbers.
4. **MUST use Stripe's test mode and test clocks for all development and testing.** Never use live keys in development.
5. **MUST handle Stripe API errors with retry logic for transient failures (5xx, network) and user-facing errors for permanent failures (4xx).**

### MUST NOT Rules

1. **MUST NOT store card numbers, CVVs, or sensitive payment data.** Stripe handles PCI compliance. You store only Stripe tokens and IDs.
2. **MUST NOT call Stripe from the client side for mutations.** All subscription creation, updating, and cancellation happens server-side. The client uses Checkout Sessions or Payment Elements (Stripe's client SDK) only for payment method collection.
3. **MUST NOT log Stripe webhook payloads containing payment method details.** Filter sensitive fields before logging.

### Default Integration Architecture

```
Client                     Server                        Stripe
  │                          │                              │
  │ ── Click "Upgrade" ───▶  │                              │
  │                          │ ── Create Checkout Session ─▶ │
  │                          │ ◀── Session URL ──────────── │
  │ ◀── Redirect to URL ──  │                              │
  │                          │                              │
  │ ── Complete payment ──────────────────────────────────▶ │
  │                          │                              │
  │                          │ ◀── Webhook: checkout.session.completed
  │                          │ ── Update local DB state ──▶ │ (local)
  │                          │ ── Emit SubscriptionCreated event
  │ ◀── Redirect to success  │                              │
```

### Price Migration Strategy

When changing pricing, you have three options:

| Strategy | Description | Use When |
|---|---|---|
| **Grandfather** | Existing customers keep old price forever | You want maximum retention; can absorb revenue difference |
| **Sunset with notice** | Old price honored for N months, then auto-migrate | You need to converge pricing but want to be fair |
| **Forced upgrade** | Switch everyone to new price immediately | Regulatory or cost reasons force it; expect churn |

**MUST** announce price changes in advance (minimum 30 days for active subscriptions). **MUST** store price version metadata so you can query which customers are on which generation.

### Checklist

- [ ] Stripe Customer created and linked at org/user creation
- [ ] All payment collection uses Checkout Sessions or Payment Elements
- [ ] No raw card data touches your servers
- [ ] Stripe test mode used in development; test clocks for time-dependent tests
- [ ] Stripe API errors handled with retry for transient, user message for permanent
- [ ] Price migration strategy documented before any price change

---

## 2.3 Webhook Reconciliation System

### Purpose

Webhooks are the primary mechanism for Stripe to notify your application of async events (payment success, failure, subscription updates). Getting webhook handling wrong causes state drift between Stripe and your DB — the most common billing bug.

### MUST Rules

1. **MUST verify webhook signatures.** Every incoming webhook is verified using the Stripe webhook signing secret before processing. Reject unverified payloads with `400`.
2. **MUST enforce idempotency.** Store processed `event.id` values. If an event arrives again, skip processing and return `200`.
3. **MUST return `200` quickly, then process async.** The webhook endpoint acknowledges receipt immediately, then queues the actual processing as a background job. Stripe retries on timeout.
4. **MUST handle out-of-order events.** Don't assume `invoice.paid` arrives after `invoice.created`. Use timestamps and state checks to determine if an event is still relevant.
5. **MUST reconcile periodically.** Run a scheduled job (daily or hourly) that compares critical local state (subscription status, payment status) against Stripe's API and corrects drift.

### MUST NOT Rules

1. **MUST NOT process webhooks synchronously in the request handler** (beyond signature verification and event dedup check). Heavy logic goes to a background job.
2. **MUST NOT silently ignore webhook processing failures.** Failed webhook processing must alert and enter a dead-letter/retry queue.
3. **MUST NOT assume Stripe sends exactly one event per occurrence.** Stripe may send duplicates. Your handler must be idempotent.

### Default Webhook Processing Flow

```
Stripe ─── POST /webhooks/stripe ───▶ Webhook Endpoint
                                        │
                                        ├── 1. Verify signature → reject if invalid
                                        ├── 2. Check event.id in processed_events table
                                        │      → if exists, return 200 (skip)
                                        ├── 3. Insert event.id into processed_events
                                        ├── 4. Enqueue background job with event payload
                                        └── 5. Return 200

Background Job:
  ├── Parse event type
  ├── Route to handler (e.g., handleInvoicePaid, handleSubscriptionUpdated)
  ├── Execute handler (update local DB state, emit domain events)
  ├── On failure: retry with backoff, alert after max retries
  └── On success: mark job complete
```

### Critical Webhook Events to Handle

| Event | Action |
|---|---|
| `checkout.session.completed` | Create/activate subscription in local DB |
| `customer.subscription.updated` | Sync plan, status, period dates, quantity |
| `customer.subscription.deleted` | Mark subscription as canceled |
| `invoice.paid` | Record successful payment; clear past_due status |
| `invoice.payment_failed` | Set subscription to past_due; trigger dunning flow |
| `customer.subscription.trial_will_end` | Send trial-ending notification (3 days before) |

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **No signature verification** | Anyone can send fake webhooks to your endpoint and manipulate billing state |
| **Synchronous processing** | Slow handlers cause Stripe timeouts → Stripe retries → duplicate processing |
| **No idempotency** | Duplicate webhooks apply credits twice, send duplicate emails, corrupt state |
| **Fire-and-forget** | Failed webhook processing is never retried; state drifts silently |

### Checklist

- [ ] Webhook endpoint verifies Stripe signature
- [ ] `event.id` deduplication with persistent storage
- [ ] Webhook returns 200 before heavy processing
- [ ] Processing happens in background job
- [ ] All critical events (listed above) have handlers
- [ ] Failed processing retries with backoff and alerts after max retries
- [ ] Reconciliation job runs on schedule (daily minimum)
- [ ] Dead-letter mechanism for permanently failed events

---

## 2.4 Billing Edge Cases

### Purpose

Most billing bugs happen at transitions and edge cases, not during happy-path flows. This section defines how to handle every common edge case.

### Proration (Upgrade / Downgrade Mid-Cycle)

**MUST** use Stripe's proration behavior, not custom calculations.

| Scenario | Default Behavior |
|---|---|
| **Upgrade mid-cycle** | Prorate immediately: charge the difference for remaining days, then new price at next renewal |
| **Downgrade mid-cycle** | Apply at end of current period: customer keeps current plan until period ends, then switches |

**MUST** show the prorated amount to the user before confirming the change. Use Stripe's `upcoming invoice` preview API.

### Trial Expiration

| Strategy | When to Use |
|---|---|
| **Auto-convert** | Payment method on file → automatically start paid subscription |
| **Lock-out** | No payment method → restrict to free tier on expiry, prompt to upgrade |

**MUST** send a reminder email 3 days before trial ends (triggered by `customer.subscription.trial_will_end` webhook). **MUST** send a "trial expired" email on expiration.

### Failed Payment & Dunning

```
Payment fails
  → Stripe retries (1d, 3d, 5d — configurable in Stripe dashboard)
    → After each failure: send "update payment method" email
      → After final failure: cancel subscription
        → Set local status to "canceled" via webhook
          → Restrict access based on entitlement rules
```

**MUST** configure Stripe's Smart Retries or custom retry schedule. **MUST** provide a self-service payment method update flow. **MUST NOT** lock users out without sending at least 2 payment failure emails.

### Refunds

| Refund Type | Handling |
|---|---|
| **Full refund** | Cancel subscription, revoke access, emit `SubscriptionRefunded` event |
| **Partial refund** | Issue via Stripe API, keep subscription active, log reason |
| **Credit** | Apply as account credit in Stripe (via `customer_balance_transaction`), not a refund |

**MUST** log refund reason and approver. **MUST** emit a domain event for every refund. **MUST NOT** allow automated full refunds without human approval (minimum: amount threshold check).

### Seat-Based Pricing Changes

**MUST** update `subscription.quantity` in Stripe when seats are added/removed. **MUST** prorate seat additions immediately. **SHOULD** apply seat removal at period end (avoid surprise credits). **MUST** enforce a minimum seat count (at least 1). **MUST** check seat limits before allowing new member invitations.

### Tax Collection

**MUST** determine tax strategy before launch:
- **Stripe Tax**: Automatic calculation (recommended for most SaaS).
- **External provider** (Avalara, TaxJar): If you have complex nexus requirements.
- **Not applicable**: Only if selling to businesses in a single tax-exempt jurisdiction.

**MUST** display tax in checkout. **MUST** store tax amounts on invoice records for accounting.

### Multi-Currency

**SHOULD** present prices in the customer's local currency when possible. **MUST** use Stripe's multi-currency support (separate Price objects per currency). **MUST NOT** do client-side currency conversion.

### Checklist

- [ ] Proration preview shown to user before plan change
- [ ] Trial reminder sent 3 days before expiry
- [ ] Dunning sequence configured (at least 2 emails before cancellation)
- [ ] Self-service payment method update flow exists
- [ ] Refund flow requires reason and logs approver
- [ ] Seat quantity syncs to Stripe on member changes
- [ ] Tax strategy chosen and implemented
- [ ] Multi-currency prices use separate Stripe Price objects

---

## 2.5 Entitlement System

### Purpose

Entitlements control what features and limits each plan grants. This is the bridge between billing and product behavior.

### MUST Rules

1. **MUST define a plan-to-feature mapping as structured data.** Not scattered if-statements. A single configuration defines what each plan includes.

```typescript
// Example entitlement configuration
const PLAN_ENTITLEMENTS = {
  free: {
    maxProjects: 1,
    maxSeats: 1,
    features: ["basic_reports"],
  },
  pro: {
    maxProjects: 10,
    maxSeats: 5,
    features: ["basic_reports", "advanced_reports", "api_access"],
  },
  enterprise: {
    maxProjects: Infinity,
    maxSeats: Infinity,
    features: ["basic_reports", "advanced_reports", "api_access", "sso", "audit_log"],
  },
} as const;
```

2. **MUST check entitlements at API boundaries.** The server validates entitlements on every relevant API call. UI-side checks are for UX only — never for enforcement.
3. **MUST invalidate entitlement cache when plan changes.** On subscription update (webhook or direct), bust the cached entitlements for that tenant.
4. **MUST degrade gracefully when limits are reached.** Show a clear message and upgrade path — don't throw a generic error or silently fail.

### MUST NOT Rules

1. **MUST NOT check entitlements only in the UI.** A user can bypass UI checks via API calls. Server-side enforcement is mandatory.
2. **MUST NOT allow feature access during grace period after cancellation unless explicitly designed.** Default: immediate revocation on cancellation (access continues until period end only for active subscriptions).
3. **MUST NOT scatter plan checks across the codebase.** Use a centralized `entitlements.check(tenantId, feature)` function.

### Default Entitlement Check Pattern

```typescript
// Centralized entitlement service
class EntitlementService {
  async check(tenantId: string, feature: string): Promise<boolean> {
    const plan = await this.getPlanForTenant(tenantId); // cached
    return PLAN_ENTITLEMENTS[plan].features.includes(feature);
  }

  async checkLimit(tenantId: string, resource: string, current: number): Promise<boolean> {
    const plan = await this.getPlanForTenant(tenantId);
    const max = PLAN_ENTITLEMENTS[plan][`max${capitalize(resource)}`];
    return current < max;
  }
}

// Usage in API handler
async function createProject(req) {
  const canCreate = await entitlements.checkLimit(req.tenantId, "projects", currentCount);
  if (!canCreate) {
    throw new PlanLimitError("projects", "Upgrade to create more projects");
  }
  // ... create project
}
```

### UI-Side Entitlement Behavior

| State | UI Behavior |
|---|---|
| Feature available | Normal functionality |
| Feature not in plan | Show feature as locked with upgrade CTA |
| Limit reached | Allow viewing existing resources; block creation with limit message + upgrade CTA |
| Plan past_due | Show warning banner; allow usage (payment retry in progress) |
| Plan canceled (period not ended) | Show "access until [date]" banner; block new resource creation |
| Plan canceled (period ended) | Redirect to reactivation/upgrade flow |

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **Scattered if-checks** — `if (plan === 'pro')` throughout codebase | Impossible to audit, easy to forget, breaks on plan changes |
| **UI-only gating** — hide buttons but don't enforce server-side | Anyone with API access bypasses billing |
| **Stale entitlements** — cache not invalidated on plan change | User upgrades but can't use features until cache expires |
| **Boolean-only entitlements** — no support for numeric limits | Can't handle seat limits, project limits, storage quotas |

### Checklist

- [ ] Entitlements defined as structured configuration (not scattered code)
- [ ] Server-side enforcement on every relevant API endpoint
- [ ] Entitlement cache invalidated on plan change webhook
- [ ] Graceful degradation with upgrade CTA (not generic errors)
- [ ] UI reflects entitlement state (locked, limited, active)
- [ ] Numeric limits supported (seats, projects, storage)
- [ ] Centralized `entitlements.check()` function used everywhere
