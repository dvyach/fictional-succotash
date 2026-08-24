# Volume 1C — Experience Dashboards

**Product:** AetherDEX  
**Session:** 1  
**Dashboards:** D-EXP-01 Experience Overview · D-EXP-02 Employee Journeys · D-EXP-03 Sentiment & Voice  
**Depends on:** [Volume 1A](Volume-1A-Product-Vision.md) · [Volume 1B](Volume-1B-Executive-Dashboards.md) · [Tokens](../../design-system/tokens.md) · [IA](../../navigation/information-architecture.md) · [Metrics](../../metrics/metric-catalog-session-1.md) · [Widgets](../../widgets/widget-index-session-1.md)  
**Mockups:** [`mockups/experience/`](../../mockups/experience/)

---

# Document Control

| Version | Status |
|---------|--------|
| 1.0.0 | Complete — Session 1 baseline |

**Consistency notes:** DEX thresholds, AI insight card contract, shell filters, and drilldown grammar inherit Volume 1A/1B without modification.

---

# Part A — D-EXP-01 Experience Overview

**Route:** `/app/experience/overview` · **ID:** `exp.overview`  
**Mockups:** `exp-overview-{1920|1440|1366}-{dark|light}.svg`

---

## A.1 Overview

### Purpose

Give DEX leads and operations a daily command surface for employee experience: score, friction, time-to-productivity, collaboration quality, location-type equity, timeline of friction, activity, and AI insights — with immediate paths into journeys, sentiment, endpoints, and applications.

### Audience

| Primary | Secondary |
|---------|-----------|
| P2 Jordan Hale (DEX Lead) | P5 Sam Rivera (IT Ops) |
| | P1 (drill from executive) · P6 (sentiment adjacency) |

### Business Value

- Detects experience degradation before ticket volume spikes.  
- Makes hybrid/remote/office equity visible.  
- Connects “how work feels” to technical domains without tool hopping.  
- Anchors the weekly DEX program standup.

### Business Questions

1. Is experience improving or degrading in the current window?  
2. Where is friction concentrating (time, location type, journey)?  
3. How long does it take employees to become productive after login?  
4. Is collaboration quality healthy?  
5. What changed in the last 24–48 hours?  
6. What should we investigate first?

### Success Metrics

| Metric | Target |
|--------|--------|
| Daily active use by DEX analysts | ≥ 70% of `role.dex_analyst` |
| Friction timeline → journey drill | ≥ 35% of sessions with spikes |
| Location inequity acknowledged (filter applied) | Tracked as product analytics event |

---

## A.2 Layout

| Viewport | Structure |
|----------|-----------|
| **1920 Desktop** | KPI×4 → Location Compare (5) + Friction Timeline (7) → Activity Feed (7) + AI Insights (5) |
| **1440** | Same; activity rows compact |
| **1366 Laptop** | KPI×4 wrap 2×2 if needed; timeline full width; location below; feeds stacked |
| **Tablet** | All stacked; horizontal KPI scroll |
| **Ultra Wide** | Content max 1600 centered |
| **Dark / Light** | Full token themes; mockups authoritative |

Grid: 12-column, gutter 24px (16px ≤1366), page padding 24px, card radius `--adx-radius-md`.

---

## A.3 Navigation

| Element | Spec |
|---------|------|
| Breadcrumb | `Experience / Overview` |
| Sidebar | Experience → Overview active |
| Context Navigation | Entity rail on location cohort, friction event cluster, or insight |
| Quick Actions | Open Journeys · Open Sentiment · Save view · Ask AI · Create alert from friction brush |
| Bookmarks | “Daily DEX Standup” template |
| Recent Views | Shell |

---

## A.4 Filters

| Layer | Filters |
|-------|---------|
| Global | Scope, Time (default 7d), Timezone, Compare (WoW) |
| Dashboard | Location type, Persona segment, Journey family, Friction severity ≥ |
| Widget | Timeline brush; location multi-select |
| Relative | 1h, 6h, 24h, 7d, 30d |
| Absolute | ≤ 90d detailed |
| Saved | “Remote only”, “Travel pain”, “Last 24h incidents” |

---

## A.5 Widget Inventory

### `w-exp-overview-score` — Experience Score KPI

| Field | Spec |
|-------|------|
| Purpose | Scoped DEX as experience score |
| Business Value | Aligns DEX program to executive index |
| Description | KPI card; same metric as executive DEX; subtitle “Employee-weighted” |
| Metric | `m.dex.digital_experience_index` |
| Calculation / Aggregation | Per catalog; employee-weighted mean |
| Dimensions | Inherits scope + dashboard filters |
| Supported Filters | All page filters |
| Drilldowns | Click → Executive DEX Index with context; or Driver panel |
| Context Menu | Copy · Definition · Ask AI |
| Actions | Pin to home |
| Refresh | 5 min |
| Permissions | dex_analyst+, exec_viewer |
| API | `GET /api/v1/metrics/m.dex.digital_experience_index/summary` |
| Caching | 60s |
| Performance | < 300ms |
| Accessibility | Score + band + delta announced |

### `w-exp-friction-rate` — Friction Rate KPI

| Field | Spec |
|-------|------|
| Purpose | Normalized friction volume |
| Business Value | Leading indicator of pain |
| Description | Friction events per 100 employees; delta vs compare |
| Metric | `m.exp.friction_events_per_100` |
| Calculation | friction_events / employees × 100 |
| Aggregation | Rate from sums |
| Dimensions | severity, event_type, location_type |
| Supported Filters | Severity, type |
| Drilldowns | Focus timeline; open friction type breakdown |
| Context Menu | Copy · Exclude type |
| Actions | Create alert rule stub |
| Refresh | 1–5 min |
| Permissions | dex_analyst+ |
| API | `GET /api/v1/metrics/m.exp.friction_events_per_100/summary` |
| Caching | 60s |
| Performance | < 300ms |
| Accessibility | Includes unit in name |

### `w-exp-ttp` — Time to Productivity KPI

| Field | Spec |
|-------|------|
| Purpose | Minutes from login to first productive app interaction |
| Business Value | Quantifies morning digital delay |
| Description | Default P90; toggle P50/P95 in overflow |
| Metric | `m.exp.time_to_productivity_min` |
| Calculation | Per catalog |
| Aggregation | P90 default |
| Dimensions | location_type, os, bu |
| Supported Filters | Aggregation percentile |
| Drilldowns | Journey Morning Login; Endpoint boot/login |
| Context Menu | Copy · Change percentile |
| Actions | Open Journeys filtered |
| Refresh | 5 min |
| Permissions | dex_analyst+ |
| API | `GET /api/v1/metrics/m.exp.time_to_productivity_min/summary?agg=p90` |
| Caching | 60s |
| Performance | < 400ms |
| Accessibility | Percentile stated |

### `w-exp-collab-quality` — Collaboration Quality KPI

| Field | Spec |
|-------|------|
| Purpose | Meeting/A/V/screen-share composite |
| Business Value | Protects hybrid work rituals |
| Description | 0–100 index with subscore hover |
| Metric | `m.exp.collab_quality_index` |
| Calculation | join 25% · audio 30% · video 25% · share 20% |
| Aggregation | Employee-weighted mean |
| Dimensions | region, network_path_class, client_app |
| Supported Filters | Global + location |
| Drilldowns | Experience journey “Join Meeting”; App Collab Suite detail |
| Context Menu | Copy · View subscores |
| Actions | Open collab app |
| Refresh | 5 min |
| Permissions | dex_analyst+ |
| API | `GET /api/v1/metrics/m.exp.collab_quality_index/summary` |
| Caching | 60s |
| Performance | < 300ms |
| Accessibility | Subscores in details |

### `w-exp-location-compare` — Location Type Comparison

| Field | Spec |
|-------|------|
| Purpose | Compare DEX (and optional friction) by location type |
| Business Value | Hybrid equity governance |
| Description | Horizontal bar comparison: office, hybrid, remote, travel, unknown |
| Metric | DEX by `location_type` |
| Calculation | Employee-weighted mean per location_type |
| Aggregation | Category |
| Dimensions | location_type |
| Supported Filters | Click isolates location (cross-filter) |
| Drilldowns | Set dashboard filter; deep link executive geo |
| Context Menu | Copy · Exclude unknown |
| Actions | Save “equity view” |
| Refresh | 5 min |
| Permissions | dex_analyst+ |
| API | `GET /api/v1/metrics/m.dex.digital_experience_index/breakdown?dim=location_type` |
| Caching | 2 min |
| Performance | < 400ms |
| Accessibility | List alternative |

### `w-exp-friction-timeline` — Friction Timeline

| Field | Spec |
|-------|------|
| Purpose | Time series of friction with event markers |
| Business Value | Ties pain to change events |
| Description | Line/area of friction rate; markers for IdP/app/net/change windows |
| Metric | Friction rate over time |
| Calculation | Bucketed event counts normalized |
| Aggregation | Time buckets auto (5m–1d) |
| Dimensions | time, event_type |
| Supported Filters | Brush sets time; type toggles |
| Drilldowns | Brush → apply time; marker → change record / alert |
| Context Menu | Download CSV · Annotate |
| Actions | Create investigation pack (stub Session 2) |
| Refresh | 1 min for ≤24h else 5 min |
| Permissions | dex_analyst+ |
| API | `GET /api/v1/experience/friction/timeseries` |
| Caching | 30–60s |
| Performance | < 800ms |
| Accessibility | Data table; marker list |

### `w-exp-activity-feed` — Experience Activity Feed

| Field | Spec |
|-------|------|
| Purpose | Chronological experience-notable events |
| Business Value | Situational awareness for standups |
| Description | Title, domain, scope, age; severity tint |
| Metric | Activity stream |
| Calculation | Merged friction spikes, journey regressions, sentiment shifts, alert opens |
| Aggregation | List |
| Dimensions | domain, severity |
| Supported Filters | Domain, severity |
| Drilldowns | Open related dashboard with context |
| Context Menu | Copy link · Mute type 24h |
| Actions | Open |
| Refresh | 30–60s poll |
| Permissions | dex_analyst+ |
| API | `GET /api/v1/experience/activity` |
| Caching | 30s |
| Performance | < 300ms |
| Accessibility | Feed semantics; polite live region |

### `w-exp-ai-insights` — Experience AI Insights

| Field | Spec |
|-------|------|
| Purpose | Ranked experience insights |
| Business Value | Prioritizes analyst attention |
| Description | Standard AI insight cards (Volume 1A/1B contract) |
| Metric | Insight service |
| Calculation | Impact × confidence within experience domain |
| Aggregation | N/A |
| Dimensions | insight_type |
| Supported Filters | Min confidence |
| Drilldowns | Evidence → journeys/endpoints/apps |
| Context Menu | Pin · Dismiss · Share |
| Actions | Investigate · Ticket draft |
| Refresh | 5 min |
| Permissions | `ai.insights.view` |
| API | `GET /api/v1/insights?surface=experience` |
| Caching | 2 min |
| Performance | Cache-first < 200ms |
| Accessibility | Article list |

---

## A.6 Interactions

Hover tooltips + linked highlight between location bars and timeline segments tagged with location. Click cross-filters. Double-click opens Context Rail. Keyboard: `F` filters, arrows in feeds, Enter opens. Touch long-press = context menu. Drag brush on timeline. Cross-filtering and linked highlighting enabled across location, timeline, and activity.

---

## A.7 Drilldown Flow

```
Enterprise → Region → Country → BU → Department → Manager
  → Employee → Device → Application → Process → Event → Timeline → Logs → Automation
```

Experience-specific entries: Location type cohort → Employee sample; Friction cluster → Event → Timeline; Activity item → domain deep link.

---

## A.8 AI

Insights, recommendations, root-cause hypotheses for friction spikes, 24h friction forecast, correlations across location/journey/app, impact radius, confidence — all required fields per platform AI contract.

---

## A.9 Data

| Item | Spec |
|------|------|
| Entities | Employee, JourneyInstance, FrictionEvent, Session, Insight, Alert |
| Facts | `fact_dex_employee_hourly`, `fact_journey_instance`, friction events |
| Dimensions | location_type, persona_segment, region, bu, event_type |
| KPIs | Experience score, friction rate, TTP, collab quality |
| Refresh | 1–5 min |
| Retention | Hot 90d |
| Security | PII gated for employee lists; aggregates default |

---

## A.10 Engineering

REST metric + experience friction/activity endpoints; poll feeds; URL state for location_type & brush; SWR; chart virtualization not required at this density; a11y chart tables; i18n location labels.

---

# Part B — D-EXP-02 Employee Journeys

**Route:** `/app/experience/journeys` · **ID:** `exp.journeys`  
**Mockups:** `exp-journeys-{1920|1440|1366}-{dark|light}.svg`

---

## B.1 Overview

### Purpose

Model critical employee workflows as journeys with success rates, funnels, step failures, and performance tables — enabling DEX teams to fix systemic workflow friction.

### Audience

Primary P2; secondary P4 (app steps), P3 (boot/login steps), P6 (onboarding journeys).

### Business Value

- Moves teams from app-centric to workflow-centric improvement.  
- Identifies the exact step where employees fail.  
- Supports onboarding, morning start, meeting join, VPN, and custom tenant journeys.

### Business Questions

1. Which journeys are failing most?  
2. Where in the funnel do drop-offs occur?  
3. How long do successful journeys take (P90)?  
4. Which scopes are outliers?  
5. Which step maps to endpoint vs identity vs app?

### Success Metrics

| Metric | Target |
|--------|--------|
| ≥ 5 critical journeys configured per tenant at GA | Required |
| Step-level drill used weekly | ≥ 60% analyst WAU |

---

## B.2 Layout

| Viewport | Structure |
|----------|-----------|
| 1920 | KPI×3 → Funnel (12) → Journey Performance Table (12) |
| 1440 / 1366 | Same; table columns responsive hide (Trend first to hide) |
| Tablet | Funnel horizontal scroll; table card list |
| Dark/Light | Token themes |

Optional right Context Rail when a journey row selected: step details, AI, related apps/devices.

---

## B.3 Navigation

Breadcrumb `Experience / Journeys` · Sidebar Journeys active · Quick Actions: Configure journeys (admin) · Export funnel · Ask AI · Open Overview.

---

## B.4 Filters

Global + Journey definition multi-select + Outcome (success/fail) + Step name + Location type. Time default 7d. Saved: “Morning Login APAC”, “VPN fails Remote”.

---

## B.5 Widget Inventory

### `w-exp-journey-funnel` — Journey Success Funnel

| Field | Spec |
|-------|------|
| Purpose | Visualize step conversion for selected journey |
| Business Value | Pinpoints break steps |
| Description | Funnel/bars per step with % retained and absolute counts |
| Metric | `m.exp.journey_success_rate` + step metrics |
| Calculation | started → completed step counts; success = completed without severe friction |
| Aggregation | Step |
| Dimensions | journey_id, step_id, scope |
| Supported Filters | Journey selector (required) |
| Drilldowns | Step → Friction events → Device/App/Event |
| Context Menu | Copy step stats · Open owning system |
| Actions | Compare two journeys |
| Refresh | 5 min |
| Permissions | dex_analyst+ |
| API | `GET /api/v1/journeys/{id}/funnel` |
| Caching | 2 min |
| Performance | < 600ms |
| Accessibility | Ordered list of steps with rates |

### Journey Success / Failed Steps / Median Time KPIs

| Widget | Metric | Notes |
|--------|--------|-------|
| Success Rate KPI | `m.exp.journey_success_rate` | Same KPI contract pattern as Volume 1B |
| Failed Steps KPI | Count of failed step events | Distinct journey instances failing any step |
| Median Journey Time KPI | Duration | Toggle P50/P90 |

Each KPI supports: copy, ask AI, refresh 5 min, ACL, summary API, a11y name with unit.

### `w-exp-journey-table` — Journey Performance Table

| Field | Spec |
|-------|------|
| Purpose | Compare all journeys |
| Business Value | Portfolio view of workflow health |
| Description | Journey, success %, P90 time, friction level, trend, owner |
| Metric | Multi |
| Calculation | Per journey rollup |
| Aggregation | Journey |
| Dimensions | journey |
| Supported Filters | Search, friction level |
| Drilldowns | Row → funnel focus; double-click → Context Rail |
| Context Menu | Open · Assign owner · Mute |
| Actions | Export CSV · Configure |
| Refresh | 5 min |
| Permissions | View analyst+; configure admin |
| API | `GET /api/v1/journeys/summary` |
| Caching | 2 min |
| Performance | < 700ms |
| Accessibility | Sortable table |

---

## B.6–B.10 Interactions, Drilldown, AI, Data, Engineering

Interactions follow platform grammar; funnel step click cross-filters table. Drilldown enters canonical hierarchy at Application/Device depending on step type mapping (boot→device, IdP→app dependency, first app→application). AI proposes likely owning team per failed step with confidence. Data: `fact_journey_instance`, step events, mappings table `journey_step_owner`. Engineering: REST journey APIs; URL `journeyId`; GraphQL optional for step graphs.

---

# Part C — D-EXP-03 Sentiment & Voice

**Route:** `/app/experience/sentiment` · **ID:** `exp.sentiment`  
**Mockups:** `exp-sentiment-{1920|1440|1366}-{dark|light}.svg`

---

## C.1 Overview

### Purpose

Connect employee voice (pulses/surveys) to digital friction themes, scored sentiment, and trends — so People Experience and DEX leads share one evidence base.

### Audience

Primary P2 + P6; secondary P1 for board narrative.

### Business Value

- Closes the loop between “how it feels” and telemetry.  
- Prioritizes themes with technical owners.  
- Avoids free-text PII exposure via theme aggregates.

### Business Questions

1. What is sentiment now vs trend?  
2. Which themes dominate detractors?  
3. Do themes align with friction/telemetry?  
4. Where is participation too low to trust?  
5. What should we communicate or fix?

### Success Metrics

Theme→owner assignment rate ≥ 80% for top 10 themes; pulse coverage warn when < 30%.

---

## C.2 Layout

KPI×3 → Theme Treemap (6) + Sentiment Trend (6). Optional theme detail drawer. Dark/Light mockups provided. Responsive stacking on ≤1366.

---

## C.3 Navigation

Breadcrumb `Experience / Sentiment` · Quick Actions: Launch pulse (if integrated) · Export themes · Ask AI · Link theme to initiative.

---

## C.4 Filters

Global + Channel (in-product pulse / survey import) + Theme · Sentiment band · Location type. Time default 30d for sentiment.

---

## C.5 Widget Inventory

### `w-exp-sentiment-score`

| Field | Spec |
|-------|------|
| Purpose | Display Experience Sentiment Score |
| Metric | `m.exp.sentiment_nps_proxy` |
| Calculation / Aggregation | Per catalog |
| Drilldowns | Theme treemap focus detractors |
| API | Summary endpoint |
| Refresh | Hourly |
| Permissions | dex_analyst+; free text requires elevated |
| a11y | Score + coverage footnote |

### Response Coverage KPI

Participation % with warn <30%, critical <15%. Not a north-star vanity metric — trust gate.

### `w-exp-sentiment-themes` — Theme Treemap

| Field | Spec |
|-------|------|
| Purpose | Relative volume of themes |
| Description | Treemap tiles sized by mention volume; color by sentiment polarity |
| Metric | Theme aggregates |
| Drilldowns | Theme → linked friction types → apps/endpoints |
| Permissions | Aggregates default; quotes entitled only |
| API | `GET /api/v1/sentiment/themes` |
| Caching | 10 min |
| Accessibility | Sorted list alternative |

### `w-exp-sentiment-trend`

| Field | Spec |
|-------|------|
| Purpose | 90-day sentiment trajectory |
| Metric | `m.exp.sentiment_nps_proxy` timeseries |
| Compare | Dashed previous period |
| API | Timeseries |
| a11y | Data table |

---

## C.6–C.10

Interactions: treemap click cross-filters trend annotations. Drilldown to Automation only via linked technical theme owners. AI maps themes to likely technical drivers with confidence. Data: `fact_sentiment_pulse`, theme NLP store. Engineering: hourly batch; no free-text in exec exports by default.

---

# Part D — Mockup Index (Experience)

| File prefix | Dashboard |
|-------------|-----------|
| `exp-overview-*` | D-EXP-01 |
| `exp-journeys-*` | D-EXP-02 |
| `exp-sentiment-*` | D-EXP-03 |

Each prefix includes 1920/1440/1366 × dark/light (18 files).

---

# Part E — Cross-Links

| From | To |
|------|----|
| Overview friction spike | Journeys funnel / Endpoint stability / App detail |
| Journey step Boot/Login | Endpoint Stability |
| Journey step App | Application Detail |
| Sentiment theme VPN | App VPN + Endpoint network contribution |
| Any AI insight | Executive insights (promote) / Investigation stub |

Preserve `timeRange`, `scope`, `timezone`, `compareMode` on all links.

---

*End of Volume 1C — Experience Dashboards*  
*Next: [Volume 1D — Endpoint Dashboards](Volume-1D-Endpoint-Dashboards.md)*
