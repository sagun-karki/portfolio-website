# JavaScript Structure

This document details the structure and responsibilities of the JavaScript code in the portfolio website.

## Entry Point: `api/static/js/main.js`

`main.js` contains all the client-side logic for the portfolio, including:
1. Theme state management (default Dark mode, optional Light mode).
2. Navigation interactions (scrolling updates, transparent-to-glass navigation bar transitions).
3. Dynamic active nav section indicators.
4. GA4 tracking (delegated click tracking).
5. Scroll animations using `IntersectionObserver`.

---

## Technical Implementations

### 1. Theme Toggle System
- The page default state is Dark mode. No class is added to `<html>` for Dark mode.
- Light mode is triggered by adding the `.light-theme` class to the `<html>` element.
- The `toggleTheme` function toggles this class and saves the choice (`'light'` or `'dark'`) in `localStorage` under the key `'theme'`.
- System preferences (e.g. `prefers-color-scheme`) are respected on first load.
- Avoid using `.dark-theme` anywhere as it is deprecated.

### 2. Header and Navigation scroll effects
- An event listener on `window.scroll` monitors vertical offset.
- When `window.scrollY > 50`, the class `.scrolled` is added to `.main-header`.
- The header transition uses `backdrop-filter` to dynamically apply glassmorphism blurring (`blur(40px) saturate(200%) brightness(0.9)`) only when it is detached (`.scrolled`).

### 3. GA4 Delegated Click Tracking
- High-efficiency delegated event listener tracks links with `data-track-event` attributes.
- Custom target tracking parameters:
  - `data-track-event` (e.g., `click`)
  - `data-track-type` (e.g., `project`, `publication`, `social`)
  - `data-track-id` (the identifier of the item clicked)
  - `data-track-url` (destination URL)
- Prevents inline Jinja `onclick` attributes to avoid quote/unterminated string nesting syntax errors.

### 4. Visibility Animations
- `IntersectionObserver` detects when cards/timeline-items enter the viewport.
- Adds an `.in-view` class to trigger smooth CSS micro-animations.
