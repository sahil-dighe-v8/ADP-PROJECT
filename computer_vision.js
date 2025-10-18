// ---------------------- Particle Background ----------------------
const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 1,
    dy: (Math.random() - 0.5) * 1
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#33e0ff55";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ---------------------- Scroll Animation ----------------------
const cards = document.querySelectorAll(".card.fade");
window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 150) {
      card.classList.add("show");
    }
  });
});

// ---------------------- Header Glow ----------------------
const header = document.querySelector("header h1");
let glowColors = ["#33e0ff", "#7b61ff", "#ff6ec7", "#33ffb5"];
let glowIndex = 0;

setInterval(() => {
  glowIndex = (glowIndex + 1) % glowColors.length;
  header.style.textShadow = `0 0 20px ${glowColors[glowIndex]}, 0 0 35px ${glowColors[glowIndex]}`;
  header.style.color = glowColors[glowIndex];
}, 1800);
