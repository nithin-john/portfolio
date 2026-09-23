/**
 * NITHIN JOHNSON - CINEMATIC SOUND SYNTHESIZER
 * Zero-dependency Web Audio API micro-haptics
 */

export class SoundEffects {
  constructor(toggleBtnId = 'sound-toggle-btn') {
    this.toggleBtn = document.getElementById(toggleBtnId);
    this.audioCtx = null;
    this.isEnabled = false;

    if (!this.toggleBtn) return;
    this.init();
  }

  init() {
    this.toggleBtn.addEventListener('click', () => {
      this.toggleSound();
    });

    // Attach listeners to interactive elements
    document.querySelectorAll('a, button, .project-card, .deck-screen-card, .art-masonry-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (this.isEnabled) this.playHoverTone();
      });
      el.addEventListener('click', () => {
        if (this.isEnabled) this.playClickBlip();
      });
    });
  }

  ensureContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.ensureContext();
    this.isEnabled = !this.isEnabled;

    if (this.toggleBtn) {
      this.toggleBtn.classList.toggle('active', this.isEnabled);
      this.toggleBtn.innerHTML = this.isEnabled
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
      this.toggleBtn.title = this.isEnabled ? 'Mute Audio' : 'Unmute Spider-Sense Audio';
    }

    if (this.isEnabled) {
      this.playActivateChime();
    }
  }

  playHoverTone() {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(640, this.audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.015, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.08);
  }

  playClickBlip() {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

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

      gain.gain.setValueAtTime(0.03, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }
}
