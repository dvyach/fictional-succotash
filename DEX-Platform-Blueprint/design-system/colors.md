# Colors

**Source of truth:** [`tokens.md`](tokens.md)  
**CSS prefix:** `--adx-color-*`

## Principles
- Neutrals carry UI structure; brand blue for primary actions; teal secondary; violet **AI-only**.
- Status: excellent/good/fair/poor/unknown — never color alone.
- Charts: 8-color categorical palette in tokens.

## Semantic mapping
| Intent | Token |
|--------|-------|
| Page background | `--adx-color-bg-canvas` |
| Card surface | `--adx-color-bg-surface` |
| Primary text | `--adx-color-text-primary` |
| Primary action | `--adx-color-brand-primary` |
| AI chrome | `--adx-color-brand-ai` |
| Danger | `--adx-color-status-poor` |

Light/dark themes swap via `[data-theme]`.
