/**
 * Ledger Flipbook - Static Financial Report
 * Vanilla JavaScript implementation - pixel-identical to React prototype
 */

// ============= FINANCIAL DATA =============
const financialYears = window.financialYearsData || [];
const projects = window.projectsData || [];

// ============= UTILITY FUNCTIONS =============
function formatCompactCurrency(value) {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2) + 'B ETB';
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M ETB';
  }
  return new Intl.NumberFormat('en-US').format(Math.round(value)) + ' ETB';
}

function getTotalValue() {
  return projects.reduce((sum, p) => sum + p.value, 0);
}

function getCompletedProjects() {
  return projects.filter(p => p.status === 'Completed');
}

function getOngoingProjects() {
  return projects.filter(p => p.status === 'Ongoing');
}

function getPriorityProjects() {
  return projects.filter(p => p.status === 'Priority');
}

function getOutstandingProjects() {
  return projects.filter(p => p.isOutstanding);
}

function getTurnoverGrowth() {
  const latest = financialYears[financialYears.length - 1].turnover;
  const previous = financialYears[financialYears.length - 2].turnover;
  return ((latest - previous) / previous * 100).toFixed(1);
}

// ============= STATE =============
let currentPage = 0;
let reducedMotion = false;

// ============= SVG ICONS =============
const icons = {
  eye: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>',
  chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  chevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  building2: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>',
  wallet: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>',
  barChart3: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16h8"/><path d="M7 11h12"/><path d="M7 6h3"/></svg>',
  checkCircle2: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  alertTriangle: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  pieChart: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>',
  bookOpen: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  printer: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>',
  building: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
  droplets: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>',
  route: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
  landmark: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>',
  treePine: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/><path d="M12 22v-3"/></svg>',
  wrench: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  factory: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>',
  users: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  shield: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
  fileCheck: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/></svg>',
  scale: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
  fileText: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
  mail: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  phone: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
};

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initFlipbook();
  initMotionToggle();
  initScrollHint();
  initPrintButton();
  initProgressBars();
  initChartBars();
});

// ============= SCROLL ANIMATIONS =============
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ============= FLIPBOOK =============
function initFlipbook() {
  renderLedgerPage();
  updateNavigation();
  
  // Navigation buttons
  document.getElementById('prev-btn').addEventListener('click', prevPage);
  document.getElementById('next-btn').addEventListener('click', nextPage);
  
  // Navigation dots
  document.querySelectorAll('.nav-dot').forEach((dot, idx) => {
    dot.addEventListener('click', () => goToPage(idx));
  });
}

function renderLedgerPage() {
  const year = financialYears[currentPage];
  const wrapper = document.getElementById('ledger-page');
  
  // Add animation class
  wrapper.classList.remove('active');
  wrapper.classList.add('hidden');
  
  setTimeout(() => {
    wrapper.innerHTML = `
      <div class="page-header">
        <div class="page-header-content">
          <div>
            <p class="fiscal-year-label">Fiscal Year</p>
            <h3 class="fiscal-year-value">${year.year}</h3>
          </div>
          <div>
            <p class="turnover-label">Annual Turnover</p>
            <p class="turnover-value font-mono">${year.formatted}</p>
          </div>
        </div>
      </div>
      
      <div class="project-entries no-scrollbar">
        ${projects.map((project, idx) => `
          <div class="project-entry" style="animation-delay: ${idx * 0.1}s">
            <div class="project-info">
              <p class="project-title">${project.title}</p>
              <p class="project-client">${project.client}</p>
            </div>
            <div class="project-value-container">
              <p class="project-value font-mono">${formatCompactCurrency(project.value)}</p>
              <span class="project-status status-${project.status.toLowerCase()}">${project.status}</span>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="page-footer">
        <span>Page ${currentPage + 1} of ${financialYears.length}</span>
        <span>Audited Financial Records</span>
      </div>
    `;
    
    wrapper.classList.remove('hidden');
    wrapper.classList.add('active');
  }, 300);
}

function updateNavigation() {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === financialYears.length - 1;
  
  document.querySelectorAll('.nav-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentPage);
  });
}

function nextPage() {
  if (currentPage < financialYears.length - 1) {
    currentPage++;
    renderLedgerPage();
    updateNavigation();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    renderLedgerPage();
    updateNavigation();
  }
}

function goToPage(idx) {
  currentPage = idx;
  renderLedgerPage();
  updateNavigation();
}

// ============= MOTION TOGGLE =============
function initMotionToggle() {
  const btn = document.getElementById('motion-toggle');
  btn.addEventListener('click', () => {
    reducedMotion = !reducedMotion;
    document.body.classList.toggle('reduced-motion', reducedMotion);
    btn.innerHTML = reducedMotion ? icons.eyeOff : icons.eye;
    btn.setAttribute('aria-label', reducedMotion ? 'Enable animations' : 'Disable animations');
  });
}

// ============= SCROLL HINT =============
function initScrollHint() {
  const btn = document.getElementById('scroll-hint');
  btn.addEventListener('click', () => {
    document.getElementById('financial-highlights').scrollIntoView({ behavior: 'smooth' });
  });
}

// ============= PRINT BUTTON =============
function initPrintButton() {
  document.getElementById('print-btn').addEventListener('click', () => {
    window.print();
  });
}

// ================================
// GLOBAL INIT
// ================================
document.addEventListener('DOMContentLoaded', () => {
  initProgressBars();
});

// ================================
// PROGRESS BARS (SCROLL-ACTIVATED)
// ================================
function initProgressBars() {
  const fills = document.querySelectorAll('.progress-fill, .status-progress-fill');

  if (!fills.length) {
    console.warn('No progress bars found');
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const fill = entry.target;
        const target = Number(fill.dataset.progress);

        // Hard validation (silent failures are unacceptable)
        if (isNaN(target) || target < 0 || target > 100) {
          console.error('Invalid progress value:', fill);
          obs.unobserve(fill);
          return;
        }

        // Force layout flush (prevents skipped animations)
        fill.style.width = '0%';
        fill.offsetWidth;

        // Animate fill
        fill.style.width = target + '%';

        // Sync percentage text if present
        const container = fill.closest('.progress-container');
        const label = container?.querySelector('.progress-text');
        if (label) animateNumber(label, target);

        // Fire once. No replays. No glitches.
        obs.unobserve(fill);
      });
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  fills.forEach(fill => observer.observe(fill));
}

// ================================
// NUMBER ANIMATION (95% counting up)
// ================================
function animateNumber(el, target) {
  let start = 0;
  const duration = 800;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value + '%';

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}


// ============= CHART BARS =============
function initChartBars() {
  const maxTurnover = Math.max(...financialYears.map(y => y.turnover));
  
  document.querySelectorAll('.chart-bar').forEach((bar, idx) => {
    const height = (financialYears[idx].turnover / maxTurnover) * 100;
    setTimeout(() => {
      bar.style.height = height + '%';
    }, idx * 100 + 300);
  });
}
/**
 * TURNOVER SECTION - STANDALONE JAVASCRIPT
 * Pixel-identical to React TurnoverChart behavior
 */

(function() {
  'use strict';

  // Financial data
  const financialYears = [
    { year: '2020/21', turnover: 247500679, formatted: '247,500,679 ETB' },
    { year: '2021/22', turnover: 258134782, formatted: '258,134,782 ETB' },
    { year: '2022/23', turnover: 142378986, formatted: '142,378,986 ETB' },
    { year: '2023/24', turnover: 150345685, formatted: '150,345,685 ETB' },
    { year: '2024/25', turnover: 1068648056, formatted: '1,068,648,056 ETB' },
  ];

  // Calculate max turnover for percentage heights
  const maxTurnover = Math.max(...financialYears.map(y => y.turnover));

  // DOM Elements
  const tooltip = document.getElementById('turnover-tooltip');
  const chartArea = document.getElementById('turnover-chart-area');
  const barGroups = document.querySelectorAll('.turnover-bar-group');

  // Initialize bars with correct heights when visible
  function initializeBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateBars();
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    if (chartArea) {
      observer.observe(chartArea);
    }
  }

  // Animate bars with staggered delay
  function animateBars() {
    barGroups.forEach((group, index) => {
      const bar = group.querySelector('.turnover-bar');
      const value = parseInt(group.dataset.value, 10);
      const heightPercent = (value / maxTurnover) * 100;
      
      setTimeout(() => {
        bar.style.height = heightPercent + '%';
      }, index * 150 + 200);
    });
  }

  // Tooltip positioning
  function showTooltip(event, year, formatted) {
    const tooltipYear = tooltip.querySelector('.turnover-tooltip-year');
    const tooltipValue = tooltip.querySelector('.turnover-tooltip-value');
    
    tooltipYear.textContent = 'Fiscal Year ' + year;
    tooltipValue.textContent = formatted;
    
    // Position tooltip near cursor
    const x = event.clientX;
    const y = event.clientY;
    
    tooltip.style.left = (x + 15) + 'px';
    tooltip.style.top = (y - 60) + 'px';
    tooltip.classList.add('visible');
  }

  function hideTooltip() {
    tooltip.classList.remove('visible');
  }

  function moveTooltip(event) {
    if (tooltip.classList.contains('visible')) {
      tooltip.style.left = (event.clientX - 105) + 'px';
      tooltip.style.top = (event.clientY - 200) + 'px';
    }
  }

  // Event listeners for bars
  function initializeEventListeners() {
    barGroups.forEach(group => {
      const bar = group.querySelector('.turnover-bar');
      const year = group.dataset.year;
      const formatted = group.dataset.formatted;
      
      bar.addEventListener('mouseenter', (e) => showTooltip(e, year, formatted));
      bar.addEventListener('mousemove', moveTooltip);
      bar.addEventListener('mouseleave', hideTooltip);
      
      // Touch support
      bar.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        showTooltip({ clientX: touch.clientX, clientY: touch.clientY }, year, formatted);
      });
      bar.addEventListener('touchend', hideTooltip);
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    initializeBars();
    initializeEventListeners();
  });

  // Also run if DOM already loaded
  if (document.readyState !== 'loading') {
    initializeBars();
    initializeEventListeners();
  }
})();
