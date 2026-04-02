build a website with: Home,service, about,blog, contact page for a Electircal & Solar installer company. each page with minimum 4-5 sections. 
The company name is  : Rayiss Electrical & solar PTY LTD. The TG is Australian market . 

The Mode I chose is : `D:\Desktop Mass\Blueprint\DOC_UNIVERSAL\DDS\MODES\MOBILE-NATIVE.md`
The Preset is : `D:\Desktop Mass\Blueprint\DOC_UNIVERSAL\DDS\PRESETS\NEUTRAL-PROFESSIONAL.md`













I think the DS still has issues with inconcistency or anything else. YOu need to figuer out the DS settings mainly. is it properly done based on the D:\Desktop Mass\Blueprint\DOC_UNIVERSAL\README.md ? becuase it should follow stricktly all the rules while doing the global settings. ANd the global settings should cover everything that has in the rules pixel perfect and accurately. I do not allow partial impimenetations as well. You should do a deep analysis on D:\Desktop Mass\Blueprint\src\ds and also the documentations as well and identify the gaps and do the enhancement accurately.  Forget about the site , only focus on the DS building. Create a Gap analysis file into this folder  D:\Desktop Mass\Blueprint\DOC_WORKING\ONGOING TASKS , and after that prepare a detailed implementation plan to fill the gaps and enhance the DS based on the rules in D:\Desktop Mass\Blueprint\DOC_UNIVERSAL\README.md . And then finally create the tasks.md file with the tasks to implement the plan. and Start implimenting the tasks one by one and update the task notes with the changes and verification results. Make sure to follow the rules strictly and do not allow any partial implementations. The DS should be consistent and follow all the guidelines mentioned in the documentation.


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