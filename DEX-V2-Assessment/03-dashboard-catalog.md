# Document 3 — Complete DEX Dashboard Catalog
**Status:** implemented · 2026-08-15  
**Design rules:** No naked averages as primary KPIs · schema-driven · customer-agnostic · insight-first  
**Catalog size:** 65 primary dashboards/reports across executive, device, app, network, employee, ops, endpoint, automation, and business impact domains.

Competitor “hundreds of dashboards” are typically **library packs + filter variants** of ~40–70 core analytical questions (same metric, different cohort/time/app). This catalog enumerates the **core analytical surface**; multiply by dimensions (`device_group`, app, OS, version, customer baselines) to reach hundreds of *views* without hundreds of product surfaces.

## How to compete with hundreds of competitor views
Do **not** ship all of these as peer nav items. Map them into **5 story surfaces** + **Library**. P0 BUILDABLE items ship first as widgets inside stories; DATA GAP items appear as roadmap cards, not fake charts.

## Scoring dimensions (1–5)
Strategic value · Customer value · Competitive importance · Data availability · Implementation complexity (5=hard) · Differentiation · Automation potential · Executive relevance · Operational relevance

## Prioritization matrix (summary)

| ID | Name | Priority | Data | Strat | Cust | Comp | DataAvail | Cx | Diff | Auto | Exec | Ops |
|----|------|----------|------|-------|------|------|-----------|----|------|------|------|-----|
| EX-01 | Global Technology Risk Pulse | **P0** | BUILDABLE (proxy score) | 5 | 5 | 5 | 4 | 3 | 4 | 5 | 5 | 4 |
| EX-02 | Experience Trend (Technology Proxy) | **P0** | BUILDABLE | 5 | 5 | 5 | 4 | 3 | 3 | 4 | 5 | 3 |
| EX-03 | Experience by Office / Site | **P0** | BUILDABLE | 5 | 5 | 4 | 5 | 2 | 3 | 4 | 4 | 5 |
| EX-04 | Experience by Business Unit | **P1** | DATA GAP | 5 | 5 | 5 | 1 | 4 | 4 | 3 | 5 | 3 |
| EX-05 | Experience by Department | **P1** | DATA GAP | 4 | 5 | 5 | 1 | 4 | 3 | 3 | 4 | 3 |
| EX-06 | Experience by Persona | **P2** | DATA GAP | 4 | 4 | 4 | 1 | 4 | 4 | 2 | 4 | 3 |
| EX-07 | Most Impacted Employees | **P0** | BUILDABLE (limited identity) | 5 | 5 | 5 | 4 | 3 | 4 | 5 | 3 | 5 |
| EX-08 | Most Impacted Devices | **P0** | BUILDABLE | 5 | 5 | 5 | 4 | 3 | 4 | 5 | 3 | 5 |
| EX-09 | Experience Drivers Waterfall | **P1** | PARTIAL — needs score engine | 5 | 5 | 5 | 2 | 4 | 5 | 3 | 5 | 3 |
| EX-10 | Experience Risk Forecast | **P3** | DATA GAP (predictive) | 4 | 4 | 4 | 2 | 5 | 5 | 4 | 5 | 3 |
| EX-11 | Experience Improvement / ROI | **P0** | PARTIAL | 5 | 5 | 5 | 3 | 4 | 5 | 5 | 5 | 4 |
| EX-12 | Experience Benchmark | **P3** | DATA GAP | 3 | 4 | 4 | 1 | 5 | 4 | 1 | 5 | 2 |
| DV-01 | Device Health Outliers | **P0** | BUILDABLE | 5 | 5 | 5 | 5 | 2 | 4 | 5 | 3 | 5 |
| DV-02 | CPU Experience Distribution | **P0** | BUILDABLE | 5 | 5 | 4 | 5 | 2 | 5 | 4 | 3 | 5 |
| DV-03 | Memory Pressure | **P0** | DATA GAP | 5 | 5 | 5 | 1 | 3 | 4 | 5 | 3 | 5 |
| DV-04 | Disk Space Risk | **P0** | BUILDABLE | 5 | 5 | 4 | 5 | 2 | 3 | 5 | 3 | 5 |
| DV-05 | Disk Performance | **P1** | DATA GAP | 4 | 5 | 4 | 1 | 3 | 3 | 4 | 2 | 5 |
| DV-06 | Device Stability (Crashes/Hangs) | **P0** | BUILDABLE | 5 | 5 | 5 | 5 | 2 | 3 | 5 | 3 | 5 |
| DV-07 | Device Uptime & Reboots | **P1** | DATA GAP | 4 | 4 | 4 | 1 | 3 | 3 | 4 | 2 | 5 |
| DV-08 | Device Age / Hardware Risk | **P1** | DATA GAP | 5 | 5 | 4 | 2 | 3 | 4 | 2 | 5 | 4 |
| DV-09 | Battery Health | **P2** | DATA GAP | 3 | 4 | 3 | 1 | 3 | 3 | 3 | 2 | 4 |
| DV-10 | Boot Performance | **P0** | DATA GAP | 5 | 5 | 5 | 1 | 3 | 4 | 4 | 4 | 5 |
| DV-11 | Login Performance | **P0** | DATA GAP | 5 | 5 | 5 | 1 | 3 | 4 | 4 | 4 | 5 |
| DV-12 | Persistently Degraded Devices | **P0** | BUILDABLE | 5 | 5 | 4 | 4 | 3 | 4 | 5 | 3 | 5 |
| AP-01 | Application Reliability Pareto | **P0** | BUILDABLE | 5 | 5 | 5 | 5 | 2 | 4 | 5 | 3 | 5 |
| AP-02 | Application Crash Storm Detector | **P0** | BUILDABLE | 5 | 5 | 5 | 5 | 3 | 4 | 5 | 3 | 5 |
| AP-03 | Application Hangs | **P0** | BUILDABLE | 4 | 5 | 4 | 5 | 2 | 3 | 4 | 2 | 5 |
| AP-04 | Application Launch Time | **P0** | DATA GAP | 5 | 5 | 5 | 1 | 3 | 4 | 4 | 3 | 5 |
| AP-05 | Application Resource Hotspots | **P0** | BUILDABLE | 5 | 5 | 4 | 5 | 2 | 3 | 4 | 2 | 5 |
| AP-06 | App Performance by Version | **P1** | PARTIAL | 5 | 5 | 5 | 3 | 3 | 4 | 4 | 3 | 5 |
| AP-07 | App Performance by Location | **P1** | BUILDABLE | 4 | 5 | 4 | 4 | 3 | 4 | 4 | 3 | 5 |
| AP-08 | Business-Critical App Experience Pack | **P0** | BUILDABLE (config-driven) | 5 | 5 | 4 | 4 | 3 | 5 | 5 | 5 | 4 |
| NW-01 | Network Latency Outliers | **P0** | BUILDABLE | 5 | 5 | 5 | 5 | 2 | 4 | 5 | 3 | 5 |
| NW-02 | DNS Performance | **P0** | BUILDABLE | 4 | 5 | 4 | 5 | 2 | 3 | 4 | 2 | 5 |
| NW-03 | Packet Loss / Reliability | **P0** | DATA GAP | 5 | 5 | 5 | 1 | 3 | 4 | 5 | 3 | 5 |
| NW-04 | Wi-Fi Experience | **P1** | PARTIAL (inventory string only) | 4 | 5 | 4 | 2 | 3 | 3 | 4 | 2 | 5 |
| NW-05 | VPN Experience | **P1** | PARTIAL (status only) | 5 | 5 | 5 | 2 | 3 | 4 | 4 | 3 | 5 |
| NW-06 | Network by Office | **P0** | BUILDABLE | 5 | 5 | 4 | 5 | 2 | 3 | 4 | 4 | 5 |
| NW-07 | Connection Failure Recurrence | **P0** | BUILDABLE | 5 | 5 | 4 | 5 | 2 | 4 | 5 | 3 | 5 |
| NW-08 | Network-Driven Experience Degradation | **P1** | PARTIAL | 4 | 4 | 4 | 3 | 4 | 5 | 3 | 3 | 4 |
| URL-01 | SaaS Response Time | **P0** | BUILDABLE | 5 | 5 | 4 | 5 | 2 | 3 | 4 | 3 | 5 |
| URL-02 | HTTP Error Burst | **P0** | BUILDABLE | 4 | 5 | 4 | 5 | 2 | 3 | 5 | 2 | 5 |
| EM-01 | Employees with Poor Experience | **P0** | BUILDABLE (weak identity) | 5 | 5 | 5 | 4 | 3 | 4 | 5 | 3 | 5 |
| EM-02 | Persistent Employee Problems | **P1** | BUILDABLE | 4 | 5 | 4 | 4 | 3 | 4 | 4 | 3 | 5 |
| EM-03 | Experience by Role/Persona | **P2** | DATA GAP | 4 | 4 | 4 | 1 | 4 | 3 | 2 | 4 | 3 |
| EM-04 | Sentiment + Tech Combined DEX | **P2** | DATA GAP | 5 | 5 | 5 | 1 | 5 | 5 | 3 | 5 | 3 |
| OP-01 | Incident Drivers (Telemetry) | **P0** | BUILDABLE | 5 | 5 | 4 | 5 | 2 | 3 | 4 | 3 | 5 |
| OP-02 | Recurring Problems | **P0** | BUILDABLE | 5 | 5 | 5 | 4 | 3 | 4 | 5 | 3 | 5 |
| OP-03 | Top Problematic Locations | **P0** | BUILDABLE | 5 | 5 | 4 | 5 | 2 | 3 | 4 | 4 | 5 |
| OP-04 | ITSM Incident Volume / MTTR | **P1** | DATA GAP | 5 | 5 | 4 | 1 | 4 | 3 | 3 | 4 | 5 |
| OP-05 | Major Incident Command Mirror | **P1** | PARTIAL (cadence) | 5 | 5 | 4 | 3 | 4 | 4 | 5 | 3 | 5 |
| EP-01 | Compliance Posture | **P0** | BUILDABLE | 5 | 5 | 3 | 5 | 2 | 3 | 4 | 3 | 5 |
| EP-02 | OS Distribution & Adoption | **P1** | DATA GAP | 4 | 4 | 3 | 1 | 2 | 2 | 2 | 3 | 5 |
| EP-03 | Software Inventory & Drift | **P1** | BUILDABLE | 3 | 4 | 3 | 4 | 2 | 2 | 2 | 2 | 5 |
| EP-04 | Hardware Inventory | **P1** | PARTIAL (adapters only) | 4 | 4 | 3 | 2 | 2 | 2 | 1 | 3 | 5 |
| EP-05 | Stale / Silent Devices | **P0** | BUILDABLE | 4 | 5 | 3 | 5 | 2 | 3 | 4 | 2 | 5 |
| AU-01 | Automations Executed | **P0** | BUILDABLE | 5 | 5 | 4 | 5 | 2 | 5 | 5 | 4 | 5 |
| AU-02 | Automation Success vs Failure | **P0** | BUILDABLE | 5 | 5 | 5 | 5 | 2 | 5 | 5 | 4 | 5 |
| AU-03 | Self-Help Adoption | **P1** | BUILDABLE | 4 | 4 | 3 | 5 | 2 | 5 | 4 | 3 | 4 |
| AU-04 | Repeat Problems After Remediation | **P0** | BUILDABLE | 5 | 5 | 5 | 4 | 3 | 5 | 5 | 3 | 5 |
| AU-05 | Experience After Automation | **P0** | PARTIAL (cadence) | 5 | 5 | 5 | 3 | 4 | 5 | 5 | 5 | 4 |
| AU-06 | Tickets Avoided (Estimated) | **P2** | DATA GAP (needs model/ITSM) | 5 | 5 | 4 | 1 | 4 | 5 | 3 | 5 | 4 |
| BI-01 | Employees Impacted Summary | **P0** | BUILDABLE | 5 | 5 | 4 | 4 | 2 | 3 | 3 | 5 | 3 |
| BI-02 | Hours Productivity at Risk | **P2** | DATA GAP | 5 | 5 | 5 | 1 | 5 | 4 | 2 | 5 | 3 |
| BI-03 | Applications Creating Greatest Business Impact | **P1** | BUILDABLE (config) | 5 | 5 | 4 | 4 | 3 | 4 | 3 | 5 | 3 |

---

## Executive DEX

### EX-01 — Global Technology Risk Pulse
- **Priority:** P0 · **Data status:** BUILDABLE (proxy score)
- **Persona:** CIO, IT Director
- **Business question:** Where is endpoint/app/network risk concentrated right now?
- **Primary KPI:** Devices in degraded state (%)
- **Secondary KPIs:** Affected users, Top driver family
- **Time parameter:** rolling 7d + current
- **Measures:** % devices with any sustained breach, crash rate, p95 RTT outliers
- **Dimensions:** customer, device_group
- **Aggregation:** COUNT DISTINCT / RATE / P95
- **Visualization:** KPI + ranked drivers + trend
- **Drill-down:** Company→device_group→device→user
- **Alert/anomaly:** Yes
- **Insight generated:** Auto-rank top 3 drivers by impact score
- **Data required:** system+network+events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/4/3/4/5/5/4

### EX-02 — Experience Trend (Technology Proxy)
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** CIO
- **Business question:** Is experience improving or worsening over time?
- **Primary KPI:** Weekly degraded-device %
- **Secondary KPIs:** Crash rate trend, Remediation success trend
- **Time parameter:** weekly 12w
- **Measures:** degraded%, crash/device-day
- **Dimensions:** device_group
- **Aggregation:** RATE
- **Visualization:** line + control chart
- **Drill-down:** week→driver
- **Alert/anomaly:** Yes
- **Insight generated:** Change-point when degraded% shifts
- **Data required:** rollups
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/4/3/3/4/5/3

### EX-03 — Experience by Office / Site
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** IT Director, EUC
- **Business question:** Which sites have worse digital experience?
- **Primary KPI:** Degraded % by device_group
- **Secondary KPIs:** p95 RTT, crash rate
- **Time parameter:** 7d
- **Measures:** cohort degraded%
- **Dimensions:** device_group
- **Aggregation:** RATE / P95
- **Visualization:** bar + map optional
- **Drill-down:** site→device
- **Alert/anomaly:** Yes
- **Insight generated:** Sites significantly worse than peer median
- **Data required:** device_group
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/5/2/3/4/4/5

### EX-04 — Experience by Business Unit
- **Priority:** P1 · **Data status:** DATA GAP
- **Persona:** CIO, Business Leader
- **Business question:** Which BUs are most impacted?
- **Primary KPI:** Degraded employees %
- **Secondary KPIs:** —
- **Time parameter:** 7d
- **Measures:** —
- **Dimensions:** business_unit
- **Aggregation:** RATE
- **Visualization:** bar
- **Drill-down:** BU→dept→user
- **Alert/anomaly:** Optional/No
- **Insight generated:** BU concentration
- **Data required:** directory BU
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/1/4/4/3/5/3

### EX-05 — Experience by Department
- **Priority:** P1 · **Data status:** DATA GAP
- **Persona:** IT Director, HR partner
- **Business question:** Which departments suffer most?
- **Primary KPI:** Impacted employees
- **Secondary KPIs:** —
- **Time parameter:** 7d
- **Measures:** —
- **Dimensions:** department
- **Aggregation:** RATE
- **Visualization:** bar
- **Drill-down:** dept→user
- **Alert/anomaly:** Optional/No
- **Insight generated:** Dept vs company baseline
- **Data required:** directory
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/5/5/1/4/3/3/4/3

### EX-06 — Experience by Persona
- **Priority:** P2 · **Data status:** DATA GAP
- **Persona:** EUC Manager
- **Business question:** Do executives/frontline/remote personas differ?
- **Primary KPI:** Score by persona
- **Secondary KPIs:** —
- **Time parameter:** 30d
- **Measures:** —
- **Dimensions:** persona
- **Aggregation:** P50 score
- **Visualization:** box plot
- **Drill-down:** persona→device
- **Alert/anomaly:** Optional/No
- **Insight generated:** Persona gap
- **Data required:** persona tags
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/4/4/1/4/4/2/4/3

### EX-07 — Most Impacted Employees
- **Priority:** P0 · **Data status:** BUILDABLE (limited identity)
- **Persona:** Service Desk Manager
- **Business question:** Who needs help first?
- **Primary KPI:** Employee impact score
- **Secondary KPIs:** breach minutes, crashes
- **Time parameter:** 7d
- **Measures:** impact score
- **Dimensions:** user_name, device_group
- **Aggregation:** SCORE
- **Visualization:** ranked table
- **Drill-down:** user→device→events
- **Alert/anomaly:** Yes
- **Insight generated:** Top N users by impact
- **Data required:** user_name+metrics+events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/4/3/4/5/3/5

### EX-08 — Most Impacted Devices
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Endpoint Manager
- **Business question:** Which devices are chronically bad?
- **Primary KPI:** Device persistence score
- **Secondary KPIs:** p95 CPU, disk critical, crashes
- **Time parameter:** 30d
- **Measures:** days degraded
- **Dimensions:** machine_id, model
- **Aggregation:** COUNT days
- **Visualization:** ranked table
- **Drill-down:** device→timeline
- **Alert/anomaly:** Yes
- **Insight generated:** Persistently degraded devices
- **Data required:** metrics+events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/4/3/4/5/3/5

### EX-09 — Experience Drivers Waterfall
- **Priority:** P1 · **Data status:** PARTIAL — needs score engine
- **Persona:** CIO
- **Business question:** What moved experience this week?
- **Primary KPI:** Driver contribution
- **Secondary KPIs:** —
- **Time parameter:** WoW
- **Measures:** delta contribution
- **Dimensions:** driver family
- **Aggregation:** ATTRIBUTION
- **Visualization:** waterfall
- **Drill-down:** driver→metric
- **Alert/anomaly:** Optional/No
- **Insight generated:** What changed
- **Data required:** scored drivers
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/2/4/5/3/5/3

### EX-10 — Experience Risk Forecast
- **Priority:** P3 · **Data status:** DATA GAP (predictive)
- **Persona:** CIO
- **Business question:** Where will experience degrade next?
- **Primary KPI:** Risk probability
- **Secondary KPIs:** —
- **Time parameter:** 7d forward
- **Measures:** risk
- **Dimensions:** cohort
- **Aggregation:** MODEL
- **Visualization:** heatmap
- **Drill-down:** cohort→devices
- **Alert/anomaly:** Yes
- **Insight generated:** Rising risk cohorts
- **Data required:** history features
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/4/4/2/5/5/4/5/3

### EX-11 — Experience Improvement / ROI
- **Priority:** P0 · **Data status:** PARTIAL
- **Persona:** CIO
- **Business question:** Did interventions improve experience?
- **Primary KPI:** Before/after degraded%
- **Secondary KPIs:** remediation success
- **Time parameter:** campaign window
- **Measures:** uplift
- **Dimensions:** action
- **Aggregation:** DELTA
- **Visualization:** before/after bars
- **Drill-down:** action→devices
- **Alert/anomaly:** Optional/No
- **Insight generated:** Proven uplift or not
- **Data required:** remediation+metrics
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/3/4/5/5/5/4

### EX-12 — Experience Benchmark
- **Priority:** P3 · **Data status:** DATA GAP
- **Persona:** CIO
- **Business question:** How do we compare to peers?
- **Primary KPI:** Percentile vs anonymized peers
- **Secondary KPIs:** —
- **Time parameter:** monthly
- **Measures:** benchmark
- **Dimensions:** industry
- **Aggregation:** PERCENTILE
- **Visualization:** bullet
- **Drill-down:** n/a
- **Alert/anomaly:** Optional/No
- **Insight generated:** Below/above peer band
- **Data required:** cross-tenant anon
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 3/4/4/1/5/4/1/5/2

## Device Experience

### DV-01 — Device Health Outliers
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Endpoint Manager, Desktop Engineer
- **Business question:** Which devices are unhealthy beyond fleet norms?
- **Primary KPI:** Devices with sustained CPU or disk breach
- **Secondary KPIs:** p95 CPU, min disk free
- **Time parameter:** 7d business hours when available
- **Measures:** breach windows, affected devices
- **Dimensions:** machine, device_group, client_version
- **Aggregation:** P95 / COUNT / %
- **Visualization:** scatter + ranked table
- **Drill-down:** device→metrics→processes
- **Alert/anomaly:** Yes
- **Insight generated:** Outliers vs customer baseline
- **Data required:** system_telemetry
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/5/2/4/5/3/5

### DV-02 — CPU Experience Distribution
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** EUC, Desktop Engineer
- **Business question:** What is the CPU experience shape—not the average?
- **Primary KPI:** Fleet CPU p50/p90/p95
- **Secondary KPIs:** % devices p95≥threshold
- **Time parameter:** 24h/7d
- **Measures:** percentiles, high sample counts
- **Dimensions:** device_group, machine
- **Aggregation:** P50/P90/P95/P99
- **Visualization:** histogram + box
- **Drill-down:** bin→devices
- **Alert/anomaly:** Yes
- **Insight generated:** Avg hides saturation pockets
- **Data required:** cpu_usage_pct
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/5/2/5/4/3/5

### DV-03 — Memory Pressure
- **Priority:** P0 · **Data status:** DATA GAP
- **Persona:** Endpoint Manager
- **Business question:** Where is memory pressure hurting users?
- **Primary KPI:** % devices with mem breach
- **Secondary KPIs:** page faults
- **Time parameter:** 7d
- **Measures:** mem%, page faults
- **Dimensions:** machine, model
- **Aggregation:** P95
- **Visualization:** heatmap
- **Drill-down:** device→processes
- **Alert/anomaly:** Yes
- **Insight generated:** Memory-constrained cohort
- **Data required:** system memory
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/1/3/4/5/3/5

### DV-04 — Disk Space Risk
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Endpoint Manager
- **Business question:** Which devices will fail due to disk space?
- **Primary KPI:** Devices with free%<critical
- **Secondary KPIs:** persistence days
- **Time parameter:** 30d
- **Measures:** min free, % samples critical
- **Dimensions:** machine, user
- **Aggregation:** MIN / COUNT
- **Visualization:** ranked table
- **Drill-down:** device
- **Alert/anomaly:** Yes
- **Insight generated:** Persistent low disk
- **Data required:** disk_free_pct
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/5/2/3/5/3/5

### DV-05 — Disk Performance
- **Priority:** P1 · **Data status:** DATA GAP
- **Persona:** Desktop Engineer
- **Business question:** Is storage latency causing slowness?
- **Primary KPI:** Disk latency p95
- **Secondary KPIs:** queue
- **Time parameter:** 24h
- **Measures:** latency
- **Dimensions:** machine
- **Aggregation:** P95
- **Visualization:** line
- **Drill-down:** device
- **Alert/anomaly:** Yes
- **Insight generated:** Latency outliers
- **Data required:** disk latency
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/5/4/1/3/3/4/2/5

### DV-06 — Device Stability (Crashes/Hangs)
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Service Desk, EUC
- **Business question:** Which devices are unstable?
- **Primary KPI:** Crash+hang rate per device
- **Secondary KPIs:** top apps
- **Time parameter:** 7d/30d
- **Measures:** event counts, rates
- **Dimensions:** machine, app
- **Aggregation:** COUNT / RATE
- **Visualization:** Pareto
- **Drill-down:** device→events
- **Alert/anomaly:** Yes
- **Insight generated:** Unstable devices
- **Data required:** events_v2
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/5/2/3/5/3/5

### DV-07 — Device Uptime & Reboots
- **Priority:** P1 · **Data status:** DATA GAP
- **Persona:** Endpoint Manager
- **Business question:** Are unexpected reboots rising?
- **Primary KPI:** Reboots / device-week
- **Secondary KPIs:** unexpected
- **Time parameter:** 30d
- **Measures:** reboot count
- **Dimensions:** machine, cohort
- **Aggregation:** COUNT
- **Visualization:** trend
- **Drill-down:** device
- **Alert/anomaly:** Yes
- **Insight generated:** Reboot storms
- **Data required:** uptime/reboot events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/4/4/1/3/3/4/2/5

### DV-08 — Device Age / Hardware Risk
- **Priority:** P1 · **Data status:** DATA GAP
- **Persona:** IT Director
- **Business question:** Which hardware should be refreshed?
- **Primary KPI:** Risk by model/age
- **Secondary KPIs:** experience proxy
- **Time parameter:** 90d
- **Measures:** score vs age
- **Dimensions:** model, age
- **Aggregation:** P50
- **Visualization:** scatter
- **Drill-down:** model→devices
- **Alert/anomaly:** Optional/No
- **Insight generated:** Refresh candidates
- **Data required:** inventory age
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/2/3/4/2/5/4

### DV-09 — Battery Health
- **Priority:** P2 · **Data status:** DATA GAP
- **Persona:** EUC
- **Business question:** Which laptops have failing batteries?
- **Primary KPI:** % capacity
- **Secondary KPIs:** discharge rate
- **Time parameter:** 30d
- **Measures:** battery
- **Dimensions:** model
- **Aggregation:** P10
- **Visualization:** ranked
- **Drill-down:** device
- **Alert/anomaly:** Yes
- **Insight generated:** Battery risk
- **Data required:** battery
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 3/4/3/1/3/3/3/2/4

### DV-10 — Boot Performance
- **Priority:** P0 · **Data status:** DATA GAP
- **Persona:** EUC Manager
- **Business question:** Are boot times acceptable?
- **Primary KPI:** Boot duration p95
- **Secondary KPIs:** % slow boots
- **Time parameter:** 30d
- **Measures:** boot seconds
- **Dimensions:** model, OS
- **Aggregation:** P95
- **Visualization:** distribution
- **Drill-down:** device
- **Alert/anomaly:** Yes
- **Insight generated:** Slow boot cohort
- **Data required:** boot events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/1/3/4/4/4/5

### DV-11 — Login Performance
- **Priority:** P0 · **Data status:** DATA GAP
- **Persona:** EUC Manager
- **Business question:** Are logons slow?
- **Primary KPI:** Logon duration p95
- **Secondary KPIs:** GPO delay
- **Time parameter:** 30d
- **Measures:** logon seconds
- **Dimensions:** site, VPN
- **Aggregation:** P95
- **Visualization:** distribution
- **Drill-down:** user/device
- **Alert/anomaly:** Yes
- **Insight generated:** Slow logon sites
- **Data required:** logon events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/1/3/4/4/4/5

### DV-12 — Persistently Degraded Devices
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Problem Manager
- **Business question:** Which devices stay bad week after week?
- **Primary KPI:** Weeks degraded ≥K
- **Secondary KPIs:** —
- **Time parameter:** 90d
- **Measures:** persistence
- **Dimensions:** machine
- **Aggregation:** COUNT weeks
- **Visualization:** ranked
- **Drill-down:** device timeline
- **Alert/anomaly:** Yes
- **Insight generated:** Chronic devices
- **Data required:** daily features
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/4/3/4/5/3/5

## Application Experience

### AP-01 — Application Reliability Pareto
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** App Owner, Service Desk
- **Business question:** Which apps create the most friction?
- **Primary KPI:** Crashes+hangs by app
- **Secondary KPIs:** devices, users affected
- **Time parameter:** 7d/30d
- **Measures:** counts, rates
- **Dimensions:** application_name, version
- **Aggregation:** COUNT / RATE
- **Visualization:** Pareto
- **Drill-down:** app→device→event
- **Alert/anomaly:** Yes
- **Insight generated:** Top friction apps
- **Data required:** events_v2
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/5/2/4/5/3/5

### AP-02 — Application Crash Storm Detector
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** IT Ops
- **Business question:** Is there an emerging crash storm?
- **Primary KPI:** Crash rate vs baseline
- **Secondary KPIs:** new versions
- **Time parameter:** hourly/daily
- **Measures:** rate delta
- **Dimensions:** app, customer
- **Aggregation:** RATE
- **Visualization:** control chart
- **Drill-down:** app→machines
- **Alert/anomaly:** Yes
- **Insight generated:** Storm vs baseline
- **Data required:** events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/5/3/4/5/3/5

### AP-03 — Application Hangs
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Desktop Engineer
- **Business question:** Which apps hang and where?
- **Primary KPI:** Hang count
- **Secondary KPIs:** devices
- **Time parameter:** 7d
- **Measures:** hangs
- **Dimensions:** app, device_group
- **Aggregation:** COUNT
- **Visualization:** heatmap
- **Drill-down:** event detail
- **Alert/anomaly:** Yes
- **Insight generated:** Hang clusters
- **Data required:** events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/5/4/5/2/3/4/2/5

### AP-04 — Application Launch Time
- **Priority:** P0 · **Data status:** DATA GAP
- **Persona:** App Owner
- **Business question:** Are apps slow to start?
- **Primary KPI:** Launch p95
- **Secondary KPIs:** % slow launches
- **Time parameter:** 7d
- **Measures:** launch ms
- **Dimensions:** app, version, device
- **Aggregation:** P95
- **Visualization:** box
- **Drill-down:** version
- **Alert/anomaly:** Yes
- **Insight generated:** Slow version
- **Data required:** launch timing
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/1/3/4/4/3/5

### AP-05 — Application Resource Hotspots
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Desktop Engineer
- **Business question:** Which processes burn CPU/memory?
- **Primary KPI:** Process p95 CPU/mem
- **Secondary KPIs:** devices
- **Time parameter:** 7d
- **Measures:** process_cpu, process_mem
- **Dimensions:** process_name, version
- **Aggregation:** P95
- **Visualization:** ranked table
- **Drill-down:** process→device
- **Alert/anomaly:** Yes
- **Insight generated:** Resource hogs
- **Data required:** process_telemetry
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/5/2/3/4/2/5

### AP-06 — App Performance by Version
- **Priority:** P1 · **Data status:** PARTIAL
- **Persona:** App Owner
- **Business question:** Did a version regress?
- **Primary KPI:** Crash rate by version
- **Secondary KPIs:** CPU p95
- **Time parameter:** 30d
- **Measures:** rate
- **Dimensions:** software_version
- **Aggregation:** RATE
- **Visualization:** bar compare
- **Drill-down:** version→devices
- **Alert/anomaly:** Yes
- **Insight generated:** Bad version
- **Data required:** version fields filled
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/3/3/4/4/3/5

### AP-07 — App Performance by Location
- **Priority:** P1 · **Data status:** BUILDABLE
- **Persona:** EUC
- **Business question:** Is an app bad only at some sites?
- **Primary KPI:** Crash/latency by site
- **Secondary KPIs:** —
- **Time parameter:** 7d
- **Measures:** rate, p95
- **Dimensions:** device_group, app
- **Aggregation:** RATE/P95
- **Visualization:** heatmap
- **Drill-down:** site
- **Alert/anomaly:** Yes
- **Insight generated:** Site×app interaction
- **Data required:** events+url
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/5/4/4/3/4/4/3/5

### AP-08 — Business-Critical App Experience Pack
- **Priority:** P0 · **Data status:** BUILDABLE (config-driven)
- **Persona:** Business Leader, App Owner
- **Business question:** How healthy are critical line-of-business apps?
- **Primary KPI:** Composite app score
- **Secondary KPIs:** URL p95, crashes, process CPU
- **Time parameter:** 7d
- **Measures:** multi
- **Dimensions:** app from config
- **Aggregation:** COMPOSITE
- **Visualization:** scorecards
- **Drill-down:** app story
- **Alert/anomaly:** Yes
- **Insight generated:** Critical app risk
- **Data required:** config critical apps + V2
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/4/3/5/5/5/4

## Network Experience

### NW-01 — Network Latency Outliers
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Network/EUC
- **Business question:** Which devices have intolerable RTT?
- **Primary KPI:** Devices with p95 RTT above peer baseline
- **Secondary KPIs:** max RTT
- **Time parameter:** 7d
- **Measures:** p50/p95 RTT
- **Dimensions:** machine, device_group, process
- **Aggregation:** P95
- **Visualization:** ranked + scatter
- **Drill-down:** device→connections
- **Alert/anomaly:** Yes
- **Insight generated:** Latency disasters hidden by averages
- **Data required:** network_telemetry
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/5/2/4/5/3/5

### NW-02 — DNS Performance
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Network
- **Business question:** Is DNS a hidden friction source?
- **Primary KPI:** DNS p95
- **Secondary KPIs:** affected devices
- **Time parameter:** 7d
- **Measures:** dns_lookup_time
- **Dimensions:** machine, site
- **Aggregation:** P95
- **Visualization:** ranked
- **Drill-down:** device
- **Alert/anomaly:** Yes
- **Insight generated:** DNS outliers
- **Data required:** dns metric
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/5/4/5/2/3/4/2/5

### NW-03 — Packet Loss / Reliability
- **Priority:** P0 · **Data status:** DATA GAP
- **Persona:** Network
- **Business question:** Where is loss impacting UX?
- **Primary KPI:** Loss % p95
- **Secondary KPIs:** —
- **Time parameter:** 24h
- **Measures:** loss
- **Dimensions:** site, SSID
- **Aggregation:** P95
- **Visualization:** heatmap
- **Drill-down:** device
- **Alert/anomaly:** Yes
- **Insight generated:** Lossy sites
- **Data required:** packet loss
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/1/3/4/5/3/5

### NW-04 — Wi-Fi Experience
- **Priority:** P1 · **Data status:** PARTIAL (inventory string only)
- **Persona:** EUC
- **Business question:** Is Wi-Fi quality driving tickets?
- **Primary KPI:** RSSI/SNR distributions
- **Secondary KPIs:** roaming
- **Time parameter:** 7d
- **Measures:** signal
- **Dimensions:** SSID, AP
- **Aggregation:** P10 signal
- **Visualization:** distribution
- **Drill-down:** SSID→device
- **Alert/anomaly:** Yes
- **Insight generated:** Weak Wi-Fi cohorts
- **Data required:** wifi metrics
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/5/4/2/3/3/4/2/5

### NW-05 — VPN Experience
- **Priority:** P1 · **Data status:** PARTIAL (status only)
- **Persona:** EUC
- **Business question:** Is VPN hurting remote work?
- **Primary KPI:** VPN RTT/loss
- **Secondary KPIs:** connect fails
- **Time parameter:** 7d
- **Measures:** vpn metrics
- **Dimensions:** user, ISP
- **Aggregation:** P95
- **Visualization:** trend
- **Drill-down:** user
- **Alert/anomaly:** Yes
- **Insight generated:** VPN friction
- **Data required:** vpn series
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/2/3/4/4/3/5

### NW-06 — Network by Office
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** IT Director
- **Business question:** Which offices have poor network UX?
- **Primary KPI:** Site p95 RTT
- **Secondary KPIs:** DNS, failures
- **Time parameter:** 7d
- **Measures:** p95
- **Dimensions:** device_group
- **Aggregation:** P95
- **Visualization:** bar
- **Drill-down:** office→device
- **Alert/anomaly:** Yes
- **Insight generated:** Office network risk
- **Data required:** network+group
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/5/2/3/4/4/5

### NW-07 — Connection Failure Recurrence
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Problem Manager
- **Business question:** Which network conditions keep failing?
- **Primary KPI:** Recurring failure count
- **Secondary KPIs:** remediation outcomes
- **Time parameter:** 30d
- **Measures:** failure events
- **Dimensions:** condition, site
- **Aggregation:** COUNT
- **Visualization:** ranked
- **Drill-down:** condition→remediation
- **Alert/anomaly:** Yes
- **Insight generated:** Repeat network problems
- **Data required:** events network/failure
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/5/2/4/5/3/5

### NW-08 — Network-Driven Experience Degradation
- **Priority:** P1 · **Data status:** PARTIAL
- **Persona:** EUC
- **Business question:** When network is bad, does app UX tank?
- **Primary KPI:** Correlation RTT vs URL p95
- **Secondary KPIs:** —
- **Time parameter:** 7d
- **Measures:** corr
- **Dimensions:** site
- **Aggregation:** CORR
- **Visualization:** scatter
- **Drill-down:** site
- **Alert/anomaly:** Optional/No
- **Insight generated:** Network as driver
- **Data required:** network+url aligned
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/4/4/3/4/5/3/3/4

## SaaS / URL Experience

### URL-01 — SaaS Response Time
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** App Owner
- **Business question:** Which domains are slow for employees?
- **Primary KPI:** HTTP p95 by domain
- **Secondary KPIs:** p50, 5xx
- **Time parameter:** 7d
- **Measures:** http_response_time
- **Dimensions:** domain, first_party
- **Aggregation:** P50/P95
- **Visualization:** ranked
- **Drill-down:** domain→url→device
- **Alert/anomaly:** Yes
- **Insight generated:** Slow SaaS
- **Data required:** url_telemetry
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/5/2/3/4/3/5

### URL-02 — HTTP Error Burst
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** IT Ops
- **Business question:** Are 5xx/4xx bursting?
- **Primary KPI:** Error rate
- **Secondary KPIs:** devices
- **Time parameter:** 1h/24h
- **Measures:** status_code rates
- **Dimensions:** domain
- **Aggregation:** RATE
- **Visualization:** timeline
- **Drill-down:** domain
- **Alert/anomaly:** Yes
- **Insight generated:** Error storms
- **Data required:** url status
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/5/4/5/2/3/5/2/5

## Employee Experience

### EM-01 — Employees with Poor Experience
- **Priority:** P0 · **Data status:** BUILDABLE (weak identity)
- **Persona:** Service Desk Manager
- **Business question:** Who is having a bad week?
- **Primary KPI:** Users above impact threshold
- **Secondary KPIs:** top drivers
- **Time parameter:** 7d
- **Measures:** impact
- **Dimensions:** user_name, device_group
- **Aggregation:** SCORE
- **Visualization:** ranked
- **Drill-down:** user
- **Alert/anomaly:** Yes
- **Insight generated:** Help-first list
- **Data required:** user+metrics+events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/4/3/4/5/3/5

### EM-02 — Persistent Employee Problems
- **Priority:** P1 · **Data status:** BUILDABLE
- **Persona:** Problem Manager
- **Business question:** Who has recurring issues?
- **Primary KPI:** Users degraded ≥N weeks
- **Secondary KPIs:** —
- **Time parameter:** 90d
- **Measures:** persistence
- **Dimensions:** user
- **Aggregation:** COUNT
- **Visualization:** ranked
- **Drill-down:** user timeline
- **Alert/anomaly:** Yes
- **Insight generated:** Chronic sufferers
- **Data required:** history
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/5/4/4/3/4/4/3/5

### EM-03 — Experience by Role/Persona
- **Priority:** P2 · **Data status:** DATA GAP
- **Persona:** HR, EUC
- **Business question:** Do roles differ?
- **Primary KPI:** Score by role
- **Secondary KPIs:** —
- **Time parameter:** 30d
- **Measures:** —
- **Dimensions:** role
- **Aggregation:** P50
- **Visualization:** box
- **Drill-down:** role
- **Alert/anomaly:** Optional/No
- **Insight generated:** Role gaps
- **Data required:** HR role
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/4/4/1/4/3/2/4/3

### EM-04 — Sentiment + Tech Combined DEX
- **Priority:** P2 · **Data status:** DATA GAP
- **Persona:** CIO
- **Business question:** What do employees feel vs what tech shows?
- **Primary KPI:** Combined DEX
- **Secondary KPIs:** topics
- **Time parameter:** monthly
- **Measures:** sentiment, tech
- **Dimensions:** dept
- **Aggregation:** COMPOSITE
- **Visualization:** dual axis
- **Drill-down:** topic
- **Alert/anomaly:** Optional/No
- **Insight generated:** Tech-sentiment gap
- **Data required:** surveys
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/1/5/5/3/5/3

## IT Operations

### OP-01 — Incident Drivers (Telemetry)
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Service Desk Manager
- **Business question:** What telemetry patterns drive pain?
- **Primary KPI:** Top event types by impact
- **Secondary KPIs:** sites
- **Time parameter:** 7d
- **Measures:** events, affected
- **Dimensions:** event_type, app
- **Aggregation:** COUNT
- **Visualization:** Pareto
- **Drill-down:** type→entities
- **Alert/anomaly:** Yes
- **Insight generated:** Driver ranking
- **Data required:** events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/5/2/3/4/3/5

### OP-02 — Recurring Problems
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Problem Manager
- **Business question:** What keeps coming back?
- **Primary KPI:** Recurrence score
- **Secondary KPIs:** —
- **Time parameter:** 30d
- **Measures:** repeat conditions
- **Dimensions:** condition, site
- **Aggregation:** COUNT
- **Visualization:** ranked
- **Drill-down:** condition
- **Alert/anomaly:** Yes
- **Insight generated:** Repeat offenders
- **Data required:** events attributes
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/4/3/4/5/3/5

### OP-03 — Top Problematic Locations
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** IT Ops
- **Business question:** Which locations generate the most pain?
- **Primary KPI:** Impact by device_group
- **Secondary KPIs:** —
- **Time parameter:** 7d
- **Measures:** impact
- **Dimensions:** device_group
- **Aggregation:** SCORE
- **Visualization:** bar
- **Drill-down:** location
- **Alert/anomaly:** Yes
- **Insight generated:** Hot sites
- **Data required:** cohorts
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/5/2/3/4/4/5

### OP-04 — ITSM Incident Volume / MTTR
- **Priority:** P1 · **Data status:** DATA GAP
- **Persona:** Service Desk
- **Business question:** Are tickets and MTTR improving?
- **Primary KPI:** Ticket volume, MTTR
- **Secondary KPIs:** reopen
- **Time parameter:** 30d
- **Measures:** ITSM
- **Dimensions:** category
- **Aggregation:** AVG/P50 MTTR
- **Visualization:** trend
- **Drill-down:** ticket
- **Alert/anomaly:** Optional/No
- **Insight generated:** Ops load
- **Data required:** ITSM
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/1/4/3/3/4/5

### OP-05 — Major Incident Command Mirror
- **Priority:** P1 · **Data status:** PARTIAL (cadence)
- **Persona:** IT Ops
- **Business question:** What is blast radius right now?
- **Primary KPI:** Affected users now
- **Secondary KPIs:** sites, apps
- **Time parameter:** current
- **Measures:** live counts
- **Dimensions:** app, site
- **Aggregation:** COUNT
- **Visualization:** ops board
- **Drill-down:** entity
- **Alert/anomaly:** Yes
- **Insight generated:** Blast radius
- **Data required:** high-freq events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/3/4/4/5/3/5

## Endpoint Management

### EP-01 — Compliance Posture
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Security/Endpoint
- **Business question:** Which controls are failing where?
- **Primary KPI:** % devices non-compliant by control
- **Secondary KPIs:** device list
- **Time parameter:** latest snapshot
- **Measures:** compliance_status
- **Dimensions:** control, device_group
- **Aggregation:** % / COUNT
- **Visualization:** heatmap + table
- **Drill-down:** control→device
- **Alert/anomaly:** Yes
- **Insight generated:** Control regressions
- **Data required:** compliance_v2
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/3/5/2/3/4/3/5

### EP-02 — OS Distribution & Adoption
- **Priority:** P1 · **Data status:** DATA GAP
- **Persona:** Endpoint Manager
- **Business question:** What OS/build mix do we have?
- **Primary KPI:** Devices by OS build
- **Secondary KPIs:** —
- **Time parameter:** latest
- **Measures:** counts
- **Dimensions:** os
- **Aggregation:** COUNT
- **Visualization:** treemap
- **Drill-down:** build→devices
- **Alert/anomaly:** Optional/No
- **Insight generated:** Stale OS
- **Data required:** OS inventory
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/4/3/1/2/2/2/3/5

### EP-03 — Software Inventory & Drift
- **Priority:** P1 · **Data status:** BUILDABLE
- **Persona:** Endpoint Manager
- **Business question:** What is installed and outdated?
- **Primary KPI:** App version sprawl
- **Secondary KPIs:** has_ui
- **Time parameter:** latest
- **Measures:** versions
- **Dimensions:** software_name
- **Aggregation:** COUNT DISTINCT version
- **Visualization:** table
- **Drill-down:** app→devices
- **Alert/anomaly:** Optional/No
- **Insight generated:** Version sprawl
- **Data required:** software_inventory_v2
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 3/4/3/4/2/2/2/2/5

### EP-04 — Hardware Inventory
- **Priority:** P1 · **Data status:** PARTIAL (adapters only)
- **Persona:** Asset Manager
- **Business question:** What hardware do we own?
- **Primary KPI:** Devices by model
- **Secondary KPIs:** chassis
- **Time parameter:** latest
- **Measures:** counts
- **Dimensions:** manufacturer, model
- **Aggregation:** COUNT
- **Visualization:** table
- **Drill-down:** model
- **Alert/anomaly:** Optional/No
- **Insight generated:** Fleet composition
- **Data required:** full inventory
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/4/3/2/2/2/1/3/5

### EP-05 — Stale / Silent Devices
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Endpoint Manager
- **Business question:** Which devices stopped reporting?
- **Primary KPI:** Devices with last_seen > SLA
- **Secondary KPIs:** —
- **Time parameter:** current
- **Measures:** last server_time
- **Dimensions:** machine
- **Aggregation:** MAX time
- **Visualization:** ranked
- **Drill-down:** device
- **Alert/anomaly:** Yes
- **Insight generated:** Silent estate
- **Data required:** any V2 heartbeat
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/5/3/5/2/3/4/2/5

## Automation / Self-Healing

### AU-01 — Automations Executed
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** IT Ops, Automation Owner
- **Business question:** How much autoheal ran?
- **Primary KPI:** Remediation actions count
- **Secondary KPIs:** by action
- **Time parameter:** 7d/30d
- **Measures:** events remediation
- **Dimensions:** remediation, status
- **Aggregation:** COUNT
- **Visualization:** trend + bar
- **Drill-down:** action
- **Alert/anomaly:** Optional/No
- **Insight generated:** Automation volume
- **Data required:** events remediation
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/5/2/5/5/4/5

### AU-02 — Automation Success vs Failure
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Automation Owner
- **Business question:** What works?
- **Primary KPI:** Success rate
- **Secondary KPIs:** fail reasons
- **Time parameter:** 30d
- **Measures:** completed vs failed
- **Dimensions:** remediation, entity
- **Aggregation:** RATE
- **Visualization:** stacked bar
- **Drill-down:** failed→devices
- **Alert/anomaly:** Yes
- **Insight generated:** Failing playbooks
- **Data required:** events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/5/2/5/5/4/5

### AU-03 — Self-Help Adoption
- **Priority:** P1 · **Data status:** BUILDABLE
- **Persona:** EUC Manager
- **Business question:** Are employees approving remediations?
- **Primary KPI:** Self-help executions
- **Secondary KPIs:** success
- **Time parameter:** 30d
- **Measures:** self_help events
- **Dimensions:** user, site
- **Aggregation:** COUNT
- **Visualization:** trend
- **Drill-down:** user
- **Alert/anomaly:** Optional/No
- **Insight generated:** Adoption
- **Data required:** self_help
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 4/4/3/5/2/5/4/3/4

### AU-04 — Repeat Problems After Remediation
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Problem Manager
- **Business question:** Did autoheal stick?
- **Primary KPI:** Recurrence within 7d after completed
- **Secondary KPIs:** —
- **Time parameter:** 30d
- **Measures:** repeat
- **Dimensions:** condition
- **Aggregation:** RATE
- **Visualization:** ranked
- **Drill-down:** condition
- **Alert/anomaly:** Yes
- **Insight generated:** Non-sticky fixes
- **Data required:** remediation+failure events
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/4/3/5/5/3/5

### AU-05 — Experience After Automation
- **Priority:** P0 · **Data status:** PARTIAL (cadence)
- **Persona:** CIO, Automation Owner
- **Business question:** Did UX improve after autoheal?
- **Primary KPI:** Metric uplift post-action
- **Secondary KPIs:** verified flag
- **Time parameter:** action±window
- **Measures:** before/after p95
- **Dimensions:** action
- **Aggregation:** DELTA
- **Visualization:** before/after
- **Drill-down:** action→device
- **Alert/anomaly:** Optional/No
- **Insight generated:** Proven improvement
- **Data required:** remediation+metrics
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/3/4/5/5/5/4

### AU-06 — Tickets Avoided (Estimated)
- **Priority:** P2 · **Data status:** DATA GAP (needs model/ITSM)
- **Persona:** IT Director
- **Business question:** How much support load did we avoid?
- **Primary KPI:** Estimated tickets avoided
- **Secondary KPIs:** $
- **Time parameter:** 30d
- **Measures:** successful remediations×weight
- **Dimensions:** category
- **Aggregation:** MODEL
- **Visualization:** KPI
- **Drill-down:** category
- **Alert/anomaly:** Optional/No
- **Insight generated:** Deflection estimate
- **Data required:** ITSM or model assumptions
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/1/4/5/3/5/4

## Business Impact

### BI-01 — Employees Impacted Summary
- **Priority:** P0 · **Data status:** BUILDABLE
- **Persona:** Business Leader
- **Business question:** How many people felt pain?
- **Primary KPI:** Impacted employee count/%
- **Secondary KPIs:** sites
- **Time parameter:** 7d
- **Measures:** users
- **Dimensions:** device_group
- **Aggregation:** COUNT DISTINCT
- **Visualization:** KPI + bar
- **Drill-down:** cohort
- **Alert/anomaly:** Optional/No
- **Insight generated:** Human blast radius
- **Data required:** user_name
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/4/2/3/3/5/3

### BI-02 — Hours Productivity at Risk
- **Priority:** P2 · **Data status:** DATA GAP
- **Persona:** CIO
- **Business question:** How much time was lost?
- **Primary KPI:** Estimated hours
- **Secondary KPIs:** $
- **Time parameter:** 30d
- **Measures:** model
- **Dimensions:** dept
- **Aggregation:** SUM
- **Visualization:** KPI
- **Drill-down:** dept
- **Alert/anomaly:** Optional/No
- **Insight generated:** Cost of friction
- **Data required:** session+cost model
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/5/1/5/4/2/5/3

### BI-03 — Applications Creating Greatest Business Impact
- **Priority:** P1 · **Data status:** BUILDABLE (config)
- **Persona:** Business Leader
- **Business question:** Which apps hurt the business most?
- **Primary KPI:** Impact-weighted app score
- **Secondary KPIs:** —
- **Time parameter:** 30d
- **Measures:** criticality×friction
- **Dimensions:** app
- **Aggregation:** SCORE
- **Visualization:** ranked
- **Drill-down:** app
- **Alert/anomaly:** Optional/No
- **Insight generated:** Business-weighted Pareto
- **Data required:** criticality config + events/url
- **Scores (S/C/Comp/Data/Cx/Diff/Auto/Exec/Ops):** 5/5/4/4/3/4/3/5/3

---

## Counts by priority & data status

| Priority | Count |
|----|----|
| P0 | 38 |
| P1 | 19 |
| P2 | 6 |
| P3 | 2 |

| Data status prefix | Count |
|----|----|
| BUILDABLE | 36 |
| DATA | 20 |
| PARTIAL | 9 |

## Document History

| Date | Change | Status |
|------|--------|--------|
| 2026-08-15 | Full catalog with prioritization matrix | implemented |
