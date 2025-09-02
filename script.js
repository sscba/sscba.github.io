// ===== PORTFOLIO JAVASCRIPT =====
// Author: Shiv Chandekar
// Description: Interactive functionality for portfolio website

'use strict';

// ===== GLOBAL VARIABLES =====
let particlesInitialized = false;
let typingInterval;
let statsAnimated = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', function() {
    // Fade in the body
    document.body.style.opacity = '1';
    
    // Start typing effect after a delay
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
    setupProjectCardEffects();
    setupParallaxEffects();
    setupKeyboardNavigation();
    showDeveloperMessage();
}

// ===== FLOATING PARTICLES ANIMATION =====
function createFloatingParticles() {
    if (particlesInitialized) return;
    
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 30 : 50; // Fewer particles on mobile
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and animation
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Add some variety to particle sizes
        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
    
    particlesInitialized = true;
}

// ===== SMOOTH SCROLLING NAVIGATION =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
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
        
        // Navbar scroll effect
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
            scrollTopButton.style.display = 'flex';
        } else {
            navbar.classList.remove('scrolled');
            scrollTopButton.style.display = 'none';
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
}

// ===== UPDATE ACTIVE NAVIGATION LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const currentLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
    });
}

// ===== SCROLL TO TOP FUNCTIONALITY =====
function setupScrollToTop() {
    const scrollTopButton = document.getElementById('scrollTop');
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
    
    // Clear existing content and start typing
    subtitle.textContent = '';
    type();
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function setupIntersectionObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // General animation observer
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Section visibility observer
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.2 });
    
    // Stats animation observer
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Apply observers
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .contact-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Observe about section for stats
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
}

// ===== ANIMATE STATISTICS COUNTERS =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = target.match(/\d+/);
        
        if (isNumber) {
            const number = parseInt(isNumber[0]);
            const suffix = target.replace(number.toString(), '');
            let current = 0;
            const increment = number / 100;
            const duration = 2000; // 2 seconds
            const stepTime = duration / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = number + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
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
        
        // Add click effect for mobile
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });
    });
}

// ===== PROJECT CARD EFFECTS =====
function setupProjectCardEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            // Click animation
            this.style.transform = 'translateY(-15px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1)';
            }, 200);
            
            // Add ripple effect
            createRippleEffect(this, event);
        });
        
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.05)';
        });
    });
}

// ===== CREATE RIPPLE EFFECT =====
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ===== PARALLAX EFFECTS =====
function setupParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const particles = document.querySelector('.particles');
        
        if (hero && scrolled < window.innerHeight) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        if (particles && scrolled < window.innerHeight) {
            const rate = scrolled * -0.2;
            particles.style.transform = `translateY(${rate}px)`;
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

// ===== DOWNLOAD RESUME FUNCTIONALITY =====
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Replace with actual resume path when available
    const resumePath = './resources/Shiv_Chandekar_Resume.pdf';
    
    link.href = resumePath;
    link.download = 'Shiv_Chandekar_Resume.pdf';
    link.target = '_blank';
    
    // Try to download, fallback to alert if file doesn't exist
    try {
        link.click();
    } catch (error) {
        alert('Resume download will be available soon. Please contact me directly for my latest resume.');
    }
    
    // Analytics tracking (if Google Analytics is implemented)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            'event_category': 'resume',
            'event_label': 'header_download'
        });
    }
}

// ===== CONTACT FORM HANDLING (Future Enhancement) =====
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Here you would typically send the data to your backend
    // For now, we'll show a success message
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    
    // Reset form
    event.target.reset();
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 255, 0.9);
        color: #0a0a0a;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===== KEYBOARD NAVIGATION =====
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key - close any open elements
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
        
        // Home key - go to top
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // End key - go to bottom
        if (e.key === 'End' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== MOBILE MENU TOGGLE (Future Enhancement) =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
    
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
}

// ===== THEME TOGGLE (Future Enhancement) =====
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// ===== LOAD SAVED THEME =====
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

// ===== DEVELOPER CONSOLE MESSAGE =====
function showDeveloperMessage() {
    const styles = {
        title: 'color: #00ffff; font-size: 18px; font-weight: bold;',
        subtitle: 'color: #40e0ff; font-size: 14px;',
        info: 'color: #e0e6ed; font-size: 12px;'
    };
    
    console.log('%cHey there, fellow developer! 👋', styles.title);
    console.log('%cImpressed by the portfolio?', styles.subtitle);
    console.log('%cLet\'s connect and build amazing things together!', styles.subtitle);
    console.log('%cEmail: shivchandekar2805@gmail.com', styles.info);
    console.log('%cLinkedIn: https://www.linkedin.com/in/shiv-chandekar-0799241b6/', styles.info);
    console.log('%cGitHub: https://github.com/sscba', styles.info);
    console.log('%c\n🚀 Backend Systems | Microservices | Distributed Architecture', styles.subtitle);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
    
    // Show user-friendly error message
    if (e.error && e.error.message) {
        showNotification('Something went wrong. Please refresh the page.', 'error');
    }
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    // Log performance metrics
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`%cPortfolio loaded in ${loadTime}ms`, 'color: #00ffff; font-weight: bold;');
    }
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(function() {
    // Reinitialize particles if screen size changed significantly
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

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.downloadResume = downloadResume;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleTheme = toggleTheme;

// ===== ADD RIPPLE ANIMATION CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE ON SCRIPT LOAD =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}