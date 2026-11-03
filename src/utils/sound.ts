// Pure Web Audio API tactile feedback synthesizer (0 dependencies, 100% offline)

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function initSoundPreference(): boolean {
  try {
    const pref = localStorage.getItem('omnikit_sound_fx');
    soundEnabled = pref === 'true';
  } catch {
    soundEnabled = false;
  }
  return soundEnabled;
}

export function setSoundPreference(enabled: boolean): void {
  soundEnabled = enabled;
  try {
    localStorage.setItem('omnikit_sound_fx', enabled ? 'true' : 'false');
  } catch {
    // ignore
  }
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function playTactileClick(type: 'click' | 'toggle' | 'pop' | 'pin' = 'click'): void {
  if (!soundEnabled || typeof window === 'undefined') return;

  try {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      audioCtx = new AudioCtxClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    if (type === 'click') {
      // Crisp mechanical rotary/keycap micro-click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.012);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.015);
    } else if (type === 'pin') {
      // Pleasant micro-chime when favoriting
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } else if (type === 'pop') {
      // Soft navigation pop
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.025);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } else {
      // Subtle toggle switch
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.02);
    }
  } catch {
    // safe fallback
  }
}
