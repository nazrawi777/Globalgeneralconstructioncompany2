/**
 * Contact Page - Static JavaScript
 * Handles animations, form validation, parallax, and map lazy-loading
 */

(function() {
  'use strict';

  // Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================================
  // Utility Functions
  // ==========================================================================
  function $(selector) { return document.querySelector(selector); }
  function $$(selector) { return document.querySelectorAll(selector); }

  // Debounce function
  function debounce(fn, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ==========================================================================
  // Parallax & Scroll Effects
  // ==========================================================================
  function initParallax() {
    if (prefersReducedMotion) return;

    const heroBgImage = $('#heroBgImage');
    const heroOrbPrimary = $('#heroOrbPrimary');
    const heroOrbAccent = $('#heroOrbAccent');
    const heroOverlay = $('#heroOverlay');
    const heroContent = $('#heroContent');

    function updateParallax() {
      const scrollY = window.scrollY;
      const bgTranslate = scrollY * 0.3;
      const overlayOpacity = Math.min(scrollY / 400, 0.8);
      const contentOpacity = Math.max(1 - scrollY / 500, 0);
      const contentTranslate = scrollY * 0.15;

      if (heroBgImage) heroBgImage.style.transform = `translateY(${bgTranslate}px) scale(1.1)`;
      if (heroOrbPrimary) heroOrbPrimary.style.transform = `translateY(${scrollY * 0.4}px)`;
      if (heroOrbAccent) heroOrbAccent.style.transform = `translateY(${scrollY * 0.2}px)`;
      if (heroOverlay) heroOverlay.style.opacity = 0.5 + overlayOpacity;
      if (heroContent) {
        heroContent.style.opacity = contentOpacity;
        heroContent.style.transform = `translateY(${contentTranslate}px)`;
      }
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

  // ==========================================================================
  // Scroll Reveal Animations
  // ==========================================================================
  function initScrollReveal() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(() => entry.target.classList.add('is-visible'), prefersReducedMotion ? 0 : delay);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements
    $$('.contact-info__header, .contact-info__item, .contact-form-section, .form-field, .map-section__header').forEach(el => observer.observe(el));
  }

  // ==========================================================================
  // Hero Animations
  // ==========================================================================
  function initHeroAnimations() {
    const heroTitle = $('#heroTitle');
    const heroSubtitle = $('#heroSubtitle');
    const heroScrollIndicator = $('#heroScrollIndicator');

    setTimeout(() => {
      if (heroTitle) heroTitle.classList.add('animate-gasp');
      if (heroSubtitle) heroSubtitle.classList.add('is-loaded');
      if (heroScrollIndicator) heroScrollIndicator.classList.add('is-loaded');
    }, 100);
  }

  // ==========================================================================
  // Form Validation & Submission
  // ==========================================================================
  function initForm() {
    const form = $('#contactForm');
    const submitButton = $('#submitButton');
    const submitButtonText = $('#submitButtonText');
    if (!form) return;

    const validators = {
      fullName: v => !v.trim() ? 'Full name is required' : v.length > 100 ? 'Name must be less than 100 characters' : '',
      email: v => {
        if (!v.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email address';
        if (v.length > 255) return 'Email must be less than 255 characters';
        return '';
      },
      phone: v => v.trim() && !/^[\d\s\-+()]{7,20}$/.test(v) ? 'Please enter a valid phone number' : '',
      subject: v => !v.trim() ? 'Subject is required' : v.length > 200 ? 'Subject must be less than 200 characters' : '',
      message: v => !v.trim() ? 'Message is required' : v.length > 5000 ? 'Message must be less than 5000 characters' : ''
    };

    function showError(fieldName, message) {
      const input = $(`#${fieldName}`);
      const error = $(`#${fieldName}Error`);
      if (input) input.classList.toggle('has-error', !!message);
      if (error) {
        error.hidden = !message;
        error.innerHTML = message ? `<span class="form-field__error-dot"></span>${message}` : '';
      }
    }

    function validateField(fieldName) {
      const input = $(`#${fieldName}`);
      if (!input || !validators[fieldName]) return true;
      const error = validators[fieldName](input.value);
      showError(fieldName, error);
      return !error;
    }

    // Real-time validation on blur
    ['fullName', 'email', 'phone', 'subject', 'message'].forEach(name => {
      const input = $(`#${name}`);
      if (input) {
        input.addEventListener('blur', () => validateField(name));
        input.addEventListener('input', () => {
          if (input.classList.contains('has-error')) validateField(name);
        });
      }
    });

    // File upload
    const fileInput = $('#file');
    const fileContent = $('#fileContent');
    const fileDropZone = $('#fileDropZone');

    function updateFilePreview() {
      const file = fileInput.files[0];
      if (file) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(2);
        fileContent.innerHTML = `
          <div class="form-field__file-preview">
            <div class="form-field__file-preview-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div>
            <div class="form-field__file-info"><p class="form-field__file-name">${file.name}</p><p class="form-field__file-size">${sizeMB} MB</p></div>
            <button type="button" class="form-field__file-remove" aria-label="Remove file"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg></button>
          </div>`;
        const removeBtn = fileContent.querySelector('.form-field__file-remove');
        if (removeBtn) removeBtn.addEventListener('click', e => { e.stopPropagation(); fileInput.value = ''; updateFilePreview(); });
      } else {
        fileContent.innerHTML = `<svg class="form-field__file-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg><p class="form-field__file-text"><span>Click to upload</span> or drag and drop</p>`;
      }
    }

    if (fileInput) fileInput.addEventListener('change', updateFilePreview);
    if (fileDropZone) {
      fileDropZone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); } });
    }

    // Submit handler
    form.addEventListener('submit', async e => {
      e.preventDefault();
      
      // Validate all
      const isValid = ['fullName', 'email', 'phone', 'subject', 'message'].every(validateField);
      if (!isValid) return;

      // Update button state
      submitButton.className = 'submit-button submit-button--submitting';
      submitButton.disabled = true;
      submitButtonText.textContent = 'Sending...';
      submitButton.querySelector('.submit-button__icon').outerHTML = '<svg class="submit-button__spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';

      try {
        const formData = new FormData(form);
        const response = await fetch('/api/contact', { method: 'POST', body: formData });
        
        if (response.ok) {
          showSuccess();
        } else {
          throw new Error('Server error');
        }
      } catch {
        // Fallback: save to localStorage
        const data = { fullName: $('#fullName').value, email: $('#email').value, phone: $('#phone').value, subject: $('#subject').value, message: $('#message').value, timestamp: new Date().toISOString() };
        const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
        submissions.push(data);
        localStorage.setItem('contact_submissions', JSON.stringify(submissions));
        showSuccess();
      }
    });

    function showSuccess() {
      submitButton.className = 'submit-button submit-button--success';
      submitButtonText.textContent = 'Message Sent!';
      submitButton.querySelector('.submit-button__spinner, .submit-button__icon').outerHTML = '<svg class="submit-button__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      showConfetti();
      form.reset();
      updateFilePreview();
      setTimeout(() => {
        submitButton.className = 'submit-button submit-button--idle';
        submitButton.disabled = false;
        submitButtonText.textContent = 'Send Message';
        submitButton.querySelector('.submit-button__icon').outerHTML = '<svg class="submit-button__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      }, 3000);
    }

    function showConfetti() {
      if (prefersReducedMotion) return;
      const container = $('#confettiContainer');
      if (!container) return;
      const colors = ['hsl(185,100%,50%)', 'hsl(220,100%,60%)', 'hsl(142,76%,45%)', 'hsl(45,100%,60%)'];
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('span');
        particle.className = 'submit-button__confetti-particle';
        particle.style.cssText = `left:${50+(Math.random()-0.5)*60}%;top:50%;background:${colors[i%4]};animation-delay:${i*0.05}s`;
        container.appendChild(particle);
      }
      setTimeout(() => container.innerHTML = '', 1000);
    }

    // Ripple effect
    submitButton.addEventListener('click', e => {
      if (submitButton.classList.contains('submit-button--idle')) {
        const rect = submitButton.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'submit-button__ripple';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        submitButton.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
    });
  }

  // ==========================================================================
  // Map Lazy Loading
  // ==========================================================================
  function initMap() {
    const mapContainer = $('#mapContainer');
    const mapLoading = $('#mapLoading');
    const mapIframe = $('#mapIframe');
    if (!mapContainer) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        mapContainer.classList.add('is-visible');
        setTimeout(() => {
          if (mapIframe) { mapIframe.style.display = 'block'; }
          if (mapLoading) mapLoading.style.display = 'none';
        }, 500);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '100px' });

    observer.observe(mapContainer);
  }

  // ==========================================================================
  // Initialize
  // ==========================================================================
  function init() {
    // Set current year
    const yearEl = $('#currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initHeroAnimations();
    initParallax();
    initScrollReveal();
    initForm();
    initMap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
