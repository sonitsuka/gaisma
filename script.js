
    
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
        '#221A85'  // Space for Users
    ];
    document.body.style.backgroundColor = sections[this.activeIndex];
});




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