// --- Dark
const darkToggle = document.createElement('button');
darkToggle.className = 'dark-toggle';
darkToggle.innerHTML = '🌙';
document.body.appendChild(darkToggle);

function setDarkMode(on) {
  document.documentElement.classList.toggle('dark', on);
  localStorage.setItem('darkMode', on ? '1' : '0');
  darkToggle.innerHTML = on ? '☀️' : '🌙';
}
darkToggle.onclick = () => setDarkMode(!document.documentElement.classList.contains('dark'));
if (localStorage.getItem('darkMode') === '1') setDarkMode(true);

// --- Animated Hero Section ---
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero-text').classList.add('fade-in-left');
  document.querySelector('.hero-img').classList.add('fade-in-right');
});

// --- Smooth Scroll for Navigation ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Copy Integration Snippet Button ---
const pre = document.querySelector('.integration pre');
if (pre) {
  const btn = document.createElement('button');
  btn.textContent = 'Copy';
  btn.className = 'copy-btn';
  btn.onclick = () => {
    navigator.clipboard.writeText(pre.innerText.trim());
    btn.textContent = 'Copied!';
    setTimeout(() => (btn.textContent = 'Copy'), 1200);
  };
  pre.appendChild(btn);
}

// --- Scroll-to-Top Button ---
const scrollBtn = document.createElement('button');
scrollBtn.className = 'scroll-top-btn';
scrollBtn.innerHTML = '↑';
scrollBtn.title = 'Scroll to top';
document.body.appendChild(scrollBtn);
scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// --- Feature Card Hover Effects ---
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('hovered'));
  card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
});

// --- Responsive Mobile Menu ---
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');

function toggleMenu(open = !nav?.classList.contains('open')) {
  burger?.classList.toggle('active', open);
  nav?.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

burger?.addEventListener('click', () => toggleMenu());

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav?.classList.contains('open') && 
      !nav.contains(e.target) && 
      !burger?.contains(e.target)) {
    toggleMenu(false);
  }
});

// --- GitHub Star Button Animation ---
const starElem = document.getElementById('github-stars');
if (starElem) {
  const observer = new MutationObserver(() => {
    starElem.classList.add('star-pop');
    setTimeout(() => starElem.classList.remove('star-pop'), 600);
  });
  observer.observe(starElem, { childList: true });
}

// // --- Demo Widget Modal ---
// const demoBox = document.querySelector('.demo-box');
// if (demoBox) {
//   const modalBtn = document.createElement('button');
//   modalBtn.textContent = 'Open Demo';
//   modalBtn.className = 'modal-btn';
//   demoBox.appendChild(modalBtn);

//   const modal = document.createElement('div');
//   modal.className = 'modal';
//   modal.innerHTML = `
//     <div class="modal-content">
//       <button class="modal-close">&times;</button>
//       <h3>AI Assistant Demo</h3>
//       <p style="margin-bottom:1em;">(Demo widget or video goes here)</p>
//       <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="360" height="200" frameborder="0" allowfullscreen style="border-radius:10px;"></iframe>
//     </div>
//   `;
//   document.body.appendChild(modal);

//   modalBtn.onclick = () => modal.classList.add('open');
//   modal.querySelector('.modal-close').onclick = () => modal.classList.remove('open');
//   modal.onclick = e => { if (e.target === modal) modal.classList.remove('open'); };
// }

// --- Lazy Loading Images ---
document.querySelectorAll('img').forEach(img => img.setAttribute('loading', 'lazy'));

// Intersection Observer for animations
const animateOnScroll = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      animateOnScroll.unobserve(entry.target);
    }
  }),
  { threshold: 0.1 }
);

// Apply animations to elements
document.querySelectorAll('.feature-card, .integration h2, .integration pre')
  .forEach(el => animateOnScroll.observe(el));

// Smart GitHub stars fetching with caching
const CACHE_DURATION = 3600000; // 1 hour
async function fetchGitHubStars() {
  try {
    const cached = localStorage.getItem('githubStars');
    if (cached) {
      const { stars, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        updateStarCount(stars);
        return;
      }
    }

    const res = await fetch('https://api.github.com/repos/BouajilaHamza/site-ai-assistant-integration');
    if (!res.ok) throw new Error('Failed to fetch GitHub stars');
    
    const data = await res.json();
    localStorage.setItem('githubStars', JSON.stringify({
      stars: data.stargazers_count,
      timestamp: Date.now()
    }));
    
    updateStarCount(data.stargazers_count);
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
  }
}

function updateStarCount(count) {
  document.querySelectorAll('#github-stars').forEach(el => {
    el.textContent = count;
    el.classList.add('star-pop');
    setTimeout(() => el.classList.remove('star-pop'), 600);
  });
}

// Enhanced smooth scroll with header offset
const headerHeight = () => document.querySelector('header')?.offsetHeight ?? 0;
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.offsetTop - headerHeight() - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Improved copy button with visual feedback
const setupCopyButton = () => {
  const pre = document.querySelector('.integration pre');
  if (!pre) return;

  const btn = document.createElement('button');
  btn.textContent = 'Copy';
  btn.className = 'copy-btn';
  let timeoutId;
  
  const updateButton = (text, success = true) => {
    btn.textContent = text;
    btn.style.background = success ? 
      'rgba(16, 185, 129, 0.2)' : 
      'rgba(239, 68, 68, 0.2)';
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      btn.textContent = 'Copy';
      btn.style.background = '';
    }, 2000);
  };
  
  btn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(pre.querySelector('code').innerText.trim());
      updateButton('✓ Copied!');
    } catch (err) {
      console.error('Failed to copy:', err);
      updateButton('✕ Error', false);
    }
  };
  
  pre.appendChild(btn);
};

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
  fetchGitHubStars();
  setupCopyButton();
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const mobileMenu = document.getElementById('mobile-menu');

navToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  navToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
});

// Hide mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Copy code snippet
const copyBtn = document.getElementById('copy-btn');
const snippet = document.getElementById('snippet');
copyBtn?.addEventListener('click', () => {
  navigator.clipboard.writeText(snippet.textContent.trim());
  copyBtn.textContent = 'Copied!';
  setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
});
