/**
 * Social Welfare Page - Fixed JavaScript with Working Filters
 */

// ========================================
// Data with Correct Categories
// ========================================

const mosaicItems = [
  {
    id: '1',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600',
    title: 'Community Education Center Opening',
    category: 'education',
    description: 'Inaugurating our new learning facility serving 500+ students annually',
  },
  {
    id: '2',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
    title: 'Youth Football Championship',
    category: 'football-club',
    description: 'Annual tournament bringing together 24 youth teams',
  },
  {
    id: '3',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600',
    title: 'Affordable Housing Project Phase II',
    category: 'housing',
    description: 'Delivering 200 new homes to families in need',
  },
  {
    id: '4',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600',
    title: 'Volunteer Build Day',
    category: 'philanthropy',
    description: 'Over 100 volunteers helping build homes for local families',
  },
  {
    id: '5',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600',
    title: 'Sports Day Event',
    category: 'events',
    description: 'Annual community sports day with over 500 participants',
  },
  {
    id: '6',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600',
    title: 'Scholarship Award Ceremony',
    category: 'education',
    description: 'Recognizing 50 outstanding students with full scholarships',
  },
  {
    id: '7',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600',
    title: 'Football Training Camp',
    category: 'football-club',
    description: 'Professional coaching for underprivileged youth',
  },
  {
    id: '8',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
    title: 'Digital Literacy Workshop',
    category: 'education',
    description: 'Teaching essential tech skills to community members',
  },
  {
    id: '9',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600',
    title: 'Community Food Drive',
    category: 'philanthropy',
    description: 'Distributing supplies to 1,000+ families during holidays',
  },
  {
    id: '10',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
    title: 'New Community Center',
    category: 'housing',
    description: 'Multi-purpose facility for community gatherings and events',
  },
  {
    id: '11',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600',
    title: 'Youth League Finals',
    category: 'football-club',
    description: 'Championship game with over 2,000 spectators',
  },
  {
    id: '12',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
    title: 'Annual Charity Gala',
    category: 'events',
    description: 'Raising funds for community programs and initiatives',
  },
];

const carouselStories = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200',
    title: "Maria's Dream Home Becomes Reality",
    summary: 'After years of waiting, Maria and her family moved into their new home built through our affordable housing initiative.',
    link: '/contact',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1200',
    title: "From Streets to Stadium: Ahmed's Journey",
    summary: 'Young Ahmed discovered his passion for football through our youth program and now plays for the regional team.',
    link: '/contact',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
    title: 'Scholarship Opens Doors for Rural Students',
    summary: 'Our education fund has helped 500 students from underserved communities pursue higher education.',
    link: '/contact',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200',
    title: 'Community Center: A Hub of Hope',
    summary: 'The new community center serves as a gathering place for events, training, and social support programs.',
    link: '/contact',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200',
    title: 'Volunteers Building Futures Together',
    summary: 'Over 1,000 volunteers have contributed 50,000+ hours to our community building projects.',
    link: '/contact',
  },
];

// ========================================
// State
// ========================================

let currentMosaicFilter = 'all';
let currentCarouselIndex = 0;
let carouselInterval = null;
let lightboxItems = [];
let lightboxIndex = 0;

// ========================================
// DOM Elements
// ========================================

const topNav = document.getElementById('top-nav');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mosaicGrid = document.getElementById('mosaic-grid');
const carouselEl = document.getElementById('featured-carousel');
const carouselDots = document.getElementById('carousel-dots');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxCounter = document.getElementById('lightbox-counter');

// ========================================
// Utility Functions
// ========================================

function formatNumber(num) {
  if (num >= 10000) {
    return Math.floor(num / 1000) + 'K';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function animateCounter(element, target) {
  const duration = 2000;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * easeOut);
    
    element.textContent = formatNumber(current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// ========================================
// Navigation
// ========================================

function initNavigation() {
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      topNav.classList.add('scrolled');
    } else {
      topNav.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.querySelector('.menu-icon').classList.remove('hidden');
        mobileMenuBtn.querySelector('.close-icon').classList.add('hidden');
      } else {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.querySelector('.menu-icon').classList.add('hidden');
        mobileMenuBtn.querySelector('.close-icon').classList.remove('hidden');
      }
    });
  }
  
  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
      if (mobileMenuBtn) {
        mobileMenuBtn.querySelector('.menu-icon').classList.remove('hidden');
        mobileMenuBtn.querySelector('.close-icon').classList.add('hidden');
      }
    });
  });
}

// ========================================
// Mosaic Grid - FIXED FILTER
// ========================================

function createMediaCard(item, originalIndex) {
  const card = document.createElement('div');
  card.className = 'media-card';
  card.dataset.category = item.category;
  card.dataset.id = item.id;
  
  card.innerHTML = `
    <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
    <div class="media-card-overlay">
      <span class="media-card-category">${item.category.replace('-', ' ')}</span>
      <h3 class="media-card-title">${item.title}</h3>
      <span class="media-card-action">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        View
      </span>
    </div>
  `;
  
  // Add click event to open lightbox
  card.addEventListener('click', () => {
    openLightbox(mosaicItems, originalIndex);
  });
  
  return card;
}

function renderMosaicGrid(filter = 'all') {
  if (!mosaicGrid) return;
  
  // Clear the grid
  mosaicGrid.innerHTML = '';
  
  // Filter items
  const filteredItems = filter === 'all' 
    ? mosaicItems 
    : mosaicItems.filter(item => item.category === filter);
  
  // Render each item
  filteredItems.forEach((item) => {
    // Find the original index in the mosaicItems array
    const originalIndex = mosaicItems.findIndex(m => m.id === item.id);
    mosaicGrid.appendChild(createMediaCard(item, originalIndex));
  });
  
  // Log for debugging
  console.log(`Filter: ${filter}, Showing: ${filteredItems.length} items`);
}

function initMosaicFilters() {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      currentMosaicFilter = filter;
      
      // Update active state
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      
      // Re-render grid
      renderMosaicGrid(filter);
    });
  });
}

// ========================================
// Featured Carousel
// ========================================

function renderCarousel() {
  if (!carouselEl || !carouselDots) return;
  
  carouselEl.innerHTML = carouselStories.map((story, index) => `
    <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
      <img src="${story.image}" alt="${story.title}" loading="lazy">
      <div class="carousel-slide-overlay"></div>
      <div class="carousel-slide-content">
        <h3 class="carousel-slide-title">${story.title}</h3>
        <p class="carousel-slide-summary">${story.summary}</p>
        <a href="${story.link}" class="carousel-slide-link">
          Read Full Story
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  `).join('');
  
  // Render dots
  carouselDots.innerHTML = carouselStories.map((_, index) => `
    <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
  `).join('');
}

function goToSlide(index) {
  const slides = carouselEl?.querySelectorAll('.carousel-slide');
  const dots = carouselDots?.querySelectorAll('.carousel-dot');
  
  if (!slides || !dots) return;
  
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  
  currentCarouselIndex = index;
}

function nextSlide() {
  const nextIndex = (currentCarouselIndex + 1) % carouselStories.length;
  goToSlide(nextIndex);
}

function prevSlide() {
  const prevIndex = (currentCarouselIndex - 1 + carouselStories.length) % carouselStories.length;
  goToSlide(prevIndex);
}

function initCarousel() {
  if (!carouselPrev || !carouselNext) return;
  
  renderCarousel();
  
  // Add dot click handlers
  carouselDots?.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
      if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
      }
    });
  });
  
  // Navigation buttons
  carouselPrev.addEventListener('click', () => {
    prevSlide();
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  });
  
  carouselNext.addEventListener('click', () => {
    nextSlide();
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  });
  
  // Auto-play
  carouselInterval = setInterval(nextSlide, 6000);
}

// ========================================
// Impact Counters
// ========================================

function initCounters() {
  const counterCards = document.querySelectorAll('.counter-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counterValue = entry.target.querySelector('.counter-value');
        const target = parseInt(counterValue.dataset.target);
        animateCounter(counterValue, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counterCards.forEach(card => observer.observe(card));
}

// ========================================
// Lightbox
// ========================================

function openLightbox(items, index) {
  lightboxItems = items;
  lightboxIndex = index;
  
  updateLightbox();
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
  if (lightboxVideo) {
    lightboxVideo.pause();
    lightboxVideo.classList.add('hidden');
  }
}

function updateLightbox() {
  const item = lightboxItems[lightboxIndex];
  
  if (item.type === 'video') {
    lightboxImage.classList.add('hidden');
    lightboxVideo.classList.remove('hidden');
    lightboxVideo.src = item.src;
  } else {
    if (lightboxVideo) lightboxVideo.classList.add('hidden');
    lightboxImage.classList.remove('hidden');
    lightboxImage.src = item.src;
    lightboxImage.alt = item.title;
  }
  
  lightboxTitle.textContent = item.title;
  lightboxDescription.textContent = item.description || item.category;
  lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
  
  // Update button states
  if (lightboxPrev) lightboxPrev.disabled = lightboxIndex === 0;
  if (lightboxNext) lightboxNext.disabled = lightboxIndex === lightboxItems.length - 1;
}

function initLightbox() {
  if (!lightbox || !lightboxClose) return;
  
  // Close button
  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });
  
  // Close on overlay click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Navigation buttons
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      if (lightboxIndex > 0) {
        lightboxIndex--;
        updateLightbox();
      }
    });
  }
  
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (lightboxIndex < lightboxItems.length - 1) {
        lightboxIndex++;
        updateLightbox();
      }
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        if (lightboxIndex > 0) {
          lightboxIndex--;
          updateLightbox();
        }
        break;
      case 'ArrowRight':
        if (lightboxIndex < lightboxItems.length - 1) {
          lightboxIndex++;
          updateLightbox();
        }
        break;
    }
  });
}

// ========================================
// Scroll Animations
// ========================================

function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '-50px' });
  
  fadeElements.forEach(el => observer.observe(el));
}

// ========================================
// Initialize Everything
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Social Welfare Page...');
  
  // Initialize all components
  initNavigation();
  
  if (mosaicGrid) {
    console.log('Rendering mosaic grid with', mosaicItems.length, 'items');
    renderMosaicGrid();
    initMosaicFilters();
  }
  
  if (carouselEl) {
    console.log('Initializing carousel with', carouselStories.length, 'stories');
    initCarousel();
  }
  
  if (document.querySelector('.counter-card')) {
    console.log('Initializing counters');
    initCounters();
  }
  
  if (lightbox) {
    console.log('Initializing lightbox');
    initLightbox();
  }
  
  initScrollAnimations();
});