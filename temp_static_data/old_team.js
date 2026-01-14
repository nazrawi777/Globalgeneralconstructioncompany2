
(function() {
  'use strict';

  let teamData = null;
  let expandedNodes = new Set();
  let highlightedId = null;
  let currentZoom = 0.7;
  let isCompact = false;
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };
  let scrollStart = { x: 0, y: 0 };

  // DOM Elements
  const elements = {
    app: document.getElementById('app'),
    chart: document.getElementById('org-chart'),
    container: document.getElementById('chart-container'),
    searchInput: document.getElementById('search-input'),
    searchClear: document.getElementById('search-clear'),
    searchResults: document.getElementById('search-results'),
    lastUpdated: document.getElementById('last-updated'),
    zoomLevel: document.getElementById('zoom-level'),
    zoomIn: document.getElementById('zoom-in'),
    zoomOut: document.getElementById('zoom-out'),
    expandAll: document.getElementById('expand-all'),
    collapseAll: document.getElementById('collapse-all'),
    compactToggle: document.getElementById('compact-toggle'),
    printBtn: document.getElementById('print-btn'),
    modal: document.getElementById('modal-backdrop'),
    modalClose: document.getElementById('modal-close'),
    modalAvatar: document.getElementById('modal-avatar'),
    modalTitle: document.getElementById('modal-title'),
    modalRole: document.getElementById('modal-role'),
    modalPhone: document.getElementById('modal-phone'),
    modalEmail: document.getElementById('modal-email'),
    socialLinks: document.getElementById('social-links'),
    copyPhone: document.getElementById('copy-phone'),
    copyEmail: document.getElementById('copy-email'),
    callBtn: document.getElementById('call-btn'),
    emailBtn: document.getElementById('email-btn'),
    vcardBtn: document.getElementById('vcard-btn')
  };

  // ==================== Utilities ====================

  /**
   * Flatten org tree to array for searching
   */
  function flattenTree(node, result = []) {
    result.push(node);
    if (node.children) {
      node.children.forEach(child => flattenTree(child, result));
    }
    return result;
  }

  /**
   * Search members by name or role
   */
  function searchMembers(root, query) {
    const allMembers = flattenTree(root);
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [];
    return allMembers.filter(member => 
      member.name.toLowerCase().includes(lowerQuery) ||
      member.role.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Find path to a member
   */
  function findPathToMember(root, targetId, path = []) {
    path.push(root.id);
    if (root.id === targetId) return path;
    if (root.children) {
      for (const child of root.children) {
        const result = findPathToMember(child, targetId, [...path]);
        if (result) return result;
      }
    }
    return null;
  }

  /**
   * Get initials from name
   */
  function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  /**
   * Copy text to clipboard
   */
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generate vCard
   */
  function generateVCard(member) {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${member.name}`,
      `TITLE:${member.role}`,
      `TEL;TYPE=WORK,VOICE:${member.phone}`,
      `EMAIL;TYPE=WORK,INTERNET:${member.email}`
    ];
    if (member.social?.linkedin) {
      lines.push(`URL;TYPE=LinkedIn:${member.social.linkedin}`);
    }
    lines.push('END:VCARD');
    return lines.join('\n');
  }

  /**
   * Download vCard
   */
  function downloadVCard(member) {
    const vcardData = generateVCard(member);
    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${member.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Create SVG avatar placeholder
   */
  function createAvatarPlaceholder(name) {
    const initials = getInitials(name);
    return `
      <svg viewBox="0 0 100 100" class="avatar-placeholder">
        <defs>
          <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="hsl(135, 65%, 46%)" />
            <stop offset="100%" stop-color="hsl(160, 55%, 48%)" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#avatarGrad)" />
        <text x="50" y="50" text-anchor="middle" dominant-baseline="central" 
              fill="white" font-size="36" font-weight="600" font-family="system-ui, sans-serif">
          ${initials}
        </text>
      </svg>
    `;
  }

  // ==================== Rendering ====================

  /**
   * Create an org node element
   */
  function createOrgNode(member, delay = 0) {
    const hasChildren = member.children && member.children.length > 0;
    const isExpanded = expandedNodes.has(member.id);
    const isHighlighted = highlightedId === member.id;

    const node = document.createElement('div');
    node.className = `org-node${isHighlighted ? ' highlighted' : ''}`;
    node.style.animationDelay = `${delay}ms`;
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    node.setAttribute('aria-label', `${member.name}, ${member.role}. Click to view details.`);
    if (hasChildren) {
      node.setAttribute('aria-expanded', isExpanded);
    }
    node.dataset.id = member.id;

    node.innerHTML = `
      <div class="org-node-glow" aria-hidden="true"></div>
      <div class="org-avatar">
        <img src="${member.avatar}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='${createAvatarPlaceholder(member.name).replace(/'/g, "\\'")}'" />
      </div>
      <div class="org-info">
        <div class="org-name">${member.name}</div>
        <div class="org-role">${member.role}</div>
        <div class="quick-contact">
         <a href="tel:${member.phone}"
              onclick="event.stopPropagation()"
              aria-label="Call ${member.name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-call-icon lucide-phone-call"><path d="M13 2a9 9 0 0 1 9 9"/><path d="M13 6a5 5 0 0 1 5 5"/><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>  </a>

          <a href="mailto:${member.email}" onclick="event.stopPropagation()" aria-label="Email ${member.name}">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-check-icon lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
          </a>
        </div>
      </div>
      ${hasChildren ? `
        <button class="expand-toggle" onclick="event.stopPropagation(); window.orgChart.toggleNode('${member.id}')" aria-label="${isExpanded ? 'Collapse' : 'Expand'} team">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${isExpanded ? '<path d="m6 9 6 6 6-6"/>' : '<path d="m9 18 6-6-6-6"/>'}
          </svg>
        </button>
      ` : ''}
    `;

    // Click handler
    node.addEventListener('click', (e) => {
      // Add ripple effect
      const rect = node.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.marginLeft = '-10px';
      ripple.style.marginTop = '-10px';
      node.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      openModal(member);
    });

    // Keyboard handler
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(member);
      }
    });

    return node;
  }

  /**
   * Create an org branch (node + children)
   */
  function createOrgBranch(member, level = 0, index = 0) {
    const hasChildren = member.children && member.children.length > 0;
    const isExpanded = expandedNodes.has(member.id);
    const delay = level * 100 + index * 50;

    const branch = document.createElement('div');
    branch.className = 'org-branch';
    branch.dataset.id = member.id;

    // Add the node
    branch.appendChild(createOrgNode(member, delay));

    // Add children if any
    if (hasChildren) {
      // Vertical connector from node
      const vertConnector = document.createElement('div');
      vertConnector.className = 'connector-vertical';
      vertConnector.style.display = isExpanded ? 'block' : 'none';
      branch.appendChild(vertConnector);

      // Horizontal connector
      if (member.children.length > 1) {
        const horizConnector = document.createElement('div');
        horizConnector.className = 'connector-horizontal';
        horizConnector.style.width = `${Math.min(member.children.length * 100, 400)}px`;
        horizConnector.style.display = isExpanded ? 'block' : 'none';
        branch.appendChild(horizConnector);
      }

      // Children container
      const childrenContainer = document.createElement('div');
      childrenContainer.className = `org-children${isExpanded ? '' : ' collapsed'}`;

      member.children.forEach((child, childIndex) => {
        const childWrapper = document.createElement('div');
        childWrapper.style.display = 'flex';
        childWrapper.style.flexDirection = 'column';
        childWrapper.style.alignItems = 'center';

        // Down connector
        const downConnector = document.createElement('div');
        downConnector.className = 'connector-down';
        childWrapper.appendChild(downConnector);

        // Child branch
        childWrapper.appendChild(createOrgBranch(child, level + 1, childIndex));
        childrenContainer.appendChild(childWrapper);
      });

      branch.appendChild(childrenContainer);
    }

    return branch;
  }

  /**
   * Render the entire chart
   */
 function renderChart() {
  if (!teamData) return;

  elements.chart.innerHTML = '';
  elements.chart.appendChild(createOrgBranch(teamData.orgChart));

  // Set zoom first
  updateZoom();
  updateCompactMode();

  // Center chart in container
  requestAnimationFrame(() => {
    const container = elements.container;
    container.scrollLeft = (elements.chart.scrollWidth - container.clientWidth) / 2;
    container.scrollTop = (elements.chart.scrollHeight - container.clientHeight) / 2;
  });
}


  // ==================== Modal ====================

  let currentMember = null;

  function openModal(member) {
    currentMember = member;

    // Set content
    elements.modalTitle.textContent = member.name;
    elements.modalRole.textContent = member.role;
    elements.modalPhone.textContent = member.phone;
    elements.modalPhone.href = `tel:${member.phone}`;
    elements.modalEmail.textContent = member.email;
    elements.modalEmail.href = `mailto:${member.email}`;
    elements.callBtn.href = `tel:${member.phone}`;
    elements.emailBtn.href = `mailto:${member.email}`;

    // Avatar
    elements.modalAvatar.innerHTML = `
      <img src="${member.avatar}" alt="" onerror="this.parentElement.innerHTML='${createAvatarPlaceholder(member.name).replace(/'/g, "\\'")}'" />
    `;

    // Social links
    const socialIcons = {
      linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
      twitter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>',
      facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>'
    };

    elements.socialLinks.innerHTML = '';
    if (member.social) {
      Object.entries(member.social).forEach(([platform, url]) => {
        if (url && socialIcons[platform]) {
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.className = 'social-link';
          link.setAttribute('aria-label', `Visit ${member.name}'s ${platform} profile`);
          link.innerHTML = socialIcons[platform];
          elements.socialLinks.appendChild(link);
        }
      });
    }

    // Show modal
    elements.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    elements.modalClose.focus();
  }

  function closeModal() {
    elements.modal.style.display = 'none';
    document.body.style.overflow = '';
    currentMember = null;
  }

  // ==================== Search ====================

  function updateSearchResults(query) {
    if (!teamData) return;
    
    const results = searchMembers(teamData.orgChart, query);
    
    if (query && results.length > 0) {
      elements.searchResults.innerHTML = results.map((member, i) => `
        <li class="search-result-item" data-index="${i}" data-id="${member.id}" role="option">
          <div class="search-result-avatar">${getInitials(member.name)}</div>
          <div class="search-result-info">
            <div class="search-result-name">${member.name}</div>
            <div class="search-result-role">${member.role}</div>
          </div>
        </li>
      `).join('');
      elements.searchResults.style.display = 'block';
      elements.searchClear.style.display = 'block';
    } else {
      elements.searchResults.style.display = 'none';
      elements.searchClear.style.display = query ? 'block' : 'none';
    }
  }

  function selectSearchResult(memberId) {
    if (!teamData) return;

    const allMembers = flattenTree(teamData.orgChart);
    const member = allMembers.find(m => m.id === memberId);
    if (!member) return;

    // Expand path to member
    const path = findPathToMember(teamData.orgChart, memberId);
    if (path) {
      path.forEach(id => expandedNodes.add(id));
    }

    // Highlight
    highlightedId = memberId;
    renderChart();

    // Clear highlight after delay
    setTimeout(() => {
      highlightedId = null;
      const highlightedNode = document.querySelector('.org-node.highlighted');
      if (highlightedNode) {
        highlightedNode.classList.remove('highlighted');
      }
    }, 3000);

    // Scroll to node
    setTimeout(() => {
      const node = document.querySelector(`[data-id="${memberId}"].org-node`);
      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);

    // Clear search
    elements.searchInput.value = '';
    elements.searchResults.style.display = 'none';
    elements.searchClear.style.display = 'none';
  }

  // ==================== Controls ====================

  function updateZoom() {
    elements.chart.style.transform = `scale(${currentZoom})`;
    elements.zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
  }

  function updateCompactMode() {
    elements.chart.classList.toggle('compact', isCompact);
    elements.compactToggle.classList.toggle('active', isCompact);
    elements.compactToggle.querySelector('.compact-label').textContent = isCompact ? 'Normal' : 'Compact';
  }

  // ==================== Event Listeners ====================

  function initEventListeners() {
    // Modal
    elements.modalClose.addEventListener('click', closeModal);
    elements.modal.addEventListener('click', (e) => {
      if (e.target === elements.modal) closeModal();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.modal.style.display === 'flex') {
        closeModal();
      }
    });

    // Copy buttons
    elements.copyPhone.addEventListener('click', async () => {
      if (currentMember) {
        const success = await copyToClipboard(currentMember.phone);
        if (success) {
          elements.copyPhone.querySelector('.copy-icon').style.display = 'none';
          elements.copyPhone.querySelector('.check-icon').style.display = 'block';
          setTimeout(() => {
            elements.copyPhone.querySelector('.copy-icon').style.display = 'block';
            elements.copyPhone.querySelector('.check-icon').style.display = 'none';
          }, 2000);
        }
      }
    });

    elements.copyEmail.addEventListener('click', async () => {
      if (currentMember) {
        const success = await copyToClipboard(currentMember.email);
        if (success) {
          elements.copyEmail.querySelector('.copy-icon').style.display = 'none';
          elements.copyEmail.querySelector('.check-icon').style.display = 'block';
          setTimeout(() => {
            elements.copyEmail.querySelector('.copy-icon').style.display = 'block';
            elements.copyEmail.querySelector('.check-icon').style.display = 'none';
          }, 2000);
        }
      }
    });

    // vCard download
    elements.vcardBtn.addEventListener('click', () => {
      if (currentMember) downloadVCard(currentMember);
    });

    // Search
    elements.searchInput.addEventListener('input', (e) => {
      updateSearchResults(e.target.value);
    });

    elements.searchInput.addEventListener('keydown', (e) => {
      const items = elements.searchResults.querySelectorAll('.search-result-item');
      const activeItem = elements.searchResults.querySelector('.search-result-item.active');
      let activeIndex = Array.from(items).indexOf(activeItem);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (activeItem) activeItem.classList.remove('active');
          activeIndex = Math.min(activeIndex + 1, items.length - 1);
          if (items[activeIndex]) items[activeIndex].classList.add('active');
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (activeItem) activeItem.classList.remove('active');
          activeIndex = Math.max(activeIndex - 1, 0);
          if (items[activeIndex]) items[activeIndex].classList.add('active');
          break;
        case 'Enter':
          e.preventDefault();
          if (activeItem) {
            selectSearchResult(activeItem.dataset.id);
          }
          break;
        case 'Escape':
          elements.searchResults.style.display = 'none';
          break;
      }
    });

    elements.searchResults.addEventListener('click', (e) => {
      const item = e.target.closest('.search-result-item');
      if (item) {
        selectSearchResult(item.dataset.id);
      }
    });

    elements.searchClear.addEventListener('click', () => {
      elements.searchInput.value = '';
      elements.searchResults.style.display = 'none';
      elements.searchClear.style.display = 'none';
      elements.searchInput.focus();
    });

    // Zoom
    elements.zoomIn.addEventListener('click', () => {
      currentZoom = Math.min(currentZoom + 0.1, 2);
      updateZoom();
    });

    elements.zoomOut.addEventListener('click', () => {
      currentZoom = Math.max(currentZoom - 0.1, 0.5);
      updateZoom();
    });

    // Expand/Collapse
    elements.expandAll.addEventListener('click', () => {
      if (teamData) {
        flattenTree(teamData.orgChart).forEach(m => expandedNodes.add(m.id));
        renderChart();
      }
    });

    elements.collapseAll.addEventListener('click', () => {
      if (teamData) {
        expandedNodes.clear();
        expandedNodes.add(teamData.orgChart.id);
        renderChart();
      }
    });

    // Compact mode
    elements.compactToggle.addEventListener('click', () => {
      isCompact = !isCompact;
      updateCompactMode();
    });

    // Print
    elements.printBtn.addEventListener('click', () => {
      window.print();
    });

    // Drag to pan
    elements.container.addEventListener('mousedown', (e) => {
      if (e.button === 0 && !e.target.closest('button, a, .org-node')) {
        isDragging = true;
        dragStart = { x: e.clientX, y: e.clientY };
        scrollStart = { x: elements.container.scrollLeft, y: elements.container.scrollTop };
        elements.container.style.cursor = 'grabbing';
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        elements.container.scrollLeft = scrollStart.x - dx;
        elements.container.scrollTop = scrollStart.y - dy;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      elements.container.style.cursor = 'grab';
    });

    // Wheel zoom
    elements.container.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        currentZoom = Math.min(Math.max(currentZoom + delta, 0.5), 2);
        updateZoom();
      }
    }, { passive: false });
  }

  // ==================== Global API ====================

  window.orgChart = {
    toggleNode(id) {
      if (expandedNodes.has(id)) {
        expandedNodes.delete(id);
      } else {
        expandedNodes.add(id);
      }
      renderChart();
    }
  };

  // ==================== Initialize ====================

  async function init() {
    try {
      const response = await fetch('data/team.json');
      if (!response.ok) throw new Error('Failed to load team data');
      teamData = await response.json();

      // Update header
      document.querySelector('.header1-title').textContent = teamData.company;
       
      // Initialize expanded nodes
      flattenTree(teamData.orgChart).forEach(m => expandedNodes.add(m.id));

      // Render
      renderChart();
      initEventListeners();

    } catch (error) {
      console.error('Error initializing org chart:', error);
      elements.chart.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <p style="color: hsl(var(--muted-foreground));">Failed to load organization chart data.</p>
        </div>
      `;
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();