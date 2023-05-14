 // mouse move 
 var follow = document.querySelector('#follow');
 document.onmousemove = function(e){
     var x = e.pageX;
     var y = e.pageY;
     follow.style.left = x + 'px';
     follow.style.top = y + 'px';
 };
 
var main = document.querySelector('main');
var arrow = document.querySelector('.scroll-arrow');

window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollX;
    var maxScrollPosition = main.scrollWidth - window.innerWidth;

    if (scrollPosition >= maxScrollPosition) {
        arrow.classList.add('left');
    } else {
        arrow.classList.remove('left');

    }
});


    
// Initialize Swiper
var swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    keyboard: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Add event listeners to the links
document.querySelectorAll('nav a').forEach((link, index) => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        swiper.slideTo(index);
    });
});

// Change background color based on slide index006699
swiper.on('slideChange', function () {
    const sections = [
        '#FFFFFF', // Home
        '#F34100', // Music
        '#FF7F50', // Performance
        '#FFF8B9', // Photography
        '#B4EDC0', // Collages
        '#AFCCDE', // About
        '#221A85', // Event, news press
        '#845EC2'  // Space for Users
    ];
    document.body.style.backgroundColor = sections[this.activeIndex];
});
  

// home generation art 
let nStep = 0.005;
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    
    canvas.parent('canvasContainer');
    colorMode(HSB, 360, 100, 100, 100);
    noLoop();
  }

  
  function draw() {
    let cellW = width / (285 * 2); // 半分にする
    let cellH = height / (180 * 2); // 半分にする
    let baseHue = random(360);
  
    background(0, 0, 0, 100);
    noStroke();
  
    for (let x = 0; x < width; x += cellW) {
      let nX = x * nStep;
      for (let y = 0; y < height; y += cellH) {
        let nY = y * nStep;
  
        let nP = noise(nX, nY) * 5;
        let nValH = noise(10 + nP, nX, nY);
        let nValS = noise(30 + nP, nX, nY);
        let nValB = noise(40 + nP, nX, nY);
  
        let nHue = (baseHue + nValH * 240) % 360;
        let nSat = 30 + 60 * nValS;
        let nBri = 20 + 80 * nValB;
  
        fill(nHue, nSat, nBri, 100);
        rect(x, y, cellW, cellH);
      }
    }
  
  }
  
  function mouseClicked() {
    let dt = new Date();
    noiseSeed(dt.getTime());
    redraw();
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  




/** simple slider 
 * document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    });
});

document.querySelectorAll('nav a').forEach((link, index) => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById('section' + (index + 1));

        //const target = document.getElementById('header' + index);
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});


window.addEventListener('scroll', function() {
    const sections = [
        document.getElementById('music'),
        document.getElementById('performance'),
        document.getElementById('photography'),
        document.getElementById('collages'),
        document.getElementById('about'),
        document.getElementById('users')
    ];

    const scrollPosition = window.scrollX;

    sections.forEach((section, i) => {
        const start = i * window.innerWidth;
        const end = start + window.innerWidth;
        if (scrollPosition >= start && scrollPosition < end) {
            switch (i) {
                case 0:
                    section.style.backgroundColor = '#F34100';
                    break;
                case 1:
                    section.style.backgroundColor = '#FF7F50';
                    break;
                case 2:
                    section.style.backgroundColor = '#FFF8B9';
                    break;
                case 3:
                    section.style.backgroundColor = '#B4EDC0';
                    break;
                case 4:
                    section.style.backgroundColor = '#AFCCDE';
                    break;
                case 5:
                    section.style.backgroundColor = '#4B0082';
                    break;
            }
        }
    });
});

function changeColors(sections, color) {
    sections.forEach(section => {
        section.style.backgroundColor = color;
    });
}
 */