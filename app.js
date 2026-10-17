/**
 * MAIN INTERACTIVE APPLICATION CONTROLLER
 * Nethra Shree SD Portfolio Website
 * 
 * Manages:
 * - Navigation & scroll spy
 * - Full-viewport background orb parallax
 * - Hero text typing / rotating headline
 * - Hero visual switcher (3D Neural Hologram / Portrait Photo / Monogram)
 * - Physics-based 3D card tilt & specular glare highlights
 * - Single-source-of-truth dynamic data rendering
 * - Verified contact form & mailto generator
 * - Clipboard copy triggers & toast notification system
 * - Scroll reveal observer
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAmbientBackgroundParallax();
  initHeroTextRotator();
  initHeroVisualSwitcher();
  initDynamicData();
  initCard3DTilt();
  initProjectBlueprintModal();
  initResumeDownloadVerification();
  initContactForm();
  initCopyToClipboard();
  initScrollAnimations();
  setCurrentYear();
});

/**
 * 1. Navigation & Scroll Spy
 */
function initNavigation() {
  const header = document.getElementById('mainHeader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
          activeLink.setAttribute('aria-current', 'page');
        } else {
          activeLink.classList.remove('active');
          activeLink.removeAttribute('aria-current');
        }
      }
    });
  }, { passive: true });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.classList.toggle('menu-open', !isExpanded);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        navToggle.focus();
      }
    });
  }
}

/**
 * 2. Full-Viewport Ambient Background Parallax
 * Subtle mouse-responsive movement for the ambient orbs on desktop
 */
function initAmbientBackgroundParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 1024) return; // Skip on mobile/tablet for performance

  const tracks = document.querySelectorAll('.ambient-orb-track');
  if (tracks.length === 0) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  function renderParallax() {
    currentX += (mouseX - currentX) * 0.045;
    currentY += (mouseY - currentY) * 0.045;

    tracks.forEach((track, i) => {
      const factor = (i + 1) * 18; // 18px, 36px, 54px, 72px
      track.style.transform = `translate3d(${currentX * factor}px, ${currentY * factor}px, 0)`;
    });

    requestAnimationFrame(renderParallax);
  }

  requestAnimationFrame(renderParallax);
}

/**
 * 3. Hero Text Typing / Rotating Headline
 * Cycles through the 4 requested phrases with smooth character typing
 */
function initHeroTextRotator() {
  const dynamicTextEl = document.getElementById('heroDynamicText');
  if (!dynamicTextEl) return;

  const phrases = [
    "Exploring Artificial Intelligence",
    "Building Technical Skills",
    "Turning Curiosity Into Code",
    "Learning, Creating, Improving"
  ];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    dynamicTextEl.textContent = phrases[0];
    return;
  }

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 75;

  function typeCycle() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      charIdx--;
      dynamicTextEl.textContent = currentPhrase.substring(0, charIdx);
      typeSpeed = 38;
    } else {
      charIdx++;
      dynamicTextEl.textContent = currentPhrase.substring(0, charIdx);
      typeSpeed = 75;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      // Finished typing phrase, hold for 2.2 seconds
      isDeleting = true;
      typeSpeed = 2200;
    } else if (isDeleting && charIdx === 0) {
      // Finished deleting, move to next phrase
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 450;
    }

    setTimeout(typeCycle, typeSpeed);
  }

  setTimeout(typeCycle, 800);
}

/**
 * 4. Hero Visual Switcher (3D Neural Hologram / Portrait Photo / Monogram)
 */
function initHeroVisualSwitcher() {
  const modeButtons = document.querySelectorAll('.mode-switch-btn');
  const view3D = document.getElementById('hero3dView');
  const viewImage = document.getElementById('profileImageView');
  const viewMonogram = document.getElementById('profileMonogramView');

  if (!modeButtons.length || !view3D || !viewImage || !viewMonogram) return;

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetMode = btn.getAttribute('data-mode');

      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Hide all first
      view3D.classList.add('hidden');
      viewImage.classList.add('hidden');
      viewMonogram.classList.add('hidden');

      if (targetMode === '3d') {
        view3D.classList.remove('hidden');
      } else if (targetMode === 'photo') {
        viewImage.classList.remove('hidden');
      } else if (targetMode === 'monogram') {
        viewMonogram.classList.remove('hidden');
      }
    });
  });
}

/**
 * 5. Physics-Based 3D Card Tilt & Specular Glare
 * Adds 3D depth to project cards, highlight pillars, and interest cards
 */
function initCard3DTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return; // Desktop only

  const tiltCards = document.querySelectorAll('.card-tilt-3d');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1; // -1 to 1
      const normY = (y / rect.height) * 2 - 1;

      const maxTilt = 9; // degrees
      const tiltX = -normY * maxTilt;
      const tiltY = normX * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/**
 * 6. Dynamic Data Rendering from PORTFOLIO_DATA (Single Source of Truth)
 */
function initDynamicData() {
  if (typeof PORTFOLIO_DATA === 'undefined') return;

  // A. About Me Pillars (Curiosity, Communication, Technology)
  const aboutPillarsContainer = document.getElementById('aboutPillarsGrid');
  if (aboutPillarsContainer && PORTFOLIO_DATA.aboutHighlights) {
    const iconMap = {
      'compass': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
      'message-circle': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
      'cpu': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`
    };

    aboutPillarsContainer.innerHTML = PORTFOLIO_DATA.aboutHighlights.map((pillar, i) => `
      <div class="pillar-card-3 card-tilt-3d fade-up-init delay-${i + 1}" tabindex="0">
        <div class="pillar-icon-box" style="color: var(--accent-electric); width: 44px; height: 44px; border-radius: 12px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
          ${iconMap[pillar.icon] || iconMap['compass']}
        </div>
        <div>
          <h3 style="font-size: 1.18rem; font-weight: 700; color: #ffffff; margin-bottom: 4px;">${pillar.title}</h3>
          <span style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--accent-electric); display: block; margin-bottom: 8px;">${pillar.subtitle}</span>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.65;">${pillar.description}</p>
        </div>
      </div>
    `).join('');
  }

  // B. Projects Showcase Grid
  const projectsContainer = document.getElementById('projectsShowcaseGrid');
  if (projectsContainer && PORTFOLIO_DATA.projects && PORTFOLIO_DATA.projects.items) {
    projectsContainer.innerHTML = PORTFOLIO_DATA.projects.items.map((proj, i) => `
      <div class="project-card-item card-tilt-3d fade-up-init delay-${i + 1}" tabindex="0">
        <div class="project-card-top">
          <div class="project-badge-row">
            <span class="project-status-tag">${proj.status}</span>
            <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">${proj.badge}</span>
          </div>
          <h4 class="project-card-title">${proj.title}</h4>
          <p class="project-card-desc">${proj.shortDescription}</p>
          <div class="project-tech-pills">
            ${proj.technologies.map(t => `<span class="tech-tag-pill">${t}</span>`).join('')}
          </div>
        </div>

        <div class="project-card-bottom">
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-code-link" aria-label="View source code repository for ${proj.title}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>GitHub Repository</span>
          </a>

          <button type="button" class="btn btn-secondary btn-sm" onclick="showToast('Modular project template ready for lab code updates', 'info')" aria-label="Project details for ${proj.title}">
            <span>Details</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  // C. Beyond the Code Showcase Cards (The Reader, The Debater, The Curious Technologist)
  const interestsContainer = document.getElementById('interestsGridShowcase');
  if (interestsContainer && PORTFOLIO_DATA.interests) {
    const interestIcons = {
      'book-open': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
      'mic': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
      'terminal': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`
    };

    interestsContainer.innerHTML = PORTFOLIO_DATA.interests.map((item, i) => `
      <div class="interest-card-box card-tilt-3d fade-up-init delay-${i + 1}" tabindex="0">
        <div class="interest-icon-circle">
          ${interestIcons[item.icon] || interestIcons['book-open']}
        </div>
        <h3 class="interest-role-title">${item.role}</h3>
        <p class="interest-quote-text">“${item.quote}”</p>
        <p class="interest-narrative-text">${item.narrative}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto;">
          ${item.tags.map(t => `<span style="font-size: 0.72rem; font-family: var(--font-mono); padding: 3px 8px; border-radius: 4px; background: rgba(168, 85, 247, 0.1); color: var(--accent-violet); border: 1px solid rgba(168, 85, 247, 0.2);">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }
}

/**
 * 7. Resume Download Verification & Feedback
 */
function initResumeDownloadVerification() {
  const downloadBtns = document.querySelectorAll('a[download]');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Initiating download: Nethra_Shree_SD_Resume.pdf', 'success');
    });
  });
}

/**
 * 8. Project Blueprint Modal Showcase
 */
function initProjectBlueprintModal() {
  const modal = document.getElementById('projectBlueprintModal');
  const openBtn = document.getElementById('openBlueprintBtn');
  const closeBtns = document.querySelectorAll('.close-modal-btn, .modal-backdrop');

  if (!modal || !openBtn) return;

  const openModal = () => {
    modal.classList.add('active');
    document.body.classList.add('modal-active');
    modal.querySelector('.modal-card').focus();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-active');
    openBtn.focus();
  };

  openBtn.addEventListener('click', openModal);

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * 9. Functional Contact Form with Mailto Fallback
 * Validates form and opens real email client to nebula8002@gmail.com
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('senderSubject').value.trim() || 'Portfolio Inquiry / Collaboration';
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
      </svg>
      <span>Opening Email Client...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      if (formFeedback) {
        formFeedback.classList.remove('hidden');
      }

      // Generate actual mailto URI to Nethra's real email
      const targetEmail = (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA.personal && PORTFOLIO_DATA.personal.email)
        ? PORTFOLIO_DATA.personal.email
        : 'nebula8002@gmail.com';

      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Nethra,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      // Open email client
      window.location.href = mailtoUrl;

      showToast(`Thank you, ${name}! Your email draft has been generated for ${targetEmail}.`, 'success');
    }, 700);
  });
}

/**
 * 10. Copy to Clipboard with Toast Notification
 */
function initCopyToClipboard() {
  const copyButtons = document.querySelectorAll('.copy-trigger');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-text');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`, 'success');
        const originalText = btn.getAttribute('data-original-label') || btn.innerHTML;
        btn.setAttribute('data-original-label', originalText);
        btn.classList.add('copied');
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Copied!</span>
        `;

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('copied');
        }, 2200);
      }).catch(() => {
        showToast('Could not automatically copy. Please copy manually.', 'error');
      });
    });
  });
}

/**
 * 11. Toast Notification System
 */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.setAttribute('role', 'alert');

  const iconSvg = type === 'success'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    <div class="toast-content">
      ${iconSvg}
      <span>${message}</span>
    </div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('visible');
  }, 20);

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

/**
 * 12. Scroll Reveal Animations using IntersectionObserver
 */
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.fade-up-init').forEach(el => el.classList.add('in-view'));
    return;
  }

  const revealElements = document.querySelectorAll('.fade-up-init');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('in-view'));
  }
}

/**
 * 13. Dynamic Current Year
 */
function setCurrentYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => {
    el.textContent = currentYear;
  });
}
