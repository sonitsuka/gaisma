document.addEventListener("DOMContentLoaded", function() {

    
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

   




 
});



 


   
 