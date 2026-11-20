// GLSL for the page's one WebGL layer. Written in GLSL 1 style; three.js adds the
// compatibility defines (texture2D, gl_FragColor, varying) when it compiles for WebGL 2.

const NOISE = /* glsl */ `
  float hash3(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
  float noise3(vec3 p){
    vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
    return mix(mix(mix(hash3(i), hash3(i + vec3(1,0,0)), f.x), mix(hash3(i + vec3(0,1,0)), hash3(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash3(i + vec3(0,0,1)), hash3(i + vec3(1,0,1)), f.x), mix(hash3(i + vec3(0,1,1)), hash3(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
`;

// ---------- the dissolve: every image plane on the page ----------
export const DISSOLVE_VERT = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }
`;

export const DISSOLVE_FRAG = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uS, uDir, uT, uHover, uAspect, uImgAspect, uCover;
  uniform vec2 uMouse, uRes;
  uniform vec3 uBg;
  varying vec2 vUv;
  float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  vec2 mirrored(vec2 v){ vec2 m = mod(v, 2.); return mix(m, 2. - m, step(1., m)); }
  vec2 cover(vec2 q){ float r = uAspect / uImgAspect; vec2 s = r > 1. ? vec2(1., 1. / r) : vec2(r, 1.); return (q - .5) * s + .5; }
  void main(){
    vec2 uv = vUv;
    vec2 cell = floor(uv * uRes / 2.);
    float colN = h(vec2(floor(uv.x * uRes.x / 3.), 7.));
    float pxN = h(cell);
    float s = smoothstep(0., 1., uS);
    // each pixel falls by its own noise value, so the image drips into streaks
    float fall = s * s * (.45 * colN + 1.4 * pxN * pxN);
    uv.y += fall * uDir;
    // a little depth from the cursor
    uv += (uMouse - .5) * (pxN - .5) * (.002 + .012 * uHover) * (1. + 3. * s);
    vec2 t = mix(uv, cover(uv), uCover);
    vec2 off = vec2(.001 + .035 * s + .003 * uHover, 0.);
    vec3 c = vec3(texture2D(uTex, mirrored(t + off)).r, texture2D(uTex, mirrored(t)).g, texture2D(uTex, mirrored(t - off)).b);
    // pixels drop out into grain as it dissolves
    float keep = step(s * .9, h(cell + 3.17));
    vec3 bg = uBg + (h(cell + floor(uT * 12.)) - .5) * .08;
    c = mix(c, bg, (1. - keep) * s);
    gl_FragColor = vec4(c, 1.);
  }
`;

// ---------- thin-film interference: the holographic finish ----------
export const FILM_VERT = /* glsl */ `
  uniform float uT, uWob;
  varying vec3 vN; varying vec3 vV; varying vec3 vP;
  void main(){
    vec3 p = position + normal * sin(position.y * 5. + uT * 1.7) * uWob;
    vec4 wp = modelMatrix * vec4(p, 1.);
    vP = (modelMatrix * vec4(position, 1.)).xyz;
    vN = normalize(mat3(modelMatrix) * normal);
    vV = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const FILM_FRAG = /* glsl */ `
  uniform float uT, uBubble, uBase, uScale, uFilm;
  varying vec3 vN; varying vec3 vV; varying vec3 vP;
  ${NOISE}
  vec3 env(vec3 r){
    vec3 c = mix(vec3(.12, .11, .14), vec3(.93, .95, 1.), smoothstep(-.35, .75, r.y));
    c += vec3(1.) * smoothstep(.9, .99, dot(r, normalize(vec3(.6, .55, .6)))) * 1.6;
    c += vec3(1., .92, .97) * smoothstep(.82, .97, dot(r, normalize(vec3(-.75, .2, .5))));
    c += vec3(.8) * smoothstep(.06, 0., abs(r.y - .04)) * .6;
    return c;
  }
  void main(){
    vec3 N = normalize(vN), V = normalize(vV);
    if (!gl_FrontFacing) N = -N;
    float ndv = clamp(dot(N, V), 0., 1.);
    // film thickness in nanometres drifts over the surface
    float th = 260. + 460. * noise3(vP * uScale + vec3(0., uT * .12, uT * .05));
    float n = 1.33, cosT = sqrt(max(0., 1. - (1. - ndv * ndv) / (n * n)));
    vec3 film = .5 + .5 * cos(6.28318 * 2. * n * th * cosT / vec3(650., 532., 450.));
    float fres = .04 + .96 * pow(1. - ndv, 5.);
    vec3 R = reflect(-V, N), e = env(R);
    float spec = pow(max(dot(R, normalize(vec3(.6, .55, .6))), 0.), 80.);
    if (uBubble > .5) {
      vec3 col = film * (.35 + e) * .9 + spec * 2.;
      gl_FragColor = vec4(col, clamp(fres * 1.4 + .1 + spec, 0., 1.));
    } else {
      vec3 col = (e * .8 + .25) * mix(vec3(uBase), film * 1.25, uFilm) + film * fres * .6 * uFilm + spec;
      gl_FragColor = vec4(col, 1.);
    }
  }
`;

// ---------- the contact globe: pearl ocean, black dot-matrix land, orbiting light ----------
export const GLOBE_VERT = /* glsl */ `
  varying vec3 vO; varying vec3 vN; varying vec3 vV;
  void main(){
    vO = normalize(position);
    vec4 wp = modelMatrix * vec4(position, 1.);
    vN = normalize(mat3(modelMatrix) * normal);
    vV = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const GLOBE_FRAG = /* glsl */ `
  uniform sampler2D uLand; uniform float uT; uniform vec3 uL;
  varying vec3 vO; varying vec3 vN; varying vec3 vV;
  ${NOISE}
  void main(){
    vec3 o = normalize(vO), N = normalize(vN), V = normalize(vV), L = normalize(uL);
    float lat = asin(clamp(o.y, -1., 1.)), lon = -atan(o.z, o.x);
    // dots on a lat/long grid, sampling the land mask at each dot's centre
    float rows = 46.;
    float cy = (floor(lat / 3.14159 * rows) + .5) / rows * 3.14159;
    float cols = max(1., floor(rows * 2. * cos(cy)));
    float cx = (floor((lon / 6.28318 + .5) * cols) + .5) / cols;
    float land = step(.5, texture2D(uLand, vec2(cx, cy / 3.14159 + .5)).r);
    vec2 local = vec2(fract((lon / 6.28318 + .5) * cols) - .5, fract(lat / 3.14159 * rows) - .5);
    float dotm = smoothstep(.42, .28, length(local)) * land;
    // thin film anchored to the sphere, so it turns with it
    float ndv = clamp(dot(N, V), 0., 1.);
    float th = 280. + 420. * noise3(o * 2.2 + vec3(0., uT * .08, 0.));
    float cosT = sqrt(max(0., 1. - (1. - ndv * ndv) / 1.769));
    vec3 film = .5 + .5 * cos(6.28318 * 2.66 * th * cosT / vec3(650., 532., 450.));
    float diff = .62 + .38 * max(dot(N, L), 0.);
    vec3 R = reflect(-V, N);
    float spec = pow(max(dot(R, L), 0.), 70.) * 1.2 + pow(max(dot(R, L), 0.), 8.) * .12;
    float fres = pow(1. - ndv, 3.);
    vec3 ocean = mix(vec3(.95, .945, .93), film, .13) * diff;
    vec3 col = mix(ocean, vec3(.07, .07, .08), dotm) + spec + film * fres * .35;
    gl_FragColor = vec4(col, 1.);
  }
`;
