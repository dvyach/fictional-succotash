# Volume 2C — AI Intelligence

**Product:** AetherDEX  
**Session:** 2 · **Flagship capability**  
**Depends on:** Session 1 AI contract · Volumes 2A–2B  
**Mockups:** [`mockups/ai/`](../../mockups/ai/)  
**Widget prefix:** `w-ai-*`  
**Architecture:** [`architecture/ai-architecture.mmd`](../../architecture/ai-architecture.mmd)

---

# Document Control

| Version | Status |
|---------|--------|
| 2.0.0 | Complete |

AI is ambient, accountable, and actionable: every insight shows **confidence**, **impact radius**, **evidence**, and **recommended remediation**. AI never silently mutates global scope or executes automation without confirmation (unless policy explicitly allows guarded auto-approve).

---

# Shared AI UX Contract (extends Session 1)

## Insight Card Fields
Title · Summary ≤280 · Confidence 0–100 (Low&lt;60 / Med / High) · Impact radius · Evidence (2–5) · Drivers · Recommendation · Actions (Investigate · Automate · Ticket · Dismiss · Pin).

## Copilot Grounding
Answers must cite entity IDs + query snapshots; refuse when ACL insufficient; log prompts for quality (privacy-redacted).

## Widget Registry — AI

| ID | Name |
|----|------|
| `w-ai-insight-feed` | Priority Insight Feed |
| `w-ai-confidence` | Avg Confidence KPI |
| `w-ai-conversion` | Action Conversion KPI |
| `w-ai-rca-rank` | RCA Hypothesis Rank |
| `w-ai-impact-radius` | Impact Radius Map |
| `w-ai-correlation-matrix` | Correlation Matrix |
| `w-ai-relationship-graph` | Relationship Graph |
| `w-ai-prediction-timeline` | Prediction Timelines |
| `w-ai-recommendation-list` | Ranked Recommendations |
| `w-ai-twin-scenarios` | Digital Twin Scenarios |
| `w-ai-risk-drivers` | Risk Drivers |
| `w-ai-exec-brief` | Executive Brief Narrative |
| `w-ai-copilot-transcript` | Copilot Transcript |
| `w-ai-prompt-history` | Prompt History |
| `w-ai-semantic-search` | Semantic Search |
| `w-ai-knowledge-graph` | Knowledge Graph Viewport |
| `w-ai-suggested-investigations` | Suggested Investigations |

---

# Part A — AI Command Center

**Route:** `/app/ai/command-center` · **Mockups:** `ai-command-*`  
Purpose: Single pane for active insights, conversion, RCA quality, suggested investigations.  
Audience: P2, P5, AI ops.  
KPIs: `m.ai.insight_count`, `m.ai.avg_confidence`, `m.ai.action_conversion_pct`, `m.ai.rca_precision_pct`.  
Layout: KPI×4 → Insight Feed (7) + Suggested Investigations (5).

---

# Part B — Root Cause Explorer

**Route:** `/app/ai/root-cause` · **Mockups:** `ai-rootcause-*`  
Purpose: Ranked hypotheses with evidence and explicit non-causes.  
KPIs: active RCAs, median time to RCA, evidence links, human agreement.  
Widgets: Hypothesis rank, impact radius.  
Actions: Promote hypothesis · Create case · Reject with reason (trains model).

---

# Part C — Correlation Explorer

**Route:** `/app/ai/correlations` · **Mockups:** `ai-correlate-*`  
Purpose: Correlation matrix + relationship graph across telemetry domains.  
KPIs: signals, strong links, emergent links, graph nodes in scope.  
Interactions: Cell click → graph neighborhood; export matrix.

---

# Part D — Prediction Center

**Route:** `/app/ai/predictions` · **Mockups:** `ai-predict-*`  
Purpose: Forecast DEX, capacity, saturation with accuracy tracking.  
KPIs: `m.ai.prediction_accuracy_pct`, active forecasts, breach warnings, predicted DEX Δ.  
Always show model version + confidence band.

---

# Part E — Recommendation Center

**Route:** `/app/ai/recommendations` · **Mockups:** `ai-recommend-*`  
Purpose: Ranked remediations by expected lift × population × confidence.  
KPIs: open recs, `m.ai.recommendation_accept_pct`, est. DEX lift, automations ready.  
Actions: Accept → change/automation · Assign · Snooze · Dismiss.

---

# Part F — Digital Twin Explorer

**Route:** `/app/ai/digital-twin` · **Mockups:** `ai-twin-*`  
Purpose: What-if simulations on experience topology (failover, scale, rollback).  
KPIs: twin coverage, simulations, saved scenarios, drift alerts.  
Output: predicted impact radius before executing change.

---

# Part G — Risk Intelligence

**Route:** `/app/ai/risk` · **Mockups:** `ai-risk-*`  
Purpose: Unified experience + infra + change risk with predictive Sev1 probability.  
Links: Executive Risk & Investment · Command Center.

---

# Part H — Executive AI Insights

**Route:** `/app/ai/executive-insights` · **Mockups:** `ai-exec-*`  
Purpose: Board-ready narrative generated from governed metrics.  
Audience: P1. Export PDF exec pack. No raw PII.

---

# Part I — AI Copilot Dashboard

**Route:** `/app/ai/copilot` · **Mockups:** `ai-copilot-*`  
Purpose: NL investigation surface with prompt history and suggested follow-ups.  
KPI: `m.ai.copilot_resolution_pct`, sessions, unsafe blocks.

---

# Part J — Enterprise Knowledge Graph

**Route:** `/app/ai/knowledge-graph` · **Mockups:** `ai-graph-*`  
Purpose: Semantic search + subgraph exploration for entities and insights.  
KPI: `m.ai.graph_coverage_pct`, nodes/edges, query latency.

---

# Flagship UX — “Why are Teams calls poor in London?”

## User flow

1. User opens Copilot (⌘J) or AI Command → asks: *Why are Teams calls poor in London?*  
2. Copilot parses intent: app=Collab/Teams, geo=London, symptom=call quality.  
3. Scope temporarily suggested (not auto-applied): Country=UK / Site=London; user confirms or edits.  
4. Platform runs grounded plan (visible steps):

| Step | System action | UI |
|------|---------------|-----|
| 1 | Locate affected users | Cohort card: ~840 employees, location London |
| 2 | Identify devices | Device count 1.1k; OS/image breakdown |
| 3 | Correlate network | WAN path LON + Wi‑Fi HQ floors scores |
| 4 | Correlate VPN | VPN not primary (low contribution) |
| 5 | Correlate updates/changes | CHG-5491 peering change annotated |
| 6 | Root cause | Primary: WAN peering degradation; Contributing: sticky Wi‑Fi HQ-4F |
| 7 | Recommend remediation | Fail over WAN circuit + Wi‑Fi channel plan |
| 8 | Business impact | Meetings impacted, hours lost model v2027.3 |
| 9 | Confidence | 91% High |
| 10 | Automation | Offer guarded jobs: WAN failover (window), Wi‑Fi optimize |

5. Actions: **Open Investigation Case** (prefilled evidence) · **Accept recommendations** · **Pin to Command Center** · **Share exec summary**.  
6. Prompt History stores redacted query + outcome for learning.

## UX principles for this flow
- Show plan steps as checklist with timings.  
- Allow user to deselect evidence streams.  
- Never execute WAN failover without `automation_operator` + window.  
- Display conflicting hypotheses openly (e.g., client build low confidence).

---

# Engineering Notes

| API | Use |
|-----|-----|
| `POST /api/v1/ai/chat` SSE | Copilot |
| `GET /api/v1/insights` | Feeds |
| `GET /api/v1/ai/rca/{id}` | RCA |
| `GET /api/v1/ai/correlations` | Matrix |
| `GET /api/v1/ai/predictions` | Forecasts |
| `POST /api/v1/ai/twin/simulate` | Twin |
| `GET /api/v1/ai/graph` | Knowledge graph |

Feature store joins Session 1 DEX facts + Session 2 infra/ops facts. All responses include `model_version`, `confidence`, `acl_filtered: true`.

---

*End of Volume 2C* · *Next: [Volume 2D](Volume-2D-Investigation-Workspace.md)*
