## Rules

Read `DOC_UNIVERSAL/README.md` first. It defines the authority model, AI read policy, and folder map.

Then read ONLY what your task requires:

**Every task** → all files in `DOC_UNIVERSAL/CORE/`
**Frontend** → add `STANDARDS/UI-DS-RULES.md`, `STANDARDS/APP-STRUCTURE.md`, `src/ds/DESIGN-SYSTEM-ANATOMY.md`, `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
**Creative frontend** (homepage, landing, marketing, visual redesign, wireframe, theme) → add `DDS/README.md`, `DDS/OPERATING/DESIGN-DECISION-SYSTEM.md`, `DDS/OPERATING/AI-EXECUTION-FLOW.md`, then only the specific mode + preset after the design decision
**Backend / API / data** → add `STANDARDS/API-BACKEND-RULES.md`, `STANDARDS/SAAS-FOUNDATIONS.md`
**Domain-specific** (billing, webhooks, jobs, tenant lifecycle, etc.) → check `CORE/HANDBOOK-ROUTING.md`, load only the listed chapter from `DOC/SAAS HANDBOOK/`
**DS theory** → load the relevant chapter from `DOC/DS BUILDING/HandBook_Frontend/`

Do not load the full folder tree. Do not load handbooks by default. Do not load reference material unless seeking inspiration for a specific composition problem. CORE rules always win over handbooks.

Verification: `npm run verify` must pass before any task is done.