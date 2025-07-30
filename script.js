// 4K Responsive Canvas Starfield Background
const canvas = document.getElementById('stars-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  // Use devicePixelRatio for sharpness on 4K
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const STAR_COLORS = [
  '#fff', '#ffe066', '#ffbe0b', '#ff758c', '#a1ffce',
  '#8fd3f4', '#f9d423', '#ff7eb3', '#b388ff', '#c3ffd2'
];

function randomStar() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.7 + 0.8,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    alpha: Math.random() * 0.6 + 0.4,
    twinkle: Math.random() * 2 + 1,
    speed: (Math.random() - 0.5) * 0.08
  };
}

let STAR_COUNT = Math.floor(window.innerWidth * window.innerHeight / 2200); // About 7k on 4K
let stars = Array.from({length: STAR_COUNT}, randomStar);

function animateStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let star of stars) {
    // Twinkling
    const twinkle = Math.sin(Date.now() * 0.002 * star.twinkle + star.x) * 0.18 + star.alpha;
    ctx.globalAlpha = Math.max(0, Math.min(1, twinkle));
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2, false);
    ctx.fillStyle = star.color;
    ctx.shadowColor = star.color;
    ctx.shadowBlur = 8 + star.r * 3;
    ctx.fill();

    // Star movement (slow drifting)
    star.x += star.speed;
    if (star.x < 0) star.x = window.innerWidth;
    if (star.x > window.innerWidth) star.x = 0;
  }
  ctx.globalAlpha = 1.0;
  requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener('resize', () => {
  STAR_COUNT = Math.floor(window.innerWidth * window.innerHeight / 2200);
  stars = Array.from({length: STAR_COUNT}, randomStar);
});