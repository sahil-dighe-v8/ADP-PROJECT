// Intersection Observer for animations
document.addEventListener("DOMContentLoaded", () => {

    // --- Scroll Animations ---
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

    // --- Core Topics: Initial Box and Cards ---
    const initialBox = document.querySelector('.initial-box');
    const cardsContainer = document.querySelector('.info-cards-container');
    const cards = document.querySelectorAll('.card');

    // Show cards when initial box is clicked
    if (initialBox && cardsContainer) {
        initialBox.addEventListener('click', () => {
            cardsContainer.style.display = 'block';
            initialBox.style.display = 'none';
        });
    }

    // --- Card Expand/Collapse ---
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Collapse all other cards
            cards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                    const vid = c.querySelector('video');
                    if (vid) {
                        vid.pause();
                        vid.currentTime = 0;
                        vid.muted = true;
                    }
                }
            });

            // Toggle the clicked card
            const isActive = card.classList.contains('active');
            card.classList.toggle('active');

            // Stop video if the card is closing
            const video = card.querySelector('video');
            if (video && isActive) {
                video.pause();
                video.currentTime = 0;
                video.muted = true;
            }
        });
    });

    // --- Video Controls ---
    const videos = document.querySelectorAll('.card-video');
    videos.forEach(video => {
        video.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering card click
            if (video.paused) {
                video.muted = false;
                video.volume = 1.0;
                video.play();
            } else {
                video.pause();
                video.muted = true;
            }
        });
    });


    // --- Hero Video Rotation ---
    const heroVideo = document.querySelector('.hero-video');
    const videoList = ['videos/cv-6.mp4'];
    if (heroVideo) {
        let videoIndex = 0;
        setInterval(() => {
            videoIndex = (videoIndex + 1) % videoList.length;
            heroVideo.src = videoList[videoIndex];
        }, 8000);
    }

});
