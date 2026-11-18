"""process-hero.py: web sizes for the round-3 hero images (golden-hour storefront, owner-directed edit of the real
storefront photo). Run from the project root: python3 tools/gen/process-hero.py
Writes src/assets/img/gen/hero-*.webp and merges entries into src/content/images.json (ai: 'edited')."""
import json, os
from PIL import Image

SRC = 'private/gen/hero'; OUT = 'src/assets/img/gen'
man = json.load(open('src/content/images.json'))
def webp(im, path, q): im.save(path, 'WEBP', quality=q, method=6); return os.path.getsize(path)
jobs = {
    'hero-golden-b': ('golden-wide-b.png', (2400, 1600, 960)),
    'hero-golden-a': ('golden-wide-a.png', (2400, 1600, 960)),
    'hero-golden-tall': ('golden-tall.png', (1080, 720)),
    'hero-night-b': ('night-wide-b.png', (2400, 1600, 960)),
    'hero-plate-b': ('plate-wide-b.png', (2400, 1600, 960)),
}
for name, (f, widths) in jobs.items():
    p = os.path.join(SRC, f)
    if not os.path.exists(p): print('missing', f); continue
    im = Image.open(p).convert('RGB'); vs = []
    for w in widths:
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        out = f'{OUT}/{name}-{w}.webp'; size = webp(r, out, 78 if w >= 1600 else 74)
        vs.append({'w': w, 'h': r.height, 'src': f'img/gen/{name}-{w}.webp', 'bytes': size})
    man[name] = {'variants': vs, 'w': vs[0]['w'], 'h': vs[0]['h'], 'ai': True, 'edited': True}
    print(name, [(v['w'], v['bytes']) for v in vs])
# the floating building: BiRefNet cut-out of golden-wide-b, trimmed, alpha kept
cp = os.path.join(SRC, 'cut-wide-b.png')
if os.path.exists(cp):
    im = Image.open(cp).convert('RGBA'); bbox = im.getchannel('A').point(lambda v: 255 if v > 24 else 0).getbbox()
    im = im.crop(bbox); full_w = Image.open(os.path.join(SRC, 'golden-wide-b.png')).width
    # remember where the building sat in the frame so layouts can place it exactly over the plate
    man['hero-building-b-box'] = {'x': bbox[0] / full_w, 'y': bbox[1] / 1536, 'w': (bbox[2] - bbox[0]) / full_w, 'h': (bbox[3] - bbox[1]) / 1536}
    vs = []
    for w in (1400, 900):
        if im.width < w: w = im.width
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        out = f'{OUT}/hero-building-b-{w}.webp'; size = webp(r, out, 84)
        vs.append({'w': w, 'h': r.height, 'src': f'img/gen/hero-building-b-{w}.webp', 'bytes': size})
    man['hero-building-b'] = {'variants': vs, 'w': vs[0]['w'], 'h': vs[0]['h'], 'ai': True, 'edited': True}
    print('hero-building-b', [(v['w'], v['bytes']) for v in vs], man['hero-building-b-box'])
json.dump(man, open('src/content/images.json', 'w'), indent=1)
