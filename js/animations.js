/**
 * Scroll-reveal + Stagger + Scale/Slide variants
 */

function initAnimations() {
    const elements = document.querySelectorAll(
        '.animate-on-scroll, .animate-scale, .animate-slide-left, .animate-slide-right'
    );
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    elements.forEach(el => observer.observe(el));

    // Auto-add stagger classes to children of grid containers
    const grids = document.querySelectorAll(
        '.about-grid, .skills-grid, .services-grid, .learning-grid, .roadmap-timeline, .stats-row'
    );
    grids.forEach(grid => {
        const children = grid.children;
        for (let i = 0; i < children.length; i++) {
            if (!children[i].classList.contains('animate-on-scroll')) {
                children[i].classList.add('animate-on-scroll');
            }
            children[i].classList.add('stagger-' + Math.min(i + 1, 6));
            observer.observe(children[i]);
        }
    });

    // Animate skill progress bars on scroll
    const progressBars = document.querySelectorAll('.skill-progress-fill');
    if (progressBars.length) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => progressObserver.observe(bar));
    }
}
