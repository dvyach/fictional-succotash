# AetherDEX Metric Catalog — Session 2 Seeds

**Builds on:** [`metric-catalog-session-1.md`](metric-catalog-session-1.md)  
**ID format:** `m.{domain}.{snake_name}`

---

## Infrastructure

| Metric ID | Display name | Unit / scale | Notes |
|-----------|--------------|--------------|-------|
| `m.infra.network_quality_index` | Network Quality Index | 0–100 | Latency, loss, jitter composite |
| `m.infra.latency_ms` | Network Latency | ms | P50/P90/P95 |
| `m.infra.packet_loss_pct` | Packet Loss | % | |
| `m.infra.jitter_ms` | Jitter | ms | |
| `m.infra.vpn_success_pct` | VPN Connect Success | % | |
| `m.infra.vpn_connect_ms` | VPN Connect Time | ms | P90 |
| `m.infra.vpn_throughput_mbps` | VPN Throughput | Mbps | |
| `m.infra.wifi_signal_dbm` | Wi‑Fi Signal | dBm | |
| `m.infra.wifi_roam_events` | Wi‑Fi Roam Events | count | per device-hour |
| `m.infra.wifi_quality_index` | Wi‑Fi Quality Index | 0–100 | |
| `m.infra.internet_experience_index` | Internet Experience Index | 0–100 | Client egress quality |
| `m.infra.dns_resolve_ms` | DNS Resolve Time | ms | |
| `m.infra.wan_path_score` | WAN Path Score | 0–100 | |
| `m.infra.cloud_region_health` | Cloud Region Health | 0–100 | Per provider region |
| `m.infra.cloud_error_budget_pct` | Cloud Error Budget Remaining | % | |
| `m.infra.vdi_logon_sec` | VDI Logon Duration | s | P90 |
| `m.infra.vdi_session_score` | VDI Session Experience | 0–100 | |
| `m.infra.vdi_protocol_latency_ms` | VDI Protocol Latency | ms | ICA/RDP/Blast |
| `m.infra.dc_health_score` | Data Center Health | 0–100 | |
| `m.infra.storage_latency_ms` | Storage Latency | ms | |
| `m.infra.server_cpu_pct` | Server CPU | % | |
| `m.infra.capacity_risk_index` | Capacity Risk Index | 0–100 higher=worse | |
| `m.infra.forecast_breach_days` | Days to Capacity Breach | days | Model-stamped |

---

## Operations

| Metric ID | Display name | Notes |
|-----------|--------------|-------|
| `m.ops.open_incidents` | Open Incidents | By severity |
| `m.ops.mttr_minutes` | MTTR | Median |
| `m.ops.mtta_minutes` | MTTA | Median acknowledge |
| `m.ops.major_incident_count` | Major Incidents | Active + 30d |
| `m.ops.alert_noise_ratio` | Alert Noise Ratio | Flapping / total |
| `m.ops.automation_success_pct` | Automation Success | |
| `m.ops.automation_queue_depth` | Automation Queue Depth | |
| `m.ops.remote_action_success_pct` | Remote Action Success | |
| `m.ops.sla_attainment_pct` | SLA Attainment | |
| `m.ops.ticket_volume` | Ticket Volume | |
| `m.ops.deflection_pct` | Ticket Deflection | Via automation/self-help |
| `m.ops.change_failure_pct` | Change Failure Rate | |
| `m.ops.release_rollback_pct` | Release Rollback Rate | |
| `m.ops.business_impact_score` | Business Impact Score | 0–100 |
| `m.ops.system_availability_pct` | System Availability | |

---

## AI

| Metric ID | Display name | Notes |
|-----------|--------------|-------|
| `m.ai.insight_count` | Active Insights | |
| `m.ai.avg_confidence` | Avg Insight Confidence | % |
| `m.ai.action_conversion_pct` | Insight→Action Conversion | 7d |
| `m.ai.prediction_accuracy_pct` | Prediction Accuracy | Rolling |
| `m.ai.rca_precision_pct` | RCA Precision | Human-validated |
| `m.ai.recommendation_accept_pct` | Recommendation Accept Rate | |
| `m.ai.copilot_resolution_pct` | Copilot Assisted Resolution | |
| `m.ai.graph_coverage_pct` | Knowledge Graph Coverage | Entities linked |

---

## Investigation

| Metric ID | Display name | Notes |
|-----------|--------------|-------|
| `m.inv.open_cases` | Open Investigation Cases | |
| `m.inv.median_case_minutes` | Median Case Duration | |
| `m.inv.evidence_pack_count` | Evidence Packs Attached | |
| `m.inv.collab_participants` | Collab Participants / Case | Avg |

---

## Ownership

| Prefix | Product owner | Data owner |
|--------|---------------|------------|
| `m.infra.*` | Infrastructure PM | Network/Cloud telemetry |
| `m.ops.*` | IT Operations | Alerting + ITSM sync |
| `m.ai.*` | AI Product | Insight / model services |
| `m.inv.*` | Investigation PM | Case service |
