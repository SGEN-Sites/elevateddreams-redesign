// skyline.mjs: a deterministic, hand-tuned night skyline drawn as SVG (brick blocks, church steeples, rooftop water
// towers, chimneys, lit windows). An illustration, not a map of any real street. Used by the altitude stage and the
// hero's mirrored reflection.
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

export function skyline({ seed = 7, w = 1600, h = 420, base = 420, windows = true, id = 'sk' } = {}) {
  const r = rng(seed);
  const parts = []; const lit = [];
  let x = -10;
  while (x < w + 10) {
    const bw = 46 + Math.floor(r() * 120);
    const tall = r();
    const bh = tall > 0.9 ? 230 + r() * 120 : 90 + r() * 150;
    const top = base - bh;
    parts.push(`<rect x="${x}" y="${top.toFixed(1)}" width="${bw}" height="${bh.toFixed(1)}"/>`);
    // cornice
    parts.push(`<rect x="${x - 3}" y="${(top - 6).toFixed(1)}" width="${bw + 6}" height="7"/>`);
    const feat = r();
    if (feat > 0.86 && bw > 60) { // steeple
      const cx = x + bw / 2; const sw = 18 + r() * 10; const sh = 70 + r() * 90;
      parts.push(`<rect x="${(cx - sw / 2).toFixed(1)}" y="${(top - 40).toFixed(1)}" width="${sw.toFixed(1)}" height="40"/>`);
      parts.push(`<path d="M${(cx - sw / 2 - 2).toFixed(1)} ${(top - 40).toFixed(1)} L${cx.toFixed(1)} ${(top - 40 - sh).toFixed(1)} L${(cx + sw / 2 + 2).toFixed(1)} ${(top - 40).toFixed(1)}Z"/>`);
    } else if (feat > 0.68) { // water tower
      const tx = x + 10 + r() * Math.max(4, bw - 50); const tw = 26 + r() * 10; const legs = 16 + r() * 10; const th = 24 + r() * 8;
      const ty = top - legs - th;
      parts.push(`<path d="M${tx.toFixed(1)} ${(ty + 4).toFixed(1)} h${tw.toFixed(1)} v${th.toFixed(1)} h-${tw.toFixed(1)}Z M${(tx - 3).toFixed(1)} ${(ty + 4).toFixed(1)} L${(tx + tw / 2).toFixed(1)} ${(ty - 10).toFixed(1)} L${(tx + tw + 3).toFixed(1)} ${(ty + 4).toFixed(1)}Z"/>`);
      parts.push(`<path d="M${(tx + 3).toFixed(1)} ${(ty + 4 + th).toFixed(1)} l-2 ${legs.toFixed(1)} h3 l2 -${legs.toFixed(1)}Z M${(tx + tw - 3).toFixed(1)} ${(ty + 4 + th).toFixed(1)} l2 ${legs.toFixed(1)} h-3 l-2 -${legs.toFixed(1)}Z M${(tx + tw / 2 - 1).toFixed(1)} ${(ty + 4 + th).toFixed(1)} h2 v${legs.toFixed(1)} h-2Z"/>`);
    } else if (feat > 0.5) { // chimneys
      const n = 1 + Math.floor(r() * 3);
      for (let i = 0; i < n; i++) parts.push(`<rect x="${(x + 8 + r() * (bw - 20)).toFixed(1)}" y="${(top - 14 - r() * 10).toFixed(1)}" width="${(6 + r() * 6).toFixed(1)}" height="22"/>`);
    }
    if (windows) {
      const cols = Math.max(1, Math.floor((bw - 12) / 16)); const rows = Math.max(1, Math.floor((bh - 26) / 22));
      for (let c = 0; c < cols; c++) for (let rr = 0; rr < rows; rr++) {
        const v = r();
        if (v > 0.84) {
          const wx = x + 8 + c * 16; const wy = top + 14 + rr * 22;
          const warm = r() > 0.35;
          lit.push(`<rect class="${warm ? 'w1' : 'w2'}" x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="7" height="10" style="--wd:${(r() * 6).toFixed(2)}s"/>`);
        }
      }
    }
    x += bw + (r() > 0.7 ? 4 + r() * 10 : 0);
  }
  return `<svg class="skyline" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false"><g class="skyline__mass">${parts.join('')}</g><g class="skyline__lit">${lit.join('')}</g></svg>`;
}

// An impossible staircase (Penrose), drawn isometrically: four flights that climb forever and arrive where they began.
export function penrose() {
  // isometric helper
  const iso = (x, y, z) => [((x - y) * 0.866 * 22).toFixed(1), ((x + y) * 0.5 * 22 - z * 22).toFixed(1)];
  const steps = [];
  // walk a square loop of 4 flights; each step rises 0.25 except the last flight which "rises" back to the start
  const path = [];
  let x = 0, y = 0, z = 0;
  const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  // flights of 6, 6, 2, 2 steps: the walk ends 4 steps further on in x and y and 4 storeys higher, which the
  // isometric projection lands exactly on the first step, so the stair climbs forever and arrives where it began.
  const lens = [6, 6, 2, 2];
  let k = 0;
  dirs.forEach((d, i) => {
    for (let s = 0; s < lens[i]; s++) {
      path.push([x, y, z, i, k++]);
      x += d[0]; y += d[1]; z += 0.25;
    }
  });
  path.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]) || a[2] - b[2]);
  for (const [px, py, pz, i, n] of path) {
    const t = [iso(px, py, pz + 1), iso(px + 1, py, pz + 1), iso(px + 1, py + 1, pz + 1), iso(px, py + 1, pz + 1)];
    const fl = [iso(px, py + 1, pz + 1), iso(px + 1, py + 1, pz + 1), iso(px + 1, py + 1, pz + 0.2), iso(px, py + 1, pz + 0.2)];
    const fr = [iso(px + 1, py, pz + 1), iso(px + 1, py + 1, pz + 1), iso(px + 1, py + 1, pz + 0.2), iso(px + 1, py, pz + 0.2)];
    steps.push(`<g class="pr-step" style="--n:${n}"><path class="pr-top" d="M${t.map((p) => p.join(' ')).join(' L')}Z"/><path class="pr-l" d="M${fl.map((p) => p.join(' ')).join(' L')}Z"/><path class="pr-r" d="M${fr.map((p) => p.join(' ')).join(' L')}Z"/></g>`);
  }
  return `<svg class="penrose" viewBox="-170 -120 340 300" aria-hidden="true" focusable="false">${steps.join('')}</svg>`;
}
