// 3D-Darstellung mit three.js (Schritt 1: einfache Formen).
// Die Spiellogik rechnet weiter flach: Spiel-x → 3D-X, Spiel-y → 3D-Z, Einheiten = Pixel.
'use strict';
const R3 = (() => {
  const slashPool = [], slashGeo = {}, stations = []; let shield;
  let hemi, worldNow = 0, ren, scene, cam, ground, player, robeMat, hatMat, aura, bolts, lastW = 0, lastH = 0, treeKey = '';
  const I = {};                       // Instanced Meshes
  const M = new THREE.Matrix4(), Qt = new THREE.Quaternion(), S = new THREE.Vector3(), P = new THREE.Vector3(), E = new THREE.Euler(), C = new THREE.Color();

  const lam = (c, extra) => new THREE.MeshLambertMaterial(Object.assign({color: c, flatShading: true}, extra));
  const basic = (c, extra) => new THREE.MeshBasicMaterial(Object.assign({color: c}, extra));
  function inst(name, geo, mat, n) { const m = new THREE.InstancedMesh(geo, mat, n); m.instanceMatrix.setUsage(THREE.DynamicDrawUsage); m.count = 0; m.frustumCulled = false; scene.add(m); I[name] = m; return m; }
  // Arena: Spielfeld ±ARENA, außen Berge; innen sanfte Hügel (nur Optik, die Spiellogik bleibt flach)
  const ARENA = 1500;
  function ht(x, z) {
    const r = Math.hypot(x, z), calm = Math.min(1, Math.max(0, (r - 250) / 450));   // Startplatz eben
    let h = calm * (34 * Math.sin(x / 230 + 1.3) * Math.cos(z / 270 - .4) + 18 * Math.sin((x - z) / 150) + 14 * Math.cos((x + 2 * z) / 340));
    const e = Math.max(Math.abs(x), Math.abs(z)) - (ARENA - 40);
    if (e > 0) h += e * e * .006 + e * .45 + 40 * Math.sin(x / 90) * Math.cos(z / 110) * Math.min(1, e / 200);
    return h;
  }
  function put(m, i, x, y, z, sx, sy, sz, ry = 0, rx = 0, rz = 0) { P.set(x, y + ht(x, z), z); E.set(rx, ry, rz, 'YXZ'); Qt.setFromEuler(E); S.set(sx, sy ?? sx, sz ?? sx); M.compose(P, Qt, S); m.setMatrixAt(i, M); }
  function col(m, i, c) { m.setColorAt(i, C.set(c)); }
  function done(m, n) { m.count = n; m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
  function hash(i, j) { let h = Math.imul(i, 374761393) + Math.imul(j, 668265263); h = Math.imul(h ^ (h >>> 13), 1274126177); return (h ^ (h >>> 16)) >>> 0; }

  // Welten: Boden, Himmel und Deko-Farben
  const THEMES = [
    {base: '#5f9f45', dots: ['#6cab4e', '#548f3c', '#78b75a', '#4f8738'], spots: ['#fde68a', '#fff'], sky: '#a7d8f0', low: '#4a6b2a', pine: '#2f7d3a', oak: '#4f9d3f', bush: '#3f8f3a', rock: '#9ca3af', trunk: '#7c4a21'},
    {base: '#d9b26a', dots: ['#e3c07a', '#c99f55', '#edd08f', '#b98d48'], spots: ['#a16207', '#fff7d6'], sky: '#f6dcae', low: '#8a6a32', pine: '#4d7c0f', oak: '#a8a05a', bush: '#a16207', rock: '#c2410c', trunk: '#78350f'},
    {base: '#dbe7f5', dots: ['#e8f1fb', '#c7d7ec', '#f8fafc', '#cbd5e1'], spots: ['#93c5fd', '#fff'], sky: '#c3d3e6', low: '#7b8ba3', pine: '#1e5162', oak: '#e2e8f0', bush: '#93c5fd', rock: '#64748b', trunk: '#57534e'},
  ];
  function grassTexture(T = THEMES[0]) {
    const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
    x.fillStyle = T.base; x.fillRect(0, 0, 256, 256);
    let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let k = 0; k < 900; k++) { x.fillStyle = T.dots[k % 4]; x.fillRect(rnd() * 256, rnd() * 256, 2 + rnd() * 3, 2 + rnd() * 5); }
    for (let k = 0; k < 10; k++) { x.fillStyle = T.spots[k % 2]; x.fillRect(rnd() * 252, rnd() * 252, 3, 3); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    return t;
  }

  function init(canvas) {
    ren = new THREE.WebGLRenderer({canvas, antialias: true}); ren.setPixelRatio(Math.min(2, devicePixelRatio || 1));
    scene = new THREE.Scene(); scene.background = new THREE.Color('#a7d8f0'); scene.fog = new THREE.Fog('#a7d8f0', 1000, 2300);
    cam = new THREE.PerspectiveCamera(48, 1, 10, 4000);
    hemi = new THREE.HemisphereLight('#eaf6ff', '#4a6b2a', 1.4); scene.add(hemi);
    const sun = new THREE.DirectionalLight('#fff4d6', 1.8); sun.position.set(-300, 700, 250); scene.add(sun);

    const tex = grassTexture();
    const GS = 2 * ARENA + 1600, gg = new THREE.PlaneGeometry(GS, GS, 160, 160).rotateX(-Math.PI / 2), gp = gg.attributes.position, gc = new Float32Array(gp.count * 3);
    for (let i = 0; i < gp.count; i++) {   // Höhe und Farbe: Berge am Rand grau-felsig
      const x = gp.getX(i), z = gp.getZ(i), h = ht(x, z); gp.setY(i, h);
      const k = Math.min(1, Math.max(0, (h - 70) / 260)), c = 1 - .42 * k; gc.set([c, c * .97 + .03 * k, c * .95 + .05 * k], i * 3);
    }
    gg.setAttribute('color', new THREE.BufferAttribute(gc, 3)); gg.computeVertexNormals();
    tex.repeat.set(GS / 256, GS / 256);
    ground = new THREE.Mesh(gg, new THREE.MeshLambertMaterial({map: tex, vertexColors: true})); scene.add(ground);

    // Welt-Deko
    inst('trunk', new THREE.CylinderGeometry(5, 7, 30, 6).translate(0, 15, 0), lam('#7c4a21'), 400);
    inst('pine', new THREE.ConeGeometry(26, 72, 7).translate(0, 62, 0), lam('#2f7d3a'), 300);
    inst('oak', new THREE.IcosahedronGeometry(32, 0).translate(0, 54, 0), lam('#4f9d3f'), 300);
    inst('bush', new THREE.IcosahedronGeometry(16, 0).translate(0, 10, 0), lam('#3f8f3a'), 300);
    inst('rock', new THREE.DodecahedronGeometry(14, 0).translate(0, 6, 0), lam('#9ca3af'), 300);

    // Schatten (Klecks unter allen Figuren)
    inst('shadow', new THREE.CircleGeometry(1, 16).rotateX(-Math.PI / 2), basic('#000', {transparent: true, opacity: .22, depthWrite: false}), 800);

    // Zauberer
    player = new THREE.Group();
    robeMat = lam('#6d28d9', {emissive: '#000'});
    const add = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); player.add(m); return m; };
    add(new THREE.ConeGeometry(15, 36, 8), robeMat, 0, 18, 0);
    add(new THREE.SphereGeometry(8, 10, 8), lam('#fcd9a8'), 0, 41, 0);
    add(new THREE.ConeGeometry(6, 14, 6).rotateX(Math.PI), lam('#e5e7eb'), 0, 33, 6);
    hatMat = lam('#4c1d95');
    add(new THREE.CylinderGeometry(17, 17, 2, 12), hatMat, 0, 47, 0);
    const hat = add(new THREE.ConeGeometry(12, 32, 8), hatMat, 0, 63, 0); hat.rotation.z = .15;
    add(new THREE.CylinderGeometry(1.8, 1.8, 58, 5), lam('#92400e'), 17, 28, 4);
    add(new THREE.SphereGeometry(5, 8, 6), basic('#38bdf8'), 17, 59, 4);
    scene.add(player);

    // Gegner: Grundfarbe weiß, Farbe pro Instanz (für Treffer-Blitz)
    inst('bug', new THREE.SphereGeometry(1, 10, 7), lam('#fff'), 350);
    inst('glitch', new THREE.OctahedronGeometry(1, 0), lam('#fff', {emissive: '#3b0764'}), 350);
    inst('lock', new THREE.BoxGeometry(1, 1, 1), lam('#fff'), 200);
    inst('boss', new THREE.TorusKnotGeometry(1, .32, 48, 8), lam('#fff', {emissive: '#450a0a'}), 6);
    inst('spam', new THREE.ConeGeometry(1, 1.6, 6), lam('#fff', {emissive: '#422006'}), 80);      // Fernkämpfer
    inst('fork', new THREE.DodecahedronGeometry(1, 0), lam('#fff'), 200);                        // teilt sich
    inst('over', new THREE.CylinderGeometry(1, 1, 1, 8), lam('#fff', {emissive: '#431407'}), 80);  // stürmt los
    inst('abi', new THREE.IcosahedronGeometry(1, 1), lam('#fff', {emissive: '#2e1065'}), 2);        // Das Abitur (Endboss)
    inst('tutor', new THREE.IcosahedronGeometry(1, 0), lam('#fff', {emissive: '#422006'}), 2);
    inst('cap', new THREE.BoxGeometry(1, .18, 1), lam('#111827'), 4);                            // Doktorhut (Tutor, Abitur)
    inst('eshot', new THREE.SphereGeometry(1, 8, 6), basic('#fff'), 300);                         // gegnerische Geschosse
    inst('eye', new THREE.SphereGeometry(1, 6, 4), basic('#111'), 700);

    // Waffen & Effekte
    inst('fire', new THREE.SphereGeometry(1, 8, 6), basic('#fff'), 300);
    inst('arrow', new THREE.ConeGeometry(3.2, 22, 6).rotateX(Math.PI / 2), basic('#fff'), 250);   // Pfeilspitze zeigt nach +Z
    inst('blade', new THREE.TorusGeometry(1, .22, 4, 10).rotateX(Math.PI / 2), lam('#fff'), 40);
    inst('frost', new THREE.OctahedronGeometry(1, 0), basic('#bae6fd'), 40);
    inst('gem', new THREE.LatheGeometry([[0, -6.5], [4.6, -.6], [3.4, 1.6], [0, 2.2]].map(([x, y]) => new THREE.Vector2(x, y)), 8), lam('#fff', {emissive: '#1e293b'}), 450);   // geschliffener Stein
    inst('coin', new THREE.LatheGeometry([[0, -.8], [4.4, -.8], [4.8, -1.3], [6.2, -1.2], [6.5, 0], [6.2, 1.2], [4.8, 1.3], [4.4, .8], [0, .8]].map(([x, y]) => new THREE.Vector2(x, y)), 22).rotateX(Math.PI / 2), new THREE.MeshLambertMaterial({color: '#fbbf24', emissive: '#7c3a07'}), 200);   // Münze mit Rand
    inst('chest', new THREE.BoxGeometry(34, 22, 24).translate(0, 11, 0), lam('#92400e'), 16);   // je Welt 10 Kisten + Gratis-Kiste
    inst('lid', new THREE.CylinderGeometry(12, 12, 34, 10, 1, false, 0, Math.PI).rotateZ(Math.PI / 2).translate(0, 22, 0), lam('#b45309'), 16);   // je Welt 10 Kisten + Gratis-Kiste
    inst('band', new THREE.BoxGeometry(36, 4, 26).translate(0, 17, 0), lam('#fbbf24', {emissive: '#713f12'}), 16);   // je Welt 10 Kisten + Gratis-Kiste
    inst('l_magnet', new THREE.TorusGeometry(9, 3.5, 6, 12, Math.PI).rotateZ(Math.PI).translate(0, 16, 0), lam('#ef4444'), 20);
    inst('l_bombe', new THREE.SphereGeometry(10, 12, 8).translate(0, 11, 0), lam('#334155'), 20);
    inst('l_trank', new THREE.CylinderGeometry(5, 8, 18, 10).translate(0, 9, 0), lam('#f472b6', {emissive: '#831843'}), 20);
    inst('owl', new THREE.SphereGeometry(9, 10, 8).scale(1, 1.15, .9).translate(0, 0, 0), lam('#a16207', {emissive: '#3b2005'}), 12);
    inst('pool', new THREE.CylinderGeometry(1, 1, 1, 20), basic('#84cc16', {transparent: true, opacity: .35, depthWrite: false}), 40);
    inst('fx', new THREE.SphereGeometry(1, 12, 8), basic('#fff', {transparent: true, opacity: .45, depthWrite: false}), 120);
    inst('meteor', new THREE.DodecahedronGeometry(1, 0), lam('#78350f', {emissive: '#7c2d12'}), 20);
    inst('mark', new THREE.RingGeometry(.92, 1, 32).rotateX(-Math.PI / 2), basic('#f97316', {transparent: true, opacity: .7, depthWrite: false}), 20);

    // Leuchten: weiche Kreis-Textur, additiv; Partikel (Funken, Flammenschweif) nur zur Optik
    const glc = document.createElement('canvas'); glc.width = glc.height = 64; const gx = glc.getContext('2d'), gr = gx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, '#fff'); gr.addColorStop(.25, 'rgba(255,255,255,.75)'); gr.addColorStop(.6, 'rgba(255,255,255,.18)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    gx.fillStyle = gr; gx.fillRect(0, 0, 64, 64);
    inst('glow', new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({map: new THREE.CanvasTexture(glc), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false}), 1400);
    inst('wave', new THREE.RingGeometry(.8, 1, 40).rotateX(-Math.PI / 2), basic('#fff', {transparent: true, depthWrite: false, blending: THREE.AdditiveBlending}), 120);
    // Schwerthiebe: Kreisausschnitte, Geometrie je Öffnungswinkel zwischengespeichert
    for (let i = 0; i < 6; i++) { const m = new THREE.Mesh(undefined, basic('#f1f5f9', {transparent: true, opacity: .6, depthWrite: false, side: THREE.DoubleSide})); m.visible = false; scene.add(m); slashPool.push(m); }
    shield = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), basic('#67e8f9', {transparent: true, opacity: .2, depthWrite: false}));
    shield.visible = false; scene.add(shield);
    aura = new THREE.Mesh(new THREE.CircleGeometry(1, 40).rotateX(-Math.PI / 2), basic('#a78bfa', {transparent: true, opacity: .18, depthWrite: false}));
    aura.visible = false; scene.add(aura);
    bolts = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({color: '#e0f2fe'}));
    bolts.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(600 * 3), 3)); bolts.frustumCulled = false; scene.add(bolts);
    // Lernstationen: Steinpult mit leuchtendem Buch und Lichtsäule (höchstens 4)
    for (let i = 0; i < 4; i++) {
      const g = new THREE.Group(), add = (geo, mat, y) => { const m = new THREE.Mesh(geo, mat); m.position.y = y; g.add(m); return m; };
      add(new THREE.CylinderGeometry(22, 28, 10, 8), lam('#94a3b8'), 5);
      add(new THREE.CylinderGeometry(9, 12, 30, 8), lam('#cbd5e1'), 25);
      add(new THREE.BoxGeometry(30, 4, 22).rotateX(-.35), lam('#fef3c7', {emissive: '#78350f'}), 42);
      g.userData.gem = add(new THREE.OctahedronGeometry(8, 0), basic('#38bdf8'), 66);
      g.userData.beam = add(new THREE.CylinderGeometry(14, 14, 420, 12, 1, true), basic('#7dd3fc', {transparent: true, opacity: .16, depthWrite: false, side: THREE.DoubleSide}), 230);
      g.visible = false; scene.add(g); stations.push(g);
    }
    loadModels();
  }

  // 3D-Modelle aus modelle/*.glb (von tools/meshy.py). Fehlt eine Datei, bleiben die einfachen Formen.
  // Kleiner GLB-Leser: erstes Dreiecksnetz, Position/Normale/UV, Farbtextur. Modell wird auf Höhe 1 gebracht, Fuß auf y = 0.
  const MOD = {};
  const FOE_K = {bug: 1.6, glitch: 1.6, lock: 1.3, spam: 1.5, fork: 1.5, over: 1.5, boss: 1.3, tutor: 1.3, abi: 1.3};   // Modellgröße × Radius
  async function loadGlb(url) {
    const r = await fetch(url); if (!r.ok) return null;
    const buf = await r.arrayBuffer(), dv = new DataView(buf);
    if (dv.getUint32(0, true) !== 0x46546C67) return null;
    const jl = dv.getUint32(12, true), js = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 20, jl)));
    const bin = 28 + jl, TYPES = {5126: Float32Array, 5125: Uint32Array, 5123: Uint16Array, 5121: Uint8Array}, N = {SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4};
    const read = ai => {
      const a = js.accessors[ai], v = js.bufferViews[a.bufferView], T = TYPES[a.componentType], n = N[a.type];
      const off = bin + (v.byteOffset || 0) + (a.byteOffset || 0), stride = v.byteStride || 0, out = new T(a.count * n);
      if (!stride || stride === n * T.BYTES_PER_ELEMENT) out.set(new T(buf.slice(off, off + out.byteLength)));
      else for (let i = 0; i < a.count; i++) out.set(new T(buf.slice(off + i * stride, off + i * stride + n * T.BYTES_PER_ELEMENT)), i * n);
      return [out, n];
    };
    const prim = js.meshes[0].primitives[0], at = prim.attributes, geo = new THREE.BufferGeometry();
    for (const [k, name] of [['POSITION', 'position'], ['NORMAL', 'normal'], ['TEXCOORD_0', 'uv']]) if (at[k] != null) { const [a, n] = read(at[k]); geo.setAttribute(name, new THREE.BufferAttribute(a, n)); }
    if (prim.indices != null) geo.setIndex(new THREE.BufferAttribute(read(prim.indices)[0], 1));
    if (!at.NORMAL) geo.computeVertexNormals();
    geo.computeBoundingBox(); const b = geo.boundingBox, h = b.max.y - b.min.y || 1;
    geo.translate(-(b.min.x + b.max.x) / 2, -b.min.y, -(b.min.z + b.max.z) / 2); geo.scale(1 / h, 1 / h, 1 / h);
    geo.computeBoundingBox();
    const mat = new THREE.MeshLambertMaterial({color: '#fff'});
    const ti = js.materials?.[prim.material]?.pbrMetallicRoughness?.baseColorTexture?.index;
    const img = ti != null && js.images[js.textures[ti].source];
    if (img && img.bufferView != null) {
      const v = js.bufferViews[img.bufferView], blob = new Blob([new Uint8Array(buf, bin + (v.byteOffset || 0), v.byteLength)], {type: img.mimeType});
      const tex = new THREE.Texture(await createImageBitmap(blob)); tex.flipY = false; tex.colorSpace = THREE.SRGBColorSpace; tex.needsUpdate = true;
      mat.map = tex; mat.needsUpdate = true;
    }
    return {geo, mat};
  }
  // Animierte Helden (modelle/<datei>_anim.glb von tools/meshy_rig.py): Clips Ruhe, Laufen, Angriff über den GLTFLoader.
  // Je Klasse ein Modell, wird erst beim Spielstart geladen; fehlt es, bleibt der Zauberer.
  const HERO_FILE = {zauberer: 'held', jaeger: 'held_jaeger', alchemist: 'held_alchemist', ritter: 'held_ritter', gelehrter: 'held_gelehrter', tueftler: 'held_tueftler', entdecker: 'held_entdecker'};
  const HEROES = {}, HA = {H: null, want: null, t: 0, x: 0, y: 0, castT: 0, shots: 0};
  async function loadHero(id) {
    const {GLTFLoader} = await import('./vendor/loaders/GLTFLoader.js');
    const g = await new GLTFLoader().loadAsync('modelle/' + HERO_FILE[id] + '_anim.glb');
    const root = g.scene, box = new THREE.Box3(); let mat; root.updateMatrixWorld(true);
    root.traverse(o => { if (o.isSkinnedMesh) { o.computeBoundingBox(); box.union(o.boundingBox.clone().applyMatrix4(o.matrixWorld)); } });   // Größe mit Skelett
    if (box.isEmpty()) box.setFromObject(root);
    const h = box.max.y - box.min.y || 1;
    root.traverse(o => { if (o.isMesh) { o.material = mat = new THREE.MeshLambertMaterial({map: o.material.map, emissive: '#000'}); o.frustumCulled = false; } });
    root.position.set(-(box.min.x + box.max.x) / 2, -box.min.y, -(box.min.z + box.max.z) / 2);
    const wrap = new THREE.Group(); wrap.add(root); wrap.scale.setScalar(72 / h); wrap.visible = false; player.add(wrap);
    const H = {wrap, mat, mixer: new THREE.AnimationMixer(root), act: {}, cur: null};
    const pick = (re, i) => g.animations.find(a => re.test(a.name)) || g.animations[i];
    for (const [k, re, i] of [['idle', /idle/i, 0], ['walk', /walk/i, 1], ['cast', /cast|spell|soell|shot|throw|attack|slash/i, 2], ['slide', /slide/i, 3]]) {
      const clip = pick(re, i); if (!clip) continue;
      if (k === 'slide') { clip.tracks.forEach(tr => { if (/\.position$/.test(tr.name)) for (let j = 0; j < tr.values.length; j += 3) { tr.values[j] = tr.values[0]; tr.values[j + 2] = tr.values[2]; } }); }   // auf der Stelle: Bewegung macht das Spiel
      const a = H.mixer.clipAction(clip);
      if (k === 'slide') { a.setLoop(THREE.LoopOnce); a.clampWhenFinished = true; a.timeScale = Math.max(1, clip.duration / .45); }
      if (k === 'cast') { a.setLoop(THREE.LoopOnce); a.clampWhenFinished = true; a.timeScale = Math.max(1, clip.duration / 1.1); }   // Angriff in etwa 1 s
      H.act[k] = a;
    }
    return H;
  }
  function setHero(id) {
    if (!HERO_FILE[id]) id = 'zauberer'; HA.want = id;
    if (!HEROES[id]) HEROES[id] = loadHero(id).catch(err => { console.info('Kein Modell für ' + id + ':', err.message); return id === 'zauberer' ? null : (HEROES.zauberer || (HEROES.zauberer = loadHero('zauberer').catch(() => null))); });
    HEROES[id].then(H => {
      if (!H || HA.want !== id) return;
      for (const c of player.children) c.visible = false;
      H.wrap.visible = true; HA.H = H; robeMat = H.mat; MOD.held = true; H.cur = null; play('idle', 0);
    });
  }
  function play(k, fade = .2) {
    const H = HA.H, a = H.act[k]; if (!a || H.cur === a) return;
    a.reset().play(); if (H.cur) H.cur.crossFadeTo(a, fade, false); H.cur = a;
  }
  function animHero(G) {
    if (!HA.H) return;
    const p = G.p, dt = Math.min(.1, Math.max(0, G.t - HA.t)); HA.t = G.t;
    const moved = Math.hypot(p.x - HA.x, p.y - HA.y); HA.x = p.x; HA.y = p.y;
    const n = G.shots.length; if (n > HA.shots && HA.castT <= 0) HA.castT = 1.1; HA.shots = n;   // neue Geschosse → Angriff
    if (dt > 0) { HA.castT -= dt; HA.slideT -= dt; }
    if (p.dashT > 0 && HA.H.act.slide && !(HA.slideT > 0)) { HA.slideT = .45; HA.H.cur = null; play('slide', .06); }   // Dash = Rutschen
    if (HA.slideT > 0) { HA.H.mixer.update(dt); return; }
    play(dt > 0 && moved > dt * 25 ? 'walk' : HA.castT > 0 ? 'cast' : 'idle');
    HA.H.mixer.update(dt);
  }

  // Bosse mit Skelett (modelle/<typ>_anim.glb von tools/meshy_anim.py): ein Exemplar, statt der Instanz gezeichnet
  const BA = {};
  async function loadBoss(k) {
    const {GLTFLoader} = await import('./vendor/loaders/GLTFLoader.js');
    const g = await new GLTFLoader().loadAsync('modelle/' + k + '_anim.glb');
    const root = g.scene, box = new THREE.Box3(); root.updateMatrixWorld(true);
    root.traverse(o => { if (o.isSkinnedMesh) { o.computeBoundingBox(); box.union(o.boundingBox.clone().applyMatrix4(o.matrixWorld)); } });
    if (box.isEmpty()) box.setFromObject(root);
    const w = Math.max(box.max.x - box.min.x, box.max.z - box.min.z) || 1;
    root.traverse(o => { if (o.isMesh) { o.material = new THREE.MeshLambertMaterial({map: o.material.map, emissive: '#000'}); o.frustumCulled = false; } });
    root.position.set(-(box.min.x + box.max.x) / 2, -box.min.y, -(box.min.z + box.max.z) / 2);
    const wrap = new THREE.Group(), inner = new THREE.Group(); inner.add(root); inner.scale.setScalar(2 / w); wrap.add(inner); wrap.visible = false; scene.add(wrap);
    const B = {wrap, mixer: new THREE.AnimationMixer(root), act: {}, cur: null, t: 0, mats: []};
    root.traverse(o => { if (o.isMesh) B.mats.push(o.material); });
    const pick = (re, i) => g.animations.find(a => re.test(a.name)) || g.animations[i];
    for (const [n, re, i] of [['idle', /idle/i, 0], ['walk', /walk/i, 1], ['attack', /attack/i, 2]]) { const c = pick(re, i); if (c) B.act[n] = B.mixer.clipAction(c); }
    BA[k] = B;
  }
  function bossAnim(e, s, ry) {
    const B = BA[e.type]; if (!B) return false;
    B.seen = true; B.wrap.visible = true; B.wrap.position.set(e.x, ht(e.x, e.y), e.y); B.wrap.rotation.y = ry; B.wrap.scale.setScalar(s);
    for (const m of B.mats) m.emissive.set(e.flash > 0 ? '#7f1d1d' : '#000');
    const k = e.tele > 0 || e.spiral > 0 ? 'attack' : 'walk', a = B.act[k] || B.act.idle;
    if (a && B.cur !== a) { a.reset().play(); if (B.cur) B.cur.crossFadeTo(a, .2, false); B.cur = a; }
    return true;
  }

  const LOOT_FILE = {magnet: 'magnet', bombe: 'bombe', trank: 'trank'}, LOOT_COL = {magnet: '#ef4444', bombe: '#334155', trank: '#f472b6'};
  let stationModel = null;
  async function loadExtras() {
    await Promise.all(Object.keys(LOOT_FILE).map(async k => { const m = await loadGlb('modelle/' + LOOT_FILE[k] + '.glb'); if (!m) return; m.geo.scale(26, 26, 26); I['l_' + k].geometry = m.geo; I['l_' + k].material = m.mat; }));
    const owl = await loadGlb('modelle/begleiter.glb'); if (owl) { owl.geo.scale(26, 26, 26); owl.geo.translate(0, -13, 0); I.owl.geometry = owl.geo; I.owl.material = owl.mat; }
    const st = await loadGlb('modelle/lernstation.glb');
    if (st) { st.geo.scale(80, 80, 80); stationModel = st; stations.forEach(g => { g.children.forEach(c => { if (c !== g.userData.beam) c.visible = false; }); const m = new THREE.Mesh(st.geo, st.mat); g.add(m); }); }
    for (const kind of Object.keys(MARK_H)) {
      const m = await loadGlb('modelle/' + kind + '.glb'); if (!m) continue; m.geo.scale(MARK_H[kind], MARK_H[kind], MARK_H[kind]);
      for (const k of MARKS) if (k.kind === kind) { const o = new THREE.Mesh(m.geo, m.mat); o.position.set(k.x, ht(k.x, k.z), k.z); o.rotation.y = k.ry; scene.add(o); }
    }
  }

  async function loadModels() {
    loadEnv().catch(() => {}); loadExtras().catch(() => {});
    for (const k of ['tutor', 'abi']) loadBoss(k).catch(() => {});
    setHero(HA.want || 'zauberer');
    try {
      const kiste = await loadGlb('modelle/kiste.glb');
      if (kiste) {   // Kiste: Breite 36 wie die alte Truhe, Deckel und Band entfallen
        const bb = kiste.geo.boundingBox, w = Math.max(bb.max.x - bb.min.x, bb.max.z - bb.min.z) || 1;
        kiste.geo.scale(40 / w, 40 / w, 40 / w); I.chest.geometry.dispose(); I.chest.geometry = kiste.geo; I.chest.material = kiste.mat; MOD.kiste = kiste;
      }
      await Promise.all(Object.keys(FOE_K).map(async k => {
        const m = await loadGlb('modelle/' + k + '.glb'); if (!m) return;
        const bb = m.geo.boundingBox, w = Math.max(bb.max.x - bb.min.x, bb.max.z - bb.min.z) || 1;   // Breite → 2 (wie die Kugel mit Radius 1)
        m.geo.scale(2 / w, 2 / w, 2 / w); I[k].geometry.dispose(); I[k].geometry = m.geo; I[k].material = m.mat; MOD[k] = m;
      }));
    } catch (err) { console.warn('3D-Modelle nicht geladen:', err); }
  }

  // Deko liegt fest im Raster (Zelle cs): dieselbe Rechnung fürs Zeichnen und für Zusammenstöße (solidAt/collide)
  const cs = 110, SOLID = {pine: 15, oak: 15, rock: 13};   // Radius × Größe; Büsche kann man durchlaufen
  function deco(i, j) {
    if (Math.abs(i) <= 1 && Math.abs(j) <= 1) return null;   // Startplatz frei
    for (const m of MARKS) if (Math.abs(m.x - i * cs - 40) < 150 && Math.abs(m.z - j * cs - 40) < 150) return null;   // Platz um Wahrzeichen
    const h = hash(i, j); if (h % 9) return null;
    return {x: i * cs + (h >>> 4) % 80, z: j * cs + (h >>> 11) % 80, s: .75 + ((h >>> 18) % 60) / 100, ry: (h >>> 7) % 6,
      kind: ['pine', 'oak', 'bush', 'rock', 'pine', 'oak', 'bush'][(h >>> 22) % 7]};
  }
  // Wahrzeichen: feste Ruinen, Säulen und Eulenstatuen in der Arena (Orientierung), man kann nicht hindurch
  const MARKS = [['ruine', -900, -700, .4], ['saeule', 700, -950, 0], ['eule', 950, 600, -.8], ['ruine', -600, 950, 2.2], ['saeule', -1150, 150, 1], ['eule', 250, -1200, 0], ['saeule', 1150, -200, .5], ['ruine', 450, 1100, 1.4]]
    .map(([kind, x, z, ry]) => ({kind, x, z, ry, R: kind === 'ruine' ? 46 : 26}));
  const MARK_H = {ruine: 120, saeule: 95, eule: 80};
  function solidNear(x, y, f) {
    for (const m of MARKS) if (Math.abs(m.x - x) < 200 && Math.abs(m.z - y) < 200) f(m.x, m.z, m.R);
    const ci = Math.floor(x / cs), cj = Math.floor(y / cs);
    for (let j = cj - 1; j <= cj + 1; j++) for (let i = ci - 1; i <= ci + 1; i++) { const d = deco(i, j); if (d && SOLID[d.kind]) f(d.x, d.z, SOLID[d.kind] * d.s); }
  }
  // Schiebt einen Kreis (o.x, o.y, Radius r) aus Bäumen und Steinen heraus
  function collide(o, r) { solidNear(o.x, o.y, (x, z, R) => { const dx = o.x - x, dy = o.y - z, d = Math.hypot(dx, dy), m = R + r; if (d < m) { const k = d > .01 ? (m - d) / d : 0; o.x += dx * k; o.y += dy * k + (d > .01 ? 0 : m); } }); }
  function blocked(x, y, r) { let b = false; solidNear(x, y, (sx, sz, R) => { if (Math.hypot(x - sx, y - sz) < R + r) b = true; }); return b; }

  function placeTrees(p) {
    const ci = Math.floor(p.x / cs), cj = Math.floor(p.y / cs), key = ci + ',' + cj;
    if (key === treeKey) return; treeKey = key;
    const n = {trunk: 0, pine: 0, oak: 0, bush: 0, rock: 0};
    for (let j = cj - 17; j <= cj + 6; j++) for (let i = ci - 15; i <= ci + 15; i++) {
      const d = deco(i, j); if (!d) continue;
      const {x, z, s, ry, kind} = d;
      put(I[kind], n[kind]++, x, 0, z, s, s, s, ry);
      if (kind === 'pine' || kind === 'oak') put(I.trunk, n.trunk++, x, 0, z, s, s, s);
    }
    for (const k in n) done(I[k], n[k]);
  }

  // ---- Effekte: Partikel leben nur in der Darstellung ----
  const PT = [], seenFx = new WeakSet(), lastFlash = new WeakMap(); let fxT = 0;
  const GLOW_RX = -.64;   // Leuchtflächen schauen zur Kamera
  function emit(x, y, z, vx, vy, vz, life, size, col) { if (PT.length < 700) PT.push({x, y, z, vx, vy, vz, life, max: life, size, c: new THREE.Color(col)}); }
  function burst(x, y, z, n, sp, col, size = 9, life = .45) { for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, v = sp * (.4 + Math.random() * .6); emit(x, y, z, Math.cos(a) * v, 30 + Math.random() * 80, Math.sin(a) * v, life * (.6 + Math.random() * .6), size, col); } }
  function effects(G, t) {
    const dt = Math.min(.1, Math.max(0, G.t - fxT)); fxT = G.t;
    const g = I.glow; let n = 0;
    const glow = (x, y, z, s, col, k = 1) => { if (n >= 1400) return; put(g, n, x, y, z, s, s, s, 0, GLOW_RX); g.setColorAt(n++, C.set(col).multiplyScalar(k)); };
    if (dt > 0) for (const s of G.shots) {
      if (s.kind === 'pfeil') emit(s.x, 18, s.y, 0, 0, 0, .22, 10, s.crit ? '#fde047' : '#67e8f9');
      else if (s.kind === 'klinge') emit(s.x, 18, s.y, 0, 0, 0, .18, 14, '#e5e7eb');
      else if (s.kind === 'feder') emit(s.x, 18, s.y, 0, 0, 0, .2, 8, '#fef3c7');
      else if (s.kind === 'welle') { for (let k = 0; k < 2; k++) { const a = Math.random() * 6.283; emit(s.x + Math.cos(a) * s.r, 6, s.y + Math.sin(a) * s.r, 0, 50 + Math.random() * 40, 0, .4, 12, '#7dd3fc'); } }
      else { emit(s.x + (Math.random() - .5) * 6, 22, s.y + (Math.random() - .5) * 6, -s.vx * .08, 20 + Math.random() * 30, -s.vy * .08, .35, 16, s.crit ? '#fde047' : '#fb923c');
        if (Math.random() < .5) emit(s.x, 22, s.y, (Math.random() - .5) * 60, 40, (Math.random() - .5) * 60, .25, 7, '#fde68a'); }
    }
    if (dt > 0) for (const m of G.meteors) { const k = m.t / m.max; emit(m.x + 120 * k + (Math.random() - .5) * 14, 12 + 420 * k, m.y - 60 * k, 0, 30, 0, .4, 26, '#f97316'); }
    if (dt > 0) for (const o of G.pools) if (Math.random() < dt * o.R / 18) { const a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * o.R; emit(o.x + Math.cos(a) * r, 3, o.y + Math.sin(a) * r, 0, 25, 0, .6, 8, '#a3e635'); }
    for (const f of G.fx) if (!seenFx.has(f)) { seenFx.add(f); burst(f.x, 14, f.y, Math.min(18, 6 + f.r / 6), f.r * 2.2, f.col, 10); }
    if (dt > 0) for (const e of G.en) { const lf = lastFlash.get(e) || 0; if (e.flash > lf + .01) burst(e.x, e.r, e.y, 4, 110, '#fde68a', 6, .25); lastFlash.set(e, e.flash); }
    // Partikel bewegen und zeichnen
    for (const p of PT) { p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.vy -= 60 * dt; p.vx *= .96; p.vz *= .96; }
    for (let i = PT.length - 1; i >= 0; i--) if (PT[i].life <= 0) PT.splice(i, 1);
    for (const p of PT) { const k = p.life / p.max; if (n < 1400) { put(g, n, p.x, p.y, p.z, p.size * (.4 + .6 * k), p.size * (.4 + .6 * k), 1, 0, GLOW_RX); g.setColorAt(n++, C.copy(p.c).multiplyScalar(k)); } }
    // feste Leuchtpunkte
    for (const s of G.shots) {
      if (s.kind === 'pfeil') glow(s.x, 18, s.y, 26, s.crit ? '#fde047' : '#22d3ee', .9);
      else if (s.kind === 'klinge') glow(s.x, 18, s.y, s.r * 3, '#cbd5e1', .6);
      else if (s.kind === 'feder') glow(s.x, 18, s.y, 18, '#fef3c7', .7);
      else if (s.kind === 'welle') glow(s.x, 10, s.y, s.r * 2.6, '#38bdf8', .7);
      else { glow(s.x, 22, s.y, s.r * 7, s.crit ? '#fde047' : '#f97316'); glow(s.x, 22, s.y, s.r * 2.6, '#fff7d6'); }
    }
    for (const m of G.meteors) { const k = m.t / m.max; glow(m.x + 120 * k, 12 + 420 * k, m.y - 60 * k, 90, '#fb923c'); glow(m.x, 3, m.y, m.R * 1.4, '#f97316', .25 + .5 * (1 - k)); }
    for (const s of (G.eshots || [])) glow(s.x, 16, s.y, s.r * 4.5, s.col || '#f43f5e', .8);
    for (const e of G.en) if (e.elite) { glow(e.x, 4, e.y, e.r * 5, '#fbbf24', .45 + .2 * Math.sin(t * 5)); if (dt > 0 && Math.random() < .3) emit(e.x + (Math.random() - .5) * e.r * 2, e.r, e.y + (Math.random() - .5) * e.r * 2, 0, 50, 0, .6, 8, '#fde047'); }
    for (const l of (G.loot || [])) glow(l.x, 8, l.y, 60, LOOT_COL[l.kind] === '#334155' ? '#f97316' : LOOT_COL[l.kind], .5 + .2 * Math.sin(t * 4));
    for (const b of G.bolts) for (const q of b.pts) glow(q.x, 22, q.y, 46, '#7dd3fc', b.life / .18);
    const sw2 = G.p.w && G.p.w.strahl; if (sw2 && sw2.beams) for (const b of sw2.beams) { const L = Math.hypot(b.x2 - b.x1, b.y2 - b.y1), k = Math.max(2, Math.ceil(L / 16));
      for (let j = 1; j <= k; j++) { const u = j / k; glow(b.x1 + (b.x2 - b.x1) * u, 20, b.y1 + (b.y2 - b.y1) * u, 26 - 8 * u, '#fef08a', .8); } }
    const ew = G.p.w && G.p.w.eule; if (ew && ew.owls) for (const o of ew.owls) glow(o.x, 40, o.y, 40, '#fde68a', .4);
    const fw = G.p.w && G.p.w.frost; if (fw && fw.pts) for (const q of fw.pts) glow(q.x, 20, q.y, 34, '#7dd3fc', .7);
    let nw = 0; for (const f of G.fx) { const k = f.life / f.max; glow(f.x, 14, f.y, f.r * (1.4 + (1 - k)), f.col, k * .9);
      if (nw < 120) { put(I.wave, nw, f.x, 2, f.y, f.r * (.3 + 1.1 * (1 - k)), 1, f.r * (.3 + 1.1 * (1 - k))); I.wave.setColorAt(nw++, C.set(f.col).multiplyScalar(k)); } }
    done(I.wave, nw); done(g, n);
  }

  const FOE_COL = {bug: '#ef4444', glitch: '#e879f9', lock: '#94a3b8', boss: '#dc2626', abi: '#a78bfa', spam: '#facc15', fork: '#4ade80', over: '#fb923c', tutor: '#f59e0b'};
  function render(G, W, H) {
    if (W !== lastW || H !== lastH) { ren.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix(); lastW = W; lastH = H; }
    const p = G.p, t = G.t;
    const ph = ht(p.x, p.y); cam.position.set(p.x, 400 + ph, p.y + 470); cam.lookAt(p.x, 20 + ph, p.y - 40);
    placeTrees(p);

    // Zauberer
    player.position.set(p.x, ph + (HA.H ? 0 : Math.abs(Math.sin(t * 9)) * 3), p.y);
    animHero(G);
    player.rotation.y = Math.atan2(p.dx, p.dy);
    robeMat.emissive.set(p.hurtT > 0 ? '#991b1b' : '#000');
    let sh = 0; put(I.shadow, sh++, p.x, .5, p.y, 16);

    // Gegner
    const n = {bug: 0, glitch: 0, lock: 0, boss: 0, abi: 0, spam: 0, fork: 0, over: 0, tutor: 0}; let ne = 0, ncap = 0;
    for (const e of G.en) {
      const m = I[e.type], i = n[e.type]++, r = e.r, ry = Math.atan2(p.x - e.x, p.y - e.y);
      let y = r, sx = r, sy = r, sz = r;
      if (MOD[e.type]) {   // 3D-Modell: zum Zauberer drehen, leicht hüpfen; Treffer = kurz größer, Textur nur leicht tönen
        const big = e.type === 'boss' || e.type === 'tutor' || e.type === 'abi', s = r * FOE_K[e.type] * (e.flash > 0 ? (big ? 1.06 : 1.2) : 1);
        const ph = e.x * .013 + e.y * .007; let sx2 = s, sy2 = s, sz2 = s, rx = 0, rz = 0; y = 0;
        switch (e.type) {   // Bewegung ohne Skelett: wackeln, watscheln, quetschen, rollen
          case 'bug': rz = Math.sin(t * 22 + ph * 9) * .14; y = Math.abs(Math.sin(t * 22 + ph * 9)) * 2.5; break;
          case 'glitch': y = r * .8 + Math.sin(t * 5 + ph * 7) * 5; rz = Math.sin(t * 3 + ph * 5) * .22; sy2 = s * (1 + Math.sin(t * 7 + ph) * .07); break;
          case 'lock': rz = Math.sin(t * 6 + ph * 3) * .11; y = Math.abs(Math.sin(t * 6 + ph * 3)) * 5; break;
          case 'spam': { const pf = e.cd < .5 ? 1 + (.5 - e.cd) * .5 : 1; sy2 = s * (1 + Math.sin(t * 9 + ph * 4) * .08) * pf; sx2 = sz2 = s * (1 - Math.sin(t * 9 + ph * 4) * .05) * pf; rz = Math.sin(t * 4.5 + ph) * .08; break; }
          case 'fork': { const j = Math.sin(t * 11 + ph * 6); sy2 = s * (1 + j * .16); sx2 = sz2 = s * (1 - j * .08); break; }
          case 'over': if (e.dash > 0) { rx = t * 22; y = r * .5; } else if (e.tele > 0) { sy2 = s * .82; rz = Math.sin(t * 60) * .08; } else { rz = Math.sin(t * 14 + ph * 5) * .12; y = Math.abs(Math.sin(t * 14 + ph * 5)) * 3; } break;
          default: rz = Math.sin(t * 3.2) * .07; y = Math.abs(Math.sin(t * 3.2)) * 5; if (e.tele > 0) { sy2 = s * .9; rx = -.12; } else if (e.dash > 0) rx = .22;   // Bosse: stapfen, ducken vor dem Sturm
        }
        if (bossAnim(e, s, ry)) { n[e.type]--; put(I.shadow, sh++, e.x, .5, e.y, r * 1.1); continue; }
        put(m, i, e.x, y, e.y, sx2, sy2, sz2, ry, rx, rz);
        col(m, i, e.flash > 0 ? '#ffd4d4' : e.elite ? '#ffd166' : e.slow > 0 && !big ? '#9ddcff' : e.dash > 0 ? '#ffe9a8' : '#ffffff');
        put(I.shadow, sh++, e.x, .5, e.y, r * 1.1);
        continue;
      }
      if (e.type === 'bug') { sy = r * .7; sz = r * 1.2; y = r * .7 + Math.abs(Math.sin(t * 14 + e.x)) * 2; }
      if (e.type === 'glitch') { y = r * 1.6 + Math.sin(t * 6 + e.y) * 3; }
      if (e.type === 'lock') { sx = sz = r * 1.6; sy = r * 1.6; y = r * .8; }
      if (e.type === 'boss') { y = r * 1.3; }
      if (e.type === 'abi') { y = r * 1.2 + Math.sin(t * 3) * 5; put(I.cap, ncap++, e.x, y + r * 1.0, e.y, r * 1.6, r * 1.6, r * 1.6, -t * .5); }
      if (e.type === 'spam') { sy = r * 1.4; y = r * 1.1; }
      if (e.type === 'over') { sy = r * 1.5; y = r * .75 + (e.dash > 0 ? 6 : 0); }
      if (e.type === 'fork') { y = r + Math.abs(Math.sin(t * 10 + e.x)) * 2; }
      if (e.type === 'tutor') { y = r * 1.25 + Math.sin(t * 2) * 4; put(I.cap, ncap++, e.x, y + r * 1.05, e.y, r * 1.5, r * 1.5, r * 1.5, t * .7); }
      put(m, i, e.x, y, e.y, sx, sy, sz, e.type === 'glitch' || e.type === 'boss' ? t * 2 + e.x : e.type === 'tutor' ? t * .7 : ry);
      const big = e.type === 'boss' || e.type === 'tutor' || e.type === 'abi';   // Bosse nur leicht aufhellen, sonst blinken sie dauerhaft weiß
      col(m, i, e.flash > 0 ? (big ? (e.type === 'tutor' ? '#fde68a' : e.type === 'abi' ? '#ddd6fe' : '#f87171') : '#ffffff') : e.slow > 0 && !big ? '#7dd3fc' : e.dash > 0 ? '#fde047' : FOE_COL[e.type]);
      put(I.shadow, sh++, e.x, .5, e.y, r * 1.1);
      if (e.type !== 'boss' && e.type !== 'spam') for (const s of [-1, 1]) {   // Augen Richtung Zauberer
        const ex = e.x + Math.sin(ry) * r * .9 + Math.cos(ry) * s * r * .35, ez = e.y + Math.cos(ry) * r * .9 - Math.sin(ry) * s * r * .35;
        put(I.eye, ne++, ex, y + r * .25, ez, Math.max(1.6, r * .16));
      }
    }
    for (const k in n) done(I[k], n[k]); done(I.eye, ne); done(I.cap, ncap);
    for (const k in BA) { const B = BA[k]; if (!B.seen) B.wrap.visible = false; B.seen = false; const d = Math.min(.1, Math.max(0, t - B.t)); B.t = t; B.mixer.update(d); }
    let neb = 0; for (const s of (G.eshots || [])) { put(I.eshot, neb, s.x, 16, s.y, s.r); col(I.eshot, neb++, s.col || '#f43f5e'); } done(I.eshot, neb);

    // Geschosse
    let nf = 0, na = 0, nb = 0;
    for (const s of G.shots) {
      if (s.kind === 'pfeil' || s.kind === 'feder') { put(I.arrow, na, s.x, 18, s.y, s.kind === 'feder' ? .7 : 1, s.kind === 'feder' ? .7 : 1, 1, Math.atan2(s.vx, s.vy)); col(I.arrow, na++, s.crit ? '#fde047' : s.kind === 'feder' ? '#f5f5f4' : '#67e8f9'); }
      else if (s.kind === 'welle') { put(I.fire, nf, s.x, 8, s.y, s.r, s.r * .35, s.r); col(I.fire, nf++, s.crit ? '#fde047' : '#38bdf8'); }
      else if (s.kind === 'klinge') { put(I.blade, nb, s.x, 18, s.y, s.r, s.r, s.r, t * 18); col(I.blade, nb++, s.crit ? '#fde047' : '#e5e7eb'); }
      else { put(I.fire, nf, s.x, 22, s.y, s.r); col(I.fire, nf++, s.crit ? '#fde047' : '#fb923c'); }
    }
    done(I.fire, nf); done(I.arrow, na); done(I.blade, nb);

    let no = 0; const ow = p.w.eule; if (ow && ow.owls) for (const o of ow.owls) put(I.owl, no++, o.x, 40 + Math.sin(t * 6 + o.x * .01) * 4, o.y, 1, 1, 1, t * 2);
    done(I.owl, no);
    let nfr = 0; const fw = p.w.frost;
    if (fw && fw.pts) for (const q of fw.pts) put(I.frost, nfr++, q.x, 20, q.y, 7 * p.size, 11 * p.size, 7 * p.size, t * 4);
    done(I.frost, nfr);

    let ng = 0, nc = 0;
    for (const g of G.gems) {
      if (g.gold) { if (nc < 200) put(I.coin, nc++, g.x, 9 + Math.sin(t * 4 + g.x) * 2, g.y, 1, 1, 1, t * 3 + g.x); continue; }
      if (ng >= 450) continue;
      put(I.gem, ng, g.x, 8 + Math.sin(t * 4 + g.x) * 2, g.y, 1, 1, 1, t * 2 + g.y); col(I.gem, ng++, g.heal ? '#4ade80' : g.v >= 4 ? '#a78bfa' : '#22d3ee');
    }
    done(I.gem, ng); done(I.coin, nc);
    let nk = 0; for (const c of G.chests) { for (const k of MOD.kiste ? ['chest'] : ['chest', 'lid', 'band']) put(I[k], nk, c.x, 0, c.y, 1, 1, 1, .3); put(I.shadow, sh++, c.x, .5, c.y, 24); nk++; }
    for (const k of ['chest', 'lid', 'band']) done(I[k], MOD.kiste && k !== 'chest' ? 0 : nk);

    stations.forEach((g, i) => { const st = (G.stations || [])[i]; g.visible = !!st; if (!st) return;
      g.position.set(st.x, ht(st.x, st.y), st.y); g.userData.gem.position.y = 66 + Math.sin(t * 3 + i) * 5; g.userData.gem.rotation.y = t * 2; });
    const nl = {magnet: 0, bombe: 0, trank: 0};
    for (const l of (G.loot || [])) { const k = 'l_' + l.kind; if (nl[l.kind] < 20) put(I[k], nl[l.kind]++, l.x, 4 + Math.sin(t * 3 + l.x) * 3, l.y, 1, 1, 1, t * 1.5); }
    for (const k in nl) done(I['l_' + k], nl[k]);
    let np = 0; for (const o of G.pools) put(I.pool, np++, o.x, 1, o.y, o.R, 1, o.R); done(I.pool, np);
    let nx = 0; for (const f of G.fx) { const k = 1 - f.life / f.max; put(I.fx, nx, f.x, 10, f.y, f.r * (.6 + k * .6), f.r * (.4 + k * .4), f.r * (.6 + k * .6)); col(I.fx, nx++, f.col); }
    done(I.fx, nx);
    let nm = 0; for (const m of G.meteors) { const k = m.t / m.max; put(I.meteor, nm, m.x + 120 * k, 12 + 420 * k, m.y - 60 * k, 14, 14, 14, t * 5); put(I.mark, nm++, m.x, 1.5, m.y, m.R); }
    done(I.meteor, nm); done(I.mark, nm);
    done(I.shadow, sh);
    effects(G, t);

    const sl = G.slashes || [];
    slashPool.forEach((m, i) => {
      const s = sl[i]; m.visible = !!s; if (!s) return;
      const key = Math.round(s.half * 100);
      if (!slashGeo[key]) slashGeo[key] = new THREE.RingGeometry(.35, 1, 24, 1, -s.half, s.half * 2).rotateX(-Math.PI / 2);
      m.geometry = slashGeo[key]; m.position.set(s.x, 14 + ht(s.x, s.y), s.y); m.rotation.y = -s.a;
      const k = 1 - s.life / s.max; m.scale.setScalar(s.R * (.75 + .25 * k));
      m.material.opacity = .7 * (s.life / s.max); m.material.color.set(s.crit ? '#fde047' : '#f1f5f9');
    });
    const sw = p.w.schild;
    if (sw && sw.layers > 0) { shield.visible = true; shield.position.set(p.x, ph, p.y); shield.scale.set(34, 52, 34); shield.material.opacity = .08 + .08 * sw.layers; }
    else shield.visible = false;

    if (p.w.aura) { aura.visible = true; aura.position.set(p.x, ph + 1, p.y); const R = p.w.aura.R || 60; aura.scale.set(R, 1, R); } else aura.visible = false;

    // Blitze als Linien
    const a = bolts.geometry.attributes.position.array; let v = 0;
    for (const b of G.bolts) for (let i = 1; i < b.pts.length && v < 597; i++) {
      const q0 = b.pts[i - 1], q1 = b.pts[i];
      a.set([q0.x, 22 + ht(q0.x, q0.y), q0.y, q1.x + (Math.random() - .5) * 8, 18 + Math.random() * 8 + ht(q1.x, q1.y), q1.y + (Math.random() - .5) * 8], v * 3); v += 2;
    }
    bolts.geometry.setDrawRange(0, v); bolts.geometry.attributes.position.needsUpdate = true;

    ren.render(scene, cam);
  }

  function toScreen(x, y, h) { P.set(x, h + ht(x, y), y).project(cam); return {x: (P.x + 1) / 2 * lastW, y: (1 - P.y) / 2 * lastH, vis: P.z < 1}; }
  function setLook(robe, hat) { if (MOD.held) return; robeMat.color.set(robe); hatMat.color.set(hat); }
  // Umgebung je Welt aus Meshy-Modellen (modelle/<w|d|e>_<baum|tanne|busch|fels>.glb); fehlt eins, bleibt die einfache Form
  const ENV = {}, ENV_ORIG = {}, ENV_FILE = {oak: 'baum', pine: 'tanne', bush: 'busch', rock: 'fels'}, ENV_H = {oak: 92, pine: 110, bush: 26, rock: 26}, WPRE = ['w', 'd', 'e'];
  function applyEnv() {
    const T = THEMES[worldNow] || THEMES[0], pre = WPRE[worldNow] || 'w'; let any = false;
    for (const k in ENV_FILE) {
      const m = ENV[pre + '_' + k], o = ENV_ORIG[k] || (ENV_ORIG[k] = {geo: I[k].geometry, mat: I[k].material});
      if (m) { I[k].geometry = m.geo; I[k].material = m.mat; if (k === 'oak' || k === 'pine') any = true; }
      else { I[k].geometry = o.geo; I[k].material = o.mat; o.mat.color.set(T[k]); }
    }
    I.trunk.visible = !any; I.trunk.material.color.set(T.trunk);
  }
  async function loadEnv() {
    await Promise.all(WPRE.flatMap(pre => Object.entries(ENV_FILE).map(async ([k, f]) => {
      const m = await loadGlb('modelle/' + pre + '_' + f + '.glb'); if (!m) return;
      m.geo.scale(ENV_H[k], ENV_H[k], ENV_H[k]); ENV[pre + '_' + k] = m;
    })));
    applyEnv();
  }
  function setWorld(i) {
    if (!scene) return; const T = THEMES[i] || THEMES[0];
    if (i !== worldNow) { const tex = grassTexture(T); tex.repeat.copy(ground.material.map.repeat); ground.material.map.dispose(); ground.material.map = tex; ground.material.needsUpdate = true; worldNow = i; }
    scene.background.set(T.sky); scene.fog.color.set(T.sky); hemi.groundColor.set(T.low);
    worldNow = i; applyEnv();
  }
  return {init, render, toScreen, setLook, setHero, setWorld, collide, blocked, ARENA};
})();
