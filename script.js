const main = document.querySelector('#hero')
const slider = document.querySelector('.slider')
const header = document.querySelector('.header-section')
const logo = document.querySelector('.logo')
const footer = document.querySelector('#footer-section')

const tl = new TimelineMax()

tl.fromTo(main,1, {height: '0%'}, {height:'100%', ease: Power2.easeInOut}
).fromTo(main, 1.2, {width: '100%'}, {height: '100%', ease: Power2.easeInOut}
).fromTo(slider, 1.2, {x:'-100%'}, {x:'0%',  ease: Power2.easeInOut}, '-=1.2'
).fromTo(logo, 0.5, {opacity:0, x:30}, {opacity:1, x:0}, '-=0.5'
).fromTo(header, 0.5, {opacity:0, x:30}, {opacity:1, x:0}, '-=0.5'
).fromTo(footer, 0.5, {opacity:0, x:30}, {opacity:1, x:0}, '-=0.5')