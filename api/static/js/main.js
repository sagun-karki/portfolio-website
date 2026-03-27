document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT SELECTORS ---
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navLinksContainer = document.querySelector('.nav-links');
    const header = document.querySelector('.main-header');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.material-symbols-outlined');
    const docElement = document.documentElement;

    // --- RESPONSIVE NAVIGATION ---
    if (hamburgerButton && navLinksContainer) {
        hamburgerButton.addEventListener('click', () => {
            navLinksContainer.classList.toggle('is-open');
            // GA4: Track mobile menu engagement
            if (typeof gtag === 'function') {
                gtag('event', 'mobile_menu_toggle', {
                    menu_state: navLinksContainer.classList.contains('is-open') ? 'open' : 'closed'
                });
            }
        });
    }

    // --- THEME LOGIC ---
    function updateThemeIcon() {
        if (!themeIcon) return;
        themeIcon.textContent = docElement.classList.contains('dark-theme') ? 'light_mode' : 'dark_mode';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isCurrentlyDark = docElement.classList.toggle('dark-theme');
            localStorage.setItem('theme', isCurrentlyDark ? 'dark' : 'light');
            updateThemeIcon();
            // GA4: Track theme change
            if (typeof gtag === 'function') {
                gtag('event', 'theme_change', {
                    theme_selected: isCurrentlyDark ? 'dark' : 'light'
                });
            }
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            docElement.classList.toggle('dark-theme', e.matches);
            updateThemeIcon();
        }
    });

    // --- SCROLL-TRIGGERED ANIMATIONS ---
    const animatedElements = document.querySelectorAll('.card, .timeline-item');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    animatedElements.forEach(el => animationObserver.observe(el));

    // --- ACTIVE NAVIGATION STATE (Pill Indicator) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navIndicator = document.querySelector('.nav-indicator');

    const activateNavLink = (link) => {
        if (!link || !navIndicator) return;

        // Position the pill behind the active link
        // offsetLeft is relative to .nav-links container, which already accounts for padding
        navIndicator.style.width = `${link.offsetWidth}px`;
        navIndicator.style.left = `${link.offsetLeft}px`;

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    };

    // Guard against missing navigation elements
    if (!sections.length || !navLinks.length) {
        console.warn('Navigation elements not found');
    }

    // Track section views using IntersectionObserver
    const trackedSections = new Set();
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                activateNavLink(activeLink);
                
                // GA4: Track section view (only once per section)
                if (typeof gtag === 'function' && !trackedSections.has(id)) {
                    trackedSections.add(id);
                    gtag('event', 'section_view', {
                        section_id: id
                    });
                }
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px" });
    sections.forEach(section => navObserver.observe(section));

    // --- THROTTLE FUNCTION FOR PERFORMANCE ---
    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }

    // --- MAIN SCROLL LISTENER (THROTTLED) ---
    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Floating pill transition
        const isScrolled = scrollY > 50;
        header.classList.toggle('scrolled', isScrolled);

        if (isScrolled) {
            // Shrink slightly and make more opaque on scroll
            header.style.transform = 'translateX(-50%) scale(0.95)';
            header.style.top = '1rem';
        } else {
            // Return to natural floating state
            header.style.transform = 'translateX(-50%) scale(1)';
            header.style.top = '1.5rem';
        }

        // Fix for active nav link on last section when scrolled to bottom
        const scrollBuffer = 5;
        if ((window.innerHeight + scrollY) >= document.body.offsetHeight - scrollBuffer) {
            const lastSectionId = sections[sections.length - 1]?.id;
            if (lastSectionId) {
                const lastLink = document.querySelector(`.nav-links a[href="#${lastSectionId}"]`);
                activateNavLink(lastLink);
            }
        }
    };

    window.addEventListener('scroll', throttle(handleScroll, 16), { passive: true });

    // Recalculate pill position on resize (throttled)
    window.addEventListener('resize', throttle(() => {
        const activeLink = document.querySelector('.nav-links a.active');
        if (activeLink) activateNavLink(activeLink);
    }, 100));

    // --- INITIAL PAGE LOAD ---
    updateThemeIcon();
    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) {
        setTimeout(() => activateNavLink(homeLink), 150);
    }
});

// --- ML SCHEMATIC LOADER ANIMATION ---
function animateSchematic() {
    if (typeof anime === 'undefined') return;

    const tl = anime.timeline({
        easing: 'easeOutElastic(1, .8)',
        duration: 1000,
    });

    tl
    .add({
        targets: '#ml-schematic-svg .structure-lines path, #ml-schematic-svg .structure-lines rect, #ml-schematic-svg .structure-lines circle, #ml-schematic-svg .structure-lines line',
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(150)
    })
    .add({
        targets: '#ml-schematic-svg .node-points circle',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(50),
        offset: '-=1000'
    })
    .add({
        targets: '#ml-schematic-svg .data-streams path',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1200,
        delay: anime.stagger(100),
        offset: '-=800'
    });
}

window.addEventListener('load', () => {
    animateSchematic();
});
