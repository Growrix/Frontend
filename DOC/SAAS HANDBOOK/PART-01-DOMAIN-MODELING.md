# PART 1 — Domain Modeling & Bounded Contexts

> **Scope**: How to identify, name, and structure business entities, aggregates, events, and context boundaries in a SaaS product.
>
> **Not covered here**: Database schema specifics (see STACK_PROFILES/operations), API contract shape (see STANDARDS/API-BACKEND-RULES), file/folder layout (see STANDARDS/APP-STRUCTURE).

---

## 1.1 Domain Modeling Methodology

### Purpose

Domain modeling turns business requirements into a structured code architecture. Without an explicit model, every developer invents their own naming, grouping, and relationship rules — producing an inconsistent, hard-to-maintain codebase.

### MUST Rules

1. **MUST identify entities before writing code.** Every feature begins with a written list of entities, their attributes, and their relationships. This list lives in the feature plan or task spec.
2. **MUST define aggregate roots.** Each cluster of related entities has exactly one aggregate root — the entry point for all reads and writes to that cluster.
3. **MUST enforce consistency boundaries at the aggregate level.** A single database transaction may modify only one aggregate. Cross-aggregate coordination uses domain events or sagas.
4. **MUST use ubiquitous language.** Entity names, method names, and event names use the same terms the business uses. If the business says "subscription," the code says `Subscription`, not `UserPlan` or `BillingRecord`.
5. **MUST separate domain logic from infrastructure.** Domain entities and value objects contain business rules only. They do not import database clients, HTTP libraries, or framework utilities.

### MUST NOT Rules

1. **MUST NOT use generic names.** Avoid `Item`, `Record`, `Data`, `Info`, `Manager`, `Handler` as entity names. Every entity earns a domain-specific name.
2. **MUST NOT allow direct cross-aggregate writes.** If `Order` and `Inventory` are separate aggregates, an order creation does not directly decrement inventory in the same transaction. It emits an event.
3. **MUST NOT leak infrastructure into domain layer.** Domain entities do not reference `prisma`, `supabase`, `fetch`, or any I/O library.

### Default Approach

```
src/
  features/
    billing/
      domain/           ← Entities, value objects, domain events
        subscription.ts
        plan.ts
        events.ts
      application/      ← Use cases / service layer (orchestration)
        create-subscription.ts
        cancel-subscription.ts
      infrastructure/   ← DB queries, external API calls
        subscription-repo.ts
        stripe-adapter.ts
```

- **Domain layer**: Pure TypeScript classes/types. No imports from `infrastructure/`.
- **Application layer**: Orchestrates domain logic + infrastructure. Thin — it calls domain methods and repos.
- **Infrastructure layer**: Implements repo interfaces, calls databases and APIs.

### How to Identify Entities

| Step | Action | Output |
|------|--------|--------|
| 1 | List all nouns from the feature spec | Candidate entity list |
| 2 | Remove duplicates and synonyms (pick one term) | Deduplicated list |
| 3 | For each noun, ask: does it have its own identity (ID)? | Entities vs value objects |
| 4 | Group entities that always change together | Aggregates |
| 5 | Pick the root entity of each group | Aggregate roots |
| 6 | Draw relationships (1:1, 1:N, N:M) | Entity relationship map |

### How to Identify Aggregate Boundaries

An aggregate boundary is correct when:
- All invariants inside the boundary can be enforced in a single transaction.
- Deleting the root cascades cleanly to all children inside the boundary.
- No entity outside the boundary needs to be locked for the root's transactions to succeed.

If two entities are frequently modified independently, they belong in **separate** aggregates even if they are related.

### Value Objects vs Entities

| | Entity | Value Object |
|---|--------|-------------|
| Has unique ID | Yes | No |
| Identity matters | Yes (`User #42`) | No (a `Money(100, "USD")` is equal to any other `Money(100, "USD")`) |
| Mutable | Yes (lifecycle, state changes) | No (immutable; replace, don't mutate) |
| Persisted independently | Yes (own table/row) | No (embedded in parent or stored as columns) |

**Examples of value objects**: Email address, money amount, date range, address, coordinates, color code.

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **God entity** — one entity with 30+ fields that covers multiple concerns | Impossible to reason about invariants; every change risks side effects |
| **Anemic domain model** — entities are plain data bags, all logic lives in services | Business rules scatter across services, get duplicated, and contradict each other |
| **Database-driven modeling** — design entities to match table structure | Couples domain to storage; makes refactoring expensive; leaks DB concepts into business logic |
| **Shared mutable state** — multiple aggregates write to the same row | Race conditions, lost updates, and unpredictable state |

### Checklist

- [ ] Entities listed before code was written
- [ ] Each aggregate has exactly one root
- [ ] No cross-aggregate writes in a single transaction
- [ ] Ubiquitous language matches business terminology
- [ ] Domain layer has zero infrastructure imports
- [ ] Value objects are immutable
- [ ] Entity relationship diagram exists (can be in task spec, doesn't need to be formal UML)

---

## 1.2 Domain Event Design

### Purpose

Domain events decouple aggregates and enable side effects (notifications, analytics, sync jobs) without polluting the core transaction.

### MUST Rules

1. **MUST name events in past tense.** An event describes something that already happened: `SubscriptionCreated`, `InvoicePaymentFailed`, `UserInvitedToOrg`.
2. **MUST scope event names to their domain.** Prefix or namespace: `billing.SubscriptionCreated`, not just `Created`.
3. **MUST include a minimal, typed payload.** Every event carries: `eventId` (UUID), `occurredAt` (ISO timestamp), `aggregateId`, and domain-specific data.
4. **MUST make events immutable.** Once emitted, an event's payload never changes. If you need to correct data, emit a new compensating event.
5. **MUST version event schemas.** When the payload shape changes, bump the version (`v1`, `v2`) and support both during migration.

### MUST NOT Rules

1. **MUST NOT put the entire aggregate in the event payload.** Events carry only the data consumers need, not the full entity.
2. **MUST NOT use events for synchronous request-response flows.** If the caller needs an immediate answer, use a direct service call.
3. **MUST NOT rely on event ordering across aggregates.** Events from different aggregates may arrive in any order. Design consumers to be order-independent.

### Default Event Shape

```typescript
interface DomainEvent<T = unknown> {
  eventId: string;          // UUID — unique per emission
  eventType: string;        // e.g., "billing.SubscriptionCreated"
  eventVersion: number;     // Schema version (start at 1)
  occurredAt: string;       // ISO 8601 timestamp
  aggregateId: string;      // ID of the aggregate that emitted it
  tenantId: string;         // Tenant scope
  payload: T;               // Domain-specific data
}
```

### When to Use Events vs Direct Calls

| Use Domain Events When | Use Direct Service Calls When |
|---|---|
| The side effect can happen asynchronously (email, analytics, sync) | The caller needs an immediate success/failure response |
| Multiple consumers need to react to the same action | There is exactly one consumer and it's in the same bounded context |
| You want to decouple the producer from the consumer | The consumer is tightly coupled by design (same aggregate) |
| The side effect is allowed to fail independently of the main action | The side effect must succeed or the main action must rollback |

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **Fat events** — entire aggregate serialized into payload | Couples consumers to producer's internal structure; breaks when entity changes |
| **Event as command** — `CreateInvoice` event | Conflates what happened with what should happen; makes debugging confusing |
| **Invisible side effects** — events emitted but no registry of who consumes them | Impossible to trace impact of changes; phantom behaviors |

### Checklist

- [ ] All event names are past tense and domain-scoped
- [ ] Event payload has `eventId`, `occurredAt`, `aggregateId`, `tenantId`
- [ ] Events are versioned
- [ ] No full aggregate dumps in event payloads
- [ ] Event consumers are registered and discoverable
- [ ] Consumers handle missing/unknown fields gracefully (forward compatibility)

---

## 1.3 Multi-Tenant Data Architecture (Deep)

### Purpose

Multi-tenancy is the foundation of SaaS economics. Getting it wrong causes data leaks between tenants — a catastrophic security failure.

> **Boundary note**: DOC_UNIVERSAL/STANDARDS/SAAS-FOUNDATIONS covers the *decision framework* for tenancy strategy (shared DB vs schema-per-tenant vs DB-per-tenant). DOC_UNIVERSAL/STACK_PROFILES covers RLS policy syntax. This section covers the deep enforcement patterns that those documents do not.

### MUST Rules

1. **MUST propagate tenant context through the entire request lifecycle.** From auth middleware to database query to background job to event payload — `tenantId` is never lost.
2. **MUST enforce tenant isolation at the query layer.** Every database query that touches tenant data includes a tenant filter. This is true even when RLS is enabled — defense in depth.
3. **MUST test tenant isolation explicitly.** Integration tests must prove that Tenant A cannot read or write Tenant B's data.
4. **MUST include `tenantId` in all tenant-scoped database tables.** No exceptions for "small" tables.
5. **MUST scope seed data and test fixtures per tenant.** Test suites create their own tenant and seed data within it; they never rely on shared global data.

### MUST NOT Rules

1. **MUST NOT trust client-supplied tenant IDs.** Tenant context is derived from the authenticated session, never from request headers, query params, or body fields.
2. **MUST NOT use global queries without explicit justification.** Any query that does not filter by tenant must be flagged in code review and documented.
3. **MUST NOT share cache keys across tenants.** Cache keys must include `tenantId` as a prefix or segment.

### Tenant Context Propagation Pattern

```
Request → Auth Middleware (extract tenantId from session/token)
  → Store in request-scoped context (e.g., AsyncLocalStorage, request object)
    → Service layer reads tenantId from context
      → Repository layer injects tenantId into every query
        → Background jobs receive tenantId in job payload
          → Events include tenantId in event envelope
```

**Key implementation rule**: The repository/data-access layer is the enforcement boundary. It receives `tenantId` as a required parameter. There is no default — if `tenantId` is missing, the query fails.

### Tenant Isolation Verification

```typescript
// Example integration test structure
describe("Tenant Isolation", () => {
  it("Tenant A cannot read Tenant B projects", async () => {
    const tenantA = await createTestTenant();
    const tenantB = await createTestTenant();
    const project = await createProject({ tenantId: tenantB.id, name: "Secret" });

    const results = await projectRepo.findAll({ tenantId: tenantA.id });
    expect(results).not.toContainEqual(expect.objectContaining({ id: project.id }));
  });

  it("Tenant A cannot update Tenant B projects", async () => {
    const tenantA = await createTestTenant();
    const tenantB = await createTestTenant();
    const project = await createProject({ tenantId: tenantB.id, name: "Secret" });

    await expect(
      projectRepo.update({ tenantId: tenantA.id, projectId: project.id, name: "Hacked" })
    ).rejects.toThrow(); // or returns 0 rows updated
  });
});
```

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **Tenant from URL/header** — deriving tenant from subdomain or `X-Tenant-Id` header without auth validation | Attackers can spoof tenant context |
| **Optional tenantId** — some queries accept `tenantId?` as optional | Developers forget to pass it; queries silently return cross-tenant data |
| **Global admin bypass** — admin queries skip tenant filter via a flag | One bug in the flag check and all data is exposed |
| **Shared test tenant** — all tests use "tenant-1" | Tests interfere with each other; flaky suites; false passes |

### Checklist

- [ ] `tenantId` is extracted from auth session, not from client input
- [ ] Request-scoped context carries `tenantId` to all layers
- [ ] Every tenant-scoped table has a `tenant_id` column
- [ ] Every query on tenant-scoped tables filters by `tenant_id`
- [ ] Background jobs include `tenantId` in their payload
- [ ] Domain events include `tenantId` in envelope
- [ ] Cache keys include `tenantId`
- [ ] Integration tests prove cross-tenant isolation (read and write)
- [ ] No query uses optional `tenantId` without documented justification
