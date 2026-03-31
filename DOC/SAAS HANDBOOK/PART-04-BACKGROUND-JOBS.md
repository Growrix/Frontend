# PART 4 — Background Jobs & Async Architecture

> **Scope**: Job system design, queue patterns, retry/failure strategy, idempotency enforcement, and job observability.
>
> **Not covered here**: CI/CD pipelines (see STACK_PROFILES/devops/ci-cd-pipelines), scheduled deployments (see STACK_PROFILES/devops/deployment-guidelines), general logging/monitoring (see STACK_PROFILES/devops/logging and monitoring).

---

## 4.1 Job System Design

### Purpose

Most SaaS features need work that doesn't belong in the request-response cycle: sending emails, processing webhooks, generating reports, syncing external data, running cleanup tasks. A well-designed job system is the backbone of a reliable SaaS product.

### MUST Rules

1. **MUST use a dedicated job runner.** Don't use `setTimeout` or in-process scheduling for production workloads. Use a persistent, durable job queue.
2. **MUST persist job payloads.** Jobs survive process restarts. If the server dies mid-execution, the job is retried.
3. **MUST type and validate job payloads.** Every job has a typed interface for its payload. Validate at enqueue time and at execution time.
4. **MUST assign each job a unique ID.** Used for deduplication, tracing, and debugging.
5. **MUST set a timeout for every job.** No job runs indefinitely. Default: 30 seconds. Long-running jobs: 5 minutes maximum (break into smaller jobs if longer).

### Job Runner Selection

| Runner | Strengths | Best For |
|---|---|---|
| **Inngest** | Event-driven, built-in retry/step functions, serverless-friendly | Serverless/edge deployment, event-driven workflows |
| **Trigger.dev** | TypeScript-native, long-running tasks, built-in integrations | Complex workflows with external API orchestration |
| **BullMQ** | Redis-backed, battle-tested, fine-grained control | Self-hosted, high-throughput, need low-level queue control |
| **pg-boss** | Postgres-backed, no Redis dependency | Small-to-medium scale; want to avoid Redis ops burden |

**Default recommendation**: Use the runner that matches your infrastructure. Serverless → Inngest or Trigger.dev. Self-hosted with Redis → BullMQ. Postgres-only → pg-boss.

### Job Types

| Type | Description | Example |
|---|---|---|
| **Immediate** | Enqueue and process ASAP | Send welcome email after signup |
| **Delayed** | Process after a specified delay | Send trial-ending reminder 3 days before expiry |
| **Scheduled (cron)** | Run at fixed intervals | Daily reconciliation job at 02:00 UTC |
| **Recurring** | Repeat on a schedule, tied to a specific entity | Weekly usage report per tenant |
| **Workflow** | Multi-step job with branching/retry per step | Onboarding provisioning (create org → create Stripe customer → send email) |

### Default Job Payload Contract

```typescript
interface JobPayload<T = unknown> {
  jobId: string;            // UUID — unique per enqueue
  jobType: string;          // e.g., "email.sendWelcome"
  tenantId: string;         // Tenant scope
  payload: T;               // Domain-specific data
  enqueuedAt: string;       // ISO 8601
  attempts: number;         // How many times this has been tried
  maxAttempts: number;      // Ceiling
  idempotencyKey?: string;  // For deduplication (see §4.3)
}
```

### MUST NOT Rules

1. **MUST NOT enqueue jobs with unserializable payloads.** No class instances, database connections, or circular references. Payloads must be plain JSON.
2. **MUST NOT assume job execution order.** Jobs may complete in any order. If order matters, use workflow/step patterns.
3. **MUST NOT put large blobs in job payloads.** Store the blob (file, report) in object storage and pass a reference (URL, file ID) in the payload.

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **In-process setTimeout** | Not durable; lost on restart; no retry; no observability |
| **Fire-and-forget fetch** | No error handling, no retry, no logging, no tracing |
| **Mega-job** — one job does 15 things | Partial failure is unrecoverable; impossible to retry just the failed step |
| **No payload validation** | Corrupt payloads cause cryptic errors deep in handler logic |

### Checklist

- [ ] Job runner selected and documented
- [ ] Every job type has a typed payload interface
- [ ] Payloads are validated at enqueue and execution time
- [ ] Every job has a unique ID
- [ ] Timeouts set for all job types
- [ ] Large data stored externally (passed by reference, not value)

---

## 4.2 Retry & Failure Strategy

### Purpose

Jobs fail. Networks timeout, APIs return 500s, databases lock. The retry strategy determines whether failures are temporary blips or data-losing catastrophes.

### MUST Rules

1. **MUST use exponential backoff with jitter for retries.** Prevents thundering herd on provider outages.

```
delay = min(baseDelay * 2^attempt + randomJitter, maxDelay)

Example with base=1s, max=60s:
  Attempt 1: ~1s
  Attempt 2: ~2s
  Attempt 3: ~4s
  Attempt 4: ~8s
  Attempt 5: ~16s
```

2. **MUST set max retry limits per job type.** Not all jobs deserve the same retry budget.

| Job Category | Default Max Retries | Rationale |
|---|---|---|
| Webhook processing | 5 | External source will re-send if we fail |
| Email sending | 3 | Email providers handle their own retries |
| Data sync / reconciliation | 10 | Important to eventually succeed |
| Report generation | 2 | User can manually re-trigger |
| Payment operations | 5 | Critical; but Stripe also retries |

3. **MUST route permanently failed jobs to a dead-letter queue (DLQ).** After max retries, the job lands in the DLQ for manual inspection and replay.
4. **MUST alert on DLQ entries.** Every job that reaches the DLQ triggers a notification to the engineering team.

### MUST NOT Rules

1. **MUST NOT retry non-retryable errors.** Validation failures, permission errors, and 400-class responses should fail immediately. Only retry transient errors (5xx, timeout, network).
2. **MUST NOT retry without backoff.** Immediate retries amplify outages.
3. **MUST NOT silently drop failed jobs.** Every final failure is logged, alerted, and preserved for inspection.

### Retry Decision Matrix

```
Job fails →
  Is the error transient? (5xx, timeout, network error)
    → Yes: Retry with exponential backoff
    → No: Is the error a known permanent failure? (400, 403, 404, validation)
      → Yes: Fail immediately, log error, alert if unexpected
      → No: Unknown error → Retry up to 2 times, then fail and alert
```

### Poison Message Detection

A poison message is a job that will always fail, no matter how many times you retry it.

**Signs of a poison message**:
- Same job ID fails on every attempt with the same error
- Error is a validation or deserialization failure (payload is corrupt)
- Error is a missing resource (the entity referenced in the payload was deleted)

**MUST** detect poison messages by: tracking consecutive identical failures for the same job ID. After 2 consecutive identical errors, flag the job as "suspected poison" and route to DLQ immediately.

### Checklist

- [ ] Exponential backoff with jitter implemented
- [ ] Max retry limits set per job type
- [ ] Transient vs permanent error classification in retry logic
- [ ] Dead-letter queue configured and monitored
- [ ] Alerts on DLQ entries
- [ ] Poison message detection logic
- [ ] All final failures logged with full context

---

## 4.3 Idempotency Patterns

### Purpose

In a distributed system with retries, the same job may execute more than once. Idempotency ensures that executing a job twice produces the same result as executing it once.

### MUST Rules

1. **MUST make all jobs idempotent.** This is non-negotiable in any system with retries.
2. **MUST generate an idempotency key at enqueue time.** The key is derived from the job's semantic identity (what it does), not its execution instance.

```typescript
// Good: key based on what the job represents
idempotencyKey: `send-welcome-email:${userId}:${orgId}`

// Bad: key based on execution
idempotencyKey: `job-${uuid()}`  // Different every time → no dedup
```

3. **MUST check the idempotency key before executing side effects.** Before sending an email, calling Stripe, or writing to an external system, check if this key was already processed.
4. **MUST store idempotency records durably.** In the database, not in-memory. Include: key, status (processing/completed/failed), completedAt, result hash.

### MUST NOT Rules

1. **MUST NOT rely on "at-most-once" delivery.** No job system guarantees it. Always design for "at-least-once" with idempotent handling.
2. **MUST NOT use auto-increment IDs as idempotency keys.** They are different every retry.
3. **MUST NOT skip idempotency for "harmless" operations.** Even a "harmless" duplicate email annoys users and erodes trust.

### Idempotency Implementation Pattern

```typescript
async function executeJob(job: JobPayload) {
  const key = job.idempotencyKey;

  // 1. Check if already processed
  const existing = await idempotencyStore.get(key);
  if (existing?.status === "completed") {
    logger.info("Job already completed, skipping", { key });
    return existing.result;
  }

  // 2. Claim the key (prevent concurrent execution)
  const claimed = await idempotencyStore.claim(key); // atomic upsert
  if (!claimed) {
    logger.info("Job already in progress, skipping", { key });
    return;
  }

  try {
    // 3. Execute the actual work
    const result = await doWork(job.payload);

    // 4. Mark as completed
    await idempotencyStore.complete(key, result);
    return result;
  } catch (error) {
    // 5. Release the claim so retries can try again
    await idempotencyStore.release(key);
    throw error;
  }
}
```

### Side-Effect Deduplication for External Systems

| External System | Dedup Strategy |
|---|---|
| **Email** | Idempotency key per email type + recipient + trigger entity |
| **Stripe** | Use Stripe's `idempotency_key` parameter on every mutating API call |
| **Webhook delivery** | Include delivery attempt ID; consumer deduplicates by event ID |
| **Analytics** | Accept duplicates (analytics pipelines typically deduplicate) |

### Checklist

- [ ] All jobs are idempotent
- [ ] Idempotency keys derived from semantic identity
- [ ] Idempotency records stored in database
- [ ] Key checked before any side effects
- [ ] Stripe API calls use `idempotency_key` parameter
- [ ] Email jobs dedup by type + recipient + trigger
- [ ] Concurrent execution prevented via atomic claim

---

## 4.4 Job Observability

### Purpose

If you can't see what your jobs are doing, you can't debug failures, detect degradation, or prove the system is healthy.

> **Boundary note**: General logging/monitoring standards live in STACK_PROFILES/devops/logging and monitoring. This section covers job-specific observability concerns.

### MUST Rules

1. **MUST log structured data for every job lifecycle event.**

| Event | Log Fields |
|---|---|
| **Enqueued** | jobId, jobType, tenantId, enqueuedAt |
| **Started** | jobId, jobType, tenantId, startedAt, attempt |
| **Completed** | jobId, jobType, tenantId, completedAt, durationMs |
| **Failed** | jobId, jobType, tenantId, failedAt, attempt, error message, error code |
| **Retrying** | jobId, jobType, tenantId, attempt, nextRetryAt, error message |
| **Dead-lettered** | jobId, jobType, tenantId, totalAttempts, lastError |

2. **MUST track job duration and alert on anomalies.** If a job that normally takes 2 seconds starts taking 30 seconds, something is wrong.
3. **MUST monitor queue depth.** Rising queue depth = jobs are enqueuing faster than they process. Alert when queue depth exceeds a threshold.
4. **MUST include `tenantId` and `jobId` in all job-related log entries.** Enables per-tenant debugging and job tracing.

### MUST NOT Rules

1. **MUST NOT log sensitive payload data.** Mask or omit PII, payment details, and credentials from job logs.
2. **MUST NOT rely on console.log for job observability.** Use structured logging that feeds into your observability stack.

### Key Metrics to Track

| Metric | Healthy Signal | Alert Threshold |
|---|---|---|
| Job throughput (jobs/min) | Stable, proportional to traffic | Drop >50% from baseline |
| Job error rate | < 1% | > 5% sustained over 5 minutes |
| Queue depth | Near zero in steady state | > 100 for > 10 minutes |
| P95 job duration | Within expected bounds | > 3x historical P95 |
| DLQ size | Zero | > 0 (every entry is an alert) |

### Job Dashboard Requirements

A job dashboard (whether built-in, via job runner UI, or custom) should show:
- Real-time queue depth per job type
- Job completion rate and error rate over time
- List of recently failed jobs with error messages
- DLQ contents with replay button
- Per-job-type P50/P95/P99 duration

### Checklist

- [ ] Structured logging for all job lifecycle events
- [ ] tenantId and jobId in every job-related log entry
- [ ] Duration tracking with anomaly alerting
- [ ] Queue depth monitoring with threshold alerts
- [ ] DLQ entries trigger alerts
- [ ] Sensitive data masked in logs
- [ ] Dashboard or equivalent visibility into job health
