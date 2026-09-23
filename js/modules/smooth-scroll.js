/**
 * NITHIN JOHNSON - SMOOTH SCROLL & SECTION TRANSITIONS CONTROLLER
 * High-performance Lenis integration + IntersectionObserver cinematic section reveals
 */

export class ScrollController {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.navLinks = document.querySelectorAll('.nav-pill-item a, .mobile-nav-link');
    this.sections = document.querySelectorAll('section, header');
    this.lenis = null;

    this.init();
  }

  init() {
    // 1. Initialize Lenis with optimal responsive settings
    if (window.Lenis) {
      this.lenis = new window.Lenis({
        duration: 0.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.2,
        syncTouch: false, // Prevents fighting native macOS trackpad inertia!
        infinite: false
      });

      // Expose globally so modals and drawers can control background scroll
      window.lenisInstance = this.lenis;

      const raf = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      this.lenis.on('scroll', ({ scroll }) => {
        this.onScroll(scroll);
      });
    }

    // Standard native scroll listener (works standalone or alongside Lenis)
    window.addEventListener('scroll', () => {
      this.onScroll(window.scrollY);
    }, { passive: true });

    // 2. Setup Section Transitions & Scroll Reveal Observers
    this.setupSectionTransitions();

    // 3. Anchor link smooth navigation
    this.setupAnchorLinks();

    // 4. Back to top button
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        if (this.lenis) {
          this.lenis.scrollTo(0, { duration: 1.0 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    // Trigger initial state
    this.onScroll(window.scrollY);
  }

  setupSectionTransitions() {
    // Section Entrance Observer
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else if (entry.boundingClientRect.top > window.innerHeight) {
          // Reset when scrolling back up so it re-triggers smoothly
          entry.target.classList.remove('in-view');
        }
      });
    }, {
      rootMargin: '0px 0px -12% 0px',
      threshold: [0, 0.15, 0.3]
    });

    document.querySelectorAll('.section, .hero-section, .contact-section, .laser-divider').forEach(sec => {
      sec.classList.add('section-transition');
      sectionObserver.observe(sec);
    });

    // Staggered Item Entrance Observer
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
        }
      });
    }, {
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.1
    });

    // Observe cards, timeline entries, and art masonry items
    setTimeout(() => {
      const revealItems = document.querySelectorAll(
        '.project-card, .timeline-entry, .skill-category-card, .art-masonry-item, .philosophy-card, .stat-item'
      );
      revealItems.forEach((item, idx) => {
        item.classList.add('scroll-reveal-item');
        item.style.setProperty('--item-index', idx % 4);
        itemObserver.observe(item);
      });
    }, 100);
  }

  onScroll(scrollY) {
    const y = typeof scrollY === 'number' ? scrollY : window.scrollY;

    // Header blur elevation
    if (this.header) {
      if (y > 50) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
    }

    const delta = y - (this.lastY || y);
    this.lastY = y;

    // Active Section Tracking
    let activeId = '';
    const viewportMiddle = y + window.innerHeight * 0.35;

    this.sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (viewportMiddle >= top && viewportMiddle < top + height) {
        activeId = sec.getAttribute('id');
      }
    });

    if (activeId) {
      this.navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${activeId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    // Parallax Ambient Shifts
    const glowRed = document.querySelector('.ambient-glow-red');
    const glowBlue = document.querySelector('.ambient-glow-blue');
    if (glowRed) glowRed.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
    if (glowBlue) glowBlue.style.transform = `translate3d(0, ${-y * 0.06}px, 0)`;
  }

  setupAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (this.lenis) {
            this.lenis.scrollTo(targetEl, { offset: -70, duration: 1.0 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }

          // Close mobile nav drawer if open
          const mobileDrawer = document.querySelector('.mobile-nav-drawer');
          if (mobileDrawer) mobileDrawer.classList.remove('open');
        }
      });
    });
  }
}
