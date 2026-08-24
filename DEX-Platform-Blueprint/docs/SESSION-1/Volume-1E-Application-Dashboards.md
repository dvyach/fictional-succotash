# Volume 1E — Application Dashboards

**Product:** AetherDEX  
**Session:** 1  
**Dashboards:** D-APP-01 Application Portfolio · D-APP-02 Application Detail  
**Depends on:** Volumes 1A–1D · [Metrics](../../metrics/metric-catalog-session-1.md) · [Widgets](../../widgets/widget-index-session-1.md) · [Entities](../../architecture/entity-model-session-1.md)  
**Mockups:** [`mockups/application/`](../../mockups/application/)

---

# Document Control

| Version | Status |
|---------|--------|
| 1.0.0 | Complete — Session 1 baseline |

**Session 1 boundary:** Application surfaces focus on client-experienced quality (desktop/SaaS/browser), dependency risk as seen from the client, adoption, and version health. Full infrastructure topology deep-dives are Session 2.

---

# Part A — D-APP-01 Application Portfolio

**Route:** `/app/applications/portfolio` · **ID:** `app.portfolio`  
**Mockups:** `app-portfolio-{1920|1440|1366}-{dark|light}.svg`

---

## A.1 Overview

### Purpose

Give application experience owners and DEX leads a ranked portfolio of applications by employee experience impact — with Tier-0 health strip, adoption, degradation feed, and AI prioritization — not a raw APM error wall.

### Audience

| Primary | Secondary |
|---------|-----------|
| P4 Riley Okonkwo (App Experience Owner) | P2 DEX Lead · P5 Ops · P7 Platform/SRE |

### Business Value

- Focuses teams on apps that hurt the most people the most.  
- Separates critical Tier-0 health from long-tail noise.  
- Accelerates detection of client-visible degradations.  
- Connects adoption to experience (low adoption may hide pain).

### Business Questions

1. Which apps drag portfolio experience?  
2. Which Tier-0 apps are below “Good”?  
3. Where is adoption healthy but experience poor (or vice versa)?  
4. What degradations are active now?  
5. Which app should I open first?

### Success Metrics

| Metric | Target |
|--------|--------|
| Tier-0 apps with assigned owners in AetherDEX | 100% |
| Portfolio → Detail drill rate | ≥ 50% of app owner sessions |
| Degradation acknowledge median time | < 15 minutes for High |

---

## A.2 Layout

| Viewport | Structure |
|----------|-----------|
| 1920 | KPI×3 → Tier-0 Health Strip (12) → Portfolio Table (8) + Degradation Feed (4) |
| 1440 | Same; strip chips denser |
| 1366 | Strip wraps; table full width; feed below |
| Tablet | Stacked chips; card list for apps |
| Ultra Wide | Max 1600 content |
| Dark/Light | Mockups authoritative |

---

## A.3 Navigation

| Element | Spec |
|---------|------|
| Breadcrumb | `Applications / Portfolio` |
| Sidebar | Portfolio active |
| Context Navigation | App summary rail on row select (before full detail route) |
| Quick Actions | Add app · Manage criticality · Ask AI · Save view · Open Experience Overview |
| Bookmarks | “Tier-0 Daily” |
| Recent Views | Includes last App Detail entries |

---

## A.4 Filters

| Layer | Filters |
|-------|---------|
| Global | Scope, Time (7d default), Compare |
| Dashboard | Criticality tier, App type (desktop/saas/browser), Owner team, Score band, Platform |
| Widget | Table search; feed severity |
| Saved | “Tier-0 below 70”, “My owned apps”, “Browser-only” |

---

## A.5 Widget Inventory

### `w-app-portfolio-score` — Portfolio Experience KPI

| Field | Spec |
|-------|------|
| Purpose | Weighted portfolio experience |
| Business Value | Single app-domain health number |
| Description | Criticality-weighted mean of `m.app.experience_score` |
| Metric | Weighted portfolio score |
| Calculation | Σ(score × entitled_or_active_weight × criticality_weight) / Σ(weights) |
| Aggregation | Portfolio |
| Dimensions | Inherits filters |
| Supported Filters | All |
| Drilldowns | Focus table sorted ascending score |
| Context Menu | Copy · View weighting |
| Actions | Pin |
| Refresh | 5 min |
| Permissions | app_owner, dex_analyst, exec read |
| API | `GET /api/v1/apps/portfolio/summary` |
| Caching | 60s |
| Performance | < 300ms |
| Accessibility | Weighting summarized |

### Tier-0 Below Good KPI

| Field | Spec |
|-------|------|
| Purpose | Count Tier-0 apps with score < 70 |
| Metric | Derived from app scores |
| Drilldowns | Filter strip/table to those apps |
| Subtitle | Names of offenders (max 3 + “+N”) |

### Adoption (critical) KPI

| Field | Spec |
|-------|------|
| Purpose | Adoption across Tier-0/1 |
| Metric | `m.app.adoption_pct` weighted |
| Drilldowns | Adoption vs Experience widget/table columns |

### `w-app-critical-health` — Tier-0 App Health Strip

| Field | Spec |
|-------|------|
| Purpose | At-a-glance Tier-0 scores |
| Description | Horizontal chips/cards per Tier-0 app with score and status color |
| Metric | `m.app.experience_score` |
| Aggregation | App |
| Dimensions | app_id |
| Supported Filters | Click isolates app (cross-filter) |
| Drilldowns | Navigate to App Detail |
| Context Menu | Open · Copy score · Ask AI |
| Actions | Reorder by score/name |
| Refresh | 5 min |
| Permissions | ACL: only apps visible to role (owners see owned+Tier-0) |
| API | `GET /api/v1/apps?criticality=tier0` |
| Caching | 60s |
| Performance | < 400ms |
| Accessibility | Toolbar of buttons with scores |

### `w-app-portfolio-table` — Application Portfolio Table

| Field | Spec |
|-------|------|
| Purpose | Rank and inspect apps |
| Description | Name, type, tier, score, Δ, active users, launch P90, hang rate, error %, adoption, owner |
| Metric | Multi app metrics |
| Aggregation | App grain |
| Dimensions | app |
| Supported Filters | Search + dashboard filters |
| Drilldowns | Row click → Detail route `/app/applications/:appId` |
| Context Menu | Open · Assign owner · Set criticality · Mute alerts |
| Actions | Export · Compare 2–3 apps (overlay) |
| Refresh | 5 min |
| Permissions | app_owner+ |
| API | `GET /api/v1/apps/portfolio` |
| Caching | 60s |
| Performance | Virtualized < 1s |
| Accessibility | Sortable grid |

### `w-app-adoption` — Adoption vs Experience (column/scatter mode)

| Field | Spec |
|-------|------|
| Purpose | Find mismatch cohorts |
| Description | Optional secondary view toggle from table overflow: scatter adoption × score |
| Metric | `m.app.adoption_pct`, `m.app.experience_score` |
| Drilldowns | Quadrant → filtered table |
| API | Portfolio payload includes both fields |
| Accessibility | Quadrant lists |

### `w-app-degradation-feed` — Degradation Alert Feed

| Field | Spec |
|-------|------|
| Purpose | Active app degradations |
| Description | Severity, title, app, impact users, age |
| Metric | Alerts filtered to app domain |
| Drilldowns | Alert → App Detail with time window |
| Actions | Acknowledge · Investigate stub |
| Refresh | 30–60s |
| API | `GET /api/v1/alerts?domain=application` |
| Accessibility | Feed list |

### `w-app-ai-insights` — Application AI Insights (portfolio)

Surface=`application.portfolio`; ranks cross-app insights (e.g., shared IdP dependency impacting multiple Tier-0 apps).

---

## A.6 Interactions

Hover strip highlights table row. Click cross-filters. Double-click opens Detail. Keyboard table navigation. Touch long-press context menu. Cross-filtering strip ↔ table ↔ feed. Linked highlighting on shared dependency tags when present.

---

## A.7 Drilldown Flow

```
Enterprise → Region → Country → BU → Department → Manager
  → Employee → Device → Application → Process → Event → Timeline → Logs → Automation
```

Portfolio enters primarily at **Application**, then down. Geo columns optional via filter before Detail.

---

## A.8 AI

Portfolio insights; recommendations (rollback version, scale dependency, communicate); root cause across shared deps; predictions of score trajectory; correlations; impact radius; confidence.

---

## A.9 Data

Entities: Application, ApplicationVersion, Owner team, Alert, Insight. Facts: `fact_app_session`, adoption daily. Refresh 5 min. Security: app ACL by owner team + criticality visibility policy.

---

## A.10 Engineering

REST portfolio list with sort/filter; alerts poll; URL `tier`, `ownerTeamId`, `q`; SPA route to detail; SWR; CSV export audited.

---

# Part B — D-APP-02 Application Detail

**Route:** `/app/applications/:appId` · **ID:** `app.detail`  
**Example mockups:** `app-detail-crm-{1920|1440|1366}-{dark|light}.svg` (CRM Desktop exemplar)

---

## B.1 Overview

### Purpose

Provide a deep, client-aware experience view for a single application: score, launch/hang/error, version health, dependency map, geo performance, user impact, and AI root cause — bridging app owners and endpoint/platform partners.

### Audience

Primary P4 + P7; secondary P2, P3, P5 during incidents.

### Business Value

- Diagnoses whether pain is client, network, identity, or service dependency.  
- Validates version rollouts with experience deltas.  
- Quantifies user impact for incident severity.  
- Creates shared evidence for war rooms.

### Business Questions

1. Is this app healthy for my scope right now?  
2. Did a version make experience worse?  
3. Which dependency is risky?  
4. Where geographically is it worst?  
5. Who is impacted?  
6. What should we do next?

### Success Metrics

Version compare used on every major rollout; dependency map opened in ≥ 60% of Sev-1 app incidents; user impact exported to ITSM when ticket drafted.

---

## B.2 Layout

| Viewport | Structure |
|----------|-----------|
| 1920 | KPI×4 → Launch Trend (7) + Version Health (5) → Dependency Map (6) + AI Insights (6) → optional User Impact / Geo below fold |
| 1440 / 1366 | Stack version under launch; dependency above AI |
| Tablet | All stacked |
| Dark/Light | Mockups for CRM exemplar; other apps reuse layout |

Header shows app name, type badge, criticality, owner, and “Open in Experience / Endpoints” actions.

---

## B.3 Navigation

| Element | Spec |
|---------|------|
| Breadcrumb | `Applications / Portfolio / {App Name}` |
| Sidebar | Portfolio active (detail is stacked route) |
| Context Navigation | Always available: versions, deps, related devices, employees (gated) |
| Quick Actions | Compare versions · Create alert · Ticket draft · Ask AI · Copy app link |
| Bookmarks | Per-app saved views |
| Recent Views | Shell stores appId |

---

## B.4 Filters

Global scope/time/compare + App-specific: Version, Platform (Win/macOS), Channel (stable/beta), Location type, Network class. Saved per app.

---

## B.5 Widget Inventory

### `w-app-detail-score` — App Experience Score KPI

| Field | Spec |
|-------|------|
| Purpose | Primary app score |
| Metric | `m.app.experience_score` |
| Calculation | Per catalog inputs |
| Drilldowns | Driver micro-breakdown (launch/hang/error/frustration/network) |
| API | `GET /api/v1/apps/{appId}/summary` |
| Refresh | 5 min (1 min if alert open) |
| Accessibility | Drivers in details |

### `w-app` Launch / Hang / Error KPIs

| Widget | Metric | Notes |
|--------|--------|-------|
| Launch P90 | `m.app.launch_time_ms` | ms; poor thresholds tenant-configurable |
| Hang Rate | `m.app.hang_rate` | per 100 active hours |
| Client Error % | `m.app.error_rate_pct` | blocking/fatal |

KPI contracts match platform standard.

### `w-app-launch-trend` — Launch Time Trend

| Field | Spec |
|-------|------|
| Purpose | Launch latency trajectory |
| Description | Line P50/P90; deploy markers |
| Metric | `m.app.launch_time_ms` |
| Drilldowns | Brush time; marker → version |
| API | Timeseries |
| a11y | Data table |

### `w-app-hang-error` — Hang & Error Rates

| Field | Spec |
|-------|------|
| Purpose | Dual series hang + error |
| Description | Combo chart or dual KPI sparklines under fold |
| Metrics | hang_rate, error_rate_pct |
| Drilldowns | Event samples |

### `w-app-version-compare` — Version Health Compare

| Field | Spec |
|-------|------|
| Purpose | Compare experience across versions |
| Metric | `m.app.version_health_delta` + per-version scores |
| Description | Bars/table of versions with score, population, launch P90 |
| Drilldowns | Isolate version filter on page |
| Actions | Flag bad version · Recommend pin |
| API | `GET /api/v1/apps/{appId}/versions` |
| Permissions | app_owner+ |

### `w-app-dependency-map` — Dependency Map

| Field | Spec |
|-------|------|
| Purpose | Show client-relevant dependencies and risk |
| Description | Node graph: App client → IdP, API GW, CDN, Network path, Endpoint health contribution |
| Metric | `m.app.dependency_risk_score` + node health |
| Calculation | Edge weights from error/latency correlation & synthetic checks |
| Aggregation | App dependency grain |
| Dimensions | dependency_id |
| Supported Filters | Hide healthy; critical path only |
| Drilldowns | Node → entity (Session 2 infra for deep service); IdP as app; Endpoint fleet filtered |
| Context Menu | Open node · Copy · Ask AI |
| Actions | Expand neighborhood |
| Refresh | 5 min |
| Permissions | app_owner+ |
| API | GraphQL `AppDependencies` + REST fallback `GET /api/v1/apps/{appId}/dependencies` |
| Caching | 2 min |
| Performance | < 800ms for ≤50 nodes |
| Accessibility | Adjacency list alternative |

### `w-app-geo-perf` — Geo Performance

| Field | Spec |
|-------|------|
| Purpose | Score/launch by region/country |
| Metric | experience_score, launch_time_ms |
| Drilldowns | Set scope geo |
| API | Breakdown `dim=region` |

### `w-app-user-impact` — User Impact Table

| Field | Spec |
|-------|------|
| Purpose | Who is hurt |
| Description | BU/dept/employee(gated)/device counts with score < 70 |
| Drilldowns | Employee → Device → Event |
| Permissions | Aggregates default; names need PII |
| API | `GET /api/v1/apps/{appId}/impact` |

### `w-app-ai-insights` — Application AI Insights (detail)

Surface=`application.detail`; requires appId context; evidence pack includes version, dependency, endpoint correlation.

---

## B.6 Interactions

Hover dependency edges highlight correlated metrics. Click version cross-filters all widgets. Double-click dependency node opens rail. Keyboard graph: arrow between nodes. Drag pan/zoom graph (reduced motion: buttons only). Cross-filtering version ↔ trend ↔ geo. Linked highlighting impact rows ↔ geo.

---

## B.7 Drilldown Flow

```
Application (this page)
  → Process (client process)
    → Event → Timeline → Logs → Automation
```

Also lateral: Application → Device (clients) → Employee; Application → Dependency service (Session 2); Application → Journey steps consuming app.

Upward: Application → Department/BU/Region via impact table; to Portfolio via breadcrumb.

---

## B.8 AI

Detail insights (e.g., “API Gateway latency dominates”); recommendations with expected score lift; root cause ranked hypotheses; predictions post-version; correlations endpoint CPU vs hangs (explicitly negative when not causal); impact radius; confidence.

---

## B.9 Data

Facts: `fact_app_session`, version dims, dependency edges, synthetic checks. Entities: Application, ApplicationVersion, ApplicationDependency, Session, Device, Employee. Refresh 1–5 min. Retention 90d hot sessions. Security: app ACL; synthetic tokens never exposed to UI.

---

## B.10 Engineering

| Concern | Spec |
|---------|------|
| REST | `/apps/{id}/summary`, `/timeseries`, `/versions`, `/impact`, `/dependencies` |
| GraphQL | Preferred for dependency graph |
| Streaming | Session 2 live traces; Session 1 poll |
| Caching | Per-appId query keys |
| State | URL `appId`, `version`, `geo` |
| Performance | Priority KPI+trend; defer graph |
| Offline | Last summary banner |
| a11y | Graph list mode mandatory |
| i18n | App names as proper nouns; UI chrome translated |
| Ticket draft | `POST /api/v1/tickets:draft` with evidence pack |

---

# Part C — Session 1 Application Completeness Checklist

- [x] Portfolio functional/business/UX/widget/nav/data/engineering specs  
- [x] Detail specs including dependency map & version compare  
- [x] Widget IDs registered in widget index  
- [x] Metrics bound to catalog  
- [x] SVG mockups 1920/1440/1366 dark+light  
- [x] Cross-links to Experience and Endpoint volumes  
- [x] AI contract reused  
- [x] Drilldown grammar honored  

---

# Part D — Mockup Index (Application)

| File prefix | Dashboard |
|-------------|-----------|
| `app-portfolio-*` | D-APP-01 |
| `app-detail-crm-*` | D-APP-02 exemplar |

12 SVG files in Session 1 (2 views × 3 widths × 2 themes). Additional app exemplars may be added without changing layout contracts.

---

# Part E — Session 1 Close-Out (Volumes 1A–1E)

With Volume 1E complete, **Session 1** delivers:

1. Product vision and shell (1A)  
2. Executive dashboards (1B)  
3. Experience dashboards (1C)  
4. Endpoint dashboards (1D)  
5. Application dashboards (1E)  

Plus shared foundations: tokens, personas, IA, metrics seeds, widget index, entity model, glossary, and production SVG mockups.

**Do not start Session 2** until stakeholders sign off on Volumes 1A–1E consistency (DEX formula, drilldown grammar, tokens, widget IDs).

---

*End of Volume 1E — Application Dashboards*  
*End of SESSION 1*  
*Next (future): Session 2 — Infrastructure, Operations, AI Hub, Investigation, Widget System*
