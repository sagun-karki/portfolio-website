# Data Structure

This document outlines the data model and JSON schema used by the portfolio website.

## Single Source of Truth: `api/static/json/data.json`

All portfolio content is dynamically rendered from `api/static/json/data.json`. Any updates to copy, timeline entries, skills, or projects must be made in this file.

---

## JSON Fields Specification

### 1. `profile`
General metadata regarding the developer persona.
- `name` (string)
- `title` (string) - Set to "DATA SCIENTIST"
- `education` (string) - UNL, Minor in Math, etc.
- `about` (string) - Architecture-first, high-throughput systems bio/intro copy.
- `socials` (array of objects)
  - `name` (string)
  - `url` (string)
  - `icon` (string)

### 2. `experience`
Timeline entries displayed in the Experience section.
- `role` (string) - Professional title.
- `company` (string) - Company name.
- `logo` (string) - SVG/Image path under static assets.
- `duration` (string) - Start and end dates.
- `stack` (string) - Monospace tech list prefix (rendered with `stack:`).
- `metric` (string) - Core telemetry/engineering metric (note: currently kept in JSON but excluded from the rendered UI per layout updates).
- `bullets` (array of strings) - Rendered as a list in `index.html` with custom `▸` markers.

### 3. `projects`
Showcased software developments.
- `title` (string)
- `technologies` (array of strings)
- `description` (string)
- `url` (string, optional)

### 4. `skills`
Categories and associated technologies.
- `categories` (dictionary of arrays)
  - Keys (e.g., `Languages`, `Data Infrastructure`) mapped to list of skill name strings.
- `logos` (array of objects) - SVG logs or icons for visual display.

### 5. `publications`
Academic or developer publications.
- `title` (string)
- `authors` (string)
- `description` (string)
- `url` (string)
