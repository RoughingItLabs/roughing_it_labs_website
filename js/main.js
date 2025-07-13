console.log("✅ load-html.js loaded");
async function includeHTML() {
    console.log("🔄 includeHTML() called");
  
    const placeholders = document.querySelectorAll('[include-html]');
    for (let el of placeholders) {
      const url = el.getAttribute('include-html');
      console.log(`📥 Loading: ${url}`);
  
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const html = await res.text();
        el.innerHTML = html;
        console.log(`✅ Injected: ${url}`);
      } catch (err) {
        console.error(`❌ Error loading ${url}: ${err.message}`);
        el.innerHTML = `<em>Couldn’t load ${url}: ${err.message}</em>`;
      }
  
      el.removeAttribute('include-html');
    }
  }
  
  function setActive(currentPage) {
    console.log(`✨ Setting active nav item: #${currentPage}`);
    const current = document.getElementById(currentPage);
    if (!current) {
      console.warn(`⚠️ Could not find nav item with id '${currentPage}'`);
      return;
    }
  
    current.classList.add("active");
    current.setAttribute("aria-current", "page");
  }

  async function initializePage(activePage) {
    console.log(`🚀 Initializing page with active item: #${activePage}`);
    await includeHTML();
    setActive(activePage);
  }
  

  