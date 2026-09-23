/**
 * NITHIN JOHNSON - SPIDER-MAN SOUND & CINEMATIC THEME ENGINE
 * - ON BY DEFAULT: Audio is enabled and starts playing automatically in the background.
 * - Persistent "ON" State: Button always shows active/ON by default (never reverts to OFF unless clicked).
 * - Single-Click Toggle: Click the nav button once to turn OFF; click again to turn ON.
 * - Trimmed Audio: Starts right away with the energetic build-up and heroic fanfare.
 * - Continuous Background Playback: Seamless infinite background loop.
 * - Audible Spider-Man web-shooter "THWIP!" and aerodynamic "WHOOSH!" swing effects.
 */

export class SoundEffects {
  constructor(toggleBtnId = 'sound-toggle-btn') {
    this.toggleBtn = document.getElementById(toggleBtnId);
    this.audioCtx = null;
    this.noiseBuffer = null;
    this.sfxGain = null;

    // Cinematic volume
    this.THEME_VOLUME = 0.40;

    // Audio is ON by default
    this.isEnabled = true;

    // Modern Spider-Man Theme Audio Element
    this.themeAudio = document.getElementById('spiderman-theme-audio');
    if (!this.themeAudio) {
      this.themeAudio = new Audio('assets/audio/spiderman-theme.mp3');
      this.themeAudio.id = 'spiderman-theme-audio';
      this.themeAudio.autoplay = true;
      this.themeAudio.loop = true;
      this.themeAudio.preload = 'auto';
      document.body.appendChild(this.themeAudio);
    } else {
      this.themeAudio.autoplay = true;
      this.themeAudio.loop = true;
      this.themeAudio.preload = 'auto';
    }
    this.themeAudio.volume = this.THEME_VOLUME;

    // Continuous loop safeguard
    this.themeAudio.addEventListener('ended', () => {
      if (this.isEnabled) {
        this.themeAudio.currentTime = 0;
        this.themeAudio.play().catch(() => {});
      }
    });

    // Button UI starts in the ACTIVE (ON) state
    this.updateButtonUI(true);

    // Global reference for SpidermanSwinger and UI interactions
    window.soundEffectsInstance = this;

    this.init();
  }

  init() {
    // 1. Single-click toggle: If ON -> turn OFF; If OFF -> turn ON
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleSound();
      });
    }

    // 2. Start theme audio immediately
    this.startTheme();

    // 3. Attach ambient gesture listeners for immediate playback on first interaction
    this.setupAutoplayGestureTriggers();

    // 4. Subtle UI interaction feedback tones
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
   * Browser Autoplay Compliance:
   * Modern browsers require an initial user gesture before playing unmuted audio.
   * We listen on window & document for any user gesture (tap, click, scroll, key, wheel)
   * to immediately start the theme without requiring the user to click the sound button!
   */
  setupAutoplayGestureTriggers() {
    const onUserInteraction = () => {
      if (this.isEnabled) {
        this.ensureContext();
        if (this.themeAudio && this.themeAudio.paused) {
          this.themeAudio.volume = this.THEME_VOLUME;
          this.themeAudio.play().then(() => {
            this.updateButtonUI(true);
          }).catch(() => {});
        }
      }
    };

    const events = [
      'pointerdown', 'pointerup', 'mousedown', 'mouseup',
      'touchstart', 'touchend', 'click', 'keydown',
      'wheel', 'scroll'
    ];

    events.forEach(evt => {
      window.addEventListener(evt, onUserInteraction, { capture: true, passive: true });
      document.addEventListener(evt, onUserInteraction, { capture: true, passive: true });
    });
  }

  ensureContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();

        this.sfxGain = this.audioCtx.createGain();
        this.sfxGain.gain.setValueAtTime(0.95, this.audioCtx.currentTime);
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

  /**
   * Start playback automatically in the background
   */
  startTheme() {
    if (!this.isEnabled || !this.themeAudio) return;

    this.ensureContext();
    this.themeAudio.volume = this.THEME_VOLUME;

    // If already playing, keep UI active
    if (!this.themeAudio.paused) {
      this.updateButtonUI(true);
      return;
    }

    const playPromise = this.themeAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.updateButtonUI(true);
      }).catch(() => {
        // Autoplay policy deferred until first gesture.
        // Keep UI showing ON (active) because audio is enabled by default!
        this.updateButtonUI(true);
      });
    }
  }

  /**
   * Stop background theme smoothly
   */
  stopTheme() {
    if (!this.themeAudio) return;

    let currentVol = this.themeAudio.volume;
    const fadeInterval = setInterval(() => {
      currentVol -= 0.08;
      if (currentVol <= 0.05) {
        clearInterval(fadeInterval);
        this.themeAudio.pause();
        this.themeAudio.volume = this.THEME_VOLUME;
      } else {
        this.themeAudio.volume = currentVol;
      }
    }, 25);
  }

  /**
   * Single-click toggle handler:
   * - If audio is currently ON: clicking turns it OFF.
   * - If audio is currently OFF: clicking turns it ON.
   */
  toggleSound() {
    this.ensureContext();

    const isPlaying = this.themeAudio && !this.themeAudio.paused;

    if (isPlaying) {
      // Audio is currently playing -> Turn it OFF
      this.isEnabled = false;
      this.stopTheme();
      this.updateButtonUI(false);
    } else {
      // Audio is currently paused/stopped -> Turn it ON immediately
      this.isEnabled = true;
      this.startTheme();
      this.playActivateChime();
      this.updateButtonUI(true);
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
      this.toggleBtn.title = 'Spider-Man Theme & Audio: ON (Click to Turn Off)';
    } else {
      this.toggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
      this.toggleBtn.title = 'Spider-Man Theme & Audio: OFF (Click to Turn On)';
    }
  }

  /**
   * Spider-Man Web Shoot & Aerodynamic Swing Sound ("THWIP! WHOOSH!")
   * High-gain, clearly audible mechanical snap and wind rush.
   * Completely silenced when user turns sound off (`this.isEnabled === false`).
   */
  playWebSwing(velocity = 5) {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const intensity = Math.min(1.6, Math.max(0.8, velocity / 8));

    // 1. THE WEB-SHOOT SNAP ("THWIP!")
    const thwipOsc = this.audioCtx.createOscillator();
    const thwipFilter = this.audioCtx.createBiquadFilter();
    const thwipGain = this.audioCtx.createGain();

    thwipOsc.type = 'sawtooth';
    thwipOsc.frequency.setValueAtTime(2800, now);
    thwipOsc.frequency.exponentialRampToValueAtTime(380, now + 0.08);

    thwipFilter.type = 'bandpass';
    thwipFilter.frequency.setValueAtTime(3400, now);
    thwipFilter.frequency.exponentialRampToValueAtTime(650, now + 0.08);
    thwipFilter.Q.setValueAtTime(4.5, now);

    thwipGain.gain.setValueAtTime(0.42 * intensity, now);
    thwipGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);

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
      hissFilter.frequency.setValueAtTime(2200, now);
      hissFilter.frequency.exponentialRampToValueAtTime(750, now + 0.07);
      hissFilter.Q.setValueAtTime(3.2, now);

      hissGain.gain.setValueAtTime(0.32 * intensity, now);
      hissGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      hissSource.connect(hissFilter);
      hissFilter.connect(hissGain);
      hissGain.connect(this.sfxGain);

      hissSource.start(now);
      hissSource.stop(now + 0.08);
    }

    // 2. THE AERODYNAMIC AIR CUT ("WHOOSH!")
    const whooshStartTime = now + 0.02;
    const whooshDuration = 0.40;

    if (this.noiseBuffer) {
      const windSource = this.audioCtx.createBufferSource();
      const windFilter = this.audioCtx.createBiquadFilter();
      const windGain = this.audioCtx.createGain();

      windSource.buffer = this.noiseBuffer;
      windFilter.type = 'lowpass';
      windFilter.frequency.setValueAtTime(320, whooshStartTime);
      windFilter.frequency.linearRampToValueAtTime(1400 * intensity, whooshStartTime + (whooshDuration * 0.4));
      windFilter.frequency.exponentialRampToValueAtTime(340, whooshStartTime + whooshDuration);

      windGain.gain.setValueAtTime(0.001, whooshStartTime);
      windGain.gain.linearRampToValueAtTime(0.36 * intensity, whooshStartTime + (whooshDuration * 0.35));
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
    bodyOsc.frequency.setValueAtTime(260, whooshStartTime);
    bodyOsc.frequency.exponentialRampToValueAtTime(65, whooshStartTime + whooshDuration);

    bodyGain.gain.setValueAtTime(0.30 * intensity, whooshStartTime);
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
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const t = now + (idx * 0.05);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.10, t);
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

    gain.gain.setValueAtTime(0.02, this.audioCtx.currentTime);
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

    gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
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

      gain.gain.setValueAtTime(0.05, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }
}
