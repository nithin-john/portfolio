/**
 * NITHIN JOHNSON - MASTER SCRIPT
 * Orchestration, Data Mounting, Interactive Micro-Behaviors
 */

import { PORTFOLIO_DATA } from './data/portfolio-data.js';
import { CustomCursor } from './modules/cursor.js';
import { WebGLHeroWeb } from './three/WebGLHeroWeb.js';
import { CaseStudyModal } from './modules/case-study-modal.js';
import { GalleryWall } from './modules/gallery-wall.js';
import { SoundEffects } from './modules/sound-effects.js';
import { ScrollController } from './modules/smooth-scroll.js';
import { SpidermanSwinger } from './modules/spiderman-swinger.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    // 1. Mount Data from Portfolio Single Source of Truth
    this.mountPersonalData();
    this.mountExperienceTimeline();
    this.mountSkillsData();
    this.mountProjectsData();
    this.mountPhilosophy();
    this.mountContactData();

    // 2. Initialize Interactive Modules
    this.cursor = new CustomCursor();
    this.heroWeb = new WebGLHeroWeb('hero-webgl-canvas');
    this.caseStudyModal = new CaseStudyModal();
    this.galleryWall = new GalleryWall('art-masonry-grid', 'art-wall-filters');
    this.soundEffects = new SoundEffects('sound-toggle-btn');
    this.scrollController = new ScrollController();
    this.spidermanSwinger = new SpidermanSwinger('spiderman-swinger-root');

    // 3. Setup General Interactivity (Clipboard, Mobile Drawer, Preloader)
    this.setupMobileMenu();
    this.setupClipboard();
    this.handlePreloader();
  }

  mountPersonalData() {
    const { personal, aiExpertise } = PORTFOLIO_DATA;

    // Stat items in About section
    const statsContainer = document.getElementById('about-stats-grid');
    if (statsContainer) {
      statsContainer.innerHTML = personal.stats.map(s => `
        <div class="stat-item">
          <span class="stat-value">${s.value}</span>
          <span class="stat-label">${s.label}</span>
        </div>
      `).join('');
    }

    // AI Expertise Tools
    const aiToolsContainer = document.getElementById('ai-tools-pills');
    if (aiToolsContainer) {
      aiToolsContainer.innerHTML = aiExpertise.tools.map(tool => `
        <span class="ai-pill">
          <span style="color: var(--spider-cyan);">✦</span> ${tool}
        </span>
      `).join('');
    }
  }

  mountExperienceTimeline() {
    const timelineContainer = document.getElementById('experience-timeline-container');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
      <div class="timeline-entry" data-id="${exp.id}">
        <div class="timeline-year-col">
          <div class="timeline-year">${exp.period.split('–')[0].trim()}</div>
          ${exp.isCurrent ? '<div class="timeline-present-badge">CURRENT ROLE</div>' : ''}
        </div>
        <div class="timeline-card">
          <h3 class="timeline-role">${exp.role}</h3>
          <div class="timeline-company">${exp.company} · ${exp.location}</div>
          <p class="timeline-summary">${exp.summary}</p>
          <ul class="timeline-bullets">
            ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
          <div class="timeline-skills-tags">
            ${exp.skills.map(s => `<span class="timeline-tag">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  mountSkillsData() {
    const skillsContainer = document.getElementById('skills-cards-container');
    if (!skillsContainer) return;

    skillsContainer.innerHTML = PORTFOLIO_DATA.skillCategories.map(cat => `
      <div class="skill-category-card">
        <div class="skill-cat-header">
          <h3 class="skill-cat-title text-gradient-red">${cat.category}</h3>
          <p class="skill-cat-desc">${cat.description}</p>
        </div>
        <ul class="skill-items-list">
          ${cat.skills.map(s => `
            <li class="skill-bar-row">
              <div class="skill-info">
                <span>${s.name}</span>
                <span style="font-family: var(--font-mono); color: var(--spider-cyan);">${s.level}</span>
              </div>
              <div class="skill-bar-track">
                <div class="skill-bar-fill" style="width: ${s.level};"></div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  mountProjectsData() {
    const projectsContainer = document.getElementById('featured-projects-grid');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = PORTFOLIO_DATA.projects.map((proj) => {
      return `
        <article class="project-card apple-glass" data-project-id="${proj.id}">
          <div class="project-visual-wrapper">
            <img src="${proj.coverImage}" alt="${proj.title} Platform Screenshot" class="project-screenshot-img" loading="lazy">
            <div class="project-visual-overlay"></div>
            <div class="project-live-badge">
              <span class="live-pulse-dot"></span> VERIFIED PLATFORM
            </div>
          </div>
          <div class="project-card-meta">
            <div class="project-top-tags">
              <span class="project-category-tag">${proj.category}</span>
              <span class="project-year-tag">${proj.year}</span>
            </div>
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-excerpt">${proj.shortDescription}</p>
            <div class="project-footer">
              <span class="project-role-badge">${proj.role}</span>
              <span class="project-cta-link">
                EXPLORE CASE STUDY <span>→</span>
              </span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  generateProjectCardBanner(proj, idx) {
    // Generate an art-directed aesthetic graphic banner
    const colors = [
      ['#E10600', '#161A3A'],
      ['#1E3A8A', '#00D2FF'],
      ['#990000', '#0B0C14'],
      ['#2563EB', '#E10600'],
      ['#00D2FF', '#1E3A8A'],
      ['#E10600', '#2563EB']
    ];
    const [c1, c2] = colors[idx % colors.length];

    return `
      <svg viewBox="0 0 640 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#080911;">
        <defs>
          <radialGradient id="proj-grad-${proj.id}" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="${c1}" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="${c2}" stop-opacity="0.1"/>
          </radialGradient>
        </defs>

        <!-- Dynamic Web Matrix Lines -->
        <rect width="100%" height="100%" fill="#07080F"/>
        <line x1="80" y1="0" x2="80" y2="400" stroke="rgba(255,255,255,0.04)"/>
        <line x1="320" y1="0" x2="320" y2="400" stroke="rgba(255,255,255,0.04)"/>
        <line x1="560" y1="0" x2="560" y2="400" stroke="rgba(255,255,255,0.04)"/>
        <line x1="0" y1="200" x2="640" y2="200" stroke="rgba(255,255,255,0.04)"/>

        <!-- Central Glow Halo -->
        <circle cx="320" cy="180" r="160" fill="url(#proj-grad-${proj.id})"/>

        <!-- 3D Perspective Graphic Box -->
        <polygon points="220,110 420,110 470,160 270,160" fill="rgba(255,255,255,0.08)" stroke="${c1}" stroke-width="1.5"/>
        <polygon points="270,160 470,160 470,270 270,270" fill="rgba(15,18,30,0.85)" stroke="rgba(255,255,255,0.15)"/>
        <polygon points="220,110 270,160 270,270 220,220" fill="rgba(10,12,20,0.95)" stroke="rgba(255,255,255,0.1)"/>

        <!-- Accent Indicators -->
        <circle cx="470" cy="160" r="5" fill="#00D2FF"/>
        <circle cx="270" cy="160" r="5" fill="#E10600"/>
        
        <text x="50" y="360" fill="#FFFFFF" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700">
          ${proj.client.toUpperCase()}
        </text>
        <text x="50" y="380" fill="#94A3B8" font-family="monospace" font-size="11" letter-spacing="0.1em">
          [FIGMA &middot; UI/UX &middot; PRODUCTION CODE]
        </text>
      </svg>
    `;
  }

  mountPhilosophy() {
    const philContainer = document.getElementById('philosophy-cards-grid');
    if (!philContainer) return;

    philContainer.innerHTML = PORTFOLIO_DATA.designPhilosophy.map(p => `
      <div class="philosophy-card">
        <div class="philosophy-step-num">${p.step}</div>
        <h3 class="philosophy-title">${p.title}</h3>
        <div class="philosophy-subtitle">${p.subtitle}</div>
        <p class="philosophy-desc">${p.desc}</p>
      </div>
    `).join('');
  }

  mountContactData() {
    const { personal } = PORTFOLIO_DATA;
    const emailEl = document.getElementById('contact-email-val');
    const phoneEl = document.getElementById('contact-phone-val');
    const locationEl = document.getElementById('contact-location-val');

    if (emailEl) emailEl.textContent = personal.email;
    if (phoneEl) phoneEl.textContent = personal.phone;
    if (locationEl) locationEl.textContent = personal.location;
  }

  setupMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const closeBtn = document.querySelector('.mobile-nav-close');

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => drawer.classList.add('open'));
    }
    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
    }
  }

  setupClipboard() {
    const emailCard = document.getElementById('contact-email-card');
    const toast = document.getElementById('copy-toast');

    if (emailCard && toast) {
      emailCard.addEventListener('click', () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email).then(() => {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2500);
        });
      });
    }
  }

  handlePreloader() {
    const preloader = document.querySelector('.container-loader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        setTimeout(() => preloader.remove(), 600);
      }, 900);
    }
  }
}

// Start application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new App();
});
