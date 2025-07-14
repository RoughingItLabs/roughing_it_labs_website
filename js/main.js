async function includeHTML() {
  
    const placeholders = document.querySelectorAll('[include-html]');
    for (let el of placeholders) {
      const url = el.getAttribute('include-html');
  
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const html = await res.text();
        el.innerHTML = html;
      } catch (err) {
        el.innerHTML = `<em>Couldn’t load ${url}: ${err.message}</em>`;
      }
  
      el.removeAttribute('include-html');
    }
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

  async function initializePage(activePage) {
    await includeHTML();
    setActive(activePage);
  }
  

  