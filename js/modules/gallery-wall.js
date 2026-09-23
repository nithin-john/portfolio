/**
 * NITHIN JOHNSON - GRAPHIC DESIGN & CREATIVE ART WALL
 * Interactive masonry gallery with dynamic category filters,
 * Apple Glass Lightbox modal, and multi-level Zoom & Pan Engine
 */

import { PORTFOLIO_DATA } from '../data/portfolio-data.js';

export class GalleryWall {
  constructor(gridId = 'art-masonry-grid', filterId = 'art-wall-filters') {
    this.grid = document.getElementById(gridId);
    this.filterContainer = document.getElementById(filterId);
    this.items = PORTFOLIO_DATA.graphicDesignWall;
    this.activeFilter = 'ALL';
    this.currentIndex = 0;
    this.currentFilteredItems = [...this.items];

    // Zoom & Pan State
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.startX = 0;
    this.startY = 0;

    if (!this.grid) return;
    this.init();
  }

  init() {
    this.renderFilters();
    this.renderGrid(this.items);
    this.initLightbox();
  }

  renderFilters() {
    if (!this.filterContainer) return;

    // Dynamically compute unique categories from active portfolio data
    const uniqueCats = Array.from(new Set(this.items.map(item => item.category))).filter(Boolean);
    const categories = ['ALL', ...uniqueCats];

    this.filterContainer.innerHTML = categories.map(cat => {
      const count = cat === 'ALL' 
        ? this.items.length 
        : this.items.filter(item => item.category === cat).length;
      return `
        <button class="art-filter-pill ${cat === this.activeFilter ? 'active' : ''}" data-filter="${cat}">
          ${cat} <span class="filter-count">${count}</span>
        </button>
      `;
    }).join('');

    this.filterContainer.querySelectorAll('.art-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterContainer.querySelectorAll('.art-filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.dataset.filter;

        this.currentFilteredItems = this.activeFilter === 'ALL'
          ? this.items
          : this.items.filter(item => item.category.toLowerCase() === this.activeFilter.toLowerCase());

        this.renderGrid(this.currentFilteredItems);
      });
    });
  }

  renderGrid(items) {
    this.grid.innerHTML = '';

    if (items.length === 0) {
      this.grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-dim);">
          No design works found in this category yet.
        </div>
      `;
      return;
    }

    items.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'art-masonry-item apple-glass';
      el.dataset.id = item.id;
      el.dataset.index = idx;

      const isTallWebPage = item.aspect === 'tall' && (item.category === 'UI/UX Design' || item.id.includes('portal') || item.id.includes('dashboard'));
      const thumbAspectClass = isTallWebPage ? 'aspect-tall is-web-scroll' : `aspect-${item.aspect || 'wide'}`;

      const mediaHtml = item.imageUrl 
        ? `<img src="${item.imageUrl}" alt="${item.title}" class="art-item-img ${isTallWebPage ? 'web-scroll-img' : ''}" loading="lazy" />`
        : this.generateArtSvg(item, idx);

      el.innerHTML = `
        <div class="art-item-thumb ${thumbAspectClass}">
          ${mediaHtml}
          <div class="art-item-overlay">
            <span class="art-zoom-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              Inspect &amp; Zoom
            </span>
          </div>
          <div class="art-category-badge">${item.category}</div>
        </div>
        <div class="art-item-info">
          <div class="art-item-meta">
            <span style="color: var(--spider-cyan); font-weight: 600;">${item.tag || item.category}</span>
            <span>${item.year}</span>
          </div>
          <h4 class="art-item-title" style="margin-top: 0.4rem; color: #FFFFFF;">${item.title}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.5;">${item.desc}</p>
        </div>
      `;

      // Open Lightbox on click
      el.addEventListener('click', () => {
        this.openLightbox(idx);
      });

      // Interactive hover tilt
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `translateY(-6px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });

      this.grid.appendChild(el);
    });
  }

  initLightbox() {
    if (document.getElementById('art-lightbox')) return;

    const lightbox = document.createElement('div');
    lightbox.id = 'art-lightbox';
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-dialog apple-glass">
        <!-- Close Button -->
        <button class="lightbox-close-btn" aria-label="Close Lightbox" title="Close (Esc)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <!-- Navigation Buttons -->
        <button class="lightbox-nav-btn lightbox-prev-btn" aria-label="Previous Design" title="Previous (←)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button class="lightbox-nav-btn lightbox-next-btn" aria-label="Next Design" title="Next (→)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

        <div class="lightbox-body">
          <!-- Media Viewport with Zoom Toolbar -->
          <div class="lightbox-media-viewport" id="lightbox-media-viewport">
            <!-- Floating Zoom Toolbar -->
            <div class="lightbox-zoom-toolbar apple-glass">
              <button class="zoom-btn zoom-out-btn" aria-label="Zoom Out" title="Zoom Out (-)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
              <span class="zoom-level-badge" id="zoom-level-text">100%</span>
              <button class="zoom-btn zoom-in-btn" aria-label="Zoom In" title="Zoom In (+)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
              <div class="zoom-divider"></div>
              <button class="zoom-btn zoom-fit-btn" aria-label="Fit to Viewport" title="Fit to Screen">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path></svg>
                <span>Fit</span>
              </button>
              <button class="zoom-btn zoom-actual-btn" aria-label="Actual 1:1 Size" title="100% Natural Pixels">
                <span>1:1</span>
              </button>
              <div class="zoom-divider"></div>
              <span class="zoom-hint">Scroll wheel / Drag to pan</span>
            </div>

            <!-- Media Container where image is rendered and transformed -->
            <div class="lightbox-media-container" id="lightbox-media-container">
              <!-- Image or SVG inserted here -->
            </div>
          </div>

          <!-- Metadata Drawer -->
          <div class="lightbox-details">
            <span class="lightbox-category-badge" id="lightbox-cat">CATEGORY</span>
            <h3 class="lightbox-title" id="lightbox-title">Design Title</h3>

            <div class="lightbox-meta-row">
              <div class="lightbox-meta-item">
                <span class="lightbox-meta-label">CLIENT / CONTEXT</span>
                <span class="lightbox-meta-val" id="lightbox-client">Client Name</span>
              </div>
              <div class="lightbox-meta-item">
                <span class="lightbox-meta-label">YEAR</span>
                <span class="lightbox-meta-val" id="lightbox-year">2024</span>
              </div>
            </div>

            <p class="lightbox-desc" id="lightbox-desc">Detailed design description...</p>

            <div class="lightbox-controls-guide">
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--spider-cyan); margin-bottom: 0.35rem;">
                ✦ INTERACTIVE CONTROLS
              </div>
              <p style="font-size: 0.78rem; color: var(--text-dim); line-height: 1.4; margin: 0;">
                Click image or use mouse wheel to zoom in/out. Click &amp; drag to pan across high-res details.
              </p>
            </div>

            <div style="margin-top: auto; padding-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle);">
              <span id="lightbox-counter" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">1 of 28</span>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--spider-cyan);">✦ NITHIN JOHNSON</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(lightbox);

    this.lightboxEl = lightbox;
    this.mediaViewport = lightbox.querySelector('#lightbox-media-viewport');
    this.mediaContainer = lightbox.querySelector('#lightbox-media-container');
    this.zoomLevelText = lightbox.querySelector('#zoom-level-text');

    this.closeBtn = lightbox.querySelector('.lightbox-close-btn');
    this.prevBtn = lightbox.querySelector('.lightbox-prev-btn');
    this.nextBtn = lightbox.querySelector('.lightbox-next-btn');

    // Zoom Buttons
    this.zoomInBtn = lightbox.querySelector('.zoom-in-btn');
    this.zoomOutBtn = lightbox.querySelector('.zoom-out-btn');
    this.zoomFitBtn = lightbox.querySelector('.zoom-fit-btn');
    this.zoomActualBtn = lightbox.querySelector('.zoom-actual-btn');

    this.setupLightboxEvents();
  }

  setupLightboxEvents() {
    // Close on click outside
    this.lightboxEl.addEventListener('click', (e) => {
      if (e.target === this.lightboxEl) this.closeLightbox();
    });

    this.closeBtn.addEventListener('click', () => this.closeLightbox());

    // Navigation buttons
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    // Zoom Buttons
    this.zoomInBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.zoomIn();
    });

    this.zoomOutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.zoomOut();
    });

    this.zoomFitBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.resetZoom();
    });

    this.zoomActualBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.setZoom(1.75);
    });

    // Keyboard navigation & zoom shortcuts
    window.addEventListener('keydown', (e) => {
      if (!this.lightboxEl.classList.contains('open')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === '+' || e.key === '=') this.zoomIn();
      if (e.key === '-' || e.key === '_') this.zoomOut();
      if (e.key === '0') this.resetZoom();
    });

    // Mouse Wheel Zoom
    this.mediaViewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      const newZoom = Math.min(Math.max(0.6, this.zoomLevel + delta), 4.5);
      this.setZoom(newZoom);
    }, { passive: false });

    // Prevent browser native image drag
    this.mediaContainer.addEventListener('dragstart', (e) => e.preventDefault());

    // Click & Drag Pan when zoomed
    let hasMoved = false;

    this.mediaContainer.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Only left click
      if (this.zoomLevel <= 1) return;
      
      e.preventDefault();
      this.isPanning = true;
      hasMoved = false;
      this.startX = e.clientX - this.panX;
      this.startY = e.clientY - this.panY;
      this.mediaContainer.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isPanning) return;
      const newPanX = e.clientX - this.startX;
      const newPanY = e.clientY - this.startY;
      if (Math.abs(newPanX - this.panX) > 4 || Math.abs(newPanY - this.panY) > 4) {
        hasMoved = true;
      }
      this.panX = newPanX;
      this.panY = newPanY;
      this.applyTransform();
    });

    window.addEventListener('mouseup', () => {
      if (this.isPanning) {
        this.isPanning = false;
        this.mediaContainer.classList.remove('is-dragging');
      }
    });

    // Touch support for mobile panning
    this.mediaContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1 && this.zoomLevel > 1) {
        this.isPanning = true;
        hasMoved = false;
        this.startX = e.touches[0].clientX - this.panX;
        this.startY = e.touches[0].clientY - this.panY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!this.isPanning || e.touches.length !== 1) return;
      const newPanX = e.touches[0].clientX - this.startX;
      const newPanY = e.touches[0].clientY - this.startY;
      if (Math.abs(newPanX - this.panX) > 4 || Math.abs(newPanY - this.panY) > 4) {
        hasMoved = true;
      }
      this.panX = newPanX;
      this.panY = newPanY;
      this.applyTransform();
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (this.isPanning) {
        this.isPanning = false;
      }
    });

    // Click on image to cycle zoom levels
    this.mediaContainer.addEventListener('click', (e) => {
      if (hasMoved) {
        hasMoved = false;
        return;
      }
      const targetImg = e.target.closest('.lightbox-media-img');
      if (targetImg) {
        if (this.zoomLevel === 1) {
          this.setZoom(1.8);
        } else if (this.zoomLevel < 2.5) {
          this.setZoom(2.8);
        } else {
          this.resetZoom();
        }
      }
    });
  }

  zoomIn() {
    this.setZoom(Math.min(4.5, Number((this.zoomLevel + 0.35).toFixed(2))));
  }

  zoomOut() {
    this.setZoom(Math.max(0.6, Number((this.zoomLevel - 0.35).toFixed(2))));
  }

  resetZoom() {
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
    this.applyTransform();
  }

  setZoom(scale) {
    this.zoomLevel = scale;
    if (scale <= 1) {
      this.panX = 0;
      this.panY = 0;
    }
    this.applyTransform();
  }

  applyTransform() {
    const img = this.mediaContainer.querySelector('.lightbox-media-img, svg');
    if (img) {
      img.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoomLevel})`;
      if (this.zoomLevel > 1) {
        this.mediaContainer.style.cursor = this.isPanning ? 'grabbing' : 'grab';
      } else {
        this.mediaContainer.style.cursor = 'zoom-in';
      }
    }
    if (this.zoomLevelText) {
      this.zoomLevelText.textContent = `${Math.round(this.zoomLevel * 100)}%`;
    }
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.resetZoom();
    this.updateLightboxContent();
    this.lightboxEl.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (window.lenisInstance) {
      window.lenisInstance.stop();
    }
  }

  closeLightbox() {
    this.lightboxEl.classList.remove('open');
    this.resetZoom();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (window.lenisInstance) {
      window.lenisInstance.start();
    }
  }

  prev() {
    const list = this.currentFilteredItems;
    if (list.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + list.length) % list.length;
    this.resetZoom();
    this.updateLightboxContent();
  }

  next() {
    const list = this.currentFilteredItems;
    if (list.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % list.length;
    this.resetZoom();
    this.updateLightboxContent();
  }

  updateLightboxContent() {
    const item = this.currentFilteredItems[this.currentIndex];
    if (!item) return;

    const catEl = document.getElementById('lightbox-cat');
    const titleEl = document.getElementById('lightbox-title');
    const clientEl = document.getElementById('lightbox-client');
    const yearEl = document.getElementById('lightbox-year');
    const descEl = document.getElementById('lightbox-desc');
    const counterEl = document.getElementById('lightbox-counter');

    catEl.textContent = `${item.category} ${item.tag ? '· ' + item.tag : ''}`;
    titleEl.textContent = item.title;
    clientEl.textContent = item.client || 'Commercial Project';
    yearEl.textContent = item.year || '2024';
    descEl.textContent = item.desc;
    counterEl.textContent = `${this.currentIndex + 1} of ${this.currentFilteredItems.length}`;

    if (item.imageUrl) {
      const isTall = item.aspect === 'tall';
      const isScrollPage = isTall && (item.category === 'UI/UX Design' || item.id.includes('portal') || item.id.includes('dashboard'));
      
      this.mediaContainer.innerHTML = `
        <div class="lightbox-img-wrapper ${isScrollPage ? 'scroll-page-wrapper' : ''}">
          <img src="${item.imageUrl}" alt="${item.title}" class="lightbox-media-img ${isTall ? 'scrollable-tall' : ''} ${isScrollPage ? 'web-scroll-media' : ''}" />
        </div>
      `;
    } else {
      this.mediaContainer.innerHTML = this.generateArtSvg(item, this.currentIndex);
    }

    this.applyTransform();
  }

  generateArtSvg(item, idx) {
    const colors = [
      ['#E10600', '#1E3A8A'],
      ['#1E3A8A', '#00D2FF'],
      ['#B30000', '#0A0C14'],
      ['#2563EB', '#E10600'],
      ['#00D2FF', '#161A3A']
    ];
    const [c1, c2] = colors[idx % colors.length];

    return `
      <svg viewBox="0 0 500 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090A12;">
        <defs>
          <linearGradient id="grad-${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${c1}" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="${c2}" stop-opacity="0.3"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="#080911"/>
        <line x1="50" y1="0" x2="50" y2="500" stroke="rgba(255,255,255,0.03)"/>
        <line x1="250" y1="0" x2="250" y2="500" stroke="rgba(255,255,255,0.03)"/>
        <line x1="450" y1="0" x2="450" y2="500" stroke="rgba(255,255,255,0.03)"/>
        <circle cx="250" cy="220" r="140" fill="url(#grad-${item.id})" />
        <circle cx="250" cy="220" r="160" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" stroke-dasharray="8,6"/>
        <text x="50" y="440" fill="#FFFFFF" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="700" letter-spacing="-0.03em">
          ${item.title.toUpperCase()}
        </text>
        <text x="50" y="470" fill="#94A3B8" font-family="monospace" font-size="12" letter-spacing="0.1em">
          [${item.category}]
        </text>
      </svg>
    `;
  }
}
