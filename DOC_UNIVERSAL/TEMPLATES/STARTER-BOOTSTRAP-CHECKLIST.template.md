# STARTER BOOTSTRAP CHECKLIST

Use this checklist when preparing a new starter project that should be ready for fast AI-assisted execution.

## Base Assets

- [ ] Next.js project initialized
- [ ] React and Tailwind CSS available
- [ ] Blueprint DS copied and wired correctly
- [ ] `DOC_UNIVERSAL` copied into the project

## Required Project Docs

- [ ] `PRD.md`
- [ ] `SPEC.md`
- [ ] `PLAN.md`
- [ ] `TASKS.md`
- [ ] `ROUTE-MAP.md`
- [ ] `API-MAP.md`

## DS Safety

- [ ] DS is treated as protected by default
- [ ] frontend tasks declare UI mode
- [ ] frontend tasks declare DS policy
- [ ] app code imports UI from `@/ds`

## Package Scripts

- [ ] `build`
- [ ] `lint`
- [ ] `test`
- [ ] `verify`

## Runner Readiness

- [ ] feature branch strategy defined
- [ ] Aider loop script added for the target OS
- [ ] commit-after-each-task policy kept in place
- [ ] no auto-push policy kept in place
- [ ] protected branches identified
- [ ] manual visual review required before push for frontend changes
- [ ] optional task file queue defined if multiple feature task files will run sequentially

## Final Readiness Check

- [ ] route map matches intended route groups
- [ ] API map covers planned endpoints and server actions
- [ ] quality gates are realistic for the project
- [ ] starter can be handed to Copilot or Aider without hidden assumptions