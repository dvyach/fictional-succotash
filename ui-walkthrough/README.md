# Live AEX product — UI walkthrough

**Open the full visual document:** [WALKTHROUGH.html](./WALKTHROUGH.html) · Word: [Live-AEX-UI-Walkthrough.docx](./Live-AEX-UI-Walkthrough.docx) · Markdown: this README

**Status:** implemented · 2026-08-25 (pass 4 — blank screens: Deploy/Execution History/GPO hubs filled)
**Source:** `http://localhost:5176` (admin session)
**Scope:** Enabled sidebar pages, disabled menu routes, DEX report views, create/edit overlays, device detail, Workflow Builder deep steps, Software Distribution create/deploy
**Screenshots:** `screenshots/` (1440×900; taken after shell + content ready — not mid-skeleton)
**Recapture:** `node crawl-screenshots.mjs` then `node crawl-deep-flows.mjs` then `python3 generate-readme.py` · blank-screen pass: `node recapture-blank-screens.mjs` · docs: `python3 generate-docs.py`

## How to read this

Each entry is one navigable product surface or overlay. Descriptions come from live UI copy and observed behavior. Items marked **Coming soon / placeholder** have nav wired but limited UI. **Disabled menu** items are `enabled: false` in `MenuItems` but still reachable by URL.

**Pass 4 blank-screen fix:** Deploy and Execution History were empty because Audit GraphQL `siteId` filters returned 0 rows (fixed with Prisma `audits-list-read` handler). Recaptured Scheduling, Monitoring→Data Collection, Deployment enrolment placeholder, Version Catalog (Agent Management), GPO Policies (3), Policy Execution (6), Deploy (9 SWD), Selfhelp/Autoheal library (`125`/`126`).

**Pass 3 (seeded) screens** are the primary shots for Recent Activity, Automation, Survey, GPO, Pending Publish, Digital Experience, Execution History, Remote Execution, Software Distribution, **Deploy**, Tenants, Users & Access, Audit, and Score Models (files `097`–`110`). Step-by-step authoring is under **[Workflow Builder deep](#workflow-builder-deep)** (`111`–`120`) and **[Software Distribution deep](#software-distribution-deep)** (`121`–`124`).

**Captured:** 109/110 ok · 2026-08-25T12:18:10.703Z

| Bucket | Count |
| --- | ---: |
| Enabled pages | 46 |
| Disabled menu | 12 |
| DEX report views | 24 |
| Total results (incl. overlays/detail) | 110 |

### Placeholder / coming soon in this build

- Experience / Trends
- Manage / Device Explorer
- Manage / Patch Management
- Administration / Branding
- Administration / Security

### Capture failures

- **Create / edit overlays / Score Models — Create overlay** — `No create control`

## Home

### Overview

- **Path:** `/home`
- **What it does:** Tenant home / control tower. Use it to see device health, compliance posture, open alerts, and recommended actions for the selected site at a glance.
- **Screenshot:** ![Overview](screenshots/001-home-overview.png)

### Recent Activity — Activity logs

- **Path:** `/settings/audit/activity-log`
- **What it does:** Operational activity log — who changed automations, published surveys, pushed software, or linked profiles. Useful when auditing recent admin work. Hub also exposes Ticket Audit and System Events.
- **Screenshot:** ![Recent Activity](screenshots/097-home-recent-activity-seeded.png)

## Automate

### Automation — Profiles

- **Path:** `/actions/library`
- **What it does:** Automation library of self-help, autoheal, and scheduler profiles. Browse friendly remediations (disk cleanup, VPN repair, app recovery), open details, then link scope to device groups.
- **Screenshot:** ![Automation](screenshots/098-automate-automation-profiles-seeded.png)

### Workflow Builder

- **Path:** `/actions/library/visual-builder`
- **What it does:** Workflow Builder for authoring automations visually: pick a template or create custom, add actions, set When (On demand / Event Trigger / Schedule), add Matches / Does not match conditions, review, save, then link or unlink scope.
- **Screenshot:** ![Workflow Builder](screenshots/111-workflow-builder-deep-01-hub-templates-create-custom.png)

### Survey — Campaigns

- **Path:** `/actions/campaigns`
- **What it does:** Survey campaigns for desktop satisfaction, employee satisfaction, and sentiment. Launch and track feedback workflows for the current site.
- **Screenshot:** ![Survey](screenshots/099-automate-survey-campaigns-seeded.png)

### Data Collection

- **Path:** `/actions/catalogs/data-collection`
- **What it does:** Catalog of data-collection profiles (performance, storage, user activity, network). Used to decide what telemetry agents gather for DEX and compliance.
- **Screenshot:** ![Data Collection](screenshots/006-automate-data-collection.png)

### Device Protection — Protection policies

- **Path:** `/actions/catalogs/device-protection`
- **What it does:** Device protection profiles (registry, services, application control, paths, USB). Apply desired lockdown baselines to classified device groups.
- **Screenshot:** ![Device Protection](screenshots/007-automate-device-protection.png)

### GPO — Policy templates (ADMX)

- **Path:** `/actions/catalogs/gpo-templates`
- **What it does:** ADMX policy template browser for Windows desired-state. Active templates only — pick a template to create GPO-style policies without repeating inactive catalog versions.
- **Screenshot:** ![GPO](screenshots/100-automate-gpo-admx-active-only.png)

### Pending Publish — Pending Configuration Changes

- **Path:** `/actions/pending-publish`
- **What it does:** Pending Publish lists staged configuration changes (link/unlink of automations, SWD, protection, GPO) per machine group before they go live.
- **Screenshot:** ![Pending Publish](screenshots/101-automate-pending-publish-seeded.png)

## Innovate

### AI Helpdesk

- **Path:** `/innovate/conversation`
- **What it does:** Conversational AI Helpdesk (Haya). Ask plain-language estate questions; use suggested prompts and the details panel to drill into devices and issues.
- **Screenshot:** ![AI Helpdesk](screenshots/010-innovate-ai-helpdesk.png)

### Investigations

- **Path:** `/innovate/haya`
- **What it does:** Investigation workspace that shares the Haya conversation surface — continue a helpdesk thread into a structured investigation.
- **Screenshot:** ![Investigations](screenshots/011-innovate-investigations.png)

### Anomaly Detection — Clusters

- **Path:** `/innovate/clusters`
- **What it does:** Anomaly clusters surfaced by Haya. Open a cluster when you need to investigate unusual device or experience patterns.
- **Screenshot:** ![Anomaly Detection](screenshots/012-innovate-anomaly-detection.png)

### Forecasting — Forecasts

- **Path:** `/innovate/forecasts`
- **What it does:** Forecast instances bound to Studio-published definitions — projected capacity, risk, or experience trends.
- **Screenshot:** ![Forecasting](screenshots/013-innovate-forecasting.png)

### Query Builder

- **Path:** `/insights/exploration/query-builder`
- **What it does:** Ad-hoc analytics: choose dimensions and measures, apply JSON filters, and Execute for custom estate questions.
- **Screenshot:** ![Query Builder](screenshots/014-innovate-query-builder.png)

### Agent Workbench

- **Path:** `/insights/exploration/agent-workbench`
- **What it does:** Agent chat workbench with smart recommendations driven by telemetry — explore remediation ideas before pushing them.
- **Screenshot:** ![Agent Workbench](screenshots/015-innovate-agent-workbench.png)

### Alerts

- **Path:** `/innovate/haya?feature=alerts`
- **What it does:** Alert triage surface (Haya conversation in this build) for operational notifications.
- **Screenshot:** ![Alerts](screenshots/016-innovate-alerts.png)

## Experience

### Dashboards catalog — 24 DEX & Device Reports

- **Path:** `/experience/dashboards`
- **What it does:** Catalog of Digital Experience (DEX) and device reports — search/filter and open View for each report definition.
- **Screenshot:** ![Dashboards catalog](screenshots/017-experience-dashboards-catalog.png)

### Reports — Digital Experience Overview

- **Path:** `/experience/reports`
- **What it does:** Executive Digital Experience Overview — fleet score, device counts, sentiment, trends, and experience pillars for leadership.
- **Screenshot:** ![Reports](screenshots/018-experience-reports.png)

### Employee Experience

- **Path:** `/experience/employee`
- **What it does:** Employee Experience story: sentiment, respondents, and complaint themes that explain how people feel about their devices.
- **Screenshot:** ![Employee Experience](screenshots/019-experience-employee-experience.png)

### Device Experience

- **Path:** `/experience/device`
- **What it does:** Device Experience story: satisfaction plus boot/hardware health signals that drive endpoint quality.
- **Screenshot:** ![Device Experience](screenshots/020-experience-device-experience.png)

### Application Experience

- **Path:** `/experience/application`
- **What it does:** Application Experience story: business and collaboration app scores (Teams, browsers, Office, etc.).
- **Screenshot:** ![Application Experience](screenshots/021-experience-application-experience.png)

### Network Experience

- **Path:** `/experience/network`
- **What it does:** Network Experience story: infrastructure performance, latency, and connectivity impact by site.
- **Screenshot:** ![Network Experience](screenshots/022-experience-network-experience.png)

### Digital Experience — DEX Score Overview

- **Path:** `/experience/compliance-score`
- **What it does:** Digital Experience dashboard (fleet DEX score, location impact, and experience drivers) — not an external BI login.
- **Screenshot:** ![Digital Experience](screenshots/102-experience-digital-experience-dashboard.png)

### Benchmarks — End-User Experience Improvement

- **Path:** `/experience/benchmarks`
- **What it does:** Benchmarks comparing satisfaction indexes against endpoint performance so you can spot outliers.
- **Screenshot:** ![Benchmarks](screenshots/024-experience-benchmarks.png)

### Trends *(coming soon / placeholder)*

- **Path:** `/experience/trends`
- **What it does:** Trends placeholder for historical posture reporting (coming soon).
- **Screenshot:** ![Trends](screenshots/025-experience-trends.png)

## Manage

### Inventory — Devices

- **Path:** `/devices/inventory/census`
- **What it does:** Device inventory (Census) — OS filters, search, add device, export, and health chips for the managed fleet.
- **Screenshot:** ![Inventory](screenshots/026-manage-inventory.png)

### Device Explorer *(coming soon / placeholder)*

- **Path:** `/devices/inventory/device-explorer`
- **What it does:** Coming soon — planned device search + full profile explorer.
- **Screenshot:** ![Device Explorer](screenshots/027-manage-device-explorer.png)

### Execution History

- **Path:** `/manage/execution-history`
- **What it does:** Execution History of solutions pushed to devices — success, failed, and pending runs with profile and machine context.
- **Screenshot:** ![Execution History](screenshots/103-manage-execution-history-seeded.png)

### Remote Execution

- **Path:** `/actions/execution/remediation`
- **What it does:** Remote Execution: pick a linked remediation and run it now against a site, group, or device when you need immediate fix-forward.
- **Screenshot:** ![Remote Execution](screenshots/104-manage-remote-execution.png)

### Software Distribution — Software install profiles

- **Path:** `/devices/software/software-distribution`
- **What it does:** Software Distribution — install and uninstall profiles plus snippets. Create packages, then deploy them to rings or groups.
- **Screenshot:** ![Software Distribution](screenshots/105-manage-software-distribution-seeded.png)

### Deploy — Software distribution — Deploy

- **Path:** `/devices/software/swd-push-audit`
- **What it does:** Software distribution Deploy queue — per-device audit of install/uninstall jobs (queued, success, failed).
- **Screenshot:** ![Deploy](screenshots/106-manage-deploy-seeded.png)

### Patch Management *(coming soon / placeholder)*

- **Path:** `/devices/software/patch-management`
- **What it does:** Coming soon — Windows Update / patch tracking.
- **Screenshot:** ![Patch Management](screenshots/032-manage-patch-management.png)

### Violations

- **Path:** `/innovate/haya?feature=violations`
- **What it does:** Violations triage (Haya conversation in this build).
- **Screenshot:** ![Violations](screenshots/033-manage-violations.png)

## Administration

### Tenants

- **Path:** `/settings/organization/tenants`
- **What it does:** Organisation tenants/sites — names, Nanoheal organization, tenant keys, active installs, and license pools.
- **Screenshot:** ![Tenants](screenshots/107-administration-tenants-nanoheal-org.png)

### Branding *(coming soon / placeholder)*

- **Path:** `/manage/organisation/branding`
- **What it does:** Coming soon — branding on the IA roadmap.
- **Screenshot:** ![Branding](screenshots/035-administration-branding.png)

### Licensing

- **Path:** `/settings/licensing`
- **What it does:** License pools — entitlements, seat usage, and which sites consume which pool.
- **Screenshot:** ![Licensing](screenshots/036-administration-licensing.png)

### Integrations — Connectors

- **Path:** `/settings/integrations`
- **What it does:** Integrations hub: Connectors, API Keys, API catalog, and Event Subscriptions for ITSM/SIEM and partner systems.
- **Screenshot:** ![Integrations](screenshots/037-administration-integrations.png)

### Agent Management — Versions & rings

- **Path:** `/settings/agents`
- **What it does:** Agent Management — versions & rings, device updates, version catalog, and package uploads.
- **Screenshot:** ![Agent Management](screenshots/038-administration-agent-management.png)

### Users & Access — User accounts

- **Path:** `/settings/users`
- **What it does:** Users & Access — accounts, roles/RBAC, SSO, and MFA policy for who can operate the console.
- **Screenshot:** ![Users & Access](screenshots/108-administration-users-access-seeded.png)

### Security *(coming soon / placeholder)*

- **Path:** `/settings/security`
- **What it does:** Coming soon — certificates/secrets and GDPR ops placeholders.
- **Screenshot:** ![Security](screenshots/040-administration-security.png)

### Classification — Device classifications

- **Path:** `/devices/organization/device-classification`
- **What it does:** Device classification groups used for targeting automations, SWD, and protection policies.
- **Screenshot:** ![Classification](screenshots/041-administration-classification.png)

### Audit — Activity logs

- **Path:** `/settings/audit`
- **What it does:** Administration Audit hub — activity logs of console actions, plus ticket and system event views for governance.
- **Screenshot:** ![Audit](screenshots/109-administration-audit-activity-logs.png)

### Score Models — Scores

- **Path:** `/compliance/policy/score-models`
- **What it does:** Score Models — metrics that feed DEX and operations scoring (responsiveness, boot time, composite experience, deflection, etc.).
- **Screenshot:** ![Score Models](screenshots/110-administration-score-models-seeded.png)

## Settings

### Profile

- **Path:** `/account/profile`
- **What it does:** Personal profile — display name, timezone, and password for the signed-in operator.
- **Screenshot:** ![Profile](screenshots/044-settings-profile.png)

### Preferences

- **Path:** `/account/preferences`
- **What it does:** Theme and accent color preferences for the console chrome.
- **Screenshot:** ![Preferences](screenshots/045-settings-preferences.png)

## Header

### Help & Feedback

- **Path:** `/experience/help`
- **Resolved URL:** `http://localhost:5176/`
- **What it does:** Help & Feedback — submit product feedback or open help from the header.
- **Screenshot:** ![Help & Feedback](screenshots/046-header-help-feedback.png)

## DEX report views

### DEX Score Overview

- **Path:** `/experience/dashboard/view/dex-score-overview`
- **Category:** Digital Experience (DEX)
- **What it does:** Fleet-wide digital experience score, location impact, and drivers across the estate.
- **Screenshot:** ![DEX Score Overview](screenshots/059-dex-report-views-dex-score-overview.png)

### What Changed — Device & DEX Drivers — Anomaly & Degradation Intelligence

- **Path:** `/experience/dashboard/view/anomaly-degradation-intelligence`
- **Category:** Digital Experience (DEX)
- **What it does:** Period-over-period DEX movement driven by boot time, crashes, patch gaps, and network latency on managed devices.
- **Screenshot:** ![What Changed — Device & DEX Drivers](screenshots/060-dex-report-views-what-changed-device-dex-drivers.png)

### IT Leadership — Experience Summary — Digital Experience Overview

- **Path:** `/experience/dashboard/view/dex-executive-reports`
- **Category:** Digital Experience (DEX)
- **What it does:** Cross-pillar endpoint experience: device performance, application stability, sentiment, and service-desk load.
- **Screenshot:** ![IT Leadership — Experience Summary](screenshots/061-dex-report-views-it-leadership-experience-summary.png)

### Device Friction → Productivity Loss — Experience-to-Productivity Impact

- **Path:** `/experience/dashboard/view/experience-productivity-impact`
- **Category:** Digital Experience (DEX)
- **What it does:** Correlate slow boot, login delays, and degradation events with lost work time by persona and site.
- **Screenshot:** ![Device Friction → Productivity Loss](screenshots/062-dex-report-views-device-friction-productivity-loss.png)

### Endpoint Experience Scorecard — Device Experience

- **Path:** `/experience/dashboard/view/device-experience-report`
- **Category:** Device Fleet & Endpoints
- **What it does:** Boot and logon times, stability, battery health, and satisfaction by device model and region.
- **Screenshot:** ![Endpoint Experience Scorecard](screenshots/063-dex-report-views-endpoint-experience-scorecard.png)

### Boot & Logon Performance — Experience Engineering Deep Dive

- **Path:** `/experience/dashboard/view/experience-engineering-deep-dive`
- **Category:** Device Fleet & Endpoints
- **What it does:** Windows startup and sign-in duration trends — identify fleets with slow boot or profile load issues.
- **Screenshot:** ![Boot & Logon Performance](screenshots/064-dex-report-views-boot-logon-performance.png)

### Device Lifecycle & Refresh Readiness — Lifecycle & Device Health Intelligence

- **Path:** `/experience/dashboard/view/lifecycle-device-health`
- **Category:** Device Fleet & Endpoints
- **What it does:** Device age, warranty status, battery wear, vulnerability exposure, and lifecycle risk for refresh planning.
- **Screenshot:** ![Device Lifecycle & Refresh Readiness](screenshots/065-dex-report-views-device-lifecycle-refresh-readiness.png)

### CPU, Memory & Right-Sizing — Right-Sizing & Performance Optimization

- **Path:** `/experience/dashboard/view/right-sizing-performance`
- **Category:** Device Fleet & Endpoints
- **What it does:** Saturation events, headroom, and over/under-provisioned laptops — right-size hardware before users hit limits.
- **Screenshot:** ![CPU, Memory & Right-Sizing](screenshots/066-dex-report-views-cpu-memory-right-sizing.png)

### Business Application Health — Application Experience

- **Path:** `/experience/dashboard/view/application-experience-report`
- **Category:** Applications on Endpoints
- **What it does:** ERP, Office, and line-of-business app stability scores, crash rates, and license utilization on managed PCs.
- **Screenshot:** ![Business Application Health](screenshots/067-dex-report-views-business-application-health.png)

### App Crashes & Instability — Autonomous Operations Control

- **Path:** `/experience/dashboard/view/autonomous-operations-control`
- **Category:** Applications on Endpoints
- **What it does:** Crash frequency, degradation velocity, and devices with recurring application failures.
- **Screenshot:** ![App Crashes & Instability](screenshots/068-dex-report-views-app-crashes-instability.png)

### Software Inventory & License Use — License & Software Efficiency

- **Path:** `/experience/dashboard/view/license-software-efficiency`
- **Category:** Applications on Endpoints
- **What it does:** Installed software utilization, reclaimable licenses, and unused apps across the endpoint estate.
- **Screenshot:** ![Software Inventory & License Use](screenshots/069-dex-report-views-software-inventory-license-use.png)

### Teams, Outlook & Meeting Apps — Autonomous Operations Control

- **Path:** `/experience/dashboard/view/autonomous-operations-control`
- **Category:** Applications on Endpoints
- **What it does:** Collaboration tool performance on endpoints — crashes, latency impact, and auto-remediation outcomes.
- **Screenshot:** ![Teams, Outlook & Meeting Apps](screenshots/070-dex-report-views-teams-outlook-meeting-apps.png)

### Network, Wi‑Fi & VPN Quality — Network Experience

- **Path:** `/experience/dashboard/view/network-experience-report`
- **Category:** Network & Remote Access
- **What it does:** Latency, jitter, and packet loss for office and remote workers — tie network issues to DEX drops.
- **Screenshot:** ![Network, Wi‑Fi & VPN Quality](screenshots/071-dex-report-views-network-wi-fi-vpn-quality.png)

### Device Degradation & Anomalies — Anomaly & Degradation Intelligence

- **Path:** `/experience/dashboard/view/anomaly-degradation-intelligence`
- **Category:** Network & Remote Access
- **What it does:** Devices trending worse: degradation events, stability variance, and MTTR for endpoint incidents by team.
- **Screenshot:** ![Device Degradation & Anomalies](screenshots/072-dex-report-views-device-degradation-anomalies.png)

### Employee Device Satisfaction — Employee Experience

- **Path:** `/experience/dashboard/view/employee-experience-report`
- **Category:** Workforce Experience
- **What it does:** End-user sentiment on devices, boot speed, and IT support — scores from DEX pulse surveys.
- **Screenshot:** ![Employee Device Satisfaction](screenshots/073-dex-report-views-employee-device-satisfaction.png)

### Top Employee Complaints (IT) — Employee Experience

- **Path:** `/experience/dashboard/view/employee-experience-report`
- **Category:** Workforce Experience
- **What it does:** What users report: slow laptops, VPN, apps, printers, and meeting rooms — prioritized by volume.
- **Screenshot:** ![Top Employee Complaints (IT)](screenshots/074-dex-report-views-top-employee-complaints-it.png)

### DEX vs Industry Benchmark — End-User Experience Improvement

- **Path:** `/experience/dashboard/view/adoption-benchmarks-report`
- **Category:** Benchmarks & Fleet Planning
- **What it does:** Compare your endpoint DEX and boot/login performance against peer organizations.
- **Screenshot:** ![DEX vs Industry Benchmark](screenshots/075-dex-report-views-dex-vs-industry-benchmark.png)

### DEX by Site, Persona & Working Style — End-User Experience Improvement

- **Path:** `/experience/dashboard/view/adoption-benchmarks-report`
- **Category:** Benchmarks & Fleet Planning
- **What it does:** Internal benchmark: office vs remote, region, and role — find where device experience lags.
- **Screenshot:** ![DEX by Site, Persona & Working Style](screenshots/076-dex-report-views-dex-by-site-persona-working-style.png)

### Predictive Device Risk — Predictive & Risk Modeling

- **Path:** `/experience/dashboard/view/predictive-risk-modeling`
- **Category:** Benchmarks & Fleet Planning
- **What it does:** Forecast devices at risk of failure, chronic degradation, and refresh candidates before tickets spike.
- **Screenshot:** ![Predictive Device Risk](screenshots/077-dex-report-views-predictive-device-risk.png)

### Endpoint Auto-Remediation — Autonomous Operations Control

- **Path:** `/experience/dashboard/view/autonomous-operations-control`
- **Category:** IT Service & Remediation
- **What it does:** Self-heal success rate on devices, ticket deflection, and RCA confidence for endpoint issues.
- **Screenshot:** ![Endpoint Auto-Remediation](screenshots/078-dex-report-views-endpoint-auto-remediation.png)

### Device-Related Ticket Volume — ITSM & Ticket Optimization

- **Path:** `/experience/dashboard/view/itsm-ticket-optimization`
- **Category:** IT Service & Remediation
- **What it does:** Help-desk tickets tied to endpoints, deflection from automation, and cost per device incident.
- **Screenshot:** ![Device-Related Ticket Volume](screenshots/079-dex-report-views-device-related-ticket-volume.png)

### Endpoint Incident MTTR — MTTR & Operational Efficiency

- **Path:** `/experience/dashboard/view/mttr-operational-efficiency`
- **Category:** IT Service & Remediation
- **What it does:** Mean time to restore device experience — resolution speed by fault domain and persona.
- **Screenshot:** ![Endpoint Incident MTTR](screenshots/080-dex-report-views-endpoint-incident-mttr.png)

### Device Ops — Cost & ROI — Financial Impact & ROI

- **Path:** `/experience/dashboard/view/financial-impact-roi`
- **Category:** IT Service & Remediation
- **What it does:** CapEx avoided through right-sizing, ticket savings, and lifecycle governance on the PC fleet.
- **Screenshot:** ![Device Ops — Cost & ROI](screenshots/081-dex-report-views-device-ops-cost-roi.png)

### Endpoint Compliance & Posture — Governance & Privilege Control

- **Path:** `/experience/dashboard/view/governance-privilege-control`
- **Category:** IT Service & Remediation
- **What it does:** Patch compliance, vulnerability exposure, and governance scores across managed devices.
- **Screenshot:** ![Endpoint Compliance & Posture](screenshots/082-dex-report-views-endpoint-compliance-posture.png)

## Create / edit overlays

### Users — Create overlay — User accounts

- **Path:** `/settings/users`
- **What it does:** Home Users Users RBAC SSO / SAML MFA Policy User accounts 43 records · Search users, open profiles, and manage roles and access. Create Columns All users 43 Pending approval 0 / Filters Email First Name Last Name Status User Type Last Login
- **Screenshot:** ![Users — Create overlay](screenshots/083-create-edit-overlays-users-create-overlay.png)

### Classification — Create overlay — Device classifications

- **Path:** `/devices/organization/device-classification`
- **What it does:** Home Device Classification Device classifications 89 classifications · Group devices by classification for targeting and policy. Create Columns / Filters Name Type Machine group Device Count Created By Created On Last Modified Engineering C
- **Screenshot:** ![Classification — Create overlay](screenshots/084-create-edit-overlays-classification-create-overlay.png)

### Tenants — Create overlay — Tenants

- **Path:** `/settings/organization/tenants`
- **What it does:** Home Tenants Tenants 31 records · Browse sites and open tenant settings, versions, and security. Create Columns / Filters ID Tenant Name Organization Tenant key Contact email Active installs License pool 1 Default nanoheal-deploy-default-si
- **Screenshot:** ![Tenants — Create overlay](screenshots/085-create-edit-overlays-tenants-create-overlay.png)

### Automation — Create overlay — Workflow builder

- **Path:** `/actions/library`
- **What it does:** Home Visual Builder Workflow builder What needs fixing? Describe the issue in natural language. We'll suggest a workflow you can customise. What needs fixing? / to automation library Type a problem to continue Continue QUICK STARTS ⚡ 60 - C
- **Screenshot:** ![Automation — Create overlay](screenshots/086-create-edit-overlays-automation-create-overlay.png)

### Data Collection — Create overlay — Data collection

- **Path:** `/actions/catalogs/data-collection`
- **What it does:** Home Data Collection Data collection 9 · Profiles for performance, storage, user activity, and network monitoring. Create Columns / Filters Profile Description Monitoring Collectors Status Last modified Disk health Disk health — 0 Not Attac
- **Screenshot:** ![Data Collection — Create overlay](screenshots/087-create-edit-overlays-data-collection-create-overlay.png)

### Device Protection — Create overlay — Protection policies

- **Path:** `/actions/catalogs/device-protection`
- **What it does:** Home Device Protection Protection policies 7 · Profiles for registry, services, application control, paths, and USB. Create Columns / Filters Profile Policies Count Status Last modified spooler check 0 Not Attached — new device 0 Not Attach
- **Screenshot:** ![Device Protection — Create overlay](screenshots/088-create-edit-overlays-device-protection-create-overlay.png)

### Integrations — Add connector — Connectors

- **Path:** `/settings/integrations`
- **What it does:** Home Integrations Connectors API Keys API catalog Event Subscriptions Connectors 5 connectors · Connect Nanoheal to a product (ServiceNow, Teams, Slack). To send Nanoheal events to a URL, use Event Subscriptions. Add connector Columns / Fil
- **Screenshot:** ![Integrations — Add connector](screenshots/089-create-edit-overlays-integrations-add-connector.png)

### Inventory — Add device — Devices

- **Path:** `/devices/inventory/census`
- **What it does:** Home Devices Inventory Devices 63 devices · Healthy 0 Pending sync 0 · Inventory, classify, and manage managed endpoints. Add device Export Columns All Devices 63 Windows 47 macOS 10 Android 0 Linux 5 Unknown / Filters Device / Endpoint Sta
- **Screenshot:** ![Inventory — Add device](screenshots/090-create-edit-overlays-inventory-add-device.png)

### Score Models — Create overlay *(capture failed)*

- **Path:** `/compliance/policy/score-models`
- **What it does:** Score Models list has no Create control in this build; list/read only.

### Software Distribution — Create overlay — Profile builder

- **Path:** `/devices/software/software-distribution`
- **What it does:** Home Software Distribution Profile builder DRAFT Load 7-Zip example Design History Switch to Form View ✓ Package 2 Build 3 Options 4 Review Operating system Which OS should these patches run on? Select OS BUILD SEQUENCE 1 action — pick a ty
- **Screenshot:** ![Software Distribution — Create overlay](screenshots/099-create-edit-overlays-software-distribution-create-overlay.png)

### Workflow Builder — Blank workflow — Workflow builder

- **Path:** `/actions/library/visual-builder`
- **What it does:** Home Visual Builder Workflow builder DRAFT 1 Actions 2 Details 3 Review WORKFLOW TIMELINE Click WHEN to change the trigger, then add what should run next. 0 actions WHEN When triggered manually DO Add your first action Pick what the device 
- **Screenshot:** ![Workflow Builder — Blank workflow](screenshots/093-create-edit-overlays-workflow-builder-blank-workflow.png)

### Users — Detail / edit drawer — User accounts *(drawer)*

- **Path:** `/settings/users`
- **What it does:** Home Users Users RBAC SSO / SAML MFA Policy User accounts 43 records · Search users, open profiles, and manage roles and access. Create Columns All users 43 Pending approval 0 / Filters Email First Name Last Name Status User Type Last Login
- **Screenshot:** ![Users — Detail / edit drawer](screenshots/106-create-edit-overlays-users-detail-drawer.png)

## Device detail

### Inventory — Device detail drawer — Devices *(drawer)*

- **Path:** `/devices/inventory/census`
- **What it does:** Home Devices Inventory Devices 63 devices · Healthy 0 Pending sync 0 · Inventory, classify, and manage managed endpoints. Add device Export Columns All Devices 63 Windows 47 macOS 10 Android 0 Linux 5 Unknown / Filters Device / Endpoint Sta
- **Screenshot:** ![Inventory — Device detail drawer](screenshots/104-device-detail-inventory-drawer.png)

### Device detail — full page

- **Path:** `/system-settings/census/07746bef-d0d1-2aac-2a6d-32289b3c50de`
- **What it does:** Home 07746bef D0d1 2aac 2a6d 32289b3c50de
- **Screenshot:** ![Device detail — full page](screenshots/105-device-detail-full-page.png)

## Disabled menu

### Scheduling — Schedules *(menu disabled)*

- **Path:** `/actions/scheduling`
- **What it does:** Home Scheduling Schedules Deployed workflows on a recurring schedule. Edit cadence here — build workflows in Workflow Builder. No scheduled deployments yet Publish a workflow with "Run on Schedule" in Workflow Builder.
- **Screenshot:** ![Scheduling](screenshots/047-disabled-menu-scheduling.png)

### Monitoring *(menu disabled)*

- **Path:** `/actions/catalogs/monitoring`
- **What it does:** Home Monitoring
- **Screenshot:** ![Monitoring](screenshots/095-disabled-menu-monitoring.png)

### Haya *(menu disabled)*

- **Path:** `/innovate/haya`
- **What it does:** Home Haya Search conversations CONVERSATIONS New chat No conversations yet AI HELPDESK What can I help you investigate? Ask in plain language about your estate. Responses stream here; plans, confidence, and sources open in the details panel
- **Screenshot:** ![Haya](screenshots/049-disabled-menu-haya.png)

### Recommendations *(menu disabled)*

- **Path:** `/innovate/haya?feature=recommendations`
- **What it does:** Home Haya Search conversations CONVERSATIONS New chat No conversations yet AI HELPDESK What can I help you investigate? Ask in plain language about your estate. Responses stream here; plans, confidence, and sources open in the details panel
- **Screenshot:** ![Recommendations](screenshots/050-disabled-menu-recommendations.png)

### Automation Insights *(menu disabled)*

- **Path:** `/innovate/haya?feature=automation-insights`
- **What it does:** Home Haya Search conversations CONVERSATIONS New chat No conversations yet AI HELPDESK What can I help you investigate? Ask in plain language about your estate. Responses stream here; plans, confidence, and sources open in the details panel
- **Screenshot:** ![Automation Insights](screenshots/051-disabled-menu-automation-insights.png)

### Knowledge *(menu disabled)*

- **Path:** `/innovate/haya?feature=knowledge`
- **What it does:** Home Haya Search conversations CONVERSATIONS New chat No conversations yet AI HELPDESK What can I help you investigate? Ask in plain language about your estate. Responses stream here; plans, confidence, and sources open in the details panel
- **Screenshot:** ![Knowledge](screenshots/052-disabled-menu-knowledge.png)

### Alert rules *(menu disabled)*

- **Path:** `/innovate/haya?feature=alert-rules`
- **What it does:** Home Haya Search conversations CONVERSATIONS New chat No conversations yet AI HELPDESK What can I help you investigate? Ask in plain language about your estate. Responses stream here; plans, confidence, and sources open in the details panel
- **Screenshot:** ![Alert rules](screenshots/053-disabled-menu-alert-rules.png)

### Deployment *(menu disabled)*

- **Path:** `/settings/deployment`
- **What it does:** Home Deployment
- **Screenshot:** ![Deployment](screenshots/096-disabled-menu-deployment.png)

### Updates — Device updates *(menu disabled)*

- **Path:** `/devices/software/device-updates`
- **What it does:** Home Device Updates Device updates 57 records · Client update status, compliance, and attempt history. Columns All 57 Needs attention 25 / Filters Device ID Actual version Desired version Policy compliant Version gap Site OS Platform Policy
- **Screenshot:** ![Updates](screenshots/055-disabled-menu-updates.png)

### Version Catalog *(menu disabled)*

- **Path:** `/devices/software/version-catalog`
- **What it does:** Home Version Catalog
- **Screenshot:** ![Version Catalog](screenshots/097-disabled-menu-version-catalog.png)

### GPO Policies *(menu disabled)*

- **Path:** `/compliance/gpo-policies`
- **What it does:** Home Gpo Policies
- **Screenshot:** ![GPO Policies](screenshots/098-disabled-menu-gpo-policies.png)

### Policy Execution *(menu disabled)*

- **Path:** `/compliance/policy-execution`
- **What it does:** Home Policy Execution Policy execution 0 records · Per-device status for policy execution runs. Columns / Filters No execution status Status rows will appear after policies run on devices.
- **Screenshot:** ![Policy Execution](screenshots/058-disabled-menu-policy-execution.png)

## Workflow Builder deep

### 01 Hub — templates & create custom — Workflow builder

- **Path:** `/actions/library/visual-builder`
- **What it does:** Home Visual Builder Workflow builder What needs fixing? Describe the issue in natural language. We'll suggest a workflow you can customise. What needs fixing? / to automation library Type a problem to continue Continue QUICK STARTS 🖥 Slow C
- **Screenshot:** ![01 Hub — templates & create custom](screenshots/111-workflow-builder-deep-01-hub-templates-create-custom.png)

### 02 Actions canvas — Disk Cleanup

- **Path:** `/actions/library/visual-builder`
- **What it does:** Home Visual Builder Disk Cleanup DRAFT Workflow builder 1 Actions 2 Details 3 Review Workflow valid Complete device condition rules Live validation WORKFLOW TIMELINE Drag actions to reorder · click to configure 8 actions Add action WHEN Eve
- **Screenshot:** ![02 Actions canvas](screenshots/112-workflow-builder-deep-02-actions-canvas.png)

### 03 Details — When (On demand / Event / Schedule) — Disk Cleanup

- **Path:** `/actions/library/visual-builder`
- **What it does:** Home Visual Builder Disk Cleanup DRAFT Workflow builder ✓ Actions 2 Details 3 Review Workflow valid Complete device condition rules Live validation WORKFLOW TIMELINE Drag actions to reorder · click to configure 8 actions Add action WHEN Eve
- **Screenshot:** ![03 Details — When (On demand / Event / Schedule)](screenshots/113-workflow-builder-deep-03-details-when-on-demand-event-schedule.png)

### 04 When — On demand (selfhelp) — Disk Cleanup

- **Path:** `/actions/library/visual-builder`
- **What it does:** Home Visual Builder Disk Cleanup DRAFT Workflow builder ✓ Actions 2 Details 3 Review Workflow valid Trigger configured Live validation WORKFLOW TIMELINE Drag actions to reorder · click to configure 8 actions Add action WHEN On demand: High 
- **Screenshot:** ![04 When — On demand (selfhelp)](screenshots/114-workflow-builder-deep-04-when-on-demand-selfhelp.png)

### 05 When — Event Trigger (autoheal) — Disk Cleanup

- **Path:** `/actions/library/visual-builder`
- **What it does:** Home Visual Builder Disk Cleanup DRAFT Workflow builder ✓ Actions 2 Details 3 Review Workflow valid Complete device condition rules Live validation WORKFLOW TIMELINE Drag actions to reorder · click to configure 8 actions Add action WHEN Eve
- **Screenshot:** ![05 When — Event Trigger (autoheal)](screenshots/115-workflow-builder-deep-05-when-event-trigger-autoheal.png)

### 06 When — Schedule (scheduler) — Disk Cleanup

- **Path:** `/actions/library/visual-builder`
- **What it does:** Home Visual Builder Disk Cleanup DRAFT Workflow builder ✓ Actions 2 Details 3 Review Workflow valid Trigger configured Live validation WORKFLOW TIMELINE Drag actions to reorder · click to configure 8 actions Add action WHEN every weekday at
- **Screenshot:** ![06 When — Schedule (scheduler)](screenshots/116-workflow-builder-deep-06-when-schedule-scheduler.png)

### 07 Conditions — Matches / Does not match — Disk Cleanup

- **Path:** `/actions/library/visual-builder`
- **What it does:** Home Visual Builder Disk Cleanup DRAFT Workflow builder ✓ Actions 2 Details 3 Review Workflow valid Trigger configured Live validation WORKFLOW TIMELINE Drag actions to reorder · click to configure 8 actions Add action WHEN every weekday at
- **Screenshot:** ![07 Conditions — Matches / Does not match](screenshots/117-workflow-builder-deep-07-conditions-matches-does-not-match.png)

### 08 Review before save — Disk Cleanup

- **Path:** `/actions/library/visual-builder`
- **What it does:** Home Visual Builder Disk Cleanup DRAFT Workflow builder ✓ Actions 2 Details 3 Review Workflow valid Trigger configured Live validation WORKFLOW TIMELINE Drag actions to reorder · click to configure 8 actions Add action WHEN every weekday at
- **Screenshot:** ![08 Review before save](screenshots/118-workflow-builder-deep-08-review-before-save.png)

### 09 Library inspector — edit / link — Profiles

- **Path:** `/actions/library`
- **What it does:** Home Library Profiles Playbooks Profiles 51 profiles · Browse, create, and assign profiles. Create Columns / Filters Name Description Type Status Last Modified Teams Cache Remediation Recovers a broken Microsoft Teams desktop session after 
- **Screenshot:** ![09 Library inspector — edit / link](screenshots/119-workflow-builder-deep-09-library-inspector-edit-link.png)

### 10 Link scope confirm — Profiles

- **Path:** `/actions/library`
- **What it does:** Home Library Profiles Playbooks Profiles 51 profiles · Browse, create, and assign profiles. Create Columns / Filters Name Description Type Status Last Modified Teams Cache Remediation Recovers a broken Microsoft Teams desktop session after 
- **Screenshot:** ![10 Link scope confirm](screenshots/120-workflow-builder-deep-10-link-scope-confirm.png)

## Software Distribution deep

### 01 Install profiles list — Software install profiles

- **Path:** `/devices/software/software-distribution`
- **What it does:** Home Software Distribution Software install profiles Software uninstall profiles Reusable SWD snippets Deploy Software install profiles 3 profiles · Profiles that install software on managed devices. Create profile Columns / Filters Profile
- **Screenshot:** ![01 Install profiles list](screenshots/121-software-distribution-deep-01-install-profiles-list.png)

### 02 Create software distribution profile — Profile builder

- **Path:** `/devices/software/software-distribution`
- **What it does:** Home Software Distribution Profile builder DRAFT Load 7-Zip example Design History Switch to Form View ✓ Package 2 Build 3 Options 4 Review Operating system Which OS should these patches run on? Select OS BUILD SEQUENCE 1 action — pick a ty
- **Screenshot:** ![02 Create software distribution profile](screenshots/122-software-distribution-deep-02-create-software-distribution-profile.png)

### 05 Deploy tab — Software distribution — Deploy

- **Path:** `/devices/software/swd-push-audit`
- **What it does:** Home Swd Push Audit Software distribution — Deploy 0 rows · Deploy queue and per-device audit for software install and uninstall jobs. Columns / Filters No deploy rows Rows appear after software distribution jobs are pushed to devices.
- **Screenshot:** ![05 Deploy tab](screenshots/106-manage-deploy-seeded.png)

### 06 Deploy page (queue & audit) — Software distribution — Deploy

- **Path:** `/devices/software/swd-push-audit`
- **What it does:** Home Swd Push Audit Software distribution — Deploy 0 rows · Deploy queue and per-device audit for software install and uninstall jobs. Columns / Filters No deploy rows Rows appear after software distribution jobs are pushed to devices.
- **Screenshot:** ![06 Deploy page (queue & audit)](screenshots/106-manage-deploy-seeded.png)

