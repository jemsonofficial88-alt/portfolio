/**
 * Main Application — Master Initialization (Compact & Interactive)
 *
 * Interactive Features:
 *  - Particle Canvas Network Background
 *  - Typing Text Generator (#typing-text)
 *  - Animated Counter Numbers (data-count)
 *  - Magnetic Button Physics on Hover
 *  - 3D Card Tilt Effects
 *  - Mouse Spotlight Effect on Projects
 *  - Scroll Progress Bar & Back to Top Button
 *  - Parallax Background Orbs
 */

document.addEventListener('DOMContentLoaded', () => {
    // Core Modules
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initAnimations === 'function') initAnimations();
    if (typeof initProjects === 'function') initProjects();

    // Interactive Trigger Systems
    initParticles();
    initScrollProgress();
    initBackToTop();
    initTypingEffect();
    initCounters();
    initMagneticButtons();
    initTiltCards();
    initSmoothParallax();
    initContactForm();
});

/* ==========================================================================
   1. Particle Network Background Canvas
   ========================================================================== */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 100 };
    const PARTICLE_COUNT = 60;
    const MAX_DIST = 120;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.35 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            if (mouse.x !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x += (dx / dist) * force * 1.5;
                    this.y += (dy / dist) * force * 1.5;
                }
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    const opacity = (1 - dist / MAX_DIST) * 0.12;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   2. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (scrollTop / docHeight * 100) + '%';
    }, { passive: true });
}

/* ==========================================================================
   3. Back-to-Top Button
   ========================================================================== */
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 350);
    }, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================================================
   4. Typing Text Effect
   ========================================================================== */
function initTypingEffect() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const phrases = [
        'Web & Python Developer',
        'Aspiring Cloud Engineer',
        'Cybersecurity Enthusiast',
        'Roblox Game Creator',
        'BSIT Student @ CHMSU'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 55;
    const deleteSpeed = 30;
    const pauseBetween = 1800;

    function tick() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            el.textContent = current.substring(0, charIndex--);
        } else {
            el.textContent = current.substring(0, charIndex++);
        }

        let delay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex > current.length) {
            delay = pauseBetween;
            isDeleting = true;
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 250;
        }

        setTimeout(tick, delay);
    }
    tick();
}

/* ==========================================================================
   5. Animated Number Counters
   ========================================================================== */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                const suffix = el.dataset.suffix || '';
                animateCount(el, 0, target, 1800, suffix);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateCount(el, start, end, duration, suffix) {
    const startTime = performance.now();
    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(start + (end - start) * eased);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

/* ==========================================================================
   6. Magnetic Button Effect
   ========================================================================== */
function initMagneticButtons() {
    if (!matchMedia('(hover: hover)').matches) return;

    document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* ==========================================================================
   7. 3D Card Tilt Effects
   ========================================================================== */
function initTiltCards() {
    if (!matchMedia('(hover: hover)').matches) return;

    const cards = document.querySelectorAll('.profile-card, .gamedev-banner');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.4s ease';
            setTimeout(() => { card.style.transition = ''; }, 400);
        });
    });
}

/* ==========================================================================
   8. Smooth Parallax Orbs
   ========================================================================== */
function initSmoothParallax() {
    const orbs = document.querySelectorAll('.glow-orb');
    if (!orbs.length) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        orbs.forEach((orb, i) => {
            const speed = 0.025 + i * 0.01;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, { passive: true });
}

/* ==========================================================================
   9. Real-Time Interactive Contact Form Handler
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const statusDiv = document.getElementById('formStatus');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Anti-spam Honeypot check
        const botcheck = form.querySelector('input[name="botcheck"]');
        if (botcheck && botcheck.checked) {
            return;
        }

        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim()
        };

        if (!formData.name || !formData.email || !formData.message) {
            showStatus('Please fill in all required fields.', 'error');
            return;
        }

        // Set Loading State
        submitBtn.disabled = true;
        const originalBtnHtml = btnText.innerHTML;
        btnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        showStatus('Sending your message...', 'loading');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '952cf0cf-f318-4cab-b289-b5bee4b9e016',
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    from_name: `${formData.name} (Portfolio Inquiry)`
                })
            });

            const result = await response.json();

            if (result.success) {
                showStatus(`<i class="fa-solid fa-circle-check"></i> Thank you, ${formData.name}! Your message has been sent successfully to my email.`, 'success');
                form.reset();
            } else {
                throw new Error(result.message || 'Failed to send');
            }
        } catch (err) {
            console.error('Contact Form Error:', err);
            showStatus(`<i class="fa-solid fa-circle-exclamation"></i> Could not send. You can also email directly to <a href="mailto:jemsonparcon@gmail.com" style="text-decoration:underline;">jemsonparcon@gmail.com</a>.`, 'error');
        } finally {
            submitBtn.disabled = false;
            btnText.innerHTML = originalBtnHtml;
        }
    });

    function showStatus(message, type) {
        if (!statusDiv) return;
        statusDiv.className = `form-status ${type}`;
        statusDiv.innerHTML = message;
        statusDiv.style.display = 'flex';

        if (type === 'success') {
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 7000);
        }
    }
}

