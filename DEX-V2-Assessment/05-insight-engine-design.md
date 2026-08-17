# Document 5 — Insight Engine Design

**Status:** implemented · 2026-08-15  
**Goal:** Nanoheal must not become another BI tool. Telemetry → **actionable insight**.

---

## 1. Pipeline

```
Raw telemetry (Pinot V2 + future packs)
        ↓
Normalization (metric dictionary, units, entity keys)
        ↓
Identity resolution (device ↔ user ↔ cohort ↔ app)
        ↓
Time windows (5m / 1h / business-day / 7d / 30d)
        ↓
Feature generation (percentiles, breach duration, rates)
        ↓
Baseline engine (device / cohort / customer / TOD / DOW)
        ↓
Anomaly + persistence detection
        ↓
Cohort concentration + correlation
        ↓
Impact scoring (users × severity × duration × criticality)
        ↓
Root-cause candidates (ranked hypotheses)
        ↓
Recommendation + remediation hook
        ↓
Outcome measurement (before/after)
```

---

## 2. Reusable metric primitives (schema-driven)

Never hard-code customer apps/depts. Metrics are declared as:

```yaml
metric_id: cpu.saturation.p95
source:
  table: system_telemetry_metrics_v2
  where: { metric_name: cpu_usage_pct }
window: rolling_1h   # or customer policy
aggregation: p95     # NOT avg as default
entity: machine_id
cohorts: [device_group, customer_id, os_version]
```

### Core primitives (build once)

| Primitive | Aggregation | Why |
|-----------|-------------|-----|
| Level | p50 / p90 / p95 / p99 / max | Distribution, not mean |
| Breach count | count where value ≥ dynamic threshold | Frequency |
| Breach duration | consecutive windows above threshold | Persistence |
| Affected entities | distinct machine_id / user_name | Impact |
| % affected | affected / observed | Scale-free |
| Rate | events / device-day | Compare fleets |
| Delta | vs baseline / vs prior period | Trend |
| Concentration | HHI or % in top cohort | “Is it local?” |

### Default aggregation policy

| Signal type | Prefer |
|-------------|--------|
| Utilization (CPU, mem) | p95 + % devices with sustained breach |
| Latency (RTT, DNS, HTTP) | p95 / p99 + outlier device count |
| Reliability (crash, hang) | count + devices + users + rate |
| Compliance | % non-compliant devices |
| Remediation | success rate + repeat failure rate |

**AVG is allowed only** as a secondary descriptor, never as the primary KPI.

---

## 3. Baseline engine (customer-specific)

Do **not** ship global `CPU > 80 = bad`.

Baselines:

| Scope | Example |
|-------|---------|
| Customer global | p95 CPU distribution for all devices last 28d |
| Device | This device’s own TOD/DOW profile |
| Cohort | Branch_Downtown vs peer branches |
| Application | CoreBankingClient CPU on teller images |
| Business hours | Separate baseline from nights/weekends |

**Threshold = baseline + k·MAD** or **percentile of peer cohort**, with floors/ceilings for safety.

Persistence rule example:  
“Degraded” only if breach holds for **N consecutive windows** (e.g. 3× 5m) **or** **M of last K** windows — tuned per metric family.

---

## 4. Anomaly algorithms (reusable, boring first)

1. **Robust z-score / MAD** on rollups  
2. **Percentile peer gap** (device vs cohort p95)  
3. **Change-point** on daily rates (crashes, remediations)  
4. **Burst detection** on event streams  
5. **Seasonal TOD/DOW** models (simple STL or hour-of-week medians)

Avoid deep learning until baselines + MAD work in production.

**Statistical significance:** require minimum sample size (e.g. ≥30 windows or ≥5 devices in cohort) before emitting insight; otherwise mark `low_confidence`.

---

## 5. Insight object (product contract)

Every insight the UI shows must be an instance of:

```json
{
  "insight_id": "uuid",
  "template_id": "sustained_cpu_outlier",
  "customer_id": "...",
  "severity": "high",
  "confidence": 0.82,
  "window": {"from": "...", "to": "...", "business_hours_only": true},
  "headline": "1 device (12.5%) shows sustained CPU saturation; fleet average still looks normal.",
  "so_what": "User james.okonkwo on NHL100002 hit 99% CPU in 6 samples; p95=99 while fleet avg≈37%.",
  "entities": {"devices": ["NHL100002"], "users": ["james.okonkwo"], "cohorts": ["Branch_Downtown"]},
  "evidence": [{"metric": "cpu_usage_pct", "agg": "p95", "value": 99}],
  "hypotheses": [
    {"cause": "process_cpu", "candidate": "CoreBankingClient.exe", "support": 0.4}
  ],
  "recommendation": {"action": "investigate_top_processes", "remediation_id": null},
  "impact": {"devices": 1, "users": 1, "score": 72}
}
```

**Insight templates (initial set):**

1. Sustained CPU outlier vs fleet  
2. Critical disk free persistence  
3. Network latency cohort disaster  
4. DNS degradation  
5. App crash storm / noisy offender  
6. App hang cluster  
7. URL/SaaS p95 regression  
8. Compliance control regression  
9. Remediation failure streak  
10. Remediation success with verified recovery  
11. Branch/office concentration of failures  
12. Process memory/CPU hotspot  
13. 5xx / HTTP error burst  
14. Post-remediation improvement (or lack)  
15. Emerging trend (rate up N days)

---

## 6. Correlation & root-cause candidates

**Correlation (allowed early):** co-occurrence in same window — high RTT + URL slowdown + connection_failure events.

**Causal claims (restricted):** only when (a) remediation experiment, (b) change event marker, or (c) strong temporal precedence with controls. UI language: “likely contributor,” not “root cause,” until confidence ≥ threshold.

---

## 7. Impact scoring

```
impact = f(affected_users, affected_devices, severity, duration, app_criticality, repeat_count)
```

App criticality from customer config (not hard-coded). Banking teller apps can be weighted higher **via config**.

---

## 8. Closed-loop

```
Insight → Recommendation → Remediation execution (existing Nanoheal)
        → events_v2 (completed/failed/verified)
        → Outcome job compares features before/after
        → Insight closed or reopened
```

This is Nanoheal’s strategic wedge vs chart-heavy DEX tools.

---

## Document History

| Date | Change | Status |
|------|--------|--------|
| 2026-08-15 | Insight engine design for multi-customer V2 | implemented |
