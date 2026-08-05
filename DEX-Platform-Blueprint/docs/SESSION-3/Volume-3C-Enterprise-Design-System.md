# Volume 3C — Enterprise Design System

**Product:** AetherDEX  
**Session:** 3  
**Authority:** Design System Architect · Principal UX Architect · Frontend Architecture Lead  
**Depends on:** [`design-system/tokens.md`](../../design-system/tokens.md) · Volume 2E widgets · Interaction Patterns  
**Do not duplicate:** Widget library (2E) or dashboard layouts (1–2)

---

# Document Control

| Version | Status |
|---------|--------|
| 3.0.0 | Complete |

---

# 1. Design Principles

1. Experience-first analytics density with calm structure  
2. Tokens over one-offs  
3. AI violet reserved for AI chrome  
4. Progressive disclosure  
5. Accessible by default (WCAG 2.2 AA)  
6. One drilldown grammar  
7. Honest coverage / freshness  
8. Motion with purpose  

---

# 2. Grid & Responsive

| Breakpoint | Width | Columns | Gutter | Sidebar |
|------------|-------|---------|--------|---------|
| Laptop | ≥1366 | 12 | 16–24 | 248 / collapsible |
| Desktop | ≥1440 | 12 | 24 | 248 |
| Wide | ≥1920 | 12 | 24 | 248; content max 1600 |
| Tablet | <1024 | 8→4 | 16 | drawer |
| NOC Wall | ultrawide | 12 | 24 | optional hide |

---

# 3. Foundations

See dedicated files:

- [colors.md](../../design-system/colors.md)  
- [typography.md](../../design-system/typography.md)  
- [spacing.md](../../design-system/spacing.md)  
- [icons.md](../../design-system/icons.md)  
- [motion.md](../../design-system/motion.md)  
- [accessibility.md](../../design-system/accessibility.md)  
- [charts.md](../../design-system/charts.md)  
- [maps.md](../../design-system/maps.md)  
- [tables.md](../../design-system/tables.md)  
- [forms.md](../../design-system/forms.md)  
- [components.md](../../design-system/components.md)  

Elevation, radius, glass: tokens.md.

---

# 4. Naming

| Layer | Pattern | Example |
|-------|---------|---------|
| Figma | `ADX / {Cat} / {Name}` | `ADX / Button / Primary` |
| React | `Adx{Pascal}` | `AdxButton` |
| CSS | `adx-{kebab}` | `adx-button` |
| Widget | `w-{domain}-{slug}` | `w-exec-dex-score` |
| Token | `--adx-*` | `--adx-space-4` |

---

# 5. Figma Library Structure

```
ADX Foundations / Color · Type · Space · Elev · Motion
ADX Components / Button · Input · Card · Table · Chart · Nav · AI · Feedback
ADX Patterns / KPI Row · Filter Bar · Insight Stack · NOC Wall
ADX Templates / Dashboard Shell · Investigation Split · Copilot
```

---

# 6. CSS Variables & Tokens

Export pipeline (Session 3): `tokens.md` → `tokens.json` → CSS + Tailwind theme + Figma Tokens.  
Tailwind mapping: extend theme colors/spacing/radii from `--adx-*`.  
MUI mapping: palette/typography/shape overrides; prefer headless + ADX components for analytics chrome.

---

# 7. Localization & RTL

- ICU message format  
- Locale-aware numbers/dates  
- Logical CSS properties  
- Pseudo-loc testing in CI  

---

# 8. Component Specifications

Each component below includes Purpose · Usage · Variants · Properties · States · a11y · Tokens · Responsive · Interaction · Engineering.

## 8.1 Button (`AdxButton`)

| Field | Spec |
|-------|------|
| Purpose | Trigger actions |
| Usage | Primary one per region; secondary for alternatives |
| Variants | primary, secondary, ghost, danger, AI (rare) |
| Properties | `size sm\|md`, `icon`, `loading`, `disabled`, `type` |
| States | default hover focus active disabled loading |
| a11y | button role; loading announces busy |
| Tokens | brand fills, radius-sm, space-2/3 |
| Responsive | full-width optional on mobile forms |
| Interaction | click/Enter/Space |
| Engineering | forwardRef; no navigate without explicit href→`AdxLinkButton` |

## 8.2 Card (`AdxCard`)

Purpose: surface grouping. Variants: flat, elevated, AI, interactive. States include selected. Tokens: surface, elevation-1, radius-md. Not for hero marketing.

## 8.3 KPI Metric Card (`AdxKpiMetricCard`)

Purpose: big number + delta + optional spark. Binds `kpiId`. States: loading skeleton, empty, error. a11y announces value+delta+band. Engineering: fetch summary endpoint.

## 8.4 Data Grid (`AdxDataGrid`)

Purpose: dense tabular ops data. Variants: compact/comfortable. Props: columns, sort, selection, virtualize. a11y grid pattern. Export via permissioned API.

## 8.5 Charts (`AdxChart*`)

Purpose: visualize series/breakdowns. See charts.md + 2E. Cross-filter emit on click; brush on timelines.

## 8.6 Maps (`AdxMap*`)

Purpose: geo/floor/path. List fallback required.

## 8.7 Dialog / Drawer (`AdxDialog`, `AdxDrawer`)

Purpose: focused tasks / AI assistant / filters. Focus trap; Esc closes; inert background.

## 8.8 Navigation (`AdxSidebar`, `AdxBreadcrumb`, `AdxTabs`)

Purpose: IA. Active state left bar + subtle fill. Breadcrumb clears deeper context.

## 8.9 Filters (`AdxScopeSelector`, `AdxTimeRange`, `AdxFilterChips`, `AdxSavedViews`)

Purpose: analysis context. URL as source of truth.

## 8.10 Search & Command Palette (`AdxOmnisearch`)

Purpose: ⌘K. ACL-filtered results. Debounce 200ms.

## 8.11 Date / Time (`AdxTimeRangePicker`)

Purpose: relative+absolute+compare+timezone.

## 8.12 Timeline / Tree / Graph

`AdxTimelineMulti`, `AdxTree`, `AdxGraphViewport` — investigation & infra. Reduced-motion: button pan/zoom.

## 8.13 AI Cards

`AdxInsightCard`, `AdxRecommendationCard`, `AdxConfidencePill`, `AdxCopilotPanel` — violet accent only; confidence mandatory.

## 8.14 Notification / Toast

`AdxNotificationCenter`, `AdxToast` — polite live region; badge counts.

## 8.15 Empty / Loading / Error / Skeleton

Shared pattern components; never blank panels.

## 8.16 Context Menu & Dropdowns

`AdxMenu`, `AdxSelect` — keyboard typeahead; sections.

---

# 9. Quality Gate

- [x] Foundations documented without forking tokens  
- [x] Components map to React/Figma names  
- [x] a11y + RTL + i18n addressed  
- [x] Charts/tables/forms/maps covered  
- [x] No widget redefinition (points to 2E)  

---

*End of Volume 3C · Next: [Volume 3D](Volume-3D-Engineering-Architecture.md)*
