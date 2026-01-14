document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');
  const imageContainer = document.querySelector('.preloader__image');

  if (!preloader || !imageContainer) return;

  // Set accessibility role
  preloader.setAttribute('role', 'status');
  preloader.setAttribute('aria-label', 'Loading');

  // --- Dynamic Content Injection ---

  // 1. Create Orbit Ring Structure
  const ring = document.createElement('div');
  ring.className = 'orbit-ring';
  
  // 2. Create Dot inside Ring
  const dot = document.createElement('div');
  dot.className = 'orbit-dot';
  ring.appendChild(dot);
  
  // 3. Create Logo
  const logo = document.createElement('img');
  // Use relative path matching the final expected structure
  logo.src = 'assets/images/resources/1.png'; 
  logo.className = 'preloader-logo';
  logo.alt = 'Global General Construction Logo';
  logo.onerror = () => {
    logo.style.display = 'none';
    const fallbackText = document.createElement('span');
    fallbackText.innerText = "GGC";
    fallbackText.style.color = "white";
    fallbackText.style.fontSize = "24px";
    fallbackText.style.fontWeight = "bold";
    imageContainer.appendChild(fallbackText);
  };
  
  // 4. Create Brand Text
  const brandContainer = document.createElement('div');
  brandContainer.className = 'brand-container';
  
  const title = document.createElement('h1');
  title.className = 'brand-title';
  title.textContent = 'Global General Construction';
  
  const tagline = document.createElement('p');
  tagline.className = 'brand-tagline';
  tagline.textContent = 'We turn your dream into reality';
  
  brandContainer.appendChild(title);
  brandContainer.appendChild(tagline);

  // 5. Generate Stars
  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    if (x > 30 && x < 70 && y > 30 && y < 70) continue;

    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${Math.random() * 2 + 1}px`;
    star.style.height = star.style.width;
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    star.style.setProperty('--delay', `${Math.random() * 2}s`);
    star.style.setProperty('--opacity', `${Math.random() * 0.7 + 0.3}`);
    
    imageContainer.appendChild(star);
  }

  imageContainer.appendChild(ring);
  imageContainer.appendChild(logo);
  preloader.appendChild(brandContainer);

  // --- Logic ---
  const pageContent = document.getElementById('page');

  function hideLoader() {
    if (preloader.classList.contains('hidden')) return;

    preloader.classList.add('hidden');
    if (pageContent) pageContent.classList.add('visible');
    
    setTimeout(() => {
      preloader.style.display = 'none';
      preloader.remove();
    }, 600);
  }

  // Enforce 3s duration
  setTimeout(hideLoader, 4000);
});