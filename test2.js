/* 
Add texture metaric, liquid
*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.size = size;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.size *= 0.95;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let particles = [];

canvas.addEventListener("mousemove", function (e) {
  let x = e.clientX;
  let y = e.clientY;

  let color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";

  for (let i = 0; i < 5; i++) {
    let size = Math.random() * 200 + 100;
    let particle = new Particle(x, y, size, color);
    particles.push(particle);
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.update();
    particle.draw(ctx);

    if (particle.size < 1) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();
