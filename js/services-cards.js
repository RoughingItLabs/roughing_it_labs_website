// services-cards.js
document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.toggle-details');
    if (!toggles.length) return;
  
    toggles.forEach(btn => {
      const service = btn.dataset.service;            // e.g. "prototyping"
      const card    = document.getElementById(service); // <div id="prototyping">
      if (!card) return console.warn(`No card with id="${service}"`);
      const content = card.querySelector('.service-content');
      if (!content) return console.warn(`No .service-content inside #${service}`);
  
      // give the panel a matching ID so aria-controls works
      const contentId = `${service}-content`;
      content.id = contentId;
      btn.setAttribute('aria-controls', contentId);
      btn.setAttribute('aria-expanded', 'false');
  
      btn.addEventListener('click', e => {
        e.preventDefault();
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        content.classList.toggle('collapsed', isOpen);      // add if was open, remove if was closed
        btn.setAttribute('aria-expanded', String(!isOpen));
        btn.querySelector('.toggle-text').textContent = isOpen 
          ? 'View Details' 
          : 'Hide Details';
      });
    });
  
    // deep-link support: if URL has #serviceId, expand that one on load
    const hash = window.location.hash.slice(1);
    if (hash) {
      const card = document.getElementById(hash);
      if (card) {
        const content = card.querySelector('.service-content');
        const btn     = card.querySelector('.toggle-details');
        if (content && btn) {
          content.classList.remove('collapsed');
          btn.setAttribute('aria-expanded', 'true');
          btn.querySelector('.toggle-text').textContent = 'Hide Details';
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  });
  