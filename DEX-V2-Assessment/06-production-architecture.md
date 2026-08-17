# Document 6 — Production Architecture

**Status:** implemented · 2026-08-15  
**Constraint:** Identical V2 schemas across customers; radically different data volumes and distributions.

---

## 1. Reference architecture

```
Endpoint agent / collectors
        ↓
Ingestion (existing Nanoheal pipeline)
        ↓
Normalization → V2 Pinot tables (facts)
        ↓
Identity resolution service (device/user/org)
        ↓
Stream + batch feature jobs → feature tables (Pinot rollups / OLAP)
        ↓
Baseline store (per customer / cohort / device)
        ↓
Anomaly + Insight engine (stateless workers)
        ↓
Insight store (Postgres/QM entities)
        ↓
API (QM capabilities) → AEX story UX / Library dashboards
        ↓
Remediation control plane ←→ events_v2 outcomes
        ↓
Outcome measurement jobs
```

---

## 2. What runs where

| Layer | Technology recommendation | Why |
|-------|---------------------------|-----|
| Raw / hot metrics & events | **Apache Pinot (existing)** | Low-latency OLAP, multi-tenant `customer_id` filter |
| Long-term raw archive | Object storage (S3/GCS) | Cost; forensic replay |
| Identity / org graph | Existing IdP sync → QM/config DB | Small, relational |
| Baselines | Pinot rollup table **or** Redis/Postgres keyed stats | Small per entity |
| Insight objects | QM entities / Postgres | Workflow, state, ACL |
| Scoring / features | Batch (hourly/daily) + micro-batch 5m | Avoid per-dashboard heavy scans |
| ML (later) | Optional; start with stats | Fashion ≠ need |
| Dashboards | AEX frontend + Pinot SQL / QM capabilities | App owns UI (not QM packages) |

**Do not** invent a new warehouse unless Pinot query patterns fail at 500k devices after rollups.

---

## 3. Multi-tenant query contract

Every query:

```sql
WHERE customer_id = {tenant}
  AND server_time >= {from} AND server_time < {to}
```

Optional cohorts from **config**, not literals:

```sql
AND device_group IN ({selected_groups})
```

Metric filters from **metric dictionary**, not UI hard-coding.

---

## 4. Rollup tables (required for scale)

| Rollup | Grain | Purpose |
|--------|-------|---------|
| `device_metric_5m` | customer, machine, metric_name, 5m | Outliers, breach duration |
| `device_metric_1h` | + percentiles | Trends |
| `device_metric_1d` | daily p50/p95, breach minutes | Exec / baselines |
| `app_event_1d` | app, device, event_type | Crash rates |
| `remediation_1d` | action, status | ROI |

Pinot ingestion can populate rollups via upsert or separate offline jobs.

---

## 5. Maturity model

| Level | Name | Data | Analytics | Dashboards | Insights | Automation | Competitors | Nanoheal wedge |
|-------|------|------|-----------|------------|----------|------------|-------------|----------------|
| 0 | Inventory | HW/SW lists | Counts | Inventory | None | None | All | — |
| 1 | Endpoint health | CPU/disk/mem | Outliers | Device health | Threshold alerts | Scripts | ControlUp basics | — |
| 2 | Experience analytics | Scores, cohorts | Distributions | Experience | Ranked impacted users | Limited | Microsoft EA | — |
| 3 | App + network UX | Launch, RTT, loss, URL | Cross-domain | App/Net | Driver attribution | Playbooks | Nexthink tech score | Vertical URL packs |
| 4 | Correlation + RCA | Aligned timelines | Hypotheses | Investigate | Probable causes | Guided | Lakeside depth | — |
| 5 | Predictive | Features + labels | Risk forecasts | Risk | Early warning | Preemptive | Lakeside AI | — |
| 6 | Prescriptive / autonomous | Outcomes | Causal uplift | Decide | Next-best-action | Autoheal + proof | 1E + Nexthink Act | **Autoheal proof** |

**Current V2 ≈ Level 1.5** (health + events + remediation outcomes, weak cadence/identity/score).

**Target 12 months:** solid **Level 3** with closed-loop Level 6 **slice** (remediation proof) as differentiator.  
**Target 24 months:** Level 4–5 with selective autonomy.

---

## 6. Edge-case / scale rules

| Scale | Rule |
|-------|------|
| 500 devices | Compute percentiles in Pinot directly on 5m rollups |
| 50k | Precompute daily features; dashboards read rollups |
| 500k | Top-N insights only; sampling for exploratory scans; strict time bounds |

Always show **affected counts**, never only averages.

---

## Document History

| Date | Change | Status |
|------|--------|--------|
| 2026-08-15 | Production reference architecture + maturity model | implemented |
