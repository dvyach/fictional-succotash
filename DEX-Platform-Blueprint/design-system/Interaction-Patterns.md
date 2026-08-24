# AetherDEX Interaction Patterns — Session 2

**Builds on:** Volume 1A UX grammar · design tokens  
**Consumers:** All Session 1–2 dashboards and widgets

---

## 1. Pointer

| Pattern | Behavior |
|---------|----------|
| Hover | Tooltip; linked highlight across joined widgets |
| Click | Select / cross-filter |
| Double-click | Open Context Rail or entity investigation |
| Right-click | Context menu: copy, exclude, investigate, ask AI |
| Drag | Column reorder; timeline brush; graph pan |
| Lasso | Scatter/map multi-select → filter |

## 2. Keyboard

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Command palette |
| `⌘J` | AI Copilot |
| `T` | Time picker |
| `F` | Focus filter chips |
| `G` then `A/I/C/N` | Go Alerts / Incidents / Cases / Network |
| `Esc` | Clear selection / close drawer |
| `?` | Shortcut map |
| Arrows | Navigate lists, tables, graph nodes |
| `Enter` / `Space` | Activate |
| `⇧`+click | Multi-select where enabled |

## 3. Cross-Filtering

Emitting widget publishes `{dim, values[]}`. Subscribers intersect filters. Badge shows active cross-filters; clear control required.

## 4. Linked Highlighting

Hover does **not** commit filters; temporary highlight only. Respect `prefers-reduced-motion`.

## 5. Timeline Scrubbing

Multi-track sync via shared `brushRange`. Snap to change markers. Compare mode splits scrubber into A/B windows.

## 6. AI Interactions

- Insight accept/dismiss logged  
- Copilot plan steps expandable  
- Automation from AI always confirmation-gated (default)  
- Confidence &lt; 60% visually muted  

## 7. Investigation Split View

Two panes share time/scope; entity A/B independently selectable; pin either to case.

## 8. NOC Wall Mode

Hide nonessential chrome; increase type scale; 15s refresh; keyboard still operable.

## 9. Touch

Long-press = context menu; pinch graph zoom; two-finger timeline pan.

## 10. Accessibility

Focus rings tokenized; skip link to main; chart data table; status not by color alone; live regions for feeds.
