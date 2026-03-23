// ===== PORTFOLIO JAVASCRIPT =====
// Author: Shiv Chandekar
// Description: Interactive functionality for portfolio website

'use strict';

// ===== GLOBAL VARIABLES =====
let particlesInitialized = false;
let typingInterval;
let statsAnimated = false;
const diagramsRendered = {};

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    setTimeout(startTypingEffect, 1000);
});

// ===== MAIN INITIALIZATION FUNCTION =====
function initializePortfolio() {
    createFloatingParticles();
    setupSmoothScrolling();
    setupNavbarScrollEffects();
    setupScrollToTop();
    setupIntersectionObservers();
    setupTechItemHoverEffects();
    setupExpandableCards();
    setupParallaxEffects();
    setupKeyboardNavigation();
    showDeveloperMessage();
}

// ===== DATA PACKET PARTICLES =====
function createFloatingParticles() {
    if (particlesInitialized) return;

    const container = document.getElementById('particles');
    if (!container) return;

    const count = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < count; i++) {
        const packet = document.createElement('div');
        packet.className = 'data-packet';

        // Random vertical position and size variation
        packet.style.top = Math.random() * 100 + '%';
        const delay = Math.random() * 12;
        const duration = Math.random() * 8 + 6;
        packet.style.animationDelay = delay + 's';
        packet.style.animationDuration = duration + 's';

        const size = Math.random() * 3 + 2;
        packet.style.width = size + 'px';
        packet.style.height = size + 'px';

        // Vary opacity
        packet.style.opacity = (Math.random() * 0.5 + 0.5).toString();

        container.appendChild(packet);
    }

    particlesInitialized = true;
}

// ===== SMOOTH SCROLLING NAVIGATION =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// ===== NAVBAR SCROLL EFFECTS =====
function setupNavbarScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollTopButton = document.getElementById('scrollTop');

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
            scrollTopButton.style.display = 'flex';
        } else {
            navbar.classList.remove('scrolled');
            scrollTopButton.style.display = 'none';
        }
        updateActiveNavLink();
    });
}

// ===== UPDATE ACTIVE NAVIGATION LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const currentLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (currentLink) currentLink.classList.add('active');
        }
    });
}

// ===== SCROLL TO TOP =====
function setupScrollToTop() {
    const scrollTopButton = document.getElementById('scrollTop');
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
function startTypingEffect() {
    const texts = [
        'Backend Software Engineer',
        'Microservices Architect',
        'Distributed Systems Expert',
        'Java Developer'
    ];

    let textIndex = 0;
    let charIndex = 0;
    const subtitle = document.querySelector('.hero .subtitle');
    if (!subtitle) return;

    function type() {
        if (charIndex < texts[textIndex].length) {
            subtitle.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            subtitle.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }

    subtitle.textContent = '';
    type();
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function setupIntersectionObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.2 });

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .contact-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });

    document.querySelectorAll('section').forEach(section => sectionObserver.observe(section));

    const aboutSection = document.getElementById('about');
    if (aboutSection) statsObserver.observe(aboutSection);
}

// ===== ANIMATE STATISTICS COUNTERS =====
function animateStats() {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = stat.textContent;
        const isNumber = target.match(/\d+/);
        if (isNumber) {
            const number = parseInt(isNumber[0]);
            const suffix = target.replace(number.toString(), '');
            let current = 0;
            const increment = number / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = number + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 20);
        }
    });
}

// ===== TECH ITEMS HOVER EFFECTS =====
function setupTechItemHoverEffects() {
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ===== EXPANDABLE ARCHITECTURE CARDS =====
function setupExpandableCards() {
    document.querySelectorAll('.project-arch-toggle').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.dataset.project;
            const diagram = document.getElementById('arch-' + projectId);
            if (!diagram) return;

            const isOpen = diagram.classList.contains('open');

            if (isOpen) {
                diagram.classList.remove('open');
                this.classList.remove('open');
                this.setAttribute('aria-expanded', 'false');
            } else {
                diagram.classList.add('open');
                this.classList.add('open');
                this.setAttribute('aria-expanded', 'true');
                // Lazy render on first expand
                if (!diagramsRendered[projectId]) {
                    renderDiagram(projectId);
                    diagramsRendered[projectId] = true;
                }
            }
        });
    });
}

// ===== RENDER DIAGRAM (lazy) =====
function renderDiagram(projectId) {
    const container = document.querySelector(`#arch-${projectId} .arch-diagram-inner`);
    if (!container) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);

    if (projectId === 'recon') {
        drawReconEngineDiagram(svg, svgNS);
    } else if (projectId === 'hyperstream') {
        drawHyperStreamDiagram(svg, svgNS);
    } else if (projectId === 'intelliquery') {
        drawIntelliQueryDiagram(svg, svgNS);
    }

    container.appendChild(svg);
    attachNodeTooltips(svg);

    if (projectId === 'recon') {
        buildReconMetrics(container);
    }
}

// ===== DIAGRAM HELPER: draw a node =====
function drawNode(svg, ns, x, y, w, h, label, subLabel, cls, tooltip, icon = '') {
    const isHighlight = cls === 'highlight-node';
    const isDimmed = cls === 'dimmed-node';

    const g = document.createElementNS(ns, 'g');
    g.classList.add('arch-node');
    if (cls) g.classList.add(cls);
    if (tooltip) g.dataset.tooltip = tooltip;
    g.style.cursor = tooltip ? 'pointer' : 'default';

    const rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', w);
    rect.setAttribute('height', h);
    rect.setAttribute('rx', 6);
    // Inline fill/stroke so they work regardless of CSS cascade on dynamic SVG
    rect.setAttribute('fill', isHighlight ? 'rgba(244,63,94,0.08)' : isDimmed ? 'rgba(161,161,170,0.04)' : '#141414');
    rect.setAttribute('stroke', isHighlight ? '#f43f5e' : isDimmed ? 'rgba(161,161,170,0.3)' : 'rgba(225,29,72,0.5)');
    rect.setAttribute('stroke-width', '1.5');
    g.appendChild(rect);

    const labelFill = isDimmed ? '#a1a1aa' : isHighlight ? '#f43f5e' : '#f5f5f5';
    const cx = x + w / 2;

    if (icon) {
        // Use foreignObject so FA CSS classes render reliably in dynamic SVG
        const fo = document.createElementNS(ns, 'foreignObject');
        fo.setAttribute('x', String(cx - 8));
        fo.setAttribute('y', String(y + h / 2 - 22));
        fo.setAttribute('width', '16');
        fo.setAttribute('height', '16');
        const iEl = document.createElement('i');
        iEl.className = icon;
        iEl.style.cssText = `color:${labelFill};font-size:12px;display:block;text-align:center;line-height:16px;`;
        fo.appendChild(iEl);
        g.appendChild(fo);
    }

    const labelYBase = icon ? y + h / 2 + 3 : y + h / 2;
    const text = document.createElementNS(ns, 'text');
    text.setAttribute('x', cx);
    text.setAttribute('y', subLabel ? labelYBase - 7 : labelYBase);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', labelFill);
    text.setAttribute('font-family', 'Courier New, monospace');
    text.setAttribute('font-size', '11');
    if (isDimmed) text.setAttribute('text-decoration', 'line-through');
    text.textContent = label;
    g.appendChild(text);

    if (subLabel) {
        const sub = document.createElementNS(ns, 'text');
        sub.setAttribute('x', cx);
        sub.setAttribute('y', (subLabel ? labelYBase - 7 : labelYBase) + (icon ? 16 : 16));
        sub.setAttribute('font-size', '9');
        sub.setAttribute('fill', '#a1a1aa');
        sub.setAttribute('text-anchor', 'middle');
        sub.setAttribute('dominant-baseline', 'middle');
        sub.setAttribute('font-family', 'Courier New, monospace');
        sub.textContent = subLabel;
        g.appendChild(sub);
    }

    svg.appendChild(g);
    return g;
}

// ===== DIAGRAM HELPER: draw an arrow path =====
function drawArrow(svg, ns, pathD, cls, markerId) {
    // Ensure <defs> exists
    let defs = svg.querySelector('defs');
    if (!defs) {
        defs = document.createElementNS(ns, 'defs');
        svg.insertBefore(defs, svg.firstChild);
    }

    const isGreen = cls && cls.includes('green');
    const isDim = cls && cls.includes('dim');
    const arrowColor = isGreen ? 'rgba(244,63,94,0.7)' : isDim ? 'rgba(161,161,170,0.3)' : 'rgba(225,29,72,0.7)';

    // Create marker if not already in this SVG
    if (!defs.querySelector(`#${markerId}`)) {
        const marker = document.createElementNS(ns, 'marker');
        marker.setAttribute('id', markerId);
        marker.setAttribute('markerWidth', '8');
        marker.setAttribute('markerHeight', '6');
        marker.setAttribute('refX', '7');
        marker.setAttribute('refY', '3');
        marker.setAttribute('orient', 'auto');
        const poly = document.createElementNS(ns, 'polygon');
        poly.setAttribute('points', '0 0, 8 3, 0 6');
        poly.setAttribute('fill', arrowColor);  // inline fill — reliable inside <marker>
        marker.appendChild(poly);
        defs.appendChild(marker);
    }

    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', arrowColor);
    path.setAttribute('stroke-width', '1.5');
    if (!isDim) {
        path.setAttribute('stroke-dasharray', '6 4');
        path.style.animation = 'flowDash 1.5s linear infinite';
    }
    path.setAttribute('marker-end', `url(#${markerId})`);
    svg.appendChild(path);
}

// ===== RECON METRICS DASHBOARD =====
function buildReconMetrics(container) {
    window._reconMetricIntervals = window._reconMetricIntervals || [];

    let tps = 2847;
    let matchRate = 99.4;
    let pending = 142;
    let kafkaLag = 18;
    let lastNpciMins = 2;
    let lastCbsMins = 2;

    const html = `<div class="recon-metrics">
      <div class="rm-tile" id="rm-tile-tps">
        <span class="rm-value" id="rm-tps">2,847</span>
        <span class="rm-label">TXN/s</span>
        <span class="rm-dot rm-dot--live"></span>
      </div>
      <div class="rm-tile" id="rm-tile-match">
        <span class="rm-value" id="rm-match">99.4%</span>
        <span class="rm-label">Match Rate</span>
        <span class="rm-dot rm-dot--live"></span>
      </div>
      <div class="rm-tile">
        <span class="rm-value" id="rm-pending">142</span>
        <span class="rm-label">Pending Recon</span>
        <span class="rm-dot rm-dot--live"></span>
      </div>
      <div class="rm-tile">
        <span class="rm-value" id="rm-lag">18ms</span>
        <span class="rm-label">Kafka Lag</span>
        <span class="rm-dot rm-dot--live"></span>
      </div>
      <div class="rm-tile">
        <span class="rm-value" id="rm-file">NPCI 2m / CBS 2m</span>
        <span class="rm-label">Last File</span>
        <span class="rm-dot rm-dot--live"></span>
      </div>
    </div>`;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    container.appendChild(wrapper.firstElementChild);

    function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

    window._reconMetricIntervals.push(setInterval(function() {
        tps += rand(-150, 150);
        tps = Math.max(2000, Math.min(4000, tps));
        document.getElementById('rm-tps').textContent = tps.toLocaleString();
    }, 1200));

    window._reconMetricIntervals.push(setInterval(function() {
        matchRate += (Math.random() - 0.5) * 0.2;
        matchRate = Math.max(98.5, Math.min(99.9, matchRate));
        const rounded = matchRate.toFixed(1);
        const el = document.getElementById('rm-match');
        const tile = document.getElementById('rm-tile-match');
        el.textContent = rounded + '%';
        if (parseFloat(rounded) < 99.0) {
            tile.classList.add('rm-alert');
        } else {
            tile.classList.remove('rm-alert');
        }
    }, 3000));

    window._reconMetricIntervals.push(setInterval(function() {
        pending += rand(-20, 20);
        pending = Math.max(50, Math.min(400, pending));
        document.getElementById('rm-pending').textContent = pending;
    }, 2000));

    window._reconMetricIntervals.push(setInterval(function() {
        kafkaLag += rand(-8, 8);
        kafkaLag = Math.max(5, Math.min(80, kafkaLag));
        document.getElementById('rm-lag').textContent = kafkaLag + 'ms';
    }, 1500));

    window._reconMetricIntervals.push(setInterval(function() {
        lastNpciMins++;
        lastCbsMins++;
        document.getElementById('rm-file').textContent = 'NPCI ' + lastNpciMins + 'm / CBS ' + lastCbsMins + 'm';
    }, 60000));
}

// ===== RECON ENGINE DIAGRAM =====
function drawReconEngineDiagram(svg, ns) {
    svg.setAttribute('viewBox', '0 0 760 300');
    svg.setAttribute('width', '760');
    svg.setAttribute('height', '300');

    // --- Defs: motion paths (invisible, used by animateMotion) ---
    let defs = svg.querySelector('defs');
    if (!defs) {
        defs = document.createElementNS(ns, 'defs');
        svg.insertBefore(defs, svg.firstChild);
    }

    // Real-time path: Switch → Kafka midpoint → Java Consumer midpoint
    const rtPath = document.createElementNS(ns, 'path');
    rtPath.setAttribute('id', 'rt-path');
    rtPath.setAttribute('d', 'M 110 62 L 165 62 L 265 62 L 325 62 L 435 62');
    rtPath.setAttribute('fill', 'none');
    rtPath.setAttribute('stroke', 'none');
    defs.appendChild(rtPath);

    // Batch path: SFTP → Redis midpoint
    const batchPath = document.createElementNS(ns, 'path');
    batchPath.setAttribute('id', 'batch-path');
    batchPath.setAttribute('d', 'M 225 207 L 290 182');
    batchPath.setAttribute('fill', 'none');
    batchPath.setAttribute('stroke', 'none');
    defs.appendChild(batchPath);

    // --- Lane labels ---
    const laneLabel1 = document.createElementNS(ns, 'text');
    laneLabel1.setAttribute('x', '5');
    laneLabel1.setAttribute('y', '30');
    laneLabel1.setAttribute('fill', 'rgba(161,161,170,0.5)');
    laneLabel1.setAttribute('font-family', 'Courier New, monospace');
    laneLabel1.setAttribute('font-size', '9');
    laneLabel1.textContent = 'REAL-TIME STREAM';
    svg.appendChild(laneLabel1);

    const laneLabel2 = document.createElementNS(ns, 'text');
    laneLabel2.setAttribute('x', '5');
    laneLabel2.setAttribute('y', '150');
    laneLabel2.setAttribute('fill', 'rgba(161,161,170,0.5)');
    laneLabel2.setAttribute('font-family', 'Courier New, monospace');
    laneLabel2.setAttribute('font-size', '9');
    laneLabel2.textContent = 'BATCH FILES';
    svg.appendChild(laneLabel2);

    // --- Lane 1: Real-time ---
    drawNode(svg, ns, 10,  40, 100, 44, 'Switch',         'UPI Events',    '',              'Payment switch sending real-time UPI transaction events');
    drawNode(svg, ns, 165, 40, 100, 44, 'Kafka',          'Broker',        'highlight-node','6 partitions, replication factor 3; sub-10ms publish latency');
    drawNode(svg, ns, 325, 40, 110, 44, 'Java Consumer',  'Spring Boot',   '',              'Consumer group reads from Kafka, writes to YugabyteDB');
    drawNode(svg, ns, 495, 40, 120, 44, 'YugabyteDB',     'Write Path',    '',              'Distributed SQL; stores raw switch transactions for recon');

    // --- Lane 2: Batch ---
    drawNode(svg, ns, 10,  160, 80, 44, 'NPCI',   'Cycle Files', '', 'NPCI end-of-day settlement cycle files via SFTP');
    drawNode(svg, ns, 10,  220, 80, 44, 'CBS',    'Cycle Files', '', 'Core Banking System batch files via SFTP');
    drawNode(svg, ns, 145, 185, 80, 44, 'SFTP',   'Batch',       '', 'Secure file transfer; files land in watched directory');
    drawNode(svg, ns, 290, 160, 100, 44, 'Redis', 'Data Store',  'highlight-node', 'Loaded batch records keyed by txn ID; 2ms p99 reads');

    // Gears node — stored so we can add CSS animation
    const gearsG = drawNode(svg, ns, 450, 160, 120, 44, 'Redis Gears',   'Python UDF',    'highlight-node', 'Python UDF reads Switch (Redis/Yugabyte) + NPCI/CBS; compares txn ID, amount, DR/CR, status, customer ref');
    gearsG.style.animation = 'reconPulse 2s ease-in-out infinite';

    drawNode(svg, ns, 450, 225, 120, 44, 'Redis Streams',  'Discrepancies', '',             'Discrepancy events published to Redis Streams topic');
    drawNode(svg, ns, 630, 185, 110, 44, 'Reporting Svc',  '→ YugabyteDB',  '',             'Consumes Redis Streams; persists reconciliation report to YugabyteDB');

    // --- Arrows ---
    // Lane 1 flow
    drawArrow(svg, ns, 'M 110 62 L 163 62', '', 'ra1');
    drawArrow(svg, ns, 'M 265 62 L 323 62', '', 'ra2');
    drawArrow(svg, ns, 'M 435 62 L 493 62', '', 'ra3');
    // Cross-lane: YugabyteDB write path → Redis (Switch data loaded for recon)
    drawArrow(svg, ns, 'M 555 84 Q 555 130 390 175', 'dim-flow', 'ra4');
    // Lane 2: npci + cbs → sftp
    drawArrow(svg, ns, 'M 90 182 L 143 207', '', 'ra5');
    drawArrow(svg, ns, 'M 90 242 L 143 214', '', 'ra6');
    // sftp → redis
    drawArrow(svg, ns, 'M 225 207 L 288 182', '', 'ra7');
    // redis → gears
    drawArrow(svg, ns, 'M 390 182 L 448 182', '', 'ra8');
    // gears → streams (red / mismatch)
    drawArrow(svg, ns, 'M 510 204 L 510 223', 'green-flow', 'ra9');
    // streams → reporting
    drawArrow(svg, ns, 'M 570 247 L 628 215', '', 'ra10');

    // --- animateMotion packets ---
    // Crimson packets on rt-path (Switch → Kafka → Java)
    [0, 0.7, 1.4].forEach(function(delay) {
        const c = document.createElementNS(ns, 'circle');
        c.setAttribute('r', '3');
        c.setAttribute('fill', '#dc2626');
        const motion = document.createElementNS(ns, 'animateMotion');
        motion.setAttribute('dur', '2s');
        motion.setAttribute('begin', delay + 's');
        motion.setAttribute('repeatCount', 'indefinite');
        motion.setAttribute('rotate', 'auto');
        const mpath = document.createElementNS(ns, 'mpath');
        mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#rt-path');
        motion.appendChild(mpath);
        c.appendChild(motion);
        svg.appendChild(c);
    });

    // Gray packets on batch-path (SFTP → Redis)
    [0, 1.2].forEach(function(delay) {
        const c = document.createElementNS(ns, 'circle');
        c.setAttribute('r', '3');
        c.setAttribute('fill', '#71717a');
        const motion = document.createElementNS(ns, 'animateMotion');
        motion.setAttribute('dur', '4s');
        motion.setAttribute('begin', delay + 's');
        motion.setAttribute('repeatCount', 'indefinite');
        motion.setAttribute('rotate', 'auto');
        const mpath = document.createElementNS(ns, 'mpath');
        mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#batch-path');
        motion.appendChild(mpath);
        c.appendChild(motion);
        svg.appendChild(c);
    });
}

// ===== HYPERSTREAM ANALYTICS DIAGRAM =====
function drawHyperStreamDiagram(svg, ns) {
    svg.setAttribute('viewBox', '0 0 700 230');
    svg.setAttribute('width', '700');
    svg.setAttribute('height', '230');

    // Row 1
    drawNode(svg, ns, 10,  85, 120, 44, 'UPI TXN Feed', '70M+ / day', '', 'Raw UPI transaction stream from NPCI', 'fa-solid fa-rss');
    drawNode(svg, ns, 185, 85, 100, 44, 'Kafka',        'Broker', '', 'Message bus; fan-out to legacy and new pipelines', 'fa-solid fa-layer-group');

    // Legacy path (dimmed)
    drawNode(svg, ns, 355, 30,  140, 44, 'Spark Cluster', 'Legacy · 4hrs', 'dimmed-node', 'Deprecated: 40-node Spark cluster, high infrastructure cost', 'fa-solid fa-fire');

    // New path
    drawNode(svg, ns, 355, 105, 140, 44, 'DuckDB Engine', 'Vectorized', 'highlight-node', 'Single-node columnar engine; processes full dataset in 15 min', 'fa-solid fa-database');
    drawNode(svg, ns, 555, 105, 120, 44, 'Analytics Output', 'Reports', 'highlight-node', 'Reconciliation reports, cost dashboards', 'fa-solid fa-chart-bar');

    // Performance badge
    const badge = document.createElementNS(ns, 'text');
    badge.setAttribute('x', '425');
    badge.setAttribute('y', '185');
    badge.setAttribute('text-anchor', 'middle');
    badge.setAttribute('fill', '#f43f5e');
    badge.setAttribute('font-family', 'Courier New, monospace');
    badge.setAttribute('font-size', '11');
    badge.textContent = '18x faster · 70% cheaper';
    svg.appendChild(badge);

    // Arrows
    drawArrow(svg, ns, 'M 130 107 L 183 107', '', 'ha1');
    // Kafka → Spark (dim)
    drawArrow(svg, ns, 'M 260 95 Q 300 65 353 52', 'dim-flow', 'ha2');
    // Kafka → DuckDB
    drawArrow(svg, ns, 'M 260 117 Q 300 125 353 127', 'green-flow', 'ha3');
    // DuckDB → Output
    drawArrow(svg, ns, 'M 495 127 L 553 127', 'green-flow', 'ha4');
}

// ===== INTELLIQUERY DIAGRAM =====
function drawIntelliQueryDiagram(svg, ns) {
    svg.setAttribute('viewBox', '0 0 700 200');
    svg.setAttribute('width', '700');
    svg.setAttribute('height', '200');

    // Row 1
    drawNode(svg, ns, 10,  75, 100, 44, 'NL Query',      'User Input', '', 'Free-form natural language question from analyst', 'fa-solid fa-comments');
    drawNode(svg, ns, 165, 75, 110, 44, 'Langchain',     'Agent', '', 'Prompt chaining, memory, tool routing', 'fa-solid fa-link');
    drawNode(svg, ns, 335, 75, 120, 44, 'Llama3 LLM',    'Local', 'highlight-node', 'Locally hosted Llama3 8B; no external API calls', 'fa-solid fa-brain');
    drawNode(svg, ns, 515, 75, 130, 44, 'SQL Generator',  'AST Builder', '', 'Converts LLM output to validated DuckDB SQL', 'fa-solid fa-code');

    // Row 2
    drawNode(svg, ns, 390, 150, 120, 40, 'DuckDB Engine', 'Analytics', 'highlight-node', 'Executes generated SQL; sub-second response', 'fa-solid fa-database');
    drawNode(svg, ns, 560, 150, 120, 40, 'Streamlit UI',  'Dashboard', '', 'Charts, tables, RCA insights rendered live', 'fa-solid fa-display');

    // Arrows row 1
    drawArrow(svg, ns, 'M 110 97 L 163 97', '', 'iq1');
    drawArrow(svg, ns, 'M 275 97 L 333 97', '', 'iq2');
    drawArrow(svg, ns, 'M 455 97 L 513 97', '', 'iq3');
    // SQL Gen → DuckDB
    drawArrow(svg, ns, 'M 560 119 Q 530 140 510 158', '', 'iq4');
    // DuckDB → Streamlit
    drawArrow(svg, ns, 'M 510 170 L 558 170', 'green-flow', 'iq5');
}

// ===== NODE TOOLTIPS =====
function attachNodeTooltips(svg) {
    const tooltip = document.createElement('div');
    tooltip.className = 'arch-tooltip';
    document.body.appendChild(tooltip);

    svg.querySelectorAll('.arch-node[data-tooltip]').forEach(node => {
        node.style.cursor = 'pointer';

        node.addEventListener('mouseenter', function(e) {
            tooltip.textContent = this.dataset.tooltip;
            tooltip.classList.add('visible');
            positionTooltip(e, tooltip);
        });

        node.addEventListener('mousemove', function(e) {
            positionTooltip(e, tooltip);
        });

        node.addEventListener('mouseleave', function() {
            tooltip.classList.remove('visible');
        });
    });
}

function positionTooltip(e, tooltip) {
    const offset = 14;
    let x = e.clientX + offset;
    let y = e.clientY + offset;
    const tw = tooltip.offsetWidth;
    const th = tooltip.offsetHeight;
    if (x + tw > window.innerWidth - 10) x = e.clientX - tw - offset;
    if (y + th > window.innerHeight - 10) y = e.clientY - th - offset;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
    tooltip.style.position = 'fixed';
}

// ===== PARALLAX EFFECTS =====
function setupParallaxEffects() {
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const particles = document.querySelector('.particles');
        if (particles && scrolled < window.innerHeight) {
            particles.style.transform = `translateY(${scrolled * -0.1}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// ===== DOWNLOAD RESUME =====
function downloadResume() {
    const link = document.createElement('a');
    link.href = './resources/Shiv_Chandekar_Resume.pdf';
    link.download = 'Shiv_Chandekar_Resume.pdf';
    link.target = '_blank';
    try {
        link.click();
    } catch (error) {
        alert('Resume download will be available soon. Please contact me directly for my latest resume.');
    }
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', { event_category: 'resume', event_label: 'header_download' });
    }
}

// ===== KEYBOARD NAVIGATION =====
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open arch diagrams
            document.querySelectorAll('.arch-diagram.open').forEach(diag => {
                diag.classList.remove('open');
                const projectId = diag.id.replace('arch-', '');
                const btn = document.querySelector(`.project-arch-toggle[data-project="${projectId}"]`);
                if (btn) {
                    btn.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
            document.querySelector('.nav-links')?.classList.remove('active');
        }
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (e.key === 'End' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: rgba(225, 29, 72, 0.9); color: #0c0c0c;
        padding: 1rem 2rem; border-radius: 5px; z-index: 10000;
        transform: translateX(400px); transition: transform 0.3s ease;
        max-width: 300px; word-wrap: break-word; font-weight: 600;
    `;
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===== DEVELOPER CONSOLE MESSAGE =====
function showDeveloperMessage() {
    const c = 'color: #e11d48; font-size: 14px; font-weight: bold;';
    const s = 'color: #a1a1aa; font-size: 12px;';
    console.log('%cHey there, fellow developer! 👋', c);
    console.log('%cImpressed by the pipeline architecture? Let\'s connect!', s);
    console.log('%cEmail: shivchandekar2805@gmail.com', s);
    console.log('%cLinkedIn: https://www.linkedin.com/in/shiv-chandekar-0799241b6/', s);
    console.log('%cGitHub: https://github.com/sscba', s);
    console.log('%c🚀 70M+ daily transactions · Distributed Systems · Microservices', c);
}

// ===== UTILITY =====
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(function() {
    const newWidth = window.innerWidth;
    if (Math.abs(newWidth - (window.lastWidth || newWidth)) > 200) {
        const particles = document.querySelector('.particles');
        if (particles) {
            particles.innerHTML = '';
            particlesInitialized = false;
            createFloatingParticles();
        }
        window.lastWidth = newWidth;
    }
}, 250));

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`%cPortfolio loaded in ${loadTime}ms`, 'color: #e11d48; font-weight: bold;');
    }
});

// ===== EXPORT GLOBALS =====
window.downloadResume = downloadResume;

// ===== ADD ANIMATION CSS (ripple + flowDash for SVG arrows) =====
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to { transform: scale(2); opacity: 0; }
    }
    @keyframes flowDash {
        to { stroke-dashoffset: -20; }
    }
`;
document.head.appendChild(rippleStyle);

