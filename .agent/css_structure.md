# CSS Architecture

This document outlines the modular structure of the CSS for this portfolio website.
The main stylesheet `api/static/css/styles.css` is an entry point that imports several smaller partial files to maintain a clean and modular architecture.

## Design Theme: Cyber-Engineer / Technical Blueprint

The current design uses a **brutalist, technical aesthetic**:
- **Dark mode (default)**: Pure black `#000000`, neon green `#00ff00` accent, monospace body text, 0px border-radius, subtle white grid overlay.
- **Light mode ("Blueprint")**: Pure white `#ffffff`, forest green `#006633` accent, near-invisible grid, crisp black 1px borders.
- **Fonts**: `Space Grotesk` (headings), `JetBrains Mono` (body/code/labels).

## Theme System

**Dark mode is the default** (`:root` contains dark tokens). Light mode is opt-in via the `.light-theme` class on `<html>`.

- `localStorage` stores `'dark'` or `'light'`.
- The JS toggle (`main.js`) adds/removes `.light-theme`.
- The inline script in `base.html` applies `.light-theme` on page load if stored or system prefers light.

> ⚠️ Do NOT use `.dark-theme` anywhere — that class is deprecated. The new class is `.light-theme`.

## Where to Find Styles

All CSS files are located in `api/static/css/`.
When updating styles, edit the appropriate modular file:

- **`variables.css`**: All CSS custom properties. `:root` = dark defaults. `.light-theme` = Blueprint overrides. Token hierarchy: `--bg-color`, `--text-primary`, `--accent`, `--grid-color`, `--border-color`. Legacy aliases (`--color-*`) are maintained for compatibility.
- **`global.css`**: Reset, `body` base styles with CSS grid backdrop (`background-image` crosshatch using `var(--grid-color)`), font assignments, `::selection` color.
- **`layout.css`**: `.main-header`, `.main-nav`, `.page-content`, `.main-footer`. Scrolled nav uses crisp 1px border + backdrop blur. Footer has terminal-style `> ` prefix.
- **`navigation.css`**: Nav brand (uppercase, hidden until scroll), nav links (monospace uppercase), block sliding indicator (accent fill), icon buttons (square, border-on-hover), social links.
- **`components.css`**: `.card` (0px radius, 1px solid border, accent glow on hover), `.content-grid` (flush stacking with merged borders), `.card-logo`, `.card-item-*` type hierarchy.
- **`sections.css`**: Hero (angle-bracket title decorators, terminal subtitle prefix, ghost/solid buttons), section titles (numbered via `data-index`), About (left-accent border), Skills (monospace category titles), Timeline (merged-border rows with inset accent on hover), SVG adaptation for both themes.
- **`responsive.css`**: Media queries for tablet (`max-width: 1024px`) and mobile (`max-width: 767px`). Mobile nav is a dropdown with 0px radius and accent hover. Hero title brackets hidden on mobile.
- **`styles.css`**: Entry point only. Do not add rules here — only `@import` statements.

## Key CSS Variables Reference

| Variable | Dark (default) | Light (`.light-theme`) |
|---|---|---|
| `--bg-color` | `#000000` | `#ffffff` |
| `--surface-color` | `#0a0a0a` | `#f9f9f9` |
| `--text-primary` | `#ffffff` | `#000000` |
| `--text-secondary` | `#a3a3a3` | `#555555` |
| `--accent` | `#00ff00` | `#006633` |
| `--grid-color` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.03)` |
| `--border-color` | `#333333` | `#000000` |
| `--border-radius` | `0px` | `0px` |

## Important Notes for AI Agents

- **Do not edit `styles.css` directly** — edit the modular files.
- **Do not add `--radius-lg` or `--radius-pill` back** — all radii are `0px` in this design.
- **Do not add `border-radius` to cards or buttons** — that breaks the brutalist aesthetic.
- **Light mode class is `.light-theme`** — never `.dark-theme`.
- When updating colors, always use `var(--accent)` for interactive highlights, not hardcoded color values.
