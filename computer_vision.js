// Intersection Observer for animations
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                el.classList.add("visible");
                el.classList.remove("exiting");
            } else {
                el.classList.remove("visible");
                el.classList.add("exiting");
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll(".autoDisplay").forEach(el => observer.observe(el));

    // Core Topics: initial box & cards
    const initialBox = document.querySelector('.initial-box');
    const cardsContainer = document.querySelector('.info-cards-container');
    const cards = document.querySelectorAll('.card');

    // Show cards on initial box click
    initialBox.addEventListener('click', () => {
        cardsContainer.style.display = 'block';
        initialBox.style.display = 'none';
    });

    // Expand card & play video
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Collapse other cards
            cards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                    const vid = c.querySelector('video');
                    if (vid) vid.pause();
                }
            });

            // Toggle clicked card
            card.classList.toggle('active');

            // Play/Pause video inside the card
            const video = card.querySelector('video');
            if (video) {
                if (card.classList.contains('active')) video.play();
                else video.pause();
            }
        });
    });

    // Card button alerts (if you add buttons inside cards)
    document.querySelectorAll('.card button').forEach(button => {
        button.addEventListener('click', (e) => {
            const topic = e.target.closest('.card').querySelector('.card-sentence').innerText;
            alert(`Learn more about ${topic} in Computer Vision.`);
        });
    });

    // Hero video rotation every 8 seconds
    const heroVideo = document.querySelector('.hero-video');
    const videoList = [
        'videos/cv-1.mp4',
        'videos/cv-2.mp4',
        'videos/cv-3.mp4',
        'videos/cv-4.mp4',
        'videos/cv-5.mp4'
    ];
    let videoIndex = 0;
    setInterval(() => {
        videoIndex++;
        if (videoIndex >= videoList.length) videoIndex = 0;
        heroVideo.src = videoList[videoIndex];
    }, 8000);
});
