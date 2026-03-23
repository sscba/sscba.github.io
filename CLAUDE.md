# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Static single-page portfolio website for Shiv Chandekar (Backend Software Engineer). No build system, no package manager, no tests. GitHub Pages serves `main` directly.

## Development
Open `index.html` directly in a browser. No build step needed. For live reload:
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Architecture
Three files, no frameworks:
- **`index.html`** — all markup. Six sections: `#home`, `#about`, `#skills`, `#projects`, `#contact`, footer.
- **`style.css`** — all styles. CSS custom properties (`--bg`, `--accent`, etc.) on `:root`, overridden by `body[data-theme="light"]` for light mode.
- **`script.js`** — all interactivity. Vanilla JS. Key globals on `window`: `downloadResume()`, `toggleMobileMenu()`, `toggleTheme()`.

## Key Patterns
- **Theme switching**: `toggleTheme()` sets `data-theme` on `document.body`; an inline `<script>` before `</body>` reads `localStorage` to apply saved theme and avoid FOUC.
- **Mobile nav**: `toggleMobileMenu()` toggles `.active` on `.nav-links` and `.hamburger`. CSS handles show/hide via media query + class.
- **Scroll animations**: Intersection Observer in `setupIntersectionObservers()` drives fade-in-up on `.skill-category`, `.project-card`, `.stat-item`. Stats counter triggers once when `#about` enters viewport via `animateStats()`.
- **Particles**: Dynamically created in `createFloatingParticles()` — 30 on mobile, 50 on desktop.

## Assets
- `resources/profile.jpg` — profile photo (hero section)
- `resources/Shiv_Chandekar_Resume.pdf` — referenced by `downloadResume()`

## External CDN Dependencies
- Font Awesome 6.4.0 — icons
- Google Fonts (Inter, JetBrains Mono) — typography
- `cdn.jsdelivr.net/gh/devicons` — tech stack icons in Skills section
