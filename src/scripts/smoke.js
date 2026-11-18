/* smoke.js: slow-motion smoke over the hero, rendered as a domain-warped noise field in one WebGL fragment shader.
   The cursor (or a finger) parts it: a short trail of pointer points pushes the field aside and thins it, and the
   hole heals as the trail fades. Half resolution, paused off screen and in hidden tabs, off under reduced motion. */
(() => {
  const c = document.querySelector('[data-smoke]');
  if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const gl = c.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) return;
  const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  const FS = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec3 m[8];
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r;float asp=r.x/r.y;
  vec2 p=vec2(uv.x*asp,uv.y)*2.1;
  float part=0.;
  for(int i=0;i<8;i++){
    vec2 dv=(uv-m[i].xy)*vec2(asp,1.);float dd=dot(dv,dv);
    float s=m[i].z*exp(-dd*30.);
    part+=s;p+=normalize(dv+1e-4)*s*.42;
  }
  float tt=t*.03;
  vec2 q=vec2(fbm(p+vec2(0.,tt)),fbm(p+vec2(5.2,1.3)-tt*.8));
  vec2 w=vec2(fbm(p+3.4*q+vec2(1.7,9.2)+tt*.6),fbm(p+3.4*q+vec2(8.3,2.8)-tt*.45));
  float f=fbm(p+3.*w+vec2(tt*.5,0.));
  float dens=smoothstep(.37,1.,f);
  dens*=smoothstep(.04,.38,uv.y)*(1.-smoothstep(.62,.96,uv.y));
  dens*=1.-clamp(part,0.,1.)*.92;
  vec3 col=mix(vec3(.50,.42,.80),vec3(1.,.62,.28),smoothstep(.25,.95,w.x*q.y*1.6));
  col=mix(col,vec3(.93,.85,.62),.18*smoothstep(.5,1.,q.x));
  gl_FragColor=vec4(col*dens*1.2,dens*.68);
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
  const uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't'), uM = gl.getUniformLocation(pr, 'm');
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  const SCALE = window.innerWidth < 760 ? 0.38 : 0.5;
  function resize() { const w = Math.max(2, Math.round(c.clientWidth * SCALE)), h = Math.max(2, Math.round(c.clientHeight * SCALE)); if (c.width !== w || c.height !== h) { c.width = w; c.height = h; gl.viewport(0, 0, w, h); } }
  const trail = Array.from({ length: 8 }, () => [-9, -9, 0]);
  let head = 0, lastX = null, lastY = null;
  const host = c.closest('[data-hero]') || document;
  host.addEventListener('pointermove', (e) => {
    const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = 1 - (e.clientY - r.top) / r.height;
    if (lastX !== null && Math.hypot(x - lastX, y - lastY) < 0.012) return;
    lastX = x; lastY = y; trail[head] = [x, y, 1]; head = (head + 1) % trail.length;
  }, { passive: true });
  let run = true, visible = true, t0 = performance.now(), first = true;
  const flat = new Float32Array(24);
  function frame(now) {
    if (!run) return;
    resize();
    for (let i = 0; i < trail.length; i++) { trail[i][2] *= 0.965; flat[i * 3] = trail[i][0]; flat[i * 3 + 1] = trail[i][1]; flat[i * 3 + 2] = trail[i][2]; }
    gl.uniform2f(uR, c.width, c.height); gl.uniform1f(uT, (now - t0) / 1000); gl.uniform3fv(uM, flat);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (first) { first = false; c.classList.add('is-on'); }
    requestAnimationFrame(frame);
  }
  const start = () => { if (!run && visible && !document.hidden) { run = true; requestAnimationFrame(frame); } };
  const stop = () => { run = false; };
  if ('IntersectionObserver' in window) new IntersectionObserver((en) => { visible = en[0].isIntersecting; visible ? start() : stop(); }).observe(c);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  requestAnimationFrame(frame);
})();
