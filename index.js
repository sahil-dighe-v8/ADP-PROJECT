// Card tilt effect
const cards = document.querySelectorAll('.feature-card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width/2;
        const cy = rect.height/2;
        const dx = (x-cx)/cx;
        const dy = (y-cy)/cy;
        card.style.transform = `rotateY(${dx*10}deg) rotateX(${-dy*10}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
});

// Smooth scroll for links
document.querySelectorAll('header a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    });
});
