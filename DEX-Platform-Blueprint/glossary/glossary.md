# AetherDEX Glossary

**Authority:** Technical Writer · Product Management  
**Scope:** Session 1 terminology (expanded in Session 3)

---

| Term | Definition |
|------|------------|
| **AetherDEX** | Product name for the Digital Employee Experience Analytics Platform defined in this blueprint. |
| **Digital Experience Index (DEX)** | Composite 0–100 score representing overall digital employee experience. Metric ID: `m.dex.digital_experience_index`. |
| **Employee** | Human identity in the org directory linked to one or more devices and application sessions. |
| **Device** | Managed or discovered endpoint (laptop, desktop, VDI session host client, tablet) reporting telemetry. |
| **Application** | Desktop, SaaS, or browser-based work application tracked for experience. |
| **Journey** | Ordered set of steps representing a critical employee workflow (e.g., Morning Login, Join Meeting, Access VPN). |
| **Friction Event** | Telemetry or user-signal event indicating degraded experience (hang, crash, long wait, failed join, low sentiment pulse). |
| **Location Type** | Classification: `office`, `hybrid`, `remote`, `travel`, `unknown`. |
| **Scope** | Hierarchical filter context: Enterprise → Region → Country → BU → Department. |
| **Impact Radius** | Estimated count of employees / devices / apps affected by an incident or insight. |
| **Coverage** | Percentage of in-scope population with sufficient telemetry to compute a metric. |
| **Compare Mode** | Relative period comparison: WoW, MoM, vs baseline, vs peer. |
| **Insight** | AI-generated finding with evidence, confidence, and optional recommendation. |
| **Recommendation** | Suggested action linked to an insight, with expected score impact when modelable. |
| **Confidence** | Model certainty 0–100% displayed on AI artifacts; below 60% labeled “Low confidence”. |
| **Context Rail** | Right-side panel showing entity summary, timeline, related objects, AI, actions. |
| **Widget** | Composable visualization or interaction unit with a stable `w-*` ID. |
| **Saved View** | Persisted combination of route, filters, time, and optional widget layout. |
| **Cross-filtering** | Selecting a chart mark filters other widgets on the same dashboard. |
| **Linked highlighting** | Hovering a mark highlights related marks across widgets without committing a filter. |
| **Drilldown Grammar** | Canonical hierarchy from Enterprise to Automation used across domains. |
| **Telemetry Coverage Gap** | Segment where coverage < warn threshold; shown as striped “insufficient data” state. |
| **Experience Risk Index** | Forward-looking risk score combining poor population, trends, and critical app health. |
| **Fleet Health Score** | Endpoint composite of stability, performance, compliance, and hardware risk. |
| **Application Experience Score** | Per-app composite of launch, hang, error, frustration, and network contribution. |
| **Productivity Hours Lost** | Modeled estimate of time lost to digital friction; always version-stamped. |
| **Persona Segment** | Cohort such as knowledge worker, frontline, developer, executive assistant — used for segmentation, not RBAC. |
| **PII Entitlement** | Permission required to view employee-identifying attributes beyond aggregated cohorts. |
| **Glass Panel** | Translucent elevated surface using glass tokens; reserved for sticky chrome and AI panels. |
| **Session 1** | First blueprint delivery: vision + executive, experience, endpoint, application dashboards. |
