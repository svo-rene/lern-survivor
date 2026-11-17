// 3D-Darstellung mit three.js (Schritt 1: einfache Formen).
// Die Spiellogik rechnet weiter flach: Spiel-x → 3D-X, Spiel-y → 3D-Z, Einheiten = Pixel.
'use strict';
const R3 = (() => {
  const slashPool = [], slashGeo = {}; let shield;
  let hemi, worldNow = 0, ren, scene, cam, ground, player, robeMat, hatMat, aura, bolts, lastW = 0, lastH = 0, treeKey = '';
  const I = {};                       // Instanced Meshes
  const M = new THREE.Matrix4(), Qt = new THREE.Quaternion(), S = new THREE.Vector3(), P = new THREE.Vector3(), E = new THREE.Euler(), C = new THREE.Color();

  const lam = (c, extra) => new THREE.MeshLambertMaterial(Object.assign({color: c, flatShading: true}, extra));
  const basic = (c, extra) => new THREE.MeshBasicMaterial(Object.assign({color: c}, extra));
  function inst(name, geo, mat, n) { const m = new THREE.InstancedMesh(geo, mat, n); m.instanceMatrix.setUsage(THREE.DynamicDrawUsage); m.count = 0; m.frustumCulled = false; scene.add(m); I[name] = m; return m; }
  function put(m, i, x, y, z, sx, sy, sz, ry = 0, rx = 0) { P.set(x, y, z); E.set(rx, ry, 0); Qt.setFromEuler(E); S.set(sx, sy ?? sx, sz ?? sx); M.compose(P, Qt, S); m.setMatrixAt(i, M); }
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
    scene = new THREE.Scene(); scene.background = new THREE.Color('#a7d8f0'); scene.fog = new THREE.Fog('#a7d8f0', 900, 1750);
    cam = new THREE.PerspectiveCamera(48, 1, 10, 4000);
    hemi = new THREE.HemisphereLight('#eaf6ff', '#4a6b2a', 1.4); scene.add(hemi);
    const sun = new THREE.DirectionalLight('#fff4d6', 1.8); sun.position.set(-300, 700, 250); scene.add(sun);

    const tex = grassTexture(); tex.repeat.set(4096 / 256, 4096 / 256);
    ground = new THREE.Mesh(new THREE.PlaneGeometry(4096, 4096), new THREE.MeshLambertMaterial({map: tex}));
    ground.rotation.x = -Math.PI / 2; scene.add(ground);

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
    inst('arrow', new THREE.BoxGeometry(2.5, 2.5, 18), basic('#fff'), 250);
    inst('blade', new THREE.TorusGeometry(1, .22, 4, 10).rotateX(Math.PI / 2), lam('#fff'), 40);
    inst('frost', new THREE.OctahedronGeometry(1, 0), basic('#bae6fd'), 40);
    inst('gem', new THREE.OctahedronGeometry(5, 0), basic('#fff'), 450);
    inst('coin', new THREE.CylinderGeometry(6, 6, 2, 14).rotateX(Math.PI / 2), lam('#fbbf24', {emissive: '#78350f'}), 200);
    inst('chest', new THREE.BoxGeometry(34, 22, 24).translate(0, 11, 0), lam('#92400e'), 8);
    inst('lid', new THREE.CylinderGeometry(12, 12, 34, 10, 1, false, 0, Math.PI).rotateZ(Math.PI / 2).translate(0, 22, 0), lam('#b45309'), 8);
    inst('band', new THREE.BoxGeometry(36, 4, 26).translate(0, 17, 0), lam('#fbbf24', {emissive: '#713f12'}), 8);
    inst('pool', new THREE.CylinderGeometry(1, 1, 1, 20), basic('#84cc16', {transparent: true, opacity: .35, depthWrite: false}), 40);
    inst('fx', new THREE.SphereGeometry(1, 12, 8), basic('#fff', {transparent: true, opacity: .45, depthWrite: false}), 120);
    inst('meteor', new THREE.DodecahedronGeometry(1, 0), lam('#78350f', {emissive: '#7c2d12'}), 20);
    inst('mark', new THREE.RingGeometry(.92, 1, 32).rotateX(-Math.PI / 2), basic('#f97316', {transparent: true, opacity: .7, depthWrite: false}), 20);

    // Schwerthiebe: Kreisausschnitte, Geometrie je Öffnungswinkel zwischengespeichert
    for (let i = 0; i < 6; i++) { const m = new THREE.Mesh(undefined, basic('#f1f5f9', {transparent: true, opacity: .6, depthWrite: false, side: THREE.DoubleSide})); m.visible = false; scene.add(m); slashPool.push(m); }
    shield = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), basic('#67e8f9', {transparent: true, opacity: .2, depthWrite: false}));
    shield.visible = false; scene.add(shield);
    aura = new THREE.Mesh(new THREE.CircleGeometry(1, 40).rotateX(-Math.PI / 2), basic('#a78bfa', {transparent: true, opacity: .18, depthWrite: false}));
    aura.visible = false; scene.add(aura);
    bolts = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({color: '#e0f2fe'}));
    bolts.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(600 * 3), 3)); bolts.frustumCulled = false; scene.add(bolts);
    loadModels();
  }

  // 3D-Modelle aus modelle/*.glb (von tools/meshy.py). Fehlt eine Datei, bleiben die einfachen Formen.
  // Kleiner GLB-Leser: erstes Dreiecksnetz, Position/Normale/UV, Farbtextur. Modell wird auf Höhe 1 gebracht, Fuß auf y = 0.
  const MOD = {};
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
  async function loadModels() {
    try {
      const held = await loadGlb('modelle/held.glb');
      if (held) {
        for (const c of player.children) c.visible = false;
        const m = new THREE.Mesh(held.geo, held.mat); m.scale.setScalar(72); player.add(m);
        MOD.held = held; robeMat = held.mat; robeMat.emissive = new THREE.Color('#000');
      }
      const bug = await loadGlb('modelle/bug.glb');
      if (bug) {   // Breite des Modells → 2 (wie die Kugel mit Radius 1)
        const bb = bug.geo.boundingBox, w = Math.max(bb.max.x - bb.min.x, bb.max.z - bb.min.z) || 1;
        bug.geo.scale(2 / w, 2 / w, 2 / w); I.bug.geometry.dispose(); I.bug.geometry = bug.geo; I.bug.material = bug.mat; MOD.bug = bug;
      }
    } catch (err) { console.warn('3D-Modelle nicht geladen:', err); }
  }

  function placeTrees(p) {
    const cs = 110, ci = Math.floor(p.x / cs), cj = Math.floor(p.y / cs), key = ci + ',' + cj;
    if (key === treeKey) return; treeKey = key;
    const n = {trunk: 0, pine: 0, oak: 0, bush: 0, rock: 0};
    for (let j = cj - 17; j <= cj + 6; j++) for (let i = ci - 15; i <= ci + 15; i++) {
      const h = hash(i, j); if (h % 9) continue;
      const x = i * cs + (h >>> 4) % 80, z = j * cs + (h >>> 11) % 80, s = .75 + ((h >>> 18) % 60) / 100, ry = (h >>> 7) % 6;
      const kind = ['pine', 'oak', 'bush', 'rock', 'pine', 'oak', 'bush'][(h >>> 22) % 7];
      put(I[kind], n[kind]++, x, 0, z, s, s, s, ry);
      if (kind === 'pine' || kind === 'oak') put(I.trunk, n.trunk++, x, 0, z, s, s, s);
    }
    for (const k in n) done(I[k], n[k]);
  }

  const FOE_COL = {bug: '#ef4444', glitch: '#e879f9', lock: '#94a3b8', boss: '#dc2626', abi: '#a78bfa', spam: '#facc15', fork: '#4ade80', over: '#fb923c', tutor: '#f59e0b'};
  function render(G, W, H) {
    if (W !== lastW || H !== lastH) { ren.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix(); lastW = W; lastH = H; }
    const p = G.p, t = G.t;
    cam.position.set(p.x, 400, p.y + 470); cam.lookAt(p.x, 20, p.y - 40);
    ground.position.set(Math.round(p.x / 256) * 256, 0, Math.round(p.y / 256) * 256);
    placeTrees(p);

    // Zauberer
    player.position.set(p.x, Math.abs(Math.sin(t * 9)) * 3, p.y);
    player.rotation.y = Math.atan2(p.dx, p.dy);
    robeMat.emissive.set(p.hurtT > 0 ? '#991b1b' : '#000');
    let sh = 0; put(I.shadow, sh++, p.x, .5, p.y, 16);

    // Gegner
    const n = {bug: 0, glitch: 0, lock: 0, boss: 0, abi: 0, spam: 0, fork: 0, over: 0, tutor: 0}; let ne = 0, ncap = 0;
    for (const e of G.en) {
      const m = I[e.type], i = n[e.type]++, r = e.r, ry = Math.atan2(p.x - e.x, p.y - e.y);
      let y = r, sx = r, sy = r, sz = r;
      if (e.type === 'bug') {
        if (MOD.bug) { const k = e.flash > 0 ? 1.9 : 1.6; sx = sy = sz = r * k; y = Math.abs(Math.sin(t * 14 + e.x)) * 2; }
        else { sy = r * .7; sz = r * 1.2; y = r * .7 + Math.abs(Math.sin(t * 14 + e.x)) * 2; }
      }
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
      if (e.type === 'bug' && MOD.bug) col(m, i, e.flash > 0 ? '#ffd4d4' : e.slow > 0 ? '#9ddcff' : '#ffffff');   // Modell: Textur zeigen, nur leicht tönen
      else col(m, i, e.flash > 0 ? (big ? (e.type === 'tutor' ? '#fde68a' : e.type === 'abi' ? '#ddd6fe' : '#f87171') : '#ffffff') : e.slow > 0 && !big ? '#7dd3fc' : e.dash > 0 ? '#fde047' : FOE_COL[e.type]);
      put(I.shadow, sh++, e.x, .5, e.y, r * 1.1);
      if (e.type !== 'boss' && e.type !== 'spam' && !(e.type === 'bug' && MOD.bug)) for (const s of [-1, 1]) {   // Augen Richtung Zauberer
        const ex = e.x + Math.sin(ry) * r * .9 + Math.cos(ry) * s * r * .35, ez = e.y + Math.cos(ry) * r * .9 - Math.sin(ry) * s * r * .35;
        put(I.eye, ne++, ex, y + r * .25, ez, Math.max(1.6, r * .16));
      }
    }
    for (const k in n) done(I[k], n[k]); done(I.eye, ne); done(I.cap, ncap);
    let neb = 0; for (const s of (G.eshots || [])) { put(I.eshot, neb, s.x, 16, s.y, s.r); col(I.eshot, neb++, s.col || '#f43f5e'); } done(I.eshot, neb);

    // Geschosse
    let nf = 0, na = 0, nb = 0;
    for (const s of G.shots) {
      if (s.kind === 'pfeil') { put(I.arrow, na, s.x, 18, s.y, 1, 1, 1, Math.atan2(s.vx, s.vy)); col(I.arrow, na++, s.crit ? '#fde047' : '#67e8f9'); }
      else if (s.kind === 'klinge') { put(I.blade, nb, s.x, 18, s.y, s.r, s.r, s.r, t * 18); col(I.blade, nb++, s.crit ? '#fde047' : '#e5e7eb'); }
      else { put(I.fire, nf, s.x, 22, s.y, s.r); col(I.fire, nf++, s.crit ? '#fde047' : '#fb923c'); }
    }
    done(I.fire, nf); done(I.arrow, na); done(I.blade, nb);

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
    let nk = 0; for (const c of G.chests) { for (const k of ['chest', 'lid', 'band']) put(I[k], nk, c.x, 0, c.y, 1, 1, 1, .3); put(I.shadow, sh++, c.x, .5, c.y, 24); nk++; }
    for (const k of ['chest', 'lid', 'band']) done(I[k], nk);

    let np = 0; for (const o of G.pools) put(I.pool, np++, o.x, 1, o.y, o.R, 1, o.R); done(I.pool, np);
    let nx = 0; for (const f of G.fx) { const k = 1 - f.life / f.max; put(I.fx, nx, f.x, 10, f.y, f.r * (.6 + k * .6), f.r * (.4 + k * .4), f.r * (.6 + k * .6)); col(I.fx, nx++, f.col); }
    done(I.fx, nx);
    let nm = 0; for (const m of G.meteors) { const k = m.t / m.max; put(I.meteor, nm, m.x + 120 * k, 12 + 420 * k, m.y - 60 * k, 14, 14, 14, t * 5); put(I.mark, nm++, m.x, 1.5, m.y, m.R); }
    done(I.meteor, nm); done(I.mark, nm);
    done(I.shadow, sh);

    const sl = G.slashes || [];
    slashPool.forEach((m, i) => {
      const s = sl[i]; m.visible = !!s; if (!s) return;
      const key = Math.round(s.half * 100);
      if (!slashGeo[key]) slashGeo[key] = new THREE.RingGeometry(.35, 1, 24, 1, -s.half, s.half * 2).rotateX(-Math.PI / 2);
      m.geometry = slashGeo[key]; m.position.set(s.x, 14, s.y); m.rotation.y = -s.a;
      const k = 1 - s.life / s.max; m.scale.setScalar(s.R * (.75 + .25 * k));
      m.material.opacity = .7 * (s.life / s.max); m.material.color.set(s.crit ? '#fde047' : '#f1f5f9');
    });
    const sw = p.w.schild;
    if (sw && sw.layers > 0) { shield.visible = true; shield.position.set(p.x, 0, p.y); shield.scale.set(34, 52, 34); shield.material.opacity = .08 + .08 * sw.layers; }
    else shield.visible = false;

    if (p.w.aura) { aura.visible = true; aura.position.set(p.x, 1, p.y); const R = p.w.aura.R || 60; aura.scale.set(R, 1, R); } else aura.visible = false;

    // Blitze als Linien
    const a = bolts.geometry.attributes.position.array; let v = 0;
    for (const b of G.bolts) for (let i = 1; i < b.pts.length && v < 597; i++) {
      const q0 = b.pts[i - 1], q1 = b.pts[i];
      a.set([q0.x, 22, q0.y, q1.x + (Math.random() - .5) * 8, 18 + Math.random() * 8, q1.y + (Math.random() - .5) * 8], v * 3); v += 2;
    }
    bolts.geometry.setDrawRange(0, v); bolts.geometry.attributes.position.needsUpdate = true;

    ren.render(scene, cam);
  }

  function toScreen(x, y, h) { P.set(x, h, y).project(cam); return {x: (P.x + 1) / 2 * lastW, y: (1 - P.y) / 2 * lastH, vis: P.z < 1}; }
  function setLook(robe, hat) { if (MOD.held) return; robeMat.color.set(robe); hatMat.color.set(hat); }
  function setWorld(i) {
    if (!scene) return; const T = THEMES[i] || THEMES[0];
    if (i !== worldNow) { const tex = grassTexture(T); tex.repeat.set(4096 / 256, 4096 / 256); ground.material.map.dispose(); ground.material.map = tex; ground.material.needsUpdate = true; worldNow = i; }
    scene.background.set(T.sky); scene.fog.color.set(T.sky); hemi.groundColor.set(T.low);
    for (const k of ['pine', 'oak', 'bush', 'rock', 'trunk']) I[k].material.color.set(T[k]);
  }
  return {init, render, toScreen, setLook, setWorld};
})();
