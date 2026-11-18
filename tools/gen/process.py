"""process.py: finish the imagery for the build (run with python3 -I from the project root).
- generated objects: keep only the object (largest alpha component: drops detached smoke wisps), trim, cap 900 px, WebP+alpha
- generated scenes: WebP at 2400 / 1400 / 800 px wide (the tall hero at 1080 / 720)
- live client photos and article images: WebP at native size, pixels untouched apart from encoding
- hero loop: H.264 1600x890 CRF 25, no audio, faststart; poster WebP
- HOPEline QR as SVG
Writes src/assets/img/{gen,live,learn}/ and src/assets/video/, plus src/content/images.json (w/h per id)."""
import json, os, subprocess, sys
from PIL import Image

ROOT = os.getcwd()
GEN, LIVE = 'private/gen', 'private/live'
OUT = 'src/assets/img'
for d in ('gen', 'live', 'learn'): os.makedirs(f'{OUT}/{d}', exist_ok=True)
os.makedirs('src/assets/video', exist_ok=True)
manifest = {}

def save_webp(im, path, q=80):
    im.save(path, 'WEBP', quality=q, method=6)
    return os.path.getsize(path)

def largest_component(alpha):
    small = alpha.resize((256, 256), Image.BILINEAR)
    px = small.load(); W, H = small.size
    seen = [[False] * H for _ in range(W)]; best = []
    for x in range(W):
        for y in range(H):
            if px[x, y] > 40 and not seen[x][y]:
                stack = [(x, y)]; seen[x][y] = True; comp = []
                while stack:
                    cx, cy = stack.pop(); comp.append((cx, cy))
                    for nx, ny in ((cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)):
                        if 0 <= nx < W and 0 <= ny < H and not seen[nx][ny] and px[nx, ny] > 40:
                            seen[nx][ny] = True; stack.append((nx, ny))
                if len(comp) > len(best): best = comp
    keep = Image.new('L', (W, H), 0); kp = keep.load()
    for (x, y) in best:
        for dx in (-2, -1, 0, 1, 2):
            for dy in (-2, -1, 0, 1, 2):
                if 0 <= x+dx < W and 0 <= y+dy < H: kp[x+dx, y+dy] = 255
    keep = keep.resize(alpha.size, Image.BILINEAR).point(lambda v: 255 if v > 90 else 0)
    from PIL import ImageChops
    return ImageChops.multiply(alpha, keep)

# obj-preroll is no longer generated: since round 4 the tile uses a real product photo (docs/PITCH-NOTES.md)
manifest['obj-preroll'] = {'src': 'img/product/preroll.webp', 'w': 548, 'h': 554, 'bytes': 23870}
for name in ['obj-flower', 'obj-edibles', 'obj-vape', 'obj-concentrate', 'obj-cbd', 'obj-accessory']:
    im = Image.open(f'{GEN}/{name}-cut.png').convert('RGBA')
    a = largest_component(im.getchannel('A'))
    im.putalpha(a)
    bbox = a.getbbox(); pad = 24
    bbox = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(im.width, bbox[2]+pad), min(im.height, bbox[3]+pad))
    im = im.crop(bbox)
    im.thumbnail((900, 900), Image.LANCZOS)
    size = save_webp(im, f'{OUT}/gen/{name}.webp', 82)
    manifest[name] = {'src': f'img/gen/{name}.webp', 'w': im.width, 'h': im.height, 'ai': True, 'bytes': size}

scenes = {'scene-hero-river': (2400, 1400, 800), 'scene-rooftops': (2400, 1400, 800), 'scene-sky': (2400, 1400, 800),
          'scene-fire-escape': (1200, 800), 'scene-hero-river-tall': (1080, 720)}
for name, widths in scenes.items():
    im = Image.open(f'{GEN}/{name}.jpg').convert('RGB')
    vs = []
    for w in widths:
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        p = f'{OUT}/gen/{name}-{w}.webp'; save_webp(r, p, 74 if w >= 1400 else 70)
        vs.append({'w': w, 'h': r.height, 'src': f'img/gen/{name}-{w}.webp'})
    manifest[name] = {'variants': vs, 'w': vs[0]['w'], 'h': vs[0]['h'], 'ai': True}

live = {
    'live-exterior-wide': '01-elevated-dreams-exterior-wide-CrhWBN-P.png', 'live-interior-display': '02-elevated-dreams-interior-display-WTu2qFfK.png',
    'live-window-area': '03-elevated-dreams-window-area-CD9I2c-H.png', 'live-exterior-close': '04-elevated-dreams-exterior-close-BKQ2P11H.png',
    'live-showroom-wide': '05-elevated-dreams-showroom-wide-DS8-sV6Y.png', 'live-reception': '06-elevated-dreams-reception-showroom-BB5bIdYF.png',
    'live-montage': '00-elevated-dreams-complete-montage-s28GJpne.png',
}
for name, f in live.items():
    im = Image.open(f'{LIVE}/assets__{f}').convert('RGB')
    size = save_webp(im, f'{OUT}/live/{name}.webp', 84)
    manifest[name] = {'src': f'img/live/{name}.webp', 'w': im.width, 'h': im.height, 'bytes': size}

arts = json.load(open('audit/api/api_articles.json'))
for a in arts:
    u = a['featuredImageUrl']; fn = u.replace('/', '__').lstrip('_')
    p = f'{LIVE}/{fn}'
    if not os.path.exists(p): p = f'{LIVE}/' + u.lstrip('/').replace('/', '__')
    im = Image.open(p).convert('RGB')
    out = f"{OUT}/learn/{a['slug']}.webp"; size = save_webp(im, out, 84)
    manifest['learn-' + a['slug']] = {'src': f"img/learn/{a['slug']}.webp", 'w': im.width, 'h': im.height, 'bytes': size}

# hero loop video + poster
import imageio_ffmpeg
FF = imageio_ffmpeg.get_ffmpeg_exe()
subprocess.run([FF, '-hide_banner', '-loglevel', 'error', '-y', '-i', f'{GEN}/video-hero-river.mp4', '-an', '-vf', 'scale=1600:-2,fps=24',
                '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-crf', '25', '-preset', 'slow', '-movflags', '+faststart',
                'src/assets/video/hero-river.mp4'], check=True)
subprocess.run([FF, '-hide_banner', '-loglevel', 'error', '-y', '-i', f'{GEN}/video-hero-river.mp4', '-frames:v', '1', '-vf', 'scale=1600:-2',
                f'{GEN}/_poster.png'], check=True)
pim = Image.open(f'{GEN}/_poster.png').convert('RGB'); save_webp(pim, 'src/assets/video/hero-river-poster.webp', 72)
manifest['video-hero-river'] = {'src': 'video/hero-river.mp4', 'poster': 'video/hero-river-poster.webp', 'w': pim.width, 'h': pim.height,
                                'bytes': os.path.getsize('src/assets/video/hero-river.mp4'), 'ai': True}

# HOPEline QR (the live footer carried one)
import qrcode, qrcode.image.svg
qr = qrcode.QRCode(border=1, box_size=10, error_correction=qrcode.constants.ERROR_CORRECT_M)
qr.add_data('https://oasas.ny.gov/hopeline'); qr.make(fit=True)
img = qr.make_image(image_factory=qrcode.image.svg.SvgPathImage)
img.save('src/assets/img/hopeline-qr.svg')

json.dump(manifest, open('src/content/images.json', 'w'), indent=1)
for k, v in manifest.items(): print(k, v.get('w'), v.get('h'), v.get('bytes', ''))
