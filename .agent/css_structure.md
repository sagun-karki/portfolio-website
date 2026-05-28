# CSS Architecture

This document outlines the modular structure of the CSS for this portfolio website.
The main stylesheet `api/static/css/styles.css` is an entry point that imports several smaller partial files to maintain a clean and modular architecture.

## Where to find styles

All CSS files are located in `api/static/css/`.
When updating styles, please edit the appropriate modular file instead of the main `styles.css` file:

- **`variables.css`**: Contains all CSS root variables, layout constants, and light/dark theme color mappings. Edit this file to change the color palette or core spacing metrics.
- **`global.css`**: Contains global reset rules, base `body` styles, global transitions, scroll behavior, and core typography (`h1`-`h6`).
- **`layout.css`**: Contains structural layout components such as `.main-header`, `.page-content`, `main`, and `.main-footer`.
- **`navigation.css`**: Contains all styling for the nav bar (`.nav-brand`, `.nav-links`, `.nav-indicator`), header states when scrolled, social links, and theme toggle buttons.
- **`components.css`**: Contains reusable UI components, particularly the `.card` styles, `.content-grid`, and `.card-item-*` rules.
- **`sections.css`**: Contains styling specific to individual sections: Hero (`.hero`), About, Skills (`.skills-card`, `.skill-logos`), and Experience Timeline (`.timeline`, `.timeline-item`).
- **`responsive.css`**: Contains all media queries (e.g., `max-width: 1024px`, `max-width: 767px`) for adapting the layout, navigation, and sections for mobile and tablet devices.
- **`styles.css`**: The main entry point. **Do not add CSS rules here.** Only use this file for `@import` statements to pull in the modular files above.

## Important Note for AI Agents
If you are asked to "change the design" or "update styles", read this document first to understand which file(s) require modifications to implement the requested design changes. Always respect this modular approach.
