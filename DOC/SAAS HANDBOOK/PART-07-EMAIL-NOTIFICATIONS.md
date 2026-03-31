# PART 7 — Email & Notification Architecture

> **Scope**: Transactional email system, multi-channel notification design, in-app notifications, and email deliverability.
>
> **Not covered here**: UI component design for notification badges/modals (see HandBook_Frontend), general background job patterns (see PART-04), analytics event tracking for notifications (see PART-14).

---

## 7.1 Transactional Email System

### Purpose

Transactional emails (welcome, password reset, invoice receipt, invitation) are product features, not marketing. They must be reliable, timely, and well-structured.

### MUST Rules

1. **MUST use a dedicated transactional email provider.** Do not send production email via SMTP from your server. Use a provider: Resend, Postmark, or Amazon SES.

| Provider | Strengths | Best For |
|---|---|---|
| **Resend** | Developer-friendly API, React Email templates | Modern dev teams, JSX-based templates |
| **Postmark** | Best deliverability reputation, dedicated transactional focus | Products where email is critical (invoices, auth) |
| **Amazon SES** | Lowest cost at scale, full AWS integration | High volume, cost-sensitive, already on AWS |

2. **MUST manage email templates in code, not in the provider's UI.** Templates are version-controlled, reviewed in PRs, and deployed with the application.
3. **MUST define a typed interface for every email template.**

```typescript
interface WelcomeEmailParams {
  recipientEmail: string;
  recipientName: string;
  orgName: string;
  loginUrl: string;
}

interface InvitationEmailParams {
  recipientEmail: string;
  inviterName: string;
  orgName: string;
  inviteUrl: string;
  expiresAt: string;
}
```

4. **MUST send emails via domain events and background jobs, not inline.** The pattern: domain event → email job enqueued → job sends email.

```
User signs up
  → Emit UserCreated event
    → Event handler enqueues SendWelcomeEmail job
      → Job calls email adapter with typed params
        → Email adapter sends via provider
```

5. **MUST use a consistent "from" address and display name.** Example: `"Acme App" <notifications@acme.com>`. Configure per email type if needed (support@, billing@).

### MUST NOT Rules

1. **MUST NOT send email synchronously in API request handlers.** A slow email provider call blocks the user's request.
2. **MUST NOT use personal email addresses as senders.** Always use a domain you own and have configured for sending.
3. **MUST NOT send email without an unsubscribe mechanism** (for marketing; transactional email like password reset is exempt).

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **Inline sending** — email sent in the API handler | Timeout risk; user's action fails if email provider is slow |
| **Provider-managed templates** — edit templates in Mailchimp/SendGrid UI | No version control, no PR review, drift between environments |
| **Untyped params** — generic `data: any` passed to templates | Missing variables cause broken emails in production |
| **One "from" for everything** — noreply@acme.com for all email | Users can't reply to support-related emails; looks spammy |

### Checklist

- [ ] Dedicated transactional email provider integrated
- [ ] Templates managed in code (version-controlled)
- [ ] Every template has a typed parameter interface
- [ ] Email sent via event → job → adapter (never inline)
- [ ] Consistent "from" address configured per email type
- [ ] No synchronous email sending in API handlers

---

## 7.2 Notification Channels

### Purpose

Users expect to be notified through multiple channels. A notification system needs a central dispatcher that routes events to the right channels based on user preferences.

### MUST Rules

1. **MUST define a channel taxonomy.**

| Channel | Use For | Latency |
|---|---|---|
| **In-app** | All product notifications; primary channel | Real-time |
| **Email** | Important actions (invitations, billing, alerts); persists outside the app | Near-real-time (seconds to minutes) |
| **Push** (optional) | Mobile/desktop alerts for time-sensitive events | Real-time |
| **SMS** (optional) | Critical alerts (security, 2FA, outage) | Real-time |

2. **MUST implement per-user, per-event-type, per-channel preferences.**

```typescript
interface NotificationPreference {
  userId: string;
  eventType: string;       // e.g., "invoice.paid", "member.invited"
  channels: {
    inApp: boolean;        // Default: true
    email: boolean;        // Default: true for important events
    push: boolean;         // Default: false
    sms: boolean;          // Default: false
  };
}
```

3. **MUST respect user preferences before dispatching.** The notification dispatcher checks preferences before sending to each channel.
4. **MUST support notification batching/digest mode.** For high-frequency events, allow users to choose "immediate" vs "daily digest" vs "weekly digest."
5. **MUST provide a self-service preferences page** where users can configure which events notify them on which channels.

### MUST NOT Rules

1. **MUST NOT send to channels the user has disabled.** Preferences are mandatory, not advisory.
2. **MUST NOT send duplicate notifications on the same channel for the same event.** Idempotency in the notification dispatcher.
3. **MUST NOT require all channels for every event.** Some events are in-app only. Some are email-worthy.

### Default Notification Dispatch Flow

```
Domain Event (e.g., InvoicePaid)
  → Notification Dispatcher
    → Look up affected users
      → For each user:
        → Fetch notification preferences for this event type
          → For each enabled channel:
            → Enqueue channel-specific job (in-app write, email send, push send)
```

### Channel Fallback and Escalation

| Scenario | Behavior |
|---|---|
| User has no channel enabled for a critical event | Force in-app notification (critical events always show in-app) |
| Email delivery fails | Retry via job system (see PART-04); don't fall back to SMS automatically |
| Push delivery fails | Accept failure (push is best-effort) |

### Checklist

- [ ] Channel taxonomy defined (in-app, email, push, SMS)
- [ ] Per-user, per-event, per-channel preferences stored
- [ ] Preferences respected before dispatch
- [ ] Batching/digest mode available for high-frequency events
- [ ] Self-service preferences page
- [ ] Idempotent notification dispatch
- [ ] Critical events always appear in-app regardless of preferences

---

## 7.3 In-App Notification System

### Purpose

In-app notifications are the primary real-time communication channel within your product. They need a clear data model and consistent behavior.

### MUST Rules

1. **MUST define a notification data model.**

```typescript
interface InAppNotification {
  id: string;
  userId: string;
  tenantId: string;
  type: string;              // e.g., "member.invited", "invoice.paid"
  title: string;             // Human-readable title
  body?: string;             // Optional longer description
  actionUrl?: string;        // Where clicking the notification navigates
  category: string;          // For grouping: "billing", "team", "project"
  read: boolean;             // Default: false
  createdAt: string;         // ISO 8601
  archivedAt?: string;       // Null until archived
}
```

2. **MUST support standard actions.**

| Action | Behavior |
|---|---|
| **Mark as read** | Set `read: true`; update unread count |
| **Mark all as read** | Batch update all unread for the user |
| **Archive** | Set `archivedAt`; remove from default view; keep in "archived" view |
| **Delete** | Soft delete; remove from all views |
| **Click / Navigate** | Mark as read + navigate to `actionUrl` |

3. **MUST deliver in real-time** (or near-real-time). Users should see new notifications within seconds of the triggering event.

| Delivery Method | Pros | Cons | Recommended When |
|---|---|---|---|
| **Polling** | Simple, stateless | Latency (polling interval), wasted requests | Low notification volume; simplest to implement |
| **Server-Sent Events (SSE)** | Simple, one-way, auto-reconnect | One-way only; limited concurrent connections in older browsers | Medium volume; unidirectional updates |
| **WebSocket** | Full-duplex, lowest latency | More complex; connection management overhead | High volume; bidirectional communication needed |

**Default recommendation**: Start with polling (15-second interval). Upgrade to SSE when notification latency becomes a user complaint. Use WebSocket only when you also need real-time collaboration (see PART-13).

4. **MUST show an unread count badge.** The notification bell/icon displays the count of unread notifications. Fetch count from API (not just client state).

### MUST NOT Rules

1. **MUST NOT show stale notification counts.** The count updates on poll/push, on notification interaction, and on page focus.
2. **MUST NOT paginate the notification center into oblivion.** Show the most recent 50 notifications; load more on scroll.
3. **MUST NOT use in-app notifications as the only channel for critical events.** If the user is not logged in, they miss it. Pair with email for important events.

### Checklist

- [ ] Notification data model with id, type, title, body, actionUrl, read, createdAt
- [ ] Mark-read, mark-all-read, archive, delete actions implemented
- [ ] Real-time delivery (polling/SSE/WebSocket)
- [ ] Unread count badge on notification icon
- [ ] Count refreshes on interaction and page focus
- [ ] Critical events paired with email notification

---

## 7.4 Email Deliverability

### Purpose

Emails that land in spam are emails that don't exist. Deliverability is a technical discipline, not a hope.

### MUST Rules

1. **MUST configure SPF, DKIM, and DMARC on your sending domain.**

| Record | Purpose | Required |
|---|---|---|
| **SPF** | Declares which servers can send email from your domain | Yes |
| **DKIM** | Cryptographically signs emails to prove authenticity | Yes |
| **DMARC** | Tells receiving servers what to do with unauthenticated email | Yes (start with `p=none`, then `quarantine`, then `reject`) |

2. **MUST use a dedicated sending domain** (e.g., `mail.acme.com` or `notifications.acme.com`), separate from your primary domain. Protects your primary domain's reputation.
3. **MUST handle bounces.** Integrate with your provider's bounce webhook. On hard bounce: suppress that email address (never send again). On soft bounce: retry, then suppress after 3 consecutive soft bounces.
4. **MUST handle spam complaints.** Integrate with complaint feedback loops. On complaint: immediately unsubscribe that user from the email type that generated the complaint.
5. **MUST warm up new sending domains gradually.** Don't send 10,000 emails on day one from a new domain. Follow provider warm-up guidelines (typically ramp over 2-4 weeks).

### MUST NOT Rules

1. **MUST NOT send transactional and marketing email from the same domain/IP.** Marketing email has lower reputation; it will drag down transactional deliverability.
2. **MUST NOT continue sending to hard-bounced addresses.** This damages sender reputation.
3. **MUST NOT ignore complaint rates.** A complaint rate above 0.1% signals a deliverability problem.

### Bounce Handling Flow

```
Email sent
  → Provider attempts delivery
    → Hard bounce (address doesn't exist)
      → Add to suppression list → never send again
    → Soft bounce (mailbox full, temporary issue)
      → Retry up to 3 times
        → Still bouncing → add to suppression list
    → Complaint (user marked as spam)
      → Unsubscribe from that email type
      → Log complaint for review
```

### Checklist

- [ ] SPF, DKIM, DMARC configured and verified
- [ ] Dedicated sending domain (separate from primary)
- [ ] Bounce handling: hard bounce → suppress, soft bounce → retry then suppress
- [ ] Complaint handling: immediate unsubscribe + log
- [ ] Domain warm-up plan for new sending domains
- [ ] Transactional and marketing email on separate domains/IPs
- [ ] Complaint rate monitored (alert if >0.1%)
