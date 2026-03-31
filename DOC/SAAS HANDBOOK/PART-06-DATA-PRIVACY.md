# PART 6 — Data Privacy & Compliance

> **Scope**: PII classification, data retention/deletion policies, right to erasure, consent management, and audit logging.
>
> **Not covered here**: Encryption-at-rest and in-transit mechanics (see STACK_PROFILES/security/data-protection), general auth security (see STACK_PROFILES/security/auth-security), secrets management (see STACK_PROFILES/security/secrets-management).

---

## 6.1 PII Classification

### Purpose

You cannot protect data you haven't classified. Every field that touches personal information needs an explicit sensitivity level and handling rule.

### MUST Rules

1. **MUST classify every database field that stores personal data.** Maintain a PII registry (spreadsheet, markdown table, or structured config) that lists every PII field, its sensitivity tier, and its handling rule.
2. **MUST apply sensitivity tiers.**

| Tier | Definition | Examples | Handling |
|---|---|---|---|
| **Public** | Intentionally visible to other users | Display name, avatar, public bio | No special handling |
| **Internal** | Visible to the org but not outside | Email, role, team membership | Access-controlled; logged access |
| **Confidential** | Visible only to the user + authorized admins | Phone number, address, billing info | Encrypted at rest; masked in logs |
| **Restricted** | Maximum protection; regulatory impact | SSN, government ID, payment card data (if handled) | Encrypted at rest + in transit; never logged; access audited; retention minimized |

3. **MUST define per-field handling rules.**

| Handling Rule | When to Apply |
|---|---|
| **Encrypt** | Confidential/Restricted fields at rest |
| **Hash** | Passwords, tokens (irreversible storage) |
| **Mask** | In logs, error messages, and admin views (show last 4 chars) |
| **Redact** | In analytics, exports, and non-essential displays |
| **Omit** | Never include in logs, webhooks, or external API payloads |

4. **MUST review PII classification when adding new fields or entities.** Every schema change PR that adds a field with potential PII must update the PII registry.

### MUST NOT Rules

1. **MUST NOT log Confidential or Restricted fields in plaintext.** Mask or omit before writing to any log.
2. **MUST NOT include PII in error tracking payloads** (Sentry, LogRocket, etc.) without redaction.
3. **MUST NOT store Restricted-tier data unless legally required.** Minimize collection: if you don't need it, don't store it.

### Default PII Registry Template

```markdown
| Table | Column | PII Tier | Handling | Retention | Deletion Behavior |
|-------|--------|----------|----------|-----------|-------------------|
| users | email | Internal | mask in logs | Account lifetime | Anonymize on delete |
| users | name | Public | none | Account lifetime | Delete on delete |
| users | phone | Confidential | encrypt, mask in logs | Account lifetime | Delete on delete |
| billing | card_last4 | Confidential | display only | 7 years (tax) | Retain anonymized |
```

### Checklist

- [ ] PII registry exists and is up to date
- [ ] Every PII field has a sensitivity tier
- [ ] Handling rules (encrypt, hash, mask, redact, omit) applied per tier
- [ ] Logs verified to not contain Confidential/Restricted data
- [ ] Error tracking sanitizes PII before transmission
- [ ] PII registry updated as part of schema change reviews

---

## 6.2 Data Retention & Deletion

### Purpose

Storing data forever is a liability, not an asset. Retention policies define how long each category of data lives and what happens when that period expires.

### MUST Rules

1. **MUST define a retention period for every data category.**

| Data Category | Default Retention | Justification |
|---|---|---|
| User-generated content | Account lifetime | User expects it to persist while they're a customer |
| Billing/invoice records | 7 years after creation | Tax and accounting compliance |
| Audit logs | 3 years | Compliance and forensics |
| Session/auth tokens | Until expiry + 30 days | Security review window |
| Analytics events | 2 years (aggregated after) | Product insights; aggregate for long-term trends |
| Temporary files/uploads | 24 hours if unattached | Clean up orphaned uploads |
| Deleted user data (soft delete) | 30 days (then hard delete) | Grace period for reactivation |

2. **MUST implement soft delete as the default.** Records are marked as deleted (e.g., `deletedAt` timestamp) rather than removed. Hard delete happens via a scheduled cleanup job after the retention period.
3. **MUST define cascading deletion rules.** When a user or org is deleted, what happens to each child entity?

| Parent Deleted | Child Entity | Behavior |
|---|---|---|
| User | OrgMember records | Remove membership |
| User | User-generated content (user is sole owner) | Soft delete → hard delete after grace |
| User | Comments/attributions in shared content | Anonymize author ("Deleted User") |
| Org | All org-scoped data | Soft delete → hard delete after grace |
| Org | Billing records | Retain (anonymized) for accounting |

4. **MUST run scheduled cleanup jobs** that hard-delete records past their retention period. These jobs are idempotent and logged (see PART-04 for job patterns).

### MUST NOT Rules

1. **MUST NOT hard-delete on user request without a grace period.** Always soft-delete first.
2. **MUST NOT retain data without a documented business or legal reason.** If you can't justify why you keep it, delete it.
3. **MUST NOT delete billing/audit records prematurely.** These have regulatory retention requirements.

### Checklist

- [ ] Retention period defined for every data category
- [ ] Soft delete implemented as default
- [ ] Cascading deletion rules documented and implemented
- [ ] Scheduled cleanup job runs for expired soft-deleted records
- [ ] Cleanup job is idempotent and logged
- [ ] No data retained without documented justification

---

## 6.3 Right to Erasure & Portability

### Purpose

GDPR Article 17 (Right to Erasure) and Article 20 (Right to Data Portability) require you to delete and export user data on request. Even if GDPR doesn't apply to your jurisdiction, implementing these flows is good practice and increasingly expected.

### Erasure (Right to be Forgotten)

#### MUST Rules

1. **MUST provide a self-service account deletion request flow** (see PART-03 §3.4 for the full deletion lifecycle).
2. **MUST propagate deletion to all third-party services** that hold the user's data.

| Service Type | Deletion Action |
|---|---|
| Payment provider (Stripe) | Delete Stripe Customer (or anonymize) |
| Email provider (Resend, Postmark) | Remove from contact lists, delete templates with PII |
| Analytics (Mixpanel, Amplitude) | Delete user profile, request data deletion via GDPR API |
| File storage (S3, R2) | Delete all user-owned files |
| Error tracking (Sentry) | Delete user-linked error reports or anonymize |

3. **MUST maintain an audit record that the deletion was requested and executed.** The record itself is anonymized (stores a hash of the deleted user's ID, not the ID itself).
4. **MUST complete erasure within 30 days of confirmed request** (GDPR requirement).

### Portability (Data Export)

#### MUST Rules

1. **MUST provide a data export in a machine-readable format.** JSON is the default. CSV is acceptable for tabular data.
2. **MUST include all user-generated content** in the export: projects, documents, settings, preferences, uploaded files.
3. **MUST NOT include other users' data** in the export, even if the requesting user can see it in the product.
4. **MUST make the export available for download** (not just emailed). Generate the export as a background job, then notify the user when it's ready.

### Default Export Process

```
User requests export
  → Enqueue export generation job
    → Job collects all user-owned data across all tables
      → Package as JSON (or ZIP with JSON + files)
        → Upload to temporary storage (signed URL, 7-day expiry)
          → Send notification with download link
            → Log export completion
```

### Checklist

- [ ] Self-service deletion request flow exists
- [ ] Deletion propagated to all third-party services
- [ ] Anonymized audit record of deletion request/execution
- [ ] Erasure completed within 30 days
- [ ] Data export in machine-readable format (JSON)
- [ ] Export includes all user-generated content only
- [ ] Export downloadable via signed URL
- [ ] Export generation is a background job

---

## 6.4 Consent & Lawful Basis

### Purpose

Collecting and processing personal data requires a lawful basis. For most SaaS, this is consent or legitimate interest, depending on the processing activity.

### MUST Rules

1. **MUST document the lawful basis for each data processing activity.**

| Processing Activity | Typical Lawful Basis |
|---|---|
| Account creation (email, name) | Contract performance (needed to provide the service) |
| Billing (payment info) | Contract performance |
| Marketing emails | Consent (explicit opt-in required) |
| Analytics tracking | Legitimate interest (with opt-out) or consent (if tracking is invasive) |
| Cookie-based tracking | Consent (cookie banner for non-essential cookies) |
| Support ticket processing | Contract performance |

2. **MUST collect explicit consent for marketing communications.** Opt-in checkbox (unchecked by default). Record: what they consented to, when, how (which form/flow), and IP address.
3. **MUST support consent withdrawal.** Users can unsubscribe from marketing at any time. Withdrawal is effective immediately. Provide an unsubscribe link in every marketing email.
4. **MUST implement cookie consent for non-essential cookies.**
   - Essential cookies (auth, session): No consent needed.
   - Analytics cookies: Consent required before loading tracking scripts.
   - Marketing cookies: Consent required before loading ad pixels.
5. **MUST store consent records.** Each consent record includes: userId, what they consented to, timestamp, source (signup form, settings page), and version of the privacy policy they agreed to.

### MUST NOT Rules

1. **MUST NOT pre-check consent boxes.** Consent must be affirmative (user takes an explicit action).
2. **MUST NOT bundle consent.** "I agree to terms AND marketing" is invalid. Separate consents for separate purposes.
3. **MUST NOT load analytics/marketing scripts before consent is given.** The scripts must not fire until the user affirmatively consents.
4. **MUST NOT treat "closing the cookie banner" as consent.** Only an explicit "Accept" or equivalent action counts.

### Checklist

- [ ] Lawful basis documented per processing activity
- [ ] Marketing consent uses opt-in (unchecked by default)
- [ ] Consent records stored with timestamp, source, and policy version
- [ ] Withdrawal supported and effective immediately
- [ ] Unsubscribe link in every marketing email
- [ ] Cookie consent implemented for non-essential cookies
- [ ] Analytics/marketing scripts blocked until consent given
- [ ] No pre-checked or bundled consent

---

## 6.5 Audit Logging

### Purpose

Audit logs answer: who did what, when, to which resource, and from where. They are essential for security investigations, compliance, and debugging.

> **Boundary note**: General application logging lives in STACK_PROFILES/devops/logging. This section covers audit-specific logging that serves compliance and security purposes.

### MUST Rules

1. **MUST log security-relevant and data-modifying actions.** Not every click — but every action that changes state or accesses sensitive data.

| Category | Actions to Log |
|---|---|
| **Authentication** | Login, logout, login failure, password change, MFA enable/disable |
| **Authorization** | Role change, permission grant/revoke |
| **Data modification** | Create, update, delete on domain entities |
| **Billing** | Subscription change, payment, refund, plan change |
| **Admin actions** | Impersonation start/end, bulk operations, manual overrides |
| **Access to sensitive data** | PII access by admins, data exports, API key generation |

2. **MUST use a structured audit log schema.**

```typescript
interface AuditLogEntry {
  id: string;              // UUID
  timestamp: string;       // ISO 8601
  actor: {
    type: "user" | "system" | "admin" | "api_key";
    id: string;            // User, system service, or API key ID
    ip?: string;           // Client IP
    userAgent?: string;    // Client user agent
  };
  tenantId: string;
  action: string;          // e.g., "subscription.updated", "member.removed"
  resource: {
    type: string;          // e.g., "subscription", "member"
    id: string;
  };
  changes?: {
    before: Record<string, unknown>;
    after: Record<string, unknown>;
  };
  metadata?: Record<string, unknown>;
}
```

3. **MUST make audit logs immutable.** Once written, audit entries can never be modified or deleted (except by the scheduled retention cleanup). Use an append-only storage strategy.
4. **MUST set a retention period for audit logs.** Default: 3 years. Adjust based on compliance requirements.
5. **MUST restrict access to audit logs.** Only admins and compliance roles can read audit data. Log who accesses the audit log itself.

### MUST NOT Rules

1. **MUST NOT store PII in audit logs without necessity.** Log user IDs, not names or emails. If names are needed for readability, mask them after the user is deleted.
2. **MUST NOT allow audit log deletion or modification via application code.** Only the scheduled retention cleanup deletes expired entries.
3. **MUST NOT skip audit logging for admin or system actions.** Admin and system actions are the most important to audit.

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **Audit in application logs** — mixed with debug and error logs | Cannot query, filter, or retain independently; gets rotated with app logs |
| **No before/after on mutations** — just "user updated project" | Useless for investigations; can't tell what changed |
| **PII in plaintext in audit logs** — full email, full name, etc. | GDPR violation when you can't delete the user's data from immutable logs |
| **No access control on audit logs** — any engineer can read them | Insider threat risk; compliance violation |

### Checklist

- [ ] Security-relevant and data-modifying actions logged
- [ ] Structured schema with actor, action, resource, changes, timestamp
- [ ] Audit logs append-only (immutable)
- [ ] Retention period defined (default: 3 years)
- [ ] Access restricted to admin/compliance roles
- [ ] PII minimized in audit entries (IDs, not names)
- [ ] Admin/system actions included in audit trail
- [ ] Audit log query/search capability available
