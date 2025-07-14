# RoughingIt Labs Website 

A Nevada 1860s frontier-themed website for RoughingIt Labs, an AI development and consulting company inspired by Mark Twain's "Roughing It."

## Theme

The website captures the spirit of the Nevada Territory in the 1860s, combining the pioneering determination of Old West prospectors with modern AI expertise. The design features:

- Western-inspired color palette (browns, golds, creams)
- Classic serif fonts (Playfair Display & Crimson Text)
- Mining and frontier metaphors throughout
- Mark Twain references and quotes
- Professional yet rugged aesthetic

##  File Structure

```
├── index.html          # Homepage
├── about.html          # Company story and values
├── services.html       # AI services offered
├── contact.html        # Contact form and information
├── styles.css          # Complete styling
└── README.md           # This file
```

## Deployment Options

### Option 1: Netlify (Recommended)
1. Sign up for [Netlify](https://netlify.com) (free)
2. Drag and drop all website files to Netlify
3. Connect your Squarespace domain:
   - In Squarespace domain settings, update DNS records
   - Point to Netlify's servers
4. Contact form will work automatically with Netlify Forms

### Option 2: Vercel
1. Sign up for [Vercel](https://vercel.com) (free)
2. Upload files or connect to GitHub
3. Update domain DNS to point to Vercel

### Option 3: GitHub Pages
1. Create GitHub repository
2. Upload files to repository
3. Enable GitHub Pages in repository settings
4. Update domain DNS

## Contact Form Setup

The contact form is configured for Netlify Forms (automatic with Netlify hosting). For other hosting:

1. **Formspree**: Replace form action with Formspree endpoint
2. **EmailJS**: Add EmailJS integration
3. **Custom Backend**: Create API endpoint for form submissions

##  Domain Configuration

Your domain (`roughingitlabs.com`) is currently with Squarespace:

1. **Keep domain with Squarespace** 
2. **Update DNS settings** to point to your chosen hosting
3. **Typical DNS changes**:
   - A Record: `@` → hosting provider IP
   - CNAME: `www` → hosting provider domain

## Customization

### Colors (CSS Variables)
- Primary: `#8B4513` (Saddle Brown)
- Secondary: `#D2691E` (Chocolate)
- Accent: `#DAA520` (Goldenrod)
- Background: `#FDF5E6` (Old Lace)

### Fonts
- Headings: Playfair Display (serif)
- Body: Crimson Text (serif)

### Content Updates
- Update contact information in all HTML files
- Modify service offerings in `services.html`
- Add your actual location details in `contact.html`

## Features

- **Fully Responsive** - Works on all devices
- **Contact Form** - Ready for submissions
- **SEO Optimized** - Proper meta tags and structure
- **Fast Loading** - Minimal dependencies
- **Accessible** - Semantic HTML and ARIA labels

## 🏗️ Next Steps

1. **Deploy** to your preferred hosting service
2. **Update DNS** to point your domain to new hosting
3. **Test contact form** functionality
4. **Add Google Analytics** (optional)
5. **Set up SSL certificate** (usually automatic with hosting)

## 🚀 Future Enhancements

### Badge System
A comprehensive badge system has been implemented with 6 badge types:
- **Featured** (Gold) - Flagship products
- **New** (Green) - Recently launched products
- **Popular** (Red) - High-demand products
- **Coming Soon** (Blue) - Pre-launch products
- **Beta** (Purple) - Products in testing
- **Limited Time** (Orange) - Special offers with pulse animation

**Future badge ideas:**
- "Award Winner" - For recognized achievements
- "Staff Pick" - Team recommendations
- "Community Choice" - User-voted favorites
- "Early Access" - Exclusive previews

### Additional UI/UX Improvements
- **Tooltips** for form fields and complex features
- **Quick Links** section for new visitors
- **Sticky header/footer** for always-visible navigation
- **Contextual help** for less-obvious features
- **Section dividers** with western-themed decorative elements

### Content Enhancements
- **Customer testimonials** section
- **Case studies** with detailed project examples
- **Blog/News** section for industry insights
- **Team member profiles** with individual expertise
- **Interactive product demos** or screenshots

### Technical Improvements
- **Dark mode** toggle
- **Language switcher** for international clients
- **Advanced search** functionality
- **Newsletter signup** integration
- **Social media** feed integration

## 🤠 Western Terminology Used

The website uses authentic frontier language:
- "Staking claims" = Starting projects
- "Prospecting" = Consulting
- "Striking gold" = Achieving success
- "Digital territory" = AI/tech space
- "Frontier spirit" = Innovation mindset

## Support

For questions about deployment or customization, contact the development team or refer to your hosting provider's documentation.

---

*"The secret of getting ahead is getting started."* - Mark Twain 