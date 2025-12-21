/**
 * Grade-1 Construction - Services JavaScript
 * Vanilla JS for search, filter, sort, pagination, and interactions
 */

// Services Data
const servicesData = [
  {
    id: 1,
    slug: 'commercial-construction-management-2026',
    title: 'Commercial Construction Management',
    description: 'End-to-end project management for commercial construction — on-budget, on-time delivery.',
    tags: ['commercial', 'management', 'project'],
    year: 2026,
    duration: '6-18 months',
    icon: 'building',
    order: 1
  },
  {
    id: 2,
    slug: 'residential-renovation-remodeling-2026',
    title: 'Residential Renovation & Remodeling',
    description: 'Complete home renovations and modernizations with skilled trades and finishes.',
    tags: ['residential', 'renovation', 'remodeling'],
    year: 2026,
    duration: '2-6 months',
    icon: 'home',
    order: 2
  },
  {
    id: 3,
    slug: 'structural-engineering-reinforcement-2026',
    title: 'Structural Engineering & Reinforcement',
    description: 'Structural analysis and reinforcement solutions for safety and longevity.',
    tags: ['engineering', 'structural', 'safety'],
    year: 2026,
    duration: '1-4 months',
    icon: 'structure',
    order: 3
  },
  {
    id: 4,
    slug: 'sustainable-building-retrofit-2026',
    title: 'Sustainable Building & Retrofit Solutions',
    description: 'Energy-efficient retrofits, insulation, and green building strategies for lower footprints.',
    tags: ['sustainable', 'green', 'energy'],
    year: 2026,
    duration: '2-8 months',
    icon: 'leaf',
    order: 4
  },
  {
    id: 5,
    slug: 'site-development-civil-works-2026',
    title: 'Site Development & Civil Works',
    description: 'Site prep, earthworks, drainage, and infrastructure for new builds and expansions.',
    tags: ['commercial', 'civil', 'infrastructure'],
    year: 2026,
    duration: '3-12 months',
    icon: 'excavator',
    order: 5
  }
];

// Icons SVG
const icons = {
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>`,
  structure: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/><path d="M9 20v-6h6v6"/><path d="M9 9h6"/><path d="M12 9v3"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  excavator: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17h2v4h16v-4h2"/><path d="M6 21V10l6-6 6 6v11"/><path d="M12 4v4"/><circle cx="6" cy="17" r="2"/><circle cx="18" cy="17" r="2"/><path d="M6 13h12"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`
};

// State
let currentPage = 1;
const itemsPerPage = 6;
let filteredServices = [...servicesData];
let currentFilter = 'all';
let currentSort = 'relevance';
let searchQuery = '';

// DOM Elements
const servicesGrid = document.getElementById('servicesGrid');
const searchInput = document.getElementById('searchInput');
const tagFilters = document.getElementById('tagFilters');
const sortSelect = document.getElementById('sortSelect');
const pagination = document.getElementById('pagination');
const noResults = document.getElementById('noResults');
const filterBar = document.getElementById('filterBar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  renderServices();
  initScrollEffects();
  initIntersectionObserver();
});

// Event Listeners
function initEventListeners() {
  // Search
  searchInput?.addEventListener('input', debounce((e) => {
    searchQuery = e.target.value.toLowerCase();
    currentPage = 1;
    filterAndRender();
  }, 300));

  // Tag Filters
  tagFilters?.addEventListener('click', (e) => {
    if (e.target.classList.contains('tag-btn')) {
      const tag = e.target.dataset.tag;
      tagFilters.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = tag;
      currentPage = 1;
      filterAndRender();
    }
  });

  // Sort
  sortSelect?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    filterAndRender();
  });

  // Mobile Menu
  mobileMenuBtn?.addEventListener('click', () => {
    nav?.classList.toggle('open');
  });

  // Pagination click delegation
  pagination?.addEventListener('click', (e) => {
    if (e.target.classList.contains('pagination-btn')) {
      const page = e.target.dataset.page;
      if (page === 'prev') {
        currentPage = Math.max(1, currentPage - 1);
      } else if (page === 'next') {
        currentPage = Math.min(getTotalPages(), currentPage + 1);
      } else {
        currentPage = parseInt(page);
      }
      renderServices();
      window.scrollTo({ top: servicesGrid.offsetTop - 150, behavior: 'smooth' });
    }
  });
}

// Filter and Sort
function filterAndRender() {
  // Filter by search
  filteredServices = servicesData.filter(service => {
    const matchesSearch = !searchQuery || 
      service.title.toLowerCase().includes(searchQuery) ||
      service.description.toLowerCase().includes(searchQuery) ||
      service.tags.some(tag => tag.includes(searchQuery));
    
    const matchesFilter = currentFilter === 'all' || 
      service.tags.includes(currentFilter);
    
    return matchesSearch && matchesFilter;
  });

  // Sort
  if (currentSort === 'newest') {
    filteredServices.sort((a, b) => b.year - a.year || a.order - b.order);
  } else if (currentSort === 'duration') {
    filteredServices.sort((a, b) => {
      const getDuration = (str) => parseInt(str.split('-')[0]);
      return getDuration(a.duration) - getDuration(b.duration);
    });
  } else {
    filteredServices.sort((a, b) => a.order - b.order);
  }

  renderServices();
}

// Render Services
function renderServices() {
  if (!servicesGrid) return;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageServices = filteredServices.slice(start, end);

  if (pageServices.length === 0) {
    servicesGrid.innerHTML = '';
    noResults.hidden = false;
    pagination.hidden = true;
    return;
  }

  noResults.hidden = true;
  pagination.hidden = filteredServices.length <= itemsPerPage;

  servicesGrid.innerHTML = pageServices.map((service, index) => `
    <article class="service-card" style="animation-delay: ${index * 0.1}s">
      <div class="service-card-icon">
        ${icons[service.icon] || icons.building}
      </div>
      <span class="service-card-year">${service.year}</span>
      <h3 class="service-card-title">${service.title}</h3>
      <p class="service-card-desc">${service.description}</p>
      <div class="service-card-tags">
        ${service.tags.map(tag => `<span class="service-tag">${tag}</span>`).join('')}
      </div>
      <a href="/service-${service.slug}.html" class="service-card-cta" aria-label="Learn more about ${service.title}">
        Learn more ${icons.arrow}
      </a>
    </article>
  `).join('');

  // Trigger animation
  requestAnimationFrame(() => {
    servicesGrid.querySelectorAll('.service-card').forEach(card => {
      card.classList.add('visible');
    });
  });

  renderPagination();
}

// Render Pagination
function renderPagination() {
  const totalPages = getTotalPages();
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  let html = `
    <button class="pagination-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous page">
      ← Prev
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `
        <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}">
          ${i}
        </button>
      `;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += '<span class="pagination-ellipsis">...</span>';
    }
  }

  html += `
    <button class="pagination-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next page">
      Next →
    </button>
  `;

  pagination.innerHTML = html;
}

function getTotalPages() {
  return Math.ceil(filteredServices.length / itemsPerPage);
}

// Scroll Effects
function initScrollEffects() {
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Filter bar shadow
    if (filterBar) {
      filterBar.classList.toggle('scrolled', currentScroll > 200);
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

// Intersection Observer for animations
function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.service-card, .feature-item, .benefit-item, .timeline-item').forEach(el => {
    observer.observe(el);
  });
}

// Utility: Debounce
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Modal functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    trapFocus(modal);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Focus Trap
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  firstFocusable?.focus();

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(element.id);
      return;
    }

    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable?.focus();
        e.preventDefault();
      }
    }
  });
}

// Form Validation
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('[required]');
  
  inputs.forEach(input => {
    const error = input.parentElement.querySelector('.form-error');
    
    if (!input.value.trim()) {
      input.classList.add('error');
      if (error) error.textContent = 'This field is required';
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      input.classList.add('error');
      if (error) error.textContent = 'Please enter a valid email';
      isValid = false;
    } else {
      input.classList.remove('error');
      if (error) error.textContent = '';
    }
  });
  
  return isValid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Expose functions globally for inline handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.validateForm = validateForm;
