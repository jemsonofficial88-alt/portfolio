/**
 * Navigation — Scrollspy, Mobile Drawer, Navbar Shrink
 */

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar-wrapper');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    /* Mobile drawer toggle */
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
            // Prevent background scroll while menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            });
        });
    }

    /* Navbar background on scroll */
    const onScroll = () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    };

    /* Scroll spy — active link */
    const updateActive = () => {
        const scrollY = window.pageYOffset;
        sections.forEach(sec => {
            const top = sec.offsetTop - 130;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href*='${id}']`);
            if (link) {
                link.classList.toggle('active', scrollY >= top && scrollY < top + height);
            }
        });
    };

    window.addEventListener('scroll', () => {
        onScroll();
        updateActive();
    }, { passive: true });

    onScroll();
}
