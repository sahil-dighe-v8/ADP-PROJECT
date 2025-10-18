// ========== Hero Video Carousel ==========
const nextButton = document.querySelector('.next-btn');
const heroVideo = document.querySelector('.hero-video');
const movieList = [
  'videos/hero-1.mp4',
  'videos/hero-2.mp4',
  'videos/hero-3.mp4',
  'videos/hero-4.mp4'
];
let index = 0;

// Next Video Button
if (nextButton && heroVideo) {
  nextButton.addEventListener('click', () => {
    index = (index + 1) % movieList.length;
    heroVideo.src = movieList[index];
  });

  // Auto-play every 15 seconds
  setInterval(() => {
    index = (index + 1) % movieList.length;
    heroVideo.src = movieList[index];
  }, 15000);
}

// ========== Typing Animation ==========
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
  const typingText = typingElement.dataset.text;
  let charIndex = 0;

  function typeWriter() {
    if (charIndex <= typingText.length) {
      typingElement.textContent = typingText.substring(0, charIndex);
      charIndex++;
      setTimeout(typeWriter, 120);
    } else {
      setTimeout(() => {
        charIndex = 0;
        typingElement.textContent = '';
        typeWriter();
      }, 3000);
    }
  }
  typeWriter();
}

// ========== Particle Background ==========
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particlesArray = [];
  const colors = ['#33ffcc', '#00ffff', '#33ccff'];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < 120; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // Handle resize
  window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, 200);
  });
}

// ========== Scroll-triggered Animations ==========
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.classList.remove('exiting');
    } else {
      entry.target.classList.remove('visible');
      entry.target.classList.add('exiting');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.autoDisplay .media-block, .autoDisplay .text-block')
  .forEach(el => observer.observe(el));

// ========== Hover Effects ==========
document.querySelectorAll('.media-block img, .media-block video').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'scale(1.08)';
    el.style.boxShadow = '0 0 50px #33ffcc';
    el.style.transition = '0.3s ease';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'scale(1)';
    el.style.boxShadow = '0 0 25px rgba(51,224,255,0.5)';
  });
});

// ========== Click-to-expand Video ==========
document.querySelectorAll('.media-block video').forEach(video => {
  video.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '2000';

    const clonedVideo = video.cloneNode();
    clonedVideo.style.width = '80%';
    clonedVideo.style.height = 'auto';
    clonedVideo.controls = true;
    clonedVideo.autoplay = true;

    overlay.appendChild(clonedVideo);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });
  });
});

// ========== Smooth Scroll ==========
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ========== Neon Pulsing Effect ==========
setInterval(() => {
  document.querySelectorAll('h2, h1, .next-btn').forEach(el => {
    el.style.textShadow = `0 0 ${Math.random() * 20 + 10}px #33ffcc, 0 0 ${Math.random() * 40 + 20}px #33ffcc`;
  });
}, 1000);
