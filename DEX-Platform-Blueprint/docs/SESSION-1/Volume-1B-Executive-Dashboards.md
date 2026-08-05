# Volume 1B — Executive Dashboards

**Product:** AetherDEX  
**Session:** 1  
**Dashboards:** D-EXEC-01 Digital Experience Index · D-EXEC-02 Experience Risk & Investment ROI  
**Depends on:** [Volume 1A](Volume-1A-Product-Vision.md) · [Tokens](../../design-system/tokens.md) · [IA](../../navigation/information-architecture.md) · [Metrics](../../metrics/metric-catalog-session-1.md) · [Widgets](../../widgets/widget-index-session-1.md) · [Personas](../../personas/personas.md)  
**Mockups:** [`mockups/executive/`](../../mockups/executive/)

---

# Document Control

| Version | Status | Notes |
|---------|--------|-------|
| 1.0.0 | Complete | Session 1 baseline for executive surfaces |

---

# Part A — D-EXEC-01 Digital Experience Index

**Route:** `/app/executive/dex-index`  
**Route ID:** `exec.dex`  
**Mockups:** `exec-dex-index-{1920|1440|1366}-{dark|light}.svg`

---

## A.1 Overview

### Purpose

Provide the enterprise’s authoritative, board-ready view of Digital Experience Index (DEX) — with transparent drivers, geographic and organizational segmentation, AI insights, and one-click paths into deeper domains.

### Audience

| Primary | Secondary |
|---------|-----------|
| P1 Avery Chen (CDO/CIO) | P2 Jordan Hale (DEX Lead) |
| Executive leadership | P5 IT Ops (read for impact context) |

### Business Value

- Replaces fragmented vendor scorecards with one auditable experience narrative.  
- Enables weekly exec reviews in under five minutes.  
- Creates a shared baseline for initiative funding and risk conversations.  
- Surfaces coverage honesty so leaders do not over-trust incomplete data.

### Business Questions

1. What is our enterprise DEX right now, and how did it change vs last week / month?  
2. How many employees are below the “Good” threshold?  
3. Which drivers (endpoint, application, network/collab, sentiment) explain the score?  
4. Which regions and business units lead or lag?  
5. What should leadership pay attention to this week (AI + alerts)?  
6. Is telemetry coverage sufficient to trust the narrative?

### Success Metrics

| Metric | Target |
|--------|--------|
| Exec weekly active use of this route | ≥ 80% of `role.exec_viewer` |
| Median time to first spoken insight in exec review | ≤ 60 seconds |
| Drill-through from this page to domain dashboards | ≥ 40% of sessions |
| Coverage awareness (hover/open coverage KPI) | ≥ 50% of exec sessions monthly |

---

## A.2 Layout

### Desktop 1920

| Zone | Columns | Content |
|------|---------|---------|
| Shell | Sidebar 248 + header 56 | Global chrome |
| Title | Full | Breadcrumb + H1 |
| Row 1 | 12 (4×3) | KPI cards: DEX, Impacted, Risk, Coverage |
| Row 2 | 7 + 5 | DEX Trend · Driver Breakdown |
| Row 3 | 4 + 4 + 4 | Regional Heatmap · BU Leaderboard · AI Insights |

Page padding 24px; gutter 24px; card radius `--adx-radius-md`.

### Desktop 1440

Same structure; KPI sparklines remain; AI insight summaries truncate to 2 lines; BU table shows top 6.

### Laptop 1366

Sidebar collapsible; Row 3 stacks as 6+6 then AI full width if height constrained; Context Rail becomes drawer.

### Tablet

KPI row horizontal scroll; trend full width; drivers below; geo/BU/AI stacked.

### Ultra Wide

Content max-width 1600px centered; side margins use canvas color.

### Dark Theme

Canvas `#0B1220`; surfaces `#121A2B`; AI panels `#1E1838`; chart series use dark categorical tokens.

### Light Theme

Canvas `#F5F7FA`; surfaces `#FFFFFF`; AI panels `#F0ECFF`.

**Authority mockups:** see `mockups/executive/exec-dex-index-*.svg`.

---

## A.3 Navigation

| Element | Specification |
|---------|---------------|
| Breadcrumb | `Executive / DEX Index` |
| Sidebar | Executive → DEX Index active |
| Context Navigation | Opens on BU/region/entity double-click: Summary, Timeline, Related, AI, Actions |
| Quick Actions | Save view · Copy link · Ask AI · Export PDF (exec pack) · Open Risk dashboard |
| Bookmarks | Default bookmark template “Weekly Exec DEX” shipped for exec_viewer |
| Recent Views | Shell recent list |

---

## A.4 Filters

| Layer | Filters |
|-------|---------|
| Global | Scope, Time, Timezone, Compare (default WoW) |
| Dashboard | Persona segment, Location type, Device OS family, Employment type |
| Widget | Driver chart: isolate driver; Geo: region multi-select; BU: search |
| Relative Time | 24h, 7d (default), 30d, 90d |
| Absolute Time | Calendar range ≤ 90d for hourly; ≤ 13m for daily |
| Saved Filters | “Board Pack 90d”, “Hybrid only”, “Below Good (<70)” |

Filter chip bar sticky below header when any non-default dashboard filter is active.

---

## A.5 Widget Inventory

### A.5.1 `w-exec-dex-score` — Digital Experience Index KPI

| Field | Specification |
|-------|---------------|
| **Widget Name** | Digital Experience Index KPI |
| **Purpose** | Display the primary enterprise (or scoped) DEX score |
| **Business Value** | Single number for leadership alignment |
| **Description** | Large metric with threshold color bar, WoW/MoM delta chip, optional sparkline (7 points) |
| **Metric** | `m.dex.digital_experience_index` |
| **Calculation** | Employee-weighted mean per metric catalog; weights from tenant profile |
| **Aggregation** | Employee-weighted mean |
| **Dimensions** | Inherits scope; breaks on drill |
| **Supported Filters** | All global + dashboard |
| **Drilldowns** | Click → focus Driver Breakdown; Alt-click → Experience Overview with same scope/time |
| **Context Menu** | Copy value · View definition · Open metric explorer · Ask AI “Explain this score” |
| **Actions** | Pin to home · Add to exec pack |
| **Refresh** | 5 min; manual refresh icon |
| **Permissions** | `role.exec_viewer+` |
| **API** | `GET /api/v1/metrics/m.dex.digital_experience_index/summary` |
| **Caching** | 60s edge; 5 min soft |
| **Performance** | Target < 300ms cached |
| **Accessibility** | aria-label includes score, delta, threshold band name |

### A.5.2 `w-exec-employees-impacted` — Employees Impacted KPI

| Field | Specification |
|-------|---------------|
| **Widget Name** | Employees Impacted KPI |
| **Purpose** | Count employees with DEX < 70 in window |
| **Business Value** | Humanizes the score |
| **Description** | Count + delta vs compare period; secondary line “of {in_scope} in scope” |
| **Metric** | `m.dex.employees_impacted` |
| **Calculation** | Distinct employees with DEX < 70 |
| **Aggregation** | Distinct count |
| **Dimensions** | scope dimensions |
| **Supported Filters** | Global + dashboard; threshold override (advanced) |
| **Drilldowns** | Opens cohort list in Context Rail (aggregated); with PII entitlement → employee sample |
| **Context Menu** | Copy · Export cohort IDs (entitled) · Create initiative from cohort |
| **Actions** | Send to Experience Overview filtered to impacted |
| **Refresh** | 5 min |
| **Permissions** | exec_viewer+; employee sample needs `pii.employee_view` |
| **API** | `GET /api/v1/metrics/m.dex.employees_impacted/summary` |
| **Caching** | 60s |
| **Performance** | < 400ms |
| **Accessibility** | Announces count and percent of scope |

### A.5.3 `w-exec-risk-index` — Experience Risk Index KPI (summary)

| Field | Specification |
|-------|---------------|
| **Widget Name** | Experience Risk Index KPI |
| **Purpose** | Forward-looking risk summary on the DEX page |
| **Business Value** | Connects current score to emerging risk |
| **Description** | 0–100 risk (higher worse); delta; click-through to D-EXEC-02 |
| **Metric** | `m.risk.experience_risk_index` |
| **Calculation** | Per catalog |
| **Aggregation** | Scope rollup |
| **Dimensions** | scope |
| **Supported Filters** | Global |
| **Drilldowns** | Navigate to `/app/executive/risk-investment` |
| **Context Menu** | Copy · Open Risk dashboard |
| **Actions** | Open Risk dashboard |
| **Refresh** | 5 min |
| **Permissions** | exec_viewer+ |
| **API** | `GET /api/v1/metrics/m.risk.experience_risk_index/summary` |
| **Caching** | 60s |
| **Performance** | < 300ms |
| **Accessibility** | Includes “higher is worse” in accessible name |

### A.5.4 `w-exec-coverage` — Telemetry Coverage KPI

| Field | Specification |
|-------|---------------|
| **Widget Name** | Telemetry Coverage KPI |
| **Purpose** | Show % of in-scope employees with computable DEX |
| **Business Value** | Prevents false confidence |
| **Description** | Percentage with warn/critical styling; link to coverage gap segments |
| **Metric** | `m.dex.coverage_pct` |
| **Calculation** | employees_with_dex / employees_in_scope × 100 |
| **Aggregation** | Ratio |
| **Dimensions** | region, bu, location_type, os |
| **Supported Filters** | Global + dashboard |
| **Drilldowns** | Coverage gap table in Context Rail |
| **Context Menu** | Copy · Open instrumentation guide |
| **Actions** | View gaps |
| **Refresh** | 5 min |
| **Permissions** | exec_viewer+ |
| **API** | `GET /api/v1/metrics/m.dex.coverage_pct/summary` |
| **Caching** | 60s |
| **Performance** | < 300ms |
| **Accessibility** | States warn/critical band explicitly |

### A.5.5 `w-exec-dex-trend` — DEX Trend

| Field | Specification |
|-------|---------------|
| **Widget Name** | DEX Trend (30/90d) |
| **Purpose** | Show trajectory with threshold bands |
| **Business Value** | Separates noise from sustained change |
| **Description** | Area + line chart; compare series as dashed line; brush to zoom time |
| **Metric** | `m.dex.digital_experience_index` |
| **Calculation** | Daily employee-weighted mean |
| **Aggregation** | Daily mean (hourly if range ≤ 7d) |
| **Dimensions** | time; optional overlay by region (max 5) |
| **Supported Filters** | Global; series overlay control |
| **Drilldowns** | Brush range applies dashboard time; click point opens day detail |
| **Context Menu** | Download PNG/CSV · Toggle bands · Toggle compare |
| **Actions** | Annotate initiative markers |
| **Refresh** | 5 min |
| **Permissions** | exec_viewer+ |
| **API** | `GET /api/v1/metrics/m.dex.digital_experience_index/timeseries` |
| **Caching** | 2 min |
| **Performance** | < 800ms for 90d |
| **Accessibility** | Data table toggle; summary “rising/falling/flat” |

### A.5.6 `w-exec-driver-breakdown` — Experience Driver Breakdown

| Field | Specification |
|-------|---------------|
| **Widget Name** | Experience Driver Breakdown |
| **Purpose** | Show component scores and weights |
| **Business Value** | Explains *why* the DEX is what it is |
| **Description** | Horizontal bars: Endpoint, Application, Network/Collab, Sentiment with weight labels |
| **Metric** | Component scores feeding DEX |
| **Calculation** | Same composition as DEX; display component indices |
| **Aggregation** | Employee-weighted mean per component |
| **Dimensions** | driver |
| **Supported Filters** | Global; click isolates driver (cross-filter) |
| **Drilldowns** | Endpoint → Fleet Health; Application → Portfolio; Collab → Experience Overview; Sentiment → Sentiment |
| **Context Menu** | Copy driver score · View weight profile version |
| **Actions** | Open weight profile (read-only for exec; edit platform_admin) |
| **Refresh** | 5 min |
| **Permissions** | exec_viewer+ |
| **API** | `GET /api/v1/dex/drivers/summary` |
| **Caching** | 60s |
| **Performance** | < 400ms |
| **Accessibility** | Each bar has name, score, weight |

### A.5.7 `w-exec-geo-heatmap` — Regional Experience Heatmap

| Field | Specification |
|-------|---------------|
| **Widget Name** | Regional Experience Heatmap |
| **Purpose** | Compare DEX by region (and drill to country) |
| **Business Value** | Spot geographic inequality of experience |
| **Description** | Tile heatmap (Session 1) with optional choropleth upgrade flag; color = DEX band |
| **Metric** | `m.dex.digital_experience_index` |
| **Calculation** | Per-region employee-weighted mean |
| **Aggregation** | Region / Country |
| **Dimensions** | region, country |
| **Supported Filters** | Global; location_type |
| **Drilldowns** | Region → Country tiles → BU within country |
| **Context Menu** | Copy · Exclude region · Compare selected |
| **Actions** | Set scope to region |
| **Refresh** | 5 min |
| **Permissions** | exec_viewer+; ACL-limited regions |
| **API** | `GET /api/v1/metrics/m.dex.digital_experience_index/breakdown?dim=region` |
| **Caching** | 2 min |
| **Performance** | < 600ms |
| **Accessibility** | List alternative sorted by score |

### A.5.8 `w-exec-bu-leaderboard` — Business Unit Leaderboard

| Field | Specification |
|-------|---------------|
| **Widget Name** | Business Unit Leaderboard |
| **Purpose** | Rank BUs by DEX with deltas |
| **Business Value** | Creates accountability without blame theater |
| **Description** | Sortable table: BU, headcount, DEX, Δ, coverage, employees impacted |
| **Metric** | `m.dex.digital_experience_index`, companions |
| **Calculation** | Per BU rollup |
| **Aggregation** | BU |
| **Dimensions** | bu |
| **Supported Filters** | Search BU; min headcount |
| **Drilldowns** | BU → Department → Manager (Context Rail); deep link Experience Overview |
| **Context Menu** | Copy row · Open as scope · Ask AI |
| **Actions** | Export CSV |
| **Refresh** | 5 min |
| **Permissions** | exec_viewer+ |
| **API** | `GET /api/v1/metrics/m.dex.digital_experience_index/breakdown?dim=bu` |
| **Caching** | 2 min |
| **Performance** | Virtualized; < 700ms |
| **Accessibility** | Sortable column headers; row selection announced |

### A.5.9 `w-exec-ai-insights` — AI Executive Insights

| Field | Specification |
|-------|---------------|
| **Widget Name** | AI Executive Insights |
| **Purpose** | Surface ranked, accountable insights for leadership |
| **Business Value** | Compresses hours of analysis into review-ready findings |
| **Description** | Insight cards with confidence, impact radius, evidence, recommendation |
| **Metric** | Composite / insight service |
| **Calculation** | Impact × confidence ranking; ACL-scoped |
| **Aggregation** | N/A |
| **Dimensions** | insight_type |
| **Supported Filters** | Min confidence; domain tag |
| **Drilldowns** | Open evidence → domain dashboard / Investigation stub |
| **Context Menu** | Pin · Dismiss · Copy · Share to Slack (if integrated) |
| **Actions** | Investigate · Create ticket draft · Open recommendation |
| **Refresh** | 5 min poll; push optional |
| **Permissions** | `ai.insights.view` |
| **API** | `GET /api/v1/insights?surface=executive` |
| **Caching** | 2 min |
| **Performance** | First paint from cache < 200ms |
| **Accessibility** | List of articles; confidence announced |

### A.5.10 `w-exec-alert-feed` — Executive Alert Feed (compact on DEX page optional)

On D-EXEC-01 the alert feed is available via header badge and optionally as a collapsible module. Full executive feed is primary on D-EXEC-02. Contract matches §B.5.6.

### A.5.11 `w-exec-recommendations` — Priority Recommendations

Shown primarily on D-EXEC-02; on D-EXEC-01, top recommendation may appear inside AI insight cards. Full contract in §B.5.5.

---

## A.6 Interactions

| Interaction | Behavior |
|-------------|----------|
| Hover | Tooltips on KPIs/charts; linked highlight between geo tile and BU rows sharing region mapping |
| Click | Cross-filter dashboard (driver, region, BU) |
| Double Click | Open Context Rail for entity |
| Keyboard | Tab through widgets; Enter activates; arrows in tables; `F` focuses filter chips |
| Touch | Long-press = context menu; tap = click |
| Context Menu | Per-widget actions above |
| Drag | Column reorder on BU table |
| Cross Filtering | Driver ↔ Trend overlay; Geo ↔ BU |
| Linked Highlighting | Hover geo highlights related BU rows |

---

## A.7 Drilldown Flow

```
Enterprise (this page default)
  → Region (geo tile)
    → Country
      → Business Unit (leaderboard)
        → Department
          → Manager
            → Employee (entitled)
              → Device
                → Application
                  → Process → Event → Timeline → Logs → Automation
```

Lateral exits: Driver bars deep-link to Experience / Endpoints / Applications domains preserving scope/time/compare.

---

## A.8 AI

| Capability | Behavior on D-EXEC-01 |
|------------|----------------------|
| Insights | Top 3–5 executive insights |
| Recommendations | Embedded in insights; full list on Risk page |
| Root Cause | Evidence-backed hypotheses; never sole assertion without evidence links |
| Predictions | 7-day DEX forecast band on trend (toggle) |
| Correlations | Driver co-movement callouts |
| Impact Radius | Employees + regions + BUs |
| Confidence | Required on every card |

---

## A.9 Data

| Item | Spec |
|------|------|
| Entities | Organization, Region, Country, BU, Department, Employee (gated), Insight, Alert |
| Relationships | Per entity model |
| Fact Tables | `fact_dex_employee_hourly`, insight store, alert state |
| Dimensions | geo, org, location_type, persona_segment, os_family |
| Measures | DEX, impacted, coverage, risk, driver scores |
| KPIs | Listed in widget inventory |
| Refresh | 5 min rollup; 1 min critical segments |
| Retention | Per catalog |
| Security | Scope ACL; PII gated; weight profile audit |

---

## A.10 Engineering

| Concern | Spec |
|---------|------|
| REST | Metric summary/timeseries/breakdown; insights; views |
| GraphQL | Optional for org tree |
| Streaming | Not required Session 1 (poll feeds) |
| Caching | Redis query cache; SWR client |
| Performance | Priority fetch KPI row; defer AI |
| State | URL: scope, time, compare, driver, region, bu |
| Offline | Last successful KPI snapshot banner |
| Accessibility | AA; chart tables |
| Localization | Metric display names from API |

**PDF Exec Pack:** `POST /api/v1/exports/exec-pack` renders KPI+trend+drivers+top insights for meeting attachment.

---

## A.11 Functional / Business / UX / Navigation / Data Spec Summary

The sections above constitute the complete Functional, Business, UX, Widget, Navigation, Data, and Engineering specifications for D-EXEC-01. No additional stub sections are required for implementation handoff.

---

# Part B — D-EXEC-02 Experience Risk & Investment ROI

**Route:** `/app/executive/risk-investment`  
**Route ID:** `exec.risk`  
**Mockups:** `exec-risk-investment-{1920|1440|1366}-{dark|light}.svg`

---

## B.1 Overview

### Purpose

Translate digital experience into risk and investment language: quantify experience risk, estimate productivity hours lost, track initiative ROI against DEX lift, and prioritize recommendations and alerts for executive action.

### Audience

| Primary | Secondary |
|---------|-----------|
| P1 CDO/CIO | P2 DEX Lead |
| CFO partner (read) | P6 HR Digital Partner |

### Business Value

- Funds the right workplace initiatives with evidence.  
- Frames experience as operational risk, not only IT hygiene.  
- Closes the loop: spend → score lift → ROI.  
- Gives executives a short list of actions, not a sea of telemetry.

### Business Questions

1. How risky is our digital experience posture this week?  
2. How many productivity hours are we likely losing to friction?  
3. Which initiatives are paying off in DEX points?  
4. What should we do next (recommendations)?  
5. Which high-impact alerts need executive awareness?

### Success Metrics

| Metric | Target |
|--------|--------|
| Initiative records with baseline+target DEX | 100% of active Tier-1 initiatives |
| Monthly exec review includes this page | ≥ 90% |
| Recommendation accept/dismiss rate logged | 100% of shown recs |

---

## B.2 Layout

| Viewport | Structure |
|----------|-----------|
| 1920 | KPI row (3) → Initiative ROI (7) + Recommendations/Alerts (5) → Hours Lost by Region (12) |
| 1440 | Same; ROI columns compact |
| 1366 | ROI full width; recommendations/alerts stacked; hours lost below |
| Tablet | All stacked |
| Ultra-wide | Max 1600 content |
| Dark/Light | Token themes; mockups provided |

---

## B.3 Navigation

| Element | Spec |
|---------|------|
| Breadcrumb | `Executive / Risk & Investment` |
| Sidebar | Risk & Investment active |
| Context Nav | Initiative entity rail: funding, owner, timeline, DEX baseline/target |
| Quick Actions | Add initiative · Export ROI · Ask AI · Back to DEX Index |
| Bookmarks | “Monthly Investment Review” template |
| Recent Views | Shell |

---

## B.4 Filters

| Layer | Filters |
|-------|---------|
| Global | Scope, Time, Compare |
| Dashboard | Initiative status (on track/watch/at risk), Owner team, Investment category |
| Widget | ROI table search; alert severity |
| Time | 30d default for risk; 90d for initiative ROI |
| Saved | “At-risk initiatives”, “Tier-0 alerts only” |

---

## B.5 Widget Inventory

### B.5.1 `w-exec-risk-index` — Experience Risk Index KPI

| Field | Specification |
|-------|---------------|
| **Widget Name** | Experience Risk Index KPI |
| **Purpose** | Primary risk score for the page |
| **Business Value** | Single risk number for governance |
| **Description** | Large metric; higher = worse; band labels Low/Moderate/High/Critical |
| **Metric** | `m.risk.experience_risk_index` |
| **Calculation** | Poor population + trend slope + critical app health + open high-impact incidents (catalog) |
| **Aggregation** | Scope rollup |
| **Dimensions** | scope |
| **Supported Filters** | Global + dashboard |
| **Drilldowns** | Opens contributing factors panel |
| **Context Menu** | Copy · View model version · Ask AI |
| **Actions** | Pin |
| **Refresh** | 5 min |
| **Permissions** | exec_viewer+ |
| **API** | `GET /api/v1/metrics/m.risk.experience_risk_index/summary` |
| **Caching** | 60s |
| **Performance** | < 300ms |
| **Accessibility** | Higher-is-worse announced |

### B.5.2 `w-exec-hours-lost` — Productivity Hours Lost KPI + Breakdown

| Field | Specification |
|-------|---------------|
| **Widget Name** | Productivity Hours Lost |
| **Purpose** | Business translation of friction |
| **Business Value** | CFO-legible framing |
| **Description** | KPI on top row; regional bar chart on bottom |
| **Metric** | `m.risk.productivity_hours_lost` |
| **Calculation** | Modeled friction minutes; **model version stamped** on API + UI footer |
| **Aggregation** | Sum; breakdown by region/BU |
| **Dimensions** | region, bu, driver |
| **Supported Filters** | Global; model sensitivity (standard/conservative) for entitled analysts |
| **Drilldowns** | Region → Experience Overview |
| **Context Menu** | Copy · Export · View model card |
| **Actions** | Include in exec pack |
| **Refresh** | Hourly recompute; UI 5 min |
| **Permissions** | exec_viewer+ |
| **API** | `GET /api/v1/metrics/m.risk.productivity_hours_lost/summary` and `/breakdown` |
| **Caching** | 5 min |
| **Performance** | < 500ms |
| **Accessibility** | Model caveats in description |

### B.5.3 Active High-Impact Alerts KPI (uses `m.alert.active_high_impact`)

| Field | Specification |
|-------|---------------|
| **Widget Name** | Active High-Impact Alerts KPI |
| **Purpose** | Count open alerts above impact threshold |
| **Business Value** | Executive situational awareness |
| **Description** | Count + composition subtitle (endpoint/app/experience) |
| **Metric** | `m.alert.active_high_impact` |
| **Calculation** | Count open alerts with impact_radius ≥ tenant threshold |
| **Aggregation** | Count |
| **Dimensions** | domain, severity |
| **Supported Filters** | Severity |
| **Drilldowns** | Focus alert feed |
| **Context Menu** | Copy |
| **Actions** | Open Operations (Session 2 stub) |
| **Refresh** | 1 min |
| **Permissions** | exec_viewer+ |
| **API** | `GET /api/v1/alerts/summary?impact=high` |
| **Caching** | 30s |
| **Performance** | < 200ms |
| **Accessibility** | Live region on count change |

### B.5.4 `w-exec-initiative-roi` — Initiative ROI Table

| Field | Specification |
|-------|---------------|
| **Widget Name** | Initiative ROI Table |
| **Purpose** | Track workplace investments vs DEX outcomes |
| **Business Value** | Justifies and steers spend |
| **Description** | Table: Initiative, Owner, Population, Investment, DEX baseline, DEX current, Δ, ROI score, Status |
| **Metric** | `m.inv.initiative_roi_score` + DEX deltas |
| **Calculation** | Per catalog ROI normalization |
| **Aggregation** | Initiative grain |
| **Dimensions** | initiative, owner, category |
| **Supported Filters** | Status, category, owner, search |
| **Drilldowns** | Initiative Context Rail; linked DEX trend annotated |
| **Context Menu** | Edit (analyst+) · Archive · Duplicate |
| **Actions** | Add initiative · Export |
| **Refresh** | Daily facts; UI on load |
| **Permissions** | View exec+; mutate dex_analyst+ |
| **API** | `GET/POST /api/v1/initiatives` |
| **Caching** | 5 min |
| **Performance** | < 600ms |
| **Accessibility** | Full table semantics |

### B.5.5 `w-exec-recommendations` — Priority Recommendations

| Field | Specification |
|-------|---------------|
| **Widget Name** | Priority Recommendations |
| **Purpose** | Ranked next actions with expected impact |
| **Business Value** | Converts insight into decisions |
| **Description** | List cards: action title, expected DEX lift, population, confidence, owner suggestion |
| **Metric** | Composite |
| **Calculation** | Insight service recommendations ranked by expected lift × population × confidence |
| **Aggregation** | N/A |
| **Dimensions** | domain |
| **Supported Filters** | Domain, min confidence |
| **Drilldowns** | Open evidence / target dashboard |
| **Context Menu** | Accept · Dismiss · Snooze 7d · Assign |
| **Actions** | Create initiative from recommendation |
| **Refresh** | 5 min |
| **Permissions** | `ai.insights.view` |
| **API** | `GET /api/v1/recommendations?surface=executive` |
| **Caching** | 2 min |
| **Performance** | < 400ms |
| **Accessibility** | Actionable list |

### B.5.6 `w-exec-alert-feed` — Executive Alert Feed

| Field | Specification |
|-------|---------------|
| **Widget Name** | Executive Alert Feed |
| **Purpose** | Show high-impact alerts needing awareness |
| **Business Value** | Prevents surprise in leadership forums |
| **Description** | Severity, title, domain, impact radius, age, status |
| **Metric** | Alert entities / `m.alert.active_high_impact` |
| **Calculation** | Filtered alert query |
| **Aggregation** | List |
| **Dimensions** | severity, domain |
| **Supported Filters** | Severity, domain, status |
| **Drilldowns** | Alert detail → domain dashboard / Investigation stub |
| **Context Menu** | Acknowledge · Assign · Copy link |
| **Actions** | Open alert |
| **Refresh** | 30–60s poll |
| **Permissions** | exec_viewer+ |
| **API** | `GET /api/v1/alerts?impact=high` |
| **Caching** | 30s |
| **Performance** | < 300ms |
| **Accessibility** | Feed list; polite live updates |

---

## B.6 Interactions

Same grammar as Part A. Additional: Accept/Dismiss recommendations writes analytics events; initiative row double-click opens rail; alert acknowledge requires confirm.

---

## B.7 Drilldown Flow

```
Enterprise risk
  → Region (hours lost bar)
    → Country / BU
      → Initiative (ROI row)
        → Linked employees/devices/apps (evidence)
          → Event / Timeline / Logs / Automation
```

Alert path: Alert → Impacted cohort → Device/App → Event → Timeline → Logs → Automation.

---

## B.8 AI

Insights feed recommendations; root-cause hypotheses attach to alerts; predictions include risk index 7-day trajectory; correlations connect initiative changes to score lifts; confidence mandatory; impact radius on every rec and alert.

---

## B.9 Data

| Item | Spec |
|------|------|
| Facts | `fact_initiative_progress`, `fact_alert_state`, productivity model outputs, DEX facts |
| Entities | Initiative, Alert, Insight, Region, BU |
| Refresh | Alerts 1 min; risk 5 min; initiative daily |
| Security | Investment $ fields may require `finance.investment_view` |
| Retention | Initiative history 36 months cold |

---

## B.10 Engineering

| Concern | Spec |
|---------|------|
| REST | Initiatives CRUD; recommendations; alerts; metrics |
| GraphQL | Not required |
| Streaming | Optional alert SSE later; Session 1 poll |
| Caching | As widgets |
| State | URL filters for status/category |
| Offline | Read-only last ROI snapshot |
| a11y / i18n | Same platform standards |
| Model card | `/docs/models/productivity-hours` linked in UI |

---

# Part C — Cross-Dashboard Consistency Rules (Executive)

1. DEX formula and thresholds identical to Experience surfaces.  
2. Compare mode default WoW on both executive pages.  
3. AI violet accent only on AI/recommendation chrome.  
4. Deep links preserve scope/time/tz/compare.  
5. Widget IDs must match `widgets/widget-index-session-1.md`.  
6. Mockups are layout authority for MVP implementation.

---

# Part D — Mockup Index

| File | Dashboard | Width | Theme |
|------|-----------|-------|-------|
| `exec-dex-index-1920-dark.svg` | D-EXEC-01 | 1920 | Dark |
| `exec-dex-index-1920-light.svg` | D-EXEC-01 | 1920 | Light |
| `exec-dex-index-1440-dark.svg` | D-EXEC-01 | 1440 | Dark |
| `exec-dex-index-1440-light.svg` | D-EXEC-01 | 1440 | Light |
| `exec-dex-index-1366-dark.svg` | D-EXEC-01 | 1366 | Dark |
| `exec-dex-index-1366-light.svg` | D-EXEC-01 | 1366 | Light |
| `exec-risk-investment-1920-dark.svg` | D-EXEC-02 | 1920 | Dark |
| `exec-risk-investment-1920-light.svg` | D-EXEC-02 | 1920 | Light |
| `exec-risk-investment-1440-dark.svg` | D-EXEC-02 | 1440 | Dark |
| `exec-risk-investment-1440-light.svg` | D-EXEC-02 | 1440 | Light |
| `exec-risk-investment-1366-dark.svg` | D-EXEC-02 | 1366 | Dark |
| `exec-risk-investment-1366-light.svg` | D-EXEC-02 | 1366 | Light |

---

*End of Volume 1B — Executive Dashboards*  
*Next: [Volume 1C — Experience Dashboards](Volume-1C-Experience-Dashboards.md)*
