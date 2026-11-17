// Ton: alle Geräusche und die Musik werden im Browser erzeugt (Web Audio), keine Dateien, keine Lizenzen.
// SND.play('hit') usw.; SND.music(welt) startet die Musik, SND.music(-1) stoppt sie. Schalter in localStorage (ls_sound).
'use strict';
const SND = (() => {
  let ac = null, master, sfxGain, musGain, noiseBuf, musTimer = null, musWorld = -1, step = 0, nextT = 0;
  const last = {};
  const set = (() => { try { return Object.assign({sfx: true, music: true}, JSON.parse(localStorage.getItem('ls_sound') || '{}')); } catch (e) { return {sfx: true, music: true}; } })();
  const save = () => { try { localStorage.setItem('ls_sound', JSON.stringify(set)); } catch (e) {} };

  function ctx() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return ac; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ac = new AC(); master = ac.createGain(); master.gain.value = .55; master.connect(ac.destination);
    const comp = ac.createDynamicsCompressor(); comp.connect(master);
    sfxGain = ac.createGain(); sfxGain.gain.value = set.sfx ? 1 : 0; sfxGain.connect(comp);
    musGain = ac.createGain(); musGain.gain.value = set.music ? .32 : 0; musGain.connect(comp);
    noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ac;
  }
  // Bausteine: Ton mit Hüllkurve, Rauschen mit Filter
  function tone(f, dur, {type = 'square', vol = .2, f2 = null, at = 0, out = sfxGain} = {}) {
    const t = ac.currentTime + at, o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .008); g.gain.exponentialRampToValueAtTime(.0005, t + dur);
    o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + .02);
  }
  function noise(dur, {vol = .3, freq = 1200, q = 1, type = 'lowpass', f2 = null, at = 0} = {}) {
    const t = ac.currentTime + at, s = ac.createBufferSource(), fl = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = noiseBuf; fl.type = type; fl.frequency.setValueAtTime(freq, t); if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t + dur); fl.Q.value = q;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0005, t + dur);
    s.connect(fl); fl.connect(g); g.connect(sfxGain); s.start(t); s.stop(t + dur + .02);
  }
  const FX = {
    hit:     () => noise(.05, {vol: .12, freq: 2200, type: 'bandpass', q: 2}),
    kill:    () => tone(520 + Math.random() * 160, .08, {type: 'triangle', vol: .1, f2: 260}),
    gem:     () => tone(1100 + Math.random() * 300, .05, {type: 'sine', vol: .07, f2: 1600}),
    coin:    () => { tone(1320, .06, {type: 'square', vol: .06}); tone(1760, .1, {type: 'square', vol: .06, at: .05}); },
    boom:    () => { noise(.4, {vol: .35, freq: 900, f2: 80}); tone(90, .3, {type: 'sine', vol: .3, f2: 40}); },
    hurt:    () => { tone(180, .12, {type: 'sawtooth', vol: .12, f2: 90}); noise(.08, {vol: .12, freq: 600}); },
    dash:    () => noise(.22, {vol: .18, freq: 600, f2: 3000, type: 'bandpass', q: 1.5}),
    levelup: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .16, {type: 'square', vol: .1, at: i * .07})),
    right:   () => { tone(784, .1, {type: 'triangle', vol: .18}); tone(1175, .22, {type: 'triangle', vol: .18, at: .09}); },
    wrong:   () => { tone(220, .14, {type: 'square', vol: .1}); tone(165, .28, {type: 'square', vol: .1, at: .12}); },
    chest:   () => [659, 880, 1109, 1319, 1760].forEach((f, i) => tone(f, .25, {type: 'sine', vol: .12, at: i * .06})),
    pick:    () => tone(660, .08, {type: 'triangle', vol: .12, f2: 990}),
    boss:    () => { tone(110, .9, {type: 'sawtooth', vol: .16, f2: 98}); tone(165, .9, {type: 'sawtooth', vol: .1, f2: 147, at: .05}); },
    elite:   () => [392, 523, 659].forEach((f, i) => tone(f, .3, {type: 'sawtooth', vol: .08, at: i * .08})),
    station: () => [523, 784, 1047, 1568].forEach((f, i) => tone(f, .4, {type: 'sine', vol: .12, at: i * .1})),
    super:   () => { [262, 330, 392, 523, 659, 784, 1047].forEach((f, i) => tone(f, .35, {type: 'square', vol: .09, at: i * .06})); noise(.6, {vol: .15, freq: 4000, type: 'highpass', at: .3}); },
    bomb:    () => { noise(.7, {vol: .5, freq: 1200, f2: 60}); tone(70, .6, {type: 'sine', vol: .4, f2: 30}); },
    magnet:  () => tone(300, .5, {type: 'sine', vol: .14, f2: 1200}),
    heal:    () => [440, 554, 659].forEach((f, i) => tone(f, .3, {type: 'sine', vol: .12, at: i * .08})),
    over:    () => [392, 330, 262, 196].forEach((f, i) => tone(f, .3, {type: 'triangle', vol: .14, at: i * .18})),
    win:     () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, .3, {type: 'square', vol: .1, at: i * .12})),
  };
  const GAP = {hit: .05, kill: .04, gem: .035, coin: .06, boom: .12, hurt: .25};   // häufige Geräusche begrenzen
  function play(k) {
    if (!set.sfx || !FX[k] || !ctx()) return;
    const now = ac.currentTime; if (GAP[k] && now - (last[k] || 0) < GAP[k]) return; last[k] = now;
    FX[k]();
  }
  // Musik: kleine Schleife je Welt (Bass + Melodie aus einer Tonleiter), eingeplant im Voraus
  const SONGS = [
    {bpm: 112, root: 220, scale: [0, 3, 5, 7, 10], bass: [0, 0, 5, 3], mel: [0, 2, 4, 2, 3, 1, 2, -1, 0, 2, 4, 5, 4, 2, 1, -1]},
    {bpm: 120, root: 196, scale: [0, 2, 3, 7, 8], bass: [0, 0, 4, 3], mel: [4, 3, 2, -1, 1, 2, 4, -1, 3, 2, 0, -1, 1, 0, 2, -1]},
    {bpm: 128, root: 233, scale: [0, 2, 4, 7, 9], bass: [0, 3, 4, 2], mel: [2, 4, 5, 4, 2, -1, 3, 4, 0, 2, 3, 2, 4, -1, 5, 4]},
  ];
  const note = (S, d, oct = 0) => S.root * Math.pow(2, (S.scale[((d % 5) + 5) % 5] + 12 * (Math.floor(d / 5) + oct)) / 12);
  function tick() {
    if (musWorld < 0 || !ac) return;
    const S = SONGS[musWorld % SONGS.length], beat = 60 / S.bpm / 2;
    while (nextT < ac.currentTime + .25) {
      const at = nextT - ac.currentTime, m = S.mel[step % 16];
      if (step % 4 === 0) tone(note(S, S.bass[Math.floor(step / 4) % 4], -1), beat * 3.6, {type: 'triangle', vol: .5, at, out: musGain});
      if (m >= 0) tone(note(S, m, 1), beat * .9, {type: 'square', vol: .12, at, out: musGain});
      if (step % 2 === 0) { const t = ac.currentTime + at, s = ac.createBufferSource(), g = ac.createGain(), fl = ac.createBiquadFilter();
        s.buffer = noiseBuf; fl.type = 'highpass'; fl.frequency.value = 7000; g.gain.setValueAtTime(.08, t); g.gain.exponentialRampToValueAtTime(.0005, t + .05);
        s.connect(fl); fl.connect(g); g.connect(musGain); s.start(t); s.stop(t + .06); }
      nextT += beat; step++;
    }
  }
  function music(w) {
    if (w === musWorld) return; musWorld = w;
    if (musTimer) { clearInterval(musTimer); musTimer = null; }
    if (w < 0 || !ctx()) return;
    step = 0; nextT = ac.currentTime + .1; musTimer = setInterval(tick, 100);
  }
  function toggle(k) {
    set[k] = !set[k]; save(); if (!ctx()) return set[k];
    (k === 'sfx' ? sfxGain : musGain).gain.setTargetAtTime(set[k] ? (k === 'sfx' ? 1 : .32) : 0, ac.currentTime, .05);
    return set[k];
  }
  // Browser erlauben Ton erst nach einer Berührung/Taste
  const unlock = () => ctx(); addEventListener('pointerdown', unlock, {passive: true}); addEventListener('keydown', unlock);
  return {play, music, toggle, set};
})();
