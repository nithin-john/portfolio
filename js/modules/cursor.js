/**
 * NITHIN JOHNSON - CUSTOM MAGNETIC SPIDER-SENSE CURSOR
 * Precision pointer follower with contextual label indicators
 */

export class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.custom-cursor');
    this.dot = document.querySelector('.cursor-dot');
    this.follower = document.querySelector('.cursor-follower');
    this.label = document.querySelector('.cursor-label');

    this.mouse = { x: -100, y: -100 };
    this.pos = { x: -100, y: -100 };
    this.speed = 0.18; // Follower damping speed
    this.isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    this.isMoving = false;

    if (!this.cursor || this.isTouch) return;
    this.init();
  }

  init() {
    // Track pointer coordinates
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      if (!this.isMoving) {
        this.pos.x = e.clientX;
        this.pos.y = e.clientY;
        this.isMoving = true;
      }
    });

    // Handle mouse leaving window
    document.addEventListener('mouseleave', () => {
      if (this.cursor) this.cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      if (this.cursor) this.cursor.style.opacity = '1';
    });

    this.setupInteractivity();
    this.render();
  }

  setupInteractivity() {
    // Dynamic contextual cursor labels
    const interactiveSelectors = [
      { sel: 'a, button, .interactive-hover', label: '', mode: 'hover' },
      { sel: '.project-card', label: 'EXPLORE', mode: 'active' },
      { sel: '.portrait-card-wrapper', label: 'NITHIN', mode: 'cyan' },
      { sel: '.spidey-swinger-wrapper', label: 'THWIP!', mode: 'active' },
      { sel: '.art-masonry-item', label: 'VIEW', mode: 'active' },
      { sel: '.contact-card', label: 'CONNECT', mode: 'active' }
    ];

    interactiveSelectors.forEach(({ sel, label, mode }) => {
      document.querySelectorAll(sel).forEach(el => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add(`cursor-${mode}`);
          if (label && this.label) {
            this.label.textContent = label;
          }
        });

        el.addEventListener('mouseleave', () => {
          document.body.classList.remove(`cursor-${mode}`);
          if (this.label) {
            this.label.textContent = '';
          }
        });
      });
    });
  }

  render() {
    // Smooth lerp interpolation for follower
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

    if (this.dot) {
      this.dot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
    }
    if (this.follower) {
      this.follower.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
    }

    requestAnimationFrame(() => this.render());
  }
}
