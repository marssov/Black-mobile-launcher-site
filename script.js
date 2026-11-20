function openTelegramLink(event, username) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        event.preventDefault();
        window.location.href = `tg://resolve?domain=${username}`;
        setTimeout(() => {
            window.open(`https://t.me{username}`, '_blank', 'noopener,noreferrer');
        }, 600);
    }
}

const burgerBtn = document.getElementById('burger-btn');
const navLinks = document.getElementById('nav-links');

if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (lightbox && img) {
        img.src = src;
        lightbox.classList.add('active');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

const onlineEl = document.getElementById('online-count');
if (onlineEl) {
    let baseOnline = 148;
    setInterval(() => {
        const diff = Math.floor(Math.random() * 5) - 2;
        baseOnline = Math.max(120, baseOnline + diff);
        onlineEl.textContent = baseOnline;
    }, 5000);
}

const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let sparks = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const sparkColors = [
        'rgba(255, 42, 95, 0.85)',
        'rgba(255, 115, 36, 0.8)',
        'rgba(168, 85, 247, 0.75)'
    ];

    function createSpark(randomY = false) {
        return {
            x: Math.random() * canvas.width,
            y: randomY ? Math.random() * canvas.height : -10,
            r: Math.random() * 2.2 + 0.8,
            speedY: Math.random() * 1.4 + 0.6,
            driftX: (Math.random() - 0.5) * 0.8,
            sway: Math.random() * Math.PI * 2,
            color: sparkColors[Math.floor(Math.random() * sparkColors.length)]
        };
    }

    for (let i = 0; i < 55; i++) {
        sparks.push(createSpark(true));
    }

    function animateSparks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sparks.forEach((s, index) => {
            s.sway += 0.03;
            s.y += s.speedY;
            s.x += s.driftX + Math.sin(s.sway) * 0.4;

            if (s.y > canvas.height + 10) {
                sparks[index] = createSpark(false);
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = s.color;
            ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(animateSparks);
    }
    animateSparks();
}
