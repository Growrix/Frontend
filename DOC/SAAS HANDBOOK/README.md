# SaaS Product Engineering Handbook

> **Purpose**: Enforceable rules and architecture standards for building SaaS products.
> Covers only topics NOT owned by other handbooks.

---

## Quick Start — Which Handbook Do I Read?

| If the work involves… | Read this handbook |
|---|---|
| UI components, tokens, typography, spacing, color, motion, forms anatomy, accessibility, responsive design, theming, CSS architecture, DS testing | **HandBook_Frontend** (`DOC/DS BUILDING/HandBook_Frontend/`) |
| Execution rules, workflow, quality gates, AI runner contracts, stop conditions, git hygiene, code review | **DOC_UNIVERSAL/CORE/** |
| App structure, routing, shell selection, API contract design, service layering, tenancy decision framework | **DOC_UNIVERSAL/STANDARDS/** |
| Stack-specific implementation (Next.js architecture, auth, security, CI/CD, testing, DB ops, monitoring, SEO) | **DOC_UNIVERSAL/STACK_PROFILES/** |
| Domain modeling, billing/payments, tenant lifecycle, background jobs, integrations, privacy, email/notifications, file storage, caching, rate limiting, schema migrations, admin ops, real-time, analytics | **This handbook** (`SAAS HANDBOOK/`) |

**Rule**: If two handbooks seem to cover the same topic, the one listed in the table above as the owner is authoritative. This handbook MUST NOT duplicate material from the others.

---

## How to Use This Handbook

### For Humans
1. Before building a SaaS feature, check the routing table above.
2. Read the relevant chapter(s) from this handbook.
3. Follow every **MUST** rule. Treat **SHOULD** as default-unless-justified. **MAY** is optional.
4. Use the chapter checklist before submitting a PR.

### For AI Agents
1. Before writing code for any topic listed in the TOC, read the relevant chapter file.
2. Obey all **MUST** / **MUST NOT** rules. No exceptions without explicit human override.
3. If a topic is not covered by any handbook, **stop and ask** — do not invent architecture.
4. When referencing rules from this handbook in commit messages or PR descriptions, cite the chapter and section (e.g., `PART-02 §2.3`).

---

## Chapter Format Convention

Every chapter in this handbook follows this structure:

```
## Section Title
### Purpose         — Why this section exists
### Scope           — What it governs, what it does NOT govern
### MUST Rules      — Non-negotiable requirements
### MUST NOT Rules  — Explicitly forbidden practices
### Default         — The recommended default approach
### Alternatives    — When the default doesn't fit, these are allowed
### Anti-Patterns   — Common mistakes with explanation of why they fail
### Checklist       — PR/review checklist for this topic
### Evidence        — What must be provably true in code, tests, or config
```

---

## Table of Contents

| # | Chapter | File |
|---|---------|------|
| 1 | Domain Modeling & Bounded Contexts | `PART-01-DOMAIN-MODELING.md` |
| 2 | Payments & Billing Engineering | `PART-02-BILLING.md` |
| 3 | Tenant Lifecycle & Account Architecture | `PART-03-TENANT-LIFECYCLE.md` |
| 4 | Background Jobs & Async Architecture | `PART-04-BACKGROUND-JOBS.md` |
| 5 | External Integration Patterns | `PART-05-EXTERNAL-INTEGRATIONS.md` |
| 6 | Data Privacy & Compliance | `PART-06-DATA-PRIVACY.md` |
| 7 | Email & Notification Architecture | `PART-07-EMAIL-NOTIFICATIONS.md` |
| 8 | File Storage & Media | `PART-08-FILE-STORAGE.md` |
| 9 | Caching Architecture | `PART-09-CACHING.md` |
| 10 | Rate Limiting & Abuse Prevention | `PART-10-RATE-LIMITING.md` |
| 11 | Schema Evolution & Migration Strategy | `PART-11-SCHEMA-EVOLUTION.md` |
| 12 | Admin & Internal Operations | `PART-12-ADMIN-OPERATIONS.md` |
| 13 | Real-Time & Collaboration | `PART-13-REAL-TIME.md` |
| 14 | Analytics & Product Intelligence | `PART-14-ANALYTICS.md` |

---

## Ownership & Maintenance

- **Owner**: Engineering lead / architect
- **Review cadence**: Re-validate quarterly or when adding a new SaaS domain
- **Amendment process**: Propose changes via PR with rationale. Update TOC.md if adding/removing chapters.
