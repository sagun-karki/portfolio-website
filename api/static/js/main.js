// --- ELEMENT SELECTORS ---
const hamburgerButton = document.querySelector('.hamburger-button');
const navLinksContainer = document.querySelector('.nav-links');
const header = document.querySelector('.main-header');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('md-icon');
const docElement = document.documentElement;
const particlesContainer = document.getElementById('tsparticles');
const heroSection = document.querySelector('.hero');

// --- RESPONSIVE NAVIGATION ---
hamburgerButton.addEventListener('click', () => {
    navLinksContainer.classList.toggle('is-open');
});

// --- PARTICLE CONFIGURATIONS ---
const baseParticlesConfig = {
    fpsLimit: 120,
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "grab"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                links: {
                    opacity: 1
                }
            }
        },
    },
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        },
    },
    detectRetina: true,
};
const lightParticlesConfig = {
    ...baseParticlesConfig,
    particles: {
        ...baseParticlesConfig.particles,
        color: {
            value: "#020b43ff"
        },
        links: {
            ...baseParticlesConfig.particles.links,
            color: "#8f9ffbff"
        },
    }
};
const darkParticlesConfig = {
    ...baseParticlesConfig,
    particles: {
        ...baseParticlesConfig.particles,
        color: {
            value: "#a8b2c1"
        },
        links: {
            ...baseParticlesConfig.particles.links,
            color: "#333a65ff"
        },
    }
};

// --- THEME & PARTICLE VISIBILITY LOGIC ---
function loadParticlesTheme() {
    const isDarkMode = docElement.classList.contains('dark-theme');
    tsParticles.load("tsparticles", isDarkMode ? darkParticlesConfig : lightParticlesConfig);
}

function updateThemeIcon() {
    themeIcon.textContent = docElement.classList.contains('dark-theme') ? 'light_mode' : 'dark_mode';
}

function handleParticleVisibility() {
    if (!heroSection) return;
    const isLightMode = !docElement.classList.contains('dark-theme');
    if (isLightMode) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        particlesContainer.classList.toggle('is-hidden', scrollPosition > heroHeight - header.offsetHeight);
    } else {
        particlesContainer.classList.remove('is-hidden');
    }
}

// --- THEME EVENT LISTENERS ---
themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = docElement.classList.toggle('dark-theme');
    localStorage.setItem('theme', isCurrentlyDark ? 'dark' : 'light');
    updateThemeIcon();
    loadParticlesTheme();
    handleParticleVisibility();
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        docElement.classList.toggle('dark-theme', e.matches);
        updateThemeIcon();
        loadParticlesTheme();
        handleParticleVisibility();
    }
});

// --- RESIZE LISTENER ---
window.addEventListener('resize', handleParticleVisibility);

// --- SCROLL-TRIGGERED ANIMATIONS ---
const animatedElements = document.querySelectorAll('.card, .timeline-item');
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});
animatedElements.forEach(el => animationObserver.observe(el));


// --- ACTIVE NAVIGATION STATE ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navIndicator = document.querySelector('.nav-indicator');

const activateNavLink = (link) => {
    if (!link) return;
    navIndicator.style.width = `${link.offsetWidth}px`;
    navIndicator.style.left = `${link.offsetLeft}px`;
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            activateNavLink(activeLink);
        }
    });
}, {
    rootMargin: "-50% 0px -50% 0px"
});
sections.forEach(section => navObserver.observe(section));

// --- SCROLL LISTENER FOR STICKY HEADER & LAST SECTION FIX ---
window.addEventListener('scroll', () => {
    // Sticky header
    header.classList.toggle('scrolled', window.scrollY > 50);

    // Particle visibility
    handleParticleVisibility();

    // Last section fix
    const scrollBuffer = 5; // Pixels from bottom
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - scrollBuffer) {
        const lastSectionId = sections[sections.length - 1].id;
        const lastLink = document.querySelector(`.nav-links a[href="#${lastSectionId}"]`);
        activateNavLink(lastLink);
    }
});

// --- INTERACTIVE GLARE EFFECT ---
const glareElements = document.querySelectorAll('.card, .hero-links md-filled-button, .hero-links md-outlined-button');
glareElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- INITIAL PAGE LOAD ---
updateThemeIcon();
loadParticlesTheme();
handleParticleVisibility();