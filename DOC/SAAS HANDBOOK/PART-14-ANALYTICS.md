# PART 14 — Analytics & Product Intelligence

> **Scope**: Event taxonomy design, funnel/conversion tracking, and product health metrics.
>
> **Not covered here**: Analytics tool setup (see STACK_PROFILES/seo-performance/analytics-setup), structured data for SEO (see STACK_PROFILES/seo-performance/structured-data), audit logging of system actions (see PART-06 §6.5).

---

## 14.1 Event Taxonomy Design

### Purpose

Product analytics depend on consistent, well-named events. A chaotic event taxonomy — where different engineers name events differently — produces unreliable data and broken dashboards.

### MUST Rules

1. **MUST use a consistent event naming convention.** Format: `object_action` in snake_case.

```
// Good
project_created
subscription_upgraded
report_exported
member_invited
onboarding_step_completed

// Bad
CreateProject           // PascalCase, verb-first
user clicked export     // spaces, no structure
new_sub                 // abbreviated, ambiguous
```

2. **MUST include required properties on every event.**

```typescript
interface AnalyticsEvent {
  event: string;               // e.g., "project_created"
  timestamp: string;           // ISO 8601
  userId: string;              // Authenticated user
  tenantId: string;            // Tenant scope
  sessionId: string;           // Browser/app session
  properties: Record<string, unknown>; // Event-specific data
}
```

3. **MUST validate event schemas before emission.** Use a shared event registry (TypeScript types, JSON Schema, or a validation library) that ensures each event includes all required properties.

```typescript
// Event registry (type-safe)
const EVENT_SCHEMAS = {
  project_created: z.object({
    projectId: z.string(),
    projectName: z.string(),
    templateUsed: z.boolean(),
  }),
  subscription_upgraded: z.object({
    fromPlan: z.string(),
    toPlan: z.string(),
    isAnnual: z.boolean(),
  }),
} as const;

function trackEvent<T extends keyof typeof EVENT_SCHEMAS>(
  event: T,
  properties: z.infer<typeof EVENT_SCHEMAS[T]>
) {
  EVENT_SCHEMAS[event].parse(properties); // validate
  analytics.track({ event, properties, ...getContext() });
}
```

4. **MUST document every event in an event catalog.** The catalog lists: event name, description, when it fires, required properties, and which team owns it.

| Event | Description | Fires When | Properties |
|---|---|---|---|
| `project_created` | User creates a new project | After project saved to DB | projectId, projectName, templateUsed |
| `subscription_upgraded` | Tenant upgrades plan | After Stripe confirms upgrade | fromPlan, toPlan, isAnnual |
| `onboarding_step_completed` | User completes an onboarding step | On step completion | stepName, stepIndex, totalSteps |

5. **MUST apply PII rules to analytics payloads.** Never include email addresses, names, phone numbers, or other PII in analytics events. Use IDs only.

### MUST NOT Rules

1. **MUST NOT emit analytics events with unvalidated properties.** Missing or wrong properties make the event useless for analysis.
2. **MUST NOT use analytics event names that conflict with audit log event names.** Analytics events and audit events serve different purposes. Use distinct prefixes or naming conventions if needed.
3. **MUST NOT track events on the client side only.** Critical business events (subscription change, payment, account deletion) must be tracked server-side for reliability. Client-side tracking supplements; it does not replace.

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **No naming convention** — each engineer names events however they want | Duplicates, inconsistencies, broken dashboards |
| **PII in analytics** — tracking email, name, phone | Privacy violation; must be purged from analytics provider |
| **Client-only tracking** — rely on frontend `track()` calls for business events | Ad blockers, network failures, and page exits cause data loss |
| **No event catalog** — thousands of undocumented events | No one knows what events exist, what they mean, or if they're reliable |

### Checklist

- [ ] Event naming: `object_action` in snake_case
- [ ] Required properties on every event (userId, tenantId, sessionId, timestamp)
- [ ] Event schema validation before emission
- [ ] Event catalog documented and maintained
- [ ] No PII in analytics payloads
- [ ] Critical business events tracked server-side

---

## 14.2 Funnel & Conversion Tracking

### Purpose

Funnels answer: "Where are users dropping off?" Conversion tracking answers: "How many users reach the desired outcome?" Without these, product decisions are based on guesses.

### MUST Rules

1. **MUST define critical funnels with explicit step events.**

**Signup → Activation Funnel:**
```
signup_started → signup_completed → onboarding_started → onboarding_step_completed (profile)
→ onboarding_step_completed (org_setup) → onboarding_step_completed (first_action) → activated
```

**Trial → Paid Conversion Funnel:**
```
trial_started → feature_used (first meaningful action) → checkout_started → checkout_completed
→ subscription_activated
```

**Feature Adoption Funnel** (per major feature):
```
feature_discovered (first view) → feature_tried (first interaction) → feature_adopted (used N times)
```

2. **MUST instrument every funnel step.** Each step emits a distinct event. Gaps in instrumentation make the funnel unmeasurable.
3. **MUST track attribution for acquisition.** Know where users come from:

```typescript
interface SignupEvent {
  event: "signup_completed";
  properties: {
    source: string;          // "organic", "paid_search", "referral", "direct"
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    referrer?: string;
  };
}
```

4. **MUST support experiment tracking (A/B testing).** When running experiments, every analytics event from a user in an experiment includes:
   - `experimentId`: Which experiment
   - `variantId`: Which variant the user was assigned to

```typescript
interface ExperimentContext {
  experimentId: string;
  variantId: string;         // "control" | "variant_a" | "variant_b"
  assignedAt: string;
}
```

**MUST** assign experiment variants on the server side (or from a feature flag service). **MUST NOT** assign variants on the client (can be manipulated, inconsistent across sessions).

### MUST NOT Rules

1. **MUST NOT define funnels after the fact from raw events.** Define funnels first, then instrument them. Retro-fitting funnels from inconsistent events produces unreliable data.
2. **MUST NOT track vanity metrics as primary success indicators.** Page views, total signups, and total events are informative but not actionable. Focus on conversion rates, activation rates, and retention.
3. **MUST NOT change experiment variant assignment mid-experiment.** If a user is in the control group, they stay there until the experiment ends.

### Checklist

- [ ] Signup → activation funnel defined and instrumented
- [ ] Trial → paid funnel defined and instrumented
- [ ] Feature adoption funnels for major features
- [ ] Attribution tracking on signup (source, UTM params)
- [ ] Experiment assignment server-side
- [ ] Experiment context included in analytics events
- [ ] No mid-experiment variant reassignment

---

## 14.3 Product Health Metrics

### Purpose

Product health metrics are the vital signs of your SaaS. They tell you if users are activating, retaining, adopting features, or churning — and they do it before users complain.

### MUST Rules

1. **MUST define and measure activation rate.** Activation = the moment a new user receives first value from the product. Define this moment explicitly for your product.

| Product Type | Activation Moment |
|---|---|
| Project management tool | First project created + first task completed |
| Analytics platform | First dashboard created with live data |
| Communication tool | First message sent to a team member |
| Developer tool | First successful build/deploy |

**Activation rate** = Users who activated / Users who signed up (within the first 7 days).

2. **MUST track retention cohorts.** Group users by signup week/month. Measure what percentage are still active at Day 7, Day 30, Day 90.

```
Cohort: Users who signed up in March 2026
  Day 1:  100% (by definition)
  Day 7:  65%  (65 of 100 returned)
  Day 30: 40%
  Day 90: 25%
```

A retention curve that flattens (doesn't keep dropping) indicates product-market fit for that cohort.

3. **MUST track feature adoption.** For every major feature, measure:
   - **Discovery rate**: % of active users who viewed the feature
   - **Trial rate**: % of discoverers who tried it
   - **Adoption rate**: % of trialers who used it regularly (≥3 times in 30 days)

4. **MUST identify and track churn signals.** Churn doesn't happen suddenly — users disengage before they cancel.

| Signal | Measurement | Threshold |
|---|---|---|
| Login frequency drop | Compare current week to 4-week average | >50% decrease |
| Feature usage decline | Key feature usage drop | >60% decrease week-over-week |
| Team activity collapse | No team member active in 7 days | Any org with zero activity |
| Failed payment | Invoice not paid after retries | Past_due for >7 days |
| Support ticket spike | Number of tickets from one org | >3 tickets in 7 days |

5. **MUST have a dashboard showing these metrics.** Updated daily (minimum). Accessible to product, engineering, and leadership.

### MUST NOT Rules

1. **MUST NOT use total user count as a health metric.** It always goes up. It tells you nothing about health. Use active user count (DAU, WAU, MAU).
2. **MUST NOT define "active" as "logged in."** Active = performed a meaningful action (not just visited the dashboard).
3. **MUST NOT ignore churn signals until the user cancels.** By the time they cancel, the opportunity for intervention is gone.

### Key Metrics Summary

| Metric | Formula | Healthy Range | Review Cadence |
|---|---|---|---|
| **Activation rate** | Activated / Signed up (7-day window) | > 40% | Weekly |
| **Day 7 retention** | Active on day 7 / Signed up | > 60% | Weekly (by cohort) |
| **Day 30 retention** | Active on day 30 / Signed up | > 30% | Monthly (by cohort) |
| **Trial → Paid conversion** | Paid / Trial started | > 10% | Weekly |
| **Net revenue retention** | (MRR at end - churn + expansion) / MRR at start | > 100% | Monthly |
| **Feature adoption** | Regular users / Active users | Varies by feature | Monthly |
| **Churn rate** | Canceled / Active at start of period | < 5% monthly | Monthly |

### Checklist

- [ ] Activation moment defined for the product
- [ ] Activation rate tracked with 7-day window
- [ ] Retention cohorts tracked (Day 7, 30, 90)
- [ ] Feature adoption: discovery → trial → adoption measured
- [ ] Churn signals identified and monitored
- [ ] Product health dashboard exists and updates daily
- [ ] DAU/WAU/MAU use meaningful action definition
- [ ] Key metrics reviewed at least weekly
