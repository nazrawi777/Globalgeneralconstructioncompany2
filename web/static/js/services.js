/**
 * Grade-1 Construction - Services JavaScript
 * Vanilla JS for search, filter, sort, pagination, and interactions
 */

// Services Data
// Services Data (your original 5 + 5 new ones)
const servicesData = [
  {
    id: 1,
    slug: 'commercial-construction-management-2026',
    title: 'Commercial & Institutional Construction Management',
    description: 'Complete project management for commercial and institutional buildings across Addis Ababa and Ethiopia. Grade-1 contract compliance, schedule control, cost management and on-site supervision.',
    tags: ['commercial', 'institutional', 'project-management'],
    year: 'Core Service',
    duration: '6–18 months',
    icon: 'building',
    order: 1
  },
  {
    id: 2,
    slug: 'residential-renovation-remodeling-2026',
    title: 'Residential Renovation & Remodeling',
    description: 'Quality residential upgrades and renovations using local materials and skilled trades. Works include structural repairs, finishes, electrical and plumbing to meet local codes and client requirements.',
    tags: ['residential', 'renovation', 'finishes'],
    year: 'Local Works',
    duration: '2–6 months',
    icon: 'home',
    order: 2
  },
  {
    id: 3,
    slug: 'structural-engineering-reinforcement-2026',
    title: 'Structural Engineering & Reinforcement',
    description: 'Structural assessment, design and reinforcement for buildings and infrastructure. Includes analysis, retrofitting, rebar works and site testing to ensure long-term safety and compliance.',
    tags: ['structural', 'engineering', 'safety'],
    year: 'Specialist',
    duration: '1–4 months',
    icon: 'structure',
    order: 3
  },
  {
    id: 4,
    slug: 'sustainable-building-retrofit-2026',
    title: 'Sustainable Building & Retrofit Solutions',
    description: 'Energy-efficient retrofits, insulation, and sustainable site practices that reduce operating cost and environmental impact. We apply modern techniques suited to Ethiopia’s climate and client goals.',
    tags: ['sustainable', 'retrofit', 'efficiency'],
    year: 'Sustainability',
    duration: '2–8 months',
    icon: 'leaf',
    order: 4
  },
  {
    id: 5,
    slug: 'site-development-civil-works-2026',
    title: 'Site Development & Civil Works',
    description: 'Earthworks, site preparation, drainage, culverts and infrastructure for roads and building sites. Delivered with our own fleet of heavy machinery and experienced operators.',
    tags: ['site', 'civil', 'infrastructure'],
    year: 'Infrastructure',
    duration: '3–12 months',
    icon: 'road',
    order: 5
  },
  {
    id: 6,
    slug: 'concrete-foundation-pouring-2026',
    title: 'Concrete Foundations & Pouring',
    description: 'Professional concrete mixing, forming, pouring and curing for foundations, slabs and structural elements. QA-tested mixes and on-site concrete testing ensure durability and compliance.',
    tags: ['concrete', 'foundation', 'QA'],
    year: 'Foundations',
    duration: '1–3 months',
    icon: 'cube',
    order: 6
  },
  {
    id: 7,
    slug: 'roofing-installation-waterproofing-2026',
    title: 'Roofing Installation & Waterproofing',
    description: 'Supply and installation of robust roofing systems and membrane waterproofing designed for long service life and protection against local weather conditions.',
    tags: ['roofing', 'waterproofing', 'protection'],
    year: 'Building Envelope',
    duration: '1–4 months',
    icon: 'roof',
    order: 7
  },
  {
    id: 8,
    slug: 'electrical-systems-installation-2026',
    title: 'Electrical Systems Installation',
    description: 'Complete electrical systems: distribution, lighting, earthing, and generator integration. Works follow national electrical standards and are tested for safety and reliability.',
    tags: ['electrical', 'power', 'safety'],
    year: 'Services',
    duration: '2–5 months',
    icon: 'flash',
    order: 8
  },
  {
    id: 9,
    slug: 'plumbing-hvac-systems-2026',
    title: 'Plumbing, Water Supply & HVAC Systems',
    description: 'Design and installation of water supply, sewerage, reservoirs, piping and HVAC systems. We deliver end-to-end solutions demonstrated in completed municipal water projects.',
    tags: ['water', 'plumbing', 'hvac'],
    year: 'Utilities',
    duration: '2–6 months',
    icon: 'water',
    order: 9
  },
  {
    id: 10,
    slug: 'interior-finishing-carpentry-2026',
    title: 'Interior Finishing & Carpentry',
    description: 'High-quality finishes: plastering, painting, flooring, and custom carpentry. We provide polished interior spaces to meet client specifications for commercial and residential projects.',
    tags: ['interior', 'finishing', 'carpentry'],
    year: 'Finishes',
    duration: '2–5 months',
    icon: 'roller',
    order: 10
  }
];

// Icons SVG (unchanged from your file)
const icons = {
   building: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B3D91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2-icon lucide-building-2"><path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C75B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
  structure: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-form-icon lucide-form"><path d="M4 14h6"/><path d="M4 2h10"/><rect x="4" y="18" width="16" height="4" rx="1"/><rect x="4" y="6" width="16" height="4" rx="1"/></svg>`,
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F9D58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-leaf-icon lucide-leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  road: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-route-icon lucide-route"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>`,
  cube: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers-icon lucide-layers"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>`,
  roof: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-school-icon lucide-school"><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M18 5v16"/><path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6"/><path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11"/><path d="M6 5v16"/><circle cx="12" cy="9" r="2"/></svg>`,
  flash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plug-zap-icon lucide-plug-zap"><path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/><path d="m2 22 3-3"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/><path d="m18 3-4 4h6l-4 4"/></svg>`,
  water: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waves-icon lucide-waves"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`,
  roller: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paint-roller-icon lucide-paint-roller"><rect width="16" height="6" x="2" y="2" rx="2"/><path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect width="4" height="6" x="8" y="16" rx="1"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`


};


// State
let currentPage = 1;
const itemsPerPage = 8;
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
      <a href="contact.html" class="service-card-cta" aria-label="Contact us about ${service.title}">
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
