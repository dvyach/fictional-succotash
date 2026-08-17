# AetherDEX — Digital Employee Experience Analytics Platform

**Product Codename:** AetherDEX  
**Blueprint Edition:** Repository · Sessions 1–3 Complete · Story UX overlay  
**Target Launch:** Calendar Year 2027  
**Classification:** Internal Product Specification — Production Grade

---

## Story UX (primary application model)

Flat catalogs of 40–70 peer dashboards force decision-makers to assemble the narrative themselves. AetherDEX’s **interactive shell** now leads with five **story surfaces** that absorb the [DEX Dashboard Catalog v1](navigation/catalog-story-mapping.md) and Session 1–2 domains:

| Story | Question answered |
|-------|-------------------|
| **Pulse** | What should leadership care about *right now*? |
| **Experience** | Where is employee friction in the day? |
| **Reliability** | Which device / app / infra layers drive poor DEX? |
| **Operations** | What is on fire — ranked by employee impact? |
| **Decide** | Where should investment, risk, and cost focus go? |

Depth (Investigate, Device view, AI Copilot) and a **Library** of legacy specialist dashboards remain available. Spec authority for KPIs/widgets stays in Sessions 1–3. **Executable DEX scoring** (per-metric bands + pillar rollup) lives in [`scoring/`](scoring/README.md).

- Architecture: [`navigation/story-ux-architecture.md`](navigation/story-ux-architecture.md)  
- Catalog mapping: [`navigation/catalog-story-mapping.md`](navigation/catalog-story-mapping.md)  
- Scoring contract: [`scoring/nh_score_v1.json`](scoring/nh_score_v1.json)  
- Mockups: [`mockups/stories/`](mockups/stories/)  
- App: open [`index.html`](index.html) via `python3 -m http.server 8765` → [http://127.0.0.1:8765/](http://127.0.0.1:8765/)

Inspiration (capabilities only — original UX): [Nexthink Digital Experience](https://docs.nexthink.com/platform/user-guide/digital-experience) · [Lakeside SysTrack Dashboards](https://documentation.lakesidesoftware.com/docs/dashboards)

---

## What This Repository Is

This repository is the **enterprise product blueprint** for AetherDEX, a next-generation Digital Employee Experience (DEX) Analytics Platform. It is intended for direct handoff to:

| Role | Use of this repository |
|------|------------------------|
| Product Managers | Scope, prioritization, KPI ownership, roadmap alignment |
| UX / UI Designers | Layout specs, interaction models, design tokens, SVG mockups |
| Frontend Engineers | Component contracts, state models, API bindings, accessibility |
| Backend / Data Engineers | Entity model, fact tables, aggregation rules, retention |
| Solution Architects | Navigation IA, drilldown taxonomy, security boundaries |
| Technical Writers | Glossary, persona language, in-product copy foundations |

This is **not** a prototype deck. Every dashboard volume includes functional, business, UX, widget, navigation, data, and engineering specifications.

---

## Platform Positioning

AetherDEX unifies endpoint telemetry, application performance, employee sentiment signals, infrastructure health, and AI-assisted investigation into a single analytics surface for the digital workplace.

It draws architectural inspiration from the capabilities of leading DEX, APM, observability, and ITSM platforms — without reproducing any vendor UI — and defines an original product system for 2027.

---

## Repository Structure

```
DEX-Platform-Blueprint/
├── README.md                          ← You are here
├── docs/
│   ├── SESSION-1/                     ← Product vision + core dashboards (COMPLETE)
│   │   ├── Volume-1A-Product-Vision.md
│   │   ├── Volume-1B-Executive-Dashboards.md
│   │   ├── Volume-1C-Experience-Dashboards.md
│   │   ├── Volume-1D-Endpoint-Dashboards.md
│   │   └── Volume-1E-Application-Dashboards.md
│   ├── SESSION-2/                     ← Infrastructure, Ops, AI, Investigation, Widgets (COMPLETE)
│   │   ├── Volume-2A-Infrastructure.md
│   │   ├── Volume-2B-Operations.md
│   │   ├── Volume-2C-AI-Intelligence.md
│   │   ├── Volume-2D-Investigation-Workspace.md
│   │   └── Volume-2E-Widget-Design-System.md
│   └── SESSION-3/                     ← KPI, Semantic, Design System, Eng, API, Security, Roadmap (COMPLETE)
│       ├── Volume-3A-KPI-Dictionary.md
│       ├── Volume-3B-Data-Semantic-Layer.md
│       ├── Volume-3C-Enterprise-Design-System.md
│       ├── Volume-3D-Engineering-Architecture.md
│       ├── Volume-3E-API-Contracts.md
│       ├── Volume-3F-Security-Governance.md
│       └── Volume-3G-Implementation-Roadmap.md
├── api/                               ← openapi.yaml · graphql-schema.graphql
├── engineering/                       ← frontend · backend · analytics · infrastructure guides
├── implementation/                    ← roadmap · milestones · rollout
├── architecture/                      ← Cross-cutting architecture notes + Mermaid
├── diagrams/                          ← Mermaid / SVG architecture diagrams
├── mockups/                           ← Production SVG mockups
├── widgets/                           ← Canonical widget catalog
├── design-system/                     ← Tokens + foundations + component index
├── personas/                          ← Primary and secondary personas
├── metrics/                           ← Shared metric definitions
├── navigation/                        ← Information architecture and route map
├── components/                        ← Component contract index
├── assets/                            ← Icons and illustrative assets
└── glossary/                          ← Platform terminology
```

---

## Session Status

| Session | Scope | Status |
|---------|-------|--------|
| **Session 1** | Product vision, executive / experience / endpoint / application dashboards | **Complete** |
| **Session 2** | Infrastructure, operations, AI surfaces, investigation, widget system (150) | **Complete** |
| **Session 3** | KPI dictionary, semantic layer, design system, engineering, API, security, roadmap | **Complete** |

---

## Session 3 Reading Order

1. [Volume 3A — KPI Dictionary](docs/SESSION-3/Volume-3A-KPI-Dictionary.md)  
2. [Volume 3B — Data & Semantic Layer](docs/SESSION-3/Volume-3B-Data-Semantic-Layer.md)  
3. [Volume 3C — Enterprise Design System](docs/SESSION-3/Volume-3C-Enterprise-Design-System.md)  
4. [Volume 3D — Engineering Architecture](docs/SESSION-3/Volume-3D-Engineering-Architecture.md)  
5. [Volume 3E — API Contracts](docs/SESSION-3/Volume-3E-API-Contracts.md) · [`api/openapi.yaml`](api/openapi.yaml)  
6. [Volume 3F — Security & Governance](docs/SESSION-3/Volume-3F-Security-Governance.md)  
7. [Volume 3G — Implementation Roadmap](docs/SESSION-3/Volume-3G-Implementation-Roadmap.md)  

---

## Session 2 Reading Order

1. [Volume 2A — Infrastructure](docs/SESSION-2/Volume-2A-Infrastructure.md)  
2. [Volume 2B — Operations](docs/SESSION-2/Volume-2B-Operations.md)  
3. [Volume 2C — AI Intelligence](docs/SESSION-2/Volume-2C-AI-Intelligence.md)  
4. [Volume 2D — Investigation Workspace](docs/SESSION-2/Volume-2D-Investigation-Workspace.md)  
5. [Volume 2E — Widget Design System](docs/SESSION-2/Volume-2E-Widget-Design-System.md)  

Interactive shell: open `index.html` via local server — Sessions 1–2 navigation enabled.

---

## Session 1 Reading Order

1. [Volume 1A — Product Vision](docs/SESSION-1/Volume-1A-Product-Vision.md)  
   Positioning, personas, north-star metrics, IA, design principles, entity model seeds.

2. [Volume 1B — Executive Dashboards](docs/SESSION-1/Volume-1B-Executive-Dashboards.md)  
   C-suite and business leadership surfaces: Digital Experience Index, risk, investment ROI.

3. [Volume 1C — Experience Dashboards](docs/SESSION-1/Volume-1C-Experience-Dashboards.md)  
   Employee journey, sentiment, collaboration quality, location / hybrid experience.

4. [Volume 1D — Endpoint Dashboards](docs/SESSION-1/Volume-1D-Endpoint-Dashboards.md)  
   Device fleet health, hardware lifecycle, stability, performance, compliance posture.

5. [Volume 1E — Application Dashboards](docs/SESSION-1/Volume-1E-Application-Dashboards.md)  
   SaaS / desktop / browser app experience, dependency maps, adoption, degradation.

---

## Shared Foundations (Session 1)

| Artifact | Path | Purpose |
|----------|------|---------|
| Design tokens | [`design-system/tokens.md`](design-system/tokens.md) | Color, type, spacing, elevation, radius, motion |
| Navigation IA | [`navigation/information-architecture.md`](navigation/information-architecture.md) | Routes, sidebar, breadcrumbs, context nav |
| Personas | [`personas/personas.md`](personas/personas.md) | Primary / secondary personas and jobs-to-be-done |
| Metric seeds | [`metrics/metric-catalog-session-1.md`](metrics/metric-catalog-session-1.md) | Canonical metric IDs used across Session 1 |
| Widget index | [`widgets/widget-index-session-1.md`](widgets/widget-index-session-1.md) | Shared widget IDs and ownership |
| Glossary | [`glossary/glossary.md`](glossary/glossary.md) | Platform terminology |
| Entity model | [`architecture/entity-model-session-1.md`](architecture/entity-model-session-1.md) | Core entities and relationships |

---

## Dashboard Specification Contract

Every dashboard in this blueprint includes:

- **Overview** — Purpose, audience, business value, business questions, success metrics  
- **Layout** — Desktop, tablet, laptop, ultra-wide, dark / light  
- **Navigation** — Breadcrumb, sidebar, context nav, quick actions, bookmarks, recent views  
- **Filters** — Global, dashboard, widget, relative / absolute time, saved filters  
- **Widget Inventory** — Full widget contracts (metric, calculation, drilldowns, API, a11y, etc.)  
- **Interactions** — Hover, click, keyboard, touch, cross-filtering, linked highlighting  
- **Drilldown Flow** — Enterprise → … → Automation hierarchy  
- **AI** — Insights, recommendations, root cause, predictions, correlations, confidence  
- **Data** — Entities, facts, dimensions, refresh, retention, security  
- **Engineering** — REST / GraphQL / streaming, caching, state, offline, i18n  

---

## Mockup Convention

SVG mockups live under `mockups/` and follow:

| Attribute | Value |
|-----------|-------|
| Widths | `1920` (desktop), `1440` (desktop compact), `1366` (laptop) |
| Themes | `dark`, `light` |
| Naming | `{domain}-{dashboard-id}-{width}-{theme}.svg` |
| Grid | 12-column responsive grid, 24px gutter (desktop) |

Example: `mockups/executive/exec-dex-index-1920-dark.svg`

---

## Design Principles (Summary)

1. **Experience is the primary unit of analysis** — not tickets, not devices alone.  
2. **AI is ambient and accountable** — every insight carries confidence, evidence, and action.  
3. **One coherent drilldown grammar** across all domains.  
4. **Density without clutter** — progressive disclosure, not wall-of-charts.  
5. **Accessible by default** — WCAG 2.2 AA minimum; keyboard parity for all primary actions.  
6. **Tokens over one-off styling** — all surfaces consume the design system.

Full principles are in Volume 1A.

---

## How Engineering Should Consume This

1. Import design tokens into the design-token pipeline (`design-system/`).  
2. Map routes from `navigation/information-architecture.md`.  
3. Implement dashboards against widget IDs in `widgets/` — do not invent parallel widget names.  
4. Bind metrics by canonical metric ID from `metrics/`.  
5. Treat SVG mockups as layout authority for first-pass implementation; Figma will refine motion and micro-interaction.

---

## Versioning

| Field | Value |
|-------|-------|
| Blueprint version | `3.0.0-session-3` |
| Spec language | American English |
| Timezone default (analytics) | Organization timezone, configurable |
| Accessibility target | WCAG 2.2 Level AA |

---

## Blueprint Complete

Sessions **1–3** together deliver product specs, dashboards, widgets, design system, semantic/KPI layer, architecture, APIs, security, and implementation roadmap — suitable for engineering kickoff with minimal additional clarification.

---

*AetherDEX Product Blueprint · Confidential · For internal product, design, and engineering use.*
