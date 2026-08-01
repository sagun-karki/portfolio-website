# Portfolio Website

Personal portfolio for Sagun Karki — Flask + Jinja2, vanilla CSS/JS, deployed on Vercel.

## Stack

- **Backend:** Flask (Python 3.12+), Flask-Caching
- **Frontend:** Jinja2 templates, modular CSS, vanilla JS
- **Content:** `api/static/json/data.json`
- **Deploy:** Vercel Python serverless (`api/app.py`)

## Local setup

```bash
make install
make run
```

Then open [http://127.0.0.1:5000](http://127.0.0.1:5000).

## Project layout

```
api/
  app.py              # Routes, sitemap, robots.txt, security headers
  templates/          # base, index, contact, privacy
  static/
    css/              # Modular design system (linked from base.html)
    js/main.js        # Theme, nav, animations, GA4
    json/data.json    # Profile, experience, projects, skills, publications
    images/           # Logos and favicon
404.html              # Standalone not-found page
vercel.json           # Vercel routing (do not change casually)
.agent/               # Agent/docs for CSS, theme, JS, and data conventions
```

## Content updates

Edit `api/static/json/data.json` for profile copy, experience, projects, skills, and publications. Email and socials live under `profile`.

## Theme

Dark mode is the default (`:root`). Light mode uses the `.light-theme` class on `<html>` (never `.dark-theme`).
