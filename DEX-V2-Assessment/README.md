# Nanoheal DEX V2 Data Assessment & Platform Design

**Date:** 2026-08-15  
**Scope:** Apache Pinot tables containing `V2` only (read-only)  
**Pinot host:** `d1-wfwvzr.nanoheal.app`  
**Classification:** Internal product / technical assessment

---

## Brutally honest headline

**Verdict: PARTIALLY**

Current V2 data can support a **credible endpoint operations + remediation analytics layer**, and a **subset** of device/application/network experience views. It **cannot** currently support a full competitive DEX product comparable to Nexthink or Lakeside SysTrack.

| Question | Answer |
|----------|--------|
| Can we build a serious DEX platform from this data alone? | **PARTIALLY** |
| Could we credibly sell “DEX analytics” vs Nexthink/Lakeside today? | **No** |
| Is the V2 schema a viable foundation? | **Yes — if cadence, coverage, identity, and scoring mature** |
| DEX readiness score (0–100) | **38 / 100** |

---

## Documents

| # | Document | Path |
|---|----------|------|
| 0 | Reconciliation vs Claude live audit | [00-RECONCILIATION-CLAUDE-AUDIT.md](00-RECONCILIATION-CLAUDE-AUDIT.md) |
| 1 | Current Data Assessment | [01-current-data-assessment.md](01-current-data-assessment.md) |
| 2 | Competitive DEX Analysis | [02-competitive-dex-analysis.md](02-competitive-dex-analysis.md) |
| 3 | Complete Dashboard Catalog | [03-dashboard-catalog.md](03-dashboard-catalog.md) |
| 4 | Data Gap Analysis | [04-data-gap-analysis.md](04-data-gap-analysis.md) |
| 5 | Insight Engine Design | [05-insight-engine-design.md](05-insight-engine-design.md) |
| 6 | Production Architecture | [06-production-architecture.md](06-production-architecture.md) |
| 7 | Competitive Roadmap | [07-competitive-roadmap.md](07-competitive-roadmap.md) |
| 8 | Working Dashboards | [08-working-dashboards/](08-working-dashboards/) |
| — | Live query snapshot | [data/live-query-snapshot.json](data/live-query-snapshot.json) |
| — | Production SQL templates | [sql/production-queries.sql](sql/production-queries.sql) |

---

## What V2 tables exist

| Table | Role |
|-------|------|
| `system_telemetry_metrics_v2` | Device CPU, memory, disk, boot/logon, NIC speed (+ demo `score`) |
| `process_telemetry_metrics_v2` | Per-process CPU / memory % |
| `network_connection_telemetry_v2` | Process-scoped RTT (`avg_rtt_ms`), DNS, bytes, TCP, packet loss / retransmits (NIC counters on `system_telemetry_metrics_v2`) |
| `url_telemetry_v2` | HTTP response time by URL/domain |
| `events_v2` | Crashes, hangs, network failures, remediation, logon |
| `compliance_v2` | AV / firewall / UAC / update / backup controls |
| `inventory_v2` | Network adapter + device/OS survey snapshots |
| `software_inventory_v2` | Installed software snapshot |
| `sentiment_pulse_v2` | Employee pulse / survey responses (demo seed; create on cluster at reload) |

Join key across tables: `(customer_id, machine_id)` (+ optional `user_name`, `device_group`).

**Demo vs live:** Memory, boot/login, inventory richness, 30‑min cadence, packet loss, scores, and sentiment are present in the **demo seed expander**. Live cluster may lag until purge+reload. ITSM and remediation↔metric before/after remain open.

---

## Competitive strategy (one line)

Do **not** copy hundreds of competitor charts. Build **~25 intelligent story surfaces** + an **insight engine** that turns telemetry into impact-ranked, remediable, before/after-proven findings — and close the **data cadence / coverage gaps** that make those findings trustworthy.

---

## Working dashboards

Open [08-working-dashboards/index.html](08-working-dashboards/index.html) via a local static server. Dashboards use a **live Pinot snapshot** (not invented data) and document the exact SQL. Views that cannot be built honestly are labeled **DATA GAP**.

```bash
cd DEX-V2-Assessment/08-working-dashboards && python3 -m http.server 8766
# → http://127.0.0.1:8766/
```

---

## Document History

| Date | Change | Status |
|------|--------|--------|
| 2026-08-15 | Added sentiment_pulse_v2; note demo-seed vs live for Claude gaps | implemented |
| 2026-08-15 | Initial V2 Pinot assessment, catalog, gaps, architecture, roadmap, working dashboards | implemented |
