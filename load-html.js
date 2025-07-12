// function includeHTML() {
//     var z, i, elmnt, file, xhttp;
//     /* Loop through a collection of all HTML elements: */
//     z = document.getElementsByTagName("*");
//     for (i = 0; i < z.length; i++) {
//       elmnt = z[i];
//       /*search for elements with a certain atrribute:*/
//       file = elmnt.getAttribute("include-html");
//       if (file) {
//         /* Make an HTTP request using the attribute value as the file name: */
//         xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//           if (this.readyState == 4) {
//             if (this.status == 200) {elmnt.innerHTML = this.responseText;}
//             if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
//             /* Remove the attribute, and call this function once more: */
//             elmnt.removeAttribute("include-html");
//             includeHTML();
//           }
//         }

//         xhttp.open("GET", file, true);
//         xhttp.send();
//         return;
//       }
//     }
//   }
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