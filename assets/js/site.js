/* site.js: Elevated Dreams. One file, no dependencies. Every enhancement degrades to a working page without it.
   Hooks: [data-open] status, [data-lift-loader] elevator, [data-gate] routing age check, [data-mega] panels,
   [data-drawer] steel-door menu, .doors page transitions, [data-reveal] / [data-words] reveals, --alt altitude,
   [data-alt] altimeter, [data-pbar] pickup bar, [data-lift] proximity levitation, [data-tilt] 3D cards,
   [data-magnet] buttons, [data-hero-video], [data-climb] story climb, [data-thirteen], [data-lb] lightbox. */
(() => {
  const d = document, W = window, root = d.documentElement;
  const $ = (s, el = d) => el.querySelector(s);
  const $$ = (s, el = d) => Array.from(el.querySelectorAll(s));
  const RM = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = W.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const store = (kind) => ({ get: (k) => { try { return W[kind].getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { W[kind].setItem(k, v); } catch (e) { /* storage blocked */ } } });
  const ls = store('localStorage'), ss = store('sessionStorage');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  root.classList.add('site-ready');

  /* ---------------- open now (store hours, America/New_York) ---------------- */
  const HOURS = { 0: [11, 19], 1: [10, 21], 2: [10, 21], 3: [10, 21], 4: [10, 21], 5: [10, 21], 6: [10, 21] };
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  function nyNow() {
    try {
      const parts = {};
      new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date()).forEach((p) => { parts[p.type] = p.value; });
      let h = +parts.hour; if (h === 24) h = 0;
      return { day: DAYS.indexOf(parts.weekday), mins: h * 60 + (+parts.minute) };
    } catch (e) { const n = new Date(); return { day: n.getDay(), mins: n.getHours() * 60 + n.getMinutes() }; }
  }
  const fmt = (h) => `${h % 12 || 12} ${h < 12 ? 'AM' : 'PM'}`;
  function status() {
    const { day, mins } = nyNow(); const [o, c] = HOURS[day];
    if (mins >= o * 60 && mins < c * 60) return { open: true, text: `Open now · until ${fmt(c)}`, short: `Open now until ${fmt(c)}` };
    if (mins < o * 60) return { open: false, text: `Closed · opens ${fmt(o)} today`, short: `Opens ${fmt(o)} today` };
    const [no] = HOURS[(day + 1) % 7];
    return { open: false, text: `Closed · opens ${fmt(no)} tomorrow`, short: `Opens ${fmt(no)} tomorrow` };
  }
  function paintStatus() {
    const s = status();
    $$('[data-open]').forEach((el) => { el.classList.toggle('is-open', s.open); el.classList.toggle('is-closed', !s.open); const t = $('.status__txt', el); if (t) t.textContent = s.text; });
    $$('[data-open-short]').forEach((el) => { el.textContent = s.short; el.classList.toggle('is-closed', !s.open); });
    const { day } = nyNow();
    $$('.hours tr').forEach((tr, i) => tr.classList.toggle('is-today', (i === 0 && day >= 1) || (i === 1 && day === 0)));
    $$('[data-week] .week__day').forEach((li) => li.classList.toggle('is-today', +li.dataset.day === day));
    $$('.ticket[data-days]').forEach((t) => {
      if (t.dataset.expires && new Date(t.dataset.expires + 'T23:59:59-05:00') < new Date()) { t.classList.add('is-expired'); return; }
      const days = t.dataset.days.split(',').map(Number);
      t.classList.toggle('is-tonight', days.length < 7 && days.includes(day));
    });
  }
  paintStatus(); W.setInterval(paintStatus, 60000);

  /* ---------------- elevator loader (once per session, any input skips it) ---------------- */
  const lift = $('[data-lift-loader]');
  if (lift && root.classList.contains('lift-on')) {
    ss.set('ed.lift', '1');
    const floor = $('[data-lift-floor]', lift);
    const seq = ['G', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ED'];
    let i = 0, done = false;
    const open = () => { if (done) return; done = true; W.clearInterval(t); floor.textContent = 'ED'; lift.classList.add('is-open'); W.setTimeout(() => { lift.classList.add('is-gone'); root.classList.remove('lift-on'); focusGate(); }, 900); };
    const t = W.setInterval(() => { floor.textContent = seq[i++]; if (i >= seq.length) open(); }, 68);
    ['keydown', 'pointerdown', 'wheel', 'touchstart'].forEach((ev) => W.addEventListener(ev, open, { once: true, passive: true }));
  }

  /* ---------------- age gate that routes: pickup / delivery / just browsing ---------------- */
  const gate = $('[data-gate]');
  function applyMode() {
    const mode = ls.get('ed.mode');
    const m = $('[data-pbar-mode]'); if (m) m.textContent = mode === 'delivery' ? 'Delivery from Elevated Dreams' : 'Pickup at Elevated Dreams';
    const ms = $('[data-pbar-short]'); if (ms) ms.textContent = mode === 'delivery' ? 'Order delivery' : 'Order pickup';
  }
  applyMode();
  function focusGate() { if (gate && root.classList.contains('gate-on')) { const b = $('[data-gate-yes]', gate); if (b) b.focus(); } }
  if (gate) {
    const steps = { age: $('[data-gate-step="age"]', gate), route: $('[data-gate-step="route"]', gate), no: $('[data-gate-step="no"]', gate) };
    const show = (n) => { Object.keys(steps).forEach((k) => { steps[k].hidden = k !== n; }); const f = $('[tabindex="-1"], button, a', steps[n]); if (f) f.focus(); };
    const ind = $('[data-gate-floor]', gate);
    const closeGate = () => { gate.classList.add('is-done'); W.setTimeout(() => { root.classList.remove('gate-on'); gate.classList.remove('is-done'); evalBar(); }, RM ? 0 : 540); };
    $('[data-gate-yes]', gate).addEventListener('click', () => { ls.set('ed.age', '1'); if (ind) ind.textContent = 'GO'; show('route'); });
    $('[data-gate-no]', gate).addEventListener('click', () => { if (ind) ind.textContent = '—'; show('no'); });
    $$('[data-gate-mode]', gate).forEach((el) => el.addEventListener('click', () => { ls.set('ed.mode', el.dataset.gateMode === 'browse' ? (ls.get('ed.mode') || 'pickup') : el.dataset.gateMode); applyMode(); closeGate(); }));
    gate.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !root.classList.contains('gate-on')) return;
      const f = $$('button:not([hidden]), a[href], [tabindex="-1"]', gate).filter((x) => x.offsetParent !== null);
      if (!f.length) return; const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    if (!root.classList.contains('lift-on')) focusGate();
  }

  /* ---------------- header: solid on scroll, mega panels ---------------- */
  const hdr = $('[data-hdr]');
  const megaItems = $$('.nav__item.has-mega');
  const closeAll = (except) => megaItems.forEach((it) => { if (it !== except) setMega(it, false); });
  function setMega(item, open) {
    const panel = $('[data-mega]', item), btn = $('.nav__more', item);
    if (!panel) return;
    panel.hidden = !open; item.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open));
    if (hdr) hdr.classList.toggle('mega-open', megaItems.some((it) => it.classList.contains('is-open')));
  }
  megaItems.forEach((item) => {
    let tOpen, tClose;
    if (FINE) {
      item.addEventListener('mouseenter', () => { W.clearTimeout(tClose); tOpen = W.setTimeout(() => { closeAll(item); setMega(item, true); }, 90); });
      item.addEventListener('mouseleave', () => { W.clearTimeout(tOpen); tClose = W.setTimeout(() => setMega(item, false), 240); });
    }
    $('.nav__more', item).addEventListener('click', () => { const open = !item.classList.contains('is-open'); closeAll(item); setMega(item, open); });
    item.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setMega(item, false); $('.nav__more', item).focus(); } });
    item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) setMega(item, false); });
  });
  const q = new URLSearchParams(W.location.search).get('mega');
  if (q) { const it = $(`[data-mega-item="${q}"]`); if (it) setMega(it, true); }

  /* ---------------- drawer: steel elevator doors ---------------- */
  const drawer = $('[data-drawer]'), burger = $('[data-burger]');
  function openDrawer() {
    drawer.hidden = false; burger.setAttribute('aria-expanded', 'true'); d.body.style.overflow = 'hidden'; hideBar();
    W.requestAnimationFrame(() => W.requestAnimationFrame(() => drawer.classList.add('is-open')));
    W.setTimeout(() => { const x = $('[data-drawer-close]', drawer); if (x) x.focus(); }, RM ? 0 : 320);
  }
  function closeDrawer(focusBurger = true) {
    drawer.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); d.body.style.overflow = '';
    W.setTimeout(() => { drawer.hidden = true; evalBar(); }, RM ? 0 : 640);
    if (focusBurger) burger.focus();
  }
  if (drawer && burger) {
    burger.addEventListener('click', () => (drawer.hidden ? openDrawer() : closeDrawer()));
    $('[data-drawer-close]', drawer).addEventListener('click', () => closeDrawer());
    drawer.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });
  }

  /* ---------------- page transitions: the doors close, the next floor opens ---------------- */
  if (!RM) {
    d.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if ((a.target && a.target !== '_self') || a.hasAttribute('download') || a.hasAttribute('data-no-doors')) return;
      const href = a.getAttribute('href') || '';
      if (/^(mailto|tel|sms|javascript):/i.test(href) || href.charAt(0) === '#') return;
      let url; try { url = new URL(a.href, W.location.href); } catch (err) { return; }
      if (url.origin !== W.location.origin) return;
      if (url.pathname === W.location.pathname && url.search === W.location.search) return;
      e.preventDefault();
      if (drawer && !drawer.hidden) { drawer.classList.remove('is-open'); }
      ss.set('ed.door', '1'); root.classList.add('is-leaving');
      W.setTimeout(() => { W.location.href = url.href; }, 430);
    });
  }
  W.addEventListener('pageshow', () => { root.classList.remove('is-leaving'); });
  if (root.classList.contains('is-arriving')) W.requestAnimationFrame(() => W.requestAnimationFrame(() => root.classList.remove('is-arriving')));

  /* ---------------- reveals ---------------- */
  // word-by-word rise for section headings (never the H1): each top-level word, or a whole <em>, becomes one unit
  $$('[data-words]').forEach((h) => {
    if (h.tagName === 'H1' || RM) return;
    let k = 0;
    Array.from(h.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const frag = d.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(d.createTextNode(part)); return; }
          const s = d.createElement('span'); s.className = 'w'; s.style.setProperty('--wi', k++); s.textContent = part; frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) { n.classList.add('w'); n.style.setProperty('--wi', k++); }
    });
    h.setAttribute('data-reveal', '');
  });
  const io = 'IntersectionObserver' in W ? new IntersectionObserver((ens) => ens.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }) : null;
  $$('[data-reveal], [data-callpanel], .facade').forEach((el) => (io && !RM ? io.observe(el) : el.classList.add('is-in')));

  /* ---------------- pickup bar: past the hero, gone at the footer, while typing, or for the session ---------------- */
  const bar = $('[data-pbar]'), ftr = $('[data-ftr]'), heroEl = $('[data-hero]');
  let footerIn = false, typing = false, barOff = ss.get('ed.bar') === 'off', barWant = false;
  function hideBar() { if (!bar) return; barWant = false; bar.classList.remove('is-on'); root.style.setProperty('--bottom-stack', '0px'); }
  function evalBar() {
    if (!bar || barOff) return;
    const limit = heroEl ? heroEl.offsetTop + heroEl.offsetHeight * 0.72 : W.innerHeight * 0.72;
    const on = W.scrollY > limit && !footerIn && !typing && (!drawer || drawer.hidden) && !root.classList.contains('gate-on');
    if (on === barWant) return;
    barWant = on;
    if (on) { bar.hidden = false; W.requestAnimationFrame(() => { if (barWant) bar.classList.add('is-on'); }); root.style.setProperty('--bottom-stack', `${(bar.offsetHeight || 64) + 14}px`); }
    else { bar.classList.remove('is-on'); root.style.setProperty('--bottom-stack', '0px'); }
  }
  if (bar) {
    bar.hidden = false;
    $('[data-pbar-close]', bar).addEventListener('click', () => { barOff = true; ss.set('ed.bar', 'off'); hideBar(); });
    if (ftr && 'IntersectionObserver' in W) new IntersectionObserver((en) => { footerIn = en[0].isIntersecting; evalBar(); }, { rootMargin: '0px 0px -25% 0px' }).observe(ftr);
    d.addEventListener('focusin', (e) => { if (e.target.matches('input, textarea, select')) { typing = true; evalBar(); } });
    d.addEventListener('focusout', (e) => { if (e.target.matches('input, textarea, select')) { typing = false; W.setTimeout(evalBar, 120); } });
  }

  /* ---------------- one scroll loop: altitude, altimeter, header, bar, 13-month fill, the climb ---------------- */
  const alt = $('[data-alt]'), altV = $('[data-alt-v]'), altZ = $('[data-alt-z]');
  const thirteen = $('[data-thirteen]');
  const climb = $('[data-climb]');
  const climbSteps = climb ? $$('.climb__step', climb) : [];
  const climbFloor = climb ? $('[data-climb-floor]', climb) : null;
  const climbRent = climb ? $('[data-climb-rent]', climb) : null;
  const sky = $('.sky__clouds');
  if (sky) { const img = $('.ftr__sky img'); if (img) sky.style.backgroundImage = `url("${img.currentSrc || img.src}")`; }
  let ticking = false, lastStep = -1, moveT;
  const ZONES = [[0.06, 'STREET LEVEL'], [0.28, 'ROOFTOPS'], [0.52, 'ABOVE THE SKYLINE'], [0.78, 'NIGHT SKY'], [0.965, 'CLOUD LAYER']];
  function update() {
    ticking = false;
    const y = W.scrollY, vh = W.innerHeight, max = Math.max(1, root.scrollHeight - vh), p = clamp(y / max);
    root.style.setProperty('--alt', p.toFixed(4));
    if (alt) {
      const cloud9 = p > 0.965;
      alt.classList.toggle('is-cloud9', cloud9);
      altV.textContent = cloud9 ? 'CLOUD 9' : (Math.round(p * 900) * 10).toLocaleString('en-US');
      altZ.textContent = cloud9 ? 'YOU MADE IT' : (ZONES.find((z) => p < z[0]) || ZONES[4])[1];
    }
    if (hdr) hdr.classList.toggle('is-solid', y > 24);
    evalBar();
    if (thirteen) { const r = thirteen.getBoundingClientRect(); thirteen.style.setProperty('--fill', clamp((vh - r.top) / (vh * 0.9 + r.height * 0.4)).toFixed(3)); }
    if (climb && climbSteps.length && root.classList.contains('js') && !RM) {
      const r = climb.getBoundingClientRect(); const cp = clamp(-r.top / Math.max(1, r.height - vh));
      root.classList.toggle('in-climb', r.top < vh * 0.5 && r.bottom > vh * 0.5);
      climb.style.setProperty('--p', cp.toFixed(4));
      const idx = Math.min(climbSteps.length - 1, Math.floor(cp * climbSteps.length * 0.999));
      if (idx !== lastStep) {
        climbSteps.forEach((s, i) => { s.classList.toggle('is-on', i === idx); s.classList.toggle('is-past', i < idx); });
        lastStep = idx; if (climbFloor) climbFloor.textContent = climbSteps[idx].dataset.floor;
      }
      const month = Math.min(13, Math.max(1, Math.ceil((cp / 0.8) * 13)));
      if (climbRent) climbRent.textContent = cp > 0.86 ? 'DOORS OPEN · 2026' : `RENT PAID · MONTH ${String(month).padStart(2, '0')}`;
      climb.classList.toggle('is-top', cp > 0.86);
      climb.classList.add('is-moving'); W.clearTimeout(moveT); moveT = W.setTimeout(() => climb.classList.remove('is-moving'), 180);
    }
  }
  const onScroll = () => { if (!ticking) { ticking = true; W.requestAnimationFrame(update); } };
  W.addEventListener('scroll', onScroll, { passive: true });
  W.addEventListener('resize', onScroll, { passive: true });
  update();

  /* ---------------- pointer: proximity levitation, 3D tilt, magnetic buttons (fine pointers only) ---------------- */
  if (FINE && !RM) {
    const lifts = new Set();
    const lio = 'IntersectionObserver' in W ? new IntersectionObserver((ens) => ens.forEach((en) => (en.isIntersecting ? lifts.add(en.target) : (lifts.delete(en.target), en.target.style.removeProperty('--lift'))))) : null;
    $$('[data-lift]').forEach((el) => (lio ? lio.observe(el) : lifts.add(el)));
    let mx = -1e4, my = -1e4, ptick = false;
    const pupdate = () => {
      ptick = false;
      lifts.forEach((el) => {
        const r = el.getBoundingClientRect(); const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dist = Math.hypot(mx - cx, my - cy) - Math.min(r.width, r.height) * 0.35;
        const v = Math.max(0, 1 - dist / 260) * 12;
        el.style.setProperty('--lift', v.toFixed(2));
      });
    };
    W.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; if (!ptick) { ptick = true; W.requestAnimationFrame(pupdate); } }, { passive: true });
    $$('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--rx', `${((0.5 - y) * 9).toFixed(2)}deg`); el.style.setProperty('--ry', `${((x - 0.5) * 11).toFixed(2)}deg`);
        el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`); el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
        el.classList.add('is-tilting');
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); el.classList.remove('is-tilting'); });
    });
    $$('[data-magnet]').forEach((el) => {
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); el.style.setProperty('--mx', `${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px`); el.style.setProperty('--my', `${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px`); });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--mx', '0px'); el.style.setProperty('--my', '0px'); });
    });
  }

  /* ---------------- hero film: after load, desktop only, never with Save-Data or reduced motion ---------------- */
  const v = $('[data-hero-video]'), vbtn = $('[data-video-toggle]');
  if (v && !RM && W.matchMedia('(min-width: 761px)').matches && !(navigator.connection && navigator.connection.saveData)) {
    let userPaused = false, visible = true;
    const play = () => v.play().then(() => { v.classList.add('is-on'); if (vbtn) vbtn.hidden = false; }).catch(() => { W.addEventListener('pointerdown', () => v.play().then(() => v.classList.add('is-on')).catch(() => {}), { once: true }); });
    const start = () => W.setTimeout(() => { v.src = v.dataset.src; play(); }, 500);
    if (d.readyState === 'complete') start(); else W.addEventListener('load', start, { once: true });
    v.addEventListener('timeupdate', () => { v.classList.toggle('is-dip', !!v.duration && v.currentTime > v.duration - 0.3); });
    if ('IntersectionObserver' in W) new IntersectionObserver((en) => { visible = en[0].isIntersecting; if (!visible) v.pause(); else if (!userPaused && v.src) v.play().catch(() => {}); }).observe(v);
    if (vbtn) vbtn.addEventListener('click', () => {
      userPaused = !v.paused ? true : false;
      if (v.paused) { v.play().catch(() => {}); vbtn.setAttribute('aria-label', 'Pause background video'); vbtn.innerHTML = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M8 5v14M16 5v14"/></svg>'; }
      else { v.pause(); vbtn.setAttribute('aria-label', 'Play background video'); vbtn.innerHTML = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M8 5v14l11-7z"/></svg>'; }
    });
  }

  /* ---------------- Learn hub filter ---------------- */
  const chips = $('[data-chips]');
  if (chips) chips.addEventListener('click', (e) => {
    const b = e.target.closest('[data-chip]'); if (!b) return;
    $$('[data-chip]', chips).forEach((c) => { const on = c === b; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', String(on)); });
    let n = 0; const cat = b.dataset.chip;
    $$('[data-hub] .hub__item').forEach((li) => { const show = cat === '*' || li.dataset.cat === cat; li.hidden = !show; if (show) { n++; li.classList.add('is-in'); } });
    const none = $('[data-hub-none]'); if (none) none.hidden = n > 0;
  });

  /* ---------------- education floors: the floor you are on is lit in the side nav ---------------- */
  const fnav = $$('.floors__nav a');
  if (fnav.length && 'IntersectionObserver' in W) {
    const fio = new IntersectionObserver((ens) => ens.forEach((en) => { if (en.isIntersecting) fnav.forEach((a) => a.classList.toggle('is-here', a.getAttribute('href') === `#${en.target.id}`)); }), { rootMargin: '-40% 0px -55% 0px' });
    $$('.floor[id]').forEach((f) => fio.observe(f));
  }

  /* ---------------- lightbox (keeps the live site's click-to-enlarge) ---------------- */
  const lb = $('[data-lb]');
  if (lb && typeof lb.showModal === 'function') {
    const lbImg = $('[data-lb-img]', lb), lbCap = $('[data-lb-cap]', lb);
    d.addEventListener('click', (e) => {
      const b = e.target.closest('[data-lb-open]'); if (!b) return;
      const im = $('img', b); lbImg.src = b.dataset.src; lbImg.alt = im ? im.alt : ''; lbCap.textContent = b.dataset.cap || '';
      lb.showModal();
    });
    $('[data-lb-close]', lb).addEventListener('click', () => lb.close());
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  }

  /* ---------------- preview forms never post ---------------- */
  $$('[data-preview-form]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault(); const n = $('[data-form-note]', f); if (n) { n.textContent = 'Preview build: form submissions are disabled. Nothing was sent.'; n.style.color = 'var(--gold)'; }
  }));
})();
