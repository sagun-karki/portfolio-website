# Portfolio Website Rules

## Tech Stack & Environment
- Runtime: Python 3.12+
- Framework: Flask (housed in api/)
- Deployment: Vercel (Serverless Functions)
- Frontend: Vanilla JS, CSS, and HTML (Jinja2 templates)

## Directory Structure Constraints
- Strict Backend Isolation: All Python logic MUST reside in the api/ directory.
- Static Assets: CSS, JS, and Images must stay in api/static/. Do not move them to a root static/ folder, as the Vercel configuration (vercel.json) expects them inside api/.
- Templates: HTML files are located in api/templates/.
- Data: The api/static/json/data.json is the single source of truth for portfolio content (projects, experience).

## Critical Warnings for Agents
- DO NOT modify vercel.json without explicit permission; it handles the routing for the entire portfolio.
- DO NOT modify .gitignore without explicit permission; But you can always add new rules to .gitignore if needed. Never remove any existing rules from .gitignore.
- When refactoring, prioritize memory efficiency. When generating HTML, ensure accessibility (ARIA labels) and responsive design.
- **CSS Architecture**: Refer to `.agent/css_structure.md` for details on how CSS files are modularized in `api/static/css/`. Do not edit `styles.css` directly; edit its modular components.
- **Theme System**: Refer to `.agent/theme_system.md` for theme specifications. The default mode is Dark (no class). Light mode uses `.light-theme` class on `<html>`. NEVER use `.dark-theme`.
- **JavaScript & Telemetry**: Refer to `.agent/js_structure.md` for tracking and client-side behavior. Ensure no inline event handlers (like onclick) are placed inside templates. Use delegated tracking instead.
- **Data Schemas**: Refer to `.agent/data_structure.md` for JSON structures. Experience entries use structured fields like `bullets[]` and `stack` instead of generic `description` strings.

