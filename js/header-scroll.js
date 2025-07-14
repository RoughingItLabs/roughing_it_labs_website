// Header scroll functionality
function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        // toggle the .scrolled class the moment you scroll down even 1px
        header.classList.toggle('scrolled', window.scrollY > 0);
    });

    // Optional: fire once on load in case you've already scrolled
    header.classList.toggle('scrolled', window.scrollY > 0);
}

// Initialize header scroll when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeHeaderScroll); 