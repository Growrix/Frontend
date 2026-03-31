# PART 10 — Rate Limiting & Abuse Prevention

> **Scope**: Rate limiting design, abuse detection, and throttling/degradation strategies.
>
> **Not covered here**: Auth security and brute-force protection for login (see STACK_PROFILES/security/auth-security), API security headers (see STACK_PROFILES/security/api-security), general OWASP protections (see STACK_PROFILES/security/OWASP-mapping).

---

## 10.1 Rate Limiting Design

### Purpose

Rate limiting protects your application from abuse, prevents resource exhaustion, and ensures fair usage across tenants. Without it, one bad actor (or one buggy integration) can degrade the product for everyone.

### MUST Rules

1. **MUST apply rate limits at multiple layers.**

| Layer | Protects Against | Implementation |
|---|---|---|
| **Edge / CDN** | DDoS, volumetric attacks | Cloudflare/CloudFront rate limiting rules |
| **API gateway / middleware** | Abusive API consumers, bot traffic | Application middleware (per-route limits) |
| **Per-action** | Expensive operations (report generation, bulk export) | Business logic layer |

2. **MUST choose the right algorithm for each use case.**

| Algorithm | How It Works | Best For |
|---|---|---|
| **Fixed window** | Count requests in time windows (e.g., 100/minute) | Simple, predictable limits |
| **Sliding window** | Rolling count over the last N seconds | Smoother enforcement, no burst at window boundary |
| **Token bucket** | Tokens replenish at a fixed rate; each request consumes one | Allowing controlled bursts while enforcing average rate |
| **Leaky bucket** | Requests queue and process at a fixed rate | Smoothing traffic to downstream services |

**Default recommendation**: Sliding window for API endpoints. Token bucket for integrations that need burst tolerance.

3. **MUST key rate limits appropriately.**

| Key | When to Use |
|---|---|
| **By authenticated user** | Default for logged-in API calls |
| **By tenant** | Tenant-level limits (total API calls per org) |
| **By IP address** | Unauthenticated endpoints (login, signup, public API) |
| **By API key** | External API consumers |
| **Composite** (user + action) | Per-action limits (e.g., max 5 report generations per user per hour) |

4. **MUST return standard rate limit headers on every rate-limited endpoint.**

```
X-RateLimit-Limit: 100        # Max requests in the current window
X-RateLimit-Remaining: 42     # Requests remaining
X-RateLimit-Reset: 1711950000 # Unix timestamp when the window resets
Retry-After: 30               # Seconds to wait (when rate limited)
```

5. **MUST return `429 Too Many Requests` with a clear error message when a limit is hit.**

```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please retry after 30 seconds.",
  "retryAfter": 30
}
```

### MUST NOT Rules

1. **MUST NOT apply the same rate limit to all endpoints.** Read endpoints can be more generous than write endpoints. Expensive operations need tighter limits.
2. **MUST NOT rate-limit by IP alone for authenticated traffic.** Multiple users behind a NAT share one IP. Rate-limit by user/tenant for authenticated requests.
3. **MUST NOT silently drop requests.** Always return a `429` response so the client knows what happened and when to retry.

### Default Rate Limits (Starting Point)

| Endpoint Category | Default Limit | Key |
|---|---|---|
| General API (authenticated) | 100 req/min | Per user |
| Login / signup | 10 req/min | Per IP |
| Password reset | 5 req/hour | Per IP |
| File upload | 20 req/min | Per user |
| Report generation | 5 req/hour | Per user |
| Webhook delivery (outbound) | 100 req/min | Per tenant |
| Public API (API key) | 1000 req/hour | Per API key |

### Checklist

- [ ] Rate limits at edge, middleware, and per-action layers
- [ ] Algorithm chosen per use case (sliding window or token bucket)
- [ ] Rate limit keys appropriate to the context (user, tenant, IP, API key)
- [ ] Standard rate limit headers on every response
- [ ] 429 response with clear message and Retry-After
- [ ] Different limits for different endpoint categories
- [ ] Limits documented in API documentation

---

## 10.2 Abuse Patterns

### Purpose

Rate limiting stops volumetric abuse. Pattern detection stops intelligent abuse — attacks that stay under rate limits but are clearly malicious.

### MUST Rules

1. **MUST detect credential stuffing attempts.** Signals: multiple failed logins from the same IP to different accounts. Action: Temporarily block the IP, require CAPTCHA.
2. **MUST detect enumeration attacks.** Signals: sequential or patterned requests to check if emails/usernames exist (e.g., hitting the password reset endpoint for many emails). Action: Return identical responses for existing and non-existing accounts; throttle the endpoint.
3. **MUST detect scraping.** Signals: high-frequency requests to list/search endpoints, especially with pagination. Action: Tighten rate limits on list endpoints for suspicious traffic patterns.
4. **MUST detect webhook replay attacks.** Signals: previously-seen webhook event IDs resubmitted. Action: Reject (idempotency check, see PART-05 §5.3).

### Response Strategy

| Abuse Type | Automated Response | Escalation |
|---|---|---|
| Credential stuffing | CAPTCHA after 5 failures, IP block after 20 | Alert security team |
| Enumeration | Uniform responses + throttle | Alert if sustained |
| Scraping | Tighter rate limits + CAPTCHA | IP ban if persistent |
| Webhook replay | Reject duplicate events | Log and alert |
| Account creation spam | CAPTCHA on signup, email verification | Block IP ranges if systematic |

### MUST NOT Rules

1. **MUST NOT reveal whether an account exists in error messages.** "Invalid email or password" — never "user not found" vs "wrong password."
2. **MUST NOT permanently block IPs without manual review.** Temporary blocks (1 hour) are automated. Permanent blocks require human decision.

### Checklist

- [ ] Credential stuffing detection with CAPTCHA/IP blocking
- [ ] Enumeration attack mitigation (uniform error responses)
- [ ] Scraping detection on list/search endpoints
- [ ] Webhook replay rejection via idempotency
- [ ] Signup spam prevention (CAPTCHA + email verification)
- [ ] No account existence leakage in error messages
- [ ] Temporary blocks automated; permanent blocks manual

---

## 10.3 Throttling & Graceful Degradation

### Purpose

When a tenant or user approaches limits, the experience should degrade gracefully rather than cliff-edge into hard errors.

### MUST Rules

1. **MUST distinguish between soft limits and hard limits.**

| Type | Behavior | Example |
|---|---|---|
| **Soft limit** | Warn the user; allow the request | "You've used 80% of your monthly API quota" |
| **Hard limit** | Block the request; return 429 | "Monthly API quota exceeded. Upgrade or wait." |

2. **MUST implement per-plan rate limit tiers.** Different plans get different limits.

```typescript
const PLAN_RATE_LIMITS = {
  free:       { apiCallsPerHour: 100,  reportsPerDay: 5  },
  pro:        { apiCallsPerHour: 1000, reportsPerDay: 50 },
  enterprise: { apiCallsPerHour: 10000, reportsPerDay: 500 },
};
```

3. **MUST queue expensive operations when under load** rather than rejecting them. If a user requests a report and the generation queue is full, return "your report is queued" instead of an error. Process when capacity is available.
4. **MUST show clear user-facing messages when rate limited.**

| State | Client-Side Behavior |
|---|---|
| Approaching soft limit | Show warning banner with current usage |
| Hard limit hit | Show error with: what limit was hit, what plan they're on, how to upgrade or when it resets |
| Queued operation | Show "processing" state with estimated time |

### MUST NOT Rules

1. **MUST NOT punish legitimate high-usage customers the same as abusers.** Enterprise tenants with higher limits should not see rate limiting designed for free-tier abuse prevention.
2. **MUST NOT hide rate limit info from users.** Usage dashboards should show current consumption against plan limits.

### Checklist

- [ ] Soft and hard limits differentiated
- [ ] Per-plan rate limit tiers implemented
- [ ] Expensive operations queued rather than rejected
- [ ] Clear user-facing messaging for all limit states
- [ ] Usage dashboard shows consumption against limits
- [ ] Enterprise plans have higher limits than free/pro
