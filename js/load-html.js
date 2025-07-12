
async function includeHTML() {
  // find all tags with your attribute
  const placeholders = document.querySelectorAll('[include-html]');
  for (let el of placeholders) {
    const url = el.getAttribute('include-html');
    try {
      let res = await fetch(url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<em>Couldn’t load ${url}: ${err.message}</em>`;
    }
    el.removeAttribute('include-html');
  }
}

  function setActive(currentPage) {
    current = document.getElementById(currentPage);
    console.log(current)
    
    current.setAttribute("class", "active"); // add class active to the element
    current.setAttribute("aria-current", "page"); // add aria-current="page" to the element
    return;
  }

  function scrollToHash() {
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (target) {
      // smooth or instant scroll
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

// Call includeHTML when the page loads
document.addEventListener('DOMContentLoaded', includeHTML);