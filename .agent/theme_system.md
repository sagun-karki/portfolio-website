# Theme System

This document explains the dual-theme schematic system used on the portfolio.

## Technical Theme Inversion Rules
- **Default Theme (Dark)**: Configured inside the `:root` pseudo-selector in `variables.css`. No theme-identifying class is present on the `<html>` or `<body>` tag.
- **Light Theme (Blueprint)**: Activated via the `.light-theme` class on the `<html>` tag.
- **NEVER** use `.dark-theme` as it has been deprecated.

---

## Token Specifications

| Token | Dark Theme (Default) | Light Theme (`.light-theme`) | Purpose |
|---|---|---|---|
| `--bg-color` | `#000000` | `#ffffff` | Primary background color |
| `--surface-color` | `#0a0a0a` | `#f9f9f9` | Content card panels |
| `--text-primary` | `#ffffff` | `#000000` | High-contrast headers, bold items |
| `--text-secondary`| `#a3a3a3` | `#555555` | Body descriptions, subtexts |
| `--text-tertiary` | `#525252` | `#888888` | Low-emphasis telemetry logs |
| `--accent` | `#00ff00` | `#006633` | Neon highlight color |
| `--accent-dim` | `rgba(0,255,0,0.15)` | `rgba(0,102,51,0.08)` | Micro-glow states, hover indicators |
| `--border-color` | `#333333` | `#000000` | 1px border frames |
| `--grid-color` | `rgba(255,255,255,0.05)`| `rgba(0,0,0,0.03)` | Schematic backdrop grid overlay |

---

## Design System Constraints
1. **0px Radii**: `--border-radius` is hardcoded to `0px` to respect the brutalist design architecture. Do not use border-radii on buttons, cards, tags, or nav menus.
2. **Typography Hierarchy**:
   - Monospace font (`IBM Plex Mono`) is mapped to `--font-mono`. Used for stats, stack labels, bullet items, buttons, and system outputs.
   - Sans font (`Space Grotesk`) is mapped to `--font-sans` and `--font-heading`. Used for body copy, descriptions, hero titles, and large section indicators.
3. **Glassmorphism**: Nav background uses `blur(40px) saturate(200%) brightness(0.9)` and low-opacity fills (`rgba(0,0,0,0.2)` on dark mode, `rgba(255,255,255,0.3)` on light mode). It only triggers when the nav has the `.scrolled` state.
