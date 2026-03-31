# SaaS Handbook — Master TOC

> Topics that are **not covered** by the existing handbooks.
> This file contains ONLY material that does not exist in HandBook_Frontend or DOC_UNIVERSAL.

## Relationship To Existing Handbooks

| Handbook | Owns | Do NOT duplicate here |
|----------|------|-----------------------|
| **HandBook_Frontend** (DS BUILDING) | Design system theory, tokens, component API patterns, typography, color, spacing, motion, elevation, iconography, forms anatomy, navigation patterns, data display patterns, feedback patterns, responsive design, drag/drop, accessibility (WCAG 2.2), i18n/RTL, theming architecture, CSS architecture, DS testing, DS documentation, composition & shells | Any DS, component, token, or visual pattern topic |
| **DOC_UNIVERSAL/CORE** | Constitution, engineering standards, quality gates, workflow, execution discipline, AI runner contracts, stop conditions | Any execution rules, task system, AI rules engine, code review gates, git hygiene, DS protection rules |
| **DOC_UNIVERSAL/STANDARDS** | UI-DS rules, app structure & routing, API-backend rules, SaaS foundations & stack decisions | Any routing, shell selection, API contract design, service/repo layering, boundary validation, tenancy decision framework |
| **DOC_UNIVERSAL/STACK_PROFILES** | Architecture (layers, auth, backend, API, data flow, error handling, frontend), coding standards (TS, React, Node, git, PR, folder naming), devops (CI/CD, deployment, environments, logging, monitoring, backup, cost), operations (DB ops, feature flags, incident response, release mgmt, versioning, maintenance), security (overview, OWASP, API security, auth security, authz rules, data protection, dependency security, secrets, secure coding checklist), testing (overview, unit, integration, E2E, mocking, coverage), SEO/performance (analytics, lighthouse, SEO, performance budget, structured data), theming | Any stack-specific implementation guidance already written |

**Rule**: Before writing a chapter for this handbook, verify the topic is not already governed by the handbooks above. If it is partially covered, write only the delta.

---

# PART 1 — Domain Modeling & Bounded Contexts

### 1.1 Domain Modeling Methodology

* Entity identification and relationship mapping
* Aggregate roots and consistency boundaries
* Ubiquitous language: naming rules for entities, events, and operations
* Bounded context identification and context mapping
* Domain vs application vs infrastructure layer separation

### 1.2 Domain Event Design

* Event naming conventions (past tense, domain-scoped)
* Event payload contracts (what data an event carries)
* Event ordering and causality
* When to use domain events vs direct service calls

### 1.3 Multi-Tenant Data Architecture (DEEP)

* Shared database with tenant column vs schema-per-tenant vs database-per-tenant
* Tenant-scoped query enforcement patterns (beyond RLS policy examples)
* Cross-tenant data isolation verification
* Tenant context propagation through the full request lifecycle
* Tenant-aware seed data and test fixtures

---

# PART 2 — Payments & Billing Engineering (NOT COVERED ANYWHERE)

### 2.1 Billing Domain Model

* Products, prices, plans, and price tiers as domain entities
* Plan-state machine: free → trial → active → past_due → canceled → expired
* Subscription lifecycle and state transitions
* Metered vs licensed vs usage-based billing models
* Credits, coupons, and promotional pricing

### 2.2 Stripe Integration Architecture

* Customer ↔ user/org mapping strategy
* Checkout session flow vs inline payment element flow
* Subscription creation, update, and cancellation contracts
* Price migration strategy (grandfathering, forced upgrade, sunset)
* Invoice lifecycle and payment retry behavior

### 2.3 Webhook Reconciliation System

* Webhook verification (signature validation)
* Idempotency enforcement (event ID deduplication)
* Out-of-order event handling
* Webhook replay and re-delivery strategy
* Reconciliation jobs: Stripe as source of truth vs local DB as source of truth
* Failure alerting and dead-letter handling

### 2.4 Billing Edge Cases

* Upgrade mid-cycle (proration rules)
* Downgrade with feature loss (entitlement revocation timing)
* Trial expiration behavior (auto-convert vs lock-out)
* Failed payment retry sequence and dunning
* Refund flow and partial refund handling
* Seat-based pricing: add/remove seats mid-cycle
* Tax collection (Stripe Tax or external tax provider)
* Multi-currency support

### 2.5 Entitlement System

* Plan → feature permission mapping
* Entitlement evaluation at API boundary and UI boundary
* Graceful degradation when plan limits are reached
* Entitlement cache invalidation on plan change
* Free tier vs paid tier behavioral differences

---

# PART 3 — Tenant Lifecycle & Account Architecture

### 3.1 Account / Org / Workspace Model

* Single-user vs team vs organization hierarchy
* Workspace concept: when to use it, data scoping rules
* Account creation flow and provisioning checklist
* Invitation and membership model (roles within org/workspace)

### 3.2 Seat Management

* Seat allocation and enforcement
* Seat-based billing integration
* Pending invite seat reservation
* Deactivation vs removal vs transfer

### 3.3 Onboarding State Machine

* Onboarding step model (profile → org → invite → first action)
* Resumable onboarding (user returns after partial completion)
* Onboarding completion gates before full product access
* Onboarding analytics events

### 3.4 Suspension & Offboarding

* Account suspension triggers (payment failure, abuse, admin action)
* Suspended-state behavior (read-only vs full lockout vs grace period)
* Data retention after cancellation
* Account deletion flow (soft delete → grace period → hard delete)
* Data export before deletion (GDPR Article 20 portability)

---

# PART 4 — Background Jobs & Async Architecture (DEEP)

### 4.1 Job System Design

* Job runner selection criteria (Inngest, Trigger.dev, BullMQ, pg-boss)
* Job types: immediate, delayed, scheduled (cron), recurring
* Job payload contract and schema validation
* Job versioning when payload shape changes

### 4.2 Retry & Failure Strategy

* Exponential backoff with jitter
* Max retry limits per job type
* Dead-letter queue pattern
* Retry vs skip vs alert decision matrix
* Poison message detection

### 4.3 Idempotency Patterns

* Idempotency key generation and storage
* Idempotent job execution verification
* Side-effect deduplication for external writes (email, Stripe, webhooks)
* At-least-once vs exactly-once delivery trade-offs

### 4.4 Job Observability

* Job execution logging (start, success, failure, retry)
* Duration tracking and alerting on slow jobs
* Queue depth monitoring
* Job dashboard requirements

---

# PART 5 — External Integration Patterns

### 5.1 Third-Party API Consumption

* Adapter pattern: wrap external SDKs behind internal interface
* Timeout, retry, and circuit-breaker configuration
* Rate limit awareness and request throttling
* API key rotation without downtime

### 5.2 Webhook Provider Design

* Outbound webhook registration and management
* Payload signing (HMAC-SHA256)
* Delivery retry with exponential backoff
* Delivery status tracking and failure alerting
* Webhook event versioning

### 5.3 Webhook Consumer Design

* Signature verification at entry
* Idempotent processing (event ID dedup)
* Async processing: accept-then-process pattern
* Out-of-order and duplicate event resilience
* Consumer failure alerting

### 5.4 Sync Boundaries

* Eventual consistency expectations between local DB and external systems
* Reconciliation job patterns (periodic full-sync vs event-driven)
* Conflict resolution when local and external state diverge
* External system outage handling (queue, retry, degrade gracefully)

---

# PART 6 — Data Privacy & Compliance

### 6.1 PII Classification

* PII field identification and tagging in schema
* Sensitivity tiers (public, internal, confidential, restricted)
* Per-field handling rules (encrypt, hash, mask, redact)

### 6.2 Data Retention & Deletion

* Retention policy per data category
* Soft delete → hard delete lifecycle
* Cascading deletion rules (user deleted → what happens to their data)
* Scheduled cleanup jobs

### 6.3 Right to Erasure & Portability

* Deletion request workflow
* Data export format and delivery method
* Third-party data deletion propagation (Stripe, analytics, email provider)
* Verification and audit trail for deletion requests

### 6.4 Consent & Lawful Basis

* Consent collection and storage
* Consent withdrawal handling
* Cookie consent and tracking opt-out
* Lawful basis documentation per data processing activity

### 6.5 Audit Logging

* What to log: who, what, when, from where, on which resource
* Audit log schema and immutability rules
* Retention period for audit records
* Audit log access controls (who can read audit data)

---

# PART 7 — Email & Notification Architecture

### 7.1 Transactional Email System

* Email provider integration (Resend, Postmark, SES)
* Email template management (code-managed vs provider-managed)
* Template variable contracts and validation
* Send-triggered-by-event pattern (domain event → email job)

### 7.2 Notification Channels

* Channel taxonomy: email, in-app, push (optional), SMS (optional)
* Notification preference model per user per channel per event type
* Channel fallback and escalation rules
* Notification batching and digest mode

### 7.3 In-App Notification System

* Notification data model (read/unread, action URL, category)
* Real-time delivery (polling vs SSE vs WebSocket)
* Notification center UI contract (what it must show)
* Mark-read, mark-all-read, archive, delete behaviors

### 7.4 Email Deliverability

* SPF, DKIM, DMARC configuration requirements
* Bounce handling and suppression list management
* Complaint handling
* Send rate and warm-up strategy for new domains

---

# PART 8 — File Storage & Media

### 8.1 Upload Architecture

* Direct-to-storage upload (presigned URL pattern)
* Upload size limits and allowed MIME types
* Upload progress tracking
* Virus/malware scanning strategy

### 8.2 Storage Organization

* Bucket/path structure for tenant isolation
* File metadata model (owner, type, size, upload time, access level)
* Lifecycle policies (auto-delete temp files, archive old exports)

### 8.3 Access Control

* Signed URL generation for private files
* URL expiration policy
* Public vs private bucket separation
* CDN integration for public assets

### 8.4 Processing Pipelines

* Image resize and thumbnail generation
* Document format conversion (if needed)
* Async processing via job queue
* Processing failure handling

---

# PART 9 — Caching Architecture

### 9.1 Cache Layer Design

* Cache placement: edge (CDN), application (in-memory), external (Redis), DB query cache
* Cache-aside vs read-through vs write-through patterns
* Per-entity cache key design
* Tenant-scoped cache keys

### 9.2 Invalidation Strategy

* Event-driven invalidation (on write, invalidate related cache)
* TTL-based expiration for low-risk data
* Manual purge mechanism for emergency invalidation
* Stale-while-revalidate pattern for UI data

### 9.3 Cache Failure Handling

* Degraded mode when cache is unavailable
* Cache stampede prevention (locking, probabilistic early expiration)
* Cache warming strategy after cold start or deploy

---

# PART 10 — Rate Limiting & Abuse Prevention

### 10.1 Rate Limiting Design

* Rate limit placement: edge, middleware, per-action
* Algorithm selection: token bucket, sliding window, fixed window
* Rate limit keying: by user, by tenant, by IP, by API key
* Rate limit headers (X-RateLimit-*, Retry-After)

### 10.2 Abuse Patterns

* Credential stuffing detection
* Enumeration attack detection (email, username)
* Scraping and automated access detection
* Webhook abuse (replay attacks)

### 10.3 Throttling & Graceful Degradation

* Soft limits (warn) vs hard limits (block)
* Per-plan rate limit tiers
* Queue-based throttling for expensive operations
* User-facing messaging for rate-limited requests

---

# PART 11 — Schema Evolution & Migration Strategy

### 11.1 Zero-Downtime Schema Changes

* Additive-only changes (add column, add table) as safe default
* Expand-and-contract pattern for breaking changes
* Column rename strategy (add new → backfill → migrate reads → drop old)
* Index creation without locking (CONCURRENTLY)

### 11.2 Data Backfill

* Backfill job design (batched, resumable, idempotent)
* Backfill verification queries
* Backfill rollback strategy

### 11.3 Migration Review Checklist

* Forward compatibility check
* Rollback SQL availability
* Data volume impact estimate
* Lock duration estimate for DDL operations
* Staging validation before production

### 11.4 Deprecation & Removal

* Column/table deprecation notice period
* Read-path migration before write-path removal
* Cleanup migration scheduling
* API contract deprecation coordination with schema changes

---

# PART 12 — Admin & Internal Operations

### 12.1 Internal Tooling Rules

* Admin dashboard scope (what admins can see and do)
* Admin action audit logging (every admin action is recorded)
* Bulk operation safety (confirmation, dry-run, undo)

### 12.2 Safe Impersonation

* Impersonation access control (who can impersonate)
* Impersonation session marking (all actions tagged as impersonated)
* Impersonation audit trail
* Impersonation scope limits (read-only vs full access)

### 12.3 Support Operations

* Customer lookup and context assembly
* Manual remediation workflows (credit, refund, plan override)
* Escalation triggers and documentation
* Support action audit trail

---

# PART 13 — Real-Time & Collaboration (WHEN NEEDED)

### 13.1 Real-Time Transport

* WebSocket vs Server-Sent Events vs polling decision matrix
* Connection lifecycle management (connect, reconnect, heartbeat)
* Authentication on persistent connections
* Tenant-scoped channels

### 13.2 Presence & Live Updates

* User presence model (online, away, offline)
* Live data update patterns (optimistic local → server confirmation)
* Conflict resolution for concurrent edits
* Rate limiting on broadcast events

---

# PART 14 — Analytics & Product Intelligence

### 14.1 Event Taxonomy Design

* Event naming conventions (object_action format)
* Required properties per event (userId, tenantId, timestamp, sessionId)
* Event schema validation before emission
* PII rules for analytics payloads

### 14.2 Funnel & Conversion Tracking

* Critical funnel definitions (signup → activation → conversion → retention)
* Funnel step instrumentation requirements
* Attribution model for acquisition tracking
* Experiment assignment and result tracking (A/B testing)

### 14.3 Product Health Metrics

* Activation rate definition and measurement
* Retention cohort analysis requirements
* Feature adoption tracking
* Churn signal identification

