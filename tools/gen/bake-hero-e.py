#!/usr/bin/env python3
"""bake-hero-e.py: pre-grade the hero's cloud plate so no colour filter runs in the browser, and cut soft cloud puffs.
The grades are the exact CSS filter chains Hero E used (same matrices as the CSS filter spec, applied in sRGB, in order).
Writes src/assets/img/gen/hero-{plate,sky}-{dusk,night}-{1600,960}.webp + cloud-{a,b,c}.webp, and their entries in
src/content/images.json. Run from the project root: python3 tools/gen/bake-hero-e.py"""
import json, math, os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
GEN = 'src/assets/img/gen'; MAN = 'src/content/images.json'
def hue(d):
    a = math.radians(d); c, s = math.cos(a), math.sin(a)
    return np.array([[.213 + c * .787 - s * .213, .715 - c * .715 - s * .715, .072 - c * .072 + s * .928],
                     [.213 - c * .213 + s * .143, .715 + c * .285 + s * .140, .072 - c * .072 - s * .283],
                     [.213 - c * .213 - s * .787, .715 - c * .715 + s * .715, .072 + c * .928 + s * .072]])
def sat(v): return np.array([[.213 + .787 * v, .715 - .715 * v, .072 - .072 * v], [.213 - .213 * v, .715 + .285 * v, .072 - .072 * v], [.213 - .213 * v, .715 - .715 * v, .072 + .928 * v]])
def sepia(v):
    k = 1 - v
    return np.array([[.393 + .607 * k, .769 - .769 * k, .189 - .189 * k], [.349 - .349 * k, .686 + .314 * k, .168 - .168 * k], [.272 - .272 * k, .534 - .534 * k, .131 + .869 * k]])
def grade(rgb, chain):
    x = rgb
    for op, v in chain:
        if op == 'hue': x = x @ hue(v).T
        elif op == 'sat': x = x @ sat(v).T
        elif op == 'sepia': x = x @ sepia(v).T
        elif op == 'bri': x = x * v
        elif op == 'con': x = (x - .5) * v + .5
        x = np.clip(x, 0, 1)
    return x
G = {'plate-dusk': [('hue', -42), ('sat', .8), ('bri', .62), ('con', 1.05)], 'plate-night': [('sepia', .5), ('hue', 230), ('sat', 1.15), ('bri', .5), ('con', 1.1)],
     'sky-dusk': [('hue', -42), ('sat', .8), ('bri', .74), ('con', .96)], 'sky-night': [('sepia', .5), ('hue', 230), ('sat', 1.1), ('bri', .56), ('con', 1)]}
src = Image.open(f'{GEN}/hero-plate-b-2400.webp').convert('RGB'); man = json.load(open(MAN))
for name, chain in G.items():
    vs = []
    for w in (1600, 960):
        h = round(src.height * w / src.width); im = src.resize((w, h), Image.LANCZOS)
        out = grade(np.asarray(im).astype(np.float32) / 255, chain); f = f'hero-{name}-{w}.webp'
        Image.fromarray((out * 255 + .5).astype('uint8')).save(f'{GEN}/{f}', 'WEBP', quality=80, method=6)
        vs.append({'w': w, 'h': h, 'src': f'img/gen/{f}', 'bytes': os.path.getsize(f'{GEN}/{f}')})
    man[f'hero-{name}'] = {'variants': vs, 'w': vs[0]['w'], 'h': vs[0]['h'], 'ai': True, 'edited': True}; print(name, [v['bytes'] for v in vs])
# cloud banks for the sign cards: the plate's real cloud texture under a billowing top edge, tapering at both ends and fading at the base
W, H = src.size; rgb = np.asarray(src).astype(np.float32) / 255; lum = rgb @ np.array([.2126, .7152, .0722])
def cumulus(w, h, seed):
    """a cloud silhouette: a union of soft round puffs, tallest in the middle, on a flat body"""
    r = np.random.default_rng(seed); m = Image.new('L', (w, h), 0); d = ImageDraw.Draw(m); base = .72 * h
    for _ in range(34):
        t = r.uniform(.05, .95); env = math.sin(math.pi * t) ** .75; R = (.03 + .075 * env * r.uniform(.55, 1.2)) * w; cx = t * w; cy = base - r.uniform(0, .34) * h * env
        d.ellipse((cx - R, cy - R * .88, cx + R, cy + R * .88), fill=255)
    d.ellipse((.03 * w, base - .1 * h, .97 * w, h * 1.5), fill=255)
    return np.asarray(m.filter(ImageFilter.GaussianBlur(w * .0065))).astype(np.float32) / 255
for name, (x0f, x1f, seed) in {'cloud-a': (.02, .52, 3), 'cloud-b': (.48, .98, 11), 'cloud-c': (.22, .78, 23)}.items():
    x0, x1, y0, y1 = int(x0f * W), int(x1f * W), int(.60 * H), H; c = rgb[y0:y1, x0:x1]; h, w = c.shape[:2]; yy, xx = np.mgrid[0:h, 0:w]
    a = cumulus(w, h, seed); fade = np.clip((h - yy) / (h * .26), 0, 1); side = np.clip(np.minimum(xx, w - 1 - xx) / (w * .08), 0, 1); a = a * (fade * fade * (3 - 2 * fade)) * (side * side * (3 - 2 * side))
    t = c * .74 + np.array([.94, .86, .91]) * .26; im = Image.fromarray((np.dstack([np.clip(t, 0, 1), a]) * 255 + .5).astype('uint8'), 'RGBA').resize((1200, round(1200 * h / w)), Image.LANCZOS); f = f'{name}.webp'; im.save(f'{GEN}/{f}', 'WEBP', quality=78, alpha_quality=82, method=6); print(name, im.size, os.path.getsize(f'{GEN}/{f}'))
json.dump(man, open(MAN, 'w'), indent=1); open(MAN, 'a').write('\n')
