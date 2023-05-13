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

    if (scrollPosition < window.innerWidth) {
        changeColors(sections, '#F34100');
    } else if (scrollPosition < window.innerWidth * 2) {
        changeColors(sections, '#FF7F50');
    } else if (scrollPosition < window.innerWidth * 3) {
        changeColors(sections, '#FFF8B9');
    } else if (scrollPosition < window.innerWidth * 4) {
        changeColors(sections, '#B4EDC0');
    } else if (scrollPosition < window.innerWidth * 5) {
        changeColors(sections, '#AFCCDE');
    } else {
        changeColors(sections, '#4B0082');
    }
});

function changeColors(sections, color) {
    sections.forEach(section => {
        section.style.backgroundColor = color;
    });
}
