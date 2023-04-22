/* 

*/
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
      this.points = this.generatePoints();
    }
  
    generatePoints() {
      const points = [];
      const pointCount = Math.floor(Math.random() * 5) + 5;
      for (let i = 0; i < pointCount; i++) {
        const angle = (Math.PI * 2) / pointCount * i;
        const radius = this.size * (1.50 + Math.random() * 0.50);
        points.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
      }
      return points;
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
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.moveTo(this.x + this.points[0].x, this.y + this.points[0].y);
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.x + this.points[i].x, this.y + this.points[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
  

let particles = [];
const noise = new Noise(3, 0.5);

canvas.addEventListener("mousemove", function (e) {
    let x = e.clientX;
    let y = e.clientY;
  
    let color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  
    for (let i = 0; i < 10; i++) {
      let size = Math.random() * 300 + 100; // Adjust the size range here
      let particle = new Particle(x, y, size, color);
      particles.push(particle);
    }
});
  

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
