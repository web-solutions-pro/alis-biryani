/* =====================================================
   ALI'S BIRYANI BBQ & GRILL
   ULTRA PREMIUM JAVASCRIPT
===================================================== */

/* ================= CUSTOM CURSOR ================= */
(function () {
    if (window.innerWidth < 900) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .dish-card, .category-card, .video-card, .gallery-item, .menu-item').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
})();

/* ================= SCROLL PROGRESS ================= */
(function () {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    });
})();

/* ================= NAVBAR SCROLL ================= */
(function () {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
})();

/* ================= MOBILE MENU ================= */
(function () {
    const btn = document.querySelector('.mobile-menu-btn, .menu-toggle');
    const nav = document.querySelector('.navigation, .navlinks');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        nav.classList.toggle('open');
        btn.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            btn.textContent = '☰';
        });
    });
})();

/* ================= SCROLL REVEAL ================= */
(function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ================= BACK TO TOP ================= */
(function () {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) btn.classList.add('visible');
        else btn.classList.remove('visible');
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* ================= CURRENT YEAR ================= */
document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

/* ================= MENU FILTER ================= */
(function () {
    const pills = document.querySelectorAll('.pill');
    const items = document.querySelectorAll('.menu-item');
    if (!pills.length || !items.length) return;

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filter = pill.dataset.filter;

            items.forEach(item => {
                const cat = item.dataset.category;
                if (filter === 'All' || cat === filter) {
                    item.style.display = '';
                    item.style.animation = 'fadeUp 0.5s forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
})();

/* ================= SMS FUNCTION ================= */
function sendSMS(message) {
    window.location.href = 'sms:+16318464080?body=' + encodeURIComponent(message);
}

function contactRestaurant() {
    sendSMS("Hi Ali's Biryani BBQ & Grill! I would like to ask about your menu.");
}

/* ================= LAZY VIDEO PLAY ================= */
(function () {
    const videos = document.querySelectorAll('video[autoplay]');
    videos.forEach(video => {
        video.muted = true;
        video.playsInline = true;

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked, will play on user interaction
                document.body.addEventListener('click', () => video.play(), { once: true });
            });
        }
    });
})();

/* ================= PARALLAX SCROLL ================= */
(function () {
    if (window.innerWidth < 900) return;

    const parallaxEls = document.querySelectorAll('.video-showcase, .about-preview, .special-banner');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                parallaxEls.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const offset = rect.top * 0.15;
                    el.style.backgroundPositionY = `${offset}px`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
})();

/* ================= MAGNETIC BUTTONS ================= */
(function () {
    if (window.innerWidth < 900) return;

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
})();

/* ================= HERO PARALLAX ================= */

/* ================= IMAGE ERROR HANDLER ================= */
document.addEventListener('error', function (e) {
    const img = e.target;
    if (img && img.tagName === 'IMG' && !img.dataset.triedFallback) {
        img.dataset.triedFallback = 'true';
    }
}, true);
