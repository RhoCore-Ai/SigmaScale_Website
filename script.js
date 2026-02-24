// ═══ RhoCore-SigmaScale Landing Page JS ═══

// Scroll-triggered animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    // Animate all section elements
    document.querySelectorAll('.feature-card, .arch-card, .proof-card, .bench-stat, .math-card, .stack-item, .section-label, h2, .section-desc, .bench-comparison, .arch-image').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // Stagger animation delays for grids
    document.querySelectorAll('.feature-grid, .proof-grid, .stack-grid, .bench-stats').forEach(grid => {
        grid.querySelectorAll('.fade-up').forEach((el, i) => {
            el.style.transitionDelay = `${i * 80}ms`;
        });
    });

    // Nav scroll effect
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Counter animation for hero stats
    document.querySelectorAll('.hero-stat-value').forEach(el => {
        const text = el.textContent;
        if (/^\d/.test(text.replace(/[<>,]/g, ''))) {
            const num = parseInt(text.replace(/[^0-9]/g, ''));
            if (num > 100) animateCounter(el, num, text);
        }
    });
});

function animateCounter(el, target, template) {
    let current = 0;
    const duration = 1500;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(target * eased);

        if (template.includes(',')) {
            el.textContent = current.toLocaleString();
        } else if (template.includes('+')) {
            el.textContent = current + '+';
        } else {
            el.textContent = current.toString();
        }

        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = template;
    }
    requestAnimationFrame(tick);
}
