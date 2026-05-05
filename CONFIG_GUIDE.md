# Ashok Tent House - JSON-Based Configuration Guide

## Overview

This website now uses a **JSON-based configuration system** that separates content from code. You can easily update all website content by editing the `config.json` file without touching any HTML or JavaScript code.

## Files Structure

```
├── index.html              # Main HTML template (minimal, markup only)
├── config.json             # All website content & configuration
├── js/
│   └── data-renderer.js    # Script that renders HTML from config.json
└── assets/
    ├── images/             # Image files
    └── videos/             # Video files
```

## How It Works

1. **config.json** contains all text, links, images, and settings
2. **data-renderer.js** reads config.json and generates all HTML dynamically
3. **index.html** contains only the structure and styling

## Updating Content

### 1. Basic Information (Site Title, Contact, etc.)

Edit the `site` and `contact` sections in `config.json`:

```json
{
  "site": {
    "title": "Ashok Tent House",
    "description": "Your description here"
  },
  "contact": {
    "phone": "+91 80521 90808",
    "email": "your@email.com",
    "whatsapp": "+91 80521 90808",
    "address": "Your Address"
  }
}
```

### 2. Navigation Menu

Edit the `navigation` array:

```json
{
  "navigation": [
    { "label": "Home", "href": "#home" },
    { "label": "About Us", "href": "#about-services" },
    { "label": "Owner", "href": "#owner" }
  ]
}
```

### 3. Hero Section

Update the hero banner content:

```json
{
  "hero": {
    "strap": "Your tagline here",
    "title": "Main Title",
    "subtitle": [
      "First subtitle line",
      "Second subtitle line"
    ],
    "badges": ["Badge 1", "Badge 2", "Badge 3"],
    "backgroundImage": "./assets/images/hero-red.jpeg"
  }
}
```

### 4. Services

Edit the `services` array to add/remove services:

```json
{
  "services": [
    {
      "icon": "bi-badge-tm",
      "title": "Service Name",
      "description": "Service description",
      "delay": 50
    }
  ]
}
```

**Available Bootstrap Icons:** Visit https://icons.getbootstrap.com/ and use the icon class (e.g., `bi-award`, `bi-flower1`)

### 5. Gallery Images

Add or remove gallery images in the `gallery.images` array:

```json
{
  "gallery": {
    "kicker": "Our Work",
    "title": "Moments We Crafted",
    "images": [
      {
        "src": "./assets/images/1.jpeg",
        "alt": "Image description",
        "size": "big"  // Options: "big", "tall", or omit for "normal"
      }
    ]
  }
}
```

### 6. Videos

Update video list in `videos.videoList`:

```json
{
  "videos": {
    "kicker": "Video Gallery",
    "title": "Watch Our Work",
    "videoList": [
      {
        "src": "./assets/videos/1.mp4",
        "thumbnail": "./assets/images/thumb1.jpeg"
      }
    ]
  }
}
```

### 7. Statistics

Update the stats section:

```json
{
  "stats": [
    { "number": 500, "label": "Events Completed" },
    { "number": 25, "label": "Years Experience" }
  ]
}
```

### 8. Owner/Founder Section

Update owner information:

```json
{
  "owner": {
    "kicker": "Meet The Founder",
    "name": "Ankur Kumar Singh",
    "subtitle": "Owner & Event Specialist",
    "description": ["Paragraph 1", "Paragraph 2"],
    "highlights": ["Highlight 1", "Highlight 2"],
    "signature": "— Signature",
    "image": "./assets/images/owner.jpeg"
  }
}
```

### 9. Why Choose Us Section

Edit `whyUs.items`:

```json
{
  "whyUs": {
    "kicker": "Why Choose Us",
    "title": "Title",
    "items": [
      {
        "icon": "bi-award",
        "title": "Item Title",
        "description": "Item description",
        "delay": 0
      }
    ]
  }
}
```

### 10. Testimonials

Add testimonials:

```json
{
  "testimonials": [
    {
      "stars": 5,
      "text": "Testimonial text here",
      "author": "Author Name"
    }
  ]
}
```

### 11. Footer

Update footer content:

```json
{
  "footer": {
    "company": "Ashok Tent House",
    "tagline": "Your Trust, Our Commitment",
    "explore": [
      { "label": "About", "href": "#about-services" }
    ],
    "developer": {
      "name": "Your Company",
      "location": "City, State",
      "website": "https://yourwebsite.com"
    },
    "copyright": "© 2024 Your Company"
  }
}
```

## Data Types Reference

| Type | Example | Notes |
|------|---------|-------|
| String | `"Hello World"` | Text content |
| Number | `500` | Numeric values |
| Array | `["Item 1", "Item 2"]` | Lists of items |
| Object | `{"key": "value"}` | Grouped data |
| Boolean | `true` / `false` | True/False values |

## Valid Image Sizes

- `"big"` - Large featured image
- `"tall"` - Tall portrait-oriented image
- omit or `"normal"` - Regular size

## Delay Values

For animation delays in services and other sections, use milliseconds:
- `0` - No delay
- `50`, `100`, `150`, etc. - Staggered animation delays

## Adding New Content Sections

To add new sections to the config and render them:

1. Add the section data to `config.json`
2. Create a `render[SectionName]()` function in `data-renderer.js`
3. Call that function from `initializeFromConfig()`

Example in `data-renderer.js`:

```javascript
function renderMySection() {
  const element = document.querySelector('.my-section');
  if (!element || !CONFIG.mySection) return;
  
  element.innerHTML = `<h2>${CONFIG.mySection.title}</h2>`;
}

async function initializeFromConfig() {
  const config = await loadConfig();
  if (!config) return;
  
  // ... other renders ...
  renderMySection();
}
```

## Image & Video Paths

All paths are relative to the root directory:
- `./assets/images/` - Image directory
- `./assets/videos/` - Video directory

Add images/videos to these folders and reference them in config.json.

## Advantages of This System

✅ **Easy Content Updates** - Edit JSON, not HTML
✅ **Consistency** - All content in one place
✅ **Version Control** - Easy to track changes
✅ **Multi-language Ready** - Can create multiple config files (config-en.json, config-hi.json)
✅ **API Integration Ready** - Can replace config.json with API endpoint
✅ **Scalable** - Easy to add new sections
✅ **Maintainable** - Clear structure and organization

## Troubleshooting

### Content not updating?
- Check browser cache (Ctrl+Shift+Delete)
- Ensure config.json is valid JSON (use https://jsonlint.com/)
- Check browser console for errors (F12)

### Images not showing?
- Verify image paths are correct in config.json
- Check that image files exist in assets/images/
- Ensure file extensions are correct (.jpeg, .jpg, .png, etc.)

### JSON Validation?
- Use https://jsonlint.com/ to validate JSON syntax
- Missing commas, quotes, or brackets are common errors

## Next Steps

1. Edit `config.json` with your content
2. Add your images to `assets/images/`
3. Add your videos to `assets/videos/`
4. Refresh the website
5. All changes appear automatically!

---

**Need Help?** Check the config.json file - it has examples for every section!
