# Volume 1A — Product Vision

**Product:** AetherDEX  
**Document type:** Product Vision & Platform Foundation  
**Session:** 1 of 3  
**Audience:** Product, UX, Engineering, Architecture, Executive sponsors  
**Status:** Complete — Session 1 authority document  
**Related:** [README](../../README.md) · [Personas](../../personas/personas.md) · [IA](../../navigation/information-architecture.md) · [Tokens](../../design-system/tokens.md) · [Entities](../../architecture/entity-model-session-1.md) · [Metrics](../../metrics/metric-catalog-session-1.md)

---

# 1. Executive Summary

AetherDEX is a production-grade Digital Employee Experience (DEX) Analytics Platform that makes the quality of every employee’s digital day measurable, comparable, diagnosable, and improvable.

By 2027, enterprises will not accept disconnected tools for endpoints, applications, network, ITSM, and surveys. Leaders will demand a single experience system of record — with AI that explains *why*, not only *what* — and closed-loop actions that prove score lift.

AetherDEX is that system.

It combines:

- Continuous endpoint and client telemetry  
- Application experience (desktop, SaaS, browser)  
- Collaboration and network-sensitive quality signals  
- Journey analytics for critical workflows  
- Sentiment and pulse feedback  
- AI insights with evidence, confidence, and impact radius  
- Executive, operator, and owner surfaces on one information architecture  

This volume defines the vision, principles, personas, north-star metrics, product pillars, information architecture, experience principles, entity foundations, success criteria, and Session 1 scope boundaries so Volumes 1B–1E can be implemented without reinterpretation.

---

# 2. Problem Statement

## 2.1 The Business Problem

Digital work is the workplace. When laptops boot slowly, identity providers stall, collaboration audio degrades, or a Tier-0 SaaS app hangs, employees lose time, customers feel delay, and IT absorbs ticket volume that arrives too late.

Today’s tooling landscape fragments the problem:

| Fragment | Consequence |
|----------|-------------|
| Endpoint tools without app context | “Device healthy” while the business app fails |
| APM without client/device context | “Service green” while employees suffer |
| ITSM without experience telemetry | Tickets as the first signal — already too late |
| Survey tools without technical linkage | Themes without owners or evidence |
| Observability without employee impact | Alerts without blast radius in human terms |
| Exec dashboards that are vanity charts | No drill path from board narrative to device |

## 2.2 The Human Problem

Employees do not experience “CPU saturation.” They experience “I cannot start my day,” “the meeting audio is unusable,” and “the CRM freezes during customer calls.” AetherDEX centers the employee experience as the primary analytical object while retaining full technical depth underneath.

## 2.3 The Operator Problem

Endpoint engineers, app owners, and ops leads need shared evidence, shared time ranges, shared scope, and a shared drilldown grammar — not three browser tabs and a screenshot in Slack.

## 2.4 The Leadership Problem

CIOs and CDOs need a defensible Digital Experience Index, risk framing, initiative ROI, and the ability to answer board questions in minutes with confidence intervals and coverage honesty — not curated anecdotes.

---

# 3. Product Vision Statement

> **AetherDEX gives every enterprise a living nervous system for digital work — sensing experience across people, devices, and applications; explaining causes with accountable AI; and guiding actions that measurably improve how work feels and performs.**

### Vision horizon (2027)

- Experience is a managed business metric alongside cost and risk.  
- AI proposes, humans approve, automation executes — with auditability.  
- One drilldown grammar from enterprise score to process event.  
- Hybrid work experience is first-class (office / hybrid / remote / travel).  
- Privacy-preserving analytics with clear PII entitlements.  
- Design quality equal to the best enterprise productivity suites.

---

# 4. Product Principles

## 4.1 Experience Is the Unit of Analysis

Dashboards start from experience outcomes (DEX, journeys, friction, sentiment) and reveal technical causes on demand. Device and app views exist, but they never replace the experience narrative for leadership surfaces.

## 4.2 One Platform, Many Depths

Executives, DEX leads, endpoint engineers, and app owners share the same data model and navigation grammar. Density and defaults change by persona; truth does not.

## 4.3 AI Is Ambient and Accountable

Every insight shows: claim, evidence, confidence, impact radius, and recommended next step. Low-confidence insights are visually distinct. AI never silently mutates filters or opens tickets without confirmation.

## 4.4 Density Without Clutter

Prefer progressive disclosure: KPI → driver → cohort → entity → event. Whitespace and card structure create calm; information density comes from hierarchy, not from packing more charts.

## 4.5 Honest Coverage

Insufficient telemetry is a first-class state. Coverage % is visible on executive and analyst surfaces. Striped empty states beat false precision.

## 4.6 Accessible by Default

WCAG 2.2 AA minimum. Keyboard parity for primary flows. Status never by color alone. Charts expose data tables. Motion respects `prefers-reduced-motion`.

## 4.7 Tokens Over Snowflakes

All Session 1 UI consumes design tokens (`design-system/tokens.md`). Mockups and specs reference token names; engineers bind CSS variables.

## 4.8 Drilldown Grammar Is Sacred

The hierarchy Enterprise → … → Automation is consistent across domains. Volumes may skip levels with explicit rules; they may not invent competing hierarchies.

## 4.9 Actionability Over Observability Theater

Every primary dashboard includes a path to action: recommendation, runbook link, ticket draft, or (Session 2+) automation. Charts without next steps are incomplete for operator personas.

## 4.10 Privacy With Purpose

Collect what is needed for experience improvement. Aggregate by default. Employee-identifying detail requires entitlement. Sentiment free text is restricted; themes are preferred.

---

# 5. Strategic Positioning

## 5.1 Category

**Digital Employee Experience Analytics Platform** — intersecting DEX, observability, digital workplace, and AIOps — with original UX and IA.

## 5.2 Differentiation Pillars

| Pillar | Promise |
|--------|---------|
| **Unified Experience Index** | One configurable, auditable DEX score with transparent drivers |
| **Journey-native analytics** | Critical workflows as first-class objects |
| **Client-aware app experience** | Apps scored with endpoint + network contribution |
| **Impact-first operations** | Alerts and insights ranked by employee impact radius |
| **Accountable AI** | Evidence packs and confidence on every insight |
| **Design excellence** | Calm, modern, enterprise-grade visual system for 2027 |

## 5.3 Non-Goals (Session 1)

- Full ITSM replacement  
- Full network NPM suite  
- Custom pixel-perfect Figma library export (SVG + tokens are the Session 1 design authority)  
- Infrastructure deep dashboards (Session 2)  
- Full investigation IDE (Session 2)  
- Public marketplace of community widgets (Session 3+)

---

# 6. Target Customers & Buying Centers

| Segment | Characteristics | Primary buyer | Champion |
|---------|-----------------|---------------|----------|
| Global enterprise | 15k–100k+ employees, hybrid estate | CIO / CDO | DEX / Digital Workplace lead |
| Regulated enterprise | Finance, healthcare, public sector | CIO + CISO influence | Endpoint + Compliance |
| Digital-native scale-up | 3k–15k, heavy SaaS | Head of IT / VP Eng | App owners + IT Ops |

**Procurement narrative:** Reduce digital friction cost, improve productivity, lower ticket volume, de-risk major workplace changes (OS upgrades, VDI migrations, SaaS rollouts), and provide board-ready experience governance.

---

# 7. Personas

Full personas: [`personas/personas.md`](../../personas/personas.md).

| ID | Persona | Primary Session 1 home |
|----|---------|------------------------|
| P1 | Avery Chen — CDO/CIO | Executive DEX Index |
| P2 | Jordan Hale — DEX Lead | Experience Overview |
| P3 | Morgan Blake — Endpoint Engineering | Fleet Health |
| P4 | Riley Okonkwo — App Experience Owner | Application Portfolio |
| P5 | Sam Rivera — IT Ops Lead | Experience Overview + Alert feeds |
| P6 | Quinn Patel — HR Digital Partner | Sentiment & Voice |
| P7 | Casey Nguyen — Platform/SRE | Application Detail |

### Personalized Home (`/app/home`)

On first login, home modules are composed by persona:

- **P1:** DEX KPI, Risk Index, top 3 AI insights, BU leaderboard  
- **P2:** Experience KPIs, friction timeline, journey funnel, recommendations  
- **P3:** Fleet score, crash/boot/login, device table, AI endpoint insights  
- **P4:** Portfolio score, Tier-0 strip, degradation feed, owned apps table  
- **P5:** High-impact alerts, employees impacted, cross-domain AI insights  

Users can customize module order; reset to persona default available.

---

# 8. North-Star Metrics

## 8.1 Product North Star

**Digital Experience Index (`m.dex.digital_experience_index`)** — employee-weighted, coverage-aware, driver-transparent.

## 8.2 Companion North Stars

| Metric | Why it matters |
|--------|----------------|
| `m.dex.employees_impacted` | Human scale of pain |
| `m.dex.coverage_pct` | Trust in the score |
| `m.risk.productivity_hours_lost` | Business translation |
| `m.exp.journey_success_rate` | Workflow reliability |
| `m.end.fleet_health_score` | Endpoint system health |
| Portfolio-weighted `m.app.experience_score` | App system health |

## 8.3 Product Success Metrics (for AetherDEX itself)

| Metric | Target (12 months post GA) |
|--------|----------------------------|
| WAU / licensed seats | ≥ 45% among entitled IT/DEX roles |
| Time to first insight (new tenant) | < 1 hour after telemetry healthy |
| Exec weekly active use | ≥ 80% of exec_viewer seats |
| Insight → action conversion | ≥ 25% of high-confidence insights acted in 7 days |
| Mean time to diagnose (pilot cohort) | −30% vs baseline tool-hopping study |
| CSAT for DEX analysts | ≥ 4.4 / 5 |

---

# 9. Product Pillars & Capability Map (Session 1)

```
┌─────────────────────────────────────────────────────────────────┐
│                     AetherDEX Platform Shell                      │
│  Scope · Time · Search · Theme · AI Assistant · Bookmarks         │
├───────────────┬───────────────┬───────────────┬─────────────────┤
│  Executive    │  Experience   │  Endpoints    │  Applications   │
│  DEX Index    │  Overview     │  Fleet Health │  Portfolio      │
│  Risk & ROI   │  Journeys     │  Stability    │  App Detail     │
│               │  Sentiment    │  Lifecycle    │                 │
├───────────────┴───────────────┴───────────────┴─────────────────┤
│  Shared: Metrics · Entities · Drilldown · AI Insights · Alerts    │
└─────────────────────────────────────────────────────────────────┘
```

| Pillar | Session 1 capabilities |
|--------|------------------------|
| **Sense** | Telemetry ingestion contracts, coverage, freshness |
| **Score** | DEX and domain composites with thresholds |
| **Segment** | Geo, org, location type, OS, persona, app criticality |
| **Explain** | Drivers, AI insights, correlations |
| **Prioritize** | Risk index, refresh queue, initiative ROI |
| **Act** | Recommendations, deep links, ticket draft stubs |
| **Prove** | Trends, compare modes, initiative deltas |

Session 2 adds: Infrastructure, Operations command, Investigation workspace, Automation execution.  
Session 3 adds: Full KPI dictionary governance, complete UX system, API/SDK, implementation roadmap.

---

# 10. Experience Design Principles (UX Architecture)

## 10.1 Visual Language

- Calm navy/slate neutrals; blue primary; teal secondary; violet reserved for AI  
- Soft elevation, 10–14px radii, generous page padding  
- Glass only for sticky chrome and AI panels — not every card  
- Charts use categorical palette and status threshold bands  
- Avoid purple-on-white marketing clichés as the overall theme; AI violet is accent-only  

## 10.2 Layout Rhythm

- 12-column grid, 24px gutter (desktop)  
- KPI row → primary visual → secondary analytics → AI / feeds  
- Max content width 1600px on ultra-wide; center with canvas margins  

## 10.3 Interaction Grammar

| Gesture | Meaning |
|---------|---------|
| Hover | Tooltip + linked highlight |
| Click | Cross-filter or select entity |
| Double-click | Open entity Context Rail or detail route |
| Right-click / context menu | Copy value, exclude, open, create alert, ask AI |
| Drag (tables/columns) | Reorder columns where enabled |
| Keyboard | Full nav; see Volume specs |

## 10.4 Content Design

- Prefer verbs in actions: “Investigate boot regression,” not “Details”  
- Numbers: locale-aware; scores one decimal max; counts with separators  
- Timestamps: relative in feeds; absolute on hover  
- Empty states teach the next filter or instrumentation step  

---

# 11. Information Architecture Summary

Authoritative IA: [`navigation/information-architecture.md`](../../navigation/information-architecture.md).

### Session 1 domains

1. **Executive** — strategy and risk narrative  
2. **Experience** — journeys, friction, sentiment, collaboration  
3. **Endpoints** — fleet, stability, lifecycle  
4. **Applications** — portfolio and detail  

### Canonical drilldown

```
Enterprise → Region → Country → Business Unit → Department → Manager
  → Employee → Device → Application → Process → Event → Timeline → Logs → Automation
```

### Cross-domain linking

Preserves `timeRange`, `scope`, `timezone`, `compareMode` on every deep link.

---

# 12. AI Product Vision (Session 1 Surface)

Session 1 delivers **embedded AI**, not the full AI Hub (Session 2).

### Insight card contract

| Field | Requirement |
|-------|-------------|
| Title | Claim in plain language |
| Summary | ≤ 280 characters |
| Confidence | 0–100 with Low/Med/High band |
| Impact radius | Employees, devices, apps |
| Evidence | 2–5 linked queries/entities |
| Drivers | Ranked contributing factors |
| Recommendation | Optional, actionable |
| Actions | Open evidence · Investigate (stub) · Create ticket draft · Dismiss · Pin |

### AI behaviors in Session 1

- Rank insights by impact × confidence  
- Correlate endpoint regressions with app score drops when evidence exists  
- Predict 7-day DEX trajectory for scoped cohorts (clearly labeled forecast)  
- Never auto-change global scope  
- Log all AI impressions and actions for model quality  

---

# 13. Data & Entity Foundation

Authoritative model: [`architecture/entity-model-session-1.md`](../../architecture/entity-model-session-1.md).

### Analytical loop

```
Telemetry → Session/Device/Journey facts → Metric services → DEX composition
    → Dashboards / AI feature store → Insights → Actions → Outcome metrics
```

### Refresh posture (defaults)

| Layer | Latency |
|-------|---------|
| Alerting / critical segments | ~1 minute |
| Dashboard rollups | ~5 minutes |
| Sentiment themes | ~1 hour |
| Initiative daily facts | Daily |

### Retention posture (defaults)

| Store | Retention |
|-------|-----------|
| Hot detail | 90 days |
| Warm daily | 13 months |
| Cold monthly | 36 months |

Tenants may tighten for compliance; UI must surface effective retention when exporting.

---

# 14. Security, Privacy, Compliance Posture

| Control | Session 1 requirement |
|---------|----------------------|
| AuthN | OIDC / SAML enterprise SSO |
| AuthZ | RBAC roles in personas doc + scope ACL |
| PII | Entitlement-gated; audit on access |
| Encryption | TLS in transit; encrypted at rest |
| Data residency | Region pinning per tenant |
| Export | Role-gated; watermarked; audited |
| AI | Prompt/evidence scoped to caller ACL; no cross-tenant leakage |

---

# 15. Accessibility & Inclusive Design

| Requirement | Spec |
|-------------|------|
| Standard | WCAG 2.2 Level AA |
| Keyboard | All primary actions reachable |
| Screen readers | Widget titles, KPI values, chart summaries |
| Color | Status + icon + text |
| Focus | Tokenized focus ring |
| Motion | Respect reduced motion |
| Localization readiness | No hardcoded sentence fragments in chart labels; use i18n keys (Session 3 expands) |

---

# 16. Platform Shell — Functional Specification

## 16.1 Overview

| Field | Value |
|-------|-------|
| Purpose | Provide consistent navigation, scope, time, search, AI entry, and theme across all dashboards |
| Audience | All personas |
| Business value | Reduces cognitive load; ensures comparable analysis context |
| Business questions | What am I looking at? For whom? For which time? What needs attention now? |
| Success metrics | Search success rate; scope persistence correctness; theme preference retention |

## 16.2 Layout

| Viewport | Behavior |
|----------|----------|
| Desktop 1920 | Sidebar expanded 248px; content max 1600 centered |
| Desktop 1440 | Sidebar expanded; tighter card padding |
| Laptop 1366 | Sidebar collapsible default expanded; Context Rail as drawer |
| Tablet | Sidebar as drawer; filter bar scrolls horizontally |
| Ultra-wide | Same as 1920 with larger side margins |
| Dark / Light | Full token swap; charts recolor via tokens |

## 16.3 Navigation

See IA document. Breadcrumb + sidebar + quick actions + bookmarks + recent views.

## 16.4 Filters (Global)

| Filter | Behavior |
|--------|----------|
| Scope | Org hierarchy |
| Time | Relative (15m, 1h, 6h, 24h, 7d, 30d, 90d) + absolute |
| Compare | Off / WoW / MoM / Custom baseline |
| Timezone | Org default or user override |
| Saved filters | Load/save with bookmarks |

## 16.5 Shell Widget Inventory

### Widget `w-shell-global-search`

| Field | Spec |
|-------|------|
| Purpose | Find dashboards, entities, metrics, saved views |
| Business value | Speeds expert and novice navigation |
| Description | Modal command palette; ranked results by type |
| Metric | N/A (UX) |
| Calculation | N/A |
| Aggregation | N/A |
| Dimensions | result_type |
| Supported filters | Query string |
| Drilldowns | Navigate to result |
| Context menu | Open in new tab |
| Actions | Search, clear, keyboard select |
| Refresh | On query |
| Permissions | ACL-filtered results |
| API | `GET /api/v1/search?q=` |
| Caching | Client debounce 200ms; server 30s for popular queries |
| Performance | p95 < 200ms for query length ≥ 2 |
| Accessibility | Focus trap; aria-activedescendant |

### Widget `w-shell-time-range`

| Field | Spec |
|-------|------|
| Purpose | Set analysis window |
| Business value | Comparable trends and incident windows |
| Description | Preset chips + calendar range + timezone |
| Metric | N/A |
| Calculation | N/A |
| Aggregation | N/A |
| Dimensions | N/A |
| Supported filters | Self |
| Drilldowns | N/A |
| Context menu | Copy range as ISO |
| Actions | Apply, cancel, compare toggle |
| Refresh | On apply — invalidates dashboard queries |
| Permissions | All authenticated |
| API | Client state; encoded in URL `from`/`to`/`tz` |
| Caching | N/A |
| Performance | Instant UI |
| Accessibility | Keyboard operable calendar |

### Widget `w-shell-scope`

| Field | Spec |
|-------|------|
| Purpose | Constrain org/geo scope |
| Business value | Prevents incorrect enterprise-wide conclusions |
| Description | Cascading selectors with search |
| Metric | N/A |
| Calculation | N/A |
| Aggregation | N/A |
| Dimensions | region, country, bu, dept |
| Supported filters | Self |
| Drilldowns | Sets scope used by all widgets |
| Context menu | Clear child scopes |
| Actions | Apply |
| Refresh | On apply |
| Permissions | Only scopes in ACL |
| API | `GET /api/v1/scopes/tree` |
| Caching | 10 min client |
| Performance | Tree lazy-load |
| Accessibility | Combobox pattern |

### Widget `w-shell-ai-assistant`

| Field | Spec |
|-------|------|
| Purpose | Conversational Q&A with page context |
| Business value | Faster comprehension and triage |
| Description | Drawer chat; grounded in current scope/time/dashboard |
| Metric | N/A |
| Calculation | RAG over metrics + insights |
| Aggregation | N/A |
| Dimensions | N/A |
| Supported filters | Inherits page context |
| Drilldowns | Can emit navigation suggestions |
| Context menu | Copy answer |
| Actions | Ask, pin insight, open evidence |
| Refresh | Streaming response |
| Permissions | `ai.assistant.use` |
| API | `POST /api/v1/ai/chat` (SSE) |
| Caching | None for answers; cache retrieval embeddings server-side |
| Performance | First token < 1.5s target |
| Accessibility | Live region for tokens; stop button |

### Widget `w-shell-bookmark-bar`

| Field | Spec |
|-------|------|
| Purpose | Persist and reopen views |
| Business value | Repeatable executive and ops workflows |
| Description | List of saved views; pin to sidebar |
| Metric | N/A |
| Calculation | N/A |
| Aggregation | N/A |
| Dimensions | N/A |
| Supported filters | Stored |
| Drilldowns | Navigate |
| Context menu | Rename, share, delete |
| Actions | Save current, open |
| Refresh | On mutation |
| Permissions | Owner; share requires analyst+ |
| API | `CRUD /api/v1/views` |
| Caching | Client list |
| Performance | Instant |
| Accessibility | Listbox |

## 16.6 Shell Interactions

Hover, click, keyboard (`⌘K`, `T`, `⌘J`, etc.), touch (drawer nav), no drag required for shell chrome.

## 16.7 Shell AI / Data / Engineering

Covered above and in entity/metric docs. State management: URL as source of truth for scope/time/route; user prefs in profile API.

---

# 17. Functional Specification — Session 1 Dashboard Set

| ID | Dashboard | Volume | Primary personas |
|----|-----------|--------|------------------|
| D-EXEC-01 | Digital Experience Index | 1B | P1, P2 |
| D-EXEC-02 | Experience Risk & Investment ROI | 1B | P1, P2 |
| D-EXP-01 | Experience Overview | 1C | P2, P5 |
| D-EXP-02 | Employee Journeys | 1C | P2, P6 |
| D-EXP-03 | Sentiment & Voice | 1C | P2, P6 |
| D-END-01 | Fleet Health | 1D | P3, P5 |
| D-END-02 | Stability & Performance | 1D | P3 |
| D-END-03 | Hardware Lifecycle | 1D | P3, P1 (read) |
| D-APP-01 | Application Portfolio | 1E | P4, P2 |
| D-APP-02 | Application Detail | 1E | P4, P7 |

Each dashboard’s full specification (business, UX, widgets, data, engineering) lives in its volume. This volume is the binding vision and shell contract.

---

# 18. Business Specification — Platform Value

## 18.1 Value Hypotheses

1. **If** leaders share one DEX score with transparent drivers, **then** investment debates shift from anecdote to evidence.  
2. **If** journeys and friction are visible daily, **then** DEX teams fix systemic issues before ticket surges.  
3. **If** endpoint and app owners share drill context, **then** MTTR and blame loops decrease.  
4. **If** AI insights include confidence and impact, **then** operators trust and act on them.  
5. **If** initiative ROI is tracked against DEX lift, **then** workplace programs get renewed funding.

## 18.2 Business Questions the Platform Answers

- Are employees having a good digital day — globally and by segment?  
- Where is experience risk concentrating?  
- Which drivers (endpoint, app, network/collab, sentiment) explain the score?  
- Which journeys fail, and where in the funnel?  
- Which devices and cohorts destroy experience?  
- Which applications hurt the most people the most?  
- What should we do next, and did last quarter’s initiatives work?

## 18.3 Success Metrics (Customer Outcomes)

| Outcome | Leading indicator | Lagging indicator |
|---------|-------------------|-------------------|
| Better experience | DEX ↑, friction ↓ | Ticket volume ↓, CSAT ↑ |
| Faster ops | Insight action rate ↑ | MTTR ↓ |
| Better investment | Initiative ROI tracked | Cost per experience point ↓ |
| Trust in data | Coverage ↑ | Executive weekly usage ↑ |

---

# 19. UX Specification — Cross-Cutting Patterns

## 19.1 KPI Card Pattern

- Title (h3) · Info tooltip (metric definition link)  
- Big number (`--adx-text-metric`) · Delta chip (up/down/flat)  
- Sparkline optional · Threshold color bar  
- Click → scrolls to or opens related detailed widget  

## 19.2 Chart Card Pattern

- Title · subtitle (aggregation + window) · overflow menu  
- Body chart · footer footnotes (coverage, refreshed at)  
- Empty / error / loading skeletons standardized  

## 19.3 AI Insight Pattern

- Violet left accent (AI token) · confidence pill · impact chips  
- Evidence expander · primary/secondary actions  

## 19.4 Table Pattern

- Sticky header · compact density default for ops  
- Column picker · CSV export (permissioned)  
- Row double-click → Context Rail  

## 19.5 Theme

User preference + OS preference default; stored in profile. Mockups provided for both themes in each volume’s mockup folder.

---

# 20. Navigation Specification — Cross-Cutting

Documented in IA. Additional Session 1 rules:

1. Disabled Session 2 nav items visible with “Soon” badge for roadmap transparency (can be hidden via admin flag).  
2. Deep links from AI and alerts never land on blank filters — always hydrate context.  
3. Browser back restores prior filter stack within the SPA history entries.

---

# 21. Data Specification — Cross-Cutting

- Metric IDs immutable once published in catalog.  
- All dashboard queries accept: `scope`, `from`, `to`, `tz`, `compare`, `filters[]`.  
- Responses include: `data`, `meta.coverage`, `meta.freshness`, `meta.query_id`.  
- Compare responses return `current` and `previous` series aligned.

---

# 22. Engineering Notes — Cross-Cutting

| Concern | Direction |
|---------|-----------|
| Frontend | React + design tokens; URL state; virtualized tables |
| API | REST for CRUD/search; GraphQL optional for entity graphs; SSE for AI |
| Streaming | Session 2 expands live tails; Session 1 uses polling 30–60s for feeds |
| Caching | CDN for static; Redis for query cache keyed by tenant+hash; SWR client |
| Performance | LCP < 2.5s for shell; widget progressive load; priority for KPI row |
| Offline | Read-only cached last dashboard shell; banner “offline”; no mutation |
| a11y | Storybook a11y checks; chart data table toggle |
| i18n | String catalog; metric names from API localized where available |
| State | Scope/time in URL; UI chrome in Zustand/context; server data in query lib |
| Observability | Frontend RUM on AetherDEX itself; trace IDs on API |

### Representative REST surfaces (Session 1)

```
GET  /api/v1/metrics/{metricId}/timeseries
GET  /api/v1/metrics/{metricId}/summary
GET  /api/v1/entities/{type}/{id}
GET  /api/v1/insights
POST /api/v1/ai/chat
GET  /api/v1/alerts
CRUD /api/v1/views
GET  /api/v1/search
```

GraphQL (entity graph for dependency maps):

```
query AppDependencies($appId: ID!, $scope: ScopeInput!) { ... }
```

---

# 23. Quality Attributes

| Attribute | Target |
|-----------|--------|
| Availability | 99.9% for query APIs |
| Dashboard query p95 | < 2s for 7d enterprise rollup with caching |
| Freshness | Rollup lag < 5 min under normal load |
| Accuracy | DEX reproducible from published weight profile |
| Security | SOC2-ready controls; SSO mandatory for GA |
| Accessibility | AA; critical flows tested with keyboard + SR |

---

# 24. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Low telemetry coverage → distrust | Coverage KPI always visible; onboarding instrumentation guide |
| DEX weights gamed politically | Weight changes versioned, audited, visible in UI |
| AI hallucination | Evidence required; confidence gates; human confirm for actions |
| Alert fatigue | Impact-radius ranking; dedup; Session 2 tuning |
| PII overexposure | Entitlements + audit + aggregate defaults |
| Scope too large for Session 1 | Hard boundary: Volumes 1A–1E only; Session 2+ gated |

---

# 25. Session 1 Delivery Checklist

- [x] Repository structure  
- [x] README  
- [x] Design tokens foundation  
- [x] Personas  
- [x] Navigation IA  
- [x] Metric seed catalog  
- [x] Widget index  
- [x] Entity model  
- [x] Glossary  
- [x] Volume 1A (this document)  
- [x] Volume 1B Executive Dashboards + SVG mockups  
- [x] Volume 1C Experience Dashboards + SVG mockups  
- [x] Volume 1D Endpoint Dashboards + SVG mockups  
- [x] Volume 1E Application Dashboards + SVG mockups  

---

# 26. Open Decisions Deferred to Later Sessions

| Topic | Session |
|-------|---------|
| Full widget composition SDK | 2 / 3 |
| Automation execution & runbooks engine | 2 |
| KPI governance workflow & approval | 3 |
| Public API versioning policy detail | 3 |
| Implementation phased roadmap by quarter | 3 |
| Complete Figma token sync pipeline | 3 |

---

# 27. Document Control

| Version | Date | Authoring roles | Notes |
|---------|------|-----------------|-------|
| 1.0.0 | 2026-07-30 | CPO, Principal PM, UX Architect, Solution Architect, et al. | Session 1 baseline |

**Approval gate:** Volumes 1B–1E must remain consistent with this vision. Any change to DEX formula defaults, drilldown grammar, or token foundations requires an update to Volume 1A and a changelog entry in README.

---

*End of Volume 1A — Product Vision*  
*Next: [Volume 1B — Executive Dashboards](Volume-1B-Executive-Dashboards.md)*
