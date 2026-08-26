# Changelog

## 2026-08-25 — Live AEX walkthrough HTML + Word docs

**What:** Added `WALKTHROUGH.html` and `Live-AEX-UI-Walkthrough.docx` (screenshots embedded) via `generate-docs.py` from `crawl-meta.json`.

**Why:** User asked for the Live AEX walkthrough as HTML and Word, same pattern as the Windows Client pack.

**Files:** `ui-walkthrough/WALKTHROUGH.html`, `Live-AEX-UI-Walkthrough.docx`, `generate-docs.py`, `README.md`

**Status:** implemented

## 2026-08-25 — Windows Client walkthrough: generic Agent Chat copy

**What:** Removed “your screenshot / your UI” wording from Agent Chat and survey sections in README and regenerated Word so the doc reads as a generic product walkthrough.

**Why:** Document is shared/generic; possessive demo language was inappropriate.

**Files:** `ui-walkthrough/windows-client/README.md`, `Windows-Client-UI-Walkthrough*.docx`

**Status:** implemented

## 2026-08-25 — UI walkthrough: blank screens recapture (Deploy/exec/GPO hubs)

**What:** Recaptured Scheduling, Monitoring (Data Collection hub), Deployment placeholder, Version Catalog (Agent Management tab), GPO Policies, Policy Execution, Execution History, Deploy (9 SWD rows), device drawer, Selfhelp/Autoheal library shots. Script `recapture-blank-screens.mjs`. Root cause of empty Deploy/Execution History was Audit `siteId` GraphQL filter (fixed in AEX backend).

**Why:** User reported those Live AEX screens blank/missing.

**Files:** `ui-walkthrough/screenshots/{047,058,095-098,103,104,106,125,126}*`, `recapture-blank-screens.mjs`, `crawl-screenshots.mjs`, `crawl-meta.json`, `CHANGELOG.md`

**Status:** implemented

## 2026-08-25 — Windows Client Agent Chat screenshots (user-provided)

**What:** Replaced chatbot walkthrough images with the user’s **Nanoheal Agent Chat** screenshots (greeting + Teams conversation). Rebuilt survey mockup in the same Agent Chat UI. Regenerated Word on Desktop.

**Why:** User provided the exact Agent Chat UI to use for chatbot and survey.

**Files:** `screenshots/15*`, `16*`, `17*`, `mockups/survey.html`, Word docs

**Status:** implemented

## 2026-08-25 — Windows Client: use user-provided survey/chat screenshots

**What:** Stopped regenerating survey/chat mockups. Copied survey + chatbot open/closed screenshots **verbatim** from user file `Windows-Client-UI-Walkthrough-UPDATED-20260825-1732.docx` into `15`/`16`/`17`. Landing remains user-attached screenshot. Rebuilt Word `…-1804.docx`.

**Why:** User called out that regenerated mockups were not using the screenshots they provided/referenced.

**Files:** `ui-walkthrough/windows-client/screenshots/15*`, `16*`, `17*`, `Windows-Client-UI-Walkthrough*.docx`

**Status:** implemented

## 2026-08-25 — Windows Client survey + FAB chatbot (1732 style)

**What:** Restored chatbot to bottom-right FAB widget (`WidgetIframe` geometry) matching the 1732 walkthrough — not AI Assist. Survey modal uses the same Nanoheal chrome (#0D70B7, logo icon, 16px radius). Recaptured 15/16/17; rebuilt Word UPDATED.

**Why:** User asked for chatbot + survey like the 1732/1749 docs; preferred FAB widget over AI Assist entry.

**Files:** `ui-walkthrough/windows-client/mockups/{survey,chatbot,chatbot-widget}.html`, `screenshots/15*`, `16*`, `17*`, README, WALKTHROUGH.html, Word

**Status:** implemented

## 2026-08-25 — Windows Client chat: AEX AI Assist demo pattern

**What:** Replaced floating FAB closed/open mockups with the AEX demo pattern from `aex-V1.2/demo/nanoheal-agent-chat`: closed = **AI Assist** beside Search; open = right-side overlay (Nanoheal logo header, greeting Hi). Recaptured `16-chatbot-panel.png` / `17-chatbot-widget.png`. Updated README, WALKTHROUGH.html, and Word doc.

**Why:** FAB-only closed state was weak for demos; prior AEX mock already defined the preferred entry + panel.

**Files:** `ui-walkthrough/windows-client/mockups/chatbot.html`, `chatbot-widget.html`, `screenshots/16*`, `17*`, `README.md`, `WALKTHROUGH.html`, `Windows-Client-UI-Walkthrough*.docx`

**Status:** implemented

## 2026-08-25 — Live AEX UI walkthrough pass 3 (seeded data + deep flows)

**What:** Seeded walkthrough data for Axiom_4 (activity, surveys, SWD profiles, execution success/failed/pending, tenants org Nanoheal + installs, users, scores, pending publish). Digital Experience layout switched from LightDash embed to `DexDashboardViewPage` (`dex-score-overview`). GPO list filters `isActive`. Push & audit renamed Deploy (menu + hub tab). Execution history shows pending. Deep Playwright captures for Workflow Builder (When / conditions / review / link) and SWD create/deploy. Enriched README “what it does” copy. **Catalog consolidated:** primary module entries use seeded shots (`097`–`110`); deep flows under `#workflow-builder-deep` / `#software-distribution-deep` (`111`–`124`). Scripts: `seed-walkthrough-ui-data.mjs`, `crawl-deep-flows.mjs`.

**Why:** Catalog should show realistic product data and how-to screens, not empty tables or LightDash login. Pass 3 first appended new PNGs while leaving empty pass-2 screens as the first entry per module — that made it look like nothing changed.

**Files:** `ui-walkthrough/**`, AEX `compliance-score-placeholder-layout.json`, `gpo-catalog.source.json`, `execution-history.source.json`, `swd-audit.source.json`, `manage-software-distribution-layout.json`, `seed-menu-items.sql`, `scripts/seed-walkthrough-ui-data.mjs`

**Status:** implemented

**What:** Expanded Windows Client walkthrough with user-facing “what this module is” + “what the user can do” for every page (install, home, device, history, search, L2/L3, support, survey, chat, sign-in). Regenerated `Windows-Client-UI-Walkthrough.docx` and README. Fixed duplicate Chat Now section.

**Why:** Document should explain options and actions, not only show screenshots.

**Files:** `ui-walkthrough/windows-client/README.md`, `ui-walkthrough/windows-client/Windows-Client-UI-Walkthrough.docx`

**Status:** implemented

## 2026-08-25 — Windows Client UI walkthrough + survey/chatbot mockups

**What:** Built `ui-walkthrough/windows-client/` from Desktop `New UI Pages 3.docx` screenshots. Survey + chat overlays use attached landing unchanged. Chat aligned to `WidgetIframe.tsx`: FAB bottom-right with Nanoheal icon (no blue circle); open panel bottom-right. Greeting **Hi**. Chat Now sign-in mockup replaces **ADM** logo with **Nanoheal** (`18-chat-signin-nanoheal.png`). Live Entra ID company branding must be updated for production. `WALKTHROUGH.html` + Desktop `.docx` refreshed.

**Why:** Match how chat launches in the Electron client; brand launcher and sign-in with Nanoheal only.

**Files:** `ui-walkthrough/windows-client/**`

**Status:** implemented

## 2026-08-25 — Live AEX UI walkthrough (screenshots + catalog)

**What:** Pass 2 capture of Live AEX (`localhost:5176`, admin / Axiom_4): data-ready waits (shell + content, not mid-skeleton), enabled sidebar pages, disabled menu routes, all 24 DEX report views, create/edit overlays (users, classification, tenants, automation, data collection, device protection, integrations, add device, SWD, blank workflow, user edit), and inventory device detail drawer. Catalog in `ui-walkthrough/README.md`; PNGs in `screenshots/`; recapture `node crawl-screenshots.mjs` (+ `crawl-retry.mjs`). Score Models has no Create control; census full-page route is thin vs inline inspector.

**Why:** Baseline product surface map before DEX dashboard work — visual inventory of what ships today vs roadmap stubs.

**Files:** `ui-walkthrough/**`

**Status:** implemented

**Supersedes:** earlier same-day pass that screenshot mid-“Loading runtime” / skeletons only.

## 2026-08-15 — DEX scoring executable contract (nh_score_v1)

**What:** Added `DEX-Platform-Blueprint/scoring/nh_score_v1.json` + README. Reconciles chat draft with Blueprint: 4-pillar DEX (0.3/0.3/0.2/0.2), Excellent/Good/Fair/Poor bands, boot/login cutoffs aligned to P90 Good/Fair/Poor, client metric scores vs server category/DEX weights, Claude review fixes (`link_util_*_pct`, worst-case window stats, vpn null-until-emitted, proportional renormalize, compliance streak rule). Pointed Volume-3A + metric-catalog-session-1 + Blueprint README at the contract. Supersedes draft technology 70/sentiment 30 and Frustrating/Average/Good labels. README also notes live DATA GAP banner on `computeBranchScores` and that `control_unhealthy_streak_days` is not in `compliance_v2` yet.

**Why:** One source of truth so implementers do not choose between Blueprint and an incompatible draft.

**Files:** `DEX-Platform-Blueprint/scoring/**`, `DEX-Platform-Blueprint/README.md`, `DEX-Platform-Blueprint/metrics/metric-catalog-session-1.md`, `DEX-Platform-Blueprint/docs/SESSION-3/Volume-3A-KPI-Dictionary.md`

**Status:** implemented

## 2026-08-15 — DEX V2 Pinot assessment package

**What:** Added `DEX-V2-Assessment/` with Documents 1–7 (data assessment, competitive analysis, 65-dashboard catalog, gap analysis, insight engine, architecture, roadmap), production SQL templates, live Pinot query snapshot, and working HTML dashboards built from real V2 data (no fabricated metrics).

**Why:** Determine whether current V2 Pinot telemetry can support a competitive DEX platform and define an honest build path vs Nexthink/Lakeside.

**Files:** `DEX-V2-Assessment/**`

**Status:** implemented

## 2026-08-15 — Reconciliation with Claude live audit

**What:** Added `00-RECONCILIATION-CLAUDE-AUDIT.md` after re-querying production Pinot. Confirmed events noise (91.75% one non-fleet device), branch autoheal split (Downtown 100% vs Northside/Westgate/Harborview 0%), dead `score`, irregular 1.7–30h sampling gaps, unwired Blueprint. Corrected Claude on `process_version` (populated). Noted `dashboards/app.js` live app is not in this workspace tree.

**Why:** Lock ground truth across two audits; prevent catalog/blueprint overclaim.

**Status:** implemented
