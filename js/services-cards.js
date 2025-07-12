// Collapsible Service Cards - Functional JavaScript Implementation
(function() {
    'use strict';
    
    // Initialize collapsible service cards
    const toggleButtons = document.querySelectorAll('.toggle-details');
    
    if (toggleButtons.length === 0) return;
    
    // Add accessibility attributes
    toggleButtons.forEach(button => {
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', button.dataset.service);
    });
    
    // Handle toggle functionality
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const serviceId = this.dataset.service;
            const card = document.querySelector(`[data-service="${serviceId}"]`);
            const content = card.querySelector('.service-content');
            const toggleText = this.querySelector('.toggle-text');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle the content
            if (isExpanded) {
                // Collapse
                content.classList.add('collapsed');
                this.setAttribute('aria-expanded', 'false');
                toggleText.textContent = 'View Details';
                
                // Announce to screen readers
                announceToScreenReader('Service details hidden');
            } else {
                // Expand
                content.classList.remove('collapsed');
                this.setAttribute('aria-expanded', 'true');
                toggleText.textContent = 'Hide Details';
                
                // Announce to screen readers
                announceToScreenReader('Service details expanded');
            }
        });
        
        // Keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Screen reader announcement function
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Add screen reader only class if not already present
    if (!document.querySelector('.sr-only')) {
        const style = document.createElement('style');
        style.textContent = `
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
        `;
        document.head.appendChild(style);
    }
    
})(); 