// Ticker animation functionality
function initializeTickerAnimation() {
    const container = document.querySelector(".ticker-container");
    if (!container) return;
    
    const content = container.querySelector(".ticker-content");
    if (!content) return;

    // 1) Clone items until we have at least twice the width
    const origItems = Array.from(content.children);
    while (content.scrollWidth < container.clientWidth * 2) {
        origItems.forEach(el => content.appendChild(el.cloneNode(true)));
    }

    const pxPerSecond = 50;  // adjust speed here
    let lastTime = 0;
    let rafId;

    function step(timestamp) {
        if (lastTime) {
            const delta = timestamp - lastTime;
            const moveX = pxPerSecond * (delta / 1000);
            container.scrollLeft += moveX;
            // wrap when scrolled half the content
            if (container.scrollLeft >= content.scrollWidth / 2) {
                container.scrollLeft -= content.scrollWidth / 2;
            }
        }
        lastTime = timestamp;
        rafId = requestAnimationFrame(step);
    }

    // pause on hover
    container.addEventListener("mouseenter", () => {
        cancelAnimationFrame(rafId);
    });

    // resume on mouse leave
    container.addEventListener("mouseleave", () => {
        lastTime = 0;              // reset timing so we don't get a big jump
        rafId = requestAnimationFrame(step);
    });

    // kick off the loop
    rafId = requestAnimationFrame(step);
}

// Initialize ticker animation when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeTickerAnimation); 