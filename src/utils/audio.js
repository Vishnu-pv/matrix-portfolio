class SoundEngine {
    constructor() {
        this.audioCtx = null;
        this.buffers = {};
        this.currentBgm = null;
    }

    init() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    async resume() {
        this.init();
        if (this.audioCtx.state === 'suspended') {
            await this.audioCtx.resume();
        }
    }

    async loadFile(url, name) {
        this.init();
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
            this.buffers[name] = audioBuffer;
        } catch (e) {
            console.error(`Failed to load audio: ${url}`, e);
        }
    }

    playFile(name, volume = 0.5, duration) {
        if (!this.buffers[name]) return;
        this.init();
        const source = this.audioCtx.createBufferSource();
        const gain = this.audioCtx.createGain();
        source.buffer = this.buffers[name];
        gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
        source.connect(gain);
        gain.connect(this.audioCtx.destination);

        if (duration) {
            source.start(this.audioCtx.currentTime, 0, duration);
        } else {
            source.start();
        }
        return source;
    }

    playBgm(name, volume = 0.3) {
        if (!this.buffers[name]) return;
        this.stopBgm(); // Avoid multiple layers

        this.init();
        const bgmSource = this.audioCtx.createBufferSource();
        const gain = this.audioCtx.createGain();

        bgmSource.buffer = this.buffers[name];
        bgmSource.loop = true;

        gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(volume, this.audioCtx.currentTime + 1.5); // Fade in

        bgmSource.connect(gain);
        gain.connect(this.audioCtx.destination);

        bgmSource.start();
        this.currentBgm = { source: bgmSource, gain: gain };
    }

    stopBgm() {
        if (this.currentBgm) {
            const { source, gain } = this.currentBgm;
            gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 1); // Fade out
            setTimeout(() => {
                try { source.stop(); } catch (e) { }
            }, 1000);
            this.currentBgm = null;
        }
    }

    playTyping() {
        this.init();
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(150 + Math.random() * 50, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.05);
    }

    playOpen() {
        this.init();
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(100, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.3);
    }

    playClose() {
        this.init();
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.audioCtx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.3);
    }

    playProcessing() {
        this.init();
        const now = this.audioCtx.currentTime;

        // Play a burst of 3 high-speed data "grains"
        // inspired by futuristic HUD/UI sound design
        for (let i = 0; i < 3; i++) {
            const time = now + (i * 0.04);
            const osc = this.audioCtx.createOscillator();
            const filter = this.audioCtx.createBiquadFilter();
            const gain = this.audioCtx.createGain();

            osc.type = 'sawtooth';
            // High-pitched, varied for data texture
            const freq = 2200 + (Math.random() * 800);
            osc.frequency.setValueAtTime(freq, time);

            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(freq, time);
            filter.Q.setValueAtTime(20, time); // High resonance for "pingy" quality

            gain.gain.setValueAtTime(0.015, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start(time);
            osc.stop(time + 0.02);
        }
    }
}

export const soundEngine = new SoundEngine();
