# DinerDroid Blog

This directory contains the DinerDroid blog with interactive category filtering functionality.

## Features

### Category Filtering
- **Interactive Category Cards**: Click on any category card to filter blog posts
- **All Posts Option**: Automatically added "All Posts" category to show all content
- **Visual Feedback**: Active category is highlighted with orange background
- **Accessibility**: Full keyboard navigation support (Tab, Enter, Space)
- **Smooth Animations**: Hover effects and loading states for better UX

### Categories Available
- **Launch News**: App updates and announcements
- **Features**: Deep dives into app capabilities  
- **Tips & Tricks**: Maximize your dining experience
- **Behind the Scenes**: Development insights and stories

## Files

- `index.html` - Main blog page with category filtering
- `blog-categories.js` - JavaScript for category filtering functionality
- `blog-styles.css` - Styling for blog and category cards
- `posts/` - Individual blog post files

## How It Works

1. Category cards are made clickable with JavaScript
2. Clicking a category filters the blog posts array
3. Featured post updates if it matches the selected category
4. Recent posts section updates with filtered results
5. Page title updates to show the selected category
6. Visual feedback shows which category is active

## Accessibility Features

- Keyboard navigation (Tab, Enter, Space)
- ARIA labels for screen readers
- Focus states for visual feedback
- Semantic HTML with proper roles

## Browser Support

Works in all modern browsers with JavaScript enabled.
