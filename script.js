$(document).ready(function () {

    // Sticky navbar
    $(window).scroll(function () {
        if (this.scrollY > 20) $('.navbar').addClass("sticky");
        else $('.navbar').removeClass("sticky");

        if (this.scrollY > 500) $('.scroll-up-btn').addClass("show");
        else $('.scroll-up-btn').removeClass("show");
    });

    // Scroll up
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        $('html').css("scrollBehavior", "smooth");
        // Close mobile menu after click — only target the hamburger icon, not every menu item icon
        $('.navbar .menu').removeClass("active");
        $('div.menu-btn > i').removeClass("active");
    });

    // Toggle mobile menu — restrict to the hamburger <div>, not the <a class="menu-btn"> links
    $('div.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $(this).find('i').toggleClass("active");
    });

    // Typed animation
    var typed = new Typed(".typing", {
        strings: [
            "Full Stack Java Developer 💻",
            "Application Developer @ Maruti Suzuki 🚗",
            "Spring Boot + Quarkus Expert ☕",
            "Cloud-Native Engineer ☁️",
            "Oracle AI Vector Search Pro 🤖",
            "Competitive Programmer 🏆"
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        loop: true
    });

    new Typed(".typing-2", {
        strings: [
            "Software Engineer 👨‍💻",
            "Backend Architect 🛠️",
            "DevOps Enthusiast ⚙️",
            "Problem Solver 🧠"
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        loop: true
    });

    // Owl carousel
    $('.carousel').owlCarousel({
        margin: 24,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        smartSpeed: 800,
        responsive: {
            0: { items: 1, nav: false },
            600: { items: 2, nav: false },
            1000: { items: 3, nav: false }
        }
    });

    // Tilt effect on hover (for cards)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.15
        });
    }

    // Animated stat counters
    function animateCounter($el, target) {
        $({ count: 0 }).animate({ count: target }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $el.text(Math.ceil(this.count));
            },
            complete: function () {
                $el.text(target);
            }
        });
    }

    let statsAnimated = false;
    $(window).on('scroll', function () {
        const statsTop = $('.stats-grid').offset();
        if (!statsTop || statsAnimated) return;
        if (this.scrollY + window.innerHeight > statsTop.top + 100) {
            statsAnimated = true;
            $('.stat-num').each(function () {
                const $this = $(this);
                const target = parseInt($this.attr('data-target'), 10);
                animateCounter($this, target);
            });
        }
    });

    // Theme toggle — always start in dark mode by default (no persistence across reloads)
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle && themeToggle.querySelector('i');

    // Force dark on every page load, regardless of any old stored preference
    document.body.classList.remove('light-theme');
    localStorage.removeItem('theme');
    if (themeIcon) { themeIcon.classList.add('fa-moon'); themeIcon.classList.remove('fa-sun'); }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            if (themeIcon) {
                themeIcon.classList.toggle('fa-moon', !isLight);
                themeIcon.classList.toggle('fa-sun', isLight);
            }
        });
    }

    // Update footer year dynamically
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Particles.js background
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 70, density: { enable: true, value_area: 800 } },
                color: { value: ["#00d4ff", "#7c3aed", "#ffffff"] },
                shape: { type: "circle" },
                opacity: { value: 0.4, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 130,
                    color: "#00d4ff",
                    opacity: 0.25,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.4,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 160, line_linked: { opacity: 0.6 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
});

// Lightbox — click any achievement / certificate / featured image to open full-size
(function initLightbox() {
    const box = document.getElementById('lightbox');
    if (!box) return;
    const imgEl = box.querySelector('.lightbox-img');
    const captionEl = box.querySelector('.lightbox-caption');
    const closeBtn = box.querySelector('.lightbox-close');

    function open(src, caption) {
        imgEl.src = src;
        captionEl.textContent = caption || '';
        captionEl.style.display = caption ? 'block' : 'none';
        box.classList.add('active');
        box.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
    }

    function close() {
        box.classList.remove('active');
        box.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        // Clear src after the fade so the old image doesn't flash on next open
        setTimeout(() => { imgEl.src = ''; }, 300);
    }

    // Delegate: any img inside an achievement-card or teamsachive carousel card opens the lightbox
    document.addEventListener('click', function (e) {
        const img = e.target.closest('.achievement-card img, .teamsachive .carousel .card img');
        if (img) {
            e.preventDefault();
            // Caption = nearest h3/text within the card
            const card = img.closest('.achievement-card, .card');
            const title = card ? (card.querySelector('h3, .text')?.textContent.trim() || '') : '';
            open(img.src, title);
        }
    });

    closeBtn.addEventListener('click', close);
    box.addEventListener('click', function (e) {
        if (e.target === box) close();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && box.classList.contains('active')) close();
    });
})();

// Live GitHub stats — fetch real numbers from public API
async function loadGitHubStats() {
    const USERNAME = 'strivedi4u';
    try {
        const userRes = await fetch(`https://api.github.com/users/${USERNAME}`);
        if (!userRes.ok) throw new Error('user fetch failed');
        const user = await userRes.json();

        // Aggregate star count across repos (paginated, up to 100 repos)
        const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner`);
        const repos = reposRes.ok ? await reposRes.json() : [];
        const stars = Array.isArray(repos)
            ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
            : 0;

        const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

        setVal('gh-stars', stars);
        setVal('gh-repos', user.public_repos ?? 0);
        setVal('gh-followers', user.followers ?? 0);
        setVal('gh-following', user.following ?? 0);
        setVal('gh-gists', user.public_gists ?? 0);

        if (user.created_at) {
            const d = new Date(user.created_at);
            setVal('gh-since', d.toLocaleString('en-US', { month: 'short', year: 'numeric' }));
        }
    } catch (err) {
        // Sensible fallback values if rate-limited or offline
        const fallback = { 'gh-stars': '50+', 'gh-repos': '40+', 'gh-followers': '60+', 'gh-following': '50+', 'gh-gists': '5+', 'gh-since': 'Apr 2021' };
        Object.entries(fallback).forEach(([id, v]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = v;
        });
    }
}

// Run after DOM ready
document.addEventListener('DOMContentLoaded', loadGitHubStats);

// Star particle on click of Home menu
function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDuration = (Math.random() * 2 + 3) + "s";
    star.innerText = ["🌟", "✨", "💫", "⭐"][Math.floor(Math.random() * 4)];
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 5000);
}

window.addEventListener('load', function () {
    const homeLink = document.getElementById("star");
    if (homeLink) {
        homeLink.addEventListener("click", function () {
            for (let i = 0; i < 12; i++) {
                setTimeout(createStar, i * 80);
            }
        });
    }
});
