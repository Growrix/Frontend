# PART 9 — Caching Architecture

> **Scope**: Cache layer design, invalidation strategy, and cache failure handling for SaaS applications.
>
> **Not covered here**: CDN caching for static assets (see STACK_PROFILES/devops/deployment-guidelines), browser caching headers (see STACK_PROFILES/seo-performance/performance-budget), database query optimization (see STACK_PROFILES/operations/database-operations-standard).

---

## 9.1 Cache Layer Design

### Purpose

Caching reduces database load, improves response times, and enables your product to scale. But an incorrect or inconsistent cache is worse than no cache — it serves stale or wrong data.

### MUST Rules

1. **MUST choose the right cache layer for the data type.**

| Layer | Where It Lives | Best For | TTL Range | Tenant Isolation |
|---|---|---|---|---|
| **Edge / CDN** | CDN provider (Cloudflare, CloudFront) | Public static assets, marketing pages | Hours to days | N/A (public content) |
| **Application (in-memory)** | Node.js process memory | Config, feature flags, plan entitlements | 1-5 minutes | Must be tenant-scoped |
| **External (Redis)** | Dedicated Redis instance | Session data, rate limit counters, frequently-read entities | Seconds to hours | Must be tenant-scoped |
| **Database query cache** | Database layer (Postgres, Supabase) | Complex query results that change infrequently | Minutes | Inherits tenant filter from query |

2. **MUST scope cache keys by tenant.** Every cache key for tenant-specific data includes `tenantId`.

```
// Good
cache.get(`tenant:${tenantId}:project:${projectId}`)
cache.get(`tenant:${tenantId}:entitlements`)

// Bad
cache.get(`project:${projectId}`)         // No tenant → cross-tenant data leak
cache.get(`entitlements:${userId}`)        // User may be in multiple tenants
```

3. **MUST use cache-aside (lazy loading) as the default pattern.** Read from cache → miss → read from DB → write to cache → return. This is the safest and simplest pattern.

```typescript
async function getProject(tenantId: string, projectId: string) {
  const cacheKey = `tenant:${tenantId}:project:${projectId}`;
  
  // 1. Check cache
  const cached = await cache.get(cacheKey);
  if (cached) return cached;
  
  // 2. Cache miss → read from DB
  const project = await projectRepo.findById(tenantId, projectId);
  if (!project) return null;
  
  // 3. Write to cache
  await cache.set(cacheKey, project, { ttl: 300 }); // 5 minutes
  
  return project;
}
```

4. **MUST set a TTL on every cache entry.** No immortal cache entries. Even "stable" data gets a TTL (max: 24 hours) as a safety net.

| Data Type | Recommended TTL |
|---|---|
| User session | Match session expiry |
| Entitlements/plan info | 5 minutes |
| Entity read (project, document) | 1-5 minutes |
| Configuration/feature flags | 1-5 minutes |
| Rate limit counters | Matches rate limit window |
| Generated reports | 1 hour |

### MUST NOT Rules

1. **MUST NOT cache sensitive data (passwords, tokens, payment details) in application-level caches.** If you must cache auth sessions, use encrypted Redis with short TTL.
2. **MUST NOT use cache as primary storage.** Cache is ephemeral. If Redis restarts, the application must work (slower, hit DB directly).
3. **MUST NOT mix tenant data in cache keys.** See tenant-scoped key rule above.

### Cache Patterns Comparison

| Pattern | How It Works | Pros | Cons |
|---|---|---|---|
| **Cache-aside** | App checks cache, fetches DB on miss, writes to cache | Simple, safe, lazy | First read is always slow (cache miss) |
| **Read-through** | Cache itself fetches from DB on miss | Consistent read path | Requires cache layer that supports data loading |
| **Write-through** | Every write goes to cache + DB simultaneously | Cache always fresh | Write latency increases; complex |
| **Write-behind** | Write to cache immediately, async write to DB | Fastest writes | Risk of data loss if cache fails before DB write |

**Default recommendation**: Cache-aside. Only consider write-through for entitlements/session data where freshness is critical.

### Checklist

- [ ] Cache layer chosen per data type (edge, in-memory, Redis, DB)
- [ ] All tenant-specific cache keys include tenantId
- [ ] Cache-aside pattern as default
- [ ] TTL set on every cache entry (no immortal entries)
- [ ] No sensitive data in unencrypted caches
- [ ] Application works (slower) when cache is unavailable

---

## 9.2 Invalidation Strategy

### Purpose

"There are only two hard things in computer science: cache invalidation and naming things." Invalidation strategy determines when and how cached data is removed or refreshed.

### MUST Rules

1. **MUST use event-driven invalidation for data that changes via known write paths.** When an entity is created, updated, or deleted, the write path invalidates or updates the cache.

```typescript
async function updateProject(tenantId: string, projectId: string, data: UpdateData) {
  // 1. Update in DB
  const updated = await projectRepo.update(tenantId, projectId, data);
  
  // 2. Invalidate cache
  await cache.delete(`tenant:${tenantId}:project:${projectId}`);
  
  // 3. Emit domain event
  await events.emit("project.updated", { tenantId, projectId });
  
  return updated;
}
```

2. **MUST use TTL as a safety net, even when using event-driven invalidation.** TTL catches cases where the invalidation event was lost or a write happened outside the normal code path (direct DB edit, migration).
3. **MUST provide an emergency manual purge mechanism.** An admin endpoint or script that can clear specific cache keys or all cache for a tenant. Used for incidents.
4. **MUST invalidate related caches on write.** If updating an `Org` affects the `entitlements` cache, both must be invalidated.

### MUST NOT Rules

1. **MUST NOT rely solely on TTL for frequently-changing data.** Users will see stale data for the full TTL window.
2. **MUST NOT invalidate too aggressively.** Invalidating everything on every write defeats the purpose of caching. Invalidate only what changed.

### Stale-While-Revalidate Pattern

For data where brief staleness is acceptable (dashboard stats, list views):

```typescript
async function getWithSWR(key: string, fetcher: () => Promise<any>, ttl: number) {
  const cached = await cache.getWithMetadata(key);
  
  if (cached && !cached.expired) {
    return cached.value; // Fresh — return immediately
  }
  
  if (cached && cached.expired) {
    // Stale — return immediately, refresh in background
    refreshInBackground(key, fetcher, ttl);
    return cached.value;
  }
  
  // No cache — fetch synchronously
  const value = await fetcher();
  await cache.set(key, value, { ttl });
  return value;
}
```

### Checklist

- [ ] Event-driven invalidation on all write paths
- [ ] TTL as safety net on all cached data
- [ ] Manual purge mechanism available for emergencies
- [ ] Related caches invalidated together
- [ ] Stale-while-revalidate for non-critical dashboard data

---

## 9.3 Cache Failure Handling

### Purpose

Cache systems fail: Redis goes down, memory fills up, network partitions occur. The application must degrade gracefully, not crash.

### MUST Rules

1. **MUST handle cache unavailability gracefully.** All cache reads and writes are wrapped in try-catch. On failure, fall through to the database.

```typescript
async function getProject(tenantId: string, projectId: string) {
  try {
    const cached = await cache.get(`tenant:${tenantId}:project:${projectId}`);
    if (cached) return cached;
  } catch (error) {
    logger.warn("Cache read failed, falling through to DB", { error });
    // Continue to DB read — do not throw
  }
  
  return projectRepo.findById(tenantId, projectId);
}
```

2. **MUST prevent cache stampedes.** When cache expires or becomes unavailable, many concurrent requests hit the DB simultaneously. Mitigate with:
   - **Locking**: Only one request fetches from DB; others wait for the cache to repopulate.
   - **Probabilistic early expiration**: Each request has a small random chance of refreshing the cache before TTL expires, spreading load.
3. **MUST monitor cache hit/miss ratio and alert on degradation.** A sudden drop in hit rate indicates a problem (mass invalidation, cache failure, cold start).
4. **MUST have a cache warming strategy for cold starts.** After a deploy or cache restart, proactively load high-traffic data into cache to avoid a thundering herd.

### MUST NOT Rules

1. **MUST NOT let cache failures propagate as user-facing errors.** Cache failure is a performance degradation, not a functional failure.
2. **MUST NOT retry cache writes aggressively during an outage.** If Redis is down, retrying writes creates backpressure. Fail fast and serve from DB.

### Key Metrics

| Metric | Healthy | Alert Threshold |
|---|---|---|
| Cache hit rate | > 90% | < 70% sustained for 5 minutes |
| Cache latency (P95) | < 5ms | > 50ms |
| Cache error rate | < 0.1% | > 1% |
| Cache memory usage | < 80% capacity | > 90% |

### Checklist

- [ ] All cache reads/writes wrapped in try-catch
- [ ] DB fallback on cache failure (no user-facing errors)
- [ ] Cache stampede prevention (locking or probabilistic early expiration)
- [ ] Hit/miss ratio monitored and alerted
- [ ] Cache warming strategy for cold starts
- [ ] Cache failure does not block requests
