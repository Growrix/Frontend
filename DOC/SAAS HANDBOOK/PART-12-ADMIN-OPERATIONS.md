# PART 12 — Admin & Internal Operations

> **Scope**: Internal admin tooling rules, safe impersonation, support workflows, and bulk operation safety.
>
> **Not covered here**: RBAC/authorization rules (see STACK_PROFILES/security/authorization-rules), audit logging schema (see PART-06 §6.5), general security (see STACK_PROFILES/security).

---

## 12.1 Internal Tooling Rules

### Purpose

Every SaaS product eventually needs an internal admin interface for customer support, billing adjustments, and system maintenance. Without clear rules, admin tools become the most dangerous part of your system — they bypass normal user-facing constraints.

### MUST Rules

1. **MUST define the admin scope explicitly.** Document what admins can and cannot do.

| Admin Capability | Allowed | Requires Approval |
|---|---|---|
| View customer account details | Yes | No |
| View customer data (projects, documents) | Yes (read-only) | No |
| Modify subscription / apply credit | Yes | Yes (second admin or manager) |
| Impersonate customer | Yes (with audit, see §12.2) | No (but logged) |
| Delete customer account | Yes | Yes (manager approval) |
| Modify billing records | Yes | Yes (finance approval) |
| Execute database queries directly | **No** (use admin tools, not raw SQL) | N/A |
| Modify feature flags for a tenant | Yes | No (but logged) |
| Bulk operations (>100 records) | Yes | Yes (dry-run required first) |

2. **MUST audit every admin action.** Every action taken through admin tools is logged to the audit log (see PART-06 §6.5). The log entry must include: admin user ID, action, target resource, timestamp, and reason/ticket number.
3. **MUST require a reason or ticket number for sensitive admin actions.** Admins must provide a support ticket ID or written reason when modifying subscriptions, issuing credits, or deleting accounts. This is part of the audit record.
4. **MUST implement dry-run mode for bulk operations.** Before a bulk action executes, show a preview of what will be affected (count, sample records). Require explicit confirmation after the preview.

```
Admin clicks "Cancel all trials expired > 30 days"
  → System shows: "This will affect 47 accounts. Preview:"
    → Sample: [acme-corp, beta-inc, gamma-llc, ...]
      → Admin reviews and confirms
        → System executes and logs
```

5. **MUST separate admin authentication from customer authentication.** Admin access uses:
   - Standard authentication (same auth provider) but with an admin role
   - MFA required for all admin accounts (no exceptions)
   - Admin session timeout: 1 hour of inactivity

### MUST NOT Rules

1. **MUST NOT allow direct database access from admin tools.** All admin actions go through the application layer, which enforces validation, audit logging, and authorization.
2. **MUST NOT allow admin actions without audit logging.** If the audit system is down, admin actions must be blocked until audit logging is restored.
3. **MUST NOT allow bulk delete operations without dry-run preview.** No "delete everything matching X" without showing what will be deleted first.
4. **MUST NOT give all engineers admin access by default.** Admin access is granted per-role, not per-person. Principle of least privilege.

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **Direct DB queries as admin tool** | No audit trail, no validation, easy to corrupt data |
| **Admin actions with no reason** | Impossible to investigate why a change was made; compliance failure |
| **God-mode admin** | One compromised account destroys everything; no separation of duties |
| **Admin bypass of business rules** | Admins break invariants the product depends on (e.g., subscription status) |

### Checklist

- [ ] Admin scope documented (what admins can/cannot do)
- [ ] Every admin action audit-logged with admin ID, action, target, reason
- [ ] Reason/ticket number required for sensitive actions
- [ ] Dry-run preview for all bulk operations
- [ ] MFA required for all admin accounts
- [ ] Admin session timeout: 1 hour
- [ ] No direct database access from admin tools
- [ ] Admin access granted per-role, not per-person

---

## 12.2 Safe Impersonation

### Purpose

Impersonation allows an admin to "see the app as a specific customer." It's essential for debugging and support, but it's also the most dangerous admin capability — an impersonating admin can accidentally modify customer data.

### MUST Rules

1. **MUST restrict impersonation to designated roles.** Not all admins can impersonate. Only support leads, senior engineers, or a specific "impersonation" permission.
2. **MUST mark every action during impersonation.** The system tracks that the session is an impersonation session and tags every action (DB write, API call, event emission) with `impersonatedBy: adminUserId`.
3. **MUST log impersonation start and end.** Audit entries:
   - `admin.impersonation.started` — who, which customer, when, why
   - `admin.impersonation.ended` — when, duration
4. **MUST show a visible indicator during impersonation.** The admin UI shows a prominent banner: "You are impersonating [Customer Name]. Actions will be recorded."
5. **MUST enforce impersonation scope limits.**

| Scope | Default |
|---|---|
| **Read-only impersonation** | Recommended default — admin sees what the customer sees but cannot modify anything |
| **Full-access impersonation** | Allowed only with escalation; tagged as "write-capable" in audit log |
| **Duration limit** | Auto-expire impersonation after 30 minutes; admin can extend |

### MUST NOT Rules

1. **MUST NOT allow impersonation without an audit trail.** If audit logging fails, impersonation must be blocked.
2. **MUST NOT allow impersonation of other admin accounts.** Admin-to-admin impersonation is a privilege escalation vector.
3. **MUST NOT include impersonation sessions in the customer's activity log.** The customer should not see admin impersonation activity in their own audit/activity feed.

### Implementation Pattern

```typescript
// Starting impersonation
async function startImpersonation(adminId: string, targetUserId: string, reason: string) {
  // 1. Verify admin has impersonation permission
  await authorize(adminId, "admin.impersonate");
  
  // 2. Verify target is not an admin
  const target = await userRepo.findById(targetUserId);
  if (target.role === "admin") throw new ForbiddenError("Cannot impersonate admins");
  
  // 3. Create impersonation session
  const session = await impersonationRepo.create({
    adminId,
    targetUserId,
    targetTenantId: target.tenantId,
    reason,
    scope: "read-only", // default
    expiresAt: addMinutes(now(), 30),
  });
  
  // 4. Log
  await auditLog.write({
    action: "admin.impersonation.started",
    actor: { type: "admin", id: adminId },
    resource: { type: "user", id: targetUserId },
    metadata: { reason, scope: "read-only", sessionId: session.id },
  });
  
  return session;
}
```

### Checklist

- [ ] Impersonation restricted to designated roles/permissions
- [ ] Every action during impersonation tagged with `impersonatedBy`
- [ ] Impersonation start/end logged in audit trail
- [ ] Visible banner during impersonation
- [ ] Default scope is read-only
- [ ] Auto-expiry after 30 minutes
- [ ] Cannot impersonate other admins
- [ ] Impersonation hidden from customer's activity log

---

## 12.3 Support Operations

### Purpose

Support engineers need structured tools to resolve customer issues quickly and safely. Without structure, support becomes ad-hoc database edits and Slack threads.

### MUST Rules

1. **MUST provide a customer lookup view.** Given an email, org name, or user ID, the admin tool shows: account details, subscription status, recent activity, recent errors, and org membership.
2. **MUST define a remediation menu (not free-form actions).**

| Remediation | Flow | Authorization |
|---|---|---|
| Apply credit/discount | Enter amount + reason → confirm → credit applied via Stripe API | Support agent |
| Issue refund | Select invoice → choose full/partial → enter reason → confirm | Support lead approval |
| Extend trial | Enter new trial end date → confirm → update subscription | Support agent |
| Override plan feature | Select feature + tenant → enable temporarily → set expiry | Support lead |
| Cancel subscription on behalf | Confirm with reason → cancel via Stripe → update local DB | Support lead approval |
| Force password reset | Trigger password reset email for the user | Support agent |

3. **MUST log every support action with ticket number.** The support agent provides the ticket number (from Zendesk, Intercom, etc.) when taking any action. This links the admin audit trail to the support conversation.
4. **MUST define escalation triggers.** When a support issue requires action beyond the agent's scope:

| Trigger | Escalation To |
|---|---|
| Refund > $100 | Finance team |
| Account deletion request | Account management + legal (if GDPR) |
| Security incident (data breach, unauthorized access) | Security team + incident response (see STACK_PROFILES/operations) |
| Bug affecting multiple tenants | Engineering on-call |
| Billing dispute | Finance + account management |

### MUST NOT Rules

1. **MUST NOT allow free-form database edits as support actions.** Every support action goes through a defined remediation flow with validation and audit logging.
2. **MUST NOT allow support actions without a ticket number.** Exception: emergency actions (security incidents), which are logged with "emergency" as the reason.
3. **MUST NOT expose raw database IDs or internal system details to customers.** Support communication uses customer-facing identifiers and language.

### Checklist

- [ ] Customer lookup by email, org name, or user ID
- [ ] Remediation menu with defined actions and authorization levels
- [ ] Every action logged with ticket number
- [ ] Escalation triggers documented with routing
- [ ] No free-form database edits
- [ ] No internal identifiers exposed to customers
