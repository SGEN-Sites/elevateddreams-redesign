// fal.mjs: one-shot fal queue runner for this build's imagery (stills -> optional BiRefNet cut-out -> optional video).
//   FAL_KEY=... node tools/gen/fal.mjs <jobs.json> <outDir> [--only id,id] [--video]
// One POST per job (no retries of our own), poll until COMPLETED, download every output, write a sidecar JSON
// (model, prompt, request id, source urls). A job whose output file exists is skipped, so a rerun never re-spends.
// The key is read from the environment only and is never written to disk by this script.
import fs from 'node:fs';
import path from 'node:path';

const KEY = process.env.FAL_KEY;
if (!KEY) { console.error('FAL_KEY missing'); process.exit(2); }
const [jobsFile, outDir] = process.argv.slice(2);
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').replace('--only=', '').split(',').filter(Boolean);
const wantVideo = process.argv.includes('--video');
fs.mkdirSync(outDir, { recursive: true });
const spec = JSON.parse(fs.readFileSync(jobsFile, 'utf8'));
const H = { Authorization: `Key ${KEY}`, 'content-type': 'application/json' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run(model, input, label) {
  const sub = await fetch(`https://queue.fal.run/${model}`, { method: 'POST', headers: H, body: JSON.stringify(input) });
  const sj = await sub.json().catch(() => ({}));
  if (!sub.ok || !sj.request_id) throw new Error(`${label}: submit ${sub.status} ${JSON.stringify(sj).slice(0, 300)}`);
  const { request_id: rid, status_url: su, response_url: ru } = sj;
  fs.writeFileSync(path.join(outDir, `${label}.pending.json`), JSON.stringify({ model, rid, su, ru, at: new Date().toISOString() }));
  const t0 = Date.now();
  for (;;) {
    await sleep(model.includes('video') ? 6000 : 2000);
    const st = await fetch(su, { headers: H }).then((r) => r.json()).catch(() => ({}));
    if (st.status === 'COMPLETED') break;
    if (Date.now() - t0 > 20 * 60 * 1000) throw new Error(`${label}: timeout waiting ${rid}`);
  }
  const res = await fetch(ru, { headers: H });
  const rj = await res.json();
  if (!res.ok) throw new Error(`${label}: result ${res.status} ${JSON.stringify(rj).slice(0, 300)}`);
  fs.rmSync(path.join(outDir, `${label}.pending.json`), { force: true });
  return { rid, rj };
}
async function download(url, file) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download ${r.status} ${url}`);
  fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
  return fs.statSync(file).size;
}

const style = spec.styles || {};
const jobs = spec.jobs.filter((j) => !only.length || only.includes(j.id)).filter((j) => (j.kind === 'video') === wantVideo);
let spent = 0;
async function doJob(j) {
  const ext = j.kind === 'video' ? 'mp4' : 'jpg';
  const out = path.join(outDir, `${j.id}.${ext}`);
  if (fs.existsSync(out)) { console.log('skip (exists)', j.id); return; }
  const side = { id: j.id, kind: j.kind, at: new Date().toISOString() };
  if (j.kind === 'video') {
    const src = JSON.parse(fs.readFileSync(path.join(outDir, `${j.from}.json`), 'utf8'));
    const input = { prompt: j.prompt, image_url: src.url, tail_image_url: j.loop ? src.url : undefined, duration: String(j.duration || 5), negative_prompt: j.negative || 'people, person, hands, text, letters, logo, watermark, camera shake, fast motion, cuts, blur, distortion', cfg_scale: 0.5 };
    const { rid, rj } = await run(j.model, input, j.id);
    side.model = j.model; side.rid = rid; side.input = { ...input }; side.url = rj.video?.url;
    side.bytes = await download(rj.video.url, out);
    spent += 0.07 * Number(j.duration || 5);
  } else {
    const prompt = [j.prompt, style[j.style] || ''].join(' ').trim();
    const input = { prompt, aspect_ratio: j.aspect || '16:9', output_format: 'jpeg', num_images: 1, raw: !!j.raw, safety_tolerance: '2', enable_safety_checker: true };
    const { rid, rj } = await run(j.model || 'fal-ai/flux-pro/v1.1-ultra', input, j.id);
    const img = rj.images?.[0];
    side.model = j.model || 'fal-ai/flux-pro/v1.1-ultra'; side.rid = rid; side.prompt = prompt; side.aspect = input.aspect_ratio; side.url = img.url; side.w = img.width; side.h = img.height; side.seed = rj.seed;
    side.bytes = await download(img.url, out);
    spent += 0.06;
    if (j.cutout) {
      const { rid: crid, rj: cj } = await run('fal-ai/birefnet/v2', { image_url: img.url, model: 'General Use (Heavy)', operating_resolution: '2048x2048', output_format: 'png', refine_foreground: true }, `${j.id}-cut`);
      side.cutout = { model: 'fal-ai/birefnet/v2', rid: crid, url: cj.image.url };
      side.cutout.bytes = await download(cj.image.url, path.join(outDir, `${j.id}-cut.png`));
      spent += 0.01;
    }
  }
  fs.writeFileSync(path.join(outDir, `${j.id}.json`), JSON.stringify(side, null, 1));
  console.log('done', j.id, side.w ? `${side.w}x${side.h}` : '', side.bytes, side.rid);
}
// concurrency 4
const queue = [...jobs];
const workers = Array.from({ length: Math.min(4, queue.length) }, async () => {
  while (queue.length) {
    const j = queue.shift();
    try { await doJob(j); } catch (e) { console.log('FAIL', j.id, e.message); fs.appendFileSync(path.join(outDir, '_failures.log'), `${new Date().toISOString()} ${j.id} ${e.message}\n`); }
  }
});
await Promise.all(workers);
console.log(`list-price estimate this run: $${spent.toFixed(2)}`);
