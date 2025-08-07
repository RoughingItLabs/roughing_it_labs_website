// DinerDroid Blog Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    // Define the blog posts with their categories
    const blogPosts = [
        {
            title: "DinerDroid is Now Live on Google Play Store!",
            category: "Launch News",
            date: "August 4, 2025",
            excerpt: "After months of development and testing, we're thrilled to announce that DinerDroid is officially available on the Google Play Store. Discover how telling our AI \"I love steak!\" or \"I don't like pasta!\" transforms your dining decisions...",
            link: "posts/google-play-launch.html",
            featured: true,
            image: "../../images/dinerdroid-header.png"
        },
        {
            title: "\"I Love Steak!\" How Natural Language Preferences Work",
            category: "Features",
            date: "July 30, 2025",
            excerpt: "Discover how DinerDroid understands your natural language preferences. Say \"I love ribeye!\" or \"I don't like mushrooms!\" and watch our AI find perfect dishes tailored exactly to your taste...",
            link: "posts/natural-language-preferences.html",
            featured: false
        },
        {
            title: "How DinerDroid's AI Menu Analysis Works",
            category: "Behind the Scenes",
            date: "July 25, 2025",
            excerpt: "Discover the technology behind DinerDroid's intelligent menu analysis and personalized recommendations. Learn how our AI processes menus and understands your preferences...",
            link: "posts/ai-recommendations-explained.html",
            featured: false
        },
        {
            title: "5 Ways to Get Perfect Menu Recommendations with DinerDroid",
            category: "Tips & Tricks",
            date: "July 20, 2025",
            excerpt: "Get the most out of DinerDroid with these expert tips. From setting up your flavor profile to understanding nutritional insights...",
            link: "posts/maximize-dining-experience.html",
            featured: false
        }
    ];

    // Get DOM elements
    const categoryCards = document.querySelectorAll('.category-card');
    const featuredPostSection = document.querySelector('.featured-post');
    const recentPostsSection = document.querySelector('.recent-posts');
    const postsGrid = document.querySelector('.posts-grid');

    // Add click and keyboard event listeners to category cards
    categoryCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        const handleCategoryClick = function() {
            const category = this.querySelector('h3').textContent;
            filterPostsByCategory(category);
            
            // Update active state - remove from all cards including "All Posts"
            document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to the recent posts section to show results
            setTimeout(() => {
                const recentSection = document.querySelector('.recent-posts');
                if (recentSection) {
                    recentSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }, 200); // Small delay to let the filtering animation complete
        };
        
        card.addEventListener('click', handleCategoryClick);
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCategoryClick.call(this);
            }
        });
    });

    // Function to filter posts by category
    function filterPostsByCategory(category) {
        // Add a small delay to show the filtering effect
        const postsGrid = document.querySelector('.posts-grid');
        if (postsGrid) {
            postsGrid.style.opacity = '0.6';
            postsGrid.style.transition = 'opacity 0.2s ease';
        }
        
        setTimeout(() => {
            const filteredPosts = blogPosts.filter(post => {
                if (category === 'All Posts') return true;
                return post.category === category;
            });

        // Update featured post if it matches the category
        const featuredPost = filteredPosts.find(post => post.featured);
        if (featuredPost && category !== 'All Posts') {
            updateFeaturedPost(featuredPost);
            featuredPostSection.style.display = 'block';
        } else if (category === 'All Posts') {
            // Show original featured post
            const originalFeatured = blogPosts.find(post => post.featured);
            updateFeaturedPost(originalFeatured);
            featuredPostSection.style.display = 'block';
        } else {
            // If no featured post in this category, show the first post as featured
            if (filteredPosts.length > 0) {
                const firstPost = filteredPosts[0];
                updateFeaturedPost(firstPost);
                featuredPostSection.style.display = 'block';
            } else {
                featuredPostSection.style.display = 'none';
            }
        }

        // Update recent posts
        const recentPosts = filteredPosts.filter(post => !post.featured);
        updateRecentPosts(recentPosts);

        // Update page title to show filtered category
        const pageTitle = document.querySelector('.hero-content h1');
        if (category === 'All Posts') {
            pageTitle.textContent = 'DinerDroid Blog';
        } else {
            pageTitle.textContent = `DinerDroid Blog - ${category}`;
        }
        
        // Restore opacity
        if (postsGrid) {
            postsGrid.style.opacity = '1';
        }
        }, 150);
    }

    // Function to update featured post
    function updateFeaturedPost(post) {
        const featuredCard = document.querySelector('.post-card.featured');
        if (featuredCard) {
            const title = featuredCard.querySelector('h3 a');
            const excerpt = featuredCard.querySelector('p');
            const date = featuredCard.querySelector('.post-date');
            const category = featuredCard.querySelector('.post-category');
            const readMore = featuredCard.querySelector('.read-more');

            title.textContent = post.title;
            title.href = post.link;
            excerpt.textContent = post.excerpt;
            date.textContent = post.date;
            category.textContent = post.category;
            readMore.href = post.link;
        }
    }

    // Function to update recent posts
    function updateRecentPosts(posts) {
        if (!postsGrid) return;

        // Clear existing posts
        postsGrid.innerHTML = '';

        // Add filtered posts
        posts.forEach(post => {
            const postCard = document.createElement('article');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-date">${post.date}</span>
                        <span class="post-category">${post.category}</span>
                    </div>
                    <h3><a href="${post.link}">${post.title}</a></h3>
                    <p>${post.excerpt}</p>
                    <a href="${post.link}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            postsGrid.appendChild(postCard);
        });

        // Show/hide "No posts found" message
        if (posts.length === 0) {
            postsGrid.innerHTML = `
                <div class="no-posts" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <h3 style="color: var(--dinerdroid-muted);">No posts found in this category</h3>
                    <p style="color: var(--dinerdroid-muted);">Check back soon for new content!</p>
                </div>
            `;
        }
    }

    // Add "All Posts" category card
    const categoryGrid = document.querySelector('.category-grid');
    if (categoryGrid) {
        const allPostsCard = document.createElement('div');
        allPostsCard.className = 'category-card active';
        allPostsCard.setAttribute('role', 'button');
        allPostsCard.setAttribute('tabindex', '0');
        allPostsCard.setAttribute('aria-label', 'Show all posts');
        allPostsCard.innerHTML = `
            <i class="fas fa-newspaper"></i>
            <h3>All Posts</h3>
            <p>View all blog posts</p>
        `;
        allPostsCard.style.cursor = 'pointer';
        
        const handleAllPostsClick = function() {
            filterPostsByCategory('All Posts');
            document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to the recent posts section to show results
            setTimeout(() => {
                const recentSection = document.querySelector('.recent-posts');
                if (recentSection) {
                    recentSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }, 200); // Small delay to let the filtering animation complete
        };
        
        allPostsCard.addEventListener('click', handleAllPostsClick);
        allPostsCard.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAllPostsClick.call(this);
            }
        });
        
        categoryGrid.insertBefore(allPostsCard, categoryGrid.firstChild);
    }
});
