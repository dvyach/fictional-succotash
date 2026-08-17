# Document 4 — DEX DATA GAP ANALYSIS

**Status:** implemented · 2026-08-15

For each gap: why it matters, which use cases need it, priority, collection mode, rough storage note, source system.

---

## Priority legend

- **P0** — Without this, cannot credibly sell DEX or prove remediation impact  
- **P1** — Needed for parity with mid-tier DEX buyers  
- **P2** — Advanced / differentiator  
- **P3** — Future / niche

---

## P0 — Must collect

| Data required | Why | Dashboards / use cases | Continuous vs periodic | Freq | Storage implication | Source |
|---------------|-----|------------------------|------------------------|------|---------------------|--------|
| Higher-frequency system CPU / queue | Detect sustained saturation; business-hours issues | Device health, outliers, DEX tech score | Continuous | **≤ 60s** (prefer 15–30s) | High; keep rollups 1m/5m/1h | Endpoint |
| System memory used %, available, commit, page faults | Memory pressure is a top DEX driver | Memory pressure, slow device, root cause | Continuous | ≤ 60s | High | Endpoint |
| Disk latency / queue (not only free %) | Free space ≠ performance | Disk health, app slowness correlation | Continuous | ≤ 60s | Medium–high | Endpoint |
| Boot time + last boot reason | Core DEX (Microsoft/Nexthink table stakes) | Boot performance, stability | On boot + daily | Event | Low | Endpoint |
| Interactive logon duration | Hybrid/office friction | Login experience | On logon | Event | Low | Endpoint |
| Populate / compute `score` (or replace) | Experience score product | Executive DEX, trends | Continuous derived | 5m–1d rollup | Medium | Analytics |
| Business hours calendar per customer/site | Avoid false positives overnight | All experience views | Config | N/A | Low | Config / identity |
| Packet loss % / retransmits | Network experience without loss is incomplete | Network UX | Continuous | ≤ 60s | Medium | Endpoint |
| Device OS name/version/build in inventory | Compliance + cohorting | Endpoint management, risk | Periodic | Daily | Low | Endpoint |
| Hardware: manufacturer, model, RAM GB, disk GB, chassis, serial | Lifecycle / refresh | Hardware risk, inventory | Periodic | Daily | Low | Endpoint |
| Directory attributes: dept, BU, location, persona | “Who is impacted?” | Employee experience, exec | Periodic sync | 1–24h | Low | Identity (Entra/LDAP/HR) |

## P1 — Competitive parity

| Data required | Why | Use cases | Mode | Freq | Source |
|---------------|-----|-----------|------|------|--------|
| App launch / ready time | App experience beyond crashes | App launch dashboards | Event | On launch | Endpoint |
| Hang duration / frozen UI time | Severity of hangs | App hangs | Event | On hang | Endpoint |
| Wi-Fi RSSI/SNR, band, AP BSSID as metrics | Hybrid Wi-Fi stories | Wi-Fi experience | Continuous | 1–5m | Endpoint |
| VPN connected + tunnel RTT/loss | Secure access UX | VPN experience | Continuous | 1m | Endpoint |
| Collaboration QoE (Teams/Zoom packet loss, jitter) | Collab is a DEX pillar | Collaboration experience | Continuous / vendor API | 1m | Endpoint + APIs |
| Blue screen / unexpected shutdown events | Stability | Device stability | Event | On event | Endpoint |
| Uptime / reboot count | Stability & change impact | Uptime, change correlation | Continuous | 5m | Endpoint |
| ITSM incident id, category, reopen | Tickets avoided / MTTR | IT ops, ROI | Integration | On change | ServiceNow/Jira |
| Software usage (foreground time) | Impact weighting | Business impact | Continuous | 1–5m | Endpoint |
| Battery health / charge (laptops) | Mobile/hybrid | Battery health | Periodic | 15m–1h | Endpoint |

## P2 — Advanced

| Data | Why | Priority notes |
|------|-----|----------------|
| Sentiment surveys / pulse | Nexthink-class combined DEX | **Demo:** `sentiment_pulse_v2` seeded. **Live:** usersurvey→Pinot still P2 |
| Packet loss % / retransmits | Network experience without loss is incomplete | **Demo:** `packet_loss_pct` / `tcp_retransmits` on `network_telemetry_v2`. **Live:** agent mapper pending |
| Populate / compute `score` | Experience score product | **Demo:** `demo_tech_v1` on system rows. **Live:** may still be 0 until mapper |
| Synthetic URL probes from offices | Isolate client vs service | P2 |
| ISP / geo IP enrichment | Network outliers | P2 |
| Cost model inputs (fully loaded cost / hour) | Productivity $ | P2 (config, not telemetry) |
| Change / patch calendar | Change-induced DEX dips | P2 |
| Printer / peripheral experience | Vertical | P2–P3 |

## P3 — Future

Predictive failure labels, carbon/energy, accessibility friction, deep causal graphs, cross-customer anonymized benchmarks.

---

## Fields that exist but are insufficient

| Field | Problem |
|-------|---------|
| `score` | Historically always 0 on live cluster — **demo seed now populates** `demo_tech_v1`; reload required |
| `disk_free_pct` alone | Space ≠ performance (disk latency seeded in demo) |
| `user_name` | Not org identity |
| `device_group` | Useful cohort but not dept/persona |
| `signal_strength` STRING | Not numeric metric series |
| `aggregation_type=avg` on client | Loses distribution unless raw samples retained |
| ~14h sampling | **Demo seed uses 30‑min upload grid**; live may still be sparse until agents change |

**Still open (not demo-closable honestly):** ITSM, remediation↔metric before/after, directory dept/BU/persona.

---

## Storage planning (order of magnitude)

Assume 50k devices:

| Stream | Raw rate | 30-day raw | Recommended |
|--------|----------|------------|-------------|
| System metrics @ 30s × ~20 gauges | ~30k pts/device/day | Huge | Keep 7d raw @30s; 90d @5m; 400d @1h |
| Process top-N @ 60s | High | High | Top 15 processes only + on-alert full |
| Events | Spiky | Medium | Hot 90d; cold archive |
| URL RUM | Medium–high | Medium | Domain aggregates + error samples |
| Sentiment pulses | Low | Low | Hot 400d |

Pinot remains strong for **rollups and hotspot queries**; pair with object storage for raw forensic windows.

---

## Document History

| Date | Change | Status |
|------|--------|--------|
| 2026-08-15 | Reconcile demo-seed closes vs live gaps (sentiment table, packet loss, score) | implemented |
| 2026-08-15 | Initial gap analysis from V2 inspection | implemented |
