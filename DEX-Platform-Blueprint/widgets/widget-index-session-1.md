# AetherDEX Widget Index — Session 1

**Authority:** Frontend Architecture Lead · Design System Architect  
**Rule:** Volumes reference widget IDs from this index. Do not fork names.

Full per-widget contracts live in the owning volume; this index is the registry.

---

## Executive (`w-exec-*`) — Volume 1B

| Widget ID | Name | Primary metric |
|-----------|------|----------------|
| `w-exec-dex-score` | Digital Experience Index KPI | `m.dex.digital_experience_index` |
| `w-exec-dex-trend` | DEX Trend (30/90d) | `m.dex.digital_experience_index` |
| `w-exec-employees-impacted` | Employees Impacted KPI | `m.dex.employees_impacted` |
| `w-exec-coverage` | Telemetry Coverage KPI | `m.dex.coverage_pct` |
| `w-exec-driver-breakdown` | Experience Driver Breakdown | component scores |
| `w-exec-geo-heatmap` | Regional Experience Heatmap | `m.dex.digital_experience_index` |
| `w-exec-bu-leaderboard` | Business Unit Leaderboard | `m.dex.digital_experience_index` |
| `w-exec-risk-index` | Experience Risk Index KPI | `m.risk.experience_risk_index` |
| `w-exec-hours-lost` | Productivity Hours Lost KPI | `m.risk.productivity_hours_lost` |
| `w-exec-initiative-roi` | Initiative ROI Table | `m.inv.initiative_roi_score` |
| `w-exec-alert-feed` | Executive Alert Feed | `m.alert.active_high_impact` |
| `w-exec-ai-insights` | AI Executive Insights | composite |
| `w-exec-recommendations` | Priority Recommendations | composite |

## Experience (`w-exp-*`) — Volume 1C

| Widget ID | Name | Primary metric |
|-----------|------|----------------|
| `w-exp-overview-score` | Experience Score KPI | `m.dex.digital_experience_index` |
| `w-exp-friction-rate` | Friction Rate KPI | `m.exp.friction_events_per_100` |
| `w-exp-ttp` | Time to Productivity KPI | `m.exp.time_to_productivity_min` |
| `w-exp-collab-quality` | Collaboration Quality KPI | `m.exp.collab_quality_index` |
| `w-exp-location-compare` | Location Type Comparison | DEX by location_type |
| `w-exp-journey-funnel` | Journey Success Funnel | `m.exp.journey_success_rate` |
| `w-exp-journey-table` | Journey Performance Table | journey metrics |
| `w-exp-friction-timeline` | Friction Timeline | friction events |
| `w-exp-sentiment-score` | Sentiment Score KPI | `m.exp.sentiment_nps_proxy` |
| `w-exp-sentiment-themes` | Theme Treemap | themes |
| `w-exp-sentiment-trend` | Sentiment Trend | `m.exp.sentiment_nps_proxy` |
| `w-exp-ai-insights` | Experience AI Insights | composite |
| `w-exp-activity-feed` | Experience Activity Feed | events |

## Endpoint (`w-end-*`) — Volume 1D

| Widget ID | Name | Primary metric |
|-----------|------|----------------|
| `w-end-fleet-score` | Fleet Health Score KPI | `m.end.fleet_health_score` |
| `w-end-boot-p90` | Boot P90 KPI | `m.end.boot_duration_sec` |
| `w-end-login-p90` | Login P90 KPI | `m.end.login_duration_sec` |
| `w-end-crash-rate` | Crash Rate KPI | `m.end.crash_rate` |
| `w-end-compliance` | Compliance Posture KPI | `m.end.compliance_posture_pct` |
| `w-end-os-distribution` | OS Distribution Donut | device counts |
| `w-end-performance-heatmap` | Performance Heatmap | cpu/mem/disk |
| `w-end-stability-trend` | Stability Trend | `m.end.crash_rate` |
| `w-end-device-table` | Device Cohort Table | multi |
| `w-end-lifecycle-scatter` | Age vs Experience Scatter | refresh priority |
| `w-end-battery-disk` | Battery & Disk Risk | battery/disk |
| `w-end-refresh-queue` | Refresh Priority Queue | `m.end.refresh_priority_score` |
| `w-end-ai-insights` | Endpoint AI Insights | composite |

## Application (`w-app-*`) — Volume 1E

| Widget ID | Name | Primary metric |
|-----------|------|----------------|
| `w-app-portfolio-score` | Portfolio Experience KPI | weighted `m.app.experience_score` |
| `w-app-critical-health` | Tier-0 App Health Strip | `m.app.experience_score` |
| `w-app-portfolio-table` | Application Portfolio Table | multi |
| `w-app-adoption` | Adoption vs Experience | `m.app.adoption_pct` |
| `w-app-degradation-feed` | Degradation Alert Feed | alerts |
| `w-app-detail-score` | App Experience Score KPI | `m.app.experience_score` |
| `w-app-launch-trend` | Launch Time Trend | `m.app.launch_time_ms` |
| `w-app-hang-error` | Hang & Error Rates | hang/error |
| `w-app-version-compare` | Version Health Compare | `m.app.version_health_delta` |
| `w-app-dependency-map` | Dependency Map | `m.app.dependency_risk_score` |
| `w-app-geo-perf` | Geo Performance | launch/score by geo |
| `w-app-user-impact` | User Impact Table | employees impacted |
| `w-app-ai-insights` | Application AI Insights | composite |

---

## Shared Chrome Widgets

| Widget ID | Name | Notes |
|-----------|------|-------|
| `w-shell-global-search` | Omnisearch | Global |
| `w-shell-time-range` | Time Range Picker | Global |
| `w-shell-scope` | Scope Selector | Global |
| `w-shell-ai-assistant` | AI Assistant Drawer | Global |
| `w-shell-bookmark-bar` | Bookmarks | Global |

---

## Reuse Rules

1. If two volumes need the same visualization of the same metric, reuse the widget ID or compose a domain-specific wrapper that embeds the shared widget.  
2. AI insight widgets share interaction patterns (`confidence`, `evidence`, `promote-to-investigation`) defined in Volume 1B and inherited.  
3. Table widgets share column density modes: Comfortable / Compact (default Compact for operator views).
