/**
 * Data Renderer - Dynamically generates HTML from config.json
 * This utility loads the config and provides functions to render sections
 */

let CONFIG = {};

// Load config on page load
async function loadConfig() {
  try {
    const response = await fetch('./config.json');
    CONFIG = await response.json();
    return CONFIG;
  } catch (error) {
    console.error('Failed to load config:', error);
    return null;
  }
}

function renderSocialMedia() {
  const whatsappLink = document.querySelector('.whatsapp-btn');
  if (whatsappLink && CONFIG.contact && CONFIG.contact.whatsapp) {
    const whatsappPhone = CONFIG.contact.whatsapp.replace(/\s+/g, '').replace(/\D/g, '');
    whatsappLink.href = `https://wa.me/${whatsappPhone}`;
  }
}

// Render Navigation Links
function renderNavigation() {
  const navMenu = document.getElementById('navMenu').querySelector('.navbar-nav');
  if (!navMenu || !CONFIG.navigation) return;

  const navHTML = CONFIG.navigation.map((item, index) => 
    `<li class="nav-item"><a class="nav-link${index === 0 ? ' active' : ''}" href="${item.href}">${item.label}</a></li>`
  ).join('');

  navMenu.innerHTML = navHTML;
}

// Render Hero Section
function renderHero() {
  const heroLeft = document.querySelector('.hero-left');
  if (!heroLeft || !CONFIG.hero) return;

  const contactPhone = CONFIG.contact.phone;
  const whatsappLink = `https://wa.me/${CONFIG.contact.phone.replace(/\s+/g, '').replace(/\D/g, '')}`;

  heroLeft.innerHTML = `
    <div class="hero-strap">${CONFIG.hero.strap}</div>
    <h1 class="hero-title">${CONFIG.hero.title}</h1>
    ${CONFIG.hero.subtitle.map(text => `<p class="hero-subtitle">${text}</p>`).join('')}
    <div class="hero-actions">
      <a href="tel:${contactPhone}" class="btn btn-premium btn-primary-premium d-inline-flex align-items-center gap-2">
        <i class="bi ${CONFIG.hero.cta.primary.icon}"></i>
        <span>${CONFIG.hero.cta.primary.label}</span>
      </a>
      <a href="${whatsappLink}" target="_blank" rel="noopener" class="btn btn-premium btn-primary-premium d-inline-flex align-items-center gap-2">
        <i class="bi ${CONFIG.hero.cta.secondary.icon}"></i>
        <span>${CONFIG.hero.cta.secondary.label}</span>
      </a>
    </div>
    <div class="hero-badges">
      ${CONFIG.hero.badges.map(badge => `<span>${badge}</span>`).join('')}
    </div>
  `;
}

// Render About Section
function renderAbout() {
  const aboutContent = document.querySelector('.col-lg-6[data-aos="fade-left"]');
  if (!aboutContent || !CONFIG.about) return;

  aboutContent.innerHTML = `
    <div class="section-kicker text-uppercase mb-2">${CONFIG.about.kicker}</div>
    <h2 class="about-heading mb-3">${CONFIG.about.title}</h2>
    <div class="about-divider mb-4"></div>
    ${CONFIG.about.description.map(text => `<p class="about-text">${text}</p>`).join('')}
    <a href="#contact" class="btn btn-about-premium mt-2">Know More About Us</a>
  `;
}

// Render Services
function renderServices() {
  const servicesContainer = document.querySelector('.row.g-3.g-lg-4');
  if (!servicesContainer || !CONFIG.services) return;

  const servicesHTML = CONFIG.services.map(service => `
    <div class="col-6 col-lg-2" data-aos="fade-up" data-aos-delay="${service.delay}">
      <div class="service-box h-100">
        <div class="service-icon">
          <i class="bi ${service.icon}"></i>
        </div>
        <h6>${service.title}</h6>
        <p>${service.description}</p>
      </div>
    </div>
  `).join('');

  servicesContainer.innerHTML = servicesHTML;
}

// Render Owner Section
function renderOwner() {
  const ownerContent = document.querySelector('.owner-content');
  if (!ownerContent || !CONFIG.owner) return;

  ownerContent.innerHTML = `
    <div class="section-kicker">${CONFIG.owner.kicker}</div>
    <h2 class="owner-title">${CONFIG.owner.name}</h2>
    <p class="owner-subtitle">${CONFIG.owner.subtitle}</p>
    ${CONFIG.owner.description.map(text => `<p class="owner-text">${text}</p>`).join('')}
    <div class="owner-highlights">
      ${CONFIG.owner.highlights.map(h => `<span>${h}</span>`).join('')}
    </div>
    <div class="owner-signature">${CONFIG.owner.signature}</div>
  `;

  const ownerImage = document.querySelector('.owner-image img');
  if (ownerImage) ownerImage.src = CONFIG.owner.image;
}

// Render Gallery Images
function renderGallery() {
  const galleryGrid = document.querySelector('.gallery-premium-grid');
  if (!galleryGrid || !CONFIG.gallery) return;

  const galleryHTML = CONFIG.gallery.images.map(img => {
    const classes = ['gallery-item'];
    if (img.size === 'big') classes.push('big');
    if (img.size === 'tall') classes.push('tall');

    return `
      <div class="${classes.join(' ')}" data-preview-type="image" data-preview-src="${img.src}" data-preview-alt="${img.alt}">
        <img src="${img.src}" alt="${img.alt}" loading="lazy">
        <div class="overlay">
          <span>View Image</span>
        </div>
      </div>
    `;
  }).join('');

  galleryGrid.innerHTML = galleryHTML;
}

// Render Videos
function renderVideos() {
  const videoGrid = document.getElementById('videoGrid');
  if (!videoGrid || !CONFIG.videos) return;

  const gridHTML = CONFIG.videos.videoList.map((video, index) => {
    const title = video.title || `Video ${index + 1}`;
    const description = video.description || 'Click to preview this video in full screen.';

    return `
      <div class="video-card" data-preview-type="video" data-preview-src="${video.src}" data-preview-poster="${video.thumbnail}" data-preview-alt="${title}">
        <img src="${video.thumbnail}" alt="${video.alt || title}" loading="lazy">
        <div class="video-card-play">
          <i class="bi bi-play-circle-fill"></i>
        </div>
        <div class="video-card-body">
          <h6>${title}</h6>
          <small>${description}</small>
        </div>
      </div>
    `;
  }).join('');

  videoGrid.innerHTML = gridHTML;
}

// Render Stats
function renderStats() {
  const statsRow = document.querySelector('.stats-section .row.g-4');
  if (!statsRow || !CONFIG.stats) return;

  const statsHTML = CONFIG.stats.map((stat, index) => `
    <div class="col-md-3">
      <div class="stat-card">
        <h2 class="stat-number">${stat.number}</h2>
        <p class="stat-text">${stat.label}</p>
      </div>
    </div>
  `).join('');

  statsRow.innerHTML = statsHTML;
}

// Render Why Us Section
function renderWhyUs() {
  const whyItems = document.querySelector('.why-items');
  if (!whyItems || !CONFIG.whyUs) return;

  const whyHTML = CONFIG.whyUs.items.map(item => `
    <div class="why-item" data-aos="fade-up" data-aos-delay="${item.delay}">
      <div class="icon"><i class="bi ${item.icon}"></i></div>
      <div>
        <h6>${item.title}</h6>
        <p>${item.description}</p>
      </div>
    </div>
  `).join('');

  whyItems.innerHTML = whyHTML;
}

// Render Contact & Testimonials
function renderContact() {
  const contactBox = document.querySelector('.contact-box');
  if (!contactBox || !CONFIG.contact) return;

  const whatsappPhone = CONFIG.contact.whatsapp.replace(/\s+/g, '').replace(/\D/g, '');

  contactBox.innerHTML = `
    <div class="contact-item">
      <i class="bi bi-telephone-fill"></i>
      <div>
        <h6>Call Us</h6>
        <p>${CONFIG.contact.phone}</p>
      </div>
    </div>
    <div class="contact-item">
      <i class="bi bi-whatsapp"></i>
      <div>
        <h6>WhatsApp</h6>
        <p>${CONFIG.contact.whatsapp}</p>
      </div>
    </div>
    <div class="contact-item">
      <i class="bi bi-envelope-fill"></i>
      <div>
        <h6>Email</h6>
        <p>${CONFIG.contact.email}</p>
      </div>
    </div>
    <div class="contact-item mb-0">
      <i class="bi bi-geo-alt-fill"></i>
      <div>
        <h6>Address</h6>
        <p>${CONFIG.contact.address}</p>
      </div>
    </div>
  `;

  // Render testimonials
  const testimonialCard = document.querySelector('.testimonial-card');
  if (testimonialCard && CONFIG.testimonials && CONFIG.testimonials.length > 0) {
    const testimonial = CONFIG.testimonials[0];
    const stars = '★'.repeat(testimonial.stars);
    
    testimonialCard.innerHTML = `
      <div class="stars mb-2">${'<i class="bi bi-star-fill"></i>'.repeat(testimonial.stars)}</div>
      <p class="quote-text">${testimonial.text}</p>
      <div class="fw-bold text-main">- ${testimonial.author}</div>
    `;
  }
}

// Render Footer
function renderFooter() {
  const footerBrand = document.querySelector('.footer-col.brand');
  if (!footerBrand || !CONFIG.footer) return;

  footerBrand.innerHTML = `
    <img src="./assets/images/logo.jpeg" alt="Ashok Tent House">
    <h3>${CONFIG.footer.company}</h3>
    <p>${CONFIG.footer.tagline}</p>
  `;

  // Render footer links
  const footerCols = document.querySelectorAll('.footer-col');
  if (footerCols.length >= 2) {
    let exploreLinks = CONFIG.footer.explore.map(link => 
      `<a href="${link.href}">${link.label}</a>`
    ).join('');
    footerCols[1].innerHTML = `<h5>Explore</h5>${exploreLinks}`;
  }

  if (footerCols.length >= 3) {
    footerCols[2].innerHTML = `
      <h5>Contact</h5>
      <p>${CONFIG.footer.address || CONFIG.contact.address}</p>
      <a href="tel:${CONFIG.contact.phone}">${CONFIG.contact.phone}</a>
      <a href="https://wa.me/${CONFIG.contact.whatsapp.replace(/\s+/g, '').replace(/\D/g, '')}">WhatsApp</a>
    `;
  }

  if (footerCols.length >= 4) {
    footerCols[3].innerHTML = `
      <h5>Developed By</h5>
      <h6>${CONFIG.footer.developer.name}</h6>
      <p>${CONFIG.footer.developer.location}</p>
      <a href="${CONFIG.footer.developer.website}">${CONFIG.footer.developer.website}</a>
    `;
  }

  // Update footer bottom
  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom) {
    footerBottom.innerHTML = `
      <span>${CONFIG.footer.copyright}</span>
      <span>Designed by ${CONFIG.footer.developer.name}</span>
    `;
  }
}

// Preview overlay helpers
function openPreview(type, src, alt = '', poster = '') {
  const overlay = document.getElementById('previewOverlay');
  const previewImage = document.getElementById('previewImage');
  const previewVideo = document.getElementById('previewVideo');
  if (!overlay || !previewImage || !previewVideo) return;

  overlay.hidden = false;
  overlay.classList.add('active');

  if (type === 'video') {
    previewImage.hidden = true;
    previewVideo.hidden = false;
    previewVideo.src = src;
    previewVideo.poster = poster;
    previewVideo.play().catch(() => {});
  } else {
    previewVideo.pause();
    previewVideo.hidden = true;
    previewVideo.src = '';
    previewImage.src = src;
    previewImage.alt = alt;
    previewImage.hidden = false;
  }
}

function closePreview() {
  const overlay = document.getElementById('previewOverlay');
  const previewImage = document.getElementById('previewImage');
  const previewVideo = document.getElementById('previewVideo');
  if (!overlay || !previewImage || !previewVideo) return;

  overlay.hidden = true;
  overlay.classList.remove('active');
  previewVideo.pause();
  previewVideo.src = '';
  previewVideo.hidden = true;
  previewImage.hidden = true;
}

function initPreviewOverlay() {
  const overlay = document.getElementById('previewOverlay');
  if (!overlay) return;

  overlay.querySelectorAll('[data-preview-close]').forEach(btn => {
    btn.addEventListener('click', closePreview);
  });

  overlay.addEventListener('click', event => {
    if (event.target === overlay || event.target.closest('.preview-close')) {
      closePreview();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closePreview();
    }
  });

  document.addEventListener('click', event => {
    const previewImageItem = event.target.closest('.gallery-item');
    if (previewImageItem && previewImageItem.dataset.previewType === 'image') {
      openPreview('image', previewImageItem.dataset.previewSrc, previewImageItem.dataset.previewAlt || 'Gallery image');
      return;
    }

    const previewVideoItem = event.target.closest('.video-card');
    if (previewVideoItem && previewVideoItem.dataset.previewType === 'video') {
      openPreview('video', previewVideoItem.dataset.previewSrc, previewVideoItem.dataset.previewAlt || 'Video preview', previewVideoItem.dataset.previewPoster || '');
      return;
    }
  });
}

// Main initialization function
async function initializeFromConfig() {
  // Load config first
  const config = await loadConfig();
  if (!config) {
    console.error('Could not load config.json');
    return;
  }

  // Render all sections
  renderSocialMedia();
  renderNavigation();
  renderHero();
  renderAbout();
  renderServices();
  renderOwner();
  renderGallery();
  renderVideos();
  renderStats();
  renderWhyUs();
  renderContact();
  renderFooter();
  initPreviewOverlay();

  if (window.AOS && typeof AOS.refresh === 'function') {
    AOS.refresh();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFromConfig);
} else {
  initializeFromConfig();
}
