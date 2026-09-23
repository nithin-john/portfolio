/**
 * NITHIN JOHNSON - CASE STUDY MODAL EXPERIENCE
 * Deep-dive immersive interactive project drawer with live screenshots
 */

import { PORTFOLIO_DATA } from '../data/portfolio-data.js';

export class CaseStudyModal {
  constructor() {
    this.backdrop = document.querySelector('.case-study-modal-backdrop');
    this.drawer = document.querySelector('.case-study-drawer');
    this.closeBtn = document.querySelector('.modal-close-btn');

    if (!this.backdrop) return;
    this.init();
  }

  init() {
    // Close events
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.backdrop.classList.contains('open')) {
        this.close();
      }
    });

    // Event delegation on document for all project cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (card && card.dataset.projectId) {
        this.open(card.dataset.projectId);
      }
    });
  }

  open(projectId) {
    const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (!project) return;

    this.renderContent(project);
    this.backdrop.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  close() {
    this.backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  renderContent(project) {
    const contentContainer = document.getElementById('modal-dynamic-content');
    if (!contentContainer) return;

    const metricsHtml = project.metrics.map(m => `
      <div class="modal-metric-box">
        <span class="modal-metric-val">${m.value}</span>
        <span class="modal-metric-lbl">${m.label}</span>
      </div>
    `).join('');

    const tagsHtml = project.tags.map(t => `
      <span class="modal-tag-pill">
        ${t}
      </span>
    `).join('');

    const liveBtnHtml = project.liveUrl ? `
      <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary modal-action-live-btn">
        <span>Launch Live Platform</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    ` : '';

    const browserScreenshotHtml = project.coverImage ? `
      <div class="modal-browser-frame apple-glass">
        <div class="modal-browser-chrome">
          <div class="browser-dots">
            <span class="browser-dot dot-red"></span>
            <span class="browser-dot dot-yellow"></span>
            <span class="browser-dot dot-green"></span>
          </div>
          <div class="browser-url-pill">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <span class="browser-url-text">${project.liveUrl}</span>
          </div>
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="browser-open-link">
            VISIT ↗
          </a>
        </div>
        <div class="modal-browser-viewport">
          <img src="${project.coverImage}" alt="${project.title} Verified Screenshot" class="modal-cover-img" loading="lazy" />
        </div>
      </div>
    ` : '';

    contentContainer.innerHTML = `
      <div class="modal-header-badge-row">
        <span class="modal-tag">${project.category} · ${project.year}</span>
        <div class="modal-verified-pill">
          <span class="live-pulse-dot"></span> LIVE VERIFIED
        </div>
      </div>

      <h2 class="modal-title">${project.title}</h2>

      <div class="modal-top-actions">
        ${liveBtnHtml}
      </div>

      <!-- High-Resolution Browser Screenshot Showcase -->
      ${browserScreenshotHtml}

      <div class="modal-specs-bar apple-glass">
        <div class="modal-spec-item">
          <span class="modal-spec-label">CLIENT / CONTEXT</span>
          <span class="modal-spec-val">${project.client}</span>
        </div>
        <div class="modal-spec-item">
          <span class="modal-spec-label">ROLE</span>
          <span class="modal-spec-val" style="color: var(--spider-cyan);">${project.role}</span>
        </div>
        <div class="modal-spec-item">
          <span class="modal-spec-label">EXPERIENCE TIED TO</span>
          <span class="modal-spec-val">CV Professional Record</span>
        </div>
        <div class="modal-spec-item">
          <span class="modal-spec-label">YEAR</span>
          <span class="modal-spec-val">${project.year}</span>
        </div>
      </div>

      <div class="modal-tags-container">
        ${tagsHtml}
      </div>

      <div class="modal-metrics-grid">
        ${metricsHtml}
      </div>

      <div class="modal-section-block">
        <h3>OVERVIEW &amp; STRATEGY</h3>
        <p>${project.shortDescription}</p>
      </div>

      <div class="modal-section-block">
        <h3>THE CHALLENGE</h3>
        <p>${project.challenge}</p>
      </div>

      <div class="modal-section-block">
        <h3>DESIGN &amp; TECHNICAL APPROACH</h3>
        <p>${project.approach}</p>
      </div>

      <div class="modal-section-block">
        <h3>SOLUTION ARCHITECTURE</h3>
        <p>${project.solution}</p>
      </div>

      <div class="modal-section-block">
        <h3>MEASURABLE OUTCOME</h3>
        <p>${project.outcome}</p>
      </div>

      <div class="modal-footer-cta-block apple-glass">
        <div>
          <h4 style="font-size: 1.15rem; color: #FFFFFF; font-family: var(--font-display); font-weight: 600;">Interested in discussing this project in depth?</h4>
          <p style="font-size: 0.88rem; color: var(--text-dim); margin-top: 0.35rem;">Explore live architecture or review the design system tokens with Nithin.</p>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1rem;">
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="font-size: 0.82rem;">Open ${project.client} ↗</a>` : ''}
          <a href="#contact" onclick="document.querySelector('.modal-close-btn').click();" class="btn btn-primary" style="font-size: 0.82rem;">Connect with Nithin</a>
        </div>
      </div>
    `;
  }
}
