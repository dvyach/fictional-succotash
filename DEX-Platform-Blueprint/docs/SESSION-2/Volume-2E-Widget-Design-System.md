# Volume 2E — Enterprise Widget Design System

**Product:** AetherDEX  
**Session:** 2  
**Depends on:** [tokens](../../design-system/tokens.md) · Session 1–2 widget indexes  
**Companion:** [Widget-Catalog.md](../../design-system/Widget-Catalog.md) · [Interaction-Patterns.md](../../design-system/Interaction-Patterns.md) · [widget-dependencies.mmd](../../architecture/widget-dependencies.mmd)

---

# Document Control

| Version | Status |
|---------|--------|
| 2.0.0 | Complete |

# Goals

Deliver **150 reusable widgets** with engineering-ready contracts, shared states, a11y, and naming aligned to Session 1 (`w-*`, `Adx*`, `ADX /`).

# Classification Counts

- **KPIs:** 20
- **Charts:** 20
- **Tables:** 12
- **Maps:** 4
- **Timelines:** 7
- **Topology:** 4
- **AI:** 15
- **Alerts:** 5
- **Feeds:** 4
- **Inputs:** 8
- **Forms:** 5
- **Filters:** 8
- **Cards:** 6
- **Dialogs:** 5
- **Panels:** 6
- **Graphs:** 4
- **Trees:** 4
- **Widgets:** 13

# Global Rules

1. No duplicate IDs across Session 1 and 2. Domain-specific widgets (`w-exec-*`, `w-infra-*`, …) compose these primitives.  
2. All widgets consume design tokens — no one-off hex.  
3. States required: default, hover, selection, loading, empty, error, disabled.  
4. WCAG 2.2 AA; keyboard parity for primary actions.  
5. Real-time only where Session 2 specifies (NOC, cases, alerts).

# Primitive Widget Specifications


### `w-kpi-dex` — DEX Score KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-dex` |
| Widget Name | DEX Score KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.dex.digital_experience_index` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / DEX Score KPI` |
| React Component Name | `AdxKpiDex` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-impacted` — Employees Impacted KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-impacted` |
| Widget Name | Employees Impacted KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.dex.employees_impacted` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / Employees Impacted KPI` |
| React Component Name | `AdxKpiImpacted` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-coverage` — Telemetry Coverage KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-coverage` |
| Widget Name | Telemetry Coverage KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.dex.coverage_pct` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / Telemetry Coverage KPI` |
| React Component Name | `AdxKpiCoverage` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-risk` — Experience Risk KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-risk` |
| Widget Name | Experience Risk KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.risk.experience_risk_index` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / Experience Risk KPI` |
| React Component Name | `AdxKpiRisk` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-fleet` — Fleet Health KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-fleet` |
| Widget Name | Fleet Health KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.end.fleet_health_score` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / Fleet Health KPI` |
| React Component Name | `AdxKpiFleet` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-boot` — Boot P90 KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-boot` |
| Widget Name | Boot P90 KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.end.boot_duration_sec` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / Boot P90 KPI` |
| React Component Name | `AdxKpiBoot` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-login` — Login P90 KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-login` |
| Widget Name | Login P90 KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.end.login_duration_sec` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / Login P90 KPI` |
| React Component Name | `AdxKpiLogin` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-crash` — Crash Rate KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-crash` |
| Widget Name | Crash Rate KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.end.crash_rate` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / Crash Rate KPI` |
| React Component Name | `AdxKpiCrash` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-app-score` — App Experience KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-app-score` |
| Widget Name | App Experience KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.app.experience_score` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / App Experience KPI` |
| React Component Name | `AdxKpiAppScore` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-launch` — App Launch P90 KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-launch` |
| Widget Name | App Launch P90 KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.app.launch_time_ms` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / App Launch P90 KPI` |
| React Component Name | `AdxKpiLaunch` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-net-quality` — Network Quality KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-net-quality` |
| Widget Name | Network Quality KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.infra.network_quality_index` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / Network Quality KPI` |
| React Component Name | `AdxKpiNetQuality` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-vpn-success` — VPN Success KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-vpn-success` |
| Widget Name | VPN Success KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.infra.vpn_success_pct` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / VPN Success KPI` |
| React Component Name | `AdxKpiVpnSuccess` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-wifi` — WiFi Quality KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-wifi` |
| Widget Name | WiFi Quality KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.infra.wifi_quality_index` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / WiFi Quality KPI` |
| React Component Name | `AdxKpiWifi` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-vdi` — VDI Session KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-vdi` |
| Widget Name | VDI Session KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.infra.vdi_session_score` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / VDI Session KPI` |
| React Component Name | `AdxKpiVdi` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-availability` — Availability KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-availability` |
| Widget Name | Availability KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.ops.system_availability_pct` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / Availability KPI` |
| React Component Name | `AdxKpiAvailability` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-mttr` — MTTR KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-mttr` |
| Widget Name | MTTR KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.ops.mttr_minutes` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / MTTR KPI` |
| React Component Name | `AdxKpiMttr` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-mtta` — MTTA KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-mtta` |
| Widget Name | MTTA KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.ops.mtta_minutes` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / MTTA KPI` |
| React Component Name | `AdxKpiMtta` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-sla` — SLA Attainment KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-sla` |
| Widget Name | SLA Attainment KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.ops.sla_attainment_pct` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / SLA Attainment KPI` |
| React Component Name | `AdxKpiSla` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-ai-conf` — AI Confidence KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-ai-conf` |
| Widget Name | AI Confidence KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.ai.avg_confidence` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / AI Confidence KPI` |
| React Component Name | `AdxKpiAiConf` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-kpi-ai-convert` — Insight Action Conversion KPI

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-kpi-ai-convert` |
| Widget Name | Insight Action Conversion KPI |
| Category | KPIs |
| Purpose | Reusable kpis component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When metric visualization or kpis pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `m.ai.action_conversion_pct` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | metric |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / KPIs / Insight Action Conversion KPI` |
| React Component Name | `AdxKpiAiConvert` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-area` — Area Trend Chart

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-area` |
| Widget Name | Area Trend Chart |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When area visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `timeseries` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | area |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Area Trend Chart` |
| React Component Name | `AdxChartArea` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-line` — Line Trend Chart

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-line` |
| Widget Name | Line Trend Chart |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When line visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `timeseries` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | line |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Line Trend Chart` |
| React Component Name | `AdxChartLine` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-bar-h` — Horizontal Bar Chart

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-bar-h` |
| Widget Name | Horizontal Bar Chart |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When bar visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `breakdown` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | bar |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Horizontal Bar Chart` |
| React Component Name | `AdxChartBarH` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-bar-v` — Vertical Bar Chart

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-bar-v` |
| Widget Name | Vertical Bar Chart |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When bar visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `breakdown` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | bar |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Vertical Bar Chart` |
| React Component Name | `AdxChartBarV` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-stacked` — Stacked Bar Chart

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-stacked` |
| Widget Name | Stacked Bar Chart |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When stacked visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `breakdown` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | stacked |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Stacked Bar Chart` |
| React Component Name | `AdxChartStacked` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-donut` — Donut Distribution

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-donut` |
| Widget Name | Donut Distribution |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When donut visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `composition` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | donut |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Donut Distribution` |
| React Component Name | `AdxChartDonut` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-pie` — Pie Distribution

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-pie` |
| Widget Name | Pie Distribution |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When pie visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `composition` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | pie |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Pie Distribution` |
| React Component Name | `AdxChartPie` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-histogram` — Histogram

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-histogram` |
| Widget Name | Histogram |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When histogram visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `distribution` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | histogram |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Histogram` |
| React Component Name | `AdxChartHistogram` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-scatter` — Scatter Plot

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-scatter` |
| Widget Name | Scatter Plot |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When scatter visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `correlation` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | scatter |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Scatter Plot` |
| React Component Name | `AdxChartScatter` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-bubble` — Bubble Chart

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-bubble` |
| Widget Name | Bubble Chart |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When bubble visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `correlation` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | bubble |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Bubble Chart` |
| React Component Name | `AdxChartBubble` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-heatmap` — Matrix Heatmap

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-heatmap` |
| Widget Name | Matrix Heatmap |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When heatmap visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `matrix` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | heatmap |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Matrix Heatmap` |
| React Component Name | `AdxChartHeatmap` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-combo` — Combo Line+Bar

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-combo` |
| Widget Name | Combo Line+Bar |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When combo visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `mixed` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | combo |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Combo Line+Bar` |
| React Component Name | `AdxChartCombo` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-sparkline` — Sparkline

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-sparkline` |
| Widget Name | Sparkline |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When spark visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `inline` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | spark |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Sparkline` |
| React Component Name | `AdxChartSparkline` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-bullet` — Bullet Chart

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-bullet` |
| Widget Name | Bullet Chart |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When bullet visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `target` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | bullet |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Bullet Chart` |
| React Component Name | `AdxChartBullet` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-gauge` — Radial Gauge

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-gauge` |
| Widget Name | Radial Gauge |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When gauge visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `score` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | gauge |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Radial Gauge` |
| React Component Name | `AdxChartGauge` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-funnel` — Funnel Chart

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-funnel` |
| Widget Name | Funnel Chart |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When funnel visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `journey` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | funnel |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Funnel Chart` |
| React Component Name | `AdxChartFunnel` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-waterfall` — Waterfall Chart

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-waterfall` |
| Widget Name | Waterfall Chart |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When waterfall visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `drivers` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | waterfall |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Waterfall Chart` |
| React Component Name | `AdxChartWaterfall` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-box` — Box Plot

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-box` |
| Widget Name | Box Plot |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When box visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `distribution` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | box |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Box Plot` |
| React Component Name | `AdxChartBox` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-calendar` — Calendar Heatmap

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-calendar` |
| Widget Name | Calendar Heatmap |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When calendar visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `daily` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | calendar |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Calendar Heatmap` |
| React Component Name | `AdxChartCalendar` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-chart-sankey` — Sankey Flow

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-chart-sankey` |
| Widget Name | Sankey Flow |
| Category | Charts |
| Purpose | Reusable charts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When sankey visualization or charts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `flow` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | sankey |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Charts / Sankey Flow` |
| React Component Name | `AdxChartSankey` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-entities` — Entity Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-entities` |
| Widget Name | Entity Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When table visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `entities` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | table |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / Entity Table` |
| React Component Name | `AdxTableEntities` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-devices` — Device Cohort Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-devices` |
| Widget Name | Device Cohort Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When table visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `devices` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | table |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / Device Cohort Table` |
| React Component Name | `AdxTableDevices` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-apps` — App Portfolio Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-apps` |
| Widget Name | App Portfolio Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When table visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `apps` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | table |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / App Portfolio Table` |
| React Component Name | `AdxTableApps` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-incidents` — Incident Queue Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-incidents` |
| Widget Name | Incident Queue Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When table visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `incidents` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | table |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / Incident Queue Table` |
| React Component Name | `AdxTableIncidents` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-alerts` — Alert Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-alerts` |
| Widget Name | Alert Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When table visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `alerts` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | table |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / Alert Table` |
| React Component Name | `AdxTableAlerts` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-changes` — Change Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-changes` |
| Widget Name | Change Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When table visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `changes` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | table |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / Change Table` |
| React Component Name | `AdxTableChanges` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-events` — Event Explorer Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-events` |
| Widget Name | Event Explorer Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When table visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `events` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | table |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / Event Explorer Table` |
| React Component Name | `AdxTableEvents` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-journeys` — Journey Performance Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-journeys` |
| Widget Name | Journey Performance Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When table visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `journeys` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | table |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / Journey Performance Table` |
| React Component Name | `AdxTableJourneys` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-recommendations` — Recommendation Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-recommendations` |
| Widget Name | Recommendation Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When table visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `recs` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | table |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / Recommendation Table` |
| React Component Name | `AdxTableRecommendations` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-cases` — Case List Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-cases` |
| Widget Name | Case List Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When table visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `cases` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | table |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / Case List Table` |
| React Component Name | `AdxTableCases` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-pivot` — Pivot Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-pivot` |
| Widget Name | Pivot Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When pivot visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `cubes` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | pivot |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / Pivot Table` |
| React Component Name | `AdxTablePivot` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-table-diff` — Compare Diff Table

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-table-diff` |
| Widget Name | Compare Diff Table |
| Category | Tables |
| Purpose | Reusable tables component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When table visualization or tables pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `compare` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | table |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Tables / Compare Diff Table` |
| React Component Name | `AdxTableDiff` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-map-geo-choropleth` — Geo Choropleth

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-map-geo-choropleth` |
| Widget Name | Geo Choropleth |
| Category | Maps |
| Purpose | Reusable maps component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When map visualization or maps pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `geo` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | map |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Maps / Geo Choropleth` |
| React Component Name | `AdxMapGeoChoropleth` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-map-geo-tiles` — Regional Tile Map

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-map-geo-tiles` |
| Widget Name | Regional Tile Map |
| Category | Maps |
| Purpose | Reusable maps component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When tiles visualization or maps pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `geo` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | tiles |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Maps / Regional Tile Map` |
| React Component Name | `AdxMapGeoTiles` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-map-site-floor` — Floor Plan Heatmap

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-map-site-floor` |
| Widget Name | Floor Plan Heatmap |
| Category | Maps |
| Purpose | Reusable maps component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When floor visualization or maps pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `wifi` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | floor |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Maps / Floor Plan Heatmap` |
| React Component Name | `AdxMapSiteFloor` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-map-path` — Network Path Map

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-map-path` |
| Widget Name | Network Path Map |
| Category | Maps |
| Purpose | Reusable maps component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When path visualization or maps pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `network` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | path |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Maps / Network Path Map` |
| React Component Name | `AdxMapPath` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-time-multi` — Multi-track Timeline

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-time-multi` |
| Widget Name | Multi-track Timeline |
| Category | Timelines |
| Purpose | Reusable timelines component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When timeline visualization or timelines pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `multi` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | timeline |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Timelines / Multi-track Timeline` |
| React Component Name | `AdxTimeMulti` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-time-incident` — Incident Timeline

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-time-incident` |
| Widget Name | Incident Timeline |
| Category | Timelines |
| Purpose | Reusable timelines component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When timeline visualization or timelines pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `incident` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | timeline |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Timelines / Incident Timeline` |
| React Component Name | `AdxTimeIncident` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-time-friction` — Friction Timeline

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-time-friction` |
| Widget Name | Friction Timeline |
| Category | Timelines |
| Purpose | Reusable timelines component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When timeline visualization or timelines pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `friction` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | timeline |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Timelines / Friction Timeline` |
| React Component Name | `AdxTimeFriction` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-time-session-replay` — Session Replay Timeline

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-time-session-replay` |
| Widget Name | Session Replay Timeline |
| Category | Timelines |
| Purpose | Reusable timelines component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When timeline visualization or timelines pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `session` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | timeline |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Timelines / Session Replay Timeline` |
| React Component Name | `AdxTimeSessionReplay` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-time-activity` — Activity Timeline

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-time-activity` |
| Widget Name | Activity Timeline |
| Category | Timelines |
| Purpose | Reusable timelines component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When timeline visualization or timelines pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `activity` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | timeline |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Timelines / Activity Timeline` |
| React Component Name | `AdxTimeActivity` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-time-scrubber` — Timeline Scrubber

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-time-scrubber` |
| Widget Name | Timeline Scrubber |
| Category | Timelines |
| Purpose | Reusable timelines component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When scrubber visualization or timelines pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `brush` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | scrubber |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Timelines / Timeline Scrubber` |
| React Component Name | `AdxTimeScrubber` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-time-gantt` — Change Gantt

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-time-gantt` |
| Widget Name | Change Gantt |
| Category | Timelines |
| Purpose | Reusable timelines component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When gantt visualization or timelines pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `changes` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | gantt |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Timelines / Change Gantt` |
| React Component Name | `AdxTimeGantt` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-topo-wan` — WAN Circuit Topology

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-topo-wan` |
| Widget Name | WAN Circuit Topology |
| Category | Topology |
| Purpose | Reusable topology component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When topology visualization or topology pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `wan` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | topology |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Topology / WAN Circuit Topology` |
| React Component Name | `AdxTopoWan` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-topo-deps` — App Dependency Topology

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-topo-deps` |
| Widget Name | App Dependency Topology |
| Category | Topology |
| Purpose | Reusable topology component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When topology visualization or topology pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `deps` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | topology |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Topology / App Dependency Topology` |
| React Component Name | `AdxTopoDeps` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-topo-service` — Service Dependency Topology

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-topo-service` |
| Widget Name | Service Dependency Topology |
| Category | Topology |
| Purpose | Reusable topology component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When topology visualization or topology pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `service` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | topology |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Topology / Service Dependency Topology` |
| React Component Name | `AdxTopoService` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-topo-vdi` — VDI Broker Topology

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-topo-vdi` |
| Widget Name | VDI Broker Topology |
| Category | Topology |
| Purpose | Reusable topology component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When topology visualization or topology pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `vdi` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | topology |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Topology / VDI Broker Topology` |
| React Component Name | `AdxTopoVdi` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-insight-card` — AI Insight Card

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-insight-card` |
| Widget Name | AI Insight Card |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `insight` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / AI Insight Card` |
| React Component Name | `AdxAiInsightCard` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-insight-feed` — AI Insight Feed

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-insight-feed` |
| Widget Name | AI Insight Feed |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `feed` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / AI Insight Feed` |
| React Component Name | `AdxAiInsightFeed` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-rca-rank` — RCA Hypothesis Rank

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-rca-rank` |
| Widget Name | RCA Hypothesis Rank |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `rca` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / RCA Hypothesis Rank` |
| React Component Name | `AdxAiRcaRank` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-impact-radius` — Impact Radius

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-impact-radius` |
| Widget Name | Impact Radius |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `impact` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Impact Radius` |
| React Component Name | `AdxAiImpactRadius` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-correlation-matrix` — Correlation Matrix

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-correlation-matrix` |
| Widget Name | Correlation Matrix |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `corr` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Correlation Matrix` |
| React Component Name | `AdxAiCorrelationMatrix` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-prediction-band` — Prediction Band Chart

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-prediction-band` |
| Widget Name | Prediction Band Chart |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `forecast` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Prediction Band Chart` |
| React Component Name | `AdxAiPredictionBand` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-recommendation-card` — Recommendation Card

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-recommendation-card` |
| Widget Name | Recommendation Card |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `rec` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Recommendation Card` |
| React Component Name | `AdxAiRecommendationCard` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-copilot-panel` — Copilot Panel

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-copilot-panel` |
| Widget Name | Copilot Panel |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `chat` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Copilot Panel` |
| React Component Name | `AdxAiCopilotPanel` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-prompt-history` — Prompt History

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-prompt-history` |
| Widget Name | Prompt History |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `history` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Prompt History` |
| React Component Name | `AdxAiPromptHistory` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-confidence-pill` — Confidence Pill

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-confidence-pill` |
| Widget Name | Confidence Pill |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `chrome` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Confidence Pill` |
| React Component Name | `AdxAiConfidencePill` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-twin-scenario` — Twin Scenario Card

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-twin-scenario` |
| Widget Name | Twin Scenario Card |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `twin` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Twin Scenario Card` |
| React Component Name | `AdxAiTwinScenario` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-exec-brief` — Executive Brief Block

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-exec-brief` |
| Widget Name | Executive Brief Block |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `exec` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Executive Brief Block` |
| React Component Name | `AdxAiExecBrief` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-suggested-inv` — Suggested Investigations

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-suggested-inv` |
| Widget Name | Suggested Investigations |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `nav` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Suggested Investigations` |
| React Component Name | `AdxAiSuggestedInv` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-evidence-list` — Evidence List

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-evidence-list` |
| Widget Name | Evidence List |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `evidence` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Evidence List` |
| React Component Name | `AdxAiEvidenceList` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-ai-plan-checklist` — Copilot Plan Checklist

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-ai-plan-checklist` |
| Widget Name | Copilot Plan Checklist |
| Category | AI |
| Purpose | Reusable ai component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When ai visualization or ai pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `plan` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | ai |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / AI / Copilot Plan Checklist` |
| React Component Name | `AdxAiPlanChecklist` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-alert-feed` — Alert Feed

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-alert-feed` |
| Widget Name | Alert Feed |
| Category | Alerts |
| Purpose | Reusable alerts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When alert visualization or alerts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `feed` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | alert |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Alerts / Alert Feed` |
| React Component Name | `AdxAlertFeed` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-alert-badge` — Alert Badge

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-alert-badge` |
| Widget Name | Alert Badge |
| Category | Alerts |
| Purpose | Reusable alerts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When alert visualization or alerts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `chrome` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | alert |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Alerts / Alert Badge` |
| React Component Name | `AdxAlertBadge` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-alert-banner` — Incident Banner

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-alert-banner` |
| Widget Name | Incident Banner |
| Category | Alerts |
| Purpose | Reusable alerts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When alert visualization or alerts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `banner` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | alert |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Alerts / Incident Banner` |
| React Component Name | `AdxAlertBanner` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-alert-status-wall` — Status Wall

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-alert-status-wall` |
| Widget Name | Status Wall |
| Category | Alerts |
| Purpose | Reusable alerts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When alert visualization or alerts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `noc` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | alert |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Alerts / Status Wall` |
| React Component Name | `AdxAlertStatusWall` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-alert-severity-chip` — Severity Chip

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-alert-severity-chip` |
| Widget Name | Severity Chip |
| Category | Alerts |
| Purpose | Reusable alerts component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When alert visualization or alerts pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `chrome` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | alert |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Alerts / Severity Chip` |
| React Component Name | `AdxAlertSeverityChip` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-feed-activity` — Activity Feed

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-feed-activity` |
| Widget Name | Activity Feed |
| Category | Feeds |
| Purpose | Reusable feeds component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When feed visualization or feeds pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `activity` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | feed |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Feeds / Activity Feed` |
| React Component Name | `AdxFeedActivity` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-feed-ops` — Ops Event Feed

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-feed-ops` |
| Widget Name | Ops Event Feed |
| Category | Feeds |
| Purpose | Reusable feeds component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When feed visualization or feeds pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `ops` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | feed |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Feeds / Ops Event Feed` |
| React Component Name | `AdxFeedOps` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-feed-automation` — Automation Feed

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-feed-automation` |
| Widget Name | Automation Feed |
| Category | Feeds |
| Purpose | Reusable feeds component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When feed visualization or feeds pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `automation` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | feed |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Feeds / Automation Feed` |
| React Component Name | `AdxFeedAutomation` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-feed-case-comments` — Case Comments Feed

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-feed-case-comments` |
| Widget Name | Case Comments Feed |
| Category | Feeds |
| Purpose | Reusable feeds component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When feed visualization or feeds pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `case` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | feed |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Feeds / Case Comments Feed` |
| React Component Name | `AdxFeedCaseComments` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-input-text` — Text Input

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-input-text` |
| Widget Name | Text Input |
| Category | Inputs |
| Purpose | Reusable inputs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When input visualization or inputs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `form` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | input |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Inputs / Text Input` |
| React Component Name | `AdxInputText` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-input-number` — Number Input

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-input-number` |
| Widget Name | Number Input |
| Category | Inputs |
| Purpose | Reusable inputs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When input visualization or inputs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `form` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | input |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Inputs / Number Input` |
| React Component Name | `AdxInputNumber` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-input-textarea` — Textarea

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-input-textarea` |
| Widget Name | Textarea |
| Category | Inputs |
| Purpose | Reusable inputs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When input visualization or inputs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `form` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | input |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Inputs / Textarea` |
| React Component Name | `AdxInputTextarea` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-input-toggle` — Toggle

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-input-toggle` |
| Widget Name | Toggle |
| Category | Inputs |
| Purpose | Reusable inputs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When input visualization or inputs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `form` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | input |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Inputs / Toggle` |
| React Component Name | `AdxInputToggle` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-input-checkbox` — Checkbox

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-input-checkbox` |
| Widget Name | Checkbox |
| Category | Inputs |
| Purpose | Reusable inputs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When input visualization or inputs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `form` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | input |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Inputs / Checkbox` |
| React Component Name | `AdxInputCheckbox` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-input-radio` — Radio Group

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-input-radio` |
| Widget Name | Radio Group |
| Category | Inputs |
| Purpose | Reusable inputs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When input visualization or inputs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `form` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | input |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Inputs / Radio Group` |
| React Component Name | `AdxInputRadio` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-input-slider` — Range Slider

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-input-slider` |
| Widget Name | Range Slider |
| Category | Inputs |
| Purpose | Reusable inputs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When input visualization or inputs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `form` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | input |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Inputs / Range Slider` |
| React Component Name | `AdxInputSlider` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-input-tag` — Tag Input

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-input-tag` |
| Widget Name | Tag Input |
| Category | Inputs |
| Purpose | Reusable inputs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When input visualization or inputs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `form` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | input |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Inputs / Tag Input` |
| React Component Name | `AdxInputTag` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-form-case-create` — Create Case Form

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-form-case-create` |
| Widget Name | Create Case Form |
| Category | Forms |
| Purpose | Reusable forms component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When form visualization or forms pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `case` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | form |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Forms / Create Case Form` |
| React Component Name | `AdxFormCaseCreate` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-form-incident-update` — Incident Update Form

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-form-incident-update` |
| Widget Name | Incident Update Form |
| Category | Forms |
| Purpose | Reusable forms component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When form visualization or forms pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `incident` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | form |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Forms / Incident Update Form` |
| React Component Name | `AdxFormIncidentUpdate` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-form-automation-approve` — Automation Approve Form

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-form-automation-approve` |
| Widget Name | Automation Approve Form |
| Category | Forms |
| Purpose | Reusable forms component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When form visualization or forms pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `automation` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | form |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Forms / Automation Approve Form` |
| React Component Name | `AdxFormAutomationApprove` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-form-remote-action` — Remote Action Form

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-form-remote-action` |
| Widget Name | Remote Action Form |
| Category | Forms |
| Purpose | Reusable forms component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When form visualization or forms pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `remote` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | form |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Forms / Remote Action Form` |
| React Component Name | `AdxFormRemoteAction` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-form-saved-view` — Save View Form

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-form-saved-view` |
| Widget Name | Save View Form |
| Category | Forms |
| Purpose | Reusable forms component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When form visualization or forms pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `view` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | form |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Forms / Save View Form` |
| React Component Name | `AdxFormSavedView` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-filter-scope` — Scope Selector

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-filter-scope` |
| Widget Name | Scope Selector |
| Category | Filters |
| Purpose | Reusable filters component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When filter visualization or filters pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `global` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | filter |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Filters / Scope Selector` |
| React Component Name | `AdxFilterScope` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-filter-time` — Time Range Picker

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-filter-time` |
| Widget Name | Time Range Picker |
| Category | Filters |
| Purpose | Reusable filters component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When filter visualization or filters pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `global` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | filter |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Filters / Time Range Picker` |
| React Component Name | `AdxFilterTime` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-filter-compare` — Compare Mode

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-filter-compare` |
| Widget Name | Compare Mode |
| Category | Filters |
| Purpose | Reusable filters component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When filter visualization or filters pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `global` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | filter |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Filters / Compare Mode` |
| React Component Name | `AdxFilterCompare` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-filter-chips` — Filter Chip Bar

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-filter-chips` |
| Widget Name | Filter Chip Bar |
| Category | Filters |
| Purpose | Reusable filters component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When filter visualization or filters pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `dashboard` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | filter |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Filters / Filter Chip Bar` |
| React Component Name | `AdxFilterChips` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-filter-facet` — Facet Panel

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-filter-facet` |
| Widget Name | Facet Panel |
| Category | Filters |
| Purpose | Reusable filters component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When filter visualization or filters pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `dashboard` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | filter |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Filters / Facet Panel` |
| React Component Name | `AdxFilterFacet` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-filter-saved` — Saved Filters

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-filter-saved` |
| Widget Name | Saved Filters |
| Category | Filters |
| Purpose | Reusable filters component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When filter visualization or filters pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `dashboard` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | filter |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Filters / Saved Filters` |
| React Component Name | `AdxFilterSaved` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-filter-query` — Query Builder

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-filter-query` |
| Widget Name | Query Builder |
| Category | Filters |
| Purpose | Reusable filters component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When filter visualization or filters pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `advanced` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | filter |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Filters / Query Builder` |
| React Component Name | `AdxFilterQuery` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-filter-entity` — Entity Picker

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-filter-entity` |
| Widget Name | Entity Picker |
| Category | Filters |
| Purpose | Reusable filters component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When filter visualization or filters pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `entity` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | filter |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Filters / Entity Picker` |
| React Component Name | `AdxFilterEntity` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-card-kpi` — KPI Metric Card

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-card-kpi` |
| Widget Name | KPI Metric Card |
| Category | Cards |
| Purpose | Reusable cards component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When card visualization or cards pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `kpi` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | card |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Cards / KPI Metric Card` |
| React Component Name | `AdxCardKpi` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-card-service` — Service Status Card

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-card-service` |
| Widget Name | Service Status Card |
| Category | Cards |
| Purpose | Reusable cards component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When card visualization or cards pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `status` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | card |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Cards / Service Status Card` |
| React Component Name | `AdxCardService` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-card-insight` — Insight Card Shell

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-card-insight` |
| Widget Name | Insight Card Shell |
| Category | Cards |
| Purpose | Reusable cards component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When card visualization or cards pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `ai` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | card |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Cards / Insight Card Shell` |
| React Component Name | `AdxCardInsight` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-card-recommendation` — Recommendation Card Shell

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-card-recommendation` |
| Widget Name | Recommendation Card Shell |
| Category | Cards |
| Purpose | Reusable cards component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When card visualization or cards pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `ai` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | card |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Cards / Recommendation Card Shell` |
| React Component Name | `AdxCardRecommendation` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-card-home` — Home Module Card

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-card-home` |
| Widget Name | Home Module Card |
| Category | Cards |
| Purpose | Reusable cards component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When card visualization or cards pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `home` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | card |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Cards / Home Module Card` |
| React Component Name | `AdxCardHome` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-card-empty` — Empty State Card

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-card-empty` |
| Widget Name | Empty State Card |
| Category | Cards |
| Purpose | Reusable cards component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When card visualization or cards pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `state` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | card |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Cards / Empty State Card` |
| React Component Name | `AdxCardEmpty` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-dialog-confirm` — Confirm Dialog

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-dialog-confirm` |
| Widget Name | Confirm Dialog |
| Category | Dialogs |
| Purpose | Reusable dialogs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When dialog visualization or dialogs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `modal` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | dialog |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Dialogs / Confirm Dialog` |
| React Component Name | `AdxDialogConfirm` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-dialog-share` — Share Dialog

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-dialog-share` |
| Widget Name | Share Dialog |
| Category | Dialogs |
| Purpose | Reusable dialogs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When dialog visualization or dialogs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `modal` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | dialog |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Dialogs / Share Dialog` |
| React Component Name | `AdxDialogShare` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-dialog-export` — Export Dialog

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-dialog-export` |
| Widget Name | Export Dialog |
| Category | Dialogs |
| Purpose | Reusable dialogs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When dialog visualization or dialogs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `modal` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | dialog |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Dialogs / Export Dialog` |
| React Component Name | `AdxDialogExport` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-dialog-invite` — Invite Participant Dialog

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-dialog-invite` |
| Widget Name | Invite Participant Dialog |
| Category | Dialogs |
| Purpose | Reusable dialogs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When dialog visualization or dialogs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `modal` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | dialog |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Dialogs / Invite Participant Dialog` |
| React Component Name | `AdxDialogInvite` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-dialog-command` — Command Palette

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-dialog-command` |
| Widget Name | Command Palette |
| Category | Dialogs |
| Purpose | Reusable dialogs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When dialog visualization or dialogs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `modal` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | dialog |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Dialogs / Command Palette` |
| React Component Name | `AdxDialogCommand` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-panel-context-rail` — Context Rail

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-panel-context-rail` |
| Widget Name | Context Rail |
| Category | Panels |
| Purpose | Reusable panels component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When panel visualization or panels pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `rail` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | panel |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Panels / Context Rail` |
| React Component Name | `AdxPanelContextRail` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-panel-ai-drawer` — AI Assistant Drawer

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-panel-ai-drawer` |
| Widget Name | AI Assistant Drawer |
| Category | Panels |
| Purpose | Reusable panels component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When panel visualization or panels pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `drawer` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | panel |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Panels / AI Assistant Drawer` |
| React Component Name | `AdxPanelAiDrawer` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-panel-filter-drawer` — Filter Drawer

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-panel-filter-drawer` |
| Widget Name | Filter Drawer |
| Category | Panels |
| Purpose | Reusable panels component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When panel visualization or panels pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `drawer` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | panel |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Panels / Filter Drawer` |
| React Component Name | `AdxPanelFilterDrawer` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-panel-detail` — Detail Side Panel

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-panel-detail` |
| Widget Name | Detail Side Panel |
| Category | Panels |
| Purpose | Reusable panels component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When panel visualization or panels pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `panel` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | panel |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Panels / Detail Side Panel` |
| React Component Name | `AdxPanelDetail` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-panel-split` — Split View Container

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-panel-split` |
| Widget Name | Split View Container |
| Category | Panels |
| Purpose | Reusable panels component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When panel visualization or panels pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `layout` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | panel |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Panels / Split View Container` |
| React Component Name | `AdxPanelSplit` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-panel-wall` — NOC Wall Container

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-panel-wall` |
| Widget Name | NOC Wall Container |
| Category | Panels |
| Purpose | Reusable panels component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When panel visualization or panels pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `layout` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | panel |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Panels / NOC Wall Container` |
| React Component Name | `AdxPanelWall` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-graph-knowledge` — Knowledge Graph Viewport

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-graph-knowledge` |
| Widget Name | Knowledge Graph Viewport |
| Category | Graphs |
| Purpose | Reusable graphs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When graph visualization or graphs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `kg` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | graph |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Graphs / Knowledge Graph Viewport` |
| React Component Name | `AdxGraphKnowledge` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-graph-relationship` — Relationship Explorer

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-graph-relationship` |
| Widget Name | Relationship Explorer |
| Category | Graphs |
| Purpose | Reusable graphs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When graph visualization or graphs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `rel` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | graph |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Graphs / Relationship Explorer` |
| React Component Name | `AdxGraphRelationship` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-graph-process` — Process Tree Graph

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-graph-process` |
| Widget Name | Process Tree Graph |
| Category | Graphs |
| Purpose | Reusable graphs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When graph visualization or graphs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `process` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | graph |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Graphs / Process Tree Graph` |
| React Component Name | `AdxGraphProcess` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-graph-correlation` — Correlation Graph

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-graph-correlation` |
| Widget Name | Correlation Graph |
| Category | Graphs |
| Purpose | Reusable graphs component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When graph visualization or graphs pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `corr` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | graph |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Graphs / Correlation Graph` |
| React Component Name | `AdxGraphCorrelation` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-tree-org` — Org Hierarchy Tree

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-tree-org` |
| Widget Name | Org Hierarchy Tree |
| Category | Trees |
| Purpose | Reusable trees component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When tree visualization or trees pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `org` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | tree |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Trees / Org Hierarchy Tree` |
| React Component Name | `AdxTreeOrg` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-tree-nav` — Nested Nav Tree

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-tree-nav` |
| Widget Name | Nested Nav Tree |
| Category | Trees |
| Purpose | Reusable trees component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When tree visualization or trees pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `nav` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | tree |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Trees / Nested Nav Tree` |
| React Component Name | `AdxTreeNav` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-tree-file` — Evidence File Tree

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-tree-file` |
| Widget Name | Evidence File Tree |
| Category | Trees |
| Purpose | Reusable trees component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When tree visualization or trees pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `evidence` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | tree |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Trees / Evidence File Tree` |
| React Component Name | `AdxTreeFile` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-tree-process` — Process Tree List

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-tree-process` |
| Widget Name | Process Tree List |
| Category | Trees |
| Purpose | Reusable trees component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When tree visualization or trees pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `process` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | tree |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Trees / Process Tree List` |
| React Component Name | `AdxTreeProcess` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-bookmark-bar` — Bookmark Bar

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-bookmark-bar` |
| Widget Name | Bookmark Bar |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When shell visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `chrome` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | shell |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Bookmark Bar` |
| React Component Name | `AdxWidgetBookmarkBar` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-recent` — Recent Views

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-recent` |
| Widget Name | Recent Views |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When shell visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `chrome` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | shell |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Recent Views` |
| React Component Name | `AdxWidgetRecent` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-theme` — Theme Toggle

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-theme` |
| Widget Name | Theme Toggle |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When shell visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `chrome` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | shell |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Theme Toggle` |
| React Component Name | `AdxWidgetTheme` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-density` — Density Toggle

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-density` |
| Widget Name | Density Toggle |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When shell visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `chrome` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | shell |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Density Toggle` |
| React Component Name | `AdxWidgetDensity` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-legend` — Chart Legend

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-legend` |
| Widget Name | Chart Legend |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When chrome visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `chart` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | chrome |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Chart Legend` |
| React Component Name | `AdxWidgetLegend` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-threshold` — Threshold Legend

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-threshold` |
| Widget Name | Threshold Legend |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When chrome visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `chart` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | chrome |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Threshold Legend` |
| React Component Name | `AdxWidgetThreshold` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-freshness` — Freshness Indicator

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-freshness` |
| Widget Name | Freshness Indicator |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When chrome visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `meta` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | chrome |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Freshness Indicator` |
| React Component Name | `AdxWidgetFreshness` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-coverage` — Coverage Footnote

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-coverage` |
| Widget Name | Coverage Footnote |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When chrome visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `meta` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | chrome |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Coverage Footnote` |
| React Component Name | `AdxWidgetCoverage` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-model-stamp` — Model Version Stamp

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-model-stamp` |
| Widget Name | Model Version Stamp |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When chrome visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `meta` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | chrome |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Model Version Stamp` |
| React Component Name | `AdxWidgetModelStamp` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-compare-strip` — Compare Entity Strip

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-compare-strip` |
| Widget Name | Compare Entity Strip |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When chrome visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `compare` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | chrome |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Compare Entity Strip` |
| React Component Name | `AdxWidgetCompareStrip` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-pinboard` — Pinned Widgets Board

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-pinboard` |
| Widget Name | Pinned Widgets Board |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When chrome visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `case` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | chrome |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Pinned Widgets Board` |
| React Component Name | `AdxWidgetPinboard` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-widget-keyboard-map` — Keyboard Shortcut Map

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-widget-keyboard-map` |
| Widget Name | Keyboard Shortcut Map |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When chrome visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `a11y` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | chrome |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Keyboard Shortcut Map` |
| React Component Name | `AdxWidgetKeyboardMap` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

### `w-util-149` — Utility Widget 149

| Field | Spec |
|-------|------|
| Unique Widget ID | `w-util-149` |
| Widget Name | Utility Widget 149 |
| Category | Widgets |
| Purpose | Reusable widgets component for AetherDEX surfaces |
| Business Value | Consistent UX/analytics semantics; faster delivery across domains |
| When to Use | When utility visualization or widgets pattern is required |
| When NOT to Use | Do not use when a more specific domain widget already exists for the same metric+layout |
| Required Data | Primary measure/series; `meta.freshness`; `meta.coverage` when metric |
| Optional Data | Compare series, annotations, thresholds, AI evidence refs |
| Metrics | `util` (or bound metric at compose time) |
| Dimensions | Scope dimensions + domain facets |
| Aggregation | Declared by metric catalog; UI must not silently change |
| Threshold Rules | Excellent/Good/Fair/Poor tokens when score/SLO |
| Color Rules | Chart palette + semantic status; never color-only |
| Visualization Type | utility |
| Variants | Compact · Comfortable · Dense; Spark · Full |
| Light Theme | `--adx-*` light tokens |
| Dark Theme | `--adx-*` dark tokens |
| Hover | Tooltip + linked highlight |
| Selection | Cross-filter emit |
| Loading | Skeleton matching geometry |
| Empty | Illustration + guidance |
| Error | Inline error + retry |
| Accessibility | Named region; chart data table toggle; AA contrast |
| Keyboard Support | Tab focus; arrows in lists/tables; Enter select; Esc clear |
| Screen Reader | Live polite for feeds; value+delta announced for KPIs |
| Performance | Virtualize lists >100; decimate series >2k points |
| API Requirements | Summary/timeseries/breakdown or entity query as applicable |
| Caching | 30–120s by volatility; SWR client |
| Real-time Support | Poll 15–60s or SSE when NOC/case |
| Refresh Strategy | On filter change; manual; interval |
| Export Formats | CSV · PNG · PDF (permissioned) |
| SVG Representation | See Session mockups using this pattern |
| Figma Component Name | `ADX / Widgets / Utility Widget 149` |
| React Component Name | `AdxUtil149` |
| CSS Token Mapping | `.adx-widget` + category class |
| Design Token Mapping | color, type, space, radius, elevation, motion |

# Composition Guidance

Domain widgets from Volumes 1B–2D **compose** primitives above (e.g., `w-exec-dex-score` composes `w-kpi-dex` + `w-chart-sparkline` + `w-widget-freshness`).

# Quality Gate

- [x] ≥150 widgets specified  
- [x] Categories complete  
- [x] Naming conventions consistent  
- [x] Tokens / a11y / API / cache / export covered  
- [x] Figma + React names defined  

---

*End of Volume 2E — End of SESSION 2*  
*Do not start Session 3 until stakeholder sign-off.*
