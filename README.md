# Shiv Chandekar — Portfolio
**Backend Software Engineer · Microservices · Distributed Systems**

## Live Demo
[sscba.github.io](https://sscba.github.io)

---

## About
Static personal portfolio with no build system, no package manager, and no compilation step — just three files (`index.html`, `style.css`, `script.js`). It highlights backend engineering work at MindGate Solutions, including a payment reconciliation platform handling 70M+ daily transactions across India's UPI, IMPS, and NEFT networks.

---

## Features
- Dark fintech-aesthetic design with animated dot-grid background
- Typing effect hero subtitle
- 3 project cards, each with an interactive **View Architecture** SVG diagram (lazily rendered on first open)
- Recon Engine diagram: animated two-lane SVG flow (real-time stream + batch files) with live-ticking ops dashboard (TPS, match rate, Kafka lag)
- Smooth scroll, parallax particles, scroll-to-top

---

## Projects

| Project | Description |
|---------|-------------|
| Recon Engine | Enterprise payment reconciliation platform — 70M+ daily txns, 95% latency reduction |
| HyperStream Analytics | Spark → DuckDB migration — 18x faster, 70% cheaper, 4 hrs → 15 min |
| IntelliQuery Dashboard | AI natural-language-to-SQL analytics with Llama3 + LangChain |

---

## Tech Stack
Java · Spring Boot · Apache Kafka · Redis · YugabyteDB · DuckDB · Llama3 · LangChain · Streamlit · Docker · Kubernetes

---

## Local Development

```bash
# No build step required
# Open index.html directly in your browser
open index.html

# Or use live-reload (optional)
npx serve .
```

---

## Project Structure

```
portfolio/
├── index.html       # All markup
├── style.css        # All styles (design tokens, animations, responsive)
├── script.js        # All interactivity (SVG diagrams, particles, typing effect)
└── resources/
    ├── profile.jpg
    └── Shiv_Chandekar_Resume.pdf
```

---

## Architecture Diagrams

SVG diagrams are rendered dynamically in JavaScript. All visual properties (`fill`, `stroke`, `text-anchor`, `dominant-baseline`) are set as inline SVG attributes — not CSS classes — for cross-browser reliability.

- `drawNode()` / `drawArrow()` helpers in `script.js` build each diagram on first open
- Recon Engine uses `<animateMotion>` + `<mpath>` for packet animations and `setInterval`-based live metrics (TPS, match rate, Kafka lag)

---

## Contact
- Email: shivchandekar2805@gmail.com
- LinkedIn: [shiv-chandekar-0799241b6](https://www.linkedin.com/in/shiv-chandekar-0799241b6/)
- GitHub: [sscba](https://github.com/sscba)
