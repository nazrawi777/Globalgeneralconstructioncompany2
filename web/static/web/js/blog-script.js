/**
 * 2050 Blog - Minimal JavaScript
 * Pure vanilla JS, no frameworks
 */

/* =========================
   IMAGE HELPER (accepts external URL or local filename)
   - No fallback guessing. Use direct Unsplash CDN URLs you provided.
========================= */
function resolveThumbnail(thumbnail) {
  if (!thumbnail) return '';
  return (typeof thumbnail === 'string' && thumbnail.startsWith('http'))
    ? thumbnail
    : `/assets/blog/${thumbnail}`;
}

/* =========================
   POSTS DATA (thumbnails updated to the direct images you gave)
========================= */
const posts = [
  {
    id: 1,
    slug: 'national-palace-restoration-2024',
    title: 'Restoring the National Palace: Lessons from Phase I',
    description: 'Detailed case study of the National Palace Phase I restoration covering contract execution, heritage-sensitive quality control, phased handovers, and multi-stakeholder coordination under strict security. Demonstrates how disciplined project management delivered culturally sensitive outcomes on schedule and to client standards.',
    fullContent: `
    <h2>Scope & Challenges</h2>
    <p>Works included fence and site restoration, fountain area pavement repair, retaining wall stabilization and utility building renovations. High security, heritage sensitivity, and phased handovers were critical constraints.</p>

    <h3>Key Measures</h3>
    <ul>
      <li>Dedicated heritage liaison for daily approvals</li>
      <li>Non-destructive testing and documented QA checkpoints</li>
      <li>Strict site segregation to protect public access</li>
    </ul>

    <h2>Outcomes</h2>
    <p>Project completed with official certificate of satisfactory performance and positive client feedback. Lessons learned improved our approach to complex public projects and informed HSE protocols for future restorations.</p>`,
    category: 'Projects',
    date: '2024-07-18',
    readingTime: 5,
    author: 'Eng. Kedir Hassen',
    thumbnail: 'https://i.postimg.cc/FzDp3mLd/Palacio-Nacional-residencia-oficial-do-presidente-da-Etiopia.jpg',
    mediaType: 'image',
    media: ['national-palace-1.jpg']
  },

  {
    id: 2,
    slug: 'bim-surveying-digital-construction-2024',
    title: 'Digital Construction: BIM, Surveying & Project Controls',
    description: 'How Building Information Modeling, modern surveying and robust project controls improved schedule predictability, reduced on-site rework and sped up payment verification across multi-site road and building contracts—delivering measurable savings in time and materials.',
    fullContent: `
    <h2>What Changed</h2>
    <p>Centralized models, weekly coordination cycles, and cloud-based documentation reduced RFI turnaround and cut on-site rework.</p>

    <h3>Benefits</h3>
    <ul>
      <li>Improved clash detection before construction</li>
      <li>Faster quantity verification for payments</li>
      <li>Better coordination between subcontractors and client stakeholders</li>
    </ul>`,
    category: 'Technology',
    date: '2024-10-12',
    readingTime: 4,
    author: 'PMO Team - Global General Construction',
    thumbnail: 'https://i.postimg.cc/N057RgP7/202211.jpg',
    mediaType: 'image',
    media: ['bim-1.jpg', 'survey-1.jpg']
  },

  {
    id: 3,
    slug: 'jimma-corridor-green-works-2024',
    title: 'Jimma Corridor: Walkways, Bike Lanes & Urban Greening',
    description: 'Comprehensive summary of the Jimma corridor upgrade detailing integrated walkways, dedicated bike lanes, smart pole lighting and urban greening — designed to improve mobility, pedestrian safety and public space usability while lowering long-term maintenance costs.',
    fullContent: `
    <h2>Design Approach</h2>
    <p>Combining durable paving, low-maintenance planting, and LED smart poles allowed long-term cost savings and greater public use.</p>

    <h3>Community Impact</h3>
    <ul>
      <li>Safer pedestrian routes and clearer bike lanes</li>
      <li>Reduced nighttime crime through better lighting</li>
      <li>Lower maintenance with native plant species</li>
    </ul>`,
    category: 'Sustainability',
    date: '2024-06-05',
    readingTime: 5,
    author: 'Project Team - Jimma Works',
    thumbnail: 'https://i.postimg.cc/HsNFMb5P/corriderjimma.jpg',
    mediaType: 'image',
    media: ['jimma-corridor-1.jpg']
  },

  {
    id: 4,
    slug: 'water-infrastructure-resilience-2023',
    title: 'Construction Resilience: Reservoirs, Pipes and Flood Prevention',
    description: 'Technical overview of major construction works, covering earthworks, structural concrete, foundations, drainage systems and coordinated site execution methods that improve build quality, reduce delays and ensure long-term performance of infrastructure projects.',
    fullContent: `
    <h2>Technical Notes</h2>
    <p>Coordination with utilities, trenchless pipeline methods where appropriate, and staged reservoir commissioning reduced disruption to local services.</p>

    <h3>Testing & Commissioning</h3>
    <ul>
      <li>Hydrostatic testing of mains and laterals</li>
      <li>Reservoir linings and overflow control checks</li>
      <li>As-built documentation to handover standards</li>
    </ul>`,
    category: 'Water',
    date: '2024-04-22',
    readingTime: 6,
    author: 'Civil Works Team',
    thumbnail: 'https://i.postimg.cc/prTFMkbK/202512.jpg',
    mediaType: 'image',
    media: ['water-works-1.jpg']
  },

  {
    id: 5,
    slug: '2b-g-15-tower-case-study-2024',
    title: 'High-Rise Delivery: Case Study of a 2B+G+15 Building',
    description: 'Practical case study on delivering a 2B+G+15 reinforced concrete building in a constrained urban site. Covers program management, logistics, off-site batching, tower crane sequencing and quality checkpoints used to control risk and maintain the critical path.',
    fullContent: `
    <h2>Logistics & Staging</h2>
    <p>Off-site batching, staged deliveries, and tower crane optimization reduced downtime and kept the critical path intact.</p>

    <h3>Quality Control</h3>
    <ul>
      <li>Frequent cube testing and mix verification</li>
      <li>Rebar traceability and bending schedules</li>
      <li>Facade mockups and acceptance tests</li>
    </ul>`,
    category: 'Projects',
    date: '2024-09-02',
    readingTime: 7,
    author: 'Site Engineering Lead',
    thumbnail: 'https://i.postimg.cc/D086rHdB/Megenagna-Skyline-Addis-Ababa-(2).jpg',
    mediaType: 'image',
    media: ['tower-1.jpg', 'concrete-1.jpg']
  },

  {
    id: 6,
    slug: 'hse-best-practices-construction-2024',
    title: 'HSE: Safety Systems That Keep Sites Productive',
    description: 'Overview of our HSE framework — from daily toolbox talks and site inductions to permit-to-work procedures and equipment inspections — showing how consistent safety practices reduce incidents, support workforce competence and sustain productivity across projects.',
    fullContent: `
    <h2>Practical Interventions</h2>
    <ul>
      <li>Daily toolbox talks and documented inductions</li>
      <li>Permit to work systems for risky tasks</li>
      <li>Regular equipment inspections and competence checks</li>
    </ul>

    <h3>Measuring Success</h3>
    <p>KPIs include lost-time injury frequency, near-miss reporting rates, and timely corrective action closure.</p>`,
    category: 'Safety',
    date: '2024-03-10',
    readingTime: 4,
    author: 'HSE Manager',
    thumbnail: 'https://i.postimg.cc/PJxt5Rqh/202312.jpg',
    mediaType: 'image',
    media: ['hse-1.jpg']
  },

  {
    id: 7,
    slug: 'earthworks-foundations-best-practices-2024',
    title: 'Earthworks & Foundations: Efficient Excavation and Soil Management',
    description: 'Practical guidance on earthworks sequencing, soil classification, stabilization techniques, compaction control and dewatering strategies used on major road and building sites to prevent settlement and protect long-term structural performance.',
    fullContent: `
    <h2>Key Practices</h2>
    <ul>
      <li>Soil classification and testing before construction</li>
      <li>Layered compaction with documented density tests</li>
      <li>Dewatering plans and temporary support systems</li>
    </ul>`,
    category: 'Infrastructure',
    date: '2024-05-28',
    readingTime: 6,
    author: 'Geotech Team',
    thumbnail: 'https://i.postimg.cc/9fQVpkGD/202413.jpg',
    mediaType: 'image',
    media: ['earthworks-1.jpg']
  },

  {
    id: 8,
    slug: 'low-carbon-materials-bio-cement-2024',
    title: 'Low-Carbon Materials: Bio-Cement and Sustainable Mixes',
    description: 'Review of low-carbon concrete mixes and bio-cement trials that reduce embodied emissions while maintaining durability. Covers trial methodology, performance monitoring and early results relevant to infrastructure and durable works.',
    fullContent: `
    <h2>Trials & Results</h2>
    <ul>
      <li>Blended cements with supplementary cementitious material (SCMs)</li>
      <li>Use of recycled aggregates in non-structural elements</li>
      <li>Monitoring for long-term strength and durability</li>
    </ul>`,
    category: 'Sustainability',
    date: '2024-08-14',
    readingTime: 5,
    author: 'Materials Team',
    thumbnail: 'https://i.postimg.cc/6QbZ66Fd/download-(3).jpg',
    mediaType: 'image',
    media: ['materials-1.jpg']
  }
];


/* =========================
   CATEGORIES
========================= */
const categories = [
  { id: 'all', name: 'All', count: posts.length },
  { id: 'projects', name: 'Projects', count: posts.filter(p => p.category === 'Projects').length },
  { id: 'technology', name: 'Technology', count: posts.filter(p => p.category === 'Technology').length },
  { id: 'sustainability', name: 'Sustainability', count: posts.filter(p => p.category === 'Sustainability').length },
  { id: 'water', name: 'Construction', count: posts.filter(p => p.category === 'Water').length },
  { id: 'safety', name: 'Safety', count: posts.filter(p => p.category === 'Safety').length },
  { id: 'infrastructure', name: 'Infrastructure', count: posts.filter(p => p.category === 'Infrastructure').length }
];


/* =========================
   STATE
========================= */
let currentCategory = 'all';
let currentSort = 'newest';
let searchQuery = '';
let currentPage = 1;
const postsPerPage = 6;

/* =========================
   DOM Elements
========================= */
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const categoriesContainer = document.getElementById('categoriesContainer');
const postsGrid = document.getElementById('postsGrid');
const paginationContainer = document.getElementById('paginationContainer');
const keyboardHint = document.getElementById('keyboardHint');

/* =========================
   INIT
========================= */
function init() {
  renderCategories();
  renderPosts();
  setupEventListeners();
  setupKeyboardShortcuts();
}

/* =========================
   RENDER CATEGORIES
========================= */
function renderCategories() {
  if (!categoriesContainer) return;
  
  categoriesContainer.innerHTML = categories.map(cat => `
    <button 
      class="category-btn ${cat.id === currentCategory ? 'active' : ''}"
      data-category="${cat.id}"
      aria-pressed="${cat.id === currentCategory}"
    >
      ${cat.name}<span class="count">(${cat.count})</span>
    </button>
  `).join('');
}

/* =========================
   FILTER & SORT
========================= */
function getFilteredPosts() {
  let filtered = [...posts];
  
  // Filter by category
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory);
  }
  
  // Filter by search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.author.toLowerCase().includes(query)
    );
  }
  
  // Sort
  switch (currentSort) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'reading-time':
      filtered.sort((a, b) => a.readingTime - b.readingTime);
      break;
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }
  
  return filtered;
}

/* =========================
   FORMAT DATE
========================= */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/* =========================
   RENDER POSTS (uses resolveThumbnail)
========================= */
function renderPosts() {
  if (!postsGrid) return;
  
  const filtered = getFilteredPosts();
  const totalPages = Math.ceil(filtered.length / postsPerPage);
  
  // Adjust current page if needed
  if (currentPage > totalPages) currentPage = Math.max(1, totalPages);
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filtered.slice(startIndex, startIndex + postsPerPage);
  
  if (paginatedPosts.length === 0) {
    postsGrid.innerHTML = `
      <div class="no-results">
        <h3>No posts found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    `;
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }
  
  postsGrid.innerHTML = paginatedPosts.map(post => {
    const imgSrc = resolveThumbnail(post.thumbnail);
    return `
    <article class="post-card" data-post-id="${post.id}">
      <div class="post-thumbnail">
        <img 
          src="${imgSrc}" 
          alt="${post.title}"
          loading="lazy"
          onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 250%22><rect fill=%22%231a1a1f%22 width=%22400%22 height=%22250%22/><text x=%22200%22 y=%22125%22 text-anchor=%22middle%22 fill=%22%23666%22 font-family=%22sans-serif%22>Image</text></svg>'"
        >
        <span class="post-category-badge">${post.category}</span>
      </div>
      <div class="post-content">
        <div class="post-meta">
          <time datetime="${post.date}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${formatDate(post.date)}
          </time>
          <span class="reading-time">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${post.readingTime} min read
          </span>
        </div>
        <h2 class="post-title">
          <a href="/post-${post.slug}.html">${post.title}</a>
        </h2>
        <p class="post-description collapsed" id="desc-${post.id}">${post.description}</p>
        <div class="post-footer">
          <button 
            class="toggle-description" 
            aria-expanded="false"
            aria-controls="desc-${post.id}"
            data-post-id="${post.id}"
          >
            <span>Show more</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
  }).join('');
  
  renderPagination(totalPages);
}

/* =========================
   RENDER PAGINATION
========================= */
function renderPagination(totalPages) {
  if (!paginationContainer || totalPages <= 1) {
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }
  
  let buttons = [];
  
  // Previous button
  buttons.push(`
    <button class="page-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous page">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
  `);
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      buttons.push(`
        <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}" ${i === currentPage ? 'aria-current="page"' : ''}>
          ${i}
        </button>
      `);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      buttons.push(`<span class="page-btn" style="pointer-events: none;">...</span>`);
    }
  }
  
  // Next button
  buttons.push(`
    <button class="page-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next page">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  `);
  
  paginationContainer.innerHTML = buttons.join('');
}

/* =========================
   EVENT LISTENERS
========================= */
function setupEventListeners() {
  // Search
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      searchQuery = e.target.value;
      currentPage = 1;
      renderPosts();
    }, 300));
  }
  
  // Sort
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      currentPage = 1;
      renderPosts();
    });
  }
  
  // Categories
  if (categoriesContainer) {
    categoriesContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.category-btn');
      if (btn) {
        currentCategory = btn.dataset.category;
        currentPage = 1;
        renderCategories();
        renderPosts();
      }
    });
  }
  
  // Pagination
  if (paginationContainer) {
    paginationContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.page-btn');
      if (btn && !btn.disabled) {
        const page = btn.dataset.page;
        if (page === 'prev') {
          currentPage = Math.max(1, currentPage - 1);
        } else if (page === 'next') {
          currentPage = currentPage + 1;
        } else {
          currentPage = parseInt(page);
        }
        renderPosts();
        window.scrollTo({ top: postsGrid.offsetTop - 100, behavior: 'smooth' });
      }
    });
  }
  
  // Toggle description (delegated)
  if (postsGrid) {
    postsGrid.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.toggle-description');
      if (toggleBtn) {
        const postId = toggleBtn.dataset.postId;
        const desc = document.getElementById(`desc-${postId}`);
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        toggleBtn.querySelector('span').textContent = isExpanded ? 'Show more' : 'Show less';
        
        if (isExpanded) {
          desc.classList.add('collapsed');
          desc.classList.remove('expanded');
        } else {
          desc.classList.remove('collapsed');
          desc.classList.add('expanded');
        }
      }
    });
  }
}

/* =========================
   KEYBOARD SHORTCUTS
========================= */
function setupKeyboardShortcuts() {
  let hintTimeout;
  
  document.addEventListener('keydown', (e) => {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch (e.key) {
      case '/':
        e.preventDefault();
        if (searchInput) searchInput.focus();
        break;
      case 'j':
      case 'ArrowDown':
        if (!e.target.closest('.posts-grid')) {
          e.preventDefault();
          navigateCards(1);
        }
        break;
      case 'k':
      case 'ArrowUp':
        if (!e.target.closest('.posts-grid')) {
          e.preventDefault();
          navigateCards(-1);
        }
        break;
      case '?':
        if (keyboardHint) {
          keyboardHint.classList.add('visible');
          clearTimeout(hintTimeout);
          hintTimeout = setTimeout(() => {
            keyboardHint.classList.remove('visible');
          }, 3000);
        }
        break;
      case 'Escape':
        if (keyboardHint) keyboardHint.classList.remove('visible');
        if (searchInput) searchInput.blur();
        break;
    }
  });
}

/* =========================
   NAVIGATE CARDS
========================= */
let focusedCardIndex = -1;

function navigateCards(direction) {
  const cards = document.querySelectorAll('.post-card');
  if (cards.length === 0) return;
  
  focusedCardIndex = Math.max(0, Math.min(cards.length - 1, focusedCardIndex + direction));
  
  cards.forEach((card, i) => {
    if (i === focusedCardIndex) {
      card.style.outline = '2px solid var(--accent)';
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      card.style.outline = '';
    }
  });
}

/* =========================
   UTILITIES
========================= */
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.classList.add('visible');
  
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3000);
}

/* =========================
   POST PAGE HELPERS (carousel, comments, share)
========================= */
function initPostPage() {
  setupCarousel();
  setupComments();
  setupShareButtons();
}

function setupCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  
  const inner = carousel.querySelector('.carousel-inner');
  const items = carousel.querySelectorAll('.carousel-item');
  const prevBtn = carousel.querySelector('[data-carousel="prev"]');
  const nextBtn = carousel.querySelector('[data-carousel="next"]');
  const indicator = carousel.querySelector('.carousel-indicator');
  
  let currentIndex = 0;
  const total = items.length;
  
  function updateCarousel() {
    inner.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (indicator) {
      indicator.textContent = `${currentIndex + 1} / ${total}`;
    }
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + total) % total;
      updateCarousel();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % total;
      updateCarousel();
    });
  }
  
  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + total) % total;
      updateCarousel();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % total;
      updateCarousel();
    }
  });
}

/* =========================
   COMMENTS (localStorage)
========================= */
function setupComments() {
  const commentsSection = document.querySelector('.comments-section');
  if (!commentsSection) return;
  
  const postSlug = window.location.pathname.split('/').pop().replace('.html', '');
  const storageKey = `comments_${postSlug}`;
  
  const commentForm = commentsSection.querySelector('.comment-form');
  const commentInput = commentsSection.querySelector('.comment-input');
  const commentsList = commentsSection.querySelector('.comments-list');
  const commentsCount = commentsSection.querySelector('.comments-count');
  
  function getComments() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  }
  
  function saveComments(comments) {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }
  
  function renderComments() {
    const comments = getComments();
    
    if (commentsCount) {
      commentsCount.textContent = comments.length;
    }
    
    if (comments.length === 0) {
      commentsList.innerHTML = `
        <div class="no-comments">
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      `;
      return;
    }
    
    commentsList.innerHTML = comments.map(comment => `
      <div class="comment">
        <div class="comment-header">
          <div class="comment-avatar">${comment.author.charAt(0).toUpperCase()}</div>
          <div>
            <div class="comment-author">${comment.author}</div>
            <div class="comment-date">${formatDate(comment.date)}</div>
          </div>
        </div>
        <div class="comment-body">${escapeHtml(comment.text)}</div>
      </div>
    `).join('');
  }
  
  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const text = commentInput.value.trim();
      if (!text) return;
      
      const comments = getComments();
      comments.unshift({
        id: Date.now(),
        author: 'Anonymous Reader',
        text: text,
        date: new Date().toISOString().split('T')[0]
      });
      
      saveComments(comments);
      commentInput.value = '';
      renderComments();
      showToast('Comment added successfully!');
    });
  }
  
  renderComments();
}

/* =========================
   SHARE BUTTONS
========================= */
function setupShareButtons() {
  const copyBtn = document.querySelector('.copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        copyBtn.classList.add('copied');
        copyBtn.querySelector('span').textContent = 'Copied!';
        showToast('Link copied to clipboard!');
        
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.querySelector('span').textContent = 'Copy link';
        }, 2000);
      });
    });
  }
  
  // Share buttons
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.dataset.platform;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      
      let shareUrl;
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
}

/* =========================
   ESCAPE HTML
========================= */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* =========================
   INIT ON DOM READY
========================= */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('postsGrid')) {
    init();
  } else if (document.querySelector('.post-page')) {
    initPostPage();
  }
});

/* =========================
   EXPORTED UTILITIES FOR POST PAGES
========================= */
window.blogUtils = {
  posts,
  formatDate,
  showToast,
  escapeHtml
};
