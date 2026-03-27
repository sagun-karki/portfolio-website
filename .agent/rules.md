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
- DO NOT modify vercel.json without explicit permission; it handles the routing for the entire serverless deployment.
- DO NOT modify .gitignore patterns without explicit permission; however, you can add new rules if needed for generated files or new dependencies.
- When refactoring, prioritize memory efficiency since Vercel serverless functions have execution time and memory limits.
- When generating HTML, ensure accessibility (ARIA labels) and responsive design for all screen sizes.

## Code Quality Guidelines
- Follow PEP 8 style guidelines for Python code.
- Use semantic HTML5 elements throughout templates.
- Ensure all API endpoints return proper HTTP status codes.
- Test routes locally before deploying to Vercel.
- Implement security headers (CSP, X-Frame-Options, etc.) in the Flask app.
- Add Open Graph and Twitter Card meta tags for social sharing.
- Include skip-to-content links and respect prefers-reduced-motion for accessibility.
- Close mobile navigation menus when users click on nav links.
