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
    if (initialBox && cardsContainer) {
        initialBox.addEventListener('click', () => {
            cardsContainer.style.display = 'block';
            initialBox.style.display = 'none';
        });
    }

    // Expand/collapse cards (video click handled separately)
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Ignore clicks directly on video
            if (e.target.tagName.toLowerCase() === 'video') return;

            // Collapse other cards
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

            // Toggle current card
            const isActive = card.classList.contains('active');
            card.classList.toggle('active');

            // Stop video if card is being closed
            const video = card.querySelector('video');
            if (video && isActive) {
                video.pause();
                video.currentTime = 0;
                video.muted = true;
            }
        });
    });

    // Play video with sound only when clicked directly
    const videos = document.querySelectorAll('.card-video');
    videos.forEach(video => {
        video.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent triggering card click
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

    // Card button alerts (optional)
    document.querySelectorAll('.card button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = e.target.closest('.card');
            const topicElement = card ? card.querySelector('.card-sentence') : null;
            const topic = topicElement ? topicElement.innerText : "this topic";
            alert(`Learn more about ${topic} in Computer Vision.`);
        });
    });

    // Hero video rotation every 8 seconds
    const heroVideo = document.querySelector('.hero-video');
    const videoList = [
        'videos/cv-6.mp4',
        // Add more videos if needed
    ];

    if (heroVideo) {
        let videoIndex = 0;
        setInterval(() => {
            videoIndex = (videoIndex + 1) % videoList.length;
            heroVideo.src = videoList[videoIndex];
        }, 8000);
    }
});
