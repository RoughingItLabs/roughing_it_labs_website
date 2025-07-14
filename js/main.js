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
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
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
    }, 100);
  }
  

  