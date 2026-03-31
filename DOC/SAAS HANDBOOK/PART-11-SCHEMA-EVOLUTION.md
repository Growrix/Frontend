# PART 11 — Schema Evolution & Migration Strategy

> **Scope**: Zero-downtime schema changes, data backfill, migration review process, and deprecation of database objects.
>
> **Not covered here**: Database backup/restore (see STACK_PROFILES/devops/backup-recovery), database connection management (see STACK_PROFILES/operations/database-operations-standard), ORM configuration (see STACK_PROFILES/architecture/backend-architecture).

---

## 11.1 Zero-Downtime Schema Changes

### Purpose

In a SaaS product with continuous deployment, database migrations run against live traffic. A migration that locks a table or breaks query compatibility causes downtime. Every schema change must be backward-compatible with the currently-running application code.

### MUST Rules

1. **MUST treat additive changes as the safe default.** These operations do not break existing code:
   - Add a new column (with a default value or `NULL`)
   - Add a new table
   - Add a new index (using `CONCURRENTLY` on Postgres)
   - Add a new enum value (append only)

2. **MUST use the expand-and-contract pattern for breaking changes.**

```
Phase 1 — Expand: Add the new structure alongside the old
  → Deploy code that writes to both old and new
    → Backfill existing data into the new structure (see §11.2)

Phase 2 — Migrate Reads: Update code to read from the new structure
  → Deploy and verify

Phase 3 — Contract: Remove the old structure
  → Deploy code that only writes to new
    → Drop old column/table in a cleanup migration
```

**Example: Renaming a column** (`full_name` → `display_name`)
```
1. Add column: display_name (nullable)
2. Deploy: write to both full_name AND display_name
3. Backfill: copy full_name → display_name for all existing rows
4. Deploy: read from display_name; keep writing to both
5. Verify: all rows have display_name populated
6. Deploy: stop writing to full_name
7. Drop column: full_name (cleanup migration)
```

3. **MUST create indexes with `CONCURRENTLY` in Postgres.** Regular `CREATE INDEX` locks the table for writes during index creation. `CREATE INDEX CONCURRENTLY` allows concurrent writes.

```sql
-- Good
CREATE INDEX CONCURRENTLY idx_projects_tenant_id ON projects(tenant_id);

-- Bad (locks table)
CREATE INDEX idx_projects_tenant_id ON projects(tenant_id);
```

4. **MUST add new columns as nullable or with a server-side default.** Adding a `NOT NULL` column without a default to an existing table locks while rewriting every row.
5. **MUST run migrations in a separate step from application deployment.** Migration runs first → succeeds → then the new application version deploys.

### MUST NOT Rules

1. **MUST NOT rename columns or tables directly.** Use expand-and-contract. A direct rename breaks all running code that references the old name.
2. **MUST NOT add `NOT NULL` constraints to existing columns without a backfill migration first.** Existing null values will cause the constraint to fail.
3. **MUST NOT drop columns or tables without verifying no code references them.** Search the entire codebase before removal.
4. **MUST NOT run data migrations in the same transaction as DDL changes.** Separate structure changes from data changes.

### Safe vs Unsafe Operations Quick Reference

| Operation | Safe? | Why / Mitigation |
|---|---|---|
| Add nullable column | Yes | No lock, no data rewrite |
| Add column with default | Mostly | Postgres 11+ handles this without rewrite; older versions lock |
| Add table | Yes | No existing queries affected |
| Add index (CONCURRENTLY) | Yes | No write lock |
| Add index (regular) | **No** | Locks table for writes |
| Rename column | **No** | Use expand-and-contract |
| Drop column | **No** | Verify no references first; do as a separate cleanup step |
| Change column type | **No** | May lock table; use expand-and-contract |
| Add NOT NULL constraint | **No** | Backfill nulls first, then add constraint |
| Drop table | **No** | Verify no references; soft-deprecate first |

### Checklist

- [ ] Migration is additive or uses expand-and-contract
- [ ] Indexes created with CONCURRENTLY
- [ ] New columns are nullable or have defaults
- [ ] Migrations run before application deployment
- [ ] No direct renames or column drops without expand-and-contract
- [ ] DDL and data changes in separate migrations

---

## 11.2 Data Backfill

### Purpose

When migrating data to a new structure (new column, new format, new table), existing rows need a backfill. Backfills on large tables can be slow and dangerous if not handled carefully.

### MUST Rules

1. **MUST run backfills as batched, resumable, idempotent jobs.** Process N rows at a time (default: 1000), track progress (last processed ID), and support resuming from where it left off.

```typescript
async function backfillDisplayName(batchSize = 1000) {
  let lastId = await getBackfillCheckpoint("backfill_display_name");
  
  while (true) {
    const rows = await db.query(
      `SELECT id, full_name FROM users 
       WHERE id > $1 AND display_name IS NULL 
       ORDER BY id LIMIT $2`,
      [lastId, batchSize]
    );
    
    if (rows.length === 0) break;
    
    for (const row of rows) {
      await db.query(
        `UPDATE users SET display_name = $1 WHERE id = $2 AND display_name IS NULL`,
        [row.full_name, row.id]
      );
    }
    
    lastId = rows[rows.length - 1].id;
    await saveBackfillCheckpoint("backfill_display_name", lastId);
    
    // Throttle to avoid overwhelming the DB
    await sleep(100);
  }
}
```

2. **MUST validate backfill results.** After the backfill completes, run a verification query to confirm all rows were updated.

```sql
-- Verification: no rows should have NULL display_name where full_name exists
SELECT COUNT(*) FROM users 
WHERE full_name IS NOT NULL AND display_name IS NULL;
-- Expected: 0
```

3. **MUST have a rollback plan for backfills.** If the backfill is wrong, you need to be able to undo it. For column backfills: keep the old column data until verification passes.

### MUST NOT Rules

1. **MUST NOT run a backfill as a single UPDATE on a large table.** `UPDATE users SET display_name = full_name;` on 1M rows locks the table and generates massive WAL.
2. **MUST NOT delete the source data before verifying the backfill.** The old column/table is your rollback mechanism.
3. **MUST NOT skip throttling.** Without throttling, backfills create DB connection saturation and slow down production queries.

### Checklist

- [ ] Backfill runs in batches (default: 1000 rows)
- [ ] Progress checkpoint saved (resumable)
- [ ] Idempotent (re-running doesn't cause errors or duplicate data)
- [ ] Verification query confirms completeness
- [ ] Old data preserved until verification passes
- [ ] Throttling between batches

---

## 11.3 Migration Review Checklist

### Purpose

Every migration that touches production data must pass a review checklist before merging. This is a PR requirement for any migration file.

### Review Checklist (For Every Migration PR)

| # | Check | Pass? |
|---|---|---|
| 1 | **Forward compatible**: Does the migration work with both the current and the new application code? | |
| 2 | **Rollback SQL available**: Is there a corresponding `down` migration or a documented rollback script? | |
| 3 | **No table locks**: Does the migration avoid locking tables? (No `ALTER TABLE ... ADD NOT NULL`, no `CREATE INDEX` without `CONCURRENTLY`) | |
| 4 | **Data volume assessed**: How many rows does this affect? Is the migration batched for tables >100K rows? | |
| 5 | **Lock duration estimated**: For DDL operations, what is the expected lock duration? Is it <1 second? | |
| 6 | **Staging validated**: Has the migration been run against a staging environment with production-like data? | |
| 7 | **Backfill separated**: Are data changes (backfill) in a separate migration from structure changes (DDL)? | |
| 8 | **Indexes concurrent**: Are all new indexes created with `CONCURRENTLY`? | |
| 9 | **Constraints safe**: Are new constraints added without risking failure on existing data? (Backfill first, then constrain) | |
| 10 | **No orphaned references**: If adding a foreign key, do all existing rows satisfy it? | |

### MUST Rules

1. **MUST test migrations against staging before production.** Use a staging database with similar data volume and shape.
2. **MUST document the expected impact of each migration** in the PR description: number of rows affected, expected duration, lock behavior.
3. **MUST have a rollback script for every migration.** If the ORM generates it, verify it's correct. If not, write it manually.

### MUST NOT Rules

1. **MUST NOT merge migration PRs without a second reviewer** for any migration that modifies existing data or changes column types.
2. **MUST NOT run unreviewed migrations in production.** No "just fix it in prod" migrations.

### Checklist

- [ ] Every item in the review checklist above passes
- [ ] Staging test completed
- [ ] Impact documented in PR description
- [ ] Rollback script exists and is tested
- [ ] Second reviewer approved (for data-modifying migrations)

---

## 11.4 Deprecation & Removal

### Purpose

Columns, tables, and API fields accumulate over time. Removing them requires a careful process to avoid breaking running code.

### MUST Rules

1. **MUST follow a deprecation timeline.**

```
Week 0: Mark as deprecated in code comments and documentation
Week 0: Stop writing to the deprecated column/field (if expand-and-contract is complete)
Week 1: Verify no reads from the deprecated column/field (search codebase + query logs)
Week 2: Run cleanup migration (drop column/table)
```

For API field deprecation, the timeline is longer (minimum 90 days) because external consumers need time to migrate.

2. **MUST search the entire codebase before dropping any database object.** Search for the column name, table name, and any ORM references.
3. **MUST coordinate schema deprecation with API deprecation.** If a column is removed, any API endpoint that exposed it must stop referencing it first.

### MUST NOT Rules

1. **MUST NOT drop columns or tables without verifying zero usage.** Query logs, application logs, and full codebase search.
2. **MUST NOT shorten internal deprecation timelines without justification.** 2 weeks minimum for internal deprecation.

### Checklist

- [ ] Deprecated item marked in code comments and docs
- [ ] Writes stopped to deprecated item
- [ ] Codebase search confirms zero references
- [ ] Query logs confirm no reads
- [ ] Cleanup migration PR submitted with full review
- [ ] API deprecation coordinated (if externally exposed)
