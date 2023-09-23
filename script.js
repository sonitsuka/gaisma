document.addEventListener("DOMContentLoaded", function() {
    // Ensure gsap and PIXI are loaded
    if (typeof gsap === "undefined" || typeof PIXI === "undefined") {
        console.error("GSAP or PIXI libraries are not loaded yet!");
        return;
    }
    
    // Functionality for the press section
    const faq = document.querySelector('#press');
    if (faq) {
        faq.addEventListener('click', event => {
            if (event.target.tagName === 'BUTTON') {
                const expanded = event.target.getAttribute('aria-expanded') === 'true';
                event.target.setAttribute('aria-expanded', !expanded);
                const answer = event.target.nextElementSibling;
                answer.style.maxHeight = expanded ? '0' : `${answer.scrollHeight}px`;
            }
        });
    }

    // Function to set active button color
    function setActiveButtonColor(button) {
        const color = button.dataset.color;
        button.querySelector('.front').style.background = color;
    }
    
    // Function to reset button color
    function resetButtonColor(button) {
        button.querySelector('.front').style.background = '#F2F2F2';
    }
    
    // Event listener for each button
    document.querySelectorAll('.pushable').forEach(button => {
        button.addEventListener('click', function () {
        const target = this.dataset.target;
    
        // Change color of the clicked button
        setActiveButtonColor(this);
    
        // Reset colors of other buttons
        document.querySelectorAll('.pushable').forEach(otherButton => {
            if (otherButton !== this) {
            resetButtonColor(otherButton);
            }
        });
    
        // Use GSAP to smoothly scroll to the target section
        const targetSection = document.getElementById(target);
        if (targetSection) { // Ensure that targetSection is not null
            gsap.to(window, {
            duration: 1,
            scrollTo: targetSection,
            ease: "power2.out"
            });
        }
        });
    });

    
    // Add a scroll event to change the navbar button colors based on the section in view
    window.addEventListener('scroll', function () {
        let activeSection = null;
    
        document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.25 && rect.bottom >= window.innerHeight * 0.75) {
            activeSection = section;
        }
        });
    
        document.querySelectorAll('.pushable').forEach(button => {
        if (button.dataset.target === activeSection?.id) {
            setActiveButtonColor(button);
        } else {
            resetButtonColor(button);
        }
        });
    });




 
});



 


   
 