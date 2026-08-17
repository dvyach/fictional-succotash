# Document 1 — Current Data Assessment

**Status:** implemented · 2026-08-15  
**Source:** Apache Pinot `d1-wfwvzr.nanoheal.app` · tables with `V2` in the name only  
**Method:** Schema inspection + SQL exploration + percentile/outlier analysis  
**Overall DEX readiness:** **38 / 100** · Verdict: **PARTIALLY**

---

## 1. Executive answer

### Can the current V2 data support a competitive DEX analytics product?

**PARTIALLY.**

| Capability area | Support level | Notes |
|-----------------|---------------|-------|
| Endpoint health (CPU / disk) | Partial | Present, but ~14h sampling; no system RAM, battery, thermals, boot |
| Application crashes / hangs | Strong (events) | Rich crash/hang events; demo dominated by one noisy process |
| Process resource consumption | Partial | CPU + memory % for known processes; no launch time / hang duration |
| Network experience | Partial | RTT, DNS, bytes, TCP state; no packet loss, Wi-Fi quality, VPN metrics as first-class fields |
| SaaS / URL performance | Partial | HTTP response time + status; limited URL set in sample |
| Compliance / endpoint management | Partial | Security control snapshots; thin inventory |
| Remediation / autoheal outcomes | Strong differentiator | `events_v2` remediation + self-help with success/fail |
| Employee experience score | Partial (demo) | `score` populated via `demo_tech_v1` in seed; live agent still may emit 0 until mapper |
| Sentiment | Partial (demo) | New table `sentiment_pulse_v2` + demo seed; live usersurvey→Pinot pending |
| Business context (dept / BU / persona) | Missing | Only `device_group` (branch/office-like) |
| Login / boot / session experience | Missing | Not in V2 metrics |
| ITSM / tickets / MTTR | Missing | Not in V2 |
| Productivity / hours lost | Not supportable honestly | Would require models + richer session data |

**Bottom line:** V2 is a **promising normalized telemetry contract**, not yet a **DEX-grade data product**. Competitors sell insights derived from **high-frequency, broad coverage, identity-rich** telemetry. We have **schema shape** and **some strong event/remediation signals**, but **insufficient temporal resolution and missing first-class experience dimensions**.

---

## 2. V2 tables discovered

Only tables with `V2` in the name were analyzed (historical live audit). Demo seed now also includes **`sentiment_pulse_v2`** (ninth table):

1. `compliance_v2`
2. `events_v2`
3. `inventory_v2`
4. `network_telemetry_v2`
5. `process_telemetry_metrics_v2`
6. `software_inventory_v2`
7. `system_telemetry_metrics_v2`
8. `url_telemetry_v2`
9. `sentiment_pulse_v2` (schema + demo seed; may be absent on cluster until reload)

Non-V2 tables (`system`, `process`, `aimx`, etc.) were intentionally ignored.

### Observed volume on this cluster (not a customer size assumption)

| Table | Rows | Distinct customers | Distinct machines | Distinct users | Time span |
|-------|------|--------------------|-------------------|----------------|-----------|
| `system_telemetry_metrics_v2` | 5,040 | 1 | 8 | 8 | ~2026-07-01 → 2026-08-10 |
| `process_telemetry_metrics_v2` | 6,720 | 1 | 8 | 8 | same |
| `network_telemetry_v2` | 4,736 | 1 | 8 | 8 | same |
| `url_telemetry_v2` | 1,330 | 1 | 8 | 8 | same |
| `compliance_v2` | 1,968 | 1 | 8 | 8 | same |
| `inventory_v2` | 48 | 1 | 8 | 8 | same |
| `software_inventory_v2` | 40 | 1 | 8 | 8 | single snapshot day |
| `events_v2` | 29,737 | 3 | 26 | 8 | ~2026-07-07 → 2026-08-13 |

**Production implication:** Designs must be schema-driven and customer-agnostic. This cluster is a small demo/seed estate (~8 instrumented teller devices + noisier multi-customer crash events). Queries and dashboards must work for 500 → 500,000 devices without hard-coded branch names, app lists, or thresholds.

---

## 3. Schema & semantics by table

### Common dimensions (almost all V2 tables)

| Field | Type | Role |
|-------|------|------|
| `customer_id` | STRING | Tenant |
| `machine_id` | STRING | Device identity |
| `device_group` | STRING | Cohort (here: branch offices) |
| `user_name` | STRING | Logged-in / associated user (not HR identity graph) |
| `client_version` | STRING | Nanoheal agent version |
| `source_dart` / `source_event_id` / `source_section` | various | Collection provenance |
| `type_of_run` | STRING | e.g. `RealTime Monitoring` |
| `attributes` | STRING (JSON) | Optional sparse payload |
| `server_time` | LONG (ms epoch) | Primary time axis |

### 3.1 `system_telemetry_metrics_v2` — device metrics (time series)

**Shape:** metric fact table (`metric_domain`, `metric_family`, `metric_name`, `metric_unit`, `aggregation_type`, `metric_value`, `score`)

**Metrics present:**

| metric_name | unit | domain/family | Notes |
|-------------|------|---------------|-------|
| `cpu_usage_pct` | % | system / Device Performance | Primary health signal |
| `cpu_interrupt_usage_pct` | % | system | Present |
| `cpu_queue_length` | count | system | Present |
| `context_switches_per_sec` | count/sec | system | Present |
| `interrupt_rate_per_sec` | count/sec | system | Present |
| `processes_running` | count | system | Present |
| `disk_free_pct` | % | storage | Critical risk signal |
| `network_download_speed` | kbps | network | Also duplicated conceptually in network table |
| `network_upload_speed` | kbps | network | Same |

**Missing vs competitive DEX:** system RAM used/available, page faults, disk IOPS/latency, battery, thermal, boot duration, login duration, uptime, BSOD/crash rate as metrics, GPU, Wi-Fi signal as metric.

**`score`:** always `0.0` in observed data — unused.

**Granularity:** ~70 samples / device / ~40 days ≈ **~1 sample / 14 hours**. This is **not** DEX-grade. Lakeside markets ~10k datapoints / 15 seconds; Nexthink/ControlUp operate on near-real-time session/device grids. At 14h cadence you cannot detect “CPU stuck at 100% for 2 hours during business hours.”

**Data type:** time-series metric facts (pre-aggregated client-side with `aggregation_type` often `avg` or null).

### 3.2 `process_telemetry_metrics_v2` — process metrics

**Metrics:** `process_cpu_percent`, `process_memory_used_pct`  
**Process set in sample:** CoreBankingClient, TellerConnect, OUTLOOK, OneDrive, ms-teams, chrome  
**Families:** Device Performance, Collaboration Experience, Business Applications  

**Useful for:** top CPU/memory consumers, app resource friction, version comparison **if** `process_version` populated.

**Insufficient for:** app launch time, hang duration, UI freeze detection, foreground vs background, productivity impact.

### 3.3 `network_telemetry_v2` — connection-level network metrics

**Metrics:** `round_trip_time`, `dns_lookup_time`, `data_sent`, `data_received`, `tcp_established_connections`, NIC speeds  
**Dimensions:** protocol, local/remote address/port, connection_state, process_name/pid  

**Strong signal in sample:** extreme RTT/DNS outliers on specific machines (p95 RTT tens of seconds) — classic “average hides the problem” case.

**Missing:** packet loss %, Wi-Fi RSSI/SNR as metrics, VPN tunnel quality, gateway/ISP, SSID as first-class on this table (SSID lives on inventory).

### 3.4 `url_telemetry_v2` — HTTP / SaaS performance

**Metric:** `http_response_time` (ms), status_code, domain, url, first_party  
**Sample domains:** core banking teller, transactions API, VPN tunnel status, Microsoft login  

**Useful for:** SaaS/app latency, 5xx rate, domain rankings.  
**Missing:** page load / LCP, DNS per URL, TLS handshake, synthetic vs real-user distinction, geographic PoP.

### 3.5 `events_v2` — event stream (highest DEX leverage today)

**Domains observed:** Application, network, remediation, self_help, failure  

| Pattern | Volume (sample) | Meaning |
|---------|-----------------|---------|
| Application Error / Crashed | ~29k | Crashes (heavily skewed to `SECOCL64.exe` on non-demo machines) |
| Application Hang | ~248 | Hangs |
| network connection_failure | ~210 | Banking secure connection failures |
| remediation autoheal completed/failed | ~144 | Autoheal outcomes |
| self_help remediation_approved | ~30 | Employee-approved remediation |

**Attributes JSON (remediation)** includes condition, remediation action, verified flag — **excellent for outcome measurement**.

**Type:** event-based (not aggregated). Effective granularity = event time.

### 3.6 `compliance_v2` — control snapshots

Controls: antivirus_enabled/status, firewall_enabled, uac_enabled, windows_update_status, backup_software_status.  
Statuses Enabled/Disabled/Current/Running.  
**Type:** recurring observation snapshots.

### 3.7 `inventory_v2` — thin hardware/network inventory

Observed rows are **network_adapter** entities (Intel Wi-Fi 6 AX201), with SSID names per branch, VPN Connected, signal strength string (`-52 dBm`).  
**Not** a full hardware CMDB (CPU model, RAM size, disk model, OS build, device age).

### 3.8 `software_inventory_v2` — installed software snapshot

Sample: Chrome, M365, CrowdStrike, GlobalProtect, First National Teller Client.  
Fields: version, architecture, has_ui, installation_date, estimated_size_kb.  
Single-day snapshot in sample — treat as periodic inventory, not continuous.

---

## 4. Relationships & joins

```
customer_id + machine_id
        │
        ├─ system_telemetry_metrics_v2   (device metrics @ server_time)
        ├─ process_telemetry_metrics_v2  (process metrics @ server_time)
        ├─ network_telemetry_v2          (conn metrics @ server_time)
        ├─ url_telemetry_v2              (http metrics @ server_time)
        ├─ events_v2                     (discrete events @ server_time)
        ├─ compliance_v2                 (control observations)
        ├─ inventory_v2                  (adapter / network inventory)
        └─ software_inventory_v2         (installed apps)
```

**Join strategy for production:**

1. **Identity spine:** `(customer_id, machine_id)` as device key; `(customer_id, user_name)` as weak user key.
2. **Time alignment:** bucket to customer-configured windows (5m / 1h / 1d) — do **not** assume raw row = 5-minute sample.
3. **Cohorts:** `device_group` is the only reliable org segment today; treat department/BU as future identity join.
4. **Pinot joins:** prefer pre-joined feature tables / denormalized rollups for dashboards; ad-hoc multi-table joins at query time do not scale to 500k devices.

**Join feasibility:** Yes on keys above. Cardinality of `attributes` JSON is sparse — do not rely on it for core metrics.

---

## 5. Data quality findings

| Issue | Severity | Impact |
|-------|----------|--------|
| ~14h metric sampling | **Critical** | Cannot detect short-lived or business-hours-only degradation |
| `score` always 0 | High | No ready-made experience score |
| No system memory metric | High | Memory pressure / pagefile stories incomplete |
| Inventory ≠ full hardware | High | Lifecycle / device age / model risk incomplete |
| Events mix customers / naming | Medium | Crash analytics need customer scoping + app allowlists/noise filters |
| `entity_name` null on system metrics | Low | Entity typing incomplete |
| `aggregation_type` inconsistent (avg vs null) | Medium | Must document whether `metric_value` is already averaged |
| Software inventory single snapshot | Medium | Drift / install date analytics weak |
| Signal strength as STRING | Low | Harder to percentile |
| No business hours dimension | High | Cannot natively filter working hours |

### The “average CPU = 36%” trap — proven on this data

| Metric | Value |
|--------|-------|
| Fleet average CPU | **~37.4%** |
| Devices with p95 CPU ≥ 90% | **1 of 8** (`NHL100002`, p95/p99 = 99%) |
| Devices with any sample ≥ 90% | **1** |
| Devices with disk free p10 critical (<15%) | **1** (`NHL100004`, min free **8%**, 66/70 samples critical) |
| Devices with p95 RTT > 1s | **4 of 8** (worst p95 **53.7 seconds**) |

A global average would declare the fleet “fine.” Percentiles + affected-device counts correctly surface **CPU outlier**, **disk crisis**, and **network disasters**.

---

## 6. Capability map vs required DEX analytics

Legend: ✅ supportable · ⚠️ partial / approximate · ❌ not supportable honestly

### Endpoint health
| Need | Status |
|------|--------|
| CPU | ⚠️ (coarse) |
| Memory (system) | ❌ |
| Disk space | ⚠️ |
| Disk performance (latency/IOPS) | ❌ |
| Battery / thermals | ❌ |
| Uptime / reboots | ❌ |
| Crashes / freezes (device) | ⚠️ via events (app-centric) |
| Boot / login performance | ❌ |
| OS health | ⚠️ compliance only |

### Employee / digital experience
| Need | Status |
|------|--------|
| Device experience score | ❌ (column unused) |
| Application experience | ⚠️ crashes + process + URL |
| Login experience | ❌ |
| Network experience | ⚠️ RTT/DNS/HTTP |
| Productivity impact hours | ❌ |
| Sentiment / friction surveys | ❌ |
| Experience by dept/persona | ❌ (only device_group) |

### IT operations / automation
| Need | Status |
|------|--------|
| Recurring problems | ⚠️ from events |
| Remediation success/fail | ✅ |
| Self-help | ✅ |
| Before/after remediation | ⚠️ if time-aligned to metrics (coarse) |
| ITSM MTTR / tickets | ❌ |

### Business context
| Need | Status |
|------|--------|
| User name | ⚠️ string only |
| Department / BU / role | ❌ |
| Office / geography | ⚠️ `device_group` / SSID names |
| Device type / age | ❌ incomplete inventory |
| Application catalog | ⚠️ software_inventory + process names |

---

## 7. What we can build honestly now (P0 buildable)

1. **Device health outliers** — CPU p95/p99, sustained high CPU sample counts, disk free critical duration proxies  
2. **Network experience outliers** — RTT/DNS percentiles, TCP failure states, affected devices  
3. **Application reliability** — crash/hang counts by app/device/user (with noise filtering)  
4. **SaaS / URL latency** — p50/p95 response time, 5xx rate  
5. **Process resource hotspots** — top CPU/memory processes  
6. **Compliance posture** — % devices non-compliant by control  
7. **Remediation effectiveness** — success vs fail rates, by condition/action  
8. **Cohort comparison** — by `device_group` / customer_id  

## 8. What we must not claim

- Global DEX score comparable to Nexthink Technology+Sentiment score  
- Hours of productivity lost  
- Department/persona experience (no HR/directory dimensions)  
- Boot/login UX  
- “Real-time” device grids  
- Causal root cause with high confidence without richer correlated streams  
- Battery / hybrid work Wi-Fi experience as first-class product pillars  

---

## 9. Readiness score breakdown

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Schema / contract quality | 15 | 72 | 10.8 |
| Metric coverage (endpoint) | 15 | 35 | 5.3 |
| Application experience coverage | 10 | 45 | 4.5 |
| Network / SaaS coverage | 10 | 50 | 5.0 |
| Identity / business context | 10 | 20 | 2.0 |
| Temporal resolution | 15 | 15 | 2.3 |
| Experience scoring | 10 | 5 | 0.5 |
| Remediation / closed-loop | 10 | 70 | 7.0 |
| Data quality / production readiness | 5 | 40 | 2.0 |
| **Total** | 100 | — | **~39 → 38** |

---

## 10. Edge-case test results (this cluster)

| Scenario | Result |
|----------|--------|
| 1. Few devices with extreme CPU, rest normal | **Detected** — NHL100002 high_cpu_samples=6 @ 99%; fleet avg still ~37% |
| 2. One department worse | **Cannot** without dept; **proxy** via `device_group` works if used as cohort |
| 3. Business-hours-only problem | **Cannot** — no business-hours filter; sampling too coarse |
| 4. One app version worse | **Partial** — `process_version` / software_version exist; need consistent fill |
| 5. One office worse | **Yes** — `device_group` + SSID naming |
| 6. Progressive worsening | **Partial** — daily rollups possible; coarse samples limit sensitivity |
| 7. Remediation proves improvement | **Partial** — remediation events exist; metric cadence weakens proof |
| 8. 500 devices | Percentiles OK if enough samples/device |
| 9. 500,000 devices | Raw fact scans need pre-aggregation / Pinot rollup tables |

---

## Document History

| Date | Change | Status |
|------|--------|--------|
| 2026-08-15 | Note demo seed closes memory/boot/sentiment table/packet loss/score; live paths still open | implemented |
| 2026-08-15 | Initial V2-only Pinot assessment | implemented |
