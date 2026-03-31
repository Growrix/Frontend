# PART 3 — Tenant Lifecycle & Account Architecture

> **Scope**: Org/workspace modeling, seat management, onboarding flows, suspension, offboarding, and account deletion.
>
> **Not covered here**: Auth provider setup (see STACK_PROFILES/architecture/auth-architecture), RBAC policy rules (see STACK_PROFILES/security/authorization-rules), tenant isolation at the data layer (see PART-01 §1.3).

---

## 3.1 Account / Org / Workspace Model

### Purpose

Every SaaS needs a clear hierarchy for who owns data, who can access it, and how billing is scoped. Getting this wrong early forces a painful migration later.

### MUST Rules

1. **MUST define the account hierarchy before building features.** Choose one model and document it:

| Model | Structure | Best For |
|---|---|---|
| **Single-user** | User → owns data directly | Developer tools, personal productivity |
| **Team** | User → belongs to Team → Team owns data | Small-team collaboration tools |
| **Organization** | User → belongs to Org → Org has Workspaces → Workspace owns data | Enterprise SaaS, multi-product |

2. **MUST separate the user identity from the org membership.** A `User` is an authentication identity. A `Member` (or `OrgMember`) is a role-bearing relationship between a User and an Org. One user can belong to multiple orgs.
3. **MUST scope all product data to the billing entity.** If billing is per-org, data belongs to the org. If billing is per-workspace, data belongs to the workspace. This determines `tenantId` everywhere.
4. **MUST define the invitation model.**
   - Invited users receive an email with a secure, time-limited token.
   - Invitation records store: inviter, invitee email, role, org/workspace, status (pending/accepted/expired), and expiry timestamp.
   - Accepting an invite links the User to the Org/Workspace with the specified role.

### MUST NOT Rules

1. **MUST NOT allow a user to exist without at least one org** (in team/org models). On signup, auto-create a personal org or require org creation in onboarding.
2. **MUST NOT hardcode role definitions.** Roles are data (stored in a config table or constant file), not scattered if-statements.
3. **MUST NOT allow org/workspace deletion without confirming active subscriptions are canceled.** Billing must be settled before account destruction.

### Default Data Model

```
User
  id, email, name, avatar, authProviderId, createdAt

OrgMember
  id, userId, orgId, role (owner|admin|member|viewer), joinedAt, invitedBy

Organization
  id, name, slug, stripeCustomerId, plan, subscriptionStatus, createdAt

Workspace (optional — only if your product needs sub-org scoping)
  id, orgId, name, slug, createdAt

Invitation
  id, orgId, workspaceId?, email, role, invitedBy, token, status, expiresAt
```

### Account Creation Provisioning Checklist

When a new org is created, the system MUST:
1. Create the `Organization` record
2. Create the `OrgMember` record linking the creator as `owner`
3. Create a Stripe Customer and store `stripeCustomerId`
4. If workspace model: create a default workspace
5. Apply the default plan (free tier)
6. Emit `OrgCreated` domain event
7. Start onboarding flow (see §3.3)

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **User = Tenant** — billing, data, and identity all on the user record | Cannot support teams, invitations, or shared workspaces |
| **Implicit membership** — user is assumed to belong to "their" org | Breaks when a user is invited to a second org |
| **No personal org** — user has no org until they create one | Orphaned user state; what does the app show? |
| **Flat roles** — single `isAdmin` boolean | Cannot support nuanced permissions; every permission expansion requires a migration |

### Checklist

- [ ] Account hierarchy documented (single-user / team / org / workspace)
- [ ] User identity is separated from org membership
- [ ] Data scoped to billing entity (org or workspace)
- [ ] Invitation model with time-limited tokens
- [ ] Roles defined as structured data
- [ ] Provisioning checklist executed on new org creation
- [ ] Stripe Customer linked at org creation time

---

## 3.2 Seat Management

### Purpose

Seat management controls how many users can belong to a paid org and integrates with per-seat billing.

### MUST Rules

1. **MUST enforce seat limits before accepting new members.** When a user is invited, check: `currentMembers + pendingInvites < seatLimit`.
2. **MUST reserve seats for pending invitations.** An unanswered invite still occupies a seat to prevent over-allocation.
3. **MUST sync seat count with Stripe.** When members are added or removed, update `subscription.quantity` in Stripe.
4. **MUST define what happens when the last owner leaves.** Options: transfer ownership (mandatory before leaving), or prevent the action.

### MUST NOT Rules

1. **MUST NOT allow removing the last owner.** Every org must have at least one owner at all times.
2. **MUST NOT silently increase seat count without billing impact.** Each seat addition that exceeds the plan limit must trigger a billing update or a block.
3. **MUST NOT count deactivated members toward seat limits.** Only active members and pending invites consume seats.

### Seat Lifecycle

```
Invite sent (seat reserved)
  → Invite accepted (member active, seat confirmed)
  → Invite expired (seat released)
  → Invite revoked (seat released)

Member active
  → Member deactivated (seat released, access removed, data retained)
  → Member removed (seat released, membership deleted)

Deactivated member
  → Reactivated (seat re-consumed)
  → Removed (membership deleted)
```

### Deactivation vs Removal vs Transfer

| Action | Data Impact | Seat Impact | Reversible |
|---|---|---|---|
| **Deactivate** | Keep member record, revoke access | Release seat | Yes (reactivate) |
| **Remove** | Delete membership (not user's global data) | Release seat | No (must re-invite) |
| **Transfer** | Reassign ownership of resources to another member | No change | Partial |

**Default**: Prefer deactivation over removal. It preserves audit trail and attribution.

### Checklist

- [ ] Seat limit enforced at invitation time (members + pending invites)
- [ ] Pending invites reserved in seat count
- [ ] Seat quantity synced to Stripe on every change
- [ ] Last owner cannot be removed or deactivated
- [ ] Deactivated members do not count toward seat limits
- [ ] Deactivation preferred over removal

---

## 3.3 Onboarding State Machine

### Purpose

Onboarding gates users until they complete critical setup steps. A clear state machine prevents half-configured accounts from accessing the product.

### MUST Rules

1. **MUST model onboarding as explicit sequential steps.** Each step has a name, status (pending / complete / skipped), and completion criteria.
2. **MUST make onboarding resumable.** If a user closes the browser mid-onboarding, they return to the same step, not back to the start.
3. **MUST gate product access on onboarding completion.** Incomplete onboarding redirects to the onboarding flow. The product shell is not accessible until the minimum required steps are done.
4. **MUST emit analytics events for each onboarding step** (see PART-14).

### Default Onboarding Flow

```
Step 1: Complete profile (name, avatar — optional fields skippable)
  → Step 2: Create or join org
    → Step 3: Invite team members (skippable)
      → Step 4: First meaningful action (create first project, connect integration, etc.)
        → Onboarding complete → full product access
```

### Onboarding State Model

```typescript
interface OnboardingState {
  userId: string;
  orgId: string;
  steps: {
    profile: "pending" | "completed" | "skipped";
    org_setup: "pending" | "completed";
    invite_team: "pending" | "completed" | "skipped";
    first_action: "pending" | "completed";
  };
  completedAt: string | null;  // ISO timestamp when all required steps done
}
```

### MUST NOT Rules

1. **MUST NOT allow skipping required steps.** Define which steps are required vs optional. Required steps block progress.
2. **MUST NOT show the full product with a "complete your setup" banner as the only gate.** Banners are ignored. Use actual route-level redirect.
3. **MUST NOT reset onboarding state on page refresh or logout/login.**

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **No onboarding gate** — user enters an empty product with no guidance | Zero activation; users leave confused |
| **Linear-only flow** — user can't go back to a previous step | Frustrating UX; users abandon when they realize they made a mistake |
| **One-shot onboarding** — no way to resume | Users who are interrupted start over or never complete |
| **Banner-only gate** — "you still need to set up X" | Users dismiss banners and then hit errors because setup isn't complete |

### Checklist

- [ ] Onboarding steps defined with name, status, and required/optional flag
- [ ] Onboarding state persisted in DB (not session/cookie)
- [ ] Product access gated until required steps complete
- [ ] Onboarding is resumable across sessions
- [ ] Analytics events emitted per step
- [ ] Users can navigate back to previous steps

---

## 3.4 Suspension & Offboarding

### Purpose

Accounts don't live forever. Suspension (temporary restriction) and offboarding (permanent departure) must be explicit, safe, and auditable.

### Suspension

#### Triggers

| Trigger | Automated? | Behavior |
|---|---|---|
| Payment failure (past_due → canceled) | Yes | Grace period, then restriction |
| Abuse/ToS violation | Manual (admin) | Immediate restriction |
| Admin action (maintenance, investigation) | Manual | Severity-dependent |

#### Suspended State Rules

**MUST** define suspended-state behavior explicitly:

| Approach | When to Use |
|---|---|
| **Read-only** | Payment failure suspension — let users see their data but not create/modify |
| **Full lockout** | Abuse suspension — redirect all routes to a "your account is suspended" page |
| **Grace period** | Payment failure — full access for N days, then read-only, then lockout |

**MUST** show a clear banner explaining the suspension reason and how to resolve it. **MUST** log all suspension actions (who, when, why, what type).

### Offboarding (Account Deletion)

#### Deletion Flow

```
User requests account deletion
  → Confirm via email (click link to verify intent)
    → Soft delete: mark org as "deletion_pending", set deletion_scheduled_at
      → Grace period (30 days recommended)
        → During grace period: user can cancel deletion and reactivate
          → After grace period: hard delete job runs
            → Hard delete: remove all org data, anonymize user data in audit logs
              → Propagate deletion to third-party services (Stripe customer, email lists)
                → Emit OrgDeleted event
```

#### MUST Rules

1. **MUST require email confirmation for account deletion.** Protect against accidental or unauthorized deletion.
2. **MUST implement a grace period** (minimum 14 days, recommended 30 days). Allow reactivation during grace period.
3. **MUST cancel all active subscriptions before hard delete.** No orphaned Stripe subscriptions.
4. **MUST provide data export before deletion** (GDPR Article 20). JSON or CSV format. Include all user-generated content.
5. **MUST propagate deletion to third-party services.** Delete or anonymize data in: Stripe, analytics, email providers, file storage, and any other external system.
6. **MUST keep audit logs after deletion** but anonymize PII within them (replace user identifiers with "deleted-user-{hash}").

#### MUST NOT Rules

1. **MUST NOT hard-delete immediately on request.** Always use soft-delete + grace period.
2. **MUST NOT leave orphaned data in third-party services.** Deletion must cascade to external systems.
3. **MUST NOT retain PII after hard delete.** Only anonymized audit records remain.

### Data Retention After Cancellation

| Data Category | Retention After Cancellation | Retention After Account Deletion |
|---|---|---|
| Subscription/billing records | Keep for accounting/tax (7 years) | Anonymize tenant identifiers |
| User-generated content | Keep until deletion requested | Delete on hard delete |
| Audit logs | Keep (anonymize PII on hard delete) | Keep (anonymized) |
| Usage/analytics data | Keep (aggregated/anonymized) | Keep (anonymized) |
| Authentication data | Delete access, keep audit trail | Delete account, keep anonymized trail |

### Checklist

- [ ] Suspension triggers documented (automated + manual)
- [ ] Suspended state behavior defined (read-only, lockout, or grace)
- [ ] Suspension banner shows reason and resolution path
- [ ] Deletion requires email confirmation
- [ ] Soft delete with grace period (≥14 days)
- [ ] Reactivation possible during grace period
- [ ] Subscriptions canceled before hard delete
- [ ] Data export provided before deletion completes
- [ ] Deletion propagated to all third-party services
- [ ] PII removed from all records after hard delete
- [ ] Anonymized audit logs retained
