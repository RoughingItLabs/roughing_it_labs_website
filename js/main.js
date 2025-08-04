async function includeHTML() {
  
    const placeholders = document.querySelectorAll('[include-html]');
    console.log('Found', placeholders.length, 'HTML placeholders to load');
    
    for (let el of placeholders) {
      const url = el.getAttribute('include-html');
      console.log('Loading HTML from:', url);
  
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const html = await res.text();
        el.innerHTML = html;
        console.log('Successfully loaded HTML from:', url);
      } catch (err) {
        el.innerHTML = `<em>Couldn't load ${url}: ${err.message}</em>`;
        console.error('Failed to load HTML from:', url, err);
      }
  
      el.removeAttribute('include-html');
    }
    
    console.log('All HTML includes completed');
  }
  
  function setActive(currentPage) {
    const current = document.getElementById(currentPage);
    if (!current) {
      console.warn(`⚠️ Could not find nav item with id '${currentPage}'`);
      return;
    }
  
    current.classList.add("active");
    current.setAttribute("aria-current", "page");
  }

  // Function to initialize hamburger menu after HTML is loaded
  function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('#nav-links');
    const navLinksItems = document.querySelectorAll('#nav-links a');
    
    console.log('Looking for hamburger menu elements...');
    console.log('Hamburger element:', hamburger);
    console.log('Nav links element:', navLinks);
    console.log('Nav links items:', navLinksItems.length);
    
    if (!hamburger || !navLinks) {
      console.log('Hamburger menu elements not found');
      return false;
    }
    
    console.log('Initializing hamburger menu from main.js...');
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', !isExpanded);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
      
      console.log('Hamburger menu toggled:', !isExpanded);
    });
    
    // Close menu when a link is clicked
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        console.log('Menu closed via link click');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    
    console.log('Hamburger menu initialization complete');
    return true;
  }

  async function initializePage(activePage) {
    console.log('Starting page initialization for:', activePage);
    await includeHTML();
    console.log('HTML includes completed, setting active page');
    setActive(activePage);
    
    // Initialize hamburger menu after HTML is loaded
    console.log('Scheduling hamburger menu initialization...');
    setTimeout(() => {
      console.log('Attempting to initialize hamburger menu...');
      initializeHamburgerMenu();
      initializeAnnouncementBanner();
    }, 100);
  }

  // Announcement Banner functionality
  function initializeAnnouncementBanner() {
    const banner = document.querySelector('.announcement-banner');
    const closeBtn = document.querySelector('.announcement-close');
    const dinerdroidLink = document.querySelector('[data-dinerdroid-link]');
    
    // Set correct DinerDroid link path based on current page location
    if (dinerdroidLink) {
      const currentPath = window.location.pathname;
      let dinerdroidPath;
      
      if (currentPath === '/' || currentPath === '/index.html') {
        dinerdroidPath = 'dinerdroid/index.html';
      } else if (currentPath.includes('/pages/')) {
        dinerdroidPath = '../dinerdroid/index.html';
      } else if (currentPath.includes('/dinerdroid/')) {
        dinerdroidPath = 'index.html';
      } else {
        dinerdroidPath = 'dinerdroid/index.html'; // fallback
      }
      
      dinerdroidLink.href = dinerdroidPath;
    }
    
    if (closeBtn && banner) {
      closeBtn.addEventListener('click', function() {
        banner.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => {
          banner.style.display = 'none';
          // Store in sessionStorage so it stays closed for the session
          sessionStorage.setItem('announcementClosed', 'true');
        }, 300);
      });
    }
    
    // Check if announcement was already closed this session
    if (sessionStorage.getItem('announcementClosed') === 'true' && banner) {
      banner.style.display = 'none';
    }

    // Add slideUp animation if not already present
    if (!document.querySelector('#slideUpAnimation')) {
      const style = document.createElement('style');
      style.id = 'slideUpAnimation';
      style.textContent = `
        @keyframes slideUp {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  

  