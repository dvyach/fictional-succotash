# Haya / MIRU integration — ready-to-register config

Drafted against the actual source of [`sridharsanta/haya-v1.2`](https://github.com/sridharsanta/haya-v1.2)
(`platform/modalities/miru/detectors/`, `platform/modalities/miru/contracts/metric_semantic_intent.py`,
`platform/haya/cdc_manager/sql_adapters/pinot_adapter.py`) — every field name and detector param below is
verified against that code, not guessed.

## What this is

Haya's MIRU modality already does what the dashboard's client-side "Insights & Findings" page does by hand
(z-score outliers, forecast-residual drift, threshold breaches) — but properly: trained/scored on a schedule,
not recomputed in the browser on every page load, and with a real forecasting engine (ETS/Holt-Winters) instead
of a first-half-vs-second-half split. Registering these seven KPIs turns the dashboard's hand-rolled detectors
into Haya-native ones.

## Files

| File | Contents |
|---|---|
| `connection-pin.json` | The Pinot broker connection Haya needs — same `broker_url`/`controller_url`/`user`/`password` shape the dashboard's own login form collects, matched to `pinot_adapter.py`'s `connection_spec`. |
| `semantic-metrics-and-detectors.json` | Seven KPI definitions: CPU utilization, memory utilization, boot & login duration, network RTT, auto-heal failure rate, compliance pass rate, application crash count. Each has a `semantic_metric_intent` (Haya's `MiruMetricSemanticIntentV1` shape), a `semantic_publish_envelope`, and a `detector` block naming the MIRU plugin + verified params to attach. |

## What's real vs. what needs registration

- **CPU, memory, boot/login, and RTT** map straight to existing columns (`metric_value` filtered by `metric_name`) — no new computation needed. Memory and boot/login are new additions: those fields didn't exist in `system_telemetry_metrics_v2` when this integration was first drafted, only landed partway through the audit that found them, and reuse the CPU/RTT detector shapes rather than inventing new plugin configs.
- **Auto-heal failure rate** and **compliance pass rate** are *derived* measures (a ratio, not a raw column). Each entry includes a `derived_measure_definition` with the exact numerator/denominator — this still needs to be registered as a calculated measure in Haya's own semantic layer (the same pattern as `crash_rate` in the AetherDEX blueprint's Volume 3B: `100 * SUM(x) / NULLIF(SUM(y), 0)`) before MIRU can watch it.
- **Compliance's** good/bad status mapping is copied verbatim from `dashboards/app.js`'s `COMPLIANCE_GOOD` constant — keep these in sync if that map ever changes, or the dashboard and Haya will disagree about what "compliant" means.

## What I could not do

I don't have a running Haya instance, Studio credentials, or its metric-registration API surface — only read access
to its GitHub source. These files are the payload; actually registering the connection pin, publishing the semantic
metrics, and attaching the detectors happens through Haya Studio (or whatever `haya-studio-v1.0/server/services/domain-onboard.service.ts`-style endpoint backs it) by whoever administers that platform.

## Before trusting the output

Per `ets_detector.py`, the ETS detector needs ≥14 points to train (`lookback` default). At the current 8-device
pilot scale, most slices won't clear that bar reliably — these configs are correct now so they're ready the moment
real customer volume lands, not because the pilot data will produce trustworthy scores today.
