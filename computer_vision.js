document.addEventListener("DOMContentLoaded", () => {  

    // --- Scroll Animations ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("visible", entry.isIntersecting);
            entry.target.classList.toggle("exiting", !entry.isIntersecting);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll(".autoDisplay").forEach(el => observer.observe(el));

    // --- Core Topics: Initial Box ---
    const initialBox = document.querySelector('.initial-box');
    const cardsContainer = document.querySelector('.info-cards-container');
    if (initialBox && cardsContainer) {
        initialBox.onclick = () => {
            initialBox.style.display = 'none';
            cardsContainer.style.display = 'block';
        };
    }

    // --- Cards Expand/Collapse ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.onclick = e => {
            if (e.target.tagName.toLowerCase() === 'video') return;

            // Close other cards and stop their videos
            cards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                    const v = c.querySelector('video');
                    if (v) { v.pause(); v.currentTime = 0; v.muted = true; }
                }
            });

            // Toggle current card
            card.classList.toggle('active');
            const video = card.querySelector('video');
            if (video && !card.classList.contains('active')) {
                video.pause(); video.currentTime = 0; video.muted = true;
            }
        };
    });

    // --- Video Play/Pause ---
    document.querySelectorAll('.card-video').forEach(video => {
        video.onclick = e => {
            e.stopPropagation();
            if (video.paused) {
                video.muted = false;
                video.play();
            } else {
                video.pause();
                video.muted = true;
            }
        };
    });

    // --- Card Button Alert ---
    document.querySelectorAll('.card button').forEach(btn => {
        btn.onclick = e => {
            e.stopPropagation();
            const topic = e.target.closest('.card')?.querySelector('.card-sentence')?.innerText || "this topic";
            alert(`Learn more about ${topic} in Computer Vision.`);
        };
    });

    // --- Hero Video Rotation ---
    const heroVideo = document.querySelector('.hero-video');
    const videos = ['videos/cv-6.mp4']; 
    if (heroVideo) {
        let i = 0;
        setInterval(() => {
            i = (i + 1) % videos.length;
            heroVideo.src = videos[i];
        }, 8000);
    }
});
