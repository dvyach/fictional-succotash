# DEX scoring — executable contract

**Document History**

| Date | Change | Status |
|------|--------|--------|
| 2026-08-15 | Added `nh_score_v1.json`; reconciled chat draft with Blueprint 4-pillar DEX | implemented |

## Canonical files

| File | Role |
|------|------|
| [`nh_score_v1.json`](./nh_score_v1.json) | **Executable** per-metric bands + category drill-down + DEX pillar rollup |
| Session 1 metric catalog / Volume 3A | Product KPI names, thresholds narrative, widget binding |

If JSON and markdown disagree on **weights, display bands, or boot/login cutoffs**, **update the JSON** and then align the markdown — or file a deliberate version bump. Do not leave two conflicting "canonical" DEX formulas.

## What is canonical

```
DEX = 0.3·Endpoint + 0.3·App + 0.2·NetworkCollab + 0.2·Sentiment
Bands: Excellent ≥85 · Good 70–84 · Fair 55–69 · Poor <55
```

Drill categories (bank-teller / Nexthink-style):

| Category | Maps into pillar |
|----------|------------------|
| `endpoint` | Endpoint (100%) |
| `business_apps` + `productivity_apps` | App (≈2/3 + 1/3 inside the 0.30 App weight) |
| `network` + `collaboration_apps` | NetworkCollab (0.6 + 0.4 inside the 0.20 weight) |
| `sentiment` | Sentiment |
| `compliance`, `automation` | Side scores — **not** in DEX |

## Client vs server

| Concern | Where |
|---------|--------|
| Piecewise bands → per-sample `score` | **Client** (`nh_metric_score_v1`) |
| Category / pillar / DEX weights | **Server** (`nh_category_score_v1` + `nh_dex_v1`) |
| Persist | `score`, `score_formula`, `score_version` on every scored row |

Category weights are **not** sent on every client telemetry event.

## Superseded / do not use as product DEX

| Artifact | Status |
|----------|--------|
| Chat draft with `dex_weights: { technology: 0.7, sentiment: 0.3 }` | **Superseded** by `nh_dex_v1` |
| Chat draft bands `frustrating` / `average` / `good` | **Superseded** by Excellent/Good/Fair/Poor |
| Scoring raw `network_*_speed` (kbps) | **Superseded** by `link_util_*_pct` |
| Pinot seed `demo_tech_v1` | Demo only — not product |
| `dashboards/app.js` `computeBranchScores` | Legacy linear heuristic — not comparable. The app already flags this: see the `DATA GAP` banner at `dashboards/app.js:400`, which states Pinot's own `score` column is unpopulated and the client-side composite is illustrative only. |

## Intentional design notes

- **Window stats:** worst-case — `p95` when higher is worse, `p5`/`min` when higher is better.
- **`disk_free_pct` / avail:** saturates at score 100 once ≥50% free/available.
- **`vpn_connected`:** `score_null_until_emitted`; agent must emit boolean; no Connected/Disconnected aliases until contract exists. Not currently emitted anywhere in this repo (no DART/Haya support yet) — treat as a future metric.
- **Empty pillars/categories:** proportional renormalization of remaining weights (see JSON).
- **Compliance streak:** unhealthy ≥5 consecutive days → control score 0 (needs `control_unhealthy_streak_days`, not currently tracked by `compliance_v2`).
- **Sentiment demo:** rows with `attributes.demo === true` are illustrative; exclude from product DEX rollups.

## Related blueprint pointers

- [`../metrics/metric-catalog-session-1.md`](../metrics/metric-catalog-session-1.md) — DEX family + endpoint thresholds
- [`../docs/SESSION-3/Volume-3A-KPI-Dictionary.md`](../docs/SESSION-3/Volume-3A-KPI-Dictionary.md) — `kpi.dex.digital_experience_index`
