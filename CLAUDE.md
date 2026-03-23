# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio site for Shiv Chandekar — no build system, no package manager, no compilation step. Three files do everything: `index.html`, `style.css`, `script.js`. Open `index.html` directly in a browser to develop.

## Development

**Run locally:** Open `index.html` in a browser (double-click or `file://` URL). No server required.
**Live reload (optional):** Use VS Code Live Server extension or `npx serve .` if you want hot reload.
**No build, lint, or test commands exist.**

## Architecture

### Theme & Design Tokens (style.css)
Dark data-pipeline aesthetic. Key CSS variables (defined as literals, not `var()`):
- Background: `#0a0f1e`, Surface cards: `#0d1b2e`
- Primary accent: `#00d4ff` (cyan), Secondary: `#10b981` (emerald)
- Muted text: `#94a3b8`, Primary text: `#e2e8f0`

### Animated Background
`.animated-bg::before` — CSS radial-gradient dot-grid (40px grid, cyan dots).
`.data-packet` — horizontal drifting particles created in JS via `createFloatingParticles()`.

### Project Architecture Diagrams (key feature)
Each project card has a `[ View Architecture ]` toggle button (`<button class="project-arch-toggle" data-project="ID">`). Clicking it:
1. Toggles `.open` on `<div class="arch-diagram" id="arch-ID">` — CSS `max-height: 0 → 600px` transition reveals it
2. On **first open**, `renderDiagram(projectId)` lazily builds an SVG inline and appends it to `.arch-diagram-inner`
3. Subsequent opens/closes just toggle the class (SVG is already rendered)

**Critical SVG rendering rule:** All SVG visual properties (`fill`, `stroke`, `text-anchor`, `dominant-baseline`, `font-family`) must be set as **inline SVG attributes** via `setAttribute()`, not CSS classes. CSS classes on dynamically-created SVG elements are unreliable across browsers — this caused invisible text (SVG default fill is black, invisible on dark bg).

Diagram draw functions: `drawReconEngineDiagram`, `drawHyperStreamDiagram`, `drawIntelliQueryDiagram` — each calls `drawNode(svg, ns, x, y, w, h, label, subLabel, cls, tooltip)` and `drawArrow(svg, ns, pathD, cls, markerId)`. Arrow animation (`flowDash` keyframes) is injected into `<head>` via a `<style>` element at script load time.

### JS Initialization Flow
`DOMContentLoaded` → `initializePortfolio()` calls all setup functions. `window.load` → `body.opacity = 1` + typing effect starts. The guard at the bottom (`if readyState !== 'loading'`) handles the case where the script executes after DOMContentLoaded has already fired.

### Static Assets
`./resources/profile.jpg` — profile photo
`./resources/Shiv_Chandekar_Resume.pdf` — resume download

## Git Workflow
Always work on the `dev` branch. `main` is the production branch (GitHub Pages deployment).
