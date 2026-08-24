# AetherDEX Information Architecture — Session 1

**Authority:** Information Architect · Frontend Architecture Lead  
**Product shell route prefix:** `/app`

> **Primary product IA (2026 overlay):** Story surfaces supersede this flat domain list for end-user navigation. See [`story-ux-architecture.md`](story-ux-architecture.md) and [`catalog-story-mapping.md`](catalog-story-mapping.md). Session 1–2 routes remain the engineering handoff map and Library destinations.

---

## 1. Global Shell

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Global Header (56px)  Logo · Search · Time · Scope · Alerts · AI · User │
├────────────┬─────────────────────────────────────────────────────────────┤
│ Sidebar    │ Breadcrumb                                                  │
│ 248px      │ Filter Bar                                                  │
│            │ Page Content (12-col grid)                                  │
│            │                                                             │
└────────────┴─────────────────────────────────────────────────────────────┘
```

### Sidebar Sections (Session 1 visible)

| Section | Items | Route |
|---------|-------|-------|
| **Overview** | Home | `/app/home` |
| **Executive** | DEX Index · Risk & Investment | `/app/executive/*` |
| **Experience** | Overview · Journeys · Sentiment | `/app/experience/*` |
| **Endpoints** | Fleet Health · Stability · Lifecycle | `/app/endpoints/*` |
| **Applications** | Portfolio · (Detail via drill) | `/app/applications/*` |
| **Investigate** | (Session 2 — disabled with “Coming” badge) | `/app/investigate` |
| **AI Hub** | (Session 2 — disabled) | `/app/ai` |
| **Operations** | (Session 2 — disabled) | `/app/operations` |
| **Infrastructure** | (Session 2 — disabled) | `/app/infrastructure` |

Collapsed sidebar shows icons only; tooltips on hover; active state uses brand primary left bar + subtle fill.

---

## 2. Route Map — Session 1

| Route ID | Path | Volume | Dashboard |
|----------|------|--------|-----------|
| `home` | `/app/home` | 1A | Personalized landing (persona-aware) |
| `exec.dex` | `/app/executive/dex-index` | 1B | Digital Experience Index |
| `exec.risk` | `/app/executive/risk-investment` | 1B | Experience Risk & Investment ROI |
| `exp.overview` | `/app/experience/overview` | 1C | Experience Overview |
| `exp.journeys` | `/app/experience/journeys` | 1C | Employee Journeys |
| `exp.sentiment` | `/app/experience/sentiment` | 1C | Sentiment & Voice |
| `end.fleet` | `/app/endpoints/fleet-health` | 1D | Fleet Health |
| `end.stability` | `/app/endpoints/stability` | 1D | Stability & Performance |
| `end.lifecycle` | `/app/endpoints/lifecycle` | 1D | Hardware Lifecycle |
| `app.portfolio` | `/app/applications/portfolio` | 1E | Application Portfolio |
| `app.detail` | `/app/applications/:appId` | 1E | Application Detail |

---

## 3. Breadcrumb Grammar

```
{Domain} / {Dashboard} / {Optional Entity} / {Optional Sub-view}
```

Examples:

- `Executive / DEX Index`
- `Experience / Journeys / Onboarding`
- `Endpoints / Fleet Health / Device DX-48291`
- `Applications / Collaboration Suite / Dependency Map`

Clicking a breadcrumb segment restores that level’s default filters and clears deeper entity context.

---

## 4. Context Navigation

Right-side **Context Rail** (optional, toggleable) appears when an entity is selected:

| Tab | Content |
|-----|---------|
| Summary | Entity KPIs and status |
| Timeline | Recent events |
| Related | Linked employees / devices / apps |
| AI | Insights scoped to entity |
| Actions | Runbook / ticket / automation |

Width: 360px desktop; full-screen drawer on laptop ≤ 1366 when open.

---

## 5. Quick Actions (Global)

| Action | Shortcut | Behavior |
|--------|----------|----------|
| Search | `⌘K` / `Ctrl+K` | Omnisearch entities, dashboards, metrics |
| Save view | `⌘S` | Save current filters + layout as bookmark |
| Copy link | `⌘⇧L` | Deep link with encoded filter state |
| Ask AI | `⌘J` | Open AI assistant with page context |
| Time range | `T` | Focus time picker |
| Toggle theme | `⌥⇧D` | Dark / light |

---

## 6. Bookmarks & Recent Views

- **Bookmarks:** User-owned; optional team-shared (requires `role.dex_analyst+`). Store: route, filters, time, widget visibility.
- **Recent Views:** Last 12 unique route+filter hashes; shown in sidebar footer and omnisearch.
- **Default landing:** Persona-based (see Volume 1A); overridable in user preferences.

---

## 7. Scope Selector (Global Filter)

Always present in header:

```
Organization ▾  →  Region ▾  →  Business Unit ▾  →  [More scopes…]
```

Scope is hierarchical and additive. Changing a parent clears invalid children. Scope persists across Session 1 routes within the same browser session.

---

## 8. Drilldown Contract (Canonical)

All Session 1 dashboards honor this hierarchy for geographic / org / technical drill:

```
Enterprise
  → Region
    → Country
      → Business Unit
        → Department
          → Manager
            → Employee
              → Device
                → Application
                  → Process
                    → Event
                      → Timeline
                        → Logs
                          → Automation
```

Not every level is visible on every dashboard. Each volume declares which levels it surfaces and which skip levels are allowed (e.g., Device → Application without Employee when looking at shared kiosks).

---

## 9. Cross-Domain Deep Links

| From | To | Payload |
|------|----|---------|
| Executive driver “Endpoint” | Endpoint Fleet Health | Same time + scope + driver filter |
| Experience journey step failure | Application Detail | `appId`, time, journeyId |
| Endpoint device row | Application list for device | `deviceId` |
| App degradation alert | Experience Overview | `appId` impact cohort |
| Any AI insight | Investigation (Session 2) | Insight ID + evidence pack |

Deep links must preserve: `timeRange`, `scope`, `timezone`, `compareMode`.

---

## 10. Naming Consistency Rules

1. Domain labels in sidebar match breadcrumb domain exactly.  
2. Dashboard titles in page H1 match route registry `title` field.  
3. Widget titles never include the dashboard name (avoid “DEX Index Score” on the DEX Index page → use “Digital Experience Index”).  
4. Metric display names come from `metrics/metric-catalog-session-1.md` only.
