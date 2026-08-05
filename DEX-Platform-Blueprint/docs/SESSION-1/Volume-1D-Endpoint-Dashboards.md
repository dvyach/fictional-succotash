# Volume 1D — Endpoint Dashboards

**Product:** AetherDEX  
**Session:** 1  
**Dashboards:** D-END-01 Fleet Health · D-END-02 Stability & Performance · D-END-03 Hardware Lifecycle  
**Depends on:** Volumes 1A–1C · [Metrics](../../metrics/metric-catalog-session-1.md) · [Widgets](../../widgets/widget-index-session-1.md) · [Entities](../../architecture/entity-model-session-1.md)  
**Mockups:** [`mockups/endpoint/`](../../mockups/endpoint/)

---

# Document Control

| Version | Status |
|---------|--------|
| 1.0.0 | Complete — Session 1 baseline |

---

# Part A — D-END-01 Fleet Health

**Route:** `/app/endpoints/fleet-health` · **ID:** `end.fleet`  
**Mockups:** `end-fleet-health-{1920|1440|1366}-{dark|light}.svg`

---

## A.1 Overview

### Purpose

Provide endpoint engineering and ops with a fleet-wide health command center: composite fleet score, boot/login performance, crash rate, compliance posture, OS mix, performance heatmap, and device cohort table — experience-weighted, not inventory-only.

### Audience

| Primary | Secondary |
|---------|-----------|
| P3 Morgan Blake (Endpoint Engineering) | P5 IT Ops · P2 DEX Lead |

### Business Value

- Prioritizes devices and cohorts by experience impact.  
- Unifies performance, stability, and compliance in one score.  
- Enables regional performance heatmaps for triage.  
- Feeds executive endpoint driver with drillable truth.

### Business Questions

1. How healthy is the fleet overall?  
2. Are boot/login SLOs breached, where?  
3. Is crash rate acceptable?  
4. Is compliance posture eroding?  
5. Which OS/image cohorts hurt experience?  
6. Which devices should we inspect first?

### Success Metrics

| Metric | Target |
|--------|--------|
| Fleet Health Score used in weekly endpoint review | 100% of program weeks |
| Device table → Context Rail rate | ≥ 40% of operator sessions |
| Mean time to identify regressing image | −30% vs baseline study |

---

## A.2 Layout

| Viewport | Structure |
|----------|-----------|
| 1920 | KPI×5 → OS Donut (4) + Performance Heatmap (8) → Device Cohort Table (12) |
| 1440 | KPI denser; table columns compact |
| 1366 | KPI wrap; donut above heatmap; table full width |
| Tablet | Stacked; table becomes card list |
| Ultra Wide | Max content 1600 |
| Dark/Light | Mockups authoritative |

---

## A.3 Navigation

Breadcrumb `Endpoints / Fleet Health` · Sidebar Fleet Health active · Context Rail on device: Summary, Timeline, Related apps, AI, Actions (remote assist stub, ticket) · Quick Actions: Open Stability · Open Lifecycle · Export cohort · Ask AI · Compare images · Bookmarks: “Fleet Daily”.

---

## A.4 Filters

| Layer | Filters |
|-------|---------|
| Global | Scope, Time (default 7d), Compare |
| Dashboard | OS family/version, Image ID, Model, Compliance fail only, Health band, Managed state |
| Widget | Heatmap metric toggle (CPU/Mem/Disk/Boot/Login); table column picker |
| Saved | “Win10 remaining”, “Boot P90 > 90s”, “Non-compliant encryption” |

---

## A.5 Widget Inventory

### `w-end-fleet-score` — Fleet Health Score KPI

| Field | Spec |
|-------|------|
| Purpose | Composite fleet health |
| Business Value | Single endpoint north-star for operators |
| Description | 0–100 with component hover (stability 35%, performance 30%, compliance 20%, hardware risk 15%) |
| Metric | `m.end.fleet_health_score` |
| Calculation / Aggregation | Per catalog; device-weighted or employee-weighted toggle (default employee-weighted for DEX alignment) |
| Dimensions | scope, os, image |
| Supported Filters | All |
| Drilldowns | Component → Stability / Lifecycle / Compliance breakdown |
| Context Menu | Copy · View weights · Ask AI |
| Actions | Pin |
| Refresh | 5 min |
| Permissions | `role.endpoint_ops`, dex_analyst, exec read |
| API | `GET /api/v1/metrics/m.end.fleet_health_score/summary` |
| Caching | 60s |
| Performance | < 300ms |
| Accessibility | Components exposed in details |

### `w-end-boot-p90` — Boot P90 KPI

| Field | Spec |
|-------|------|
| Purpose | Boot duration P90 |
| Metric | `m.end.boot_duration_sec` agg P90 |
| Thresholds | Good ≤45s · Fair ≤90s · Poor >90s |
| Drilldowns | Stability page boot chart; device table sorted by boot |
| API | Summary `agg=p90` |
| Refresh | 5 min |
| a11y | Threshold band named |

### `w-end-login-p90` — Login P90 KPI

| Field | Spec |
|-------|------|
| Purpose | Login duration P90 |
| Metric | `m.end.login_duration_sec` |
| Thresholds | Good ≤20s · Fair ≤45s · Poor >45s |
| Drilldowns | Correlate IdP app dependency when AI suggests |
| Same contract pattern as boot KPI |

### `w-end-crash-rate` — Crash Rate KPI

| Field | Spec |
|-------|------|
| Purpose | Crashes per 100 device-hours |
| Metric | `m.end.crash_rate` |
| Drilldowns | Stability trend |
| Refresh | 5 min |

### `w-end-compliance` — Compliance Posture KPI

| Field | Spec |
|-------|------|
| Purpose | % devices meeting baseline controls |
| Metric | `m.end.compliance_posture_pct` |
| Calculation | Encryption ∧ patch ∧ AV ∧ EDR baselines (tenant policy pack) |
| Drilldowns | Compliance failure breakdown table |
| Permissions | endpoint_ops+; policy detail may need security role |
| API | Summary + breakdown |

### `w-end-os-distribution` — OS Distribution Donut

| Field | Spec |
|-------|------|
| Purpose | Show OS mix |
| Business Value | Migration and risk framing |
| Description | Donut + legend counts/percent |
| Metric | Device counts by os_family/version |
| Aggregation | Count / % |
| Dimensions | os_family, os_version |
| Supported Filters | Click isolates OS (cross-filter) |
| Drilldowns | Filter fleet; Lifecycle age by OS |
| Context Menu | Copy · Export |
| Actions | Compare OS experience scores |
| Refresh | 15 min (slow-moving) |
| Permissions | endpoint_ops+ |
| API | `GET /api/v1/endpoints/os-distribution` |
| Caching | 10 min |
| Performance | < 400ms |
| Accessibility | List alternative |

### `w-end-performance-heatmap` — Performance Heatmap

| Field | Spec |
|-------|------|
| Purpose | Region × metric heat cells |
| Business Value | Fast triage of where performance burns |
| Description | Grid: regions vs CPU saturation, memory pressure, disk, boot, login (normalized severity) |
| Metric | `m.end.cpu_saturation_pct`, memory, disk, boot, login |
| Calculation | Cell = severity score 0–1 from thresholds |
| Aggregation | Region (Country on drill) |
| Dimensions | geo × metric |
| Supported Filters | Metric subset |
| Drilldowns | Cell → device table filtered |
| Context Menu | Copy · Open Stability |
| Actions | Set scope to region |
| Refresh | 5 min |
| Permissions | endpoint_ops+ |
| API | `GET /api/v1/endpoints/performance-heatmap` |
| Caching | 2 min |
| Performance | < 700ms |
| Accessibility | Sortable matrix table |

### `w-end-device-table` — Device Cohort Table

| Field | Spec |
|-------|------|
| Purpose | Inspect devices/cohorts |
| Business Value | Actionable operator queue |
| Description | Hostname alias, OS, image, boot P90, login P90, crash, disk, battery, compliance, DEX contribution, health band |
| Metric | Multi device metrics |
| Aggregation | Device grain |
| Dimensions | device |
| Supported Filters | All dashboard filters + search |
| Drilldowns | Double-click → Context Rail → Process → Event → Timeline → Logs |
| Context Menu | Ticket · Remote actions stub · Exclude · Ask AI |
| Actions | Export · Bulk tag |
| Refresh | 5 min |
| Permissions | Hostname visibility per role; PII employee link gated |
| API | `GET /api/v1/endpoints/devices` |
| Caching | 60s |
| Performance | Virtualized; p95 < 1s page |
| Accessibility | Full grid keyboard nav |

### `w-end-ai-insights` — Endpoint AI Insights

Standard AI insight contract; surface=`endpoint`. Example: image regression, driver correlation, regional login/IdP coupling.

---

## A.6 Interactions

Hover heatmap linked to table rows in region. Click OS slice cross-filters. Double-click device opens rail. Keyboard sortable headers. Drag columns. Cross-filtering across donut, heatmap, table. Linked highlighting on hover.

---

## A.7 Drilldown Flow

```
Enterprise → Region → Country → BU → Department → Manager
  → Employee → Device → Application → Process → Event → Timeline → Logs → Automation
```

Endpoint pages may skip Employee for shared devices (kiosk/VDI pool clients) with explicit banner.

---

## A.8 AI

Insights on regressions; recommendations (rollback image, patch ring); root cause with evidence; predictions for crash trajectory; correlations image↔crash, IdP↔login; impact radius devices+employees; confidence required.

---

## A.9 Data

Facts: `fact_endpoint_device_hourly`. Entities: Device, Employee assignment, Image, Compliance flags. Refresh 5 min (1 min critical). Retention hot 90d. Security: device identifiers masked for exec-only roles.

---

## A.10 Engineering

REST device search with cursor pagination; heatmap endpoint; metric summaries; URL filters `os`, `imageId`, `healthBand`; virtualized table (react-virtual or equivalent); offline last heatmap+KPIs banner.

---

# Part B — D-END-02 Stability & Performance

**Route:** `/app/endpoints/stability` · **ID:** `end.stability`  
**Mockups:** `end-stability-{1920|1440|1366}-{dark|light}.svg`

---

## B.1 Overview

### Purpose

Deep dive into crash/hang rates, CPU/memory pressure, and stability trends with AI root-cause assist — for incident response and change validation.

### Audience

Primary P3; secondary P5, P7 when client stability couples to app.

### Business Value

- Validates image/driver changes.  
- Reduces MTTR for fleet-wide stability incidents.  
- Separates endpoint-caused vs app-caused hangs via correlation.

### Business Questions

1. Is stability regressing after a change?  
2. Which processes crash most?  
3. Where is CPU/memory pressure chronic?  
4. What should we roll back or patch first?

### Success Metrics

Change-marker annotations used on ≥ 75% of major image deployments; AI insight accept rate tracked.

---

## B.2 Layout

KPI×4 → Stability Trend (8) + AI Insights (4) → optional Process Crash Table (12) below fold on 1920. Dark/Light mockups provided.

---

## B.3–B.4 Navigation & Filters

Breadcrumb `Endpoints / Stability` · Filters: Image, Driver pack, Process name, Severity, Free disk < threshold. Time default 7d; incident mode 24h.

---

## B.5 Widget Inventory

### KPI set

| Widget ID | Metric |
|-----------|--------|
| Crash Rate | `m.end.crash_rate` |
| Hang Rate | derived hang metric (per 100 active hours) |
| CPU Saturation | `m.end.cpu_saturation_pct` |
| Memory Pressure | `m.end.memory_pressure_pct` |

Full KPI contracts follow Volume 1B KPI pattern (purpose, drilldowns, API summary, a11y, cache 60s, refresh 5 min).

### `w-end-stability-trend`

| Field | Spec |
|-------|------|
| Purpose | Crash rate (and optional hang overlay) over time |
| Description | Line chart with change markers (image, policy) |
| Metric | `m.end.crash_rate` |
| Drilldowns | Brush time; click marker → change detail |
| API | Timeseries + `GET /api/v1/endpoints/changes` |
| Performance | < 800ms |
| Accessibility | Data table + marker list |

### `w-end-ai-insights` (stability-focused)

Surface filter `endpoint.stability`; emphasizes regression detection.

### Process Crash Table (supporting widget)

| Field | Spec |
|-------|------|
| Purpose | Top crashing processes |
| Drilldowns | Process → Event → Timeline → Logs |
| API | `GET /api/v1/endpoints/processes/crashes` |
| Permissions | endpoint_ops+ |

---

## B.6–B.10

Interactions: marker hover shows change metadata. Drilldown to Automation for remediation runbooks (Session 2 execution). Data from device hourly + process crash facts. Engineering: annotate changes via CI/CD webhook ingestion.

---

# Part C — D-END-03 Hardware Lifecycle

**Route:** `/app/endpoints/lifecycle` · **ID:** `end.lifecycle`  
**Mockups:** `end-lifecycle-{1920|1440|1366}-{dark|light}.svg`

---

## C.1 Overview

### Purpose

Prioritize hardware refresh and risk using experience impact — not age alone — via age-vs-experience scatter, battery/disk risk, and refresh priority queue.

### Audience

Primary P3; secondary P1 (investment), P2.

### Business Value

- Spend refresh budget where experience ROI is highest.  
- Surface battery/disk failures before user pain becomes tickets.  
- Link lifecycle to executive initiative ROI.

### Business Questions

1. Which devices should we refresh next?  
2. How much experience is lost on aged hardware?  
3. Where are battery/disk risks clustering?  
4. What is the warranty exposure?

### Success Metrics

Refresh queue adoption by procurement/endpoint PMs; correlation of refresh completion to DEX lift tracked via initiatives.

---

## C.2 Layout

KPI×3 → Age vs Experience Scatter (7) + Refresh Priority Queue (5) → Battery & Disk Risk panel (12) optional below. Mockups cover primary fold.

---

## C.3–C.4 Navigation & Filters

Breadcrumb `Endpoints / Lifecycle` · Filters: Age years, Warranty state, Model family, Battery < %, Disk health < threshold, BU. Saved: “Past warranty + Poor DEX”.

---

## C.5 Widget Inventory

### KPI set

| KPI | Metric |
|-----|--------|
| Devices Past Warranty | Count where warranty_end < today |
| Avg Battery Health | `m.end.battery_health_pct` |
| Disk Risk Devices | Count where `m.end.disk_health_score` < 60 |

### `w-end-lifecycle-scatter` — Age vs Experience Scatter

| Field | Spec |
|-------|------|
| Purpose | Visualize age vs DEX contribution / device experience |
| Description | Scatter; bubble size = employees impacted or usage; color = refresh priority band |
| Metric | Age, DEX/device score, `m.end.refresh_priority_score` |
| Drilldowns | Lasso select → queue filter; point → device rail |
| API | `GET /api/v1/endpoints/lifecycle/scatter` |
| Performance | Decimate >5k points client-side |
| Accessibility | Top priority list alternative |

### `w-end-refresh-queue`

| Field | Spec |
|-------|------|
| Purpose | Ranked refresh candidates |
| Metric | `m.end.refresh_priority_score` |
| Description | Device, score, BU, age, battery, disk, estimated DEX lift |
| Drilldowns | Device detail; Create refresh initiative |
| Actions | Export to procurement CSV · Assign wave |
| API | `GET /api/v1/endpoints/refresh-queue` |
| Permissions | endpoint_ops+; cost fields finance entitled |

### `w-end-battery-disk`

| Field | Spec |
|-------|------|
| Purpose | Dual risk distributions |
| Metrics | Battery health hist + disk health hist |
| Drilldowns | Filter queue |
| API | Breakdown histograms |

---

## C.6–C.10

Interactions: lasso on scatter cross-filters queue. AI recommends refresh waves by expected DEX lift / cost. Data: device inventory + health predictors. Engineering: nightly refresh score batch; UI reads serving table.

---

# Part D — Mockup Index (Endpoint)

| Prefix | Dashboard |
|--------|-----------|
| `end-fleet-health-*` | D-END-01 |
| `end-stability-*` | D-END-02 |
| `end-lifecycle-*` | D-END-03 |

18 SVG files (3 dashboards × 3 widths × 2 themes).

---

# Part E — Cross-Domain Links

| From | To |
|------|----|
| Fleet boot/login KPI | Experience TTP / Morning Login journey |
| Stability AI image regression | Application hangs check (correlate) |
| Refresh queue | Executive Initiative ROI (create initiative) |
| Device rail apps | Application Detail |

---

*End of Volume 1D — Endpoint Dashboards*  
*Next: [Volume 1E — Application Dashboards](Volume-1E-Application-Dashboards.md)*
