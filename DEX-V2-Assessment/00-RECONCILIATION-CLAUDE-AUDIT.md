# Reconciliation — Composer assessment vs Claude live audit (2026-08-15)

**Purpose:** Cross-check Claude’s Aug 15 production Pinot audit against a fresh live re-query of `d1-wfwvzr.nanoheal.app` and against what actually exists in *this* `aex-dashboards` workspace.

**Shared verdict (unchanged):** **PARTIALLY** · Cannot credibly sell full DEX on V2 alone · Readiness ~**38/100**.

---

## 1. Live re-verification of Claude’s sharpest claims

| Claim | Live result (re-run this session) | Status |
|-------|-----------------------------------|--------|
| `DESKTOP-UI3DP80` ≈ 91.7% of `events_v2` | **27,284 / 29,737 = 91.75%** | **Confirmed** |
| Autoheal 100% Downtown vs 0% Northside | Downtown **60/60 completed**; Northside **0/30**; also Westgate **0/36**, Harborview **0/18** | **Confirmed** (Claude understated — Harborview/Westgate also 0%) |
| `score` always 0 | **5,040 / 5,040** zeros on `system_telemetry_metrics_v2` | **Confirmed** |
| NHL100005 AV+firewall Disabled | **32** Disabled observations each for `antivirus_status` and `firewall_enabled` | **Confirmed** (streak language OK if ~daily) |
| Sampling ~1–2×/day, irregular | Gaps on NHL100002 CPU: **1.7h – 30.1h**, median **~16.7h** | **Confirmed** (better than “~14h average” alone) |
| Blueprint unwired to V2 fields | Grep of KPI dictionary / semantic layer: **zero** `*_v2` / `cpu_usage_pct` literals | **Confirmed** |
| Subquery join needs multi-stage engine | `IN (SELECT …)` → Pinot SQLParsingError (multi-stage only) | **Confirmed** (operational constraint) |
| `process_version` unpopulated | Versions **are populated** for all tracked processes (Teams, Chrome, Outlook, TellerConnect, OneDrive, CoreBankingClient) | **Claude incorrect** — version-regression dashboards are **PARTIAL/BUILDABLE**, not DATA GAP |
| Live `dashboards/app.js` in this repo | **Not present** in current `aex-dashboards` tree (only Blueprint + `DEX-V2-Assessment/08-working-dashboards` snapshot HTML) | **Cannot confirm in this workspace** — may live in another clone/session artifact |

---

## 2. Where Claude’s audit is stronger (adopt)

1. **Events fleet-noise finding** — any crash KPI without `machine_id IN (telemetry fleet)` is mostly Symantec helper noise. Must be a hard query guard.
2. **Branch automation reliability** — Downtown vs Northside/Westgate/Harborview is the best “insight product” demo in the data.
3. **Two projects in one repo** — 28k-line unwired Blueprint vs thin/honest queryable surfaces. Do not treat Volume-3A’s 474 KPIs as buildable.
4. **Pinot SQL dialect constraints** — no `FILTER (WHERE)`, `ROWS` reserved, multi-stage for some joins.
5. **Allow-list reality** — 7 processes / 4 URL domains = vertical pack, not general observability.
6. **Remediation without metric linkage** — completed/failed exists; before/after proof does not.
7. **Strategic sequencing** — insight engine + P0 sensors first; do not expand the 474 catalog until fields exist.

---

## 3. Where the earlier Composer package remains useful

- Full structured catalog with prioritization scores (`03-dashboard-catalog.md`)
- Insight-engine / architecture / roadmap docs as product design (not claiming live wiring)
- Working **snapshot** dashboards under `DEX-V2-Assessment/08-working-dashboards/` (honest, labeled gaps)
- Canvas readiness scorecard

Treat Composer Docs 1–7 as **design + prioritization**; treat Claude’s Doc 1/4/7/8 narrative as the **stricter ground-truth data audit** (with the `process_version` correction above).

---

## 4. Corrected “buildable now” list (merged)

**Buildable with fleet-scope guards:**

- CPU / disk free outliers (P95, persistence counts) — never fleet AVG as primary
- Network RTT / DNS outliers by device and `device_group`
- URL/SaaS p50/p95 by domain (4 domains)
- Process CPU/mem **and version** for allow-listed apps
- Compliance posture + persistent non-compliance (NHL100005)
- Remediation success/fail by branch (Downtown vs others)
- Crash/hang rates **only after excluding non-fleet machines** (or joining to telemetry device set)

**Still DATA GAP (live / product):** ITSM tickets, remediation→metric before/after linkage, directory dept/BU/persona, live agent mappers for DART packs that are demo-only today.

**Demo-seed closed (NDJSON / expander; purge+reload cluster to see):** device-wide memory, boot/login, OS/hardware inventory (DART 61), 30‑min cadence, packet-loss series, populated `score` (`demo_tech_v1`), employee sentiment (`sentiment_pulse_v2`).

**Note:** Demo seed ≠ live agent capture. Cluster may still show older sparse/zero-score segments until reload.

---

## 5. Product implication (aligned)

Sell **cohort-aware anomaly + automation-reliability analytics** on CPU/network/compliance/events — not “DEX platform vs Nexthink.”

Highest leverage next steps (same in both audits):

1. Continuous sampling (1–5 min)  
2. Device-wide memory  
3. OS + hardware inventory populated  
4. Boot/login timing  
5. Populate `score` or remove the lie  
6. Fleet-scoped event filters in every crash query  
7. Remediation↔metric linkage  
8. Wire detectors / insight engine to real fields (don’t grow Blueprint KPIs unbound)

---

## Document History

| Date | Change | Status |
|------|--------|--------|
| 2026-08-15 | Split Still DATA GAP into demo-seed closed vs live/product open (sentiment_pulse_v2, packet loss, scores) | implemented |
| 2026-08-15 | Live re-verify Claude audit; reconcile with Composer package | implemented |
