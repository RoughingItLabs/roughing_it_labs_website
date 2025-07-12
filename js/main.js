// Main page initialization
async function initializePage(activePage) {
    // Wait for HTML includes to be loaded
    await includeHTML();
    
    // Set active navigation item
    setActive(activePage);
}

// Note: initializePage is called directly in the HTML files
// so we don't need the DOMContentLoaded listener here 