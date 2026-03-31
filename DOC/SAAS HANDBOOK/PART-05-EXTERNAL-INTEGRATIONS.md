# PART 5 — External Integration Patterns

> **Scope**: Consuming third-party APIs, providing and consuming webhooks, managing synchronization boundaries with external systems.
>
> **Not covered here**: API contract design for your own APIs (see STANDARDS/API-BACKEND-RULES), Stripe-specific webhooks (see PART-02), general error handling patterns (see STACK_PROFILES/architecture/error-handling-architecture).

---

## 5.1 Third-Party API Consumption

### Purpose

Every SaaS integrates with external services (payment, email, analytics, CRM, storage). These integrations are the most common source of production incidents because you don't control the other side.

### MUST Rules

1. **MUST wrap every external SDK behind an internal adapter interface.** Your application code calls your adapter, not the SDK directly. This isolates vendor changes and enables testing.

```typescript
// Bad: direct SDK usage scattered through codebase
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({ to: user.email, subject: "Welcome" });

// Good: adapter pattern
interface EmailAdapter {
  send(params: SendEmailParams): Promise<EmailResult>;
}

class ResendEmailAdapter implements EmailAdapter {
  async send(params: SendEmailParams): Promise<EmailResult> {
    return this.client.emails.send(/* map params to Resend format */);
  }
}
```

2. **MUST set explicit timeouts on every external API call.** Default: 10 seconds. Adjust per-provider based on their documented latency.
3. **MUST implement retry with exponential backoff for transient failures.** Retry on 5xx, timeout, and network errors. Do not retry on 4xx.
4. **MUST handle rate limits.** Read `Retry-After` headers. Implement client-side throttling when approaching known limits.
5. **MUST isolate API credentials per environment.** Dev, staging, and production use separate API keys. Keys stored in environment variables or secrets manager (see STACK_PROFILES/security/secrets-management).

### MUST NOT Rules

1. **MUST NOT import external SDKs directly in domain or application layers.** SDKs live only in the infrastructure layer, behind adapters.
2. **MUST NOT retry on 4xx errors.** A `400 Bad Request` or `403 Forbidden` will not succeed on retry.
3. **MUST NOT hardcode API base URLs.** Use environment-configurable URLs for all external services (enables mocking in tests and switching between sandbox/production).

### Circuit Breaker Pattern

When an external service is consistently failing, stop calling it temporarily to avoid cascading failures and wasted resources.

```
Closed (normal operation)
  → Failure count exceeds threshold
    → Open (all calls fail-fast without reaching the service)
      → After cooldown period
        → Half-Open (allow one test call through)
          → Success → Closed
          → Failure → Open (reset cooldown)
```

**When to use**: Any external integration where sustained failure degrades your product. **Implementation**: Use a library (opossum for Node.js) or implement with a simple counter + timestamp.

**Defaults**: Failure threshold = 5 failures in 60 seconds. Cooldown = 30 seconds.

### API Key Rotation Strategy

1. Support reading from two keys simultaneously (current + previous)
2. Create the new key in the provider
3. Add the new key to your secrets configuration
4. Deploy — application now uses the new key
5. Verify new key works in production
6. Revoke the old key in the provider
7. Remove the old key from configuration

**MUST** support dual-key configuration for zero-downtime rotation.

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **Direct SDK import everywhere** | Can't swap providers; can't test without mocking SDK internals |
| **No timeout** | One slow API call blocks a request indefinitely |
| **Retry all errors** | Retrying 400s wastes time and may trigger rate limits |
| **Single API key per app** | Key rotation requires downtime or deploy coordination |
| **Trust external data** | Always validate/sanitize data from external APIs before use |

### Checklist

- [ ] Every external SDK wrapped in an adapter interface
- [ ] Adapters live in infrastructure layer only
- [ ] Explicit timeout on every external call
- [ ] Retry with backoff for transient errors only
- [ ] Rate limit handling implemented
- [ ] API keys are environment-specific
- [ ] Dual-key rotation supported
- [ ] Circuit breaker for critical external dependencies

---

## 5.2 Webhook Provider Design

### Purpose

If your SaaS allows other systems to subscribe to events (e.g., "notify me when an invoice is created"), you are a webhook provider. Reliable webhook delivery is a product feature.

### MUST Rules

1. **MUST sign webhook payloads.** Use HMAC-SHA256 with a per-subscriber secret. Include the signature in a header (e.g., `X-Webhook-Signature`).

```typescript
const signature = crypto
  .createHmac("sha256", subscriberSecret)
  .update(JSON.stringify(payload))
  .digest("hex");

// Send as header: X-Webhook-Signature: sha256={signature}
```

2. **MUST include a unique event ID and timestamp in every webhook payload.**
3. **MUST retry failed deliveries with exponential backoff.** Default: 5 retries over 24 hours.
4. **MUST track delivery status per event per subscriber.** States: pending, delivered, failed, exhausted (max retries reached).
5. **MUST allow subscribers to configure their endpoint URL and which events they subscribe to.**
6. **MUST version webhook event schemas.** Include a `version` field. Don't break consumers with payload shape changes.

### MUST NOT Rules

1. **MUST NOT send webhooks synchronously from the main request.** Enqueue a delivery job (see PART-04).
2. **MUST NOT include sensitive data (passwords, tokens, full payment details) in webhook payloads.** Send only IDs and relevant metadata; consumers fetch details via API.
3. **MUST NOT deliver to unverified endpoints.** Require subscribers to verify endpoint ownership (challenge/response or manual confirmation).

### Default Webhook Payload Shape

```json
{
  "id": "evt_abc123",
  "type": "invoice.created",
  "version": 1,
  "timestamp": "2026-04-01T12:00:00Z",
  "data": {
    "invoiceId": "inv_xyz",
    "orgId": "org_123",
    "amount": 2900,
    "currency": "usd"
  }
}
```

### Checklist

- [ ] Payloads signed with HMAC-SHA256
- [ ] Unique event ID and timestamp in every payload
- [ ] Retry with exponential backoff (5 retries over 24h)
- [ ] Delivery status tracked per event per subscriber
- [ ] Subscribers configure endpoint URL and event types
- [ ] Event schemas versioned
- [ ] Delivery is async (via job queue)
- [ ] No sensitive data in payloads
- [ ] Endpoint verification before delivery begins

---

## 5.3 Webhook Consumer Design

### Purpose

When your SaaS receives webhooks from external services (Stripe, GitHub, Twilio, etc.), the consumer must be resilient to duplicates, out-of-order delivery, and failures.

### MUST Rules

1. **MUST verify signatures on every incoming webhook.** Each provider has its own signing mechanism. Verify before processing.
2. **MUST deduplicate by event ID.** Store processed event IDs. If the same event arrives again, return `200` without reprocessing.
3. **MUST acknowledge quickly, process async.** Return `200` within seconds. Enqueue a job for actual processing.
4. **MUST handle out-of-order events.** Don't assume event A arrives before event B. Use timestamps and current state to determine if an event is still relevant.
5. **MUST alert on consumer failures.** If processing fails after retries, alert the engineering team.

### MUST NOT Rules

1. **MUST NOT trust webhook payloads without signature verification.** Unsigned webhooks are a security vulnerability (attackers can forge events).
2. **MUST NOT block the webhook response on long processing.** Providers have short timeouts (typically 5-30 seconds). If you block, they retry, causing duplicates.
3. **MUST NOT assume webhooks are the only source of truth.** Events can be lost or delayed. Supplement with periodic reconciliation (see §5.4).

### Default Consumer Flow

```
External Provider ─── POST /webhooks/{provider} ───▶ Your Endpoint
                                                       │
  1. Verify signature ─────────────────────────────────┤ (reject → 400)
  2. Extract event ID ─────────────────────────────────┤
  3. Check dedup table ────────────────────────────────┤ (exists → 200 skip)
  4. Insert event ID into dedup table ─────────────────┤
  5. Enqueue processing job ───────────────────────────┤
  6. Return 200 ───────────────────────────────────────┘
```

### Checklist

- [ ] Signature verified for every incoming webhook
- [ ] Event ID deduplication with persistent storage
- [ ] Response returned within seconds (async processing)
- [ ] Out-of-order events handled via timestamp/state check
- [ ] Processing failures retried, then alerted
- [ ] Reconciliation supplements webhook-driven state

---

## 5.4 Sync Boundaries

### Purpose

Your local database and external systems will drift. Network failures, webhook delays, and bugs all cause inconsistency. Sync boundaries define how you detect and correct drift.

### MUST Rules

1. **MUST accept eventual consistency as the operating model** for any data that exists in both your system and an external system. Document the expected staleness window per integration.
2. **MUST run reconciliation jobs for critical integrations.** A reconciliation job fetches the latest state from the external system and compares it to local state, correcting any drift.

| Priority | Reconciliation Frequency |
|---|---|
| **Critical** (billing state, subscription status) | Hourly or more frequent |
| **Important** (user profiles from auth provider) | Daily |
| **Low** (analytics, metadata) | Weekly or on-demand |

3. **MUST define conflict resolution rules per integration.**

| Conflict Type | Default Resolution |
|---|---|
| External is newer | Accept external (Stripe is source of truth for billing) |
| Local is newer | Keep local (your product data is source of truth for product state) |
| Both changed | Flag for manual review, alert engineering |

4. **MUST handle external system outages gracefully.**
   - Queue outbound calls for retry when the external system is down.
   - Serve cached/stale data for read operations during outages (with a staleness indicator if user-facing).
   - Log the outage and emit an internal event.

### MUST NOT Rules

1. **MUST NOT assume webhooks are sufficient for state sync.** Webhooks are best-effort. Always have a reconciliation fallback.
2. **MUST NOT silently overwrite local data during reconciliation without logging.** Every reconciliation correction is logged with before/after values.
3. **MUST NOT cascade reconciliation corrections into external writes without review.** If reconciliation detects a local error, fix locally. Don't push a "correction" to Stripe or another provider without human review for non-trivial cases.

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **No reconciliation** — trust webhooks completely | Drift accumulates silently; discovered only when customer complains |
| **Real-time sync expectations** — treat external data as instantly consistent | Causes race conditions and false-positive errors |
| **Bidirectional sync without conflict rules** — both sides write and overwrite | Data ping-pongs between systems; last-write-wins causes data loss |
| **Sync everything** — replicate entire external dataset locally | Expensive, slow, and most of the data is never used |

### Checklist

- [ ] Eventual consistency accepted and staleness windows documented
- [ ] Reconciliation jobs for all critical integrations
- [ ] Reconciliation frequency matches data criticality
- [ ] Conflict resolution rules defined per integration
- [ ] External outage handling: queue, cache, log
- [ ] Reconciliation corrections logged with before/after values
- [ ] No silent overwrites during reconciliation
