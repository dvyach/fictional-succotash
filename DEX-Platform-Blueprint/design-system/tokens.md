# AetherDEX Design Tokens — Session 1 Foundation

**Authority:** Design System Architect  
**Consumers:** All Session 1 volumes, SVG mockups, future Figma library  
**Token prefix:** `--adx-`

---

## 1. Brand Identity

| Token | Value | Usage |
|-------|-------|-------|
| Brand name | AetherDEX | Product lockup, page titles |
| Brand mark | Hexagonal node with orbital arc | Sidebar collapsed, favicon |
| Product family | Aether Workplace Suite | Parent suite naming only |

---

## 2. Color Tokens

### 2.1 Neutrals — Light Theme

| Token | Hex | Usage |
|-------|-----|-------|
| `--adx-color-bg-canvas` | `#F5F7FA` | Page background |
| `--adx-color-bg-surface` | `#FFFFFF` | Cards, panels |
| `--adx-color-bg-surface-raised` | `#FFFFFF` | Elevated drawers, dialogs |
| `--adx-color-bg-subtle` | `#EEF2F7` | Table zebra, inset wells |
| `--adx-color-bg-muted` | `#E4EAF2` | Disabled wells |
| `--adx-color-border-subtle` | `#D8E0EA` | Card borders |
| `--adx-color-border-default` | `#C5D0DE` | Inputs, dividers |
| `--adx-color-border-strong` | `#8FA3BB` | Focus rings (base) |
| `--adx-color-text-primary` | `#0F1B2D` | Headings, primary body |
| `--adx-color-text-secondary` | `#4A5D73` | Secondary labels |
| `--adx-color-text-tertiary` | `#6B7F96` | Captions, meta |
| `--adx-color-text-disabled` | `#9AADC2` | Disabled text |
| `--adx-color-text-inverse` | `#FFFFFF` | Text on brand fills |

### 2.2 Neutrals — Dark Theme

| Token | Hex | Usage |
|-------|-----|-------|
| `--adx-color-bg-canvas` | `#0B1220` | Page background |
| `--adx-color-bg-surface` | `#121A2B` | Cards, panels |
| `--adx-color-bg-surface-raised` | `#1A2438` | Elevated surfaces |
| `--adx-color-bg-subtle` | `#162033` | Inset wells |
| `--adx-color-bg-muted` | `#1E2A40` | Disabled wells |
| `--adx-color-border-subtle` | `#243148` | Card borders |
| `--adx-color-border-default` | `#334560` | Inputs, dividers |
| `--adx-color-border-strong` | `#5A7190` | Strong borders |
| `--adx-color-text-primary` | `#E8EEF7` | Headings, primary body |
| `--adx-color-text-secondary` | `#A8B8CC` | Secondary labels |
| `--adx-color-text-tertiary` | `#7E92AB` | Captions, meta |
| `--adx-color-text-disabled` | `#556A84` | Disabled text |
| `--adx-color-text-inverse` | `#0B1220` | Text on light fills |

### 2.3 Brand & Accent

| Token | Hex | Usage |
|-------|-----|-------|
| `--adx-color-brand-primary` | `#1B6EF3` | Primary actions, active nav |
| `--adx-color-brand-primary-hover` | `#1558C7` | Primary hover |
| `--adx-color-brand-primary-subtle` | `#E8F1FE` | Selected row / chip (light) |
| `--adx-color-brand-primary-subtle-dark` | `#142A4A` | Selected row / chip (dark) |
| `--adx-color-brand-secondary` | `#0D9488` | Secondary accent (teal) |
| `--adx-color-brand-ai` | `#7C5CFC` | AI insight chrome only |
| `--adx-color-brand-ai-subtle` | `#F0ECFF` | AI card background (light) |
| `--adx-color-brand-ai-subtle-dark` | `#1E1838` | AI card background (dark) |

### 2.4 Semantic Status

| Token | Hex | Meaning |
|-------|-----|---------|
| `--adx-color-status-excellent` | `#0F9F6E` | DEX ≥ 85 / healthy |
| `--adx-color-status-good` | `#3B82F6` | DEX 70–84 / watch |
| `--adx-color-status-fair` | `#D97706` | DEX 55–69 / degraded |
| `--adx-color-status-poor` | `#DC2626` | DEX < 55 / critical |
| `--adx-color-status-unknown` | `#94A3B8` | Insufficient data |
| `--adx-color-status-info` | `#0284C7` | Informational |

### 2.5 Chart Palette (categorical, 8)

| Index | Token | Hex |
|-------|-------|-----|
| 1 | `--adx-chart-cat-01` | `#1B6EF3` |
| 2 | `--adx-chart-cat-02` | `#0D9488` |
| 3 | `--adx-chart-cat-03` | `#7C5CFC` |
| 4 | `--adx-chart-cat-04` | `#EA580C` |
| 5 | `--adx-chart-cat-05` | `#DB2777` |
| 6 | `--adx-chart-cat-06` | `#0891B2` |
| 7 | `--adx-chart-cat-07` | `#65A30D` |
| 8 | `--adx-chart-cat-08` | `#CA8A04` |

### 2.6 Glass / Overlay

| Token | Value | Usage |
|-------|-------|-------|
| `--adx-glass-bg-light` | `rgba(255,255,255,0.72)` | Sticky headers, AI panels |
| `--adx-glass-bg-dark` | `rgba(18,26,43,0.78)` | Sticky headers (dark) |
| `--adx-glass-blur` | `12px` | Backdrop filter |
| `--adx-overlay-scrim` | `rgba(15,27,45,0.48)` | Modal scrim |

---

## 3. Typography

### 3.1 Font Families

| Token | Stack | Role |
|-------|-------|------|
| `--adx-font-sans` | `"Söhne", "IBM Plex Sans", "Segoe UI", system-ui, sans-serif` | UI, body, labels |
| `--adx-font-display` | `"Söhne", "IBM Plex Sans", sans-serif` | Page titles (same family, heavier weight) |
| `--adx-font-mono` | `"IBM Plex Mono", "SF Mono", ui-monospace, monospace` | Metrics raw, IDs, logs |

### 3.2 Type Scale

| Token | Size / Line / Weight | Usage |
|-------|----------------------|-------|
| `--adx-text-display` | 32px / 40px / 600 | Page hero titles (rare) |
| `--adx-text-h1` | 24px / 32px / 600 | Dashboard title |
| `--adx-text-h2` | 18px / 28px / 600 | Section / card title |
| `--adx-text-h3` | 15px / 22px / 600 | Widget title |
| `--adx-text-body` | 14px / 20px / 400 | Body copy |
| `--adx-text-body-strong` | 14px / 20px / 550 | Emphasized body |
| `--adx-text-label` | 12px / 16px / 500 | Form labels, chip text |
| `--adx-text-caption` | 11px / 14px / 400 | Meta, timestamps |
| `--adx-text-metric` | 28px / 34px / 600 | KPI big numbers |
| `--adx-text-metric-sm` | 20px / 26px / 600 | Secondary KPIs |

Letter-spacing: display/h1 `-0.01em`; labels `0.02em` uppercase optional for section eyebrows only.

---

## 4. Spacing

Base unit: **4px**.

| Token | Value |
|-------|-------|
| `--adx-space-0` | 0 |
| `--adx-space-1` | 4px |
| `--adx-space-2` | 8px |
| `--adx-space-3` | 12px |
| `--adx-space-4` | 16px |
| `--adx-space-5` | 20px |
| `--adx-space-6` | 24px |
| `--adx-space-8` | 32px |
| `--adx-space-10` | 40px |
| `--adx-space-12` | 48px |
| `--adx-space-16` | 64px |

**Layout constants**

| Token | Value | Usage |
|-------|-------|-------|
| `--adx-sidebar-width` | 248px | Expanded sidebar |
| `--adx-sidebar-width-collapsed` | 64px | Icon rail |
| `--adx-header-height` | 56px | Global header |
| `--adx-filter-bar-height` | 48px | Sticky filter row |
| `--adx-content-max` | 1600px | Content max width (ultra-wide centers) |
| `--adx-grid-gutter` | 24px | Desktop 12-col gutter |
| `--adx-grid-gutter-tablet` | 16px | Tablet gutter |
| `--adx-page-padding` | 24px | Page horizontal padding |

---

## 5. Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--adx-radius-xs` | 4px | Chips, badges |
| `--adx-radius-sm` | 6px | Buttons, inputs |
| `--adx-radius-md` | 10px | Cards, widgets |
| `--adx-radius-lg` | 14px | Panels, drawers |
| `--adx-radius-xl` | 20px | Hero insight panels |
| `--adx-radius-pill` | 999px | Status pills only |

---

## 6. Elevation

| Token | Shadow | Usage |
|-------|--------|-------|
| `--adx-elevation-0` | none | Flat canvas |
| `--adx-elevation-1` | `0 1px 2px rgba(15,27,45,0.06), 0 1px 3px rgba(15,27,45,0.04)` | Cards (light) |
| `--adx-elevation-2` | `0 4px 12px rgba(15,27,45,0.08), 0 1px 3px rgba(15,27,45,0.05)` | Hover cards, popovers |
| `--adx-elevation-3` | `0 12px 32px rgba(15,27,45,0.14), 0 4px 8px rgba(15,27,45,0.06)` | Modals, drawers |
| `--adx-elevation-1-dark` | `0 1px 2px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)` | Cards (dark) |
| `--adx-elevation-2-dark` | `0 8px 24px rgba(0,0,0,0.45)` | Popovers (dark) |

---

## 7. Motion

| Token | Value | Usage |
|-------|-------|-------|
| `--adx-duration-fast` | 120ms | Hover, focus |
| `--adx-duration-base` | 200ms | Panel open, chart crossfade |
| `--adx-duration-slow` | 320ms | Drawer, modal |
| `--adx-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default |
| `--adx-easing-emphasized` | `cubic-bezier(0.2, 0, 0, 1.05)` | Entrance |
| `--adx-easing-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Exit |

Reduce motion: honor `prefers-reduced-motion: reduce` — disable chart entrance animations; keep opacity fades ≤ 100ms.

---

## 8. Iconography

| Attribute | Spec |
|-----------|------|
| Library | Custom AetherDEX icon set, 24px grid, 1.5px stroke |
| Sizes | 16 / 20 / 24 |
| Style | Outline for nav/actions; filled for status |
| Color | Inherit `currentColor` |

Primary Session 1 icons: `home`, `gauge`, `users`, `laptop`, `app-window`, `network`, `sparkles` (AI), `alert`, `filter`, `search`, `bookmark`, `clock`, `chevron-right`, `more-horizontal`.

---

## 9. Component Naming

| Layer | Convention | Example |
|-------|------------|---------|
| Figma | `ADX / {Category} / {Name}` | `ADX / Card / KPI Metric` |
| React | `Adx{PascalCase}` | `AdxKpiMetricCard` |
| CSS class | `adx-{kebab}` | `adx-kpi-metric-card` |
| Widget ID | `w-{domain}-{slug}` | `w-exec-dex-score` |
| Metric ID | `m.{domain}.{name}` | `m.dex.digital_experience_index` |
| Route | `/app/{domain}/{view}` | `/app/executive/dex-index` |

---

## 10. Chart Defaults

| Property | Value |
|----------|-------|
| Gridline | `--adx-color-border-subtle`, 1px |
| Axis label | `--adx-text-caption` + `--adx-color-text-tertiary` |
| Tooltip | elevation-2 surface, 12px radius, 8px padding |
| Animation | 200ms path draw on first load only |
| Empty state | Centered illustration + “No data for selected filters” |
| Threshold bands | Excellent/Good/Fair/Poor using status tokens at 20% opacity |

---

## 11. CSS Variable Bundle (excerpt)

```css
:root {
  --adx-color-brand-primary: #1B6EF3;
  --adx-color-status-excellent: #0F9F6E;
  --adx-color-status-fair: #D97706;
  --adx-color-status-poor: #DC2626;
  --adx-font-sans: "Söhne", "IBM Plex Sans", "Segoe UI", system-ui, sans-serif;
  --adx-space-4: 16px;
  --adx-space-6: 24px;
  --adx-radius-md: 10px;
  --adx-sidebar-width: 248px;
  --adx-header-height: 56px;
}

[data-theme="dark"] {
  --adx-color-bg-canvas: #0B1220;
  --adx-color-bg-surface: #121A2B;
  --adx-color-text-primary: #E8EEF7;
}
```

Full token JSON export will ship in Session 3 (`design-system/tokens.json`). Session 1 SVGs hardcode equivalent hex values for fidelity.

---

## 12. Accessibility Color Notes

- Status colors never convey meaning alone — always pair with label or icon.
- Brand primary on white: contrast ≥ 4.5:1 for text.
- Fair (amber) and Poor (red) meet AA for large text; for small text use with icon + text label.
- Focus ring: `0 0 0 2px canvas, 0 0 0 4px brand-primary`.
