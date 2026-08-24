# Volume 3A — KPI Dictionary

**Product:** AetherDEX  
**Session:** 3  
**Count:** 474 KPIs  
**Builds on:** Session 1–2 metric catalogs (compatible; do not fork names)

---

# Document Control

| Version | Status |
|---------|--------|
| 3.0.0 | Complete |

# Governance

1. IDs use `kpi.{domain}.{name}[.slice…]`; runtime metrics remain `m.{domain}.{name}` where defined in Sessions 1–2.  
2. Dimensional slices (region, BU, app, provider) inherit parent formula/thresholds unless overridden.  
3. Threshold/weight changes require audited profile versions.  
4. Every dashboard KPI must reference an ID in this dictionary.  
5. SQL is logical; physical names in Volume 3B.

# Domain Counts

- **ai:** 27
- **app:** 62
- **dex:** 42
- **end:** 111
- **exp:** 78
- **infra:** 100
- **inv:** 4
- **ops:** 44
- **risk:** 6

---

# KPI Specifications

### `kpi.dex.digital_experience_index` — Digital Experience Index

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index` |
| Business Name | Digital Experience Index |
| Description | Composite 0–100 employee digital experience. |
| Business Purpose | Enterprise north-star experience metric. |
| Formula | 0.3*Endpoint + 0.3*App + 0.2*NetworkCollab + 0.2*Sentiment (tenant weights) |
| Calculation Logic | Employee-weighted mean; coverage-aware |
| SQL Example | `SELECT emp_weighted_avg(dex_score) FROM fact_dex_employee_hourly` |
| Aggregation Rules | Employee-weighted mean |
| Dimensions | region, country, bu, dept, location_type |
| Measures | dex_score |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | Endpoint, App, Network, Sentiment |
| Owner | DEX Lead |
| Dependencies | Component driver KPIs |
| Example Values | 78.4 |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-dex, w-exec-dex-score |
| Related Dashboards | D-EXEC-01, D-EXP-01 |

### `kpi.dex.employees_impacted` — Employees Impacted

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.employees_impacted` |
| Business Name | Employees Impacted |
| Description | Employees with DEX < 70. |
| Business Purpose | Enable decisions using Employees Impacted. |
| Formula | COUNT DISTINCT employee_id WHERE dex < 70 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Warn >3% scope; Crit >8% |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | DEX Lead |
| Dependencies | Parent metric family |
| Example Values | 4286 |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-impacted |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.coverage_pct` — Telemetry Coverage

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.coverage_pct` |
| Business Name | Telemetry Coverage |
| Description | % in-scope employees with computable DEX. |
| Business Purpose | Enable decisions using Telemetry Coverage. |
| Formula | with_dex/in_scope*100 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Warn <85%; Crit <70% |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Analytics Platform |
| Dependencies | Parent metric family |
| Example Values | 92.1% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-coverage |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.endpoint_component` — Endpoint Driver Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.endpoint_component` |
| Business Name | Endpoint Driver Score |
| Description | Governed KPI for Endpoint Driver Score. |
| Business Purpose | Enable decisions using Endpoint Driver Score. |
| Formula | See semantic measure bound to kpi.dex.endpoint_component |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 76.2 |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-driver-breakdown |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.application_component` — Application Driver Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.application_component` |
| Business Name | Application Driver Score |
| Description | Governed KPI for Application Driver Score. |
| Business Purpose | Enable decisions using Application Driver Score. |
| Formula | See semantic measure bound to kpi.dex.application_component |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 74.8 |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-driver-breakdown |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.network_collab_component` — Network/Collab Driver Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.network_collab_component` |
| Business Name | Network/Collab Driver Score |
| Description | Governed KPI for Network/Collab Driver Score. |
| Business Purpose | Enable decisions using Network/Collab Driver Score. |
| Formula | See semantic measure bound to kpi.dex.network_collab_component |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 81.5 |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-driver-breakdown |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.sentiment_component` — Sentiment Driver Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.sentiment_component` |
| Business Name | Sentiment Driver Score |
| Description | Governed KPI for Sentiment Driver Score. |
| Business Purpose | Enable decisions using Sentiment Driver Score. |
| Formula | See semantic measure bound to kpi.dex.sentiment_component |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 79.1 |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-driver-breakdown |
| Related Dashboards | D-EXEC-01 |

### `kpi.exp.journey_success_rate` — Journey Success Rate

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success_rate` |
| Business Name | Journey Success Rate |
| Description | Governed KPI for Journey Success Rate. |
| Business Purpose | Enable decisions using Journey Success Rate. |
| Formula | successful/started*100 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Good ≥92%; Fair ≥85%; Poor <85% |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | DEX Lead |
| Dependencies | Parent metric family |
| Example Values | 91.4% |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.friction_per_100` — Friction Events / 100 Employees

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.friction_per_100` |
| Business Name | Friction Events / 100 Employees |
| Description | Governed KPI for Friction Events / 100 Employees. |
| Business Purpose | Enable decisions using Friction Events / 100 Employees. |
| Formula | friction_events/employees*100 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 14.2 |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-friction-rate |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.time_to_productivity_min` — Time to Productivity (min)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.time_to_productivity_min` |
| Business Name | Time to Productivity (min) |
| Description | Governed KPI for Time to Productivity (min). |
| Business Purpose | Enable decisions using Time to Productivity (min). |
| Formula | percentile(ttp_min) |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 default; P50/P95 selectable |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | P90 Good ≤12; Fair ≤20; Poor >20 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 11.4 |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-ttp |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab_quality_index` — Collaboration Quality Index

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab_quality_index` |
| Business Name | Collaboration Quality Index |
| Description | Governed KPI for Collaboration Quality Index. |
| Business Purpose | Enable decisions using Collaboration Quality Index. |
| Formula | 0.25*join+0.30*audio+0.25*video+0.20*share |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 81.5 |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-collab-quality |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.sentiment_score` — Experience Sentiment Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.sentiment_score` |
| Business Name | Experience Sentiment Score |
| Description | Governed KPI for Experience Sentiment Score. |
| Business Purpose | Enable decisions using Experience Sentiment Score. |
| Formula | See semantic measure bound to kpi.exp.sentiment_score |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | HR Digital / DEX |
| Dependencies | Parent metric family |
| Example Values | 79.1 |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-sentiment-score |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.sentiment_participation_pct` — Pulse Participation

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.sentiment_participation_pct` |
| Business Name | Pulse Participation |
| Description | Governed KPI for Pulse Participation. |
| Business Purpose | Enable decisions using Pulse Participation. |
| Formula | responded/eligible*100 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Warn <30%; Crit <15% |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 38% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.journey_success.morning_login` — Journey Success — Morning Login

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.morning_login` |
| Business Name | Journey Success — Morning Login |
| Description | Governed KPI for Journey Success — Morning Login. |
| Business Purpose | Enable decisions using Journey Success — Morning Login. |
| Formula | See semantic measure bound to kpi.exp.journey_success.morning_login |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success_rate |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.join_meeting` — Journey Success — Join Meeting

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.join_meeting` |
| Business Name | Journey Success — Join Meeting |
| Description | Governed KPI for Journey Success — Join Meeting. |
| Business Purpose | Enable decisions using Journey Success — Join Meeting. |
| Formula | See semantic measure bound to kpi.exp.journey_success.join_meeting |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success_rate |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.access_vpn` — Journey Success — Access Vpn

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.access_vpn` |
| Business Name | Journey Success — Access Vpn |
| Description | Governed KPI for Journey Success — Access Vpn. |
| Business Purpose | Enable decisions using Journey Success — Access Vpn. |
| Formula | See semantic measure bound to kpi.exp.journey_success.access_vpn |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success_rate |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.open_crm` — Journey Success — Open Crm

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.open_crm` |
| Business Name | Journey Success — Open Crm |
| Description | Governed KPI for Journey Success — Open Crm. |
| Business Purpose | Enable decisions using Journey Success — Open Crm. |
| Formula | See semantic measure bound to kpi.exp.journey_success.open_crm |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success_rate |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.file_sync` — Journey Success — File Sync

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.file_sync` |
| Business Name | Journey Success — File Sync |
| Description | Governed KPI for Journey Success — File Sync. |
| Business Purpose | Enable decisions using Journey Success — File Sync. |
| Formula | See semantic measure bound to kpi.exp.journey_success.file_sync |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success_rate |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.onboarding` — Journey Success — Onboarding

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.onboarding` |
| Business Name | Journey Success — Onboarding |
| Description | Governed KPI for Journey Success — Onboarding. |
| Business Purpose | Enable decisions using Journey Success — Onboarding. |
| Formula | See semantic measure bound to kpi.exp.journey_success.onboarding |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success_rate |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.collab.join` — Collab Subscore — Join

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.join` |
| Business Name | Collab Subscore — Join |
| Description | Governed KPI for Collab Subscore — Join. |
| Business Purpose | Enable decisions using Collab Subscore — Join. |
| Formula | See semantic measure bound to kpi.exp.collab.join |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab.audio` — Collab Subscore — Audio

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.audio` |
| Business Name | Collab Subscore — Audio |
| Description | Governed KPI for Collab Subscore — Audio. |
| Business Purpose | Enable decisions using Collab Subscore — Audio. |
| Formula | See semantic measure bound to kpi.exp.collab.audio |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab.video` — Collab Subscore — Video

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.video` |
| Business Name | Collab Subscore — Video |
| Description | Governed KPI for Collab Subscore — Video. |
| Business Purpose | Enable decisions using Collab Subscore — Video. |
| Formula | See semantic measure bound to kpi.exp.collab.video |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab.share` — Collab Subscore — Share

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.share` |
| Business Name | Collab Subscore — Share |
| Description | Governed KPI for Collab Subscore — Share. |
| Business Purpose | Enable decisions using Collab Subscore — Share. |
| Formula | See semantic measure bound to kpi.exp.collab.share |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.theme_volume.vpn` — Sentiment Theme Volume — vpn

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.vpn` |
| Business Name | Sentiment Theme Volume — vpn |
| Description | Governed KPI for Sentiment Theme Volume — vpn. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — vpn. |
| Formula | See semantic measure bound to kpi.exp.theme_volume.vpn |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | Treemap |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.boot` — Sentiment Theme Volume — boot

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.boot` |
| Business Name | Sentiment Theme Volume — boot |
| Description | Governed KPI for Sentiment Theme Volume — boot. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — boot. |
| Formula | See semantic measure bound to kpi.exp.theme_volume.boot |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | Treemap |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.crm` — Sentiment Theme Volume — crm

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.crm` |
| Business Name | Sentiment Theme Volume — crm |
| Description | Governed KPI for Sentiment Theme Volume — crm. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — crm. |
| Formula | See semantic measure bound to kpi.exp.theme_volume.crm |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | Treemap |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.meetings` — Sentiment Theme Volume — meetings

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.meetings` |
| Business Name | Sentiment Theme Volume — meetings |
| Description | Governed KPI for Sentiment Theme Volume — meetings. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — meetings. |
| Formula | See semantic measure bound to kpi.exp.theme_volume.meetings |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | Treemap |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.laptop_age` — Sentiment Theme Volume — laptop_age

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.laptop_age` |
| Business Name | Sentiment Theme Volume — laptop_age |
| Description | Governed KPI for Sentiment Theme Volume — laptop_age. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — laptop_age. |
| Formula | See semantic measure bound to kpi.exp.theme_volume.laptop_age |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | Treemap |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.wifi` — Sentiment Theme Volume — wifi

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.wifi` |
| Business Name | Sentiment Theme Volume — wifi |
| Description | Governed KPI for Sentiment Theme Volume — wifi. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — wifi. |
| Formula | See semantic measure bound to kpi.exp.theme_volume.wifi |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | Treemap |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.idp` — Sentiment Theme Volume — idp

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.idp` |
| Business Name | Sentiment Theme Volume — idp |
| Description | Governed KPI for Sentiment Theme Volume — idp. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — idp. |
| Formula | See semantic measure bound to kpi.exp.theme_volume.idp |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | Treemap |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.email` — Sentiment Theme Volume — email

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.email` |
| Business Name | Sentiment Theme Volume — email |
| Description | Governed KPI for Sentiment Theme Volume — email. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — email. |
| Formula | See semantic measure bound to kpi.exp.theme_volume.email |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | Treemap |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.network` — Sentiment Theme Volume — network

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.network` |
| Business Name | Sentiment Theme Volume — network |
| Description | Governed KPI for Sentiment Theme Volume — network. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — network. |
| Formula | See semantic measure bound to kpi.exp.theme_volume.network |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | Treemap |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.vdi` — Sentiment Theme Volume — vdi

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.vdi` |
| Business Name | Sentiment Theme Volume — vdi |
| Description | Governed KPI for Sentiment Theme Volume — vdi. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — vdi. |
| Formula | See semantic measure bound to kpi.exp.theme_volume.vdi |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | Treemap |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.end.fleet_health_score` — Fleet Health Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score` |
| Business Name | Fleet Health Score |
| Description | Governed KPI for Fleet Health Score. |
| Business Purpose | Enable decisions using Fleet Health Score. |
| Formula | 0.35*stability+0.30*perf+0.20*compliance+0.15*hw_risk |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Endpoint Engineering |
| Dependencies | Parent metric family |
| Example Values | 81.6 |
| Visualization Mapping | KPI card |
| Related Widgets | w-end-fleet-score |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_duration_sec` — Boot Duration (sec)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec` |
| Business Name | Boot Duration (sec) |
| Description | Governed KPI for Boot Duration (sec). |
| Business Purpose | Enable decisions using Boot Duration (sec). |
| Formula | See semantic measure bound to kpi.end.boot_duration_sec |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 default |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | P90 Good ≤45; Fair ≤90; Poor >90 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 52 |
| Visualization Mapping | KPI card |
| Related Widgets | w-end-boot-p90 |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec` — Login Duration (sec)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec` |
| Business Name | Login Duration (sec) |
| Description | Governed KPI for Login Duration (sec). |
| Business Purpose | Enable decisions using Login Duration (sec). |
| Formula | See semantic measure bound to kpi.end.login_duration_sec |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 default |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | P90 Good ≤20; Fair ≤45; Poor >45 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 24 |
| Visualization Mapping | KPI card |
| Related Widgets | w-end-login-p90 |
| Related Dashboards | D-END-01 |

### `kpi.end.crash_rate` — Crash Rate

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.crash_rate` |
| Business Name | Crash Rate |
| Description | Governed KPI for Crash Rate. |
| Business Purpose | Enable decisions using Crash Rate. |
| Formula | crashes/device_hours*100 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 0.42 |
| Visualization Mapping | KPI card |
| Related Widgets | w-end-crash-rate |
| Related Dashboards | D-END-02 |

### `kpi.end.hang_rate` — Hang Rate

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.hang_rate` |
| Business Name | Hang Rate |
| Description | Governed KPI for Hang Rate. |
| Business Purpose | Enable decisions using Hang Rate. |
| Formula | hangs/active_hours*100 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 1.8 |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-02 |

### `kpi.end.cpu_saturation_pct` — CPU Saturation %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.cpu_saturation_pct` |
| Business Name | CPU Saturation % |
| Description | Governed KPI for CPU Saturation %. |
| Business Purpose | Enable decisions using CPU Saturation %. |
| Formula | See semantic measure bound to kpi.end.cpu_saturation_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 9.4% |
| Visualization Mapping | KPI card |
| Related Widgets | w-end-performance-heatmap |
| Related Dashboards | D-END-01 |

### `kpi.end.memory_pressure_pct` — Memory Pressure %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.memory_pressure_pct` |
| Business Name | Memory Pressure % |
| Description | Governed KPI for Memory Pressure %. |
| Business Purpose | Enable decisions using Memory Pressure %. |
| Formula | See semantic measure bound to kpi.end.memory_pressure_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 6.1% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-02 |

### `kpi.end.disk_health_score` — Disk Health Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.disk_health_score` |
| Business Name | Disk Health Score |
| Description | Governed KPI for Disk Health Score. |
| Business Purpose | Enable decisions using Disk Health Score. |
| Formula | See semantic measure bound to kpi.end.disk_health_score |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-end-battery-disk |
| Related Dashboards | D-END-03 |

### `kpi.end.battery_health_pct` — Battery Health %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.battery_health_pct` |
| Business Name | Battery Health % |
| Description | Governed KPI for Battery Health %. |
| Business Purpose | Enable decisions using Battery Health %. |
| Formula | See semantic measure bound to kpi.end.battery_health_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Good ≥80; Fair ≥60; Poor <60 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 86% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-03 |

### `kpi.end.compliance_posture_pct` — Compliance Posture %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance_posture_pct` |
| Business Name | Compliance Posture % |
| Description | Governed KPI for Compliance Posture %. |
| Business Purpose | Enable decisions using Compliance Posture %. |
| Formula | See semantic measure bound to kpi.end.compliance_posture_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Good ≥95; Fair ≥90; Poor <90 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 15 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 94.3% |
| Visualization Mapping | KPI card |
| Related Widgets | w-end-compliance |
| Related Dashboards | D-END-01 |

### `kpi.end.refresh_priority_score` — Refresh Priority Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.refresh_priority_score` |
| Business Name | Refresh Priority Score |
| Description | Governed KPI for Refresh Priority Score. |
| Business Purpose | Enable decisions using Refresh Priority Score. |
| Formula | See semantic measure bound to kpi.end.refresh_priority_score |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | Scatter + queue |
| Related Widgets | w-end-refresh-queue |
| Related Dashboards | D-END-03 |

### `kpi.end.boot_duration_sec.p50` — Boot Duration (P50)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec.p50` |
| Business Name | Boot Duration (P50) |
| Description | Governed KPI for Boot Duration (P50). |
| Business Purpose | Enable decisions using Boot Duration (P50). |
| Formula | See semantic measure bound to kpi.end.boot_duration_sec.p50 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P50 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec.p50` — Login Duration (P50)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec.p50` |
| Business Name | Login Duration (P50) |
| Description | Governed KPI for Login Duration (P50). |
| Business Purpose | Enable decisions using Login Duration (P50). |
| Formula | See semantic measure bound to kpi.end.login_duration_sec.p50 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P50 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.login_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_duration_sec.p90` — Boot Duration (P90)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec.p90` |
| Business Name | Boot Duration (P90) |
| Description | Governed KPI for Boot Duration (P90). |
| Business Purpose | Enable decisions using Boot Duration (P90). |
| Formula | See semantic measure bound to kpi.end.boot_duration_sec.p90 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec.p90` — Login Duration (P90)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec.p90` |
| Business Name | Login Duration (P90) |
| Description | Governed KPI for Login Duration (P90). |
| Business Purpose | Enable decisions using Login Duration (P90). |
| Formula | See semantic measure bound to kpi.end.login_duration_sec.p90 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.login_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_duration_sec.p95` — Boot Duration (P95)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec.p95` |
| Business Name | Boot Duration (P95) |
| Description | Governed KPI for Boot Duration (P95). |
| Business Purpose | Enable decisions using Boot Duration (P95). |
| Formula | See semantic measure bound to kpi.end.boot_duration_sec.p95 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P95 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec.p95` — Login Duration (P95)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec.p95` |
| Business Name | Login Duration (P95) |
| Description | Governed KPI for Login Duration (P95). |
| Business Purpose | Enable decisions using Login Duration (P95). |
| Formula | See semantic measure bound to kpi.end.login_duration_sec.p95 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P95 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.login_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.windows11` — Fleet Health — windows11

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.windows11` |
| Business Name | Fleet Health — windows11 |
| Description | Governed KPI for Fleet Health — windows11. |
| Business Purpose | Enable decisions using Fleet Health — windows11. |
| Formula | See semantic measure bound to kpi.end.fleet_health_score.windows11 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.windows10` — Fleet Health — windows10

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.windows10` |
| Business Name | Fleet Health — windows10 |
| Description | Governed KPI for Fleet Health — windows10. |
| Business Purpose | Enable decisions using Fleet Health — windows10. |
| Formula | See semantic measure bound to kpi.end.fleet_health_score.windows10 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.macos` — Fleet Health — macos

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.macos` |
| Business Name | Fleet Health — macos |
| Description | Governed KPI for Fleet Health — macos. |
| Business Purpose | Enable decisions using Fleet Health — macos. |
| Formula | See semantic measure bound to kpi.end.fleet_health_score.macos |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.linux` — Fleet Health — linux

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.linux` |
| Business Name | Fleet Health — linux |
| Description | Governed KPI for Fleet Health — linux. |
| Business Purpose | Enable decisions using Fleet Health — linux. |
| Formula | See semantic measure bound to kpi.end.fleet_health_score.linux |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.encryption_pct` — Compliance — encryption

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.encryption_pct` |
| Business Name | Compliance — encryption |
| Description | Governed KPI for Compliance — encryption. |
| Business Purpose | Enable decisions using Compliance — encryption. |
| Formula | See semantic measure bound to kpi.end.compliance.encryption_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance_posture_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.patch_pct` — Compliance — patch

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.patch_pct` |
| Business Name | Compliance — patch |
| Description | Governed KPI for Compliance — patch. |
| Business Purpose | Enable decisions using Compliance — patch. |
| Formula | See semantic measure bound to kpi.end.compliance.patch_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance_posture_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.av_pct` — Compliance — av

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.av_pct` |
| Business Name | Compliance — av |
| Description | Governed KPI for Compliance — av. |
| Business Purpose | Enable decisions using Compliance — av. |
| Formula | See semantic measure bound to kpi.end.compliance.av_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance_posture_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.edr_pct` — Compliance — edr

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.edr_pct` |
| Business Name | Compliance — edr |
| Description | Governed KPI for Compliance — edr. |
| Business Purpose | Enable decisions using Compliance — edr. |
| Formula | See semantic measure bound to kpi.end.compliance.edr_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance_posture_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.firewall_pct` — Compliance — firewall

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.firewall_pct` |
| Business Name | Compliance — firewall |
| Description | Governed KPI for Compliance — firewall. |
| Business Purpose | Enable decisions using Compliance — firewall. |
| Formula | See semantic measure bound to kpi.end.compliance.firewall_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance_posture_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.secure_boot_pct` — Compliance — secure boot

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.secure_boot_pct` |
| Business Name | Compliance — secure boot |
| Description | Governed KPI for Compliance — secure boot. |
| Business Purpose | Enable decisions using Compliance — secure boot. |
| Formula | See semantic measure bound to kpi.end.compliance.secure_boot_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance_posture_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.disk_encryption_pct` — Compliance — disk encryption

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.disk_encryption_pct` |
| Business Name | Compliance — disk encryption |
| Description | Governed KPI for Compliance — disk encryption. |
| Business Purpose | Enable decisions using Compliance — disk encryption. |
| Formula | See semantic measure bound to kpi.end.compliance.disk_encryption_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance_posture_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.mdm_enrolled_pct` — Compliance — mdm enrolled

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.mdm_enrolled_pct` |
| Business Name | Compliance — mdm enrolled |
| Description | Governed KPI for Compliance — mdm enrolled. |
| Business Purpose | Enable decisions using Compliance — mdm enrolled. |
| Formula | See semantic measure bound to kpi.end.compliance.mdm_enrolled_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance_posture_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_p90.latitude` — Boot P90 — latitude

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.latitude` |
| Business Name | Boot P90 — latitude |
| Description | Governed KPI for Boot P90 — latitude. |
| Business Purpose | Enable decisions using Boot P90 — latitude. |
| Formula | See semantic measure bound to kpi.end.boot_p90.latitude |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.elitebook` — Boot P90 — elitebook

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.elitebook` |
| Business Name | Boot P90 — elitebook |
| Description | Governed KPI for Boot P90 — elitebook. |
| Business Purpose | Enable decisions using Boot P90 — elitebook. |
| Formula | See semantic measure bound to kpi.end.boot_p90.elitebook |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.macbook_pro` — Boot P90 — macbook_pro

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.macbook_pro` |
| Business Name | Boot P90 — macbook_pro |
| Description | Governed KPI for Boot P90 — macbook_pro. |
| Business Purpose | Enable decisions using Boot P90 — macbook_pro. |
| Formula | See semantic measure bound to kpi.end.boot_p90.macbook_pro |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.surface` — Boot P90 — surface

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.surface` |
| Business Name | Boot P90 — surface |
| Description | Governed KPI for Boot P90 — surface. |
| Business Purpose | Enable decisions using Boot P90 — surface. |
| Formula | See semantic measure bound to kpi.end.boot_p90.surface |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.thinkpad` — Boot P90 — thinkpad

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.thinkpad` |
| Business Name | Boot P90 — thinkpad |
| Description | Governed KPI for Boot P90 — thinkpad. |
| Business Purpose | Enable decisions using Boot P90 — thinkpad. |
| Formula | See semantic measure bound to kpi.end.boot_p90.thinkpad |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.virtual` — Boot P90 — virtual

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.virtual` |
| Business Name | Boot P90 — virtual |
| Description | Governed KPI for Boot P90 — virtual. |
| Business Purpose | Enable decisions using Boot P90 — virtual. |
| Formula | See semantic measure bound to kpi.end.boot_p90.virtual |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.xps` — Boot P90 — xps

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.xps` |
| Business Name | Boot P90 — xps |
| Description | Governed KPI for Boot P90 — xps. |
| Business Purpose | Enable decisions using Boot P90 — xps. |
| Formula | See semantic measure bound to kpi.end.boot_p90.xps |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.framework` — Boot P90 — framework

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.framework` |
| Business Name | Boot P90 — framework |
| Description | Governed KPI for Boot P90 — framework. |
| Business Purpose | Enable decisions using Boot P90 — framework. |
| Formula | See semantic measure bound to kpi.end.boot_p90.framework |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.app.experience_score` — Application Experience Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score` |
| Business Name | Application Experience Score |
| Description | Governed KPI for Application Experience Score. |
| Business Purpose | Enable decisions using Application Experience Score. |
| Formula | See semantic measure bound to kpi.app.experience_score |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | App Experience Owner |
| Dependencies | Parent metric family |
| Example Values | 67.2 |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-detail-score,w-app-portfolio-score |
| Related Dashboards | D-APP-01,D-APP-02 |

### `kpi.app.launch_time_ms` — App Launch Time (ms)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms` |
| Business Name | App Launch Time (ms) |
| Description | Governed KPI for App Launch Time (ms). |
| Business Purpose | Enable decisions using App Launch Time (ms). |
| Formula | See semantic measure bound to kpi.app.launch_time_ms |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 default |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 4820 |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-launch-trend |
| Related Dashboards | D-APP-02 |

### `kpi.app.hang_rate` — App Hang Rate

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.hang_rate` |
| Business Name | App Hang Rate |
| Description | Governed KPI for App Hang Rate. |
| Business Purpose | Enable decisions using App Hang Rate. |
| Formula | See semantic measure bound to kpi.app.hang_rate |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 3.6 |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-hang-error |
| Related Dashboards | D-APP-02 |

### `kpi.app.error_rate_pct` — Client Error Rate %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.error_rate_pct` |
| Business Name | Client Error Rate % |
| Description | Governed KPI for Client Error Rate %. |
| Business Purpose | Enable decisions using Client Error Rate %. |
| Formula | See semantic measure bound to kpi.app.error_rate_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 2.8% |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-hang-error |
| Related Dashboards | D-APP-02 |

### `kpi.app.adoption_pct` — Adoption %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.adoption_pct` |
| Business Name | Adoption % |
| Description | Governed KPI for Adoption %. |
| Business Purpose | Enable decisions using Adoption %. |
| Formula | See semantic measure bound to kpi.app.adoption_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 91% |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-adoption |
| Related Dashboards | D-APP-01 |

### `kpi.app.version_health_delta` — Version Health Delta

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.version_health_delta` |
| Business Name | Version Health Delta |
| Description | Governed KPI for Version Health Delta. |
| Business Purpose | Enable decisions using Version Health Delta. |
| Formula | See semantic measure bound to kpi.app.version_health_delta |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | -3.4 |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-version-compare |
| Related Dashboards | D-APP-02 |

### `kpi.app.dependency_risk_score` — Dependency Risk Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.dependency_risk_score` |
| Business Name | Dependency Risk Score |
| Description | Governed KPI for Dependency Risk Score. |
| Business Purpose | Enable decisions using Dependency Risk Score. |
| Formula | See semantic measure bound to kpi.app.dependency_risk_score |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Higher=worse; Warn >60; Crit >70 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 71 |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-dependency-map |
| Related Dashboards | D-APP-02 |

### `kpi.app.launch_time_ms.p50` — App Launch Time (P50)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms.p50` |
| Business Name | App Launch Time (P50) |
| Description | Governed KPI for App Launch Time (P50). |
| Business Purpose | Enable decisions using App Launch Time (P50). |
| Formula | See semantic measure bound to kpi.app.launch_time_ms.p50 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.launch_time_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.launch_time_ms.p90` — App Launch Time (P90)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms.p90` |
| Business Name | App Launch Time (P90) |
| Description | Governed KPI for App Launch Time (P90). |
| Business Purpose | Enable decisions using App Launch Time (P90). |
| Formula | See semantic measure bound to kpi.app.launch_time_ms.p90 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.launch_time_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.launch_time_ms.p95` — App Launch Time (P95)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms.p95` |
| Business Name | App Launch Time (P95) |
| Description | Governed KPI for App Launch Time (P95). |
| Business Purpose | Enable decisions using App Launch Time (P95). |
| Formula | See semantic measure bound to kpi.app.launch_time_ms.p95 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.launch_time_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.portfolio_score.tier0` — Portfolio Experience — tier0

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.portfolio_score.tier0` |
| Business Name | Portfolio Experience — tier0 |
| Description | Governed KPI for Portfolio Experience — tier0. |
| Business Purpose | Enable decisions using Portfolio Experience — tier0. |
| Formula | See semantic measure bound to kpi.app.portfolio_score.tier0 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-01 |

### `kpi.app.portfolio_score.tier1` — Portfolio Experience — tier1

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.portfolio_score.tier1` |
| Business Name | Portfolio Experience — tier1 |
| Description | Governed KPI for Portfolio Experience — tier1. |
| Business Purpose | Enable decisions using Portfolio Experience — tier1. |
| Formula | See semantic measure bound to kpi.app.portfolio_score.tier1 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-01 |

### `kpi.app.portfolio_score.tier2` — Portfolio Experience — tier2

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.portfolio_score.tier2` |
| Business Name | Portfolio Experience — tier2 |
| Description | Governed KPI for Portfolio Experience — tier2. |
| Business Purpose | Enable decisions using Portfolio Experience — tier2. |
| Formula | See semantic measure bound to kpi.app.portfolio_score.tier2 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-01 |

### `kpi.app.portfolio_score.tier3` — Portfolio Experience — tier3

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.portfolio_score.tier3` |
| Business Name | Portfolio Experience — tier3 |
| Description | Governed KPI for Portfolio Experience — tier3. |
| Business Purpose | Enable decisions using Portfolio Experience — tier3. |
| Formula | See semantic measure bound to kpi.app.portfolio_score.tier3 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.crm` — App Experience — crm

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.crm` |
| Business Name | App Experience — crm |
| Description | Governed KPI for App Experience — crm. |
| Business Purpose | Enable decisions using App Experience — crm. |
| Formula | See semantic measure bound to kpi.app.experience_score.crm |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.collab` — App Experience — collab

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.collab` |
| Business Name | App Experience — collab |
| Description | Governed KPI for App Experience — collab. |
| Business Purpose | Enable decisions using App Experience — collab. |
| Formula | See semantic measure bound to kpi.app.experience_score.collab |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.email` — App Experience — email

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.email` |
| Business Name | App Experience — email |
| Description | Governed KPI for App Experience — email. |
| Business Purpose | Enable decisions using App Experience — email. |
| Formula | See semantic measure bound to kpi.app.experience_score.email |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.idp` — App Experience — idp

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.idp` |
| Business Name | App Experience — idp |
| Description | Governed KPI for App Experience — idp. |
| Business Purpose | Enable decisions using App Experience — idp. |
| Formula | See semantic measure bound to kpi.app.experience_score.idp |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.vpn_client` — App Experience — vpn_client

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.vpn_client` |
| Business Name | App Experience — vpn_client |
| Description | Governed KPI for App Experience — vpn_client. |
| Business Purpose | Enable decisions using App Experience — vpn_client. |
| Formula | See semantic measure bound to kpi.app.experience_score.vpn_client |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.erp` — App Experience — erp

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.erp` |
| Business Name | App Experience — erp |
| Description | Governed KPI for App Experience — erp. |
| Business Purpose | Enable decisions using App Experience — erp. |
| Formula | See semantic measure bound to kpi.app.experience_score.erp |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.docs` — App Experience — docs

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.docs` |
| Business Name | App Experience — docs |
| Description | Governed KPI for App Experience — docs. |
| Business Purpose | Enable decisions using App Experience — docs. |
| Formula | See semantic measure bound to kpi.app.experience_score.docs |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.chat` — App Experience — chat

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.chat` |
| Business Name | App Experience — chat |
| Description | Governed KPI for App Experience — chat. |
| Business Purpose | Enable decisions using App Experience — chat. |
| Formula | See semantic measure bound to kpi.app.experience_score.chat |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.expense` — App Experience — expense

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.expense` |
| Business Name | App Experience — expense |
| Description | Governed KPI for App Experience — expense. |
| Business Purpose | Enable decisions using App Experience — expense. |
| Formula | See semantic measure bound to kpi.app.experience_score.expense |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.hris` — App Experience — hris

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.hris` |
| Business Name | App Experience — hris |
| Description | Governed KPI for App Experience — hris. |
| Business Purpose | Enable decisions using App Experience — hris. |
| Formula | See semantic measure bound to kpi.app.experience_score.hris |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.itportal` — App Experience — itportal

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.itportal` |
| Business Name | App Experience — itportal |
| Description | Governed KPI for App Experience — itportal. |
| Business Purpose | Enable decisions using App Experience — itportal. |
| Formula | See semantic measure bound to kpi.app.experience_score.itportal |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.design_tool` — App Experience — design_tool

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.design_tool` |
| Business Name | App Experience — design_tool |
| Description | Governed KPI for App Experience — design_tool. |
| Business Purpose | Enable decisions using App Experience — design_tool. |
| Formula | See semantic measure bound to kpi.app.experience_score.design_tool |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.risk.experience_risk_index` — Experience Risk Index

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.risk.experience_risk_index` |
| Business Name | Experience Risk Index |
| Description | Governed KPI for Experience Risk Index. |
| Business Purpose | Enable decisions using Experience Risk Index. |
| Formula | See semantic measure bound to kpi.risk.experience_risk_index |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Low <30; Mod <50; High <70; Crit ≥70 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | CDO Office |
| Dependencies | Parent metric family |
| Example Values | 34 |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-risk-index |
| Related Dashboards | D-EXEC-02 |

### `kpi.risk.productivity_hours_lost` — Productivity Hours Lost

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.risk.productivity_hours_lost` |
| Business Name | Productivity Hours Lost |
| Description | Governed KPI for Productivity Hours Lost. |
| Business Purpose | Enable decisions using Productivity Hours Lost. |
| Formula | modeled friction_minutes/60 (model-version stamped) |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 12480 |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-hours-lost |
| Related Dashboards | D-EXEC-02 |

### `kpi.risk.initiative_roi_score` — Initiative ROI Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.risk.initiative_roi_score` |
| Business Name | Initiative ROI Score |
| Description | Governed KPI for Initiative ROI Score. |
| Business Purpose | Enable decisions using Initiative ROI Score. |
| Formula | See semantic measure bound to kpi.risk.initiative_roi_score |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 86 |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-initiative-roi |
| Related Dashboards | D-EXEC-02 |

### `kpi.infra.network_quality_index` — Network Quality Index

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.network_quality_index` |
| Business Name | Network Quality Index |
| Description | Governed KPI for Network Quality Index. |
| Business Purpose | Enable decisions using Network Quality Index. |
| Formula | See semantic measure bound to kpi.infra.network_quality_index |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Network Engineering |
| Dependencies | Parent metric family |
| Example Values | 82.4 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-net-quality |
| Related Dashboards | infra.network |

### `kpi.infra.latency_ms` — Network Latency (ms)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.latency_ms` |
| Business Name | Network Latency (ms) |
| Description | Governed KPI for Network Latency (ms). |
| Business Purpose | Enable decisions using Network Latency (ms). |
| Formula | See semantic measure bound to kpi.infra.latency_ms |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 default |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 38 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-latency |
| Related Dashboards | infra.network |

### `kpi.infra.packet_loss_pct` — Packet Loss %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.packet_loss_pct` |
| Business Name | Packet Loss % |
| Description | Governed KPI for Packet Loss %. |
| Business Purpose | Enable decisions using Packet Loss %. |
| Formula | See semantic measure bound to kpi.infra.packet_loss_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Good <0.1; Fair <0.5; Poor ≥0.5 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 0.12% |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-loss |
| Related Dashboards | infra.network |

### `kpi.infra.jitter_ms` — Jitter (ms)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.jitter_ms` |
| Business Name | Jitter (ms) |
| Description | Governed KPI for Jitter (ms). |
| Business Purpose | Enable decisions using Jitter (ms). |
| Formula | See semantic measure bound to kpi.infra.jitter_ms |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 6 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-jitter |
| Related Dashboards | infra.network |

### `kpi.infra.vpn_success_pct` — VPN Connect Success %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vpn_success_pct` |
| Business Name | VPN Connect Success % |
| Description | Governed KPI for VPN Connect Success %. |
| Business Purpose | Enable decisions using VPN Connect Success %. |
| Formula | See semantic measure bound to kpi.infra.vpn_success_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Good ≥97; Fair ≥94; Poor <94 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 97.8% |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-vpn-success |
| Related Dashboards | infra.vpn |

### `kpi.infra.vpn_connect_ms` — VPN Connect Time (ms)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vpn_connect_ms` |
| Business Name | VPN Connect Time (ms) |
| Description | Governed KPI for VPN Connect Time (ms). |
| Business Purpose | Enable decisions using VPN Connect Time (ms). |
| Formula | See semantic measure bound to kpi.infra.vpn_connect_ms |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 4200 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-vpn-connect |
| Related Dashboards | infra.vpn |

### `kpi.infra.vpn_throughput_mbps` — VPN Throughput (Mbps)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vpn_throughput_mbps` |
| Business Name | VPN Throughput (Mbps) |
| Description | Governed KPI for VPN Throughput (Mbps). |
| Business Purpose | Enable decisions using VPN Throughput (Mbps). |
| Formula | See semantic measure bound to kpi.infra.vpn_throughput_mbps |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.vpn |

### `kpi.infra.vpn_auth_failures` — VPN Auth Failures

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vpn_auth_failures` |
| Business Name | VPN Auth Failures |
| Description | Governed KPI for VPN Auth Failures. |
| Business Purpose | Enable decisions using VPN Auth Failures. |
| Formula | See semantic measure bound to kpi.infra.vpn_auth_failures |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 142 |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.vpn |

### `kpi.infra.wifi_quality_index` — Wi‑Fi Quality Index

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_quality_index` |
| Business Name | Wi‑Fi Quality Index |
| Description | Governed KPI for Wi‑Fi Quality Index. |
| Business Purpose | Enable decisions using Wi‑Fi Quality Index. |
| Formula | See semantic measure bound to kpi.infra.wifi_quality_index |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Campus Network |
| Dependencies | Parent metric family |
| Example Values | 79.6 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-wifi-quality |
| Related Dashboards | infra.wifi |

### `kpi.infra.wifi_signal_dbm` — Wi‑Fi Signal (dBm)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_signal_dbm` |
| Business Name | Wi‑Fi Signal (dBm) |
| Description | Governed KPI for Wi‑Fi Signal (dBm). |
| Business Purpose | Enable decisions using Wi‑Fi Signal (dBm). |
| Formula | See semantic measure bound to kpi.infra.wifi_signal_dbm |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Good ≥−65; Fair ≥−75; Poor <−75 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | -58 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-wifi-rssi |
| Related Dashboards | infra.wifi |

### `kpi.infra.wifi_roam_events` — Wi‑Fi Roam Events / Device-Hour

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_roam_events` |
| Business Name | Wi‑Fi Roam Events / Device-Hour |
| Description | Governed KPI for Wi‑Fi Roam Events / Device-Hour. |
| Business Purpose | Enable decisions using Wi‑Fi Roam Events / Device-Hour. |
| Formula | See semantic measure bound to kpi.infra.wifi_roam_events |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 2.4 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-wifi-roam |
| Related Dashboards | infra.wifi |

### `kpi.infra.internet_experience_index` — Internet Experience Index

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.internet_experience_index` |
| Business Name | Internet Experience Index |
| Description | Governed KPI for Internet Experience Index. |
| Business Purpose | Enable decisions using Internet Experience Index. |
| Formula | See semantic measure bound to kpi.infra.internet_experience_index |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 81.2 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-inet-index |
| Related Dashboards | infra.internet |

### `kpi.infra.dns_resolve_ms` — DNS Resolve Time (ms)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.dns_resolve_ms` |
| Business Name | DNS Resolve Time (ms) |
| Description | Governed KPI for DNS Resolve Time (ms). |
| Business Purpose | Enable decisions using DNS Resolve Time (ms). |
| Formula | See semantic measure bound to kpi.infra.dns_resolve_ms |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Good ≤50; Fair ≤100; Poor >100 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 42 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-dns |
| Related Dashboards | infra.internet |

### `kpi.infra.wan_path_score` — WAN Path Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wan_path_score` |
| Business Name | WAN Path Score |
| Description | Governed KPI for WAN Path Score. |
| Business Purpose | Enable decisions using WAN Path Score. |
| Formula | See semantic measure bound to kpi.infra.wan_path_score |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | WAN Engineering |
| Dependencies | Parent metric family |
| Example Values | 84.1 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-wan-score |
| Related Dashboards | infra.wan |

### `kpi.infra.wan_utilization_p95` — WAN Utilization P95 %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wan_utilization_p95` |
| Business Name | WAN Utilization P95 % |
| Description | Governed KPI for WAN Utilization P95 %. |
| Business Purpose | Enable decisions using WAN Utilization P95 %. |
| Formula | See semantic measure bound to kpi.infra.wan_utilization_p95 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Warn >80; Crit >90 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 71% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.wan |

### `kpi.infra.cloud_region_health` — Cloud Region Health

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_region_health` |
| Business Name | Cloud Region Health |
| Description | Governed KPI for Cloud Region Health. |
| Business Purpose | Enable decisions using Cloud Region Health. |
| Formula | See semantic measure bound to kpi.infra.cloud_region_health |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Cloud SRE |
| Dependencies | Parent metric family |
| Example Values | 86.3 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-health |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_error_budget_pct` — Cloud Error Budget Remaining %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_error_budget_pct` |
| Business Name | Cloud Error Budget Remaining % |
| Description | Governed KPI for Cloud Error Budget Remaining %. |
| Business Purpose | Enable decisions using Cloud Error Budget Remaining %. |
| Formula | See semantic measure bound to kpi.infra.cloud_error_budget_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Warn <25; Crit <10 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 74% |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-budget |
| Related Dashboards | infra.cloud |

### `kpi.infra.vdi_session_score` — VDI Session Experience

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_session_score` |
| Business Name | VDI Session Experience |
| Description | Governed KPI for VDI Session Experience. |
| Business Purpose | Enable decisions using VDI Session Experience. |
| Formula | See semantic measure bound to kpi.infra.vdi_session_score |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | EUC Engineering |
| Dependencies | Parent metric family |
| Example Values | 77.9 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-vdi-score |
| Related Dashboards | infra.vdi |

### `kpi.infra.vdi_logon_sec` — VDI Logon Duration (sec)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_logon_sec` |
| Business Name | VDI Logon Duration (sec) |
| Description | Governed KPI for VDI Logon Duration (sec). |
| Business Purpose | Enable decisions using VDI Logon Duration (sec). |
| Formula | See semantic measure bound to kpi.infra.vdi_logon_sec |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 28 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-vdi-logon |
| Related Dashboards | infra.vdi |

### `kpi.infra.vdi_protocol_latency_ms` — VDI Protocol Latency (ms)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_protocol_latency_ms` |
| Business Name | VDI Protocol Latency (ms) |
| Description | Governed KPI for VDI Protocol Latency (ms). |
| Business Purpose | Enable decisions using VDI Protocol Latency (ms). |
| Formula | See semantic measure bound to kpi.infra.vdi_protocol_latency_ms |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 42 |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.vdi |

### `kpi.infra.dc_health_score` — Data Center Health

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.dc_health_score` |
| Business Name | Data Center Health |
| Description | Governed KPI for Data Center Health. |
| Business Purpose | Enable decisions using Data Center Health. |
| Formula | See semantic measure bound to kpi.infra.dc_health_score |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | DC Operations |
| Dependencies | Parent metric family |
| Example Values | 89.2 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-dc-health |
| Related Dashboards | infra.datacenter |

### `kpi.infra.storage_latency_ms` — Storage Latency (ms)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.storage_latency_ms` |
| Business Name | Storage Latency (ms) |
| Description | Governed KPI for Storage Latency (ms). |
| Business Purpose | Enable decisions using Storage Latency (ms). |
| Formula | See semantic measure bound to kpi.infra.storage_latency_ms |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Good ≤2; Fair ≤5; Poor >5 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 1.8 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-storage-lat |
| Related Dashboards | infra.datacenter |

### `kpi.infra.server_cpu_pct` — Server CPU %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.server_cpu_pct` |
| Business Name | Server CPU % |
| Description | Governed KPI for Server CPU %. |
| Business Purpose | Enable decisions using Server CPU %. |
| Formula | See semantic measure bound to kpi.infra.server_cpu_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.datacenter |

### `kpi.infra.capacity_risk_index` — Capacity Risk Index

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.capacity_risk_index` |
| Business Name | Capacity Risk Index |
| Description | Governed KPI for Capacity Risk Index. |
| Business Purpose | Enable decisions using Capacity Risk Index. |
| Formula | See semantic measure bound to kpi.infra.capacity_risk_index |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Low <30; Mod <50; High ≥50 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Capacity PM |
| Dependencies | Parent metric family |
| Example Values | 27 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-capacity-risk |
| Related Dashboards | infra.datacenter,ops.capacity |

### `kpi.infra.forecast_breach_days` — Days to Capacity Breach

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.forecast_breach_days` |
| Business Name | Days to Capacity Breach |
| Description | Governed KPI for Days to Capacity Breach. |
| Business Purpose | Enable decisions using Days to Capacity Breach. |
| Formula | See semantic measure bound to kpi.infra.forecast_breach_days |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Warn <30; Crit <14 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 118 |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-capacity-forecast |
| Related Dashboards | infra.datacenter |

### `kpi.infra.latency_ms.p50` — Latency (P50)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.latency_ms.p50` |
| Business Name | Latency (P50) |
| Description | Governed KPI for Latency (P50). |
| Business Purpose | Enable decisions using Latency (P50). |
| Formula | See semantic measure bound to kpi.infra.latency_ms.p50 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P50 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.latency_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.vpn_connect_ms.p50` — VPN Connect (P50)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vpn_connect_ms.p50` |
| Business Name | VPN Connect (P50) |
| Description | Governed KPI for VPN Connect (P50). |
| Business Purpose | Enable decisions using VPN Connect (P50). |
| Formula | See semantic measure bound to kpi.infra.vpn_connect_ms.p50 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P50 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vpn_connect_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.dns_resolve_ms.p50` — DNS (P50)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.dns_resolve_ms.p50` |
| Business Name | DNS (P50) |
| Description | Governed KPI for DNS (P50). |
| Business Purpose | Enable decisions using DNS (P50). |
| Formula | See semantic measure bound to kpi.infra.dns_resolve_ms.p50 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P50 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.dns_resolve_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.vdi_logon_sec.p50` — VDI Logon (P50)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_logon_sec.p50` |
| Business Name | VDI Logon (P50) |
| Description | Governed KPI for VDI Logon (P50). |
| Business Purpose | Enable decisions using VDI Logon (P50). |
| Formula | See semantic measure bound to kpi.infra.vdi_logon_sec.p50 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P50 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vdi_logon_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.storage_latency_ms.p50` — Storage Latency (P50)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.storage_latency_ms.p50` |
| Business Name | Storage Latency (P50) |
| Description | Governed KPI for Storage Latency (P50). |
| Business Purpose | Enable decisions using Storage Latency (P50). |
| Formula | See semantic measure bound to kpi.infra.storage_latency_ms.p50 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P50 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.storage_latency_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.latency_ms.p90` — Latency (P90)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.latency_ms.p90` |
| Business Name | Latency (P90) |
| Description | Governed KPI for Latency (P90). |
| Business Purpose | Enable decisions using Latency (P90). |
| Formula | See semantic measure bound to kpi.infra.latency_ms.p90 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.latency_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.vpn_connect_ms.p90` — VPN Connect (P90)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vpn_connect_ms.p90` |
| Business Name | VPN Connect (P90) |
| Description | Governed KPI for VPN Connect (P90). |
| Business Purpose | Enable decisions using VPN Connect (P90). |
| Formula | See semantic measure bound to kpi.infra.vpn_connect_ms.p90 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vpn_connect_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.dns_resolve_ms.p90` — DNS (P90)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.dns_resolve_ms.p90` |
| Business Name | DNS (P90) |
| Description | Governed KPI for DNS (P90). |
| Business Purpose | Enable decisions using DNS (P90). |
| Formula | See semantic measure bound to kpi.infra.dns_resolve_ms.p90 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.dns_resolve_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.vdi_logon_sec.p90` — VDI Logon (P90)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_logon_sec.p90` |
| Business Name | VDI Logon (P90) |
| Description | Governed KPI for VDI Logon (P90). |
| Business Purpose | Enable decisions using VDI Logon (P90). |
| Formula | See semantic measure bound to kpi.infra.vdi_logon_sec.p90 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vdi_logon_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.storage_latency_ms.p90` — Storage Latency (P90)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.storage_latency_ms.p90` |
| Business Name | Storage Latency (P90) |
| Description | Governed KPI for Storage Latency (P90). |
| Business Purpose | Enable decisions using Storage Latency (P90). |
| Formula | See semantic measure bound to kpi.infra.storage_latency_ms.p90 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P90 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.storage_latency_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.latency_ms.p95` — Latency (P95)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.latency_ms.p95` |
| Business Name | Latency (P95) |
| Description | Governed KPI for Latency (P95). |
| Business Purpose | Enable decisions using Latency (P95). |
| Formula | See semantic measure bound to kpi.infra.latency_ms.p95 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P95 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.latency_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.vpn_connect_ms.p95` — VPN Connect (P95)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vpn_connect_ms.p95` |
| Business Name | VPN Connect (P95) |
| Description | Governed KPI for VPN Connect (P95). |
| Business Purpose | Enable decisions using VPN Connect (P95). |
| Formula | See semantic measure bound to kpi.infra.vpn_connect_ms.p95 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P95 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vpn_connect_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.dns_resolve_ms.p95` — DNS (P95)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.dns_resolve_ms.p95` |
| Business Name | DNS (P95) |
| Description | Governed KPI for DNS (P95). |
| Business Purpose | Enable decisions using DNS (P95). |
| Formula | See semantic measure bound to kpi.infra.dns_resolve_ms.p95 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P95 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.dns_resolve_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.vdi_logon_sec.p95` — VDI Logon (P95)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_logon_sec.p95` |
| Business Name | VDI Logon (P95) |
| Description | Governed KPI for VDI Logon (P95). |
| Business Purpose | Enable decisions using VDI Logon (P95). |
| Formula | See semantic measure bound to kpi.infra.vdi_logon_sec.p95 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P95 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vdi_logon_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.storage_latency_ms.p95` — Storage Latency (P95)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.storage_latency_ms.p95` |
| Business Name | Storage Latency (P95) |
| Description | Governed KPI for Storage Latency (P95). |
| Business Purpose | Enable decisions using Storage Latency (P95). |
| Formula | See semantic measure bound to kpi.infra.storage_latency_ms.p95 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | P95 |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.storage_latency_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | See IA |

### `kpi.infra.network_quality_index.amer` — Network Quality — AMER

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.network_quality_index.amer` |
| Business Name | Network Quality — AMER |
| Description | Governed KPI for Network Quality — AMER. |
| Business Purpose | Enable decisions using Network Quality — AMER. |
| Formula | See semantic measure bound to kpi.infra.network_quality_index.amer |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.network_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.network |

### `kpi.infra.network_quality_index.emea` — Network Quality — EMEA

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.network_quality_index.emea` |
| Business Name | Network Quality — EMEA |
| Description | Governed KPI for Network Quality — EMEA. |
| Business Purpose | Enable decisions using Network Quality — EMEA. |
| Formula | See semantic measure bound to kpi.infra.network_quality_index.emea |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.network_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.network |

### `kpi.infra.network_quality_index.apac` — Network Quality — APAC

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.network_quality_index.apac` |
| Business Name | Network Quality — APAC |
| Description | Governed KPI for Network Quality — APAC. |
| Business Purpose | Enable decisions using Network Quality — APAC. |
| Formula | See semantic measure bound to kpi.infra.network_quality_index.apac |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.network_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.network |

### `kpi.infra.network_quality_index.latam` — Network Quality — LATAM

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.network_quality_index.latam` |
| Business Name | Network Quality — LATAM |
| Description | Governed KPI for Network Quality — LATAM. |
| Business Purpose | Enable decisions using Network Quality — LATAM. |
| Formula | See semantic measure bound to kpi.infra.network_quality_index.latam |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.network_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.network |

### `kpi.infra.network_quality_index.anz` — Network Quality — ANZ

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.network_quality_index.anz` |
| Business Name | Network Quality — ANZ |
| Description | Governed KPI for Network Quality — ANZ. |
| Business Purpose | Enable decisions using Network Quality — ANZ. |
| Formula | See semantic measure bound to kpi.infra.network_quality_index.anz |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.network_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.network |

### `kpi.infra.network_quality_index.india` — Network Quality — INDIA

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.network_quality_index.india` |
| Business Name | Network Quality — INDIA |
| Description | Governed KPI for Network Quality — INDIA. |
| Business Purpose | Enable decisions using Network Quality — INDIA. |
| Formula | See semantic measure bound to kpi.infra.network_quality_index.india |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.network_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.network |

### `kpi.infra.cloud_health.azure.eastus` — Cloud Health — AZURE eastus

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.azure.eastus` |
| Business Name | Cloud Health — AZURE eastus |
| Description | Governed KPI for Cloud Health — AZURE eastus. |
| Business Purpose | Enable decisions using Cloud Health — AZURE eastus. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.azure.eastus |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_health.azure.westeurope` — Cloud Health — AZURE westeurope

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.azure.westeurope` |
| Business Name | Cloud Health — AZURE westeurope |
| Description | Governed KPI for Cloud Health — AZURE westeurope. |
| Business Purpose | Enable decisions using Cloud Health — AZURE westeurope. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.azure.westeurope |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_health.azure.eastus2` — Cloud Health — AZURE eastus2

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.azure.eastus2` |
| Business Name | Cloud Health — AZURE eastus2 |
| Description | Governed KPI for Cloud Health — AZURE eastus2. |
| Business Purpose | Enable decisions using Cloud Health — AZURE eastus2. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.azure.eastus2 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_health.azure.centralindia` — Cloud Health — AZURE centralindia

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.azure.centralindia` |
| Business Name | Cloud Health — AZURE centralindia |
| Description | Governed KPI for Cloud Health — AZURE centralindia. |
| Business Purpose | Enable decisions using Cloud Health — AZURE centralindia. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.azure.centralindia |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_health.azure.uksouth` — Cloud Health — AZURE uksouth

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.azure.uksouth` |
| Business Name | Cloud Health — AZURE uksouth |
| Description | Governed KPI for Cloud Health — AZURE uksouth. |
| Business Purpose | Enable decisions using Cloud Health — AZURE uksouth. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.azure.uksouth |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_health.aws.us_east_1` — Cloud Health — AWS us_east_1

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.aws.us_east_1` |
| Business Name | Cloud Health — AWS us_east_1 |
| Description | Governed KPI for Cloud Health — AWS us_east_1. |
| Business Purpose | Enable decisions using Cloud Health — AWS us_east_1. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.aws.us_east_1 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_health.aws.eu_west_1` — Cloud Health — AWS eu_west_1

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.aws.eu_west_1` |
| Business Name | Cloud Health — AWS eu_west_1 |
| Description | Governed KPI for Cloud Health — AWS eu_west_1. |
| Business Purpose | Enable decisions using Cloud Health — AWS eu_west_1. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.aws.eu_west_1 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_health.aws.ap_southeast_1` — Cloud Health — AWS ap_southeast_1

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.aws.ap_southeast_1` |
| Business Name | Cloud Health — AWS ap_southeast_1 |
| Description | Governed KPI for Cloud Health — AWS ap_southeast_1. |
| Business Purpose | Enable decisions using Cloud Health — AWS ap_southeast_1. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.aws.ap_southeast_1 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_health.aws.us_west_2` — Cloud Health — AWS us_west_2

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.aws.us_west_2` |
| Business Name | Cloud Health — AWS us_west_2 |
| Description | Governed KPI for Cloud Health — AWS us_west_2. |
| Business Purpose | Enable decisions using Cloud Health — AWS us_west_2. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.aws.us_west_2 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_health.gcp.us_central1` — Cloud Health — GCP us_central1

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.gcp.us_central1` |
| Business Name | Cloud Health — GCP us_central1 |
| Description | Governed KPI for Cloud Health — GCP us_central1. |
| Business Purpose | Enable decisions using Cloud Health — GCP us_central1. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.gcp.us_central1 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_health.gcp.europe_west1` — Cloud Health — GCP europe_west1

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.gcp.europe_west1` |
| Business Name | Cloud Health — GCP europe_west1 |
| Description | Governed KPI for Cloud Health — GCP europe_west1. |
| Business Purpose | Enable decisions using Cloud Health — GCP europe_west1. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.gcp.europe_west1 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_health.gcp.asia_east1` — Cloud Health — GCP asia_east1

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_health.gcp.asia_east1` |
| Business Name | Cloud Health — GCP asia_east1 |
| Description | Governed KPI for Cloud Health — GCP asia_east1. |
| Business Purpose | Enable decisions using Cloud Health — GCP asia_east1. |
| Formula | See semantic measure bound to kpi.infra.cloud_health.gcp.asia_east1 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-infra-cloud-providers |
| Related Dashboards | infra.cloud |

### `kpi.infra.vdi_session_score.citrix` — VDI Score — citrix

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_session_score.citrix` |
| Business Name | VDI Score — citrix |
| Description | Governed KPI for VDI Score — citrix. |
| Business Purpose | Enable decisions using VDI Score — citrix. |
| Formula | See semantic measure bound to kpi.infra.vdi_session_score.citrix |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vdi_session_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.vdi |

### `kpi.infra.vdi_session_score.avd` — VDI Score — avd

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_session_score.avd` |
| Business Name | VDI Score — avd |
| Description | Governed KPI for VDI Score — avd. |
| Business Purpose | Enable decisions using VDI Score — avd. |
| Formula | See semantic measure bound to kpi.infra.vdi_session_score.avd |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vdi_session_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.vdi |

### `kpi.infra.vdi_session_score.horizon` — VDI Score — horizon

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_session_score.horizon` |
| Business Name | VDI Score — horizon |
| Description | Governed KPI for VDI Score — horizon. |
| Business Purpose | Enable decisions using VDI Score — horizon. |
| Formula | See semantic measure bound to kpi.infra.vdi_session_score.horizon |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vdi_session_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.vdi |

### `kpi.infra.vdi_session_score.w365` — VDI Score — w365

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_session_score.w365` |
| Business Name | VDI Score — w365 |
| Description | Governed KPI for VDI Score — w365. |
| Business Purpose | Enable decisions using VDI Score — w365. |
| Formula | See semantic measure bound to kpi.infra.vdi_session_score.w365 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vdi_session_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.vdi |

### `kpi.infra.wifi_quality.hq_3f` — Wi‑Fi Quality — hq_3f

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_quality.hq_3f` |
| Business Name | Wi‑Fi Quality — hq_3f |
| Description | Governed KPI for Wi‑Fi Quality — hq_3f. |
| Business Purpose | Enable decisions using Wi‑Fi Quality — hq_3f. |
| Formula | See semantic measure bound to kpi.infra.wifi_quality.hq_3f |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wifi_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.wifi |

### `kpi.infra.wifi_quality.hq_4f` — Wi‑Fi Quality — hq_4f

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_quality.hq_4f` |
| Business Name | Wi‑Fi Quality — hq_4f |
| Description | Governed KPI for Wi‑Fi Quality — hq_4f. |
| Business Purpose | Enable decisions using Wi‑Fi Quality — hq_4f. |
| Formula | See semantic measure bound to kpi.infra.wifi_quality.hq_4f |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wifi_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.wifi |

### `kpi.infra.wifi_quality.lon_2f` — Wi‑Fi Quality — lon_2f

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_quality.lon_2f` |
| Business Name | Wi‑Fi Quality — lon_2f |
| Description | Governed KPI for Wi‑Fi Quality — lon_2f. |
| Business Purpose | Enable decisions using Wi‑Fi Quality — lon_2f. |
| Formula | See semantic measure bound to kpi.infra.wifi_quality.lon_2f |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wifi_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.wifi |

### `kpi.infra.wifi_quality.nyc_1f` — Wi‑Fi Quality — nyc_1f

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_quality.nyc_1f` |
| Business Name | Wi‑Fi Quality — nyc_1f |
| Description | Governed KPI for Wi‑Fi Quality — nyc_1f. |
| Business Purpose | Enable decisions using Wi‑Fi Quality — nyc_1f. |
| Formula | See semantic measure bound to kpi.infra.wifi_quality.nyc_1f |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wifi_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.wifi |

### `kpi.infra.wifi_quality.sin_open` — Wi‑Fi Quality — sin_open

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_quality.sin_open` |
| Business Name | Wi‑Fi Quality — sin_open |
| Description | Governed KPI for Wi‑Fi Quality — sin_open. |
| Business Purpose | Enable decisions using Wi‑Fi Quality — sin_open. |
| Formula | See semantic measure bound to kpi.infra.wifi_quality.sin_open |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wifi_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.wifi |

### `kpi.infra.wifi_quality.ber_3f` — Wi‑Fi Quality — ber_3f

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_quality.ber_3f` |
| Business Name | Wi‑Fi Quality — ber_3f |
| Description | Governed KPI for Wi‑Fi Quality — ber_3f. |
| Business Purpose | Enable decisions using Wi‑Fi Quality — ber_3f. |
| Formula | See semantic measure bound to kpi.infra.wifi_quality.ber_3f |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wifi_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.wifi |

### `kpi.infra.wifi_quality.par_1f` — Wi‑Fi Quality — par_1f

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_quality.par_1f` |
| Business Name | Wi‑Fi Quality — par_1f |
| Description | Governed KPI for Wi‑Fi Quality — par_1f. |
| Business Purpose | Enable decisions using Wi‑Fi Quality — par_1f. |
| Formula | See semantic measure bound to kpi.infra.wifi_quality.par_1f |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wifi_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.wifi |

### `kpi.infra.wifi_quality.syd_2f` — Wi‑Fi Quality — syd_2f

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_quality.syd_2f` |
| Business Name | Wi‑Fi Quality — syd_2f |
| Description | Governed KPI for Wi‑Fi Quality — syd_2f. |
| Business Purpose | Enable decisions using Wi‑Fi Quality — syd_2f. |
| Formula | See semantic measure bound to kpi.infra.wifi_quality.syd_2f |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wifi_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.wifi |

### `kpi.infra.internet_experience.comcast` — Internet Experience — comcast

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.internet_experience.comcast` |
| Business Name | Internet Experience — comcast |
| Description | Governed KPI for Internet Experience — comcast. |
| Business Purpose | Enable decisions using Internet Experience — comcast. |
| Formula | See semantic measure bound to kpi.infra.internet_experience.comcast |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.internet_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.internet |

### `kpi.infra.internet_experience.bt` — Internet Experience — bt

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.internet_experience.bt` |
| Business Name | Internet Experience — bt |
| Description | Governed KPI for Internet Experience — bt. |
| Business Purpose | Enable decisions using Internet Experience — bt. |
| Formula | See semantic measure bound to kpi.infra.internet_experience.bt |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.internet_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.internet |

### `kpi.infra.internet_experience.ntt` — Internet Experience — ntt

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.internet_experience.ntt` |
| Business Name | Internet Experience — ntt |
| Description | Governed KPI for Internet Experience — ntt. |
| Business Purpose | Enable decisions using Internet Experience — ntt. |
| Formula | See semantic measure bound to kpi.infra.internet_experience.ntt |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.internet_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.internet |

### `kpi.infra.internet_experience.telefonica` — Internet Experience — telefonica

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.internet_experience.telefonica` |
| Business Name | Internet Experience — telefonica |
| Description | Governed KPI for Internet Experience — telefonica. |
| Business Purpose | Enable decisions using Internet Experience — telefonica. |
| Formula | See semantic measure bound to kpi.infra.internet_experience.telefonica |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.internet_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.internet |

### `kpi.infra.internet_experience.verizon` — Internet Experience — verizon

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.internet_experience.verizon` |
| Business Name | Internet Experience — verizon |
| Description | Governed KPI for Internet Experience — verizon. |
| Business Purpose | Enable decisions using Internet Experience — verizon. |
| Formula | See semantic measure bound to kpi.infra.internet_experience.verizon |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.internet_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.internet |

### `kpi.infra.internet_experience.orange` — Internet Experience — orange

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.internet_experience.orange` |
| Business Name | Internet Experience — orange |
| Description | Governed KPI for Internet Experience — orange. |
| Business Purpose | Enable decisions using Internet Experience — orange. |
| Formula | See semantic measure bound to kpi.infra.internet_experience.orange |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.internet_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.internet |

### `kpi.infra.internet_experience.singtel` — Internet Experience — singtel

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.internet_experience.singtel` |
| Business Name | Internet Experience — singtel |
| Description | Governed KPI for Internet Experience — singtel. |
| Business Purpose | Enable decisions using Internet Experience — singtel. |
| Formula | See semantic measure bound to kpi.infra.internet_experience.singtel |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.internet_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.internet |

### `kpi.infra.internet_experience.att` — Internet Experience — att

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.internet_experience.att` |
| Business Name | Internet Experience — att |
| Description | Governed KPI for Internet Experience — att. |
| Business Purpose | Enable decisions using Internet Experience — att. |
| Formula | See semantic measure bound to kpi.infra.internet_experience.att |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.internet_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.internet |

### `kpi.infra.internet_experience.lumen` — Internet Experience — lumen

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.internet_experience.lumen` |
| Business Name | Internet Experience — lumen |
| Description | Governed KPI for Internet Experience — lumen. |
| Business Purpose | Enable decisions using Internet Experience — lumen. |
| Formula | See semantic measure bound to kpi.infra.internet_experience.lumen |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.internet_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.internet |

### `kpi.ops.open_incidents` — Open Incidents

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.open_incidents` |
| Business Name | Open Incidents |
| Description | Governed KPI for Open Incidents. |
| Business Purpose | Enable decisions using Open Incidents. |
| Formula | See semantic measure bound to kpi.ops.open_incidents |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | IT Operations |
| Dependencies | Parent metric family |
| Example Values | 27 |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-open-incidents |
| Related Dashboards | ops.command,ops.incidents |

### `kpi.ops.mttr_minutes` — MTTR (minutes)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.mttr_minutes` |
| Business Name | MTTR (minutes) |
| Description | Governed KPI for MTTR (minutes). |
| Business Purpose | Enable decisions using MTTR (minutes). |
| Formula | See semantic measure bound to kpi.ops.mttr_minutes |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | Median |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 48 |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-mttr |
| Related Dashboards | ops.incidents |

### `kpi.ops.mtta_minutes` — MTTA (minutes)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.mtta_minutes` |
| Business Name | MTTA (minutes) |
| Description | Governed KPI for MTTA (minutes). |
| Business Purpose | Enable decisions using MTTA (minutes). |
| Formula | See semantic measure bound to kpi.ops.mtta_minutes |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | Median |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 6.2 |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-mtta |
| Related Dashboards | ops.command |

### `kpi.ops.major_incident_count` — Major Incidents

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.major_incident_count` |
| Business Name | Major Incidents |
| Description | Governed KPI for Major Incidents. |
| Business Purpose | Enable decisions using Major Incidents. |
| Formula | See semantic measure bound to kpi.ops.major_incident_count |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 1 |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.major |

### `kpi.ops.alert_noise_ratio` — Alert Noise Ratio

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.alert_noise_ratio` |
| Business Name | Alert Noise Ratio |
| Description | Governed KPI for Alert Noise Ratio. |
| Business Purpose | Enable decisions using Alert Noise Ratio. |
| Formula | See semantic measure bound to kpi.ops.alert_noise_ratio |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 0.22 |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-noise-ratio |
| Related Dashboards | ops.alerts |

### `kpi.ops.active_high_impact_alerts` — Active High-Impact Alerts

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.active_high_impact_alerts` |
| Business Name | Active High-Impact Alerts |
| Description | Governed KPI for Active High-Impact Alerts. |
| Business Purpose | Enable decisions using Active High-Impact Alerts. |
| Formula | See semantic measure bound to kpi.ops.active_high_impact_alerts |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 30s |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 18 |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-alert-feed |
| Related Dashboards | ops.alerts,D-EXEC-02 |

### `kpi.ops.automation_success_pct` — Automation Success %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_success_pct` |
| Business Name | Automation Success % |
| Description | Governed KPI for Automation Success %. |
| Business Purpose | Enable decisions using Automation Success %. |
| Formula | See semantic measure bound to kpi.ops.automation_success_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 94.6% |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-automation-success |
| Related Dashboards | ops.automation |

### `kpi.ops.automation_queue_depth` — Automation Queue Depth

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_queue_depth` |
| Business Name | Automation Queue Depth |
| Description | Governed KPI for Automation Queue Depth. |
| Business Purpose | Enable decisions using Automation Queue Depth. |
| Formula | See semantic measure bound to kpi.ops.automation_queue_depth |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 30s |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 14 |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-automation-queue |
| Related Dashboards | ops.command,ops.automation |

### `kpi.ops.remote_action_success_pct` — Remote Action Success %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.remote_action_success_pct` |
| Business Name | Remote Action Success % |
| Description | Governed KPI for Remote Action Success %. |
| Business Purpose | Enable decisions using Remote Action Success %. |
| Formula | See semantic measure bound to kpi.ops.remote_action_success_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 96.1% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.remote |

### `kpi.ops.sla_attainment_pct` — SLA Attainment %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.sla_attainment_pct` |
| Business Name | SLA Attainment % |
| Description | Governed KPI for SLA Attainment %. |
| Business Purpose | Enable decisions using SLA Attainment %. |
| Formula | See semantic measure bound to kpi.ops.sla_attainment_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 97.2% |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-sla-attainment |
| Related Dashboards | ops.sla |

### `kpi.ops.ticket_volume` — Ticket Volume

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.ticket_volume` |
| Business Name | Ticket Volume |
| Description | Governed KPI for Ticket Volume. |
| Business Purpose | Enable decisions using Ticket Volume. |
| Formula | See semantic measure bound to kpi.ops.ticket_volume |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 1842 |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-ticket-volume |
| Related Dashboards | ops.servicedesk |

### `kpi.ops.deflection_pct` — Ticket Deflection %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.deflection_pct` |
| Business Name | Ticket Deflection % |
| Description | Governed KPI for Ticket Deflection %. |
| Business Purpose | Enable decisions using Ticket Deflection %. |
| Formula | See semantic measure bound to kpi.ops.deflection_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 31% |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-deflection |
| Related Dashboards | ops.servicedesk |

### `kpi.ops.change_failure_pct` — Change Failure Rate %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.change_failure_pct` |
| Business Name | Change Failure Rate % |
| Description | Governed KPI for Change Failure Rate %. |
| Business Purpose | Enable decisions using Change Failure Rate %. |
| Formula | See semantic measure bound to kpi.ops.change_failure_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 8.3% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.change |

### `kpi.ops.release_rollback_pct` — Release Rollback Rate %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.release_rollback_pct` |
| Business Name | Release Rollback Rate % |
| Description | Governed KPI for Release Rollback Rate %. |
| Business Purpose | Enable decisions using Release Rollback Rate %. |
| Formula | See semantic measure bound to kpi.ops.release_rollback_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 4.5% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.release |

### `kpi.ops.business_impact_score` — Business Impact Score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.business_impact_score` |
| Business Name | Business Impact Score |
| Description | Governed KPI for Business Impact Score. |
| Business Purpose | Enable decisions using Business Impact Score. |
| Formula | See semantic measure bound to kpi.ops.business_impact_score |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Higher=worse |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 41 |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-biz-impact |
| Related Dashboards | ops.command,ops.major |

### `kpi.ops.system_availability_pct` — System Availability %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.system_availability_pct` |
| Business Name | System Availability % |
| Description | Governed KPI for System Availability %. |
| Business Purpose | Enable decisions using System Availability %. |
| Formula | See semantic measure bound to kpi.ops.system_availability_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Good ≥99.9% |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 99.94% |
| Visualization Mapping | KPI card |
| Related Widgets | w-ops-availability |
| Related Dashboards | ops.command |

### `kpi.ops.open_incidents.sev1` — Open Incidents — SEV1

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.open_incidents.sev1` |
| Business Name | Open Incidents — SEV1 |
| Description | Governed KPI for Open Incidents — SEV1. |
| Business Purpose | Enable decisions using Open Incidents — SEV1. |
| Formula | See semantic measure bound to kpi.ops.open_incidents.sev1 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.open_incidents |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.incidents |

### `kpi.ops.open_incidents.sev2` — Open Incidents — SEV2

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.open_incidents.sev2` |
| Business Name | Open Incidents — SEV2 |
| Description | Governed KPI for Open Incidents — SEV2. |
| Business Purpose | Enable decisions using Open Incidents — SEV2. |
| Formula | See semantic measure bound to kpi.ops.open_incidents.sev2 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.open_incidents |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.incidents |

### `kpi.ops.open_incidents.sev3` — Open Incidents — SEV3

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.open_incidents.sev3` |
| Business Name | Open Incidents — SEV3 |
| Description | Governed KPI for Open Incidents — SEV3. |
| Business Purpose | Enable decisions using Open Incidents — SEV3. |
| Formula | See semantic measure bound to kpi.ops.open_incidents.sev3 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.open_incidents |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.incidents |

### `kpi.ops.open_incidents.sev4` — Open Incidents — SEV4

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.open_incidents.sev4` |
| Business Name | Open Incidents — SEV4 |
| Description | Governed KPI for Open Incidents — SEV4. |
| Business Purpose | Enable decisions using Open Incidents — SEV4. |
| Formula | See semantic measure bound to kpi.ops.open_incidents.sev4 |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.open_incidents |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.incidents |

### `kpi.ops.sla_attainment.idp` — SLA Attainment — idp

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.sla_attainment.idp` |
| Business Name | SLA Attainment — idp |
| Description | Governed KPI for SLA Attainment — idp. |
| Business Purpose | Enable decisions using SLA Attainment — idp. |
| Formula | See semantic measure bound to kpi.ops.sla_attainment.idp |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.sla_attainment_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.sla |

### `kpi.ops.sla_attainment.crm` — SLA Attainment — crm

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.sla_attainment.crm` |
| Business Name | SLA Attainment — crm |
| Description | Governed KPI for SLA Attainment — crm. |
| Business Purpose | Enable decisions using SLA Attainment — crm. |
| Formula | See semantic measure bound to kpi.ops.sla_attainment.crm |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.sla_attainment_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.sla |

### `kpi.ops.sla_attainment.vpn` — SLA Attainment — vpn

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.sla_attainment.vpn` |
| Business Name | SLA Attainment — vpn |
| Description | Governed KPI for SLA Attainment — vpn. |
| Business Purpose | Enable decisions using SLA Attainment — vpn. |
| Formula | See semantic measure bound to kpi.ops.sla_attainment.vpn |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.sla_attainment_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.sla |

### `kpi.ops.sla_attainment.collab` — SLA Attainment — collab

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.sla_attainment.collab` |
| Business Name | SLA Attainment — collab |
| Description | Governed KPI for SLA Attainment — collab. |
| Business Purpose | Enable decisions using SLA Attainment — collab. |
| Formula | See semantic measure bound to kpi.ops.sla_attainment.collab |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.sla_attainment_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.sla |

### `kpi.ops.sla_attainment.email` — SLA Attainment — email

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.sla_attainment.email` |
| Business Name | SLA Attainment — email |
| Description | Governed KPI for SLA Attainment — email. |
| Business Purpose | Enable decisions using SLA Attainment — email. |
| Formula | See semantic measure bound to kpi.ops.sla_attainment.email |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.sla_attainment_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.sla |

### `kpi.ops.sla_attainment.vdi` — SLA Attainment — vdi

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.sla_attainment.vdi` |
| Business Name | SLA Attainment — vdi |
| Description | Governed KPI for SLA Attainment — vdi. |
| Business Purpose | Enable decisions using SLA Attainment — vdi. |
| Formula | See semantic measure bound to kpi.ops.sla_attainment.vdi |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.sla_attainment_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.sla |

### `kpi.ops.sla_attainment.dns` — SLA Attainment — dns

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.sla_attainment.dns` |
| Business Name | SLA Attainment — dns |
| Description | Governed KPI for SLA Attainment — dns. |
| Business Purpose | Enable decisions using SLA Attainment — dns. |
| Formula | See semantic measure bound to kpi.ops.sla_attainment.dns |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.sla_attainment_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.sla |

### `kpi.ops.sla_attainment.wan` — SLA Attainment — wan

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.sla_attainment.wan` |
| Business Name | SLA Attainment — wan |
| Description | Governed KPI for SLA Attainment — wan. |
| Business Purpose | Enable decisions using SLA Attainment — wan. |
| Formula | See semantic measure bound to kpi.ops.sla_attainment.wan |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.sla_attainment_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.sla |

### `kpi.ops.sla_attainment.wifi` — SLA Attainment — wifi

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.sla_attainment.wifi` |
| Business Name | SLA Attainment — wifi |
| Description | Governed KPI for SLA Attainment — wifi. |
| Business Purpose | Enable decisions using SLA Attainment — wifi. |
| Formula | See semantic measure bound to kpi.ops.sla_attainment.wifi |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.sla_attainment_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.sla |

### `kpi.ops.sla_attainment.storage` — SLA Attainment — storage

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.sla_attainment.storage` |
| Business Name | SLA Attainment — storage |
| Description | Governed KPI for SLA Attainment — storage. |
| Business Purpose | Enable decisions using SLA Attainment — storage. |
| Formula | See semantic measure bound to kpi.ops.sla_attainment.storage |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.sla_attainment_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.sla |

### `kpi.ops.automation_success.clear_dns` — Automation Success — clear_dns

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_success.clear_dns` |
| Business Name | Automation Success — clear_dns |
| Description | Governed KPI for Automation Success — clear_dns. |
| Business Purpose | Enable decisions using Automation Success — clear_dns. |
| Formula | See semantic measure bound to kpi.ops.automation_success.clear_dns |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.automation_success_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.automation |

### `kpi.ops.automation_success.restart_spooler` — Automation Success — restart_spooler

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_success.restart_spooler` |
| Business Name | Automation Success — restart_spooler |
| Description | Governed KPI for Automation Success — restart_spooler. |
| Business Purpose | Enable decisions using Automation Success — restart_spooler. |
| Formula | See semantic measure bound to kpi.ops.automation_success.restart_spooler |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.automation_success_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.automation |

### `kpi.ops.automation_success.scale_vpn` — Automation Success — scale_vpn

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_success.scale_vpn` |
| Business Name | Automation Success — scale_vpn |
| Description | Governed KPI for Automation Success — scale_vpn. |
| Business Purpose | Enable decisions using Automation Success — scale_vpn. |
| Formula | See semantic measure bound to kpi.ops.automation_success.scale_vpn |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.automation_success_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.automation |

### `kpi.ops.automation_success.wifi_optimize` — Automation Success — wifi_optimize

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_success.wifi_optimize` |
| Business Name | Automation Success — wifi_optimize |
| Description | Governed KPI for Automation Success — wifi_optimize. |
| Business Purpose | Enable decisions using Automation Success — wifi_optimize. |
| Formula | See semantic measure bound to kpi.ops.automation_success.wifi_optimize |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.automation_success_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.automation |

### `kpi.ops.automation_success.collect_diag` — Automation Success — collect_diag

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_success.collect_diag` |
| Business Name | Automation Success — collect_diag |
| Description | Governed KPI for Automation Success — collect_diag. |
| Business Purpose | Enable decisions using Automation Success — collect_diag. |
| Formula | See semantic measure bound to kpi.ops.automation_success.collect_diag |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.automation_success_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.automation |

### `kpi.ops.automation_success.flush_cache` — Automation Success — flush_cache

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_success.flush_cache` |
| Business Name | Automation Success — flush_cache |
| Description | Governed KPI for Automation Success — flush_cache. |
| Business Purpose | Enable decisions using Automation Success — flush_cache. |
| Formula | See semantic measure bound to kpi.ops.automation_success.flush_cache |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.automation_success_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.automation |

### `kpi.ops.automation_success.quarantine` — Automation Success — quarantine

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_success.quarantine` |
| Business Name | Automation Success — quarantine |
| Description | Governed KPI for Automation Success — quarantine. |
| Business Purpose | Enable decisions using Automation Success — quarantine. |
| Formula | See semantic measure bound to kpi.ops.automation_success.quarantine |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.automation_success_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.automation |

### `kpi.ops.automation_success.gpupdate` — Automation Success — gpupdate

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_success.gpupdate` |
| Business Name | Automation Success — gpupdate |
| Description | Governed KPI for Automation Success — gpupdate. |
| Business Purpose | Enable decisions using Automation Success — gpupdate. |
| Formula | See semantic measure bound to kpi.ops.automation_success.gpupdate |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.automation_success_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.automation |

### `kpi.ops.automation_success.recycle_app_pool` — Automation Success — recycle_app_pool

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_success.recycle_app_pool` |
| Business Name | Automation Success — recycle_app_pool |
| Description | Governed KPI for Automation Success — recycle_app_pool. |
| Business Purpose | Enable decisions using Automation Success — recycle_app_pool. |
| Formula | See semantic measure bound to kpi.ops.automation_success.recycle_app_pool |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.automation_success_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.automation |

### `kpi.ops.automation_success.purge_tokens` — Automation Success — purge_tokens

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.automation_success.purge_tokens` |
| Business Name | Automation Success — purge_tokens |
| Description | Governed KPI for Automation Success — purge_tokens. |
| Business Purpose | Enable decisions using Automation Success — purge_tokens. |
| Formula | See semantic measure bound to kpi.ops.automation_success.purge_tokens |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.automation_success_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.automation |

### `kpi.ops.change_failure.standard` — Change Failure — standard

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.change_failure.standard` |
| Business Name | Change Failure — standard |
| Description | Governed KPI for Change Failure — standard. |
| Business Purpose | Enable decisions using Change Failure — standard. |
| Formula | See semantic measure bound to kpi.ops.change_failure.standard |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.change_failure_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.change |

### `kpi.ops.change_failure.normal` — Change Failure — normal

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.change_failure.normal` |
| Business Name | Change Failure — normal |
| Description | Governed KPI for Change Failure — normal. |
| Business Purpose | Enable decisions using Change Failure — normal. |
| Formula | See semantic measure bound to kpi.ops.change_failure.normal |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.change_failure_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.change |

### `kpi.ops.change_failure.emergency` — Change Failure — emergency

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.change_failure.emergency` |
| Business Name | Change Failure — emergency |
| Description | Governed KPI for Change Failure — emergency. |
| Business Purpose | Enable decisions using Change Failure — emergency. |
| Formula | See semantic measure bound to kpi.ops.change_failure.emergency |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.change_failure_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.change |

### `kpi.ops.change_failure.latent` — Change Failure — latent

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ops.change_failure.latent` |
| Business Name | Change Failure — latent |
| Description | Governed KPI for Change Failure — latent. |
| Business Purpose | Enable decisions using Change Failure — latent. |
| Formula | See semantic measure bound to kpi.ops.change_failure.latent |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ops.change_failure_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ops.change |

### `kpi.ai.insight_count` — Active Insights

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count` |
| Business Name | Active Insights |
| Description | Governed KPI for Active Insights. |
| Business Purpose | Enable decisions using Active Insights. |
| Formula | See semantic measure bound to kpi.ai.insight_count |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | AI PM |
| Dependencies | Parent metric family |
| Example Values | 64 |
| Visualization Mapping | KPI card |
| Related Widgets | w-ai-insight-feed |
| Related Dashboards | ai.command |

### `kpi.ai.avg_confidence` — Avg Insight Confidence %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.avg_confidence` |
| Business Name | Avg Insight Confidence % |
| Description | Governed KPI for Avg Insight Confidence %. |
| Business Purpose | Enable decisions using Avg Insight Confidence %. |
| Formula | See semantic measure bound to kpi.ai.avg_confidence |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 87% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-ai-conf |
| Related Dashboards | ai.command |

### `kpi.ai.action_conversion_pct` — Insight→Action Conversion %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.action_conversion_pct` |
| Business Name | Insight→Action Conversion % |
| Description | Governed KPI for Insight→Action Conversion %. |
| Business Purpose | Enable decisions using Insight→Action Conversion %. |
| Formula | See semantic measure bound to kpi.ai.action_conversion_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 29% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-ai-convert |
| Related Dashboards | ai.command,ai.recommend |

### `kpi.ai.prediction_accuracy_pct` — Prediction Accuracy %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.prediction_accuracy_pct` |
| Business Name | Prediction Accuracy % |
| Description | Governed KPI for Prediction Accuracy %. |
| Business Purpose | Enable decisions using Prediction Accuracy %. |
| Formula | See semantic measure bound to kpi.ai.prediction_accuracy_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | AI Platform |
| Dependencies | Parent metric family |
| Example Values | 82% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.predict |

### `kpi.ai.rca_precision_pct` — RCA Precision %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.rca_precision_pct` |
| Business Name | RCA Precision % |
| Description | Governed KPI for RCA Precision %. |
| Business Purpose | Enable decisions using RCA Precision %. |
| Formula | See semantic measure bound to kpi.ai.rca_precision_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Weekly |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 84% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.rootcause |

### `kpi.ai.recommendation_accept_pct` — Recommendation Accept %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.recommendation_accept_pct` |
| Business Name | Recommendation Accept % |
| Description | Governed KPI for Recommendation Accept %. |
| Business Purpose | Enable decisions using Recommendation Accept %. |
| Formula | See semantic measure bound to kpi.ai.recommendation_accept_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 34% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.recommend |

### `kpi.ai.copilot_resolution_pct` — Copilot Assisted Resolution %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.copilot_resolution_pct` |
| Business Name | Copilot Assisted Resolution % |
| Description | Governed KPI for Copilot Assisted Resolution %. |
| Business Purpose | Enable decisions using Copilot Assisted Resolution %. |
| Formula | See semantic measure bound to kpi.ai.copilot_resolution_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 27% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.copilot |

### `kpi.ai.graph_coverage_pct` — Knowledge Graph Coverage %

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.graph_coverage_pct` |
| Business Name | Knowledge Graph Coverage % |
| Description | Governed KPI for Knowledge Graph Coverage %. |
| Business Purpose | Enable decisions using Knowledge Graph Coverage %. |
| Formula | See semantic measure bound to kpi.ai.graph_coverage_pct |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 81% |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.graph |

### `kpi.inv.open_cases` — Open Investigation Cases

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.inv.open_cases` |
| Business Name | Open Investigation Cases |
| Description | Governed KPI for Open Investigation Cases. |
| Business Purpose | Enable decisions using Open Investigation Cases. |
| Formula | See semantic measure bound to kpi.inv.open_cases |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Investigation PM |
| Dependencies | Parent metric family |
| Example Values | 19 |
| Visualization Mapping | KPI card |
| Related Widgets | w-inv-case-list |
| Related Dashboards | inv.home |

### `kpi.inv.median_case_minutes` — Median Case Duration (min)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.inv.median_case_minutes` |
| Business Name | Median Case Duration (min) |
| Description | Governed KPI for Median Case Duration (min). |
| Business Purpose | Enable decisions using Median Case Duration (min). |
| Formula | See semantic measure bound to kpi.inv.median_case_minutes |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 1h |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 41 |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | inv.home |

### `kpi.inv.evidence_pack_count` — Evidence Packs

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.inv.evidence_pack_count` |
| Business Name | Evidence Packs |
| Description | Governed KPI for Evidence Packs. |
| Business Purpose | Enable decisions using Evidence Packs. |
| Formula | See semantic measure bound to kpi.inv.evidence_pack_count |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 54 |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | inv.home |

### `kpi.inv.collab_participants_avg` — Avg Case Participants

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.inv.collab_participants_avg` |
| Business Name | Avg Case Participants |
| Description | Governed KPI for Avg Case Participants. |
| Business Purpose | Enable decisions using Avg Case Participants. |
| Formula | See semantic measure bound to kpi.inv.collab_participants_avg |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | Parent metric family |
| Example Values | 7 |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | inv.home |

### `kpi.ai.insight_count.endpoint` — Active Insights — endpoint

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count.endpoint` |
| Business Name | Active Insights — endpoint |
| Description | Governed KPI for Active Insights — endpoint. |
| Business Purpose | Enable decisions using Active Insights — endpoint. |
| Formula | See semantic measure bound to kpi.ai.insight_count.endpoint |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.insight_count |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.command |

### `kpi.ai.insight_count.application` — Active Insights — application

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count.application` |
| Business Name | Active Insights — application |
| Description | Governed KPI for Active Insights — application. |
| Business Purpose | Enable decisions using Active Insights — application. |
| Formula | See semantic measure bound to kpi.ai.insight_count.application |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.insight_count |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.command |

### `kpi.ai.insight_count.network` — Active Insights — network

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count.network` |
| Business Name | Active Insights — network |
| Description | Governed KPI for Active Insights — network. |
| Business Purpose | Enable decisions using Active Insights — network. |
| Formula | See semantic measure bound to kpi.ai.insight_count.network |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.insight_count |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.command |

### `kpi.ai.insight_count.vpn` — Active Insights — vpn

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count.vpn` |
| Business Name | Active Insights — vpn |
| Description | Governed KPI for Active Insights — vpn. |
| Business Purpose | Enable decisions using Active Insights — vpn. |
| Formula | See semantic measure bound to kpi.ai.insight_count.vpn |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.insight_count |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.command |

### `kpi.ai.insight_count.wifi` — Active Insights — wifi

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count.wifi` |
| Business Name | Active Insights — wifi |
| Description | Governed KPI for Active Insights — wifi. |
| Business Purpose | Enable decisions using Active Insights — wifi. |
| Formula | See semantic measure bound to kpi.ai.insight_count.wifi |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.insight_count |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.command |

### `kpi.ai.insight_count.cloud` — Active Insights — cloud

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count.cloud` |
| Business Name | Active Insights — cloud |
| Description | Governed KPI for Active Insights — cloud. |
| Business Purpose | Enable decisions using Active Insights — cloud. |
| Formula | See semantic measure bound to kpi.ai.insight_count.cloud |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.insight_count |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.command |

### `kpi.ai.insight_count.vdi` — Active Insights — vdi

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count.vdi` |
| Business Name | Active Insights — vdi |
| Description | Governed KPI for Active Insights — vdi. |
| Business Purpose | Enable decisions using Active Insights — vdi. |
| Formula | See semantic measure bound to kpi.ai.insight_count.vdi |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.insight_count |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.command |

### `kpi.ai.insight_count.experience` — Active Insights — experience

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count.experience` |
| Business Name | Active Insights — experience |
| Description | Governed KPI for Active Insights — experience. |
| Business Purpose | Enable decisions using Active Insights — experience. |
| Formula | See semantic measure bound to kpi.ai.insight_count.experience |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.insight_count |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.command |

### `kpi.ai.insight_count.change` — Active Insights — change

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count.change` |
| Business Name | Active Insights — change |
| Description | Governed KPI for Active Insights — change. |
| Business Purpose | Enable decisions using Active Insights — change. |
| Formula | See semantic measure bound to kpi.ai.insight_count.change |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.insight_count |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.command |

### `kpi.ai.insight_count.wan` — Active Insights — wan

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count.wan` |
| Business Name | Active Insights — wan |
| Description | Governed KPI for Active Insights — wan. |
| Business Purpose | Enable decisions using Active Insights — wan. |
| Formula | See semantic measure bound to kpi.ai.insight_count.wan |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.insight_count |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.command |

### `kpi.ai.insight_count.dc` — Active Insights — dc

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.insight_count.dc` |
| Business Name | Active Insights — dc |
| Description | Governed KPI for Active Insights — dc. |
| Business Purpose | Enable decisions using Active Insights — dc. |
| Formula | See semantic measure bound to kpi.ai.insight_count.dc |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | count |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.insight_count |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.command |

### `kpi.ai.prediction.dex_7d` — Prediction — dex_7d

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.prediction.dex_7d` |
| Business Name | Prediction — dex_7d |
| Description | Governed KPI for Prediction — dex_7d. |
| Business Purpose | Enable decisions using Prediction — dex_7d. |
| Formula | See semantic measure bound to kpi.ai.prediction.dex_7d |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.prediction_accuracy_pct |
| Example Values | — |
| Visualization Mapping | Forecast band |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.predict |

### `kpi.ai.prediction.vpn_apac_util` — Prediction — vpn_apac_util

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.prediction.vpn_apac_util` |
| Business Name | Prediction — vpn_apac_util |
| Description | Governed KPI for Prediction — vpn_apac_util. |
| Business Purpose | Enable decisions using Prediction — vpn_apac_util. |
| Formula | See semantic measure bound to kpi.ai.prediction.vpn_apac_util |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.prediction_accuracy_pct |
| Example Values | — |
| Visualization Mapping | Forecast band |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.predict |

### `kpi.ai.prediction.storage_latency` — Prediction — storage_latency

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.prediction.storage_latency` |
| Business Name | Prediction — storage_latency |
| Description | Governed KPI for Prediction — storage_latency. |
| Business Purpose | Enable decisions using Prediction — storage_latency. |
| Formula | See semantic measure bound to kpi.ai.prediction.storage_latency |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.prediction_accuracy_pct |
| Example Values | — |
| Visualization Mapping | Forecast band |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.predict |

### `kpi.ai.prediction.avd_pool_b` — Prediction — avd_pool_b

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.prediction.avd_pool_b` |
| Business Name | Prediction — avd_pool_b |
| Description | Governed KPI for Prediction — avd_pool_b. |
| Business Purpose | Enable decisions using Prediction — avd_pool_b. |
| Formula | See semantic measure bound to kpi.ai.prediction.avd_pool_b |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.prediction_accuracy_pct |
| Example Values | — |
| Visualization Mapping | Forecast band |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.predict |

### `kpi.ai.prediction.wan_apac` — Prediction — wan_apac

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.prediction.wan_apac` |
| Business Name | Prediction — wan_apac |
| Description | Governed KPI for Prediction — wan_apac. |
| Business Purpose | Enable decisions using Prediction — wan_apac. |
| Formula | See semantic measure bound to kpi.ai.prediction.wan_apac |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.prediction_accuracy_pct |
| Example Values | — |
| Visualization Mapping | Forecast band |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.predict |

### `kpi.ai.prediction.crm_score` — Prediction — crm_score

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.prediction.crm_score` |
| Business Name | Prediction — crm_score |
| Description | Governed KPI for Prediction — crm_score. |
| Business Purpose | Enable decisions using Prediction — crm_score. |
| Formula | See semantic measure bound to kpi.ai.prediction.crm_score |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.prediction_accuracy_pct |
| Example Values | — |
| Visualization Mapping | Forecast band |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.predict |

### `kpi.ai.prediction.wifi_hq4f` — Prediction — wifi_hq4f

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.prediction.wifi_hq4f` |
| Business Name | Prediction — wifi_hq4f |
| Description | Governed KPI for Prediction — wifi_hq4f. |
| Business Purpose | Enable decisions using Prediction — wifi_hq4f. |
| Formula | See semantic measure bound to kpi.ai.prediction.wifi_hq4f |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.prediction_accuracy_pct |
| Example Values | — |
| Visualization Mapping | Forecast band |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.predict |

### `kpi.ai.prediction.idp_latency` — Prediction — idp_latency

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.ai.prediction.idp_latency` |
| Business Name | Prediction — idp_latency |
| Description | Governed KPI for Prediction — idp_latency. |
| Business Purpose | Enable decisions using Prediction — idp_latency. |
| Formula | See semantic measure bound to kpi.ai.prediction.idp_latency |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.ai.prediction_accuracy_pct |
| Example Values | — |
| Visualization Mapping | Forecast band |
| Related Widgets | w-kpi-* |
| Related Dashboards | ai.predict |

### `kpi.dex.digital_experience_index.office` — DEX — Office

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.office` |
| Business Name | DEX — Office |
| Description | Governed KPI for DEX — Office. |
| Business Purpose | Enable decisions using DEX — Office. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.office |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-location-compare |
| Related Dashboards | D-EXP-01 |

### `kpi.dex.digital_experience_index.hybrid` — DEX — Hybrid

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.hybrid` |
| Business Name | DEX — Hybrid |
| Description | Governed KPI for DEX — Hybrid. |
| Business Purpose | Enable decisions using DEX — Hybrid. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.hybrid |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-location-compare |
| Related Dashboards | D-EXP-01 |

### `kpi.dex.digital_experience_index.remote` — DEX — Remote

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.remote` |
| Business Name | DEX — Remote |
| Description | Governed KPI for DEX — Remote. |
| Business Purpose | Enable decisions using DEX — Remote. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.remote |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-location-compare |
| Related Dashboards | D-EXP-01 |

### `kpi.dex.digital_experience_index.travel` — DEX — Travel

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.travel` |
| Business Name | DEX — Travel |
| Description | Governed KPI for DEX — Travel. |
| Business Purpose | Enable decisions using DEX — Travel. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.travel |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-location-compare |
| Related Dashboards | D-EXP-01 |

### `kpi.dex.digital_experience_index.unknown` — DEX — Unknown

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.unknown` |
| Business Name | DEX — Unknown |
| Description | Governed KPI for DEX — Unknown. |
| Business Purpose | Enable decisions using DEX — Unknown. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.unknown |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exp-location-compare |
| Related Dashboards | D-EXP-01 |

### `kpi.dex.digital_experience_index.bu.engineering` — DEX — BU Engineering

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.bu.engineering` |
| Business Name | DEX — BU Engineering |
| Description | Governed KPI for DEX — BU Engineering. |
| Business Purpose | Enable decisions using DEX — BU Engineering. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.bu.engineering |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-bu-leaderboard |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.bu.sales` — DEX — BU Sales

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.bu.sales` |
| Business Name | DEX — BU Sales |
| Description | Governed KPI for DEX — BU Sales. |
| Business Purpose | Enable decisions using DEX — BU Sales. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.bu.sales |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-bu-leaderboard |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.bu.finance` — DEX — BU Finance

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.bu.finance` |
| Business Name | DEX — BU Finance |
| Description | Governed KPI for DEX — BU Finance. |
| Business Purpose | Enable decisions using DEX — BU Finance. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.bu.finance |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-bu-leaderboard |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.bu.customer_success` — DEX — BU Customer Success

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.bu.customer_success` |
| Business Name | DEX — BU Customer Success |
| Description | Governed KPI for DEX — BU Customer Success. |
| Business Purpose | Enable decisions using DEX — BU Customer Success. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.bu.customer_success |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-bu-leaderboard |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.bu.operations` — DEX — BU Operations

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.bu.operations` |
| Business Name | DEX — BU Operations |
| Description | Governed KPI for DEX — BU Operations. |
| Business Purpose | Enable decisions using DEX — BU Operations. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.bu.operations |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-bu-leaderboard |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.bu.marketing` — DEX — BU Marketing

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.bu.marketing` |
| Business Name | DEX — BU Marketing |
| Description | Governed KPI for DEX — BU Marketing. |
| Business Purpose | Enable decisions using DEX — BU Marketing. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.bu.marketing |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-bu-leaderboard |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.bu.hr` — DEX — BU Hr

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.bu.hr` |
| Business Name | DEX — BU Hr |
| Description | Governed KPI for DEX — BU Hr. |
| Business Purpose | Enable decisions using DEX — BU Hr. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.bu.hr |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-bu-leaderboard |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.bu.legal` — DEX — BU Legal

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.bu.legal` |
| Business Name | DEX — BU Legal |
| Description | Governed KPI for DEX — BU Legal. |
| Business Purpose | Enable decisions using DEX — BU Legal. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.bu.legal |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-bu-leaderboard |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.bu.it` — DEX — BU It

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.bu.it` |
| Business Name | DEX — BU It |
| Description | Governed KPI for DEX — BU It. |
| Business Purpose | Enable decisions using DEX — BU It. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.bu.it |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-bu-leaderboard |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.bu.executive` — DEX — BU Executive

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.bu.executive` |
| Business Name | DEX — BU Executive |
| Description | Governed KPI for DEX — BU Executive. |
| Business Purpose | Enable decisions using DEX — BU Executive. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.bu.executive |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-bu-leaderboard |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.region.amer` — DEX — Region AMER

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.region.amer` |
| Business Name | DEX — Region AMER |
| Description | Governed KPI for DEX — Region AMER. |
| Business Purpose | Enable decisions using DEX — Region AMER. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.region.amer |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-geo-heatmap |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.region.emea` — DEX — Region EMEA

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.region.emea` |
| Business Name | DEX — Region EMEA |
| Description | Governed KPI for DEX — Region EMEA. |
| Business Purpose | Enable decisions using DEX — Region EMEA. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.region.emea |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-geo-heatmap |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.region.apac` — DEX — Region APAC

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.region.apac` |
| Business Name | DEX — Region APAC |
| Description | Governed KPI for DEX — Region APAC. |
| Business Purpose | Enable decisions using DEX — Region APAC. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.region.apac |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-geo-heatmap |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.region.latam` — DEX — Region LATAM

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.region.latam` |
| Business Name | DEX — Region LATAM |
| Description | Governed KPI for DEX — Region LATAM. |
| Business Purpose | Enable decisions using DEX — Region LATAM. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.region.latam |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-geo-heatmap |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.region.anz` — DEX — Region ANZ

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.region.anz` |
| Business Name | DEX — Region ANZ |
| Description | Governed KPI for DEX — Region ANZ. |
| Business Purpose | Enable decisions using DEX — Region ANZ. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.region.anz |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-geo-heatmap |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.region.india` — DEX — Region INDIA

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.region.india` |
| Business Name | DEX — Region INDIA |
| Description | Governed KPI for DEX — Region INDIA. |
| Business Purpose | Enable decisions using DEX — Region INDIA. |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.region.india |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-exec-geo-heatmap |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.digital_experience_index.wow_delta` — Digital Experience Index (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.wow_delta` |
| Business Name | Digital Experience Index (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Digital Experience Index (WoW Δ). |
| Formula | kpi.dex.digital_experience_index current − kpi.dex.digital_experience_index prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-dex, w-exec-dex-score |
| Related Dashboards | D-EXEC-01, D-EXP-01 |

### `kpi.dex.employees_impacted.wow_delta` — Employees Impacted (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.employees_impacted.wow_delta` |
| Business Name | Employees Impacted (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Employees Impacted (WoW Δ). |
| Formula | kpi.dex.employees_impacted current − kpi.dex.employees_impacted prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.employees_impacted |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-impacted |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.coverage_pct.wow_delta` — Telemetry Coverage (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.coverage_pct.wow_delta` |
| Business Name | Telemetry Coverage (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Telemetry Coverage (WoW Δ). |
| Formula | kpi.dex.coverage_pct current − kpi.dex.coverage_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.coverage_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-coverage |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.endpoint_component.wow_delta` — Endpoint Driver Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.endpoint_component.wow_delta` |
| Business Name | Endpoint Driver Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Endpoint Driver Score (WoW Δ). |
| Formula | kpi.dex.endpoint_component current − kpi.dex.endpoint_component prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.endpoint_component |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exec-driver-breakdown |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.application_component.wow_delta` — Application Driver Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.application_component.wow_delta` |
| Business Name | Application Driver Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Application Driver Score (WoW Δ). |
| Formula | kpi.dex.application_component current − kpi.dex.application_component prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.application_component |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exec-driver-breakdown |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.network_collab_component.wow_delta` — Network/Collab Driver Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.network_collab_component.wow_delta` |
| Business Name | Network/Collab Driver Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Network/Collab Driver Score (WoW Δ). |
| Formula | kpi.dex.network_collab_component current − kpi.dex.network_collab_component prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.network_collab_component |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exec-driver-breakdown |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.sentiment_component.wow_delta` — Sentiment Driver Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.sentiment_component.wow_delta` |
| Business Name | Sentiment Driver Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Sentiment Driver Score (WoW Δ). |
| Formula | kpi.dex.sentiment_component current − kpi.dex.sentiment_component prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.sentiment_component |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exec-driver-breakdown |
| Related Dashboards | D-EXEC-01 |

### `kpi.exp.journey_success_rate.wow_delta` — Journey Success Rate (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success_rate.wow_delta` |
| Business Name | Journey Success Rate (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Journey Success Rate (WoW Δ). |
| Formula | kpi.exp.journey_success_rate current − kpi.exp.journey_success_rate prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success_rate |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.friction_per_100.wow_delta` — Friction Events / 100 Employees (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.friction_per_100.wow_delta` |
| Business Name | Friction Events / 100 Employees (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Friction Events / 100 Employees (WoW Δ). |
| Formula | kpi.exp.friction_per_100 current − kpi.exp.friction_per_100 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.friction_per_100 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-friction-rate |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.time_to_productivity_min.wow_delta` — Time to Productivity (min) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.time_to_productivity_min.wow_delta` |
| Business Name | Time to Productivity (min) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Time to Productivity (min) (WoW Δ). |
| Formula | kpi.exp.time_to_productivity_min current − kpi.exp.time_to_productivity_min prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.time_to_productivity_min |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-ttp |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab_quality_index.wow_delta` — Collaboration Quality Index (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab_quality_index.wow_delta` |
| Business Name | Collaboration Quality Index (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Collaboration Quality Index (WoW Δ). |
| Formula | kpi.exp.collab_quality_index current − kpi.exp.collab_quality_index prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab_quality_index |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-collab-quality |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.sentiment_score.wow_delta` — Experience Sentiment Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.sentiment_score.wow_delta` |
| Business Name | Experience Sentiment Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Experience Sentiment Score (WoW Δ). |
| Formula | kpi.exp.sentiment_score current − kpi.exp.sentiment_score prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.sentiment_score |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-sentiment-score |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.sentiment_participation_pct.wow_delta` — Pulse Participation (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.sentiment_participation_pct.wow_delta` |
| Business Name | Pulse Participation (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Pulse Participation (WoW Δ). |
| Formula | kpi.exp.sentiment_participation_pct current − kpi.exp.sentiment_participation_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.sentiment_participation_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.journey_success.morning_login.wow_delta` — Journey Success — Morning Login (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.morning_login.wow_delta` |
| Business Name | Journey Success — Morning Login (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Journey Success — Morning Login (WoW Δ). |
| Formula | kpi.exp.journey_success.morning_login current − kpi.exp.journey_success.morning_login prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.morning_login |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.join_meeting.wow_delta` — Journey Success — Join Meeting (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.join_meeting.wow_delta` |
| Business Name | Journey Success — Join Meeting (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Journey Success — Join Meeting (WoW Δ). |
| Formula | kpi.exp.journey_success.join_meeting current − kpi.exp.journey_success.join_meeting prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.join_meeting |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.access_vpn.wow_delta` — Journey Success — Access Vpn (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.access_vpn.wow_delta` |
| Business Name | Journey Success — Access Vpn (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Journey Success — Access Vpn (WoW Δ). |
| Formula | kpi.exp.journey_success.access_vpn current − kpi.exp.journey_success.access_vpn prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.access_vpn |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.open_crm.wow_delta` — Journey Success — Open Crm (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.open_crm.wow_delta` |
| Business Name | Journey Success — Open Crm (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Journey Success — Open Crm (WoW Δ). |
| Formula | kpi.exp.journey_success.open_crm current − kpi.exp.journey_success.open_crm prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.open_crm |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.file_sync.wow_delta` — Journey Success — File Sync (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.file_sync.wow_delta` |
| Business Name | Journey Success — File Sync (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Journey Success — File Sync (WoW Δ). |
| Formula | kpi.exp.journey_success.file_sync current − kpi.exp.journey_success.file_sync prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.file_sync |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.onboarding.wow_delta` — Journey Success — Onboarding (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.onboarding.wow_delta` |
| Business Name | Journey Success — Onboarding (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Journey Success — Onboarding (WoW Δ). |
| Formula | kpi.exp.journey_success.onboarding current − kpi.exp.journey_success.onboarding prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.onboarding |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-journey-funnel |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.collab.join.wow_delta` — Collab Subscore — Join (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.join.wow_delta` |
| Business Name | Collab Subscore — Join (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Collab Subscore — Join (WoW Δ). |
| Formula | kpi.exp.collab.join current − kpi.exp.collab.join prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab.join |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab.audio.wow_delta` — Collab Subscore — Audio (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.audio.wow_delta` |
| Business Name | Collab Subscore — Audio (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Collab Subscore — Audio (WoW Δ). |
| Formula | kpi.exp.collab.audio current − kpi.exp.collab.audio prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab.audio |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab.video.wow_delta` — Collab Subscore — Video (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.video.wow_delta` |
| Business Name | Collab Subscore — Video (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Collab Subscore — Video (WoW Δ). |
| Formula | kpi.exp.collab.video current − kpi.exp.collab.video prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab.video |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab.share.wow_delta` — Collab Subscore — Share (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.share.wow_delta` |
| Business Name | Collab Subscore — Share (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Collab Subscore — Share (WoW Δ). |
| Formula | kpi.exp.collab.share current − kpi.exp.collab.share prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab.share |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.theme_volume.vpn.wow_delta` — Sentiment Theme Volume — vpn (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.vpn.wow_delta` |
| Business Name | Sentiment Theme Volume — vpn (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — vpn (WoW Δ). |
| Formula | kpi.exp.theme_volume.vpn current − kpi.exp.theme_volume.vpn prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.vpn |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.boot.wow_delta` — Sentiment Theme Volume — boot (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.boot.wow_delta` |
| Business Name | Sentiment Theme Volume — boot (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — boot (WoW Δ). |
| Formula | kpi.exp.theme_volume.boot current − kpi.exp.theme_volume.boot prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.boot |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.crm.wow_delta` — Sentiment Theme Volume — crm (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.crm.wow_delta` |
| Business Name | Sentiment Theme Volume — crm (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — crm (WoW Δ). |
| Formula | kpi.exp.theme_volume.crm current − kpi.exp.theme_volume.crm prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.crm |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.meetings.wow_delta` — Sentiment Theme Volume — meetings (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.meetings.wow_delta` |
| Business Name | Sentiment Theme Volume — meetings (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — meetings (WoW Δ). |
| Formula | kpi.exp.theme_volume.meetings current − kpi.exp.theme_volume.meetings prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.meetings |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.laptop_age.wow_delta` — Sentiment Theme Volume — laptop_age (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.laptop_age.wow_delta` |
| Business Name | Sentiment Theme Volume — laptop_age (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — laptop_age (WoW Δ). |
| Formula | kpi.exp.theme_volume.laptop_age current − kpi.exp.theme_volume.laptop_age prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.laptop_age |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.wifi.wow_delta` — Sentiment Theme Volume — wifi (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.wifi.wow_delta` |
| Business Name | Sentiment Theme Volume — wifi (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — wifi (WoW Δ). |
| Formula | kpi.exp.theme_volume.wifi current − kpi.exp.theme_volume.wifi prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.wifi |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.idp.wow_delta` — Sentiment Theme Volume — idp (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.idp.wow_delta` |
| Business Name | Sentiment Theme Volume — idp (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — idp (WoW Δ). |
| Formula | kpi.exp.theme_volume.idp current − kpi.exp.theme_volume.idp prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.idp |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.email.wow_delta` — Sentiment Theme Volume — email (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.email.wow_delta` |
| Business Name | Sentiment Theme Volume — email (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — email (WoW Δ). |
| Formula | kpi.exp.theme_volume.email current − kpi.exp.theme_volume.email prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.email |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.network.wow_delta` — Sentiment Theme Volume — network (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.network.wow_delta` |
| Business Name | Sentiment Theme Volume — network (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — network (WoW Δ). |
| Formula | kpi.exp.theme_volume.network current − kpi.exp.theme_volume.network prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.network |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.vdi.wow_delta` — Sentiment Theme Volume — vdi (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.vdi.wow_delta` |
| Business Name | Sentiment Theme Volume — vdi (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — vdi (WoW Δ). |
| Formula | kpi.exp.theme_volume.vdi current − kpi.exp.theme_volume.vdi prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.vdi |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exp-sentiment-themes |
| Related Dashboards | D-EXP-03 |

### `kpi.end.fleet_health_score.wow_delta` — Fleet Health Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.wow_delta` |
| Business Name | Fleet Health Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Fleet Health Score (WoW Δ). |
| Formula | kpi.end.fleet_health_score current − kpi.end.fleet_health_score prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-end-fleet-score |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_duration_sec.wow_delta` — Boot Duration (sec) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec.wow_delta` |
| Business Name | Boot Duration (sec) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot Duration (sec) (WoW Δ). |
| Formula | kpi.end.boot_duration_sec current − kpi.end.boot_duration_sec prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-end-boot-p90 |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec.wow_delta` — Login Duration (sec) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec.wow_delta` |
| Business Name | Login Duration (sec) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Login Duration (sec) (WoW Δ). |
| Formula | kpi.end.login_duration_sec current − kpi.end.login_duration_sec prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.login_duration_sec |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-end-login-p90 |
| Related Dashboards | D-END-01 |

### `kpi.end.crash_rate.wow_delta` — Crash Rate (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.crash_rate.wow_delta` |
| Business Name | Crash Rate (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Crash Rate (WoW Δ). |
| Formula | kpi.end.crash_rate current − kpi.end.crash_rate prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.crash_rate |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-end-crash-rate |
| Related Dashboards | D-END-02 |

### `kpi.end.hang_rate.wow_delta` — Hang Rate (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.hang_rate.wow_delta` |
| Business Name | Hang Rate (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Hang Rate (WoW Δ). |
| Formula | kpi.end.hang_rate current − kpi.end.hang_rate prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.hang_rate |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-02 |

### `kpi.end.cpu_saturation_pct.wow_delta` — CPU Saturation % (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.cpu_saturation_pct.wow_delta` |
| Business Name | CPU Saturation % (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using CPU Saturation % (WoW Δ). |
| Formula | kpi.end.cpu_saturation_pct current − kpi.end.cpu_saturation_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.cpu_saturation_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-end-performance-heatmap |
| Related Dashboards | D-END-01 |

### `kpi.end.memory_pressure_pct.wow_delta` — Memory Pressure % (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.memory_pressure_pct.wow_delta` |
| Business Name | Memory Pressure % (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Memory Pressure % (WoW Δ). |
| Formula | kpi.end.memory_pressure_pct current − kpi.end.memory_pressure_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.memory_pressure_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-02 |

### `kpi.end.disk_health_score.wow_delta` — Disk Health Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.disk_health_score.wow_delta` |
| Business Name | Disk Health Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Disk Health Score (WoW Δ). |
| Formula | kpi.end.disk_health_score current − kpi.end.disk_health_score prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.disk_health_score |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-end-battery-disk |
| Related Dashboards | D-END-03 |

### `kpi.end.battery_health_pct.wow_delta` — Battery Health % (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.battery_health_pct.wow_delta` |
| Business Name | Battery Health % (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Battery Health % (WoW Δ). |
| Formula | kpi.end.battery_health_pct current − kpi.end.battery_health_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.battery_health_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-03 |

### `kpi.end.compliance_posture_pct.wow_delta` — Compliance Posture % (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance_posture_pct.wow_delta` |
| Business Name | Compliance Posture % (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Compliance Posture % (WoW Δ). |
| Formula | kpi.end.compliance_posture_pct current − kpi.end.compliance_posture_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance_posture_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-end-compliance |
| Related Dashboards | D-END-01 |

### `kpi.end.refresh_priority_score.wow_delta` — Refresh Priority Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.refresh_priority_score.wow_delta` |
| Business Name | Refresh Priority Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Refresh Priority Score (WoW Δ). |
| Formula | kpi.end.refresh_priority_score current − kpi.end.refresh_priority_score prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.refresh_priority_score |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-end-refresh-queue |
| Related Dashboards | D-END-03 |

### `kpi.end.boot_duration_sec.p50.wow_delta` — Boot Duration (P50) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec.p50.wow_delta` |
| Business Name | Boot Duration (P50) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot Duration (P50) (WoW Δ). |
| Formula | kpi.end.boot_duration_sec.p50 current − kpi.end.boot_duration_sec.p50 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec.p50 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec.p50.wow_delta` — Login Duration (P50) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec.p50.wow_delta` |
| Business Name | Login Duration (P50) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Login Duration (P50) (WoW Δ). |
| Formula | kpi.end.login_duration_sec.p50 current − kpi.end.login_duration_sec.p50 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.login_duration_sec.p50 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_duration_sec.p90.wow_delta` — Boot Duration (P90) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec.p90.wow_delta` |
| Business Name | Boot Duration (P90) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot Duration (P90) (WoW Δ). |
| Formula | kpi.end.boot_duration_sec.p90 current − kpi.end.boot_duration_sec.p90 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec.p90 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec.p90.wow_delta` — Login Duration (P90) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec.p90.wow_delta` |
| Business Name | Login Duration (P90) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Login Duration (P90) (WoW Δ). |
| Formula | kpi.end.login_duration_sec.p90 current − kpi.end.login_duration_sec.p90 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.login_duration_sec.p90 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_duration_sec.p95.wow_delta` — Boot Duration (P95) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec.p95.wow_delta` |
| Business Name | Boot Duration (P95) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot Duration (P95) (WoW Δ). |
| Formula | kpi.end.boot_duration_sec.p95 current − kpi.end.boot_duration_sec.p95 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec.p95 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec.p95.wow_delta` — Login Duration (P95) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec.p95.wow_delta` |
| Business Name | Login Duration (P95) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Login Duration (P95) (WoW Δ). |
| Formula | kpi.end.login_duration_sec.p95 current − kpi.end.login_duration_sec.p95 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.login_duration_sec.p95 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.windows11.wow_delta` — Fleet Health — windows11 (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.windows11.wow_delta` |
| Business Name | Fleet Health — windows11 (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Fleet Health — windows11 (WoW Δ). |
| Formula | kpi.end.fleet_health_score.windows11 current − kpi.end.fleet_health_score.windows11 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score.windows11 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.windows10.wow_delta` — Fleet Health — windows10 (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.windows10.wow_delta` |
| Business Name | Fleet Health — windows10 (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Fleet Health — windows10 (WoW Δ). |
| Formula | kpi.end.fleet_health_score.windows10 current − kpi.end.fleet_health_score.windows10 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score.windows10 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.macos.wow_delta` — Fleet Health — macos (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.macos.wow_delta` |
| Business Name | Fleet Health — macos (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Fleet Health — macos (WoW Δ). |
| Formula | kpi.end.fleet_health_score.macos current − kpi.end.fleet_health_score.macos prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score.macos |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.linux.wow_delta` — Fleet Health — linux (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.linux.wow_delta` |
| Business Name | Fleet Health — linux (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Fleet Health — linux (WoW Δ). |
| Formula | kpi.end.fleet_health_score.linux current − kpi.end.fleet_health_score.linux prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score.linux |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.encryption_pct.wow_delta` — Compliance — encryption (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.encryption_pct.wow_delta` |
| Business Name | Compliance — encryption (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Compliance — encryption (WoW Δ). |
| Formula | kpi.end.compliance.encryption_pct current − kpi.end.compliance.encryption_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.encryption_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.patch_pct.wow_delta` — Compliance — patch (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.patch_pct.wow_delta` |
| Business Name | Compliance — patch (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Compliance — patch (WoW Δ). |
| Formula | kpi.end.compliance.patch_pct current − kpi.end.compliance.patch_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.patch_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.av_pct.wow_delta` — Compliance — av (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.av_pct.wow_delta` |
| Business Name | Compliance — av (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Compliance — av (WoW Δ). |
| Formula | kpi.end.compliance.av_pct current − kpi.end.compliance.av_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.av_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.edr_pct.wow_delta` — Compliance — edr (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.edr_pct.wow_delta` |
| Business Name | Compliance — edr (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Compliance — edr (WoW Δ). |
| Formula | kpi.end.compliance.edr_pct current − kpi.end.compliance.edr_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.edr_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.firewall_pct.wow_delta` — Compliance — firewall (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.firewall_pct.wow_delta` |
| Business Name | Compliance — firewall (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Compliance — firewall (WoW Δ). |
| Formula | kpi.end.compliance.firewall_pct current − kpi.end.compliance.firewall_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.firewall_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.secure_boot_pct.wow_delta` — Compliance — secure boot (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.secure_boot_pct.wow_delta` |
| Business Name | Compliance — secure boot (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Compliance — secure boot (WoW Δ). |
| Formula | kpi.end.compliance.secure_boot_pct current − kpi.end.compliance.secure_boot_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.secure_boot_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.disk_encryption_pct.wow_delta` — Compliance — disk encryption (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.disk_encryption_pct.wow_delta` |
| Business Name | Compliance — disk encryption (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Compliance — disk encryption (WoW Δ). |
| Formula | kpi.end.compliance.disk_encryption_pct current − kpi.end.compliance.disk_encryption_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.disk_encryption_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.mdm_enrolled_pct.wow_delta` — Compliance — mdm enrolled (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.mdm_enrolled_pct.wow_delta` |
| Business Name | Compliance — mdm enrolled (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Compliance — mdm enrolled (WoW Δ). |
| Formula | kpi.end.compliance.mdm_enrolled_pct current − kpi.end.compliance.mdm_enrolled_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.mdm_enrolled_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_p90.latitude.wow_delta` — Boot P90 — latitude (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.latitude.wow_delta` |
| Business Name | Boot P90 — latitude (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot P90 — latitude (WoW Δ). |
| Formula | kpi.end.boot_p90.latitude current − kpi.end.boot_p90.latitude prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.latitude |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.elitebook.wow_delta` — Boot P90 — elitebook (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.elitebook.wow_delta` |
| Business Name | Boot P90 — elitebook (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot P90 — elitebook (WoW Δ). |
| Formula | kpi.end.boot_p90.elitebook current − kpi.end.boot_p90.elitebook prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.elitebook |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.macbook_pro.wow_delta` — Boot P90 — macbook_pro (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.macbook_pro.wow_delta` |
| Business Name | Boot P90 — macbook_pro (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot P90 — macbook_pro (WoW Δ). |
| Formula | kpi.end.boot_p90.macbook_pro current − kpi.end.boot_p90.macbook_pro prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.macbook_pro |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.surface.wow_delta` — Boot P90 — surface (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.surface.wow_delta` |
| Business Name | Boot P90 — surface (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot P90 — surface (WoW Δ). |
| Formula | kpi.end.boot_p90.surface current − kpi.end.boot_p90.surface prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.surface |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.thinkpad.wow_delta` — Boot P90 — thinkpad (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.thinkpad.wow_delta` |
| Business Name | Boot P90 — thinkpad (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot P90 — thinkpad (WoW Δ). |
| Formula | kpi.end.boot_p90.thinkpad current − kpi.end.boot_p90.thinkpad prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.thinkpad |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.virtual.wow_delta` — Boot P90 — virtual (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.virtual.wow_delta` |
| Business Name | Boot P90 — virtual (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot P90 — virtual (WoW Δ). |
| Formula | kpi.end.boot_p90.virtual current − kpi.end.boot_p90.virtual prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.virtual |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.xps.wow_delta` — Boot P90 — xps (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.xps.wow_delta` |
| Business Name | Boot P90 — xps (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot P90 — xps (WoW Δ). |
| Formula | kpi.end.boot_p90.xps current − kpi.end.boot_p90.xps prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.xps |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.framework.wow_delta` — Boot P90 — framework (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.framework.wow_delta` |
| Business Name | Boot P90 — framework (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Boot P90 — framework (WoW Δ). |
| Formula | kpi.end.boot_p90.framework current − kpi.end.boot_p90.framework prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.framework |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.app.experience_score.wow_delta` — Application Experience Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.wow_delta` |
| Business Name | Application Experience Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Application Experience Score (WoW Δ). |
| Formula | kpi.app.experience_score current − kpi.app.experience_score prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-detail-score,w-app-portfolio-score |
| Related Dashboards | D-APP-01,D-APP-02 |

### `kpi.app.launch_time_ms.wow_delta` — App Launch Time (ms) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms.wow_delta` |
| Business Name | App Launch Time (ms) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Launch Time (ms) (WoW Δ). |
| Formula | kpi.app.launch_time_ms current − kpi.app.launch_time_ms prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.launch_time_ms |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-launch-trend |
| Related Dashboards | D-APP-02 |

### `kpi.app.hang_rate.wow_delta` — App Hang Rate (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.hang_rate.wow_delta` |
| Business Name | App Hang Rate (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Hang Rate (WoW Δ). |
| Formula | kpi.app.hang_rate current − kpi.app.hang_rate prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.hang_rate |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-hang-error |
| Related Dashboards | D-APP-02 |

### `kpi.app.error_rate_pct.wow_delta` — Client Error Rate % (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.error_rate_pct.wow_delta` |
| Business Name | Client Error Rate % (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Client Error Rate % (WoW Δ). |
| Formula | kpi.app.error_rate_pct current − kpi.app.error_rate_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.error_rate_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-hang-error |
| Related Dashboards | D-APP-02 |

### `kpi.app.adoption_pct.wow_delta` — Adoption % (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.adoption_pct.wow_delta` |
| Business Name | Adoption % (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Adoption % (WoW Δ). |
| Formula | kpi.app.adoption_pct current − kpi.app.adoption_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.adoption_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-adoption |
| Related Dashboards | D-APP-01 |

### `kpi.app.version_health_delta.wow_delta` — Version Health Delta (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.version_health_delta.wow_delta` |
| Business Name | Version Health Delta (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Version Health Delta (WoW Δ). |
| Formula | kpi.app.version_health_delta current − kpi.app.version_health_delta prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.version_health_delta |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-version-compare |
| Related Dashboards | D-APP-02 |

### `kpi.app.dependency_risk_score.wow_delta` — Dependency Risk Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.dependency_risk_score.wow_delta` |
| Business Name | Dependency Risk Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Dependency Risk Score (WoW Δ). |
| Formula | kpi.app.dependency_risk_score current − kpi.app.dependency_risk_score prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.dependency_risk_score |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-dependency-map |
| Related Dashboards | D-APP-02 |

### `kpi.app.launch_time_ms.p50.wow_delta` — App Launch Time (P50) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms.p50.wow_delta` |
| Business Name | App Launch Time (P50) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Launch Time (P50) (WoW Δ). |
| Formula | kpi.app.launch_time_ms.p50 current − kpi.app.launch_time_ms.p50 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.launch_time_ms.p50 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.launch_time_ms.p90.wow_delta` — App Launch Time (P90) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms.p90.wow_delta` |
| Business Name | App Launch Time (P90) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Launch Time (P90) (WoW Δ). |
| Formula | kpi.app.launch_time_ms.p90 current − kpi.app.launch_time_ms.p90 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.launch_time_ms.p90 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.launch_time_ms.p95.wow_delta` — App Launch Time (P95) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms.p95.wow_delta` |
| Business Name | App Launch Time (P95) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Launch Time (P95) (WoW Δ). |
| Formula | kpi.app.launch_time_ms.p95 current − kpi.app.launch_time_ms.p95 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.launch_time_ms.p95 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.portfolio_score.tier0.wow_delta` — Portfolio Experience — tier0 (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.portfolio_score.tier0.wow_delta` |
| Business Name | Portfolio Experience — tier0 (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Portfolio Experience — tier0 (WoW Δ). |
| Formula | kpi.app.portfolio_score.tier0 current − kpi.app.portfolio_score.tier0 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.portfolio_score.tier0 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-01 |

### `kpi.app.portfolio_score.tier1.wow_delta` — Portfolio Experience — tier1 (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.portfolio_score.tier1.wow_delta` |
| Business Name | Portfolio Experience — tier1 (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Portfolio Experience — tier1 (WoW Δ). |
| Formula | kpi.app.portfolio_score.tier1 current − kpi.app.portfolio_score.tier1 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.portfolio_score.tier1 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-01 |

### `kpi.app.portfolio_score.tier2.wow_delta` — Portfolio Experience — tier2 (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.portfolio_score.tier2.wow_delta` |
| Business Name | Portfolio Experience — tier2 (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Portfolio Experience — tier2 (WoW Δ). |
| Formula | kpi.app.portfolio_score.tier2 current − kpi.app.portfolio_score.tier2 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.portfolio_score.tier2 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-01 |

### `kpi.app.portfolio_score.tier3.wow_delta` — Portfolio Experience — tier3 (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.portfolio_score.tier3.wow_delta` |
| Business Name | Portfolio Experience — tier3 (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Portfolio Experience — tier3 (WoW Δ). |
| Formula | kpi.app.portfolio_score.tier3 current − kpi.app.portfolio_score.tier3 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.portfolio_score.tier3 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.crm.wow_delta` — App Experience — crm (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.crm.wow_delta` |
| Business Name | App Experience — crm (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — crm (WoW Δ). |
| Formula | kpi.app.experience_score.crm current − kpi.app.experience_score.crm prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.crm |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.collab.wow_delta` — App Experience — collab (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.collab.wow_delta` |
| Business Name | App Experience — collab (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — collab (WoW Δ). |
| Formula | kpi.app.experience_score.collab current − kpi.app.experience_score.collab prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.collab |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.email.wow_delta` — App Experience — email (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.email.wow_delta` |
| Business Name | App Experience — email (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — email (WoW Δ). |
| Formula | kpi.app.experience_score.email current − kpi.app.experience_score.email prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.email |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.idp.wow_delta` — App Experience — idp (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.idp.wow_delta` |
| Business Name | App Experience — idp (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — idp (WoW Δ). |
| Formula | kpi.app.experience_score.idp current − kpi.app.experience_score.idp prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.idp |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.vpn_client.wow_delta` — App Experience — vpn_client (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.vpn_client.wow_delta` |
| Business Name | App Experience — vpn_client (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — vpn_client (WoW Δ). |
| Formula | kpi.app.experience_score.vpn_client current − kpi.app.experience_score.vpn_client prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.vpn_client |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.erp.wow_delta` — App Experience — erp (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.erp.wow_delta` |
| Business Name | App Experience — erp (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — erp (WoW Δ). |
| Formula | kpi.app.experience_score.erp current − kpi.app.experience_score.erp prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.erp |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.docs.wow_delta` — App Experience — docs (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.docs.wow_delta` |
| Business Name | App Experience — docs (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — docs (WoW Δ). |
| Formula | kpi.app.experience_score.docs current − kpi.app.experience_score.docs prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.docs |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.chat.wow_delta` — App Experience — chat (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.chat.wow_delta` |
| Business Name | App Experience — chat (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — chat (WoW Δ). |
| Formula | kpi.app.experience_score.chat current − kpi.app.experience_score.chat prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.chat |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.expense.wow_delta` — App Experience — expense (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.expense.wow_delta` |
| Business Name | App Experience — expense (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — expense (WoW Δ). |
| Formula | kpi.app.experience_score.expense current − kpi.app.experience_score.expense prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.expense |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.hris.wow_delta` — App Experience — hris (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.hris.wow_delta` |
| Business Name | App Experience — hris (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — hris (WoW Δ). |
| Formula | kpi.app.experience_score.hris current − kpi.app.experience_score.hris prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.hris |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.itportal.wow_delta` — App Experience — itportal (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.itportal.wow_delta` |
| Business Name | App Experience — itportal (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — itportal (WoW Δ). |
| Formula | kpi.app.experience_score.itportal current − kpi.app.experience_score.itportal prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.itportal |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.app.experience_score.design_tool.wow_delta` — App Experience — design_tool (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.design_tool.wow_delta` |
| Business Name | App Experience — design_tool (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using App Experience — design_tool (WoW Δ). |
| Formula | kpi.app.experience_score.design_tool current − kpi.app.experience_score.design_tool prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score.design_tool |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-app-critical-health |
| Related Dashboards | D-APP-01 |

### `kpi.risk.experience_risk_index.wow_delta` — Experience Risk Index (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.risk.experience_risk_index.wow_delta` |
| Business Name | Experience Risk Index (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Experience Risk Index (WoW Δ). |
| Formula | kpi.risk.experience_risk_index current − kpi.risk.experience_risk_index prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.risk.experience_risk_index |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exec-risk-index |
| Related Dashboards | D-EXEC-02 |

### `kpi.risk.productivity_hours_lost.wow_delta` — Productivity Hours Lost (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.risk.productivity_hours_lost.wow_delta` |
| Business Name | Productivity Hours Lost (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Productivity Hours Lost (WoW Δ). |
| Formula | kpi.risk.productivity_hours_lost current − kpi.risk.productivity_hours_lost prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.risk.productivity_hours_lost |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exec-hours-lost |
| Related Dashboards | D-EXEC-02 |

### `kpi.risk.initiative_roi_score.wow_delta` — Initiative ROI Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.risk.initiative_roi_score.wow_delta` |
| Business Name | Initiative ROI Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Initiative ROI Score (WoW Δ). |
| Formula | kpi.risk.initiative_roi_score current − kpi.risk.initiative_roi_score prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.risk.initiative_roi_score |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-exec-initiative-roi |
| Related Dashboards | D-EXEC-02 |

### `kpi.infra.network_quality_index.wow_delta` — Network Quality Index (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.network_quality_index.wow_delta` |
| Business Name | Network Quality Index (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Network Quality Index (WoW Δ). |
| Formula | kpi.infra.network_quality_index current − kpi.infra.network_quality_index prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.network_quality_index |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-net-quality |
| Related Dashboards | infra.network |

### `kpi.infra.latency_ms.wow_delta` — Network Latency (ms) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.latency_ms.wow_delta` |
| Business Name | Network Latency (ms) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Network Latency (ms) (WoW Δ). |
| Formula | kpi.infra.latency_ms current − kpi.infra.latency_ms prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.latency_ms |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-latency |
| Related Dashboards | infra.network |

### `kpi.infra.packet_loss_pct.wow_delta` — Packet Loss % (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.packet_loss_pct.wow_delta` |
| Business Name | Packet Loss % (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Packet Loss % (WoW Δ). |
| Formula | kpi.infra.packet_loss_pct current − kpi.infra.packet_loss_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.packet_loss_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-loss |
| Related Dashboards | infra.network |

### `kpi.infra.jitter_ms.wow_delta` — Jitter (ms) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.jitter_ms.wow_delta` |
| Business Name | Jitter (ms) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Jitter (ms) (WoW Δ). |
| Formula | kpi.infra.jitter_ms current − kpi.infra.jitter_ms prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.jitter_ms |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-jitter |
| Related Dashboards | infra.network |

### `kpi.infra.vpn_success_pct.wow_delta` — VPN Connect Success % (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vpn_success_pct.wow_delta` |
| Business Name | VPN Connect Success % (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using VPN Connect Success % (WoW Δ). |
| Formula | kpi.infra.vpn_success_pct current − kpi.infra.vpn_success_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vpn_success_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-vpn-success |
| Related Dashboards | infra.vpn |

### `kpi.infra.vpn_connect_ms.wow_delta` — VPN Connect Time (ms) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vpn_connect_ms.wow_delta` |
| Business Name | VPN Connect Time (ms) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using VPN Connect Time (ms) (WoW Δ). |
| Formula | kpi.infra.vpn_connect_ms current − kpi.infra.vpn_connect_ms prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vpn_connect_ms |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-vpn-connect |
| Related Dashboards | infra.vpn |

### `kpi.infra.vpn_throughput_mbps.wow_delta` — VPN Throughput (Mbps) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vpn_throughput_mbps.wow_delta` |
| Business Name | VPN Throughput (Mbps) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using VPN Throughput (Mbps) (WoW Δ). |
| Formula | kpi.infra.vpn_throughput_mbps current − kpi.infra.vpn_throughput_mbps prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vpn_throughput_mbps |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.vpn |

### `kpi.infra.vpn_auth_failures.wow_delta` — VPN Auth Failures (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vpn_auth_failures.wow_delta` |
| Business Name | VPN Auth Failures (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using VPN Auth Failures (WoW Δ). |
| Formula | kpi.infra.vpn_auth_failures current − kpi.infra.vpn_auth_failures prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vpn_auth_failures |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.vpn |

### `kpi.infra.wifi_quality_index.wow_delta` — Wi‑Fi Quality Index (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_quality_index.wow_delta` |
| Business Name | Wi‑Fi Quality Index (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Wi‑Fi Quality Index (WoW Δ). |
| Formula | kpi.infra.wifi_quality_index current − kpi.infra.wifi_quality_index prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wifi_quality_index |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-wifi-quality |
| Related Dashboards | infra.wifi |

### `kpi.infra.wifi_signal_dbm.wow_delta` — Wi‑Fi Signal (dBm) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_signal_dbm.wow_delta` |
| Business Name | Wi‑Fi Signal (dBm) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Wi‑Fi Signal (dBm) (WoW Δ). |
| Formula | kpi.infra.wifi_signal_dbm current − kpi.infra.wifi_signal_dbm prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wifi_signal_dbm |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-wifi-rssi |
| Related Dashboards | infra.wifi |

### `kpi.infra.wifi_roam_events.wow_delta` — Wi‑Fi Roam Events / Device-Hour (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wifi_roam_events.wow_delta` |
| Business Name | Wi‑Fi Roam Events / Device-Hour (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Wi‑Fi Roam Events / Device-Hour (WoW Δ). |
| Formula | kpi.infra.wifi_roam_events current − kpi.infra.wifi_roam_events prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wifi_roam_events |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-wifi-roam |
| Related Dashboards | infra.wifi |

### `kpi.infra.internet_experience_index.wow_delta` — Internet Experience Index (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.internet_experience_index.wow_delta` |
| Business Name | Internet Experience Index (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Internet Experience Index (WoW Δ). |
| Formula | kpi.infra.internet_experience_index current − kpi.infra.internet_experience_index prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.internet_experience_index |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-inet-index |
| Related Dashboards | infra.internet |

### `kpi.infra.dns_resolve_ms.wow_delta` — DNS Resolve Time (ms) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.dns_resolve_ms.wow_delta` |
| Business Name | DNS Resolve Time (ms) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using DNS Resolve Time (ms) (WoW Δ). |
| Formula | kpi.infra.dns_resolve_ms current − kpi.infra.dns_resolve_ms prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.dns_resolve_ms |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-dns |
| Related Dashboards | infra.internet |

### `kpi.infra.wan_path_score.wow_delta` — WAN Path Score (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wan_path_score.wow_delta` |
| Business Name | WAN Path Score (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using WAN Path Score (WoW Δ). |
| Formula | kpi.infra.wan_path_score current − kpi.infra.wan_path_score prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wan_path_score |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-wan-score |
| Related Dashboards | infra.wan |

### `kpi.infra.wan_utilization_p95.wow_delta` — WAN Utilization P95 % (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.wan_utilization_p95.wow_delta` |
| Business Name | WAN Utilization P95 % (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using WAN Utilization P95 % (WoW Δ). |
| Formula | kpi.infra.wan_utilization_p95 current − kpi.infra.wan_utilization_p95 prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.wan_utilization_p95 |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.wan |

### `kpi.infra.cloud_region_health.wow_delta` — Cloud Region Health (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_region_health.wow_delta` |
| Business Name | Cloud Region Health (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Cloud Region Health (WoW Δ). |
| Formula | kpi.infra.cloud_region_health current − kpi.infra.cloud_region_health prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_region_health |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-cloud-health |
| Related Dashboards | infra.cloud |

### `kpi.infra.cloud_error_budget_pct.wow_delta` — Cloud Error Budget Remaining % (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.cloud_error_budget_pct.wow_delta` |
| Business Name | Cloud Error Budget Remaining % (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Cloud Error Budget Remaining % (WoW Δ). |
| Formula | kpi.infra.cloud_error_budget_pct current − kpi.infra.cloud_error_budget_pct prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.cloud_error_budget_pct |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-cloud-budget |
| Related Dashboards | infra.cloud |

### `kpi.infra.vdi_session_score.wow_delta` — VDI Session Experience (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_session_score.wow_delta` |
| Business Name | VDI Session Experience (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using VDI Session Experience (WoW Δ). |
| Formula | kpi.infra.vdi_session_score current − kpi.infra.vdi_session_score prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vdi_session_score |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-vdi-score |
| Related Dashboards | infra.vdi |

### `kpi.infra.vdi_logon_sec.wow_delta` — VDI Logon Duration (sec) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_logon_sec.wow_delta` |
| Business Name | VDI Logon Duration (sec) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using VDI Logon Duration (sec) (WoW Δ). |
| Formula | kpi.infra.vdi_logon_sec current − kpi.infra.vdi_logon_sec prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vdi_logon_sec |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-vdi-logon |
| Related Dashboards | infra.vdi |

### `kpi.infra.vdi_protocol_latency_ms.wow_delta` — VDI Protocol Latency (ms) (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.vdi_protocol_latency_ms.wow_delta` |
| Business Name | VDI Protocol Latency (ms) (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using VDI Protocol Latency (ms) (WoW Δ). |
| Formula | kpi.infra.vdi_protocol_latency_ms current − kpi.infra.vdi_protocol_latency_ms prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.vdi_protocol_latency_ms |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-kpi-* |
| Related Dashboards | infra.vdi |

### `kpi.infra.dc_health_score.wow_delta` — Data Center Health (WoW Δ)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.infra.dc_health_score.wow_delta` |
| Business Name | Data Center Health (WoW Δ) |
| Description | Week-over-week delta for compare mode. |
| Business Purpose | Enable decisions using Data Center Health (WoW Δ). |
| Formula | kpi.infra.dc_health_score current − kpi.infra.dc_health_score prior week |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | delta |
| Time Grain | hourly |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | 5 min |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.infra.dc_health_score |
| Example Values | — |
| Visualization Mapping | Delta chip |
| Related Widgets | w-infra-dc-health |
| Related Dashboards | infra.datacenter |

### `kpi.dex.digital_experience_index.daily` — Digital Experience Index (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.digital_experience_index.daily` |
| Business Name | Digital Experience Index (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Digital Experience Index (Daily). |
| Formula | See semantic measure bound to kpi.dex.digital_experience_index.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.digital_experience_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXEC-01, D-EXP-01 |

### `kpi.dex.employees_impacted.daily` — Employees Impacted (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.employees_impacted.daily` |
| Business Name | Employees Impacted (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Employees Impacted (Daily). |
| Formula | See semantic measure bound to kpi.dex.employees_impacted.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.employees_impacted |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.coverage_pct.daily` — Telemetry Coverage (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.coverage_pct.daily` |
| Business Name | Telemetry Coverage (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Telemetry Coverage (Daily). |
| Formula | See semantic measure bound to kpi.dex.coverage_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.coverage_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.endpoint_component.daily` — Endpoint Driver Score (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.endpoint_component.daily` |
| Business Name | Endpoint Driver Score (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Endpoint Driver Score (Daily). |
| Formula | See semantic measure bound to kpi.dex.endpoint_component.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.endpoint_component |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.application_component.daily` — Application Driver Score (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.application_component.daily` |
| Business Name | Application Driver Score (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Application Driver Score (Daily). |
| Formula | See semantic measure bound to kpi.dex.application_component.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.application_component |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.network_collab_component.daily` — Network/Collab Driver Score (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.network_collab_component.daily` |
| Business Name | Network/Collab Driver Score (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Network/Collab Driver Score (Daily). |
| Formula | See semantic measure bound to kpi.dex.network_collab_component.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.network_collab_component |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXEC-01 |

### `kpi.dex.sentiment_component.daily` — Sentiment Driver Score (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.dex.sentiment_component.daily` |
| Business Name | Sentiment Driver Score (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Sentiment Driver Score (Daily). |
| Formula | See semantic measure bound to kpi.dex.sentiment_component.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.dex.sentiment_component |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXEC-01 |

### `kpi.exp.journey_success_rate.daily` — Journey Success Rate (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success_rate.daily` |
| Business Name | Journey Success Rate (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Journey Success Rate (Daily). |
| Formula | See semantic measure bound to kpi.exp.journey_success_rate.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success_rate |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.friction_per_100.daily` — Friction Events / 100 Employees (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.friction_per_100.daily` |
| Business Name | Friction Events / 100 Employees (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Friction Events / 100 Employees (Daily). |
| Formula | See semantic measure bound to kpi.exp.friction_per_100.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.friction_per_100 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.time_to_productivity_min.daily` — Time to Productivity (min) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.time_to_productivity_min.daily` |
| Business Name | Time to Productivity (min) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Time to Productivity (min) (Daily). |
| Formula | See semantic measure bound to kpi.exp.time_to_productivity_min.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.time_to_productivity_min |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab_quality_index.daily` — Collaboration Quality Index (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab_quality_index.daily` |
| Business Name | Collaboration Quality Index (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Collaboration Quality Index (Daily). |
| Formula | See semantic measure bound to kpi.exp.collab_quality_index.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab_quality_index |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.sentiment_score.daily` — Experience Sentiment Score (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.sentiment_score.daily` |
| Business Name | Experience Sentiment Score (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Experience Sentiment Score (Daily). |
| Formula | See semantic measure bound to kpi.exp.sentiment_score.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.sentiment_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.sentiment_participation_pct.daily` — Pulse Participation (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.sentiment_participation_pct.daily` |
| Business Name | Pulse Participation (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Pulse Participation (Daily). |
| Formula | See semantic measure bound to kpi.exp.sentiment_participation_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.sentiment_participation_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.journey_success.morning_login.daily` — Journey Success — Morning Login (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.morning_login.daily` |
| Business Name | Journey Success — Morning Login (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Journey Success — Morning Login (Daily). |
| Formula | See semantic measure bound to kpi.exp.journey_success.morning_login.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.morning_login |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.join_meeting.daily` — Journey Success — Join Meeting (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.join_meeting.daily` |
| Business Name | Journey Success — Join Meeting (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Journey Success — Join Meeting (Daily). |
| Formula | See semantic measure bound to kpi.exp.journey_success.join_meeting.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.join_meeting |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.access_vpn.daily` — Journey Success — Access Vpn (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.access_vpn.daily` |
| Business Name | Journey Success — Access Vpn (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Journey Success — Access Vpn (Daily). |
| Formula | See semantic measure bound to kpi.exp.journey_success.access_vpn.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.access_vpn |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.open_crm.daily` — Journey Success — Open Crm (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.open_crm.daily` |
| Business Name | Journey Success — Open Crm (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Journey Success — Open Crm (Daily). |
| Formula | See semantic measure bound to kpi.exp.journey_success.open_crm.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.open_crm |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.file_sync.daily` — Journey Success — File Sync (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.file_sync.daily` |
| Business Name | Journey Success — File Sync (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Journey Success — File Sync (Daily). |
| Formula | See semantic measure bound to kpi.exp.journey_success.file_sync.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.file_sync |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.journey_success.onboarding.daily` — Journey Success — Onboarding (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.journey_success.onboarding.daily` |
| Business Name | Journey Success — Onboarding (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Journey Success — Onboarding (Daily). |
| Formula | See semantic measure bound to kpi.exp.journey_success.onboarding.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.journey_success.onboarding |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-02 |

### `kpi.exp.collab.join.daily` — Collab Subscore — Join (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.join.daily` |
| Business Name | Collab Subscore — Join (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Collab Subscore — Join (Daily). |
| Formula | See semantic measure bound to kpi.exp.collab.join.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab.join |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab.audio.daily` — Collab Subscore — Audio (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.audio.daily` |
| Business Name | Collab Subscore — Audio (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Collab Subscore — Audio (Daily). |
| Formula | See semantic measure bound to kpi.exp.collab.audio.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab.audio |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab.video.daily` — Collab Subscore — Video (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.video.daily` |
| Business Name | Collab Subscore — Video (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Collab Subscore — Video (Daily). |
| Formula | See semantic measure bound to kpi.exp.collab.video.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab.video |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.collab.share.daily` — Collab Subscore — Share (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.collab.share.daily` |
| Business Name | Collab Subscore — Share (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Collab Subscore — Share (Daily). |
| Formula | See semantic measure bound to kpi.exp.collab.share.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.collab.share |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-01 |

### `kpi.exp.theme_volume.vpn.daily` — Sentiment Theme Volume — vpn (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.vpn.daily` |
| Business Name | Sentiment Theme Volume — vpn (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — vpn (Daily). |
| Formula | See semantic measure bound to kpi.exp.theme_volume.vpn.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.vpn |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.boot.daily` — Sentiment Theme Volume — boot (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.boot.daily` |
| Business Name | Sentiment Theme Volume — boot (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — boot (Daily). |
| Formula | See semantic measure bound to kpi.exp.theme_volume.boot.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.boot |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.crm.daily` — Sentiment Theme Volume — crm (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.crm.daily` |
| Business Name | Sentiment Theme Volume — crm (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — crm (Daily). |
| Formula | See semantic measure bound to kpi.exp.theme_volume.crm.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.crm |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.meetings.daily` — Sentiment Theme Volume — meetings (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.meetings.daily` |
| Business Name | Sentiment Theme Volume — meetings (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — meetings (Daily). |
| Formula | See semantic measure bound to kpi.exp.theme_volume.meetings.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.meetings |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.laptop_age.daily` — Sentiment Theme Volume — laptop_age (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.laptop_age.daily` |
| Business Name | Sentiment Theme Volume — laptop_age (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — laptop_age (Daily). |
| Formula | See semantic measure bound to kpi.exp.theme_volume.laptop_age.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.laptop_age |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.wifi.daily` — Sentiment Theme Volume — wifi (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.wifi.daily` |
| Business Name | Sentiment Theme Volume — wifi (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — wifi (Daily). |
| Formula | See semantic measure bound to kpi.exp.theme_volume.wifi.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.wifi |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.idp.daily` — Sentiment Theme Volume — idp (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.idp.daily` |
| Business Name | Sentiment Theme Volume — idp (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — idp (Daily). |
| Formula | See semantic measure bound to kpi.exp.theme_volume.idp.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.idp |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.email.daily` — Sentiment Theme Volume — email (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.email.daily` |
| Business Name | Sentiment Theme Volume — email (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — email (Daily). |
| Formula | See semantic measure bound to kpi.exp.theme_volume.email.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.email |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.network.daily` — Sentiment Theme Volume — network (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.network.daily` |
| Business Name | Sentiment Theme Volume — network (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — network (Daily). |
| Formula | See semantic measure bound to kpi.exp.theme_volume.network.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.network |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.exp.theme_volume.vdi.daily` — Sentiment Theme Volume — vdi (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.exp.theme_volume.vdi.daily` |
| Business Name | Sentiment Theme Volume — vdi (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Sentiment Theme Volume — vdi (Daily). |
| Formula | See semantic measure bound to kpi.exp.theme_volume.vdi.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.exp.theme_volume.vdi |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-EXP-03 |

### `kpi.end.fleet_health_score.daily` — Fleet Health Score (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.daily` |
| Business Name | Fleet Health Score (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Fleet Health Score (Daily). |
| Formula | See semantic measure bound to kpi.end.fleet_health_score.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_duration_sec.daily` — Boot Duration (sec) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec.daily` |
| Business Name | Boot Duration (sec) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot Duration (sec) (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_duration_sec.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec.daily` — Login Duration (sec) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec.daily` |
| Business Name | Login Duration (sec) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Login Duration (sec) (Daily). |
| Formula | See semantic measure bound to kpi.end.login_duration_sec.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.login_duration_sec |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.crash_rate.daily` — Crash Rate (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.crash_rate.daily` |
| Business Name | Crash Rate (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Crash Rate (Daily). |
| Formula | See semantic measure bound to kpi.end.crash_rate.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.crash_rate |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-02 |

### `kpi.end.hang_rate.daily` — Hang Rate (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.hang_rate.daily` |
| Business Name | Hang Rate (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Hang Rate (Daily). |
| Formula | See semantic measure bound to kpi.end.hang_rate.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.hang_rate |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-02 |

### `kpi.end.cpu_saturation_pct.daily` — CPU Saturation % (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.cpu_saturation_pct.daily` |
| Business Name | CPU Saturation % (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using CPU Saturation % (Daily). |
| Formula | See semantic measure bound to kpi.end.cpu_saturation_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.cpu_saturation_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.memory_pressure_pct.daily` — Memory Pressure % (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.memory_pressure_pct.daily` |
| Business Name | Memory Pressure % (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Memory Pressure % (Daily). |
| Formula | See semantic measure bound to kpi.end.memory_pressure_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.memory_pressure_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-02 |

### `kpi.end.disk_health_score.daily` — Disk Health Score (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.disk_health_score.daily` |
| Business Name | Disk Health Score (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Disk Health Score (Daily). |
| Formula | See semantic measure bound to kpi.end.disk_health_score.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.disk_health_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-03 |

### `kpi.end.battery_health_pct.daily` — Battery Health % (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.battery_health_pct.daily` |
| Business Name | Battery Health % (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Battery Health % (Daily). |
| Formula | See semantic measure bound to kpi.end.battery_health_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.battery_health_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-03 |

### `kpi.end.compliance_posture_pct.daily` — Compliance Posture % (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance_posture_pct.daily` |
| Business Name | Compliance Posture % (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Compliance Posture % (Daily). |
| Formula | See semantic measure bound to kpi.end.compliance_posture_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance_posture_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.refresh_priority_score.daily` — Refresh Priority Score (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.refresh_priority_score.daily` |
| Business Name | Refresh Priority Score (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Refresh Priority Score (Daily). |
| Formula | See semantic measure bound to kpi.end.refresh_priority_score.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.refresh_priority_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-03 |

### `kpi.end.boot_duration_sec.p50.daily` — Boot Duration (P50) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec.p50.daily` |
| Business Name | Boot Duration (P50) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot Duration (P50) (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_duration_sec.p50.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec.p50 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec.p50.daily` — Login Duration (P50) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec.p50.daily` |
| Business Name | Login Duration (P50) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Login Duration (P50) (Daily). |
| Formula | See semantic measure bound to kpi.end.login_duration_sec.p50.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.login_duration_sec.p50 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_duration_sec.p90.daily` — Boot Duration (P90) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec.p90.daily` |
| Business Name | Boot Duration (P90) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot Duration (P90) (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_duration_sec.p90.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec.p90 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec.p90.daily` — Login Duration (P90) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec.p90.daily` |
| Business Name | Login Duration (P90) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Login Duration (P90) (Daily). |
| Formula | See semantic measure bound to kpi.end.login_duration_sec.p90.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.login_duration_sec.p90 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_duration_sec.p95.daily` — Boot Duration (P95) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_duration_sec.p95.daily` |
| Business Name | Boot Duration (P95) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot Duration (P95) (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_duration_sec.p95.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_duration_sec.p95 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.login_duration_sec.p95.daily` — Login Duration (P95) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.login_duration_sec.p95.daily` |
| Business Name | Login Duration (P95) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Login Duration (P95) (Daily). |
| Formula | See semantic measure bound to kpi.end.login_duration_sec.p95.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.login_duration_sec.p95 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.windows11.daily` — Fleet Health — windows11 (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.windows11.daily` |
| Business Name | Fleet Health — windows11 (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Fleet Health — windows11 (Daily). |
| Formula | See semantic measure bound to kpi.end.fleet_health_score.windows11.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score.windows11 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.windows10.daily` — Fleet Health — windows10 (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.windows10.daily` |
| Business Name | Fleet Health — windows10 (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Fleet Health — windows10 (Daily). |
| Formula | See semantic measure bound to kpi.end.fleet_health_score.windows10.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score.windows10 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.macos.daily` — Fleet Health — macos (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.macos.daily` |
| Business Name | Fleet Health — macos (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Fleet Health — macos (Daily). |
| Formula | See semantic measure bound to kpi.end.fleet_health_score.macos.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score.macos |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.fleet_health_score.linux.daily` — Fleet Health — linux (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.fleet_health_score.linux.daily` |
| Business Name | Fleet Health — linux (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Fleet Health — linux (Daily). |
| Formula | See semantic measure bound to kpi.end.fleet_health_score.linux.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.fleet_health_score.linux |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.encryption_pct.daily` — Compliance — encryption (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.encryption_pct.daily` |
| Business Name | Compliance — encryption (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Compliance — encryption (Daily). |
| Formula | See semantic measure bound to kpi.end.compliance.encryption_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.encryption_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.patch_pct.daily` — Compliance — patch (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.patch_pct.daily` |
| Business Name | Compliance — patch (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Compliance — patch (Daily). |
| Formula | See semantic measure bound to kpi.end.compliance.patch_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.patch_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.av_pct.daily` — Compliance — av (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.av_pct.daily` |
| Business Name | Compliance — av (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Compliance — av (Daily). |
| Formula | See semantic measure bound to kpi.end.compliance.av_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.av_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.edr_pct.daily` — Compliance — edr (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.edr_pct.daily` |
| Business Name | Compliance — edr (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Compliance — edr (Daily). |
| Formula | See semantic measure bound to kpi.end.compliance.edr_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.edr_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.firewall_pct.daily` — Compliance — firewall (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.firewall_pct.daily` |
| Business Name | Compliance — firewall (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Compliance — firewall (Daily). |
| Formula | See semantic measure bound to kpi.end.compliance.firewall_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.firewall_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.secure_boot_pct.daily` — Compliance — secure boot (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.secure_boot_pct.daily` |
| Business Name | Compliance — secure boot (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Compliance — secure boot (Daily). |
| Formula | See semantic measure bound to kpi.end.compliance.secure_boot_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.secure_boot_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.disk_encryption_pct.daily` — Compliance — disk encryption (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.disk_encryption_pct.daily` |
| Business Name | Compliance — disk encryption (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Compliance — disk encryption (Daily). |
| Formula | See semantic measure bound to kpi.end.compliance.disk_encryption_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.disk_encryption_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.compliance.mdm_enrolled_pct.daily` — Compliance — mdm enrolled (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.compliance.mdm_enrolled_pct.daily` |
| Business Name | Compliance — mdm enrolled (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Compliance — mdm enrolled (Daily). |
| Formula | See semantic measure bound to kpi.end.compliance.mdm_enrolled_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.compliance.mdm_enrolled_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01 |

### `kpi.end.boot_p90.latitude.daily` — Boot P90 — latitude (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.latitude.daily` |
| Business Name | Boot P90 — latitude (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot P90 — latitude (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_p90.latitude.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.latitude |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.elitebook.daily` — Boot P90 — elitebook (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.elitebook.daily` |
| Business Name | Boot P90 — elitebook (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot P90 — elitebook (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_p90.elitebook.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.elitebook |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.macbook_pro.daily` — Boot P90 — macbook_pro (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.macbook_pro.daily` |
| Business Name | Boot P90 — macbook_pro (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot P90 — macbook_pro (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_p90.macbook_pro.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.macbook_pro |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.surface.daily` — Boot P90 — surface (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.surface.daily` |
| Business Name | Boot P90 — surface (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot P90 — surface (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_p90.surface.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.surface |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.thinkpad.daily` — Boot P90 — thinkpad (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.thinkpad.daily` |
| Business Name | Boot P90 — thinkpad (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot P90 — thinkpad (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_p90.thinkpad.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.thinkpad |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.virtual.daily` — Boot P90 — virtual (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.virtual.daily` |
| Business Name | Boot P90 — virtual (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot P90 — virtual (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_p90.virtual.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.virtual |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.xps.daily` — Boot P90 — xps (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.xps.daily` |
| Business Name | Boot P90 — xps (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot P90 — xps (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_p90.xps.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.xps |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.end.boot_p90.framework.daily` — Boot P90 — framework (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.end.boot_p90.framework.daily` |
| Business Name | Boot P90 — framework (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Boot P90 — framework (Daily). |
| Formula | See semantic measure bound to kpi.end.boot_p90.framework.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.end.boot_p90.framework |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-END-01,D-END-03 |

### `kpi.app.experience_score.daily` — Application Experience Score (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.experience_score.daily` |
| Business Name | Application Experience Score (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Application Experience Score (Daily). |
| Formula | See semantic measure bound to kpi.app.experience_score.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.experience_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-01,D-APP-02 |

### `kpi.app.launch_time_ms.daily` — App Launch Time (ms) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms.daily` |
| Business Name | App Launch Time (ms) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using App Launch Time (ms) (Daily). |
| Formula | See semantic measure bound to kpi.app.launch_time_ms.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.launch_time_ms |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.hang_rate.daily` — App Hang Rate (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.hang_rate.daily` |
| Business Name | App Hang Rate (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using App Hang Rate (Daily). |
| Formula | See semantic measure bound to kpi.app.hang_rate.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.hang_rate |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.error_rate_pct.daily` — Client Error Rate % (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.error_rate_pct.daily` |
| Business Name | Client Error Rate % (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Client Error Rate % (Daily). |
| Formula | See semantic measure bound to kpi.app.error_rate_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.error_rate_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.adoption_pct.daily` — Adoption % (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.adoption_pct.daily` |
| Business Name | Adoption % (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Adoption % (Daily). |
| Formula | See semantic measure bound to kpi.app.adoption_pct.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.adoption_pct |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-01 |

### `kpi.app.version_health_delta.daily` — Version Health Delta (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.version_health_delta.daily` |
| Business Name | Version Health Delta (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Version Health Delta (Daily). |
| Formula | See semantic measure bound to kpi.app.version_health_delta.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.version_health_delta |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.dependency_risk_score.daily` — Dependency Risk Score (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.dependency_risk_score.daily` |
| Business Name | Dependency Risk Score (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using Dependency Risk Score (Daily). |
| Formula | See semantic measure bound to kpi.app.dependency_risk_score.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.dependency_risk_score |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.launch_time_ms.p50.daily` — App Launch Time (P50) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms.p50.daily` |
| Business Name | App Launch Time (P50) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using App Launch Time (P50) (Daily). |
| Formula | See semantic measure bound to kpi.app.launch_time_ms.p50.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.launch_time_ms.p50 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.launch_time_ms.p90.daily` — App Launch Time (P90) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms.p90.daily` |
| Business Name | App Launch Time (P90) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using App Launch Time (P90) (Daily). |
| Formula | See semantic measure bound to kpi.app.launch_time_ms.p90.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.launch_time_ms.p90 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |

### `kpi.app.launch_time_ms.p95.daily` — App Launch Time (P95) (Daily)

| Field | Spec |
|-------|------|
| Unique KPI ID | `kpi.app.launch_time_ms.p95.daily` |
| Business Name | App Launch Time (P95) (Daily) |
| Description | Daily materialization for trending/board packs. |
| Business Purpose | Enable decisions using App Launch Time (P95) (Daily). |
| Formula | See semantic measure bound to kpi.app.launch_time_ms.p95.daily |
| Calculation Logic | Computed in semantic layer per Volume 3B; UI binds by KPI ID. |
| SQL Example | `SELECT /* logical */ measure FROM fact WHERE ts BETWEEN :from AND :to` |
| Aggregation Rules | As declared |
| Dimensions | region, country, bu, dept, location_type |
| Measures | value |
| Time Grain | daily |
| Default Filters | scope + Last 7 days |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |
| Benchmarks | Tenant baseline |
| Alert Rules | Configurable; default WoW regression |
| Drilldowns | Canonical hierarchy |
| Refresh Frequency | Daily |
| Retention | Hot 90d · Warm 13m · Cold 36m |
| Source Systems | AetherDEX pipelines |
| Owner | Domain owner |
| Dependencies | kpi.app.launch_time_ms.p95 |
| Example Values | — |
| Visualization Mapping | KPI card |
| Related Widgets | w-kpi-* |
| Related Dashboards | D-APP-02 |


---

# Metric Crosswalk (selected)

| Session Metric | KPI ID |
|----------------|--------|
| `m.dex.digital_experience_index` | `kpi.dex.digital_experience_index` |
| `m.end.fleet_health_score` | `kpi.end.fleet_health_score` |
| `m.app.experience_score` | `kpi.app.experience_score` |
| `m.infra.network_quality_index` | `kpi.infra.network_quality_index` |
| `m.ops.mttr_minutes` | `kpi.ops.mttr_minutes` |
| `m.ai.avg_confidence` | `kpi.ai.avg_confidence` |

---

*End of Volume 3A · Next: [Volume 3B](Volume-3B-Data-Semantic-Layer.md)*
