/**
 * 2050 Blog - Minimal JavaScript
 * Pure vanilla JS, no frameworks
 */

// Posts data
const posts = [
  {
    id: 1,
    slug: 'quantum-foundations-2050',
    title: 'Quantum-Reinforced Foundations Transform Skyscraper Construction',
    description: 'Revolutionary quantum-lattice concrete enables buildings to self-heal micro-fractures using embedded nanobots. The technology reduces maintenance costs by 94% while extending structural lifespan to over 500 years. Major cities worldwide are now mandating Q-concrete for all new high-rise developments.',
    fullContent: `The construction industry has witnessed its most significant breakthrough since the invention of steel reinforcement. Quantum-reinforced foundations, utilizing entangled particle matrices, are revolutionizing how we approach structural engineering in 2050.

    <h2>The Science Behind Q-Concrete</h2>
    <p>Unlike traditional concrete that relies purely on chemical bonding, quantum-lattice concrete incorporates billions of nanoscale quantum dots that maintain coherent states even at room temperature. These dots communicate instantaneously across the structure, detecting stress points before visible damage occurs.</p>

    <h3>Self-Healing Capabilities</h3>
    <p>When micro-fractures begin to form, embedded nanobots—powered by ambient thermal energy—automatically migrate to the affected area. They secrete a bio-mineral compound that not only fills the gap but actually strengthens the surrounding matrix.</p>

    <blockquote>We're not just building structures anymore; we're growing them. — Dr. Helena Vasquez, Lead Researcher at QuantumBuild Labs</blockquote>

    <h2>Economic Impact</h2>
    <p>The 94% reduction in maintenance costs has made previously unfeasible mega-projects economically viable. The upcoming Transpacific Bridge, connecting Japan to California, would have been impossible without this technology.</p>

    <ul>
      <li>Initial construction costs: 15% higher than traditional methods</li>
      <li>Lifetime cost savings: Estimated 400% ROI over 100 years</li>
      <li>Environmental benefit: 67% less material waste</li>
    </ul>`,
    category: 'Construction',
    date: '2050-03-15',
    readingTime: 8,
    author: 'Dr. Marcus Chen',
    thumbnail: 'construction-1.jpg',
    mediaType: 'video',
    media: ['construction-1.mp4', 'construction-2.mp4', 'construction-3.mp4']
  },
  {
    id: 2,
    slug: 'neural-architecture-ai',
    title: 'Neural Architecture: When AI Designs Our Living Spaces',
    description: 'Machine learning algorithms now generate building designs that optimize for human wellbeing metrics we never knew existed. Studies show occupants of AI-designed spaces report 73% higher life satisfaction and 45% improved cognitive performance compared to traditional architecture.',
    fullContent: `Artificial intelligence has moved beyond assisting architects to becoming the primary creative force in spatial design. Neural architecture systems process millions of biometric data points to create environments that actively enhance human cognition and emotional wellbeing.

    <h2>Beyond Aesthetics</h2>
    <p>Traditional architecture prioritized visual appeal and functional requirements. Neural architecture systems consider over 2,000 variables including circadian rhythm optimization, acoustic psychology, and even the subtle effects of electromagnetic field patterns on neural activity.</p>

    <h3>Biometric Feedback Loops</h3>
    <p>Modern buildings equipped with neural architecture continuously adapt. Ceiling heights subtly adjust throughout the day, wall colors shift imperceptibly to match occupant mood states, and ventilation patterns create micro-climates that optimize for the specific activities occurring in each zone.</p>

    <h2>Case Study: The Harmony Complex</h2>
    <p>Singapore's Harmony Complex, completed in 2049, serves as the flagship example of neural architecture. Its 50,000 residents experience:</p>
    <ul>
      <li>31% reduction in stress-related health issues</li>
      <li>28% improvement in sleep quality</li>
      <li>45% increase in reported creative output</li>
    </ul>`,
    category: 'Technology',
    date: '2050-02-28',
    readingTime: 6,
    author: 'Sofia Martinez',
    thumbnail: 'tech-1.jpg',
    mediaType: 'image',
    media: ['tech-1.jpg', 'tech-2.jpg', 'tech-3.jpg', 'tech-4.jpg']
  },
  {
    id: 3,
    slug: 'vertical-forests-megacities',
    title: 'Vertical Forests: How Megacities Achieved Net-Negative Carbon',
    description: 'The integration of bio-engineered super-trees into urban infrastructure has allowed cities like Neo-Tokyo and Greater Lagos to absorb more carbon than they produce. Each vertical forest tower processes 50,000 tons of CO2 annually while providing habitat for 300+ species.',
    fullContent: `The vertical forest movement that began in Milan in 2014 has evolved into a cornerstone of urban environmental policy. Today's bio-engineered structures bear little resemblance to their predecessors, incorporating genetic modifications that amplify photosynthetic efficiency by 400%.

    <h2>Engineering Super-Trees</h2>
    <p>Modern vertical forest trees are marvels of synthetic biology. Their modified chloroplasts capture carbon with unprecedented efficiency, while engineered root systems extract heavy metals and microplastics from urban air and water systems.</p>

    <h3>The Living Building Concept</h3>
    <p>These aren't buildings with plants attached—they're symbiotic organisms where the botanical and architectural elements are inseparable. The trees provide structural support through their root networks, while the building's systems deliver precisely calibrated nutrients and growth hormones.</p>

    <blockquote>We stopped thinking of buildings as machines and started thinking of them as ecosystems. — Architect Kenji Yamamoto</blockquote>`,
    category: 'Sustainability',
    date: '2050-02-15',
    readingTime: 7,
    author: 'Dr. Amara Okonkwo',
    thumbnail: 'sustainability-1.jpg',
    mediaType: 'video',
    media: ['sustainability-1.mp4', 'sustainability-2.mp4']
  },
  {
    id: 4,
    slug: 'floating-districts-rising-seas',
    title: 'Floating Districts: Urban Planning for Rising Seas',
    description: 'Coastal cities are deploying modular floating neighborhoods that rise with sea levels while maintaining full utility connectivity. Rotterdam\'s New Venice district now houses 2 million residents on an interconnected network of buoyant platforms spanning 50 square kilometers.',
    fullContent: `As sea levels rose faster than even pessimistic models predicted, coastal cities faced an existential choice: retreat or adapt. The development of floating district technology has transformed this crisis into an opportunity for radical urban innovation.

    <h2>Modular Aquatic Urbanism</h2>
    <p>Modern floating districts aren't houseboats—they're fully-featured urban environments built on massive interconnected platforms. Each hexagonal module spans 500 meters and can support buildings up to 40 stories, connected by flexible bridges that accommodate wave motion.</p>

    <h3>Utility Networks</h3>
    <p>Flexible conduit systems deliver power, water, and data to floating modules through articulated connections that withstand constant movement. Waste processing occurs on-platform using closed-loop bioreactors that convert organic matter into energy and fertilizer.</p>

    <h2>Social Dynamics</h2>
    <p>Floating communities have developed unique social structures. Platform proximity can be reconfigured, allowing neighborhoods to reorganize based on changing community preferences. This "liquid urbanism" has created unprecedented flexibility in how residents experience city life.</p>`,
    category: 'Urbanism',
    date: '2050-01-30',
    readingTime: 9,
    author: 'Dr. Henrik van der Berg',
    thumbnail: 'urbanism-1.jpg',
    mediaType: 'image',
    media: ['urbanism-1.jpg', 'urbanism-2.jpg', 'urbanism-3.jpg']
  },
  {
    id: 5,
    slug: '3d-printed-housing-crisis',
    title: '3D-Printed Housing Solves the Last Urban Housing Crisis',
    description: 'Autonomous construction swarms can now print a complete family home in under 4 hours using locally-sourced recycled materials. Housing costs have dropped 89% in participating cities, effectively eliminating homelessness in developed nations by 2048.',
    fullContent: `The housing affordability crisis that defined the early 21st century has been resolved through a combination of autonomous manufacturing and radical material innovation. What once took months and hundreds of thousands of dollars now requires hours and minimal resources.

    <h2>The Swarm Approach</h2>
    <p>Rather than single large printers, modern construction uses swarms of thousands of small robots working in parallel. Each unit carries its own material supply and coordinates with others through mesh networking to build structures with atomic precision.</p>

    <h3>Material Revolution</h3>
    <p>Construction bots use locally-available materials—recycled plastics, agricultural waste, even atmospheric carbon—transformed into structural composites through portable fusion reactors. A home in Mumbai might be built from rice husks, while one in São Paulo uses sugarcane bagasse.</p>

    <ul>
      <li>Average construction time: 3.7 hours for a 150m² home</li>
      <li>Material cost: $2,400 USD equivalent</li>
      <li>Structural lifespan: 200+ years with self-repair capabilities</li>
    </ul>`,
    category: 'Construction',
    date: '2050-01-15',
    readingTime: 5,
    author: 'Engineer Rosa Delgado',
    thumbnail: 'construction-2.jpg',
    mediaType: 'video',
    media: ['construction-4.mp4', 'construction-5.mp4', 'construction-6.mp4']
  },
  {
    id: 6,
    slug: 'brain-building-interfaces',
    title: 'Brain-Building Interfaces: Controlling Your Home with Thought',
    description: 'Non-invasive neural interfaces now allow residents to control every aspect of their living environment through directed intention. Temperature, lighting, entertainment, and even furniture configuration respond to mental commands with 99.7% accuracy.',
    fullContent: `The dream of thought-controlled environments has become reality through advances in non-invasive brain-computer interfaces. Modern homes equipped with neural mesh technology respond to occupant intentions as naturally as our bodies respond to our thoughts.

    <h2>How It Works</h2>
    <p>Ultra-sensitive electromagnetic sensors embedded in walls and ceilings detect the unique patterns of neural activity associated with specific intentions. Machine learning systems trained on millions of hours of brain activity data interpret these signals with remarkable accuracy.</p>

    <h3>Beyond Convenience</h3>
    <p>The implications extend far beyond not having to reach for a light switch. Homes now anticipate needs—preparing coffee before you consciously realize you want it, adjusting room temperature based on approaching fever, or alerting emergency services when detecting stroke signatures.</p>

    <blockquote>The boundary between thought and environment has dissolved. Our homes have become extensions of our minds. — Dr. Yuki Tanaka, Neural Interface Pioneer</blockquote>`,
    category: 'Technology',
    date: '2050-01-08',
    readingTime: 6,
    author: 'Dr. Yuki Tanaka',
    thumbnail: 'tech-2.jpg',
    mediaType: 'image',
    media: ['tech-5.jpg', 'tech-6.jpg', 'tech-7.jpg', 'tech-8.jpg']
  },
  {
    id: 7,
    slug: 'underground-cities-expansion',
    title: 'Underground Cities: The Next Frontier of Urban Expansion',
    description: 'With surface land at a premium, cities are expanding downward. Montreal\'s Underground City now extends 12 levels deep, housing 500,000 permanent residents with full-spectrum lighting that perfectly mimics natural daylight cycles.',
    fullContent: `Subterranean urban development has evolved from emergency shelters and shopping malls into fully-realized cities beneath cities. Modern underground districts offer quality of life that rivals or exceeds surface living, while protecting residents from increasingly extreme weather events.

    <h2>Full-Spectrum Environments</h2>
    <p>The psychological challenges of underground living have been completely addressed through advanced lighting systems that replicate not just visible light but the full electromagnetic spectrum of natural sunlight. Residents experience normal circadian rhythms and vitamin D synthesis.</p>

    <h3>Climate-Controlled Paradise</h3>
    <p>Underground environments maintain perfect temperature and air quality regardless of surface conditions. During the extreme heat events of 2047, underground residents remained comfortable while surface temperatures exceeded 55°C.</p>

    <h2>Vertical Neighborhoods</h2>
    <p>Modern underground cities are organized as vertical neighborhoods, each level with its own character and amenities. Express elevators connect levels in seconds, while spiraling parks provide continuous green space from surface to deepest habitation level.</p>`,
    category: 'Urbanism',
    date: '2049-12-20',
    readingTime: 7,
    author: 'Urban Planner Marie Dubois',
    thumbnail: 'urbanism-2.jpg',
    mediaType: 'video',
    media: ['urbanism-3.mp4', 'urbanism-4.mp4']
  },
  {
    id: 8,
    slug: 'bio-cement-living-materials',
    title: 'Bio-Cement: Living Materials That Grow Stronger Over Time',
    description: 'Bacteria-infused building materials continue strengthening for decades after construction. Structures built with bio-cement in 2030 are now 340% stronger than when first constructed, fundamentally changing our understanding of architectural longevity.',
    fullContent: `Bio-cement represents a paradigm shift in construction materials—structures that are alive and continue developing long after construction crews have departed. This living building approach has rendered obsolete our traditional understanding of structural degradation.

    <h2>The Biology of Building</h2>
    <p>Bio-cement incorporates engineered bacteria that produce calcium carbonate as a metabolic byproduct. These organisms, dormant in the finished material, activate when micro-cracks form, depositing new mineral and actually strengthening the structure beyond its original capacity.</p>

    <h3>Generational Architecture</h3>
    <p>Buildings constructed with bio-cement are designed not for decades but for centuries. The Great Library of Alexandria II, opened in 2035, is expected to remain structurally sound for at least 1,000 years without major intervention.</p>

    <ul>
      <li>Initial strength: Comparable to traditional high-grade concrete</li>
      <li>20-year strength: 340% of original capacity</li>
      <li>Projected 100-year strength: 500%+ of original</li>
    </ul>

    <blockquote>We're not building for our children anymore—we're building for civilizations that don't exist yet. — Architect Chen Wei</blockquote>`,
    category: 'Sustainability',
    date: '2049-12-05',
    readingTime: 8,
    author: 'Dr. Chen Wei',
    thumbnail: 'sustainability-2.jpg',
    mediaType: 'image',
    media: ['sustainability-3.jpg', 'sustainability-4.jpg', 'sustainability-5.jpg']
  }
];

// Categories
const categories = [
  { id: 'all', name: 'All', count: posts.length },
  { id: 'construction', name: 'Construction', count: posts.filter(p => p.category === 'Construction').length },
  { id: 'technology', name: 'Technology', count: posts.filter(p => p.category === 'Technology').length },
  { id: 'urbanism', name: 'Urbanism', count: posts.filter(p => p.category === 'Urbanism').length },
  { id: 'sustainability', name: 'Sustainability', count: posts.filter(p => p.category === 'Sustainability').length }
];

// State
let currentCategory = 'all';
let currentSort = 'newest';
let searchQuery = '';
let currentPage = 1;
const postsPerPage = 6;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const categoriesContainer = document.getElementById('categoriesContainer');
const postsGrid = document.getElementById('postsGrid');
const paginationContainer = document.getElementById('paginationContainer');
const keyboardHint = document.getElementById('keyboardHint');

// Initialize
function init() {
  renderCategories();
  renderPosts();
  setupEventListeners();
  setupKeyboardShortcuts();
}

// Render categories
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

// Filter and sort posts
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

// Format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Render posts
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
  
  postsGrid.innerHTML = paginatedPosts.map(post => `
    <article class="post-card" data-post-id="${post.id}">
      <div class="post-thumbnail">
        <img 
          src="/assets/blog/${post.thumbnail}" 
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
          <a href="/post-${post.slug}.html" class="read-more-link">
            Read full post
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');
  
  renderPagination(totalPages);
}

// Render pagination
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

// Setup event listeners
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

// Keyboard shortcuts
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

// Navigate cards with keyboard
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

// Debounce utility
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Toast notification
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

// Post page specific functions
function initPostPage() {
  setupCarousel();
  setupComments();
  setupShareButtons();
}

// Carousel
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

// Comments (localStorage)
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

// Share buttons
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

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize based on page type
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('postsGrid')) {
    init();
  } else if (document.querySelector('.post-page')) {
    initPostPage();
  }
});

// Export for post pages
window.blogUtils = {
  posts,
  formatDate,
  showToast,
  escapeHtml
};
