// Hero video switching using header links
const heroVideo = document.querySelector('.hero-video');
const movieList = [
    'videos/cv-1.mp4',
    'videos/cv-2.mp4',
    'videos/cv-3.mp4',
    'videos/cv-4.mp4',
    'videos/cv-5.mp4'
];

// Header links event
document.querySelectorAll('header .head-right a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(link.dataset.video);
        if (!isNaN(index) && index < movieList.length) {
            heroVideo.src = movieList[index];
            // Navigate to the page after 200ms for smooth effect
            setTimeout(() => {
                window.location.href = link.href;
            }, 200);
        }
    });
});

// Highlight active page in header nav
document.querySelectorAll('header .head-right a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Intersection observer for autoDisplay animations
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
    }, {
        threshold: 0.3
    });

    document.querySelectorAll(".autoDisplay").forEach(el => observer.observe(el));
});

// Card button alert
document.querySelectorAll('.card button').forEach(button => {
    button.addEventListener('click', (e) => {
        const topic = e.target.closest('.card').dataset.topic;
        alert(`Learn more about ${topic} in Computer Vision.`);
    });
});
