
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Noise {
    constructor(octaves = 1, persistence = 0.5) {
      this.simplexNoise = new SimplexNoise();
      this.octaves = octaves;
      this.persistence = persistence;
    }
  
    noise(x, y) {
      let total = 0;
      let frequency = 1;
      let amplitude = 1;
      let maxValue = 0;
  
      for (let i = 0; i < this.octaves; i++) {
        total += this.simplexNoise.noise2D(x * frequency, y * frequency) * amplitude;
        maxValue += amplitude;
        amplitude *= this.persistence;
        frequency *= 2;
      }
  
      return total / maxValue;
    }
}
  

class Particle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  update(noise) {
    const angle = noise.noise(this.x * 0.01, this.y * 0.01) * Math.PI * 2;
    this.vx = Math.cos(angle);
    this.vy = Math.sin(angle);
    this.x += this.vx;
    this.y += this.vy;
    this.size *= 0.98;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let particles = [];
const noise = new Noise(3, 0.5);

canvas.addEventListener("mousemove", function (e) {
  let x = e.clientX;
  let y = e.clientY;

  let color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";

  for (let i = 0; i < 5; i++) {
    let size = Math.random() * 100 + 50;
    let particle = new Particle(x, y, size, color);
    particles.push(particle);
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.update(noise);
    particle.draw(ctx);

    if (particle.size < 1) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();
