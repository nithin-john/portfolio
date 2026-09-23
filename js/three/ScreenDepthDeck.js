/**
 * NITHIN JOHNSON - UI/UX 3D SCREEN DECK
 * Interactive 3D Perspective Screen Stacking
 */

import { PORTFOLIO_DATA } from '../data/portfolio-data.js';

export class ScreenDepthDeck {
  constructor(containerId = 'deck-stage') {
    this.stage = document.getElementById(containerId);
    this.prevBtn = document.getElementById('deck-prev-btn');
    this.nextBtn = document.getElementById('deck-next-btn');
    this.currentIndex = 0;
    this.screens = PORTFOLIO_DATA.uiScreensDeck;

    if (!this.stage) return;
    this.init();
  }

  init() {
    this.renderCards();
    this.setupInteractivity();
  }

  renderCards() {
    this.stage.innerHTML = '';

    this.screens.forEach((screen, idx) => {
      const card = document.createElement('div');
      card.className = 'deck-screen-card';
      card.dataset.index = idx;

      // Mock UI graphic based on category
      const mockupSvg = this.generateMockupSvg(screen);

      card.innerHTML = `
        <div class="screen-card-header">
          <div class="screen-window-dots">
            <span class="screen-dot dot-red"></span>
            <span class="screen-dot dot-yellow"></span>
            <span class="screen-dot dot-green"></span>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim);">
            ${screen.category} · 3D PERSPECTIVE DECK
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: ${screen.accent};">
            0${idx + 1} / 0${this.screens.length}
          </div>
        </div>
        <div class="screen-card-body">
          ${mockupSvg}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 1rem;">
          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.2rem; color: #FFFFFF;">${screen.title}</h4>
            <p style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">${screen.subtitle}</p>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--spider-cyan); border: 1px solid var(--border-subtle); padding: 0.2rem 0.6rem; border-radius: 6px;">
            CLICK TO FOCUS
          </span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.currentIndex = idx;
        this.updateCardPositions();
      });

      this.stage.appendChild(card);
    });

    this.updateCardPositions();
  }

  generateMockupSvg(screen) {
    if (screen.id === 'screen-1') {
      // Enterprise AI Observability Dashboard
      return `
        <svg viewBox="0 0 760 380" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090B14; padding:15px;">
          <!-- Top metric widgets -->
          <rect x="20" y="20" width="160" height="75" rx="8" fill="#121624" stroke="rgba(255,255,255,0.08)"/>
          <text x="35" y="45" fill="#64748B" font-size="11" font-family="sans-serif">SYSTEM LATENCY</text>
          <text x="35" y="75" fill="#F8FAFC" font-size="20" font-weight="bold" font-family="sans-serif">14.2 ms</text>

          <rect x="200" y="20" width="160" height="75" rx="8" fill="#121624" stroke="rgba(255,255,255,0.08)"/>
          <text x="215" y="45" fill="#64748B" font-size="11" font-family="sans-serif">THROUGHPUT</text>
          <text x="215" y="75" fill="#00D2FF" font-size="20" font-weight="bold" font-family="sans-serif">2.4M req/s</text>

          <rect x="380" y="20" width="160" height="75" rx="8" fill="#121624" stroke="rgba(255,255,255,0.08)"/>
          <text x="395" y="45" fill="#64748B" font-size="11" font-family="sans-serif">AI CONVERSIONS</text>
          <text x="395" y="75" fill="#E10600" font-size="20" font-weight="bold" font-family="sans-serif">+34.8%</text>

          <rect x="560" y="20" width="180" height="75" rx="8" fill="#121624" stroke="rgba(255,255,255,0.08)"/>
          <text x="575" y="45" fill="#64748B" font-size="11" font-family="sans-serif">NEURAL HEALTH</text>
          <text x="575" y="75" fill="#10B981" font-size="20" font-weight="bold" font-family="sans-serif">OPTIMAL</text>

          <!-- Main Chart Area -->
          <rect x="20" y="115" width="480" height="240" rx="10" fill="#0D101C" stroke="rgba(255,255,255,0.06)"/>
          <path d="M 40 310 Q 120 220 200 250 T 360 170 T 480 140" fill="none" stroke="#E10600" stroke-width="3"/>
          <path d="M 40 310 Q 120 260 200 280 T 360 220 T 480 200" fill="none" stroke="#00D2FF" stroke-width="2" stroke-dasharray="4,4"/>

          <!-- Side Node Tree -->
          <rect x="520" y="115" width="220" height="240" rx="10" fill="#0D101C" stroke="rgba(255,255,255,0.06)"/>
          <circle cx="630" cy="160" r="18" fill="rgba(225,6,0,0.2)" stroke="#E10600"/>
          <circle cx="580" cy="240" r="14" fill="rgba(0,210,255,0.2)" stroke="#00D2FF"/>
          <circle cx="680" cy="240" r="14" fill="rgba(0,210,255,0.2)" stroke="#00D2FF"/>
          <line x1="630" y1="178" x2="580" y2="226" stroke="rgba(255,255,255,0.2)"/>
          <line x1="630" y1="178" x2="680" y2="226" stroke="rgba(255,255,255,0.2)"/>
          <text x="555" y="320" fill="#94A3B8" font-size="11" font-family="sans-serif">SPIDER SYNAPSE MESH v2</text>
        </svg>
      `;
    } else if (screen.id === 'screen-2') {
      // Mobile FinTech iOS Experience
      return `
        <svg viewBox="0 0 760 380" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#080A12; padding:20px;">
          <!-- Dual Phone Mockups -->
          <rect x="180" y="20" width="180" height="340" rx="24" fill="#121526" stroke="#2563EB" stroke-width="2"/>
          <rect x="230" y="28" width="80" height="12" rx="6" fill="#050508"/>
          <rect x="195" y="60" width="150" height="80" rx="12" fill="linear-gradient(135deg, #1E3A8A, #E10600)"/>
          <text x="210" y="85" fill="#FFFFFF" font-size="10" font-family="sans-serif">PREMIUM BLACK CARD</text>
          <text x="210" y="115" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="sans-serif">$84,920.00</text>
          
          <rect x="400" y="20" width="180" height="340" rx="24" fill="#121526" stroke="#00D2FF" stroke-width="2"/>
          <rect x="450" y="28" width="80" height="12" rx="6" fill="#050508"/>
          <circle cx="490" cy="120" r="45" fill="none" stroke="#00D2FF" stroke-width="8" stroke-dasharray="180, 40"/>
          <text x="470" y="125" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="sans-serif">78%</text>
          <text x="440" y="200" fill="#94A3B8" font-size="11" font-family="sans-serif">BIOMETRIC AUTH</text>
        </svg>
      `;
    } else if (screen.id === 'screen-3') {
      // Vanguard E-Commerce Checkout Flow
      return `
        <svg viewBox="0 0 760 380" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090B14; padding:20px;">
          <rect x="40" y="30" width="420" height="320" rx="12" fill="#111422" stroke="rgba(255,255,255,0.06)"/>
          <text x="65" y="65" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="sans-serif">ORDER CHECKOUT ARCHITECTURE</text>
          <rect x="65" y="95" width="370" height="50" rx="8" fill="#1A1F33"/>
          <circle cx="95" cy="120" r="14" fill="#E10600"/>
          <text x="125" y="125" fill="#FFFFFF" font-size="13" font-family="sans-serif">Pro Designer Suite License</text>
          <rect x="65" y="160" width="370" height="50" rx="8" fill="#1A1F33"/>
          <circle cx="95" cy="185" r="14" fill="#2563EB"/>
          <text x="125" y="190" fill="#FFFFFF" font-size="13" font-family="sans-serif">Figma Design Token Bridge</text>

          <rect x="490" y="30" width="230" height="320" rx="12" fill="#15192A" stroke="rgba(225,6,0,0.3)"/>
          <text x="515" y="65" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="sans-serif">PAYMENT SUMMARY</text>
          <text x="515" y="115" fill="#94A3B8" font-size="12" font-family="sans-serif">Subtotal: $1,450</text>
          <text x="515" y="145" fill="#94A3B8" font-size="12" font-family="sans-serif">Taxes: $0.00</text>
          <line x1="515" y1="180" x2="695" y2="180" stroke="rgba(255,255,255,0.1)"/>
          <text x="515" y="215" fill="#FFFFFF" font-size="18" font-weight="bold" font-family="sans-serif">Total: $1,450</text>
          <rect x="515" y="250" width="180" height="45" rx="8" fill="#E10600"/>
          <text x="555" y="278" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="sans-serif">CONFIRM &amp; PAY</text>
        </svg>
      `;
    } else {
      // Cortex AI Prompt & Canvas Studio
      return `
        <svg viewBox="0 0 760 380" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#07080F; padding:20px;">
          <!-- Node flow diagram -->
          <rect x="40" y="50" width="180" height="90" rx="8" fill="#121626" stroke="#E10600"/>
          <text x="60" y="80" fill="#FFA8A8" font-size="11" font-family="sans-serif">PROMPT ENCODER</text>
          <text x="60" y="110" fill="#FFFFFF" font-size="13" font-family="sans-serif">Claude 3.5 Sonnet</text>

          <rect x="290" y="130" width="180" height="90" rx="8" fill="#121626" stroke="#00D2FF"/>
          <text x="310" y="160" fill="#80E8FF" font-size="11" font-family="sans-serif">DIFFUSION CORE</text>
          <text x="310" y="190" fill="#FFFFFF" font-size="13" font-family="sans-serif">Midjourney v6.1</text>

          <rect x="540" y="210" width="180" height="90" rx="8" fill="#121626" stroke="#10B981"/>
          <text x="560" y="240" fill="#6EE7B7" font-size="11" font-family="sans-serif">VECTOR EXPONENT</text>
          <text x="560" y="270" fill="#FFFFFF" font-size="13" font-family="sans-serif">SVG Token Output</text>

          <!-- Connecting splines -->
          <path d="M 220 95 C 255 95, 255 175, 290 175" fill="none" stroke="#E10600" stroke-width="2"/>
          <path d="M 470 175 C 505 175, 505 255, 540 255" fill="none" stroke="#00D2FF" stroke-width="2"/>
        </svg>
      `;
    }
  }

  updateCardPositions() {
    const cards = this.stage.querySelectorAll('.deck-screen-card');
    const total = cards.length;

    cards.forEach((card, idx) => {
      // Relative offset from current active index
      const offset = (idx - this.currentIndex + total) % total;

      let tz = -offset * 90;
      let ty = -offset * 25;
      let scale = 1 - offset * 0.05;
      let opacity = 1 - offset * 0.2;
      let zIndex = total - offset;

      if (offset > 2) {
        opacity = 0;
        tz = -300;
      }

      card.style.transform = `translateZ(${tz}px) translateY(${ty}px) scale(${scale})`;
      card.style.zIndex = zIndex;
      card.style.opacity = opacity;
      card.classList.toggle('active', offset === 0);
    });
  }

  setupInteractivity() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex - 1 + this.screens.length) % this.screens.length;
        this.updateCardPositions();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex + 1) % this.screens.length;
        this.updateCardPositions();
      });
    }

    // 3D tilt tracking over the stage
    this.stage.addEventListener('mousemove', (e) => {
      const rect = this.stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      this.stage.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`;
    });

    this.stage.addEventListener('mouseleave', () => {
      this.stage.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
}
