/* fog.js: the dream layer. One fixed WebGL canvas of slow, domain-warped fog behind every page, seen between
   sections and through their glass. Its colour follows the altitude (--alt): sodium street haze at the top, a violet
   cloud layer midway, thinning to clear night sky, thickening again into the cloud sea at Cloud 9. The cursor (or a
   finger) parts it and the gap heals as the trail fades. It rests while a page hero fills the screen (the hero has
   its own smoke), in hidden tabs, and entirely under reduced motion. Ambient fog only: never smoke from a product. */
(() => {
  const c = document.querySelector('[data-fog]');
  if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const gl = c.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) return;
  const phone = window.innerWidth < 760;
  const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  const FS = `precision mediump float;
uniform vec2 r;uniform float t;uniform float alt;uniform vec3 m[8];
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<${phone ? 4 : 5};i++){v+=a*n(p);p=p*2.02+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r;float asp=r.x/r.y;
  vec2 p=vec2(uv.x*asp,uv.y)*1.55;
  float part=0.;
  for(int i=0;i<8;i++){vec2 dv=(uv-m[i].xy)*vec2(asp,1.);float dd=dot(dv,dv);float s=m[i].z*exp(-dd*22.);part+=s;p+=normalize(dv+1e-4)*s*.55;}
  float tt=t*.02;
  p.y-=alt*2.6;
  vec2 q=vec2(fbm(p+vec2(0.,tt)),fbm(p+vec2(5.2,1.3)-tt*.7));
  vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+tt*.5),fbm(p+3.*q+vec2(8.3,2.8)-tt*.35));
  float f=fbm(p+2.6*w+vec2(tt*.4,0.));
  float ground=1.-smoothstep(0.,.7,uv.y);
  float clear=.55*smoothstep(.5,.72,alt)*(1.-smoothstep(.86,.98,alt));
  float dens=smoothstep(.36,1.,f)*(.42+ground*.58)*(1.-clear);
  dens*=1.-clamp(part,0.,1.)*.9;
  vec3 street=mix(vec3(1.,.6,.3),vec3(.52,.44,.82),smoothstep(.2,.95,w.x));
  vec3 cloud=mix(vec3(.55,.48,.86),vec3(.88,.85,.97),smoothstep(.3,.9,q.y));
  vec3 col=mix(street,cloud,smoothstep(.12,.62,alt));
  gl_FragColor=vec4(col*dens,dens*.62);
}`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;
  const pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't'), uA = gl.getUniformLocation(pr, 'alt'), uM = gl.getUniformLocation(pr, 'm');
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  const SCALE = phone ? 0.3 : 0.42;
  function resize() { const w = Math.max(2, Math.round(innerWidth * SCALE)), h = Math.max(2, Math.round(innerHeight * SCALE)); if (c.width !== w || c.height !== h) { c.width = w; c.height = h; gl.viewport(0, 0, w, h); } }
  const trail = Array.from({ length: 8 }, () => [-9, -9, 0]);
  let head = 0, lx = null, ly = null;
  window.addEventListener('pointermove', (e) => {
    const x = e.clientX / innerWidth, y = 1 - e.clientY / innerHeight;
    if (lx !== null && Math.hypot(x - lx, y - ly) < 0.012) return;
    lx = x; ly = y; trail[head] = [x, y, 1]; head = (head + 1) % trail.length;
  }, { passive: true });
  const root = document.documentElement;
  let heroFull = false, run = false, t0 = performance.now(), shown = false;
  const flat = new Float32Array(24);
  function frame(now) {
    if (!run) return;
    resize();
    for (let i = 0; i < trail.length; i++) { trail[i][2] *= 0.962; flat[i * 3] = trail[i][0]; flat[i * 3 + 1] = trail[i][1]; flat[i * 3 + 2] = trail[i][2]; }
    const alt = parseFloat(root.style.getPropertyValue('--alt')) || 0;
    gl.uniform2f(uR, c.width, c.height); gl.uniform1f(uT, (now - t0) / 1000); gl.uniform1f(uA, alt); gl.uniform3fv(uM, flat);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!shown) { shown = true; c.classList.add('is-on'); }
    requestAnimationFrame(frame);
  }
  const want = () => !heroFull && !document.hidden;
  const sync = () => { if (want() && !run) { run = true; requestAnimationFrame(frame); } else if (!want()) run = false; };
  const hero = document.querySelector('[data-hero]');
  if (hero && 'IntersectionObserver' in window) new IntersectionObserver((en) => { heroFull = en[0].intersectionRatio > 0.8; sync(); }, { threshold: [0, 0.8, 1] }).observe(hero);
  document.addEventListener('visibilitychange', sync);
  sync();
})();
