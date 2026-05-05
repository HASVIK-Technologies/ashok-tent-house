# Quick Config.json Update Examples

## 🎯 Common Updates

### Update Company Phone Number
```json
"contact": {
  "phone": "+91 YOUR_NEW_NUMBER",
  "whatsapp": "+91 YOUR_NEW_NUMBER"
}
```

### Add a New Service
Find the `"services"` array and add:
```json
{
  "icon": "bi-check-circle",
  "title": "Your Service Name",
  "description": "Short description of the service",
  "delay": 350
}
```

### Update Statistics
```json
"stats": [
  { "number": 1000, "label": "Events Completed" },
  { "number": 30, "label": "Years Experience" },
  { "number": 100, "label": "Client Satisfaction" },
  { "number": 24, "label": "Support Available" }
]
```

### Add Gallery Images
```json
"gallery": {
  "images": [
    {
      "src": "./assets/images/my-image.jpg",
      "alt": "Description of the image",
      "size": "normal"
    }
  ]
}
```

### Add Video
```json
"videos": {
  "videoList": [
    {
      "src": "./assets/videos/my-video.mp4",
      "thumbnail": "./assets/images/video-thumb.jpg"
    }
  ]
}
```

### Add Testimonial
```json
"testimonials": [
  {
    "stars": 5,
    "text": "Amazing service! Highly recommend!",
    "author": "John Doe"
  }
]
```

### Update Footer Developer Info
```json
"footer": {
  "developer": {
    "name": "Your Company Name",
    "location": "Your City, State",
    "website": "https://yourwebsite.com"
  }
}
```

## 🔧 Icon Codes (Bootstrap Icons)

Popular icons for services:
- `bi-award` - Award/Trophy
- `bi-badge-tm` - Tent/Canopy
- `bi-flower1` - Flower/Decoration
- `bi-lightbulb` - Lighting
- `bi-bell` - Bell/Catering
- `bi-car-front` - Car/Transport
- `bi-calendar-event` - Calendar/Event
- `bi-star-fill` - Star
- `bi-check-circle` - Check/Complete
- `bi-people-fill` - People/Team
- `bi-heart-fill` - Heart/Love

See all icons: https://icons.getbootstrap.com/

## 📏 Image Size Options

Use these for gallery images:
- `"big"` - Large featured square
- `"tall"` - Tall portrait image
- Default (or `"normal"`) - Regular square

## ⏱️ Animation Delays

Stagger animations in milliseconds:
```json
"services": [
  { "delay": 0 },      // First item - no delay
  { "delay": 50 },     // Second item - 50ms delay
  { "delay": 100 },    // Third item - 100ms delay
  { "delay": 150 }     // Fourth item - 150ms delay
]
```

## ✅ JSON Validation

After editing, validate your JSON at: https://jsonlint.com/

Common errors:
- Missing commas between properties: `"name": "John"` ❌ `"age": 30` → Add comma between them
- Trailing commas: `{ "item": "value", }` ❌ Remove comma before closing bracket
- Unmatched quotes: `"value that ends` ❌ Must have closing quote
- Missing colons: `"name" "value"` ❌ Should be `"name": "value"`

## 📱 Making It Responsive

The website is already fully responsive. Just update content in config.json and it automatically adapts to all screen sizes!

## 🌐 Multi-Language Support (Future)

To add multiple languages, create separate config files:
- `config-en.json` (English)
- `config-hi.json` (Hindi)
- `config-es.json` (Spanish)

Then modify data-renderer.js to load based on selected language.

## 💾 Backup Tips

Before making major changes:
1. Save a copy of config.json as config-backup.json
2. Use version control (git) to track changes
3. Test changes before publishing

---

**Pro Tip:** Use VS Code's JSON formatter (Shift+Alt+F) to keep your config.json properly formatted!
