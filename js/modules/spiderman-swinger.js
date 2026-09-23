/**
 * NITHIN JOHNSON - FULL-SCREEN SPIDER-MAN SCROLL SWINGER
 * Dynamic swinging journey traversing all areas of the screen as you scroll through the portfolio
 */

export class SpidermanSwinger {
  constructor(containerId = 'spiderman-swinger-root') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scrollY = window.scrollY;
    this.lastScrollY = window.scrollY;
    this.scrollVelocity = 0;
    this.maxScroll = document.documentElement.scrollHeight - window.innerHeight || 4000;
    
    // Physics & coordinates
    this.currentX = window.innerWidth * 0.82;
    this.currentY = window.innerHeight * 0.22;
    this.targetX = this.currentX;
    this.targetY = this.currentY;
    
    this.currentAngle = 0;
    this.targetAngle = 0;
    this.anchorX = window.innerWidth * 0.85;
    this.anchorY = -20;
    this.activeAnchorIndex = 0;
    
    this.time = 0;
    this.isFlipping = false;
    this.flipRotation = 0;

    // Audio tracking
    this.lastAnchorIndex = -1;
    this.lastSwingSoundTime = 0;

    // Web Anchor Points spanning across the screen
    this.updateAnchorPoints();

    this.init();
  }

  updateAnchorPoints() {
    const w = window.innerWidth;
    this.anchors = [
      { x: w * 0.88, y: -20 }, // Top Right
      { x: w * 0.35, y: -25 }, // Top Center-Left
      { x: w * 0.08, y: -10 }, // Top Left
      { x: w * 0.92, y: 40  }, // Upper Right Margin
      { x: w * 0.65, y: -20 }, // Top Center-Right
      { x: w * 0.15, y: 60  }  // Upper Left Margin
    ];
  }

  init() {
    // Completely disable on mobile screens
    if (window.innerWidth <= 768) {
      if (this.container) {
        this.container.style.display = 'none';
        this.container.innerHTML = '';
      }
      return;
    }
    this.renderMarkup();
    this.cacheElements();
    this.bindEvents();
    this.animate();
  }

  renderMarkup() {
    this.container.innerHTML = `
      <div class="spidey-fullscreen-stage">
        <svg class="spidey-full-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Glowing Web Strand Gradient -->
            <linearGradient id="fullscreenWebGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
              <stop offset="50%" stop-color="#00D2FF" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#E10600" stop-opacity="0.9"/>
            </linearGradient>

            <!-- Spider Glow Filter -->
            <filter id="spideyDropShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.75"/>
            </filter>
          </defs>

          <!-- Web Attachment Anchor Node -->
          <circle id="spidey-anchor-dot" cx="0" cy="0" r="4.5" fill="#00D2FF"/>
          <circle id="spidey-anchor-ring" cx="0" cy="0" r="9" fill="none" stroke="#00D2FF" stroke-width="1.5" opacity="0.6"/>

          <!-- Dynamic Flexible Web Line -->
          <path id="spidey-full-web" d="M 0,0 Q 0,0 0,0" fill="none" stroke="url(#fullscreenWebGrad)" stroke-width="2" stroke-linecap="round"/>

          <!-- Spider-Sense Alert Burst (Active during rapid swinging) -->
          <g id="spidey-sense-alert" opacity="0">
            <path d="M -18,-42 Q 0,-56 18,-42" fill="none" stroke="#00D2FF" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M -26,-50 Q 0,-68 26,-50" fill="none" stroke="#E10600" stroke-width="2.5" stroke-linecap="round"/>
          </g>

          <!-- Articulated Mini Spider-Man Character -->
          <g id="spidey-avatar" filter="url(#spideyDropShadow)" style="cursor: pointer;">
            
            <!-- Web Shooting Arm (reaching up holding the web strand) -->
            <path id="spidey-arm-web" d="M 0,-14 Q 14,-34 6,-46" fill="none" stroke="#E10600" stroke-width="6" stroke-linecap="round"/>
            <circle cx="6" cy="-46" r="4.5" fill="#E10600" stroke="#050508" stroke-width="1"/>

            <!-- Trailing Arm -->
            <path id="spidey-arm-back" d="M -8,-10 Q -24,-6 -20,-22" fill="none" stroke="#1E3A8A" stroke-width="5" stroke-linecap="round"/>
            <circle cx="-20" cy="-22" r="3.5" fill="#E10600"/>

            <!-- Torso: Blue Outer Panels + Red Center Suit -->
            <path d="M -10,-14 L 10,-14 L 8,8 L -8,8 Z" fill="#1E3A8A" rx="2"/>
            <path d="M -6,-16 L 6,-16 L 5,10 L -5,10 Z" fill="#E10600"/>
            <!-- Spider Chest Emblem -->
            <polygon points="0,-10 -3,-5 0,0 3,-5" fill="#050508"/>
            <line x1="-5" y1="-8" x2="5" y2="-4" stroke="#050508" stroke-width="1"/>
            <line x1="-5" y1="-4" x2="5" y2="-8" stroke="#050508" stroke-width="1"/>

            <!-- Leading Leg (Extended Forward in Air) -->
            <path id="spidey-leg-fwd" d="M 4,8 Q 20,24 12,38" fill="none" stroke="#1E3A8A" stroke-width="6" stroke-linecap="round"/>
            <path d="M 12,36 L 18,40" fill="none" stroke="#E10600" stroke-width="5" stroke-linecap="round"/> <!-- Red boot -->

            <!-- Trailing Leg (Tucked Back) -->
            <path id="spidey-leg-bwd" d="M -4,8 Q -16,14 -8,28" fill="none" stroke="#1E3A8A" stroke-width="6" stroke-linecap="round"/>
            <path d="M -8,26 L -3,32" fill="none" stroke="#E10600" stroke-width="5" stroke-linecap="round"/> <!-- Red boot -->

            <!-- Spider-Man Head & Mask -->
            <ellipse cx="0" cy="-22" rx="11.5" ry="13.5" fill="#E10600" stroke="#050508" stroke-width="1.2"/>
            <!-- Web Grid on Mask -->
            <line x1="0" y1="-35" x2="0" y2="-9" stroke="#050508" stroke-width="0.8" opacity="0.35"/>
            <line x1="-11" y1="-22" x2="11" y2="-22" stroke="#050508" stroke-width="0.8" opacity="0.35"/>
            <ellipse cx="0" cy="-22" rx="7" ry="8" fill="none" stroke="#050508" stroke-width="0.6" opacity="0.35"/>

            <!-- Glowing White Spider-Man Eyes -->
            <!-- Left Eye -->
            <path d="M -8,-24 Q -3,-28 -2,-21 Q -5,-19 -8,-24 Z" fill="#FFFFFF" stroke="#050508" stroke-width="1.8"/>
            <!-- Right Eye -->
            <path d="M 8,-24 Q 3,-28 2,-21 Q 5,-19 8,-24 Z" fill="#FFFFFF" stroke="#050508" stroke-width="1.8"/>
          </g>
        </svg>

        <!-- Tooltip Label -->
        <div class="spidey-hover-pill">SPIDER-MAN · CLICK TO FLIP!</div>
      </div>
    `;
  }

  cacheElements() {
    this.stage = this.container.querySelector('.spidey-fullscreen-stage');
    this.avatar = this.container.querySelector('#spidey-avatar');
    this.webLine = this.container.querySelector('#spidey-full-web');
    this.anchorDot = this.container.querySelector('#spidey-anchor-dot');
    this.anchorRing = this.container.querySelector('#spidey-anchor-ring');
    this.senseAlert = this.container.querySelector('#spidey-sense-alert');
    this.legFwd = this.container.querySelector('#spidey-leg-fwd');
    this.legBwd = this.container.querySelector('#spidey-leg-bwd');
    this.tooltip = this.container.querySelector('.spidey-hover-pill');
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        if (this.container) {
          this.container.style.display = 'none';
          this.container.innerHTML = '';
          this.avatar = null;
        }
        return;
      }
      if (this.container) {
        this.container.style.display = 'block';
        if (!this.avatar) {
          this.renderMarkup();
          this.cacheElements();
          this.bindAvatarEvents();
          this.animate();
        }
      }
      this.updateAnchorPoints();
      this.maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    });

    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 768) return;
      const currentY = window.scrollY;
      const delta = currentY - this.lastScrollY;
      this.scrollVelocity = delta;
      this.lastScrollY = currentY;
      this.scrollY = currentY;
    }, { passive: true });

    this.bindAvatarEvents();
  }

  bindAvatarEvents() {
    if (!this.avatar) return;
    this.avatar.addEventListener('click', (e) => {
      e.stopPropagation();
      this.triggerFlip();
    });

    this.avatar.addEventListener('mouseenter', () => {
      if (this.tooltip) this.tooltip.classList.add('visible');
    });

    this.avatar.addEventListener('mouseleave', () => {
      if (this.tooltip) this.tooltip.classList.remove('visible');
    });
  }

  triggerFlip() {
    if (this.isFlipping) return;
    this.isFlipping = true;
    this.flipRotation = 0;

    // Trigger acrobatic 360 spin sound
    if (window.soundEffectsInstance) {
      window.soundEffectsInstance.playFlipSound();
    }

    if (this.senseAlert) {
      this.senseAlert.style.opacity = '1';
      setTimeout(() => {
        if (this.senseAlert) this.senseAlert.style.opacity = '0';
      }, 700);
    }

    const doFlip = () => {
      this.flipRotation += 24;
      if (this.flipRotation < 360) {
        requestAnimationFrame(doFlip);
      } else {
        this.flipRotation = 0;
        this.isFlipping = false;
      }
    };
    doFlip();
  }

  calculateTrajectory(scrollProgress) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Multi-phase swinging path across the entire screen:
    // Uses smooth sine waves across scroll progress to traverse left, center, right, high, and low!
    const t = scrollProgress * Math.PI * 4; // 2 complete swing cycles across full page scroll

    // Horizontal Position: Swings between 12% width and 88% width
    const targetX = (w * 0.5) + (Math.sin(t) * w * 0.38);

    // Vertical Position: Dips down to 65% of screen height during mid-swing, rises to 20% on release
    const swingDip = Math.abs(Math.cos(t)); // 0 to 1
    const targetY = (h * 0.22) + (swingDip * h * 0.42);

    // Pick closest anchor point above current trajectory
    const anchorIdx = Math.floor(scrollProgress * this.anchors.length) % this.anchors.length;
    const currentAnchor = this.anchors[anchorIdx];

    // Body Tilt Angle: Aligned with swing arc direction + scroll velocity
    const swingDirection = Math.cos(t);
    const targetAngle = (swingDirection * 35) + Math.max(-30, Math.min(30, this.scrollVelocity * 0.8));

    return {
      x: targetX,
      y: targetY,
      anchorX: currentAnchor.x,
      anchorY: currentAnchor.y,
      angle: targetAngle
    };
  }

  animate() {
    if (window.innerWidth <= 768) return;

    this.time += 0.025;
    this.maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = Math.min(1, Math.max(0, this.scrollY / this.maxScroll));

    // Calculate current trajectory point across the screen
    const traj = this.calculateTrajectory(scrollProgress);

    // Audio Trigger on Anchor Switch or Significant Swing Arc
    const anchorIdx = Math.floor(scrollProgress * this.anchors.length) % this.anchors.length;
    const now = performance.now();
    const vel = Math.abs(this.scrollVelocity);

    if (this.lastAnchorIndex !== -1 && anchorIdx !== this.lastAnchorIndex && vel > 1.2) {
      if (now - this.lastSwingSoundTime > 360) {
        if (window.soundEffectsInstance) {
          window.soundEffectsInstance.playWebSwing(vel);
        }
        this.lastSwingSoundTime = now;
      }
    } else if (vel > 8 && (now - this.lastSwingSoundTime > 520)) {
      if (window.soundEffectsInstance) {
        window.soundEffectsInstance.playWebSwing(vel);
      }
      this.lastSwingSoundTime = now;
    }
    this.lastAnchorIndex = anchorIdx;

    // Smooth Lerp Damping towards trajectory
    this.currentX += (traj.x - this.currentX) * 0.12;
    this.currentY += (traj.y - this.currentY) * 0.12;
    this.currentAngle += (traj.angle - this.currentAngle) * 0.14;
    this.anchorX += (traj.anchorX - this.anchorX) * 0.15;
    this.anchorY += (traj.anchorY - this.anchorY) * 0.15;

    // Gentle breathing hover when scroll is idle
    const idleWave = Math.sin(this.time * 2.0) * 4;
    const renderX = this.currentX;
    const renderY = this.currentY + idleWave;
    const renderAngle = this.currentAngle + this.flipRotation;

    // 1. Update Anchor Point
    if (this.anchorDot && this.anchorRing) {
      this.anchorDot.setAttribute('cx', this.anchorX);
      this.anchorDot.setAttribute('cy', this.anchorY);
      this.anchorRing.setAttribute('cx', this.anchorX);
      this.anchorRing.setAttribute('cy', this.anchorY);
    }

    // 2. Update Dynamic Web Curve
    if (this.webLine) {
      // Dynamic tension midpoint
      const midX = (this.anchorX + renderX) * 0.5 - (this.scrollVelocity * 0.6);
      const midY = (this.anchorY + renderY) * 0.5;
      const handX = renderX + Math.sin((renderAngle * Math.PI) / 180) * 8;
      const handY = renderY - 42;

      this.webLine.setAttribute('d', `M ${this.anchorX},${this.anchorY} Q ${midX},${midY} ${handX},${handY}`);
    }

    // 3. Update Spider-Man Avatar Position and Rotation
    if (this.avatar) {
      this.avatar.setAttribute('transform', `translate(${renderX}, ${renderY}) rotate(${renderAngle})`);
    }

    // 4. Update Spider-Sense Alert Pulse on High Velocity
    if (this.senseAlert) {
      const speed = Math.abs(this.scrollVelocity);
      if (speed > 12) {
        this.senseAlert.style.opacity = Math.min(1, (speed - 12) / 20);
        this.senseAlert.setAttribute('transform', `translate(${renderX}, ${renderY}) rotate(${renderAngle})`);
      } else if (!this.isFlipping) {
        this.senseAlert.style.opacity = '0';
      }
    }

    // 5. Dynamic Leg Flex
    if (this.legFwd && this.legBwd) {
      const legTilt = Math.max(-18, Math.min(18, this.scrollVelocity * 0.4));
      this.legFwd.setAttribute('transform', `rotate(${-legTilt}, 4, 8)`);
      this.legBwd.setAttribute('transform', `rotate(${legTilt * 0.8}, -4, 8)`);
    }

    // 6. Update Tooltip Position
    if (this.tooltip) {
      this.tooltip.style.left = `${renderX}px`;
      this.tooltip.style.top = `${renderY + 50}px`;
    }

    // Slowly decay scroll velocity
    this.scrollVelocity *= 0.88;

    requestAnimationFrame(() => this.animate());
  }
}
