/**
 * NITHIN JOHNSON - SPIDER-MAN SOUND & CINEMATIC THEME ENGINE
 * Plays the modern Spider-Man theme background music (default ON with gesture autoplay)
 * and synthesizes the iconic web-shooter "THWIP!" and aerodynamic swing "WHOOSH!".
 */

export class SoundEffects {
  constructor(toggleBtnId = 'sound-toggle-btn') {
    this.toggleBtn = document.getElementById(toggleBtnId);
    this.audioCtx = null;
    this.noiseBuffer = null;

    // Enabled by default on initial page load as requested!
    this.isEnabled = true;
    this.hasUserInteracted = false;

    // Audio Element for the modern Spider-Man Theme Song
    this.themeAudio = document.getElementById('spiderman-theme-audio');
    if (!this.themeAudio) {
      this.themeAudio = new Audio('assets/audio/spiderman-theme.mp3');
      this.themeAudio.id = 'spiderman-theme-audio';
      this.themeAudio.loop = true;
      document.body.appendChild(this.themeAudio);
    }
    this.themeAudio.loop = true;
    this.themeAudio.volume = 0.28; // Tasteful, balanced ambient level

    // Expose instance globally for SpidermanSwinger and UI modules
    window.soundEffectsInstance = this;

    this.init();
  }

  init() {
    // 1. Hook toggle button click
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleSound();
      });
    }

    // 2. Attempt immediate play, or register gesture listener for browser autoplay policy
    this.startTheme();
    this.setupAutoplayGestureTriggers();

    // 3. UI interaction tones
    document.querySelectorAll('a, button, .project-card, .deck-screen-card, .art-masonry-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (this.isEnabled) this.playHoverTone();
      });
      el.addEventListener('click', () => {
        if (this.isEnabled) this.playClickBlip();
      });
    });
  }

  /**
   * Browser Autoplay Policy Handler:
   * Modern browsers block unmuted audio until the user touches, scrolls, or clicks anything.
   * We listen on window for the very first user gesture and immediately kick off audio!
   */
  setupAutoplayGestureTriggers() {
    const onFirstGesture = () => {
      this.hasUserInteracted = true;
      if (this.isEnabled) {
        this.ensureContext();
        if (this.themeAudio && this.themeAudio.paused) {
          this.themeAudio.play().then(() => {
            this.updateButtonUI(true);
          }).catch(() => {});
        }
      }

      // Remove one-time listeners once triggered
      ['click', 'touchstart', 'scroll', 'wheel', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, onFirstGesture, { capture: true });
      });
    };

    ['click', 'touchstart', 'scroll', 'wheel', 'keydown'].forEach(evt => {
      window.addEventListener(evt, onFirstGesture, { capture: true, once: true });
    });
  }

  ensureContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();

        this.sfxGain = this.audioCtx.createGain();
        this.sfxGain.gain.setValueAtTime(0.85, this.audioCtx.currentTime);
        this.sfxGain.connect(this.audioCtx.destination);

        this.generateNoiseBuffer();
      }
    }

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  generateNoiseBuffer() {
    if (!this.audioCtx) return;
    const bufferSize = this.audioCtx.sampleRate * 2;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2) - 1;
    }
    this.noiseBuffer = buffer;
  }

  startTheme() {
    if (!this.isEnabled || !this.themeAudio) return;

    this.themeAudio.volume = 0.28;
    const playPromise = this.themeAudio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.updateButtonUI(true);
      }).catch(() => {
        // Autoplay policy prevented immediate playback without user interaction yet;
        // The one-time listener in setupAutoplayGestureTriggers will play on first click/scroll!
        this.updateButtonUI(true); // Keep active state ready
      });
    }
  }

  stopTheme() {
    if (!this.themeAudio) return;

    // Smooth volume fade out before pausing
    let currentVol = this.themeAudio.volume;
    const fadeInterval = setInterval(() => {
      currentVol -= 0.05;
      if (currentVol <= 0.02) {
        clearInterval(fadeInterval);
        this.themeAudio.pause();
        this.themeAudio.volume = 0.28; // reset for next resume
      } else {
        this.themeAudio.volume = currentVol;
      }
    }, 40);
  }

  toggleSound() {
    this.ensureContext();
    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.startTheme();
      this.playActivateChime();
      this.updateButtonUI(true);
    } else {
      this.stopTheme();
      this.updateButtonUI(false);
    }
  }

  updateButtonUI(active) {
    if (!this.toggleBtn) return;
    this.toggleBtn.classList.toggle('active', active);

    if (active) {
      this.toggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
      this.toggleBtn.title = 'Spider-Man Theme & Audio: ON (Click to Mute)';
    } else {
      this.toggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
      this.toggleBtn.title = 'Spider-Man Theme & Audio: OFF (Click to Play)';
    }
  }

  /**
   * Spider-Man Web Shoot & Aerodynamic Swing Sound ("THWIP! WHOOSH!")
   * Triggered whenever Spider-Man swings across anchors or scroll velocity surges
   */
  playWebSwing(velocity = 5) {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const intensity = Math.min(1.4, Math.max(0.7, velocity / 10));

    // 1. THE WEB-SHOOT "THWIP!"
    const thwipOsc = this.audioCtx.createOscillator();
    const thwipFilter = this.audioCtx.createBiquadFilter();
    const thwipGain = this.audioCtx.createGain();

    thwipOsc.type = 'sawtooth';
    thwipOsc.frequency.setValueAtTime(2600, now);
    thwipOsc.frequency.exponentialRampToValueAtTime(420, now + 0.08);

    thwipFilter.type = 'bandpass';
    thwipFilter.frequency.setValueAtTime(3200, now);
    thwipFilter.frequency.exponentialRampToValueAtTime(700, now + 0.08);
    thwipFilter.Q.setValueAtTime(4.5, now);

    thwipGain.gain.setValueAtTime(0.22 * intensity, now);
    thwipGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    thwipOsc.connect(thwipFilter);
    thwipFilter.connect(thwipGain);
    thwipGain.connect(this.sfxGain);

    thwipOsc.start(now);
    thwipOsc.stop(now + 0.09);

    // High frequency hiss of pressurized web release
    if (this.noiseBuffer) {
      const hissSource = this.audioCtx.createBufferSource();
      const hissFilter = this.audioCtx.createBiquadFilter();
      const hissGain = this.audioCtx.createGain();

      hissSource.buffer = this.noiseBuffer;
      hissFilter.type = 'bandpass';
      hissFilter.frequency.setValueAtTime(2000, now);
      hissFilter.frequency.exponentialRampToValueAtTime(850, now + 0.07);
      hissFilter.Q.setValueAtTime(3, now);

      hissGain.gain.setValueAtTime(0.15 * intensity, now);
      hissGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      hissSource.connect(hissFilter);
      hissFilter.connect(hissGain);
      hissGain.connect(this.sfxGain);

      hissSource.start(now);
      hissSource.stop(now + 0.08);
    }

    // 2. THE AERODYNAMIC "WHOOSH" (Air velocity rush as Spidey arcs through space)
    const whooshStartTime = now + 0.03;
    const whooshDuration = 0.36;

    if (this.noiseBuffer) {
      const windSource = this.audioCtx.createBufferSource();
      const windFilter = this.audioCtx.createBiquadFilter();
      const windGain = this.audioCtx.createGain();

      windSource.buffer = this.noiseBuffer;
      windFilter.type = 'lowpass';
      windFilter.frequency.setValueAtTime(320, whooshStartTime);
      windFilter.frequency.linearRampToValueAtTime(1100 * intensity, whooshStartTime + (whooshDuration * 0.4));
      windFilter.frequency.exponentialRampToValueAtTime(380, whooshStartTime + whooshDuration);

      windGain.gain.setValueAtTime(0.001, whooshStartTime);
      windGain.gain.linearRampToValueAtTime(0.18 * intensity, whooshStartTime + (whooshDuration * 0.35));
      windGain.gain.exponentialRampToValueAtTime(0.0001, whooshStartTime + whooshDuration);

      windSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.sfxGain);

      windSource.start(whooshStartTime);
      windSource.stop(whooshStartTime + whooshDuration + 0.02);
    }

    // Low aerodynamic body swoosh (sine drop)
    const bodyOsc = this.audioCtx.createOscillator();
    const bodyGain = this.audioCtx.createGain();

    bodyOsc.type = 'sine';
    bodyOsc.frequency.setValueAtTime(220, whooshStartTime);
    bodyOsc.frequency.exponentialRampToValueAtTime(75, whooshStartTime + whooshDuration);

    bodyGain.gain.setValueAtTime(0.15 * intensity, whooshStartTime);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, whooshStartTime + whooshDuration);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(this.sfxGain);

    bodyOsc.start(whooshStartTime);
    bodyOsc.stop(whooshStartTime + whooshDuration + 0.02);
  }

  /**
   * Acrobatic 360-Degree Flip Sound (Triggered when clicking the mini Spider-Man)
   */
  playFlipSound() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;

    // Double swing whoosh
    this.playWebSwing(14);

    // Ascending Spider-Sense acrobatic chime
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const t = now + (idx * 0.05);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.25);
    });
  }

  playHoverTone() {
    if (!this.isEnabled || !this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(640, this.audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.015, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.08);
  }

  playClickBlip() {
    if (!this.isEnabled || !this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.12);
  }

  playActivateChime() {
    if (!this.audioCtx) return;
    const notes = [330, 440, 554, 659];
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const startTime = this.audioCtx.currentTime + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.035, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }
}
