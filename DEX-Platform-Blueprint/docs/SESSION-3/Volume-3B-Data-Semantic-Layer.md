# Volume 3B — Data & Semantic Layer

**Product:** AetherDEX  
**Session:** 3  
**Authority:** Data Platform Architect · Analytics Platform Architect  
**Depends on:** Entity models S1/S2 · KPI Dictionary 3A  
**Diagrams:** `architecture/entity-model.mmd`, `event-flow.mmd`, `streaming.mmd`

---

# Document Control

| Version | Status |
|---------|--------|
| 3.0.0 | Complete |

---

# 1. Semantic Architecture Overview

AetherDEX uses a **lakehouse + semantic metrics layer**:

```
Sources → Ingest (batch/stream) → Bronze → Silver (conformed) → Gold facts/dims
                                         → Feature store (AI)
                                         → Semantic API (metrics/KPI bindings)
                                         → Serving cache → Apps
```

| Layer | Tech intent | Contents |
|-------|-------------|----------|
| Bronze | Raw immutable | Landed payloads, CDC, logs |
| Silver | Conformed entities | Cleaned Employee, Device, App, Path… |
| Gold | Analytics | Star/snowflake facts + dims |
| Semantic | Metrics service | KPI IDs, measures, time intel |
| Serving | Redis/CDN/API | Dashboard query results |

---

# 2. Fact Tables (Gold)

| Fact | Grain | Key measures | Partition |
|------|-------|--------------|-----------|
| `fact_dex_employee_hourly` | employee × hour | dex, components, coverage | day |
| `fact_endpoint_device_hourly` | device × hour | boot, login, crash, cpu, mem, disk, battery | day |
| `fact_app_session` | session | launch_ms, hang, errors, rtt | day |
| `fact_journey_instance` | journey instance | success, duration, step fails | day |
| `fact_sentiment_pulse` | pulse | score, themes | day |
| `fact_network_path_minute` | path × minute | latency, loss, jitter, nqi | hour |
| `fact_vpn_session` | vpn session | connect_ms, success, mbps | day |
| `fact_wifi_association_minute` | device×ap×minute | rssi, roam | hour |
| `fact_cloud_resource_minute` | resource × minute | health, errors, latency | hour |
| `fact_vdi_session` | vdi session | logon, protocol_lat, score | day |
| `fact_dc_server_minute` | server × minute | cpu, mem, disk_lat | hour |
| `fact_incident_state` | incident × transition | severity, mtta/mttr contrib | month |
| `fact_alert_state` | alert × transition | impact_radius, noise class | day |
| `fact_automation_run` | job run | success, duration, targets | day |
| `fact_change_event` | change | type, window, linked Δ | month |
| `fact_release_event` | release | app, version, rollback | month |
| `fact_initiative_progress` | initiative × day | dex_delta, spend, roi | month |
| `fact_case_activity` | case × activity | type, actor | month |
| `fact_prediction_daily` | prediction × day | yhat, band, actual | month |
| `fact_insight_lifecycle` | insight × state | confidence, action | day |

---

# 3. Dimension Tables

| Dim | SCD | Notes |
|-----|-----|-------|
| `dim_date` / `dim_time` | — | Time intelligence |
| `dim_organization` | 1 | Tenant |
| `dim_region` / `dim_country` / `dim_site` | 1 | Geo hierarchy |
| `dim_business_unit` / `dim_department` | 2 | Org hierarchy |
| `dim_employee` | 2 | PII classified |
| `dim_manager` | role-play of employee | |
| `dim_device` | 2 | Hostname alias |
| `dim_os` / `dim_image` / `dim_model` | 1 | |
| `dim_application` / `dim_app_version` | 2 | |
| `dim_journey` | 1 | Definitions |
| `dim_network_path` / `dim_vpn_gateway` / `dim_wifi_ap` | 2 | |
| `dim_cloud_resource` | 2 | provider/region/service |
| `dim_vdi_broker` / `dim_vdi_pool` | 2 | |
| `dim_datacenter` / `dim_server` / `dim_storage` | 2 | |
| `dim_service` | 1 | Critical services status wall |
| `dim_incident` / `dim_problem` / `dim_alert` | 2 | ITSM keys |
| `dim_automation_playbook` | 1 | |
| `dim_change` / `dim_release` | 1 | |
| `dim_initiative` | 2 | |
| `dim_case` | 2 | |
| `dim_kpi` | 1 | Dictionary metadata |
| `dim_weight_profile` | 2 | DEX weights versioned |

**Role-playing:** `dim_employee` as actor, manager, assignee, commander.  
**SCD2:** Track `valid_from`/`valid_to`/`is_current` for org, device assignment, app ownership.

---

# 4. Star & Snowflake

- **Stars:** Each fact with conformed dims (date, org scope, primary entity).  
- **Snowflake:** Geo (region→country→site), org (BU→dept→manager→employee), app (app→version), cloud (provider→region→resource).

---

# 5. Hierarchies

```
Geo: Enterprise → Region → Country → Site
Org: Enterprise → BU → Department → Manager → Employee
Tech: Employee → Device → Application → Process → Event
Infra: Path/AP/Gateway/Broker/Server → dependent Sessions/Apps
```

---

# 6. Time Intelligence

| Function | Definition |
|----------|------------|
| WoW / MoM | Prior period aligned by weekday or calendar |
| YTD | Calendar YTD in org timezone |
| Rolling 7/30/90 | Inclusive windows |
| Business hours | Tenant calendar optional |
| Change markers | Annotate from `fact_change_event` |

Default timezone: organization; user override stored in profile.

---

# 7. Calculated Measures (Semantic)

Bound to KPI IDs in Volume 3A. Examples:

- `dex_emp_weighted = SUM(dex * emp_weight) / SUM(emp_weight)`  
- `crash_rate = 100 * SUM(crashes) / NULLIF(SUM(device_hours),0)`  
- `sla_attainment = SUM(met) / NULLIF(SUM(eligible),0)`  

Measures declare: aggregation, null policy, coverage requirement, compare behavior.

---

# 8. Business Glossary (Semantic)

Terms inherit [`glossary/glossary.md`](../../glossary/glossary.md). Additional Session 3 terms: Bronze/Silver/Gold, SCD2, Evidence Pack seal, Weight Profile, Error Budget, Twin Drift.

---

# 9. Entity Relationships

See `architecture/entity-model.mmd` and Session 1–2 entity docs. Cardinalities unchanged; Session 3 adds physical keys and FK constraints in Gold.

---

# 10. Metadata & Lineage

| Store | Content |
|-------|---------|
| Metric registry | KPI ID → SQL/measure → owner → freshness SLO |
| OpenLineage / equivalent | Job→dataset edges |
| Column catalog | Classification (PII, confidential, public) |
| Schema registry | Stream contracts |

Lineage UI (admin): KPI → Gold fact → Silver entity → Bronze source.

---

# 11. Data Quality Rules

| Rule | Example | Action |
|------|---------|--------|
| Completeness | coverage ≥ warn | Surface coverage KPI |
| Freshness | rollup lag < 5 min | Degrade UI banner |
| Validity | DEX in 0–100 | Quarantine rows |
| Uniqueness | session_id unique | Dedup job |
| Referential | device_id ∈ dim_device | Dead-letter + repair |
| Anomaly | z-score > 3 on rates | DQ alert |

Validation gates block Gold publish on critical failures.

---

# 12. Data Contracts

Producer contracts (Avro/JSON Schema) for:

- Endpoint agent events  
- App session beacons  
- Network path probes  
- ITSM incident CDC  
- Cloud health adapters  

Consumers versioned; breaking changes require major contract version + dual publish window.

---

# 13. Streaming vs Historical vs Snapshot

| Model | Use |
|-------|-----|
| Streaming | Alerts, path minute, NOC wall, case comments |
| Historical facts | Trends, ROI, board packs |
| Snapshots | Daily dim SCD2; inventory; entitlement counts |
| Incremental refresh | Merge by watermark `updated_at` / partition |

---

# 14. Caching Strategy

| Tier | TTL | Key |
|------|-----|-----|
| Semantic query cache | 30–120s | tenant + kpi + scope hash + time |
| Redis hot | 60s | Command center aggregates |
| CDN | static design assets | |
| Client SWR | stale-while-revalidate | |

Invalidate on: filter change, manual refresh, incident Sev1 open (scoped).

---

# 15. Partitioning & Retention

| Class | Partition | Hot | Warm | Cold |
|-------|-----------|-----|------|------|
| High-vol telemetry | day/hour | 90d | 13m | 36m |
| ITSM / cases | month | 13m | 36m | 7y (policy) |
| Predictions | month | 13m | 36m | 36m |

Tenant may tighten; UI surfaces effective retention on export.

---

# 16. Master & Reference Data

| Domain | Master system |
|--------|---------------|
| Employee / Org | HRIS / Entra ID |
| Device inventory | MDM / CMDB |
| Applications | AetherDEX app registry + CMDB |
| Services | Status wall service catalog |
| Geo | ISO + tenant sites |
| KPI dictionary | AetherDEX metric registry |

---

# 17. Semantic APIs

```
GET /api/v1/metrics/{kpiId}/summary
GET /api/v1/metrics/{kpiId}/timeseries
GET /api/v1/metrics/{kpiId}/breakdown
GET /api/v1/catalog/kpis
GET /api/v1/lineage/kpi/{kpiId}
```

Response always includes: `meta.coverage`, `meta.freshness`, `meta.query_id`, `meta.weight_profile_id` (when DEX).

---

# 18. Governance

- Steward per domain (see KPI owners)  
- Change advisory for weight profiles  
- PII access via entitlements (Volume 3F)  
- DQ score published per tenant weekly  

---

# 19. ETL / ELT Pattern

- **ELT preferred** into lakehouse; transform in Silver/Gold dbt-style models.  
- **ETL** allowed for constrained ITSM/cloud adapters with PII minimization at edge.  
- Streaming enrich (Kafka) → Silver micro-batch.

---

*End of Volume 3B · Next: [Volume 3C](Volume-3C-Enterprise-Design-System.md)*
