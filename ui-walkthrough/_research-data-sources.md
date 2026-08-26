# AEX UI walkthrough — data sources research

**Scope:** `AEX/aex-V1.2` · **Date:** 2026-08-25  
**Goal:** Seed/demo data + screenshot click paths. Prefer seed SQL / `seed:realistic-demo` over product code. LightDash: config-only if needed.

**Primary seed:** `aex-V1.2/backend/scripts/seed-realistic-demo-data.mjs` (`npm run seed:realistic-demo` from backend; env `DEMO_SITE_ID` / `DEMO_SITE_NAME`).

---

## 1. ActivityLog / activity-logs

| | |
|---|---|
| **Table / API** | Prisma `ActivityLog` (table `"ActivityLog"`). Caps: `activity-logs-list-read`, create via gateway / `activity-log-create-write` (internal). Entity: `activity-logs`. |
| **UI** | Sidebar **Recent Activity** → `/settings/audit/activity-log` · layout `activity-logs-list-layout`. |
| **Seed** | Already in `seed-realistic-demo-data.mjs` (~72 base rows + ~10 policy-extension rows). Backfill only: `backend/scripts/migrations/backfill-history-to-activity-log.sql`. |
| **Minimal INSERT shape** | `userId`, `pageName`, `moduleName`, `tenant`/`site_id`, `activity`, `time` (Unix **seconds**), `initiatedBy`, `status`, `action`, `viewedStatus` (`N`), `complianceCategory`. |
| **Recommend** | **Seed SQL / re-run realistic demo** — already covers list screenshots. Skip Playwright create. |

---

## 2. Automation profiles list

| | |
|---|---|
| **Table / API** | `executable` / legacy `Automation` via **`executable-product-list-read`**. Source: `frontend/src/pages/automations/automations.source.json`. Filter: `types in (autoheal, selfhelp, scheduler)` (+ dart 69 for autoheal). |
| **UI** | Automate → **Library** `/actions/library` · `automation-library-hub-layout`. |
| **Sample friendly names** | Catalog templates: Disk Cleanup, Application Recovery, VPN Repair, Memory Cleanup. Demo-lib: `[demo-lib] Patch baseline — staged rings`, `Client health — agent heartbeat SLA`, `Repair — Windows Update cache`, `M365 — Office cache trim`. |
| **Recommend** | **Seed** (`seed:realistic-demo` library dataplane) or use existing site executables. Screenshot list only — no deep-click. |

---

## 3. Workflow Builder create flow

| | |
|---|---|
| **Routes / layouts** | Hub: `/actions/library/visual-builder` · `automation-workflow-builder-hub-layout`. Create canvas: `automation-visual-create-layout` (also `/system-settings/automation-snippets/visual-create`). Edit: `automation-visual-edit-layout`. Flows: `automation-visual-create-flow`, `automation-visual-publish-create-flow`, `executable-product.flow.json`. |
| **Type mapping (Details → When)** | **On demand** → `selfhelp` · **Event Trigger** → `autoheal` · **Schedule** → `scheduler` (`AUTOMATION_START_TRIGGERS` in `automation-visual-builder.ts`). |
| **Wizard chips** | Actions → Details → **Review** (`journey.steps` in `automation-workflow-builder.catalog.json`). |
| **Conditions Matches / Does not match** | CHECK decision branches on canvas (`decisionBranchLabels` / defaults `"Matches"` / `"Does not match"`). Autoheal rules: `CompoundRuleArrayField` on Event Trigger. |
| **Link / unlink** | Not separate wizard screens. After save: inspector **Link scope** → assign confirm layouts `executable-product-assign-*-confirm-layout`; unlink from assignment UI / detach. Stages **Pending Publish**. |
| **Click path for screenshots** | Automate → Workflow Builder → Start draft / Create custom → add action → Continue to details → pick When (On demand / Event / Schedule) → Continue to review → Save. For branches: add CHECK / decision step → capture Matches & Does not match. For link: Library → row → Link scope → confirm. |
| **Recommend** | **Playwright deep-click** for create/review/conditions/link (no seed reproduces wizard UI). List hub = config-only navigate. |

---

## 4. Campaigns / surveys

| | |
|---|---|
| **Table / API** | Same **`executable-product-list-read`**, pageCapability `campaigns-list`. Filter description contains: `dart304:workflow:desktopsatisfaction-usersurvey` \| `employeesatisfaction-usersurvey` \| `employeesentiment-usersurvey`. **Not** `Feedback` table (that is separate NPS-style feedback). |
| **UI** | Automate → **Survey** `/actions/campaigns` · `campaigns-hub-layout`. |
| **Seed** | Realistic demo does **not** create these description markers. Empty until survey workflows imported/linked. |
| **Recommend** | **Minimal seed SQL/Prisma**: insert/update an `executable`/`Automation` row with `types=selfhelp`, dart 304, and one of the description markers + friendly `automationName` (e.g. Desktop Satisfaction Survey). Prefer seed over Playwright import. |

---

## 5. GPO ADMX templates — repeated rows

| | |
|---|---|
| **Table / API** | `AdmxAdml` · `admx-catalog-list-read` · `gpo-catalog.source.json`. Columns: `policy_name`, `Category`, `SubCategory`, `catalogVersion`, `isActive`. |
| **Why repeats** | Catalog stores **one row per ADMX import / OS catalog version** (`catalog_version`). Same `policy_name`/`policy_id` can appear across versions; no unique on name. Full Microsoft ADMX packs are intentionally large. |
| **Filter / labels** | Handler `admxCatalogPrismaWhere` supports Category/SubCategory/`where` equals/contains. UI already shows Catalog version + Active. Can add list `where: { isActive: { equals: true } }` and/or filter by latest `catalogVersion` in **source JSON** (config-only). |
| **UI** | `/actions/catalogs/gpo-templates` · `policy-catalog-hub-layout`. |
| **Recommend** | **Config-only**: filter `isActive=true` (+ optional category). For screenshots, search a distinctive name. Do not dedupe DB for walkthrough. |

---

## 6. Pending publish / manifest drafts

| | |
|---|---|
| **Table / API** | `group_manifest_draft` (+ change_log). Caps: `manifest-drafts-list-read`, `manifest-draft-read`, `manifest-draft-changes-list-read`, publish/discard writes. Entity `manifest-drafts`. |
| **UI** | Automate → **Pending Publish** `/actions/pending-publish` · `manifest-drafts-list-layout`. |
| **How rows appear** | Link/unlink/save profiles (automations, SWD, data collection, protection, GPO) **stages** draft; list omits `changeCount === 0`. |
| **Recommend** | **Playwright**: Library → Link scope on a demo automation → open Pending Publish. No standalone seed without staging APIs. |

---

## 7. Digital Experience `/experience/compliance-score` — LightDash login

| | |
|---|---|
| **Cause** | Layout `compliance-score-placeholder-layout` uses `ExternalEmbed` + hardcoded LightDash URL (`lightdash.nanoheal.app/...`). Unauthenticated iframe → LightDash login. Same URL in `app.contract.json` / `sidebar.contract.json`. |
| **Real DEX pattern** | Sibling Experience pages use **`DexDashboardViewPage`** + `dashboardId` from `dex-dashboards-definitions.json` (e.g. `dex-employee-experience-layout` → `employee-experience-report`). |
| **UI** | Experience → Digital Experience `/experience/compliance-score`. Alternatives already good: `/experience/employee`, `/device`, `/application`, `/network`, `/benchmarks`. |
| **Recommend** | **Config-only fix (allowed):** change `compliance-score-placeholder-layout.json` to `DexDashboardViewPage` with a real `dashboardId` (e.g. reuse employee/compliance-score-trend definition if present). Do **not** rely on LightDash SSO for walkthrough. Screenshot sibling DEX routes as fallback. |

---

## 8. Execution history

| | |
|---|---|
| **Table / API** | Prisma `Audit` · `audits-list-read`. Source filters **`JobStatus not 0`** (pending hidden). Status map: `0` Pending, `1` Success, `2` Failed. |
| **UI** | Manage → **Execution History** `/manage/execution-history`. |
| **Seed** | `seed-realistic-demo-data.mjs` creates ~36 Audit rows (`JobStatus` 1 or 2). |
| **Add rows** | Insert into `"Audit"` with `MachineTag`, `ProfileName`, `JobType`, `Dart`, `JobCreatedTime`, `site_id`, `JobStatus` 1/2 (and 0 only if you also relax list where). |
| **Recommend** | **Seed** — demo already enough for success/failed. Pending needs filter change or accept “not shown”. |

---

## 9. Remote execution list

| | |
|---|---|
| **Table / API** | `executable-product-list-read` + pageCapability **`remote-execution-list`** (`requireAssigned` / deployment filter — only linked, runnable items). |
| **UI** | Manage → **Remote Execution** `/actions/execution/remediation` · `remediation-layout`. |
| **Recommend** | Link a selfhelp automation with Remote Execution deployment, **or** Playwright after Link scope. Empty list = expected until assigned. |

---

## 10. Software distribution profiles + Push & audit

| | |
|---|---|
| **Profiles** | Caps `swd-profiles-list-read`; `types=swd-profile`. Install: `category=installation` (`swd-install.source.json`). Uninstall tab separate. Hub: `/devices/software/software-distribution` · `manage-software-distribution-layout` (tabs: install / uninstall / snippets / **Push queue & device audit**). |
| **Push & audit** | Standalone menu **Push & audit** `/devices/software/swd-push-audit` · `swd-push-audit-layout`. Data: `audits-list-read` where `Dart=288` and `JobType=SWD`. Seed creates 6 demo SWD audit rows. |
| **Create flow** | Intent `swd-profile-create` → `swd-profile-visual-create-layout` / `swd-profile-create-write`. Link scope / pending publish same as automations. |
| **Rename concept** | Product label today: “Push & audit” / tab “Push queue & device audit”. Walkthrough copy can say **Software distribution deploy** without code; menu rename = seed-menu + layout label only if product wants it. |
| **Recommend** | **Seed** for list + audit screenshots. Create profile = **Playwright** or skip (demo profiles `[demo-lib] SWD profile — Demo install (7-Zip)`). |

---

## 11. Tenants — zeros / Nanoheal org counts

| | |
|---|---|
| **Table / API** | `Sites` · `sites-admin-list-read`. **Active installs** = `used_seats` from `install.installationdownloadstatus` joined on `lower(siteregcode)=lower(Sites.regcode)` and `revokestatus=0`. Organization = `commercial_owner_id` ↔ `license_pools.owner_id`. |
| **Why zeros** | No matching IDS rows for site `regcode`, or missing `license_pool_id` / install schema empty locally. Census demo devices ≠ install seat counts. |
| **UI** | Organisation → **Tenants** `/settings/organization/tenants`. |
| **Recommend** | **Seed SQL** into `install.installationdownloadstatus` for the Nanoheal site `regcode` (and ensure pool/org linkage). Or screenshot without relying on seats. Do not fake in FE. |

---

## 12. Users accounts sample data

| | |
|---|---|
| **Table / API** | `"userAccounts"` · `user-accounts-list-read`. |
| **UI** | Administration → Users & Access `/settings/users` (hub) → user accounts. |
| **Seed** | `backend/scripts/migrations/seed-users.sql` → `admin@nanoheal.com` / `Nano@123$$`; `seed-l1-agent.sql` for L1. Create more via UI Create user. |
| **Recommend** | **Seed SQL** (admin + optional extras). Screenshot list/create inline — light Playwright if needed. |

---

## 13. Score models

| | |
|---|---|
| **Table / API** | Prisma `Scores` · `scores-list-read`. |
| **UI** | `/compliance/policy/score-models` · `scores-list-layout` (menu Score Models). |
| **Seed** | Realistic demo creates 6 metrics (e.g. Application responsiveness index, Median cold boot time, … `applicationName: Nanoheal DEX`). |
| **Recommend** | **Re-run seed:realistic-demo**. Create overlay may be missing control (walkthrough noted “No create control”) — list screenshot only. |

---

## Quick matrix (approach)

| # | Topic | Prefer |
|---|--------|--------|
| 1 | Activity logs | Seed (already) |
| 2 | Automation profiles | Seed / existing executables |
| 3 | Workflow Builder screens | Playwright deep-click |
| 4 | Campaigns | Minimal executable seed w/ survey description |
| 5 | GPO ADMX repeats | Config filter `isActive` + search |
| 6 | Pending publish | Playwright link-scope |
| 7 | Compliance score / LightDash | **Config → DexDashboardViewPage** |
| 8 | Execution history | Seed Audit rows |
| 9 | Remote execution | Link + assign, then screenshot |
| 10 | SWD + Push & audit | Seed; rename = docs/menu labels |
| 11 | Tenants zeros | Seed `installationdownloadstatus` |
| 12 | Users | `seed-users.sql` |
| 13 | Score models | Seed Scores |

---

## Ops cheat sheet

```bash
cd /Users/divyach/Documents/Projects/Nanoheal/AEX/aex-V1.2/backend
# Prefer targeting the UI’s current site:
DEMO_SITE_NAME=Axiom_4 npm run seed:realistic-demo   # or DEMO_SITE_ID=…
```

Screenshot crawl: `aex-dashboards/ui-walkthrough/` (`node crawl-screenshots.mjs`).
