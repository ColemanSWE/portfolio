import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { DISSOLVE_FRAG, DISSOLVE_VERT, FILM_FRAG, FILM_VERT, GLOBE_FRAG, GLOBE_VERT } from './shaders';

/*
  One off-screen WebGL renderer draws every image on the page. Each placeholder element gets its own 2D
  canvas, and every frame the renderer draws that element's plane and copies the pixels into it. The
  canvases live in the normal page flow, so they scroll natively with the page: no lag behind the
  browser's compositor-driven scrolling on phones (a fixed overlay synced in JS visibly jitters there).
  Images dissolve as they scroll in and out.

  Markup contract (all optional):
    [data-fx-plane="/url.jpg"]   an image plane; [data-fx-bg] sets the colour pixels dissolve into
    [data-fx-hero="/portrait"]   the hero: a 3D scene (CRT + bubbles + name) rendered into a texture
    [data-fx-specimen]           Lab 002: the holographic shader on a knot and two bubbles
    [data-fx-globe="/land.png"]  the contact globe (drag to spin)
  Elements get the class `fx-on` once WebGL has taken them over, which hides their fallback.
*/

type Uniforms = Record<string, THREE.IUniform>;
type Kind = 'hero' | 'image' | 'scene';
interface Plane { el: HTMLElement; scene: THREE.Scene; u: Uniforms; cv: HTMLCanvasElement; ctx: CanvasRenderingContext2D; hover: number; target: number; kind: Kind; hoverable: boolean }
interface Source { el: HTMLElement; render: (t: number, mx: number, my: number) => void }
interface FilmOpts { bubble?: boolean; base?: number; scale?: number; wob?: number; mix?: number }

const BLANK_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const STONE = 0x9a9996, CHAR = 0x1a1a1c, PAPER = 0xebeae6;

export function startFx(): () => void {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: document.createElement('canvas'), antialias: false });
  } catch {
    return () => {}; // no WebGL: the fallback images stay visible
  }
  // Every texture and colour here is used as authored sRGB and every screen material is a raw
  // ShaderMaterial, so colour management stays off (matches the approved prototype exactly).
  THREE.ColorManagement.enabled = false;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr());

  let dead = false;
  const cleanups: (() => void)[] = [];
  const listen = <K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) => {
    window.addEventListener(type, fn, opts);
    cleanups.push(() => window.removeEventListener(type, fn));
  };

  const planeCam = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1, 1);
  const quad = new THREE.PlaneGeometry(1, 1);
  const planes: Plane[] = [];
  const sources: Source[] = [];
  const filmMats: THREE.ShaderMaterial[] = [];

  function film({ bubble = false, base = 0.55, scale = 1.6, wob = 0, mix = 0.7 }: FilmOpts = {}) {
    const m = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 }, uBubble: { value: bubble ? 1 : 0 }, uBase: { value: base }, uScale: { value: scale }, uWob: { value: wob }, uFilm: { value: mix } },
      vertexShader: FILM_VERT,
      fragmentShader: FILM_FRAG,
      transparent: bubble,
      depthWrite: !bubble,
      side: bubble ? THREE.DoubleSide : THREE.FrontSide,
    });
    filmMats.push(m);
    return m;
  }

  function addPlane(el: HTMLElement, tex: THREE.Texture, opts: { bg: string | number; cover?: boolean; kind: Kind; imgAspect?: number; hoverable?: boolean }) {
    const u: Uniforms = {
      uTex: { value: tex }, uS: { value: 0 }, uDir: { value: 1 }, uT: { value: 0 }, uHover: { value: 0 },
      uAspect: { value: 1 }, uImgAspect: { value: opts.imgAspect ?? 1 }, uCover: { value: opts.cover ? 1 : 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }, uRes: { value: new THREE.Vector2(1, 1) }, uBg: { value: new THREE.Color(opts.bg) },
    };
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(quad, new THREE.ShaderMaterial({ uniforms: u, vertexShader: DISSOLVE_VERT, fragmentShader: DISSOLVE_FRAG })));
    const cv = document.createElement('canvas');
    cv.className = 'fx-canvas';
    cv.setAttribute('aria-hidden', 'true');
    el.prepend(cv);
    cleanups.push(() => cv.remove());
    const p: Plane = { el, scene, u, cv, ctx: cv.getContext('2d')!, hover: 0, target: 0, kind: opts.kind, hoverable: opts.hoverable ?? true };
    if (p.hoverable) {
      const enter = () => (p.target = 1), leave = () => (p.target = 0);
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => { el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); });
    }
    el.classList.add('fx-on');
    cleanups.push(() => el.classList.remove('fx-on'));
    planes.push(p);
    return p;
  }

  const renderInto = (rt: THREE.WebGLRenderTarget, s: THREE.Scene, c: THREE.Camera, clear: number) => {
    renderer.setRenderTarget(rt);
    renderer.setClearColor(clear, 1);
    renderer.clear();
    renderer.render(s, c);
    renderer.setRenderTarget(null);
    renderer.setClearColor(0x000000, 0);
  };
  const newTarget = () => new THREE.WebGLRenderTarget(4, 4, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });

  /* ---------------- image planes ---------------- */
  const loader = new THREE.TextureLoader();
  document.querySelectorAll<HTMLElement>('[data-fx-plane]').forEach((el) => {
    loader.load(el.dataset.fxPlane!, (tex) => {
      if (dead) return;
      tex.minFilter = THREE.LinearFilter;
      const img = tex.image as HTMLImageElement;
      addPlane(el, tex, { bg: el.dataset.fxBg ?? '#1a1a1c', cover: true, kind: 'image', imgAspect: img.width / img.height });
    });
  });

  /* ---------------- hero ---------------- */
  const heroEl = document.querySelector<HTMLElement>('[data-fx-hero]');
  if (heroEl) setupHero(heroEl);

  function setupHero(hero: HTMLElement) {
    const portrait = new Image();
    const portraitReady = new Promise<void>((r) => { portrait.onload = () => r(); portrait.onerror = () => r(); });
    portrait.src = hero.dataset.fxHero!;
    const fontReady = document.fonts ? document.fonts.load('80px Corepix').then(() => undefined, () => undefined) : Promise.resolve();

    Promise.all([portraitReady, fontReady]).then(() => {
      if (dead) return;
      const bgC = document.createElement('canvas'), nameC = document.createElement('canvas');
      const size = () => ({ d: dpr(), w: hero.clientWidth, h: hero.clientHeight });

      const paintBg = () => {
        const { d, w, h } = size();
        bgC.width = Math.round(w * d); bgC.height = Math.round(h * d);
        const g = bgC.getContext('2d')!;
        g.setTransform(d, 0, 0, d, 0, 0);
        g.fillStyle = '#9a9996'; g.fillRect(0, 0, w, h);
        const id = g.getImageData(0, 0, bgC.width, bgC.height), px = id.data;
        for (let i = 0; i < px.length; i += 4) { const n = (Math.random() - 0.5) * 26; px[i] += n; px[i + 1] += n; px[i + 2] += n; }
        g.putImageData(id, 0, 0);
        if (portrait.naturalWidth) {
          const ph = h * 0.62, pw = (ph * portrait.naturalWidth) / portrait.naturalHeight;
          g.save(); g.filter = 'saturate(1.15) contrast(1.05)'; g.globalAlpha = 0.92;
          g.drawImage(portrait, (w - pw) / 2, h * 0.2, pw, ph); g.restore();
        }
      };
      const paintName = () => {
        const { d, w, h } = size();
        nameC.width = Math.round(w * d); nameC.height = Math.round(h * d);
        const g = nameC.getContext('2d')!;
        g.setTransform(d, 0, 0, d, 0, 0);
        const fs = Math.min(w * 0.15, h * 0.26), off = Math.max(3, fs * 0.035);
        g.font = `${fs}px Corepix`; g.textAlign = 'center'; g.textBaseline = 'middle';
        ([['COLEMAN', h * 0.42], ['ROSE', h * 0.42 + fs * 0.92]] as const).forEach(([t, y]) => {
          g.fillStyle = '#ff2d9a'; g.fillText(t, w / 2 - off, y);
          g.fillStyle = '#2fd8ff'; g.fillText(t, w / 2 + off, y + off * 0.4);
          g.save(); g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = fs * 0.25; g.fillStyle = '#ffffff'; g.fillText(t, w / 2, y); g.restore();
        });
      };

      const hs = new THREE.Scene();
      const hc = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      hc.position.set(0, 0, 10);
      const rt = newTarget();
      const bgTex = new THREE.CanvasTexture(bgC), nameTex = new THREE.CanvasTexture(nameC);
      const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: bgTex, depthWrite: false }));
      const namePlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: nameTex, transparent: true, depthWrite: false, depthTest: false }));
      bgPlane.position.z = -3; bgPlane.renderOrder = -1;
      namePlane.position.z = 2; namePlane.renderOrder = 10;
      hs.add(bgPlane, namePlane);

      // the CRT from the old site, in the holographic finish
      const crt = new THREE.Group(), spin = new THREE.Group();
      crt.add(spin); hs.add(crt);
      const placeholder = new THREE.Mesh(new THREE.TorusKnotGeometry(0.55, 0.2, 160, 24), film({ base: 0.5 }));
      spin.add(placeholder);
      const mgr = new THREE.LoadingManager();
      mgr.setURLModifier((u) => (/\.fbx$/i.test(u) ? u : BLANK_PNG)); // the model's texture paths don't exist; it's all shader
      new FBXLoader(mgr).load('/3d/comp.fbx', (obj) => {
        if (dead) return;
        const box = new THREE.Box3().setFromObject(obj), dims = box.getSize(new THREE.Vector3()), ctr = box.getCenter(new THREE.Vector3());
        obj.position.sub(ctr);
        const holder = new THREE.Group();
        holder.add(obj);
        holder.scale.setScalar(2.1 / Math.max(dims.x, dims.y, dims.z));
        const m = film({ base: 0.9, scale: 0.8, mix: 0.7 });
        obj.traverse((o) => { const mesh = o as THREE.Mesh; if (mesh.isMesh) { mesh.material = m; mesh.geometry.computeVertexNormals(); } });
        spin.remove(placeholder);
        spin.add(holder);
      }, undefined, () => { /* keep the knot */ });

      // glass bubbles, like Absolution Engine's Plaza
      const bubbles: { mesh: THREE.Mesh; sx: number; sy: number; sp: number; ph: number; z: number }[] = [];
      const nB = window.innerWidth < 700 ? 5 : 9;
      for (let i = 0; i < nB; i++) {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.18 + Math.random() * 0.42, 48, 32), film({ bubble: true, scale: 2.2, wob: 0.012 }));
        hs.add(mesh);
        bubbles.push({ mesh, sx: Math.random() - 0.5, sy: Math.random(), sp: 0.06 + Math.random() * 0.1, ph: Math.random() * 6.28, z: -1 + Math.random() * 2.4 });
      }

      let viewW = 1, viewH = 1;
      const fit = (m: THREE.Mesh) => { const dist = hc.position.z - m.position.z, hh = 2 * dist * Math.tan((hc.fov * Math.PI) / 360); m.scale.set(hh * hc.aspect, hh, 1); };
      const layout = () => {
        const { d, w, h } = size();
        if (!w || !h) return;
        hc.aspect = w / h; hc.updateProjectionMatrix();
        rt.setSize(Math.round(w * d), Math.round(h * d));
        paintBg(); paintName(); bgTex.needsUpdate = true; nameTex.needsUpdate = true;
        fit(bgPlane); fit(namePlane);
        viewH = 2 * hc.position.z * Math.tan((hc.fov * Math.PI) / 360); viewW = viewH * hc.aspect;
        const narrow = w < 700;
        crt.position.set(narrow ? 0 : viewW * 0.31, narrow ? -viewH * 0.3 : -viewH * 0.22, 0.6);
        crt.scale.setScalar(narrow ? 0.6 : Math.min(1, viewH * 0.2));
      };
      layout();
      let timer = 0;
      listen('resize', () => { window.clearTimeout(timer); timer = window.setTimeout(layout, 150); });

      const p = addPlane(hero, rt.texture, { bg: STONE, kind: 'hero', imgAspect: hero.clientWidth / hero.clientHeight });
      const move = () => (p.target = 1);
      hero.addEventListener('pointermove', move);
      cleanups.push(() => hero.removeEventListener('pointermove', move));

      sources.push({
        el: hero,
        render: (t, mx, my) => {
          spin.rotation.y = t * 0.35 + mx * 0.6;
          spin.rotation.x = Math.sin(t * 0.4) * 0.08 + my * 0.3;
          bubbles.forEach((b) => {
            const y = ((b.sy + t * b.sp) % 1.2) - 0.1;
            b.mesh.position.set(b.sx * viewW * 0.9 + Math.sin(t * 0.5 + b.ph) * 0.25 + mx * 0.3 * (b.z + 1), (y - 0.5) * viewH * 1.1, b.z);
          });
          renderInto(rt, hs, hc, STONE);
        },
      });
    });
  }

  /* ---------------- Lab 002: the shader specimen ---------------- */
  const specEl = document.querySelector<HTMLElement>('[data-fx-specimen]');
  if (specEl) {
    const ss = new THREE.Scene(), sc = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 50);
    const srt = newTarget();
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.34, 280, 40), film({ base: 0.55, scale: 1.1, mix: 0.85 }));
    const b1 = new THREE.Mesh(new THREE.SphereGeometry(0.55, 48, 32), film({ bubble: true, scale: 2.2, wob: 0.015 }));
    const b2 = new THREE.Mesh(new THREE.SphereGeometry(0.36, 48, 32), film({ bubble: true, scale: 2.6, wob: 0.02 }));
    ss.add(knot, b1, b2);
    const p = addPlane(specEl, srt.texture, { bg: CHAR, kind: 'scene' });
    let narrow = false;
    const layout = () => {
      const w = specEl.clientWidth, h = specEl.clientHeight, d = dpr();
      if (!w || !h) return;
      sc.aspect = w / h; narrow = w / h < 1.3; sc.position.set(0, 0, 9.5 - (narrow ? 0 : 0.5)); sc.updateProjectionMatrix();
      srt.setSize(Math.round(w * d), Math.round(h * d));
      p.u.uImgAspect.value = w / h;
    };
    layout();
    listen('resize', layout);
    sources.push({
      el: specEl,
      render: (t, mx, my) => {
        knot.rotation.set(t * 0.22 + my * 0.5, t * 0.35 + mx * 0.7, 0);
        b1.position.set(narrow ? 1.1 : 2.2, 0.95 + Math.sin(t * 0.9) * 0.15, 0.6);
        b2.position.set(narrow ? -1.1 : -2.4, -0.85 + Math.sin(t * 0.7 + 2) * 0.12, 0.3);
        renderInto(srt, ss, sc, CHAR);
      },
    });
  }

  /* ---------------- contact globe ---------------- */
  const globeEl = document.querySelector<HTMLElement>('[data-fx-globe]');
  if (globeEl) {
    const gs = new THREE.Scene(), gc = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
    gc.position.set(0, 0, 4.2);
    const grt = newTarget();
    const globe = new THREE.Group();
    globe.rotation.set(0.4, -1.2, 0);
    gs.add(globe);
    const lines = new THREE.LineBasicMaterial({ color: 0x111112, transparent: true, opacity: 0.8 });
    const ring = (pts: THREE.Vector3[]) => globe.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), lines));
    for (let la = -75; la <= 75; la += 15) {
      const pts: THREE.Vector3[] = [], y = Math.sin((la * Math.PI) / 180), rr = Math.cos((la * Math.PI) / 180);
      for (let a = 0; a < 64; a++) { const t = (a / 64) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(t) * rr, y, Math.sin(t) * rr)); }
      ring(pts);
    }
    const yAxis = new THREE.Vector3(0, 1, 0);
    for (let lo = 0; lo < 180; lo += 15) {
      const pts: THREE.Vector3[] = [];
      for (let a = 0; a < 64; a++) { const t = (a / 64) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(t), Math.sin(t), 0).applyAxisAngle(yAxis, (lo * Math.PI) / 180)); }
      ring(pts);
    }
    const land = loader.load(globeEl.dataset.fxGlobe!);
    const light = new THREE.Vector3(0.5, 0.5, 1).normalize();
    const pearl = new THREE.ShaderMaterial({ uniforms: { uLand: { value: land }, uT: { value: 0 }, uL: { value: light } }, vertexShader: GLOBE_VERT, fragmentShader: GLOBE_FRAG });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(0.985, 96, 64), pearl));
    // Helsinki
    const la = (60.17 * Math.PI) / 180, lo = (-24.94 * Math.PI) / 180;
    const hp = new THREE.Vector3(Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo));
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 12), new THREE.MeshBasicMaterial({ color: 0xff2d9a }));
    pin.position.copy(hp);
    globe.add(pin, new THREE.Line(new THREE.BufferGeometry().setFromPoints([hp, hp.clone().multiplyScalar(1.4)]), new THREE.LineBasicMaterial({ color: 0xff2d9a })));

    addPlane(globeEl, grt.texture, { bg: PAPER, kind: 'scene', hoverable: false });
    const layout = () => { const w = globeEl.clientWidth, d = Math.min(window.devicePixelRatio || 1, 2); if (w) grt.setSize(Math.round(w * d), Math.round(w * d)); };
    layout();
    listen('resize', layout);

    let drag: number | null = null, vel = 0;
    const down = (e: PointerEvent) => { drag = e.clientX; globeEl.setPointerCapture(e.pointerId); };
    const mv = (e: PointerEvent) => { if (drag === null) return; vel = (e.clientX - drag) * 0.01; globe.rotation.y += vel; drag = e.clientX; };
    const up = () => (drag = null);
    globeEl.addEventListener('pointerdown', down);
    globeEl.addEventListener('pointermove', mv);
    globeEl.addEventListener('pointerup', up);
    globeEl.addEventListener('pointercancel', up);
    cleanups.push(() => { globeEl.removeEventListener('pointerdown', down); globeEl.removeEventListener('pointermove', mv); globeEl.removeEventListener('pointerup', up); globeEl.removeEventListener('pointercancel', up); });

    sources.push({
      el: globeEl,
      render: (t) => {
        pearl.uniforms.uT.value = t;
        light.set(Math.sin(t * 0.35) * 1.3, 0.55 + 0.25 * Math.sin(t * 0.21), 1).normalize();
        if (drag === null) { vel *= 0.95; globe.rotation.y += (reduce ? 0 : 0.004) + vel; }
        renderInto(grt, gs, gc, PAPER);
      },
    });
  }

  /* ---------------- frame loop ---------------- */
  let W = 0, H = 0, mx = 0, my = 0, RW = 0, RH = 0;
  // the off-screen drawing buffer only ever grows, to fit the largest plane drawn so far
  const ensureSize = (w: number, h: number) => {
    if (w <= RW && h <= RH) return;
    RW = Math.max(RW, w, W); RH = Math.max(RH, h, H);
    renderer.setSize(RW, RH, false);
  };
  const resize = () => {
    W = window.innerWidth; H = window.innerHeight;
    if (renderer.getPixelRatio() !== dpr()) { renderer.setPixelRatio(dpr()); RW = RH = 0; }
    ensureSize(W, H);
  };
  resize();
  listen('resize', resize);
  listen('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });

  let raf = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const t = reduce ? 0 : now / 1000;
    const mxN = W ? (mx / W - 0.5) * 2 : 0, myN = H ? (my / H - 0.5) * 2 : 0;
    filmMats.forEach((m) => (m.uniforms.uT.value = t));
    for (const s of sources) {
      const r = s.el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < H) s.render(t, mxN, myN);
    }
    const d = renderer.getPixelRatio(), gl = renderer.domElement;
    for (const p of planes) {
      const r = p.el.getBoundingClientRect();
      if (!(r.bottom > 0 && r.top < H && r.width > 0 && r.height > 0)) continue;
      const w = Math.ceil(r.width), h = Math.ceil(r.height);
      const cw = Math.floor(w * d), ch = Math.floor(h * d);
      if (p.cv.width !== cw || p.cv.height !== ch) { p.cv.width = cw; p.cv.height = ch; }
      ensureSize(w, h);
      // dissolve on the way out (top) and assemble on the way in (bottom)
      let s = 0, dir = 1;
      if (p.kind === 'hero') s = (Math.max(0, -r.top) / r.height) * 1.25;
      else if (r.top < H * 0.12) s = ((H * 0.12 - r.top) / r.height) * 1.3;
      else if (r.bottom > H * 0.92) { s = ((r.bottom - H * 0.92) / r.height) * 1.3; dir = -1; }
      p.u.uS.value = Math.min(s, 1.4);
      p.u.uDir.value = dir;
      p.hover += (p.target - p.hover) * 0.06;
      p.u.uHover.value = p.hover;
      p.u.uT.value = t;
      p.u.uAspect.value = r.width / r.height;
      (p.u.uRes.value as THREE.Vector2).set(r.width, r.height);
      (p.u.uMouse.value as THREE.Vector2).set(Math.min(Math.max((mx - r.left) / r.width, 0), 1), Math.min(Math.max(1 - (my - r.top) / r.height, 0), 1));
      // draw this plane into the bottom-left corner of the buffer, then copy it into the element's canvas
      renderer.setViewport(0, 0, w, h);
      renderer.setScissor(0, 0, w, h);
      renderer.setScissorTest(true);
      renderer.render(p.scene, planeCam);
      renderer.setScissorTest(false);
      p.ctx.drawImage(gl, 0, gl.height - ch, cw, ch, 0, 0, cw, ch);
    }
  };
  raf = requestAnimationFrame(frame);

  return () => {
    dead = true;
    cancelAnimationFrame(raf);
    cleanups.forEach((c) => c());
    renderer.dispose();
  };
}
