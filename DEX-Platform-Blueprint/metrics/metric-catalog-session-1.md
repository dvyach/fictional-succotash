# AetherDEX Metric Catalog — Session 1 Seeds

**Authority:** Senior Data Visualization Expert · Analytics Platform Architect  
**ID format:** `m.{domain}.{snake_name}`  
**Full KPI dictionary:** Session 3 Volume 3A (expands this seed set)

---

## Conventions

| Property | Rule |
|----------|------|
| Score scales | 0–100 unless noted |
| Latency | milliseconds |
| Rates | events per device-hour or percentage — declared per metric |
| Aggregation default | As specified; UI must not silently change aggregation |
| Null handling | Exclude nulls from averages; show coverage % |
| Compare modes | WoW, MoM, vs baseline initiative, vs peer cohort |

---

## Digital Experience Index Family

### `m.dex.digital_experience_index`

| Field | Spec |
|-------|------|
| Display name | Digital Experience Index (DEX) |
| Description | Composite 0–100 score of employee digital experience across endpoint, application, network, and sentiment signals |
| Calculation | Weighted blend: Endpoint 30% + Application 30% + Network/Collab 20% + Sentiment 20% (weights configurable by tenant; defaults above) |
| Aggregation | Employee-weighted mean at any org rollup |
| Dimensions | region, country, bu, dept, location_type, device_os, persona_segment |
| Refresh | 5 min rollup; 1 min for critical segments |
| Retention | Hot 90d detail; warm 13m daily; cold 36m monthly |
| Thresholds | Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55 |

### `m.dex.employees_impacted`

| Field | Spec |
|-------|------|
| Display name | Employees Impacted |
| Description | Count of employees with DEX < 70 in selected window |
| Calculation | Distinct employee_id where DEX < 70 |
| Aggregation | Distinct count |
| Refresh | 5 min |

### `m.dex.score_delta`

| Field | Spec |
|-------|------|
| Display name | DEX Score Change |
| Description | Absolute point change vs comparison period |
| Calculation | DEX_now − DEX_compare |
| Aggregation | Same as DEX |

### `m.dex.coverage_pct`

| Field | Spec |
|-------|------|
| Display name | Telemetry Coverage |
| Description | % of in-scope employees with sufficient signals to compute DEX |
| Calculation | employees_with_dex / employees_in_scope × 100 |
| Threshold | Warn < 85%; Critical < 70% |

---

## Experience Domain

### `m.exp.journey_success_rate`

| Field | Spec |
|-------|------|
| Display name | Journey Success Rate |
| Description | % of completed critical journeys without severe friction events |
| Calculation | successful_journeys / started_journeys × 100 |
| Dimensions | journey_type, region, location_type |

### `m.exp.friction_events_per_100`

| Field | Spec |
|-------|------|
| Display name | Friction Events / 100 Employees |
| Description | Normalized friction event volume |
| Calculation | friction_events / employees × 100 |
| Aggregation | Sum events; mean rate |

### `m.exp.sentiment_nps_proxy`

| Field | Spec |
|-------|------|
| Display name | Experience Sentiment Score |
| Description | 0–100 score derived from in-product pulses + optional survey import |
| Calculation | Normalized promoter/passive/detractor mapping |
| Refresh | Hourly |

### `m.exp.collab_quality_index`

| Field | Spec |
|-------|------|
| Display name | Collaboration Quality Index |
| Description | Composite of meeting join time, A/V quality, screen-share success |
| Calculation | Weighted sub-scores (join 25%, audio 30%, video 25%, share 20%) |

### `m.exp.time_to_productivity_min`

| Field | Spec |
|-------|------|
| Display name | Time to Productivity (min) |
| Description | Minutes from login to first productive app interaction |
| Aggregation | P50 / P90 / P95 selectable; default P90 |

---

## Endpoint Domain

### `m.end.boot_duration_sec`

| Field | Spec |
|-------|------|
| Display name | Boot Duration |
| Unit | seconds |
| Aggregation | P50, P90, P95 |
| Threshold (P90) | Good ≤45s · Fair ≤90s · Poor >90s |

### `m.end.login_duration_sec`

| Field | Spec |
|-------|------|
| Display name | Login Duration |
| Unit | seconds |
| Aggregation | P50, P90, P95 |
| Threshold (P90) | Good ≤20s · Fair ≤45s · Poor >45s |

### `m.end.crash_rate`

| Field | Spec |
|-------|------|
| Display name | Crash Rate |
| Description | OS + critical process crashes per 100 device-hours |
| Calculation | crashes / device_hours × 100 |

### `m.end.cpu_saturation_pct`

| Field | Spec |
|-------|------|
| Display name | CPU Saturation |
| Description | % of time CPU ≥ 85% sustained ≥ 2 minutes |
| Aggregation | Mean of device rates; P90 optional |

### `m.end.memory_pressure_pct`

| Field | Spec |
|-------|------|
| Display name | Memory Pressure |
| Description | % devices experiencing hard memory pressure events in window |

### `m.end.disk_health_score`

| Field | Spec |
|-------|------|
| Display name | Disk Health Score |
| Scale | 0–100 |
| Inputs | Free space, SMART predictors, IOPS latency |

### `m.end.battery_health_pct`

| Field | Spec |
|-------|------|
| Display name | Battery Health |
| Description | Full charge capacity / design capacity × 100 |
| Aggregation | Mean; distribution histogram |

### `m.end.fleet_health_score`

| Field | Spec |
|-------|------|
| Display name | Fleet Health Score |
| Description | Composite of stability, performance, compliance, disk/battery |
| Weights | Stability 35% · Performance 30% · Compliance 20% · Hardware risk 15% |

### `m.end.compliance_posture_pct`

| Field | Spec |
|-------|------|
| Display name | Compliance Posture |
| Description | % devices meeting encryption, patch, AV, EDR baselines |

### `m.end.refresh_priority_score`

| Field | Spec |
|-------|------|
| Display name | Refresh Priority Score |
| Description | Experience-weighted hardware refresh priority (higher = refresh sooner) |
| Inputs | Age, warranty, DEX contribution, crash, battery, disk |

---

## Application Domain

### `m.app.experience_score`

| Field | Spec |
|-------|------|
| Display name | Application Experience Score |
| Scale | 0–100 |
| Inputs | Launch time, hang rate, error rate, frustration signals, network RTT contribution |

### `m.app.launch_time_ms`

| Field | Spec |
|-------|------|
| Display name | App Launch Time |
| Unit | ms |
| Aggregation | P50 / P90 / P95 |

### `m.app.hang_rate`

| Field | Spec |
|-------|------|
| Display name | Hang Rate |
| Description | UI hangs ≥ 3s per 100 active hours |

### `m.app.error_rate_pct`

| Field | Spec |
|-------|------|
| Display name | Client Error Rate |
| Description | % sessions with fatal or blocking client errors |

### `m.app.adoption_pct`

| Field | Spec |
|-------|------|
| Display name | Adoption |
| Description | Active users / entitled users × 100 in window |

### `m.app.version_health_delta`

| Field | Spec |
|-------|------|
| Display name | Version Health Delta |
| Description | Experience score of version N vs N-1 |

### `m.app.dependency_risk_score`

| Field | Spec |
|-------|------|
| Display name | Dependency Risk Score |
| Description | Risk from upstream services / IdP / CDN / network paths impacting clients |

---

## Risk & Investment

### `m.risk.experience_risk_index`

| Field | Spec |
|-------|------|
| Display name | Experience Risk Index |
| Scale | 0–100 (higher = more risk) |
| Inputs | Poor DEX population, trend slope, critical app health, open high-impact incidents |

### `m.risk.productivity_hours_lost`

| Field | Spec |
|-------|------|
| Display name | Estimated Productivity Hours Lost |
| Calculation | Friction minutes modeled × active employees / 60 |
| Note | Model version stamped on every API response |

### `m.inv.initiative_roi_score`

| Field | Spec |
|-------|------|
| Display name | Initiative ROI Score |
| Description | Score lift × population / investment cost normalized 0–100 |

---

## Alerting Metrics

### `m.alert.active_high_impact`

| Field | Spec |
|-------|------|
| Display name | Active High-Impact Alerts |
| Description | Count of open alerts with impact radius ≥ threshold |

### `m.alert.mttr_minutes`

| Field | Spec |
|-------|------|
| Display name | Alert MTTR |
| Unit | minutes |
| Aggregation | Median |

---

## Metric Ownership

| Domain prefix | Product owner | Data owner |
|---------------|---------------|------------|
| `m.dex.*` | DEX Lead | Analytics Platform |
| `m.exp.*` | Experience PM | Experience pipeline |
| `m.end.*` | Endpoint Engineering | Endpoint telemetry |
| `m.app.*` | App Experience PM | Client + synthetic |
| `m.risk.*` / `m.inv.*` | CDO office | Analytics Platform |
| `m.alert.*` | IT Operations | Alerting service |
