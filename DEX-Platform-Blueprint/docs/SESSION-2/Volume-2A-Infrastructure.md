# Volume 2A — Infrastructure Intelligence

**Product:** AetherDEX  
**Session:** 2  
**Depends on:** Session 1 Volumes 1A–1E · [IA S2](../../navigation/information-architecture-session-2.md) · [Metrics S2](../../metrics/metric-catalog-session-2.md) · [Entities S2](../../architecture/entity-model-session-2.md) · [Tokens](../../design-system/tokens.md)  
**Mockups:** [`mockups/infrastructure/`](../../mockups/infrastructure/)  
**Widget prefix:** `w-infra-*`

---

# Document Control

| Version | Status |
|---------|--------|
| 2.0.0 | Complete — Session 2 Volume 2A |

**Consistency:** Design tokens, DEX drilldown grammar, AI insight card contract, shell filters, and naming conventions inherit Session 1 without modification. Infrastructure explains *contribution* to experience — it does not replace Experience/Endpoint/App north stars.

---

# Shared Framework (All 2A Dashboards)

Every Infrastructure dashboard implements the sections below. Dashboard-specific content follows in Parts A–H.

## Shared Purpose Pattern

Measure and explain infrastructure contribution to Digital Employee Experience across network paths, VPN, Wi‑Fi, internet egress, WAN, cloud regions, VDI brokers, and data centers — with AI insights and recommended actions.

## Shared Audience

| Primary | Secondary |
|---------|-----------|
| Network / Cloud / VDI engineers | P5 Ops, P2 DEX Lead, P7 SRE |
| Infrastructure architects | P4 App owners (dependency context) |

## Shared Filters

| Layer | Filters |
|-------|---------|
| Global | Scope, Time, Timezone, Compare |
| Domain | Provider / broker / site / path type / circuit / SSID / region |
| Widget | Metric toggle, severity, healthy-hide |
| Relative | 15m, 1h, 6h, 24h, 7d, 30d |
| Absolute | ≤ 90d high-res; longer for capacity forecasts |
| Saved | Per-role templates |

## Shared Layout Grammar

| Viewport | Structure |
|----------|-----------|
| **1920×1080** | KPI row → primary viz (7) + list/AI (5) → secondary analytics |
| **1440×900** | Same; denser padding; AI summaries 2 lines |
| **Responsive** | 12-col; stack below 1024; filter chips horizontal scroll |
| **Light / Dark** | Full token themes; mockups for both |

Mockups are **content-only** (no embedded sidebar/header) — the interactive shell owns chrome.

## Shared Interactions

Hover tooltips + linked highlight · Click cross-filter · Double-click Context Rail / Investigate · Keyboard parity · Touch long-press context · Timeline brush · Cross-filter path↔region↔app dependency.

## Shared Drilldown

```
Enterprise → Region → Site / Path → Device → Application → Process → Event → Timeline → Logs → Automation
```

Infra may enter at **Path / AP / Gateway / CloudResource / VdiBroker / Server** and join Session 1 hierarchy laterally.

## Shared AI Contract

Insight cards: claim, confidence, impact radius (employees/devices/apps/paths), evidence, recommendation, actions (Investigate · Automate · Ticket · Dismiss). Predictions for capacity/breach stamped with model version.

## Shared Engineering

| Concern | Spec |
|---------|------|
| REST | `/api/v1/infra/{domain}/summary\|timeseries\|breakdown` |
| Streaming | Optional SSE for path health ≤1m; Session 2 poll 15–60s default |
| Caching | 30–120s by volatility |
| State | URL filters; deep links preserve Session 1 context keys |
| a11y | WCAG 2.2 AA; chart data tables; status≠color alone |
| Perf | KPI priority fetch; topology virtualize >200 nodes |

---

# Widget Registry — Infrastructure

| Widget ID | Name | Primary metric |
|-----------|------|----------------|
| `w-infra-net-quality` | Network Quality KPI | `m.infra.network_quality_index` |
| `w-infra-latency` | Latency KPI | `m.infra.latency_ms` |
| `w-infra-loss` | Packet Loss KPI | `m.infra.packet_loss_pct` |
| `w-infra-jitter` | Jitter KPI | `m.infra.jitter_ms` |
| `w-infra-path-trend` | Path Quality Trend | network quality |
| `w-infra-path-table` | Degraded Paths Table | path scores |
| `w-infra-site-heatmap` | Site Latency Heatmap | latency |
| `w-infra-vpn-success` | VPN Success KPI | `m.infra.vpn_success_pct` |
| `w-infra-vpn-connect` | VPN Connect P90 | `m.infra.vpn_connect_ms` |
| `w-infra-vpn-sessions` | Active VPN Sessions | count |
| `w-infra-vpn-gateway` | Gateway Load Bars | utilization |
| `w-infra-wifi-quality` | Wi‑Fi Quality KPI | `m.infra.wifi_quality_index` |
| `w-infra-wifi-rssi` | RSSI KPI | `m.infra.wifi_signal_dbm` |
| `w-infra-wifi-roam` | Roam Events KPI | `m.infra.wifi_roam_events` |
| `w-infra-wifi-floor` | Floor/Site Quality Map | wifi quality |
| `w-infra-inet-index` | Internet Experience KPI | `m.infra.internet_experience_index` |
| `w-infra-dns` | DNS P90 KPI | `m.infra.dns_resolve_ms` |
| `w-infra-isp-table` | ISP Quality Table | ISP scores |
| `w-infra-wan-score` | WAN Path Score KPI | `m.infra.wan_path_score` |
| `w-infra-wan-topology` | Circuit Topology | path health |
| `w-infra-cloud-health` | Multi-Cloud Health KPI | `m.infra.cloud_region_health` |
| `w-infra-cloud-budget` | Error Budget KPI | `m.infra.cloud_error_budget_pct` |
| `w-infra-cloud-providers` | Provider Region Cards | per-cloud |
| `w-infra-vdi-score` | VDI Session Score KPI | `m.infra.vdi_session_score` |
| `w-infra-vdi-logon` | VDI Logon P90 | `m.infra.vdi_logon_sec` |
| `w-infra-vdi-platforms` | Platform Compare | brokers |
| `w-infra-dc-health` | DC Health KPI | `m.infra.dc_health_score` |
| `w-infra-storage-lat` | Storage Latency KPI | `m.infra.storage_latency_ms` |
| `w-infra-capacity-risk` | Capacity Risk KPI | `m.infra.capacity_risk_index` |
| `w-infra-capacity-forecast` | Capacity Forecast Chart | `m.infra.forecast_breach_days` |
| `w-infra-ai-insights` | Infrastructure AI Insights | composite |
| `w-infra-recommendations` | Infra Recommendations | composite |

Full per-widget contracts (hover/selection/loading/empty/error/a11y/API/cache) follow Volume 1B KPI/chart patterns and Volume 2E catalog entries. IDs above are canonical — do not fork.

---

# Part A — Network Intelligence

**Route:** `/app/infrastructure/network` · **ID:** `infra.network`  
**Mockups:** `infra-network-{1920|1440}-{dark|light}.svg`

## Purpose
Provide path-centric network quality visibility that explains employee experience degradation attributable to LAN/WAN/edge paths.

## Audience
Network engineering, DEX lead, ops NOC.

## Business Questions
1. What is network quality now vs compare?  
2. Which paths are degraded?  
3. Where is latency/loss/jitter concentrating?  
4. Which employee cohorts are impacted?  
5. What should we fail over or fix first?

## KPIs
`m.infra.network_quality_index`, `m.infra.latency_ms` (P90), `m.infra.packet_loss_pct`, `m.infra.jitter_ms`.

## Filters
Path type, site, DSCP/QoS class, related app criticality.

## Widgets & Layout
KPI×4 → Path Trend (7) + Degraded Paths (5) → Site Heatmap (6) + AI Insights (6).

## Data Sources
Client path probes, edge exporters, SD-WAN controllers, Session facts with network contribution.

## Interactions / Drilldowns
Path row → Context Rail → Device/App sessions on path → Investigate Network case. Heatmap cell sets site scope.

## AI Insights / Recommended Actions
Peering shifts, congestion, asymmetric routing hypotheses; recommend circuit failover, QoS adjust, ticket to carrier.

## Engineering Notes
`GET /api/v1/infra/network/*`; path topology GraphQL optional; 30s refresh for active incidents.

---

# Part B — VPN Analytics

**Route:** `/app/infrastructure/vpn` · **ID:** `infra.vpn`  
**Mockups:** `infra-vpn-{1920|1440}-{dark|light}.svg`

## Purpose
Monitor VPN connect success, connect time, gateway capacity, auth failures, and throughput as drivers of remote/hybrid experience.

## Audience
Remote access / ZTNA engineers, ops, DEX.

## Business Questions
1. Can employees connect reliably?  
2. Which gateways are saturated?  
3. Are auth/MFA failures spiking?  
4. Is split-tunnel policy helping Tier-0 apps?

## KPIs
`m.infra.vpn_success_pct`, `m.infra.vpn_connect_ms`, active sessions, auth failure count.

## Filters
Gateway, protocol, auth method, location_type=remote/travel.

## Widgets & Layout
KPI×4 → Gateway Load (8) + Recommendations/AI (4).

## Data Sources
VPN concentrator telemetry, client VPN plugin, IdP auth logs (correlated).

## Drilldowns
Gateway → sessions → Device/Employee → Event → Automation (scale-out job).

## AI / Actions
Scale pool, investigate MFA timeouts, recommend split-tunnel for Collab Suite.

## Engineering
`/api/v1/infra/vpn/*`; alert when success < 95% or connect P90 SLO breach.

---

# Part C — Wi‑Fi Analytics

**Route:** `/app/infrastructure/wifi` · **ID:** `infra.wifi`  
**Mockups:** `infra-wifi-{1920|1440}-{dark|light}.svg`

## Purpose
Office Wi‑Fi quality by site/floor/AP: signal, roams, sticky clients, experience correlation.

## Audience
Campus network, workplace, DEX.

## Business Questions
1. Which floors hurt experience?  
2. Are sticky clients elevating roams?  
3. Is 5/6 GHz adoption healthy?

## KPIs
`m.infra.wifi_quality_index`, `m.infra.wifi_signal_dbm`, `m.infra.wifi_roam_events`, sticky client count.

## Filters
Site, floor, SSID, band, AP vendor.

## Widgets & Layout
KPI×4 → Floor/Site Quality Map (12) with AP drill table below fold.

## Data Sources
Wireless controllers, client RSSI/roam events, DEX by location_type=office.

## Drilldowns
Floor → AP → Device → Investigate.

## AI / Actions
Channel plan change, AP replace, sticky-client assist remote action.

## Engineering
`/api/v1/infra/wifi/*`; map tiles cached 5 min.

---

# Part D — Internet Experience

**Route:** `/app/infrastructure/internet` · **ID:** `infra.internet`  
**Mockups:** `infra-internet-{1920|1440}-{dark|light}.svg`

## Purpose
Client egress / ISP quality and DNS performance affecting SaaS experience for remote workers.

## Audience
Network, DEX, vendor management.

## Business Questions
1. Which ISPs degrade internet experience?  
2. Is DNS a driver?  
3. Are there active ISP incidents?

## KPIs
`m.infra.internet_experience_index`, `m.infra.dns_resolve_ms`, egress loss, ISP incident count.

## Filters
ISP ASN, country, resolver type.

## Widgets & Layout
KPI×4 → ISP Quality (8) + Active ISP Incidents (4).

## Data Sources
Client egress probes, public DNS timings, ISP status integrations.

## Drilldowns
ISP → impacted employees (aggregate) → App scores for SaaS.

## AI / Actions
Announce ISP incident, temporary DoH policy, route SaaS via preferred path.

## Engineering
Model stamp on ISP incident correlation; `/api/v1/infra/internet/*`.

---

# Part E — WAN Analytics

**Route:** `/app/infrastructure/wan` · **ID:** `infra.wan`  
**Mockups:** `infra-wan-{1920|1440}-{dark|light}.svg`

## Purpose
Enterprise WAN/SD-WAN circuit health, utilization, failover events, hub-spoke topology.

## Audience
WAN engineers, capacity planners, ops.

## Business Questions
1. Which circuits are degraded?  
2. Are failovers increasing?  
3. Where is utilization at risk?

## KPIs
`m.infra.wan_path_score`, degraded circuit count, failover events, utilization P95.

## Filters
Circuit ID, hub, provider, QoS class.

## Widgets & Layout
KPI×4 → Circuit Topology (12).

## Data Sources
SD-WAN orchestrator, SNMP/streaming telemetry, change markers.

## Drilldowns
Circuit node → sites → apps dependent → Investigate.

## AI / Actions
Fail over, raise carrier ticket, bring-up backup circuit automation.

## Engineering
Topology GraphQL; decimate edges for a11y list mode.

---

# Part F — Cloud Infrastructure (Azure / AWS / GCP)

**Route:** `/app/infrastructure/cloud` · **ID:** `infra.cloud`  
**Mockups:** `infra-cloud-{1920|1440}-{dark|light}.svg`

## Purpose
Multi-cloud region health and error budgets linked to Tier-0 application dependencies.

## Audience
Cloud SRE, platform, app owners.

## Business Questions
1. Which cloud regions are degraded?  
2. How much error budget remains?  
3. Which Tier-0 apps are exposed?

## KPIs
`m.infra.cloud_region_health` (rollup), `m.infra.cloud_error_budget_pct`, degraded regions, linked Tier-0 count.

## Filters
Provider, region, service family, linked app.

## Widgets & Layout
KPI×4 → Provider cards Azure/AWS/GCP (4+4+4) with region rows.

## Data Sources
Cloud health APIs, APM/RUM linkage via ApplicationDependency, synthetic checks.

## Drilldowns
Region → dependent apps → App Detail / Investigate · Service Deps.

## AI / Actions
Shift traffic, scale region, communicate status, open major incident if Tier-0 impacted.

## Engineering
Provider adapters normalized to `CloudResource`; never show raw vendor UI patterns.

---

# Part G — Virtual Desktop Infrastructure

**Route:** `/app/infrastructure/vdi` · **ID:** `infra.vdi`  
**Mockups:** `infra-vdi-{1920|1440}-{dark|light}.svg`

## Purpose
Unified experience across Citrix, AVD, Horizon, Windows 365 — logon duration, protocol latency, broker health, session score.

## Audience
EUC/VDI engineering, DEX, ops.

## Business Questions
1. Which broker/platform regresses experience?  
2. Which logon stage is slow?  
3. Are pools saturated?

## KPIs
`m.infra.vdi_session_score`, `m.infra.vdi_logon_sec`, `m.infra.vdi_protocol_latency_ms`, brokers healthy ratio.

## Filters
Broker type, pool, image, protocol.

## Widgets & Layout
KPI×4 → Platform Compare (7) + AI Logon Regression (5).

## Data Sources
Broker APIs, session agents, GPO/profile stage timings, endpoint coupling.

## Drilldowns
Platform → pool → session → Device/User Investigation · compare sessions.

## AI / Actions
Roll back image, fix profile/GPO stage, scale pool B.

## Engineering
Normalize broker types to `VdiBroker`; `/api/v1/infra/vdi/*`.

---

# Part H — Data Center Health, Storage, Servers, Capacity & Forecasting

**Route:** `/app/infrastructure/datacenter` · **ID:** `infra.datacenter`  
**Mockups:** `infra-datacenter-{1920|1440}-{dark|light}.svg`

## Purpose
Facility/server/storage health with capacity risk and days-to-breach forecasting for proactive investment.

## Audience
DC ops, capacity planning, infrastructure leadership.

## Business Questions
1. Is the DC healthy?  
2. Is storage latency impacting workloads?  
3. When do we breach capacity?  
4. Where is risk concentrating?

## KPIs
`m.infra.dc_health_score`, `m.infra.storage_latency_ms`, `m.infra.capacity_risk_index`, `m.infra.forecast_breach_days`.

## Filters
Facility, hall, rack, workload class.

## Widgets & Layout
KPI×4 → Server Health Distribution (6) + Capacity Forecast (6).

## Data Sources
DCIM, server agents, storage arrays, capacity planning model.

## Drilldowns
Server → process/workload → dependent apps → Change window correlation.

## AI / Actions
Reorder capacity initiative, migrate workload, schedule maintenance.

## Engineering
Forecast always model-version stamped; conservative/standard sensitivity for entitled roles.

---

# Cross-Links to Session 1 / 2

| From | To |
|------|----|
| Network/VPN/Wi‑Fi degradation | Experience Overview friction · App Detail |
| Cloud region | Application Dependency Map |
| VDI logon | Endpoint Login / Journey Morning Login |
| Any AI insight | Investigate Case · Ops Alert |
| Capacity forecast | Executive Initiative ROI |

---

# Mockup Index

| Prefix | Dashboard |
|--------|-----------|
| `infra-network-*` | Network Intelligence |
| `infra-vpn-*` | VPN Analytics |
| `infra-wifi-*` | Wi‑Fi Analytics |
| `infra-internet-*` | Internet Experience |
| `infra-wan-*` | WAN Analytics |
| `infra-cloud-*` | Cloud Infrastructure |
| `infra-vdi-*` | VDI |
| `infra-datacenter-*` | Data Center & Capacity |

32 SVGs: 8 dashboards × {1920,1440} × {dark,light}.

---

# Quality Gate (2A)

- [x] No widget ID collisions with Session 1  
- [x] Tokens / AI card / drilldown grammar reused  
- [x] Metrics in Session 2 catalog  
- [x] Entities extended  
- [x] Responsive + dual theme mockups  
- [x] Engineering-ready API shapes  

---

*End of Volume 2A*  
*Next: [Volume 2B — Operations](Volume-2B-Operations.md)*
