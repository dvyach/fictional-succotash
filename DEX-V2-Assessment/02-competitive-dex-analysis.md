# Document 2 — Competitive DEX Analysis

**Status:** implemented · 2026-08-15  
**Focus:** Analytical capabilities and “insight products,” not UI cloning

---

## 1. What competitors actually sell

DEX leaders do **not** primarily sell charts. They sell:

1. **A quantified experience score** employees and executives can track  
2. **Who is impacted** (users, cohorts, locations) — not just which counters moved  
3. **Why** (device / app / network / collaboration / sentiment drivers)  
4. **What to do** (remediation, automation, refresh, ticket deflection)  
5. **Proof** (before/after, tickets avoided, hours recovered)

| Vendor | Core “insight product” | Data intensity | Closed-loop strength |
|--------|------------------------|----------------|----------------------|
| **Nexthink** | DEX Score = Technology + Sentiment; Experience Central; employee insights | High endpoint + soft surveys | Strong (Act / Engage / Flow) |
| **Lakeside SysTrack** | Health/productivity scores from extremely dense endpoint telemetry (~10k pts / 15s) | Highest raw density | Strong sensors + automation packs |
| **ControlUp** | Real-time session/device grid + script actions; VDI/EUC heritage | High real-time | Strong operational remediation |
| **1E** | Real-time instruction / autonomous IT; ServiceNow-aligned actions | High actionability | Extremely strong orchestration |
| **Aternity (Riverbed)** | App + network + endpoint UX; productivity impact framing | High APM-adjacent | Moderate–strong |
| **Microsoft Endpoint Analytics** | Boot, sign-in, app reliability, startup — M365-native | Medium, Microsoft-centric | Via Intune remediations |
| **Nanoheal (current V2)** | Endpoint metrics + crashes + URL + compliance + **autoheal events** | Low–medium density; schema promising | **Differentiator if proven** |

---

## 2. Insight reverse-engineering (selected high-value use cases)

### 2.1 “Poor employee digital experience” (Nexthink Overview / DEX Score)

| Element | Requirement |
|---------|-------------|
| Presented | Org DEX 0–100, tech vs sentiment, trend, drivers |
| Raw data | Endpoint + app + collab + survey responses + identity |
| Derived | Daily per-employee scores, driver deltas, “what changed” |
| Dimensions | Geo, dept, persona, device model, remote/office |
| Method | Weighted composite + baselines + cohort compare |
| **Our V2** | No sentiment; score unused; coarse metrics; weak identity |
| **Gap** | Scoring engine + sentiment + finer telemetry + HR/directory |
| **Approx now?** | Proxy “tech risk index” from CPU/disk/RTT/crash rates only — **must not** brand as DEX Score |

### 2.2 “Slow devices / health score” (Lakeside)

| Element | Requirement |
|---------|-------------|
| Presented | Devices below health threshold; impact ranking |
| Raw data | High-freq CPU, memory, disk, paging, process |
| Derived | Sustained breach duration, persistence, persona segments |
| **Our V2** | CPU + disk free + process CPU/mem; no system RAM/paging |
| **Gap** | Memory, disk latency, cadence ≤1–5 min |
| **Approx now?** | Outlier devices by p95 CPU + critical disk — **yes** |

### 2.3 “Application performance problems”

| Element | Requirement |
|---------|-------------|
| Presented | Worst apps by launch, crash, hang, resource, UX |
| Raw data | App lifecycle, crashes, hangs, versions, usage |
| **Our V2** | Crashes/hangs strong; process resources; no launch time |
| **Gap** | Launch/ready time, hang duration, focus time |
| **Approx now?** | Crash/hang Pareto + process p95 — **partial** |

### 2.4 “Network experience / hybrid work”

| Element | Requirement |
|---------|-------------|
| Presented | Latency, loss, Wi-Fi, VPN, office vs home |
| Raw data | RTT, loss, DNS, SSID, AP, VPN, ISP |
| **Our V2** | RTT/DNS/bytes/TCP; SSID on inventory; VPN status string |
| **Gap** | Packet loss, Wi-Fi quality metrics, VPN performance series |
| **Approx now?** | RTT/DNS outliers by device_group — **partial** |

### 2.5 “Login / boot problems” (Microsoft + Nexthink)

| **Our V2** | ❌ Missing entirely |

### 2.6 “Recurring incidents / automation opportunities”

| Element | Requirement |
|---------|-------------|
| Presented | Repeat failures, autoheal success, tickets avoided |
| **Our V2** | Remediation completed/failed + self_help — **strong** |
| **Gap** | ITSM ticket linkage for “tickets avoided” proof |
| **Approx now?** | Remediation effectiveness dashboards — **yes** |

### 2.7 “Productivity loss / cost of poor experience”

| **Our V2** | ❌ Not honest without session duration, friction events, wage/cost model inputs |

### 2.8 “Experience improvement after remediation”

| **Our V2** | ⚠️ Possible: join remediation timestamp → subsequent metric/event rates; weakened by coarse sampling |

---

## 3. Competitive mapping summary

| Competitor insight | Required data | Our V2 | Gap | Implementation path |
|--------------------|---------------|--------|-----|---------------------|
| DEX / Health score | Broad metrics + weights + optional sentiment | Score column empty; thin metrics | P0 scoring + cadence | Feature store + score service |
| Impacted employees | User + org hierarchy | user_name only | Directory sync | Identity resolution |
| Slow device | High-freq CPU/mem/disk | Coarse CPU/disk | Cadence + RAM | Agent metric pack |
| App friction | Launch/crash/hang/version | Crash/hang/process | Launch timing | App UX sensors |
| Network UX | RTT/loss/Wi-Fi/VPN | RTT/DNS/TCP | Loss/Wi-Fi/VPN series | Network pack |
| Collab UX (Teams/Zoom) | Collab-specific QoE | Process CPU only | Media metrics | Collab sensors / APIs |
| Sentiment | Campaigns | None | Survey channel | Engage module |
| Automation ROI | Actions + outcomes + tickets | Actions/outcomes | ITSM | ITSM connector |
| Hardware refresh | Device age + score | Thin inventory | HW CMDB fields | Inventory expansion |

---

## 4. Where Nanoheal can differentiate (not by cloning charts)

1. **Closed-loop remediation already in `events_v2`** — competitors talk automation; we can measure completed vs failed autoheal with verification flags.  
2. **Employee self-help events** — rare in pure analytics tools.  
3. **Banking / vertical app + URL telemetry** (teller, core banking) — industry packs > generic dashboards.  
4. **Insight-first UX** (story surfaces) instead of 200 peer dashboards — aligned with existing AetherDEX blueprint direction.  
5. **Customer-specific baselines** as a first-class product, not fixed 80% CPU rules.

**Do not compete** by matching Lakeside’s raw datapoint volume on day one. Compete by **action → outcome → proof**, then close telemetry gaps that make proof scientifically valid.

---

## 5. Strategic product choice

| Option | Recommendation |
|--------|----------------|
| Large dashboard library (100+) | **No as primary** — creates BI tool parity race |
| Few intelligent dashboards + insight engine | **Yes — primary** |
| Both | **Yes — secondary**: Library of specialist views for analysts, behind story UX |

**Concrete strategy:** Ship **5 story surfaces** (Pulse, Experience, Reliability, Operations, Decide) powered by **~40 reusable metrics** and **~15 insight templates**, with a **Library** of specialist dashboards for power users. Prioritize remediation ROI and outlier impact over vanity averages.

---

## Document History

| Date | Change | Status |
|------|--------|--------|
| 2026-08-15 | Competitive insight reverse-engineering vs V2 | implemented |
