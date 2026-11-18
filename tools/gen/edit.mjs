// edit.mjs: image-edit jobs on fal (Nano Banana Pro edit, BiRefNet cut-outs) for the hero round.
//   FAL_KEY=... node tools/gen/edit.mjs <jobs.json> <outDir> [--only=id,id]
// Each job: { id, model, prompt, image (local path | "@<jobId>" = an earlier job's output), aspect, resolution }.
// One POST per job, poll, download, sidecar JSON with model, prompt, request id. Existing outputs are skipped.
import fs from 'node:fs';
import path from 'node:path';

const KEY = process.env.FAL_KEY;
if (!KEY) { console.error('FAL_KEY missing'); process.exit(2); }
const [jobsFile, outDir] = process.argv.slice(2);
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').replace('--only=', '').split(',').filter(Boolean);
fs.mkdirSync(outDir, { recursive: true });
const H = { Authorization: `Key ${KEY}`, 'content-type': 'application/json' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const jobs = JSON.parse(fs.readFileSync(jobsFile, 'utf8')).jobs.filter((j) => !only.length || only.includes(j.id));

function imageRef(ref) {
  if (ref.startsWith('@')) { const side = JSON.parse(fs.readFileSync(path.join(outDir, ref.slice(1) + '.json'), 'utf8')); return side.url; }
  const buf = fs.readFileSync(ref); const ext = path.extname(ref).slice(1).replace('jpg', 'jpeg');
  return `data:image/${ext};base64,${buf.toString('base64')}`;
}
async function run(model, input, label) {
  const sub = await fetch(`https://queue.fal.run/${model}`, { method: 'POST', headers: H, body: JSON.stringify(input) });
  const sj = await sub.json().catch(() => ({}));
  if (!sub.ok || !sj.request_id) throw new Error(`${label}: submit ${sub.status} ${JSON.stringify(sj).slice(0, 400)}`);
  const t0 = Date.now();
  for (;;) {
    await sleep(2500);
    const st = await fetch(sj.status_url, { headers: H }).then((r) => r.json()).catch(() => ({}));
    if (st.status === 'COMPLETED') break;
    if (Date.now() - t0 > 12 * 60 * 1000) throw new Error(`${label}: timeout ${sj.request_id}`);
  }
  const res = await fetch(sj.response_url, { headers: H }); const rj = await res.json();
  if (!res.ok) throw new Error(`${label}: result ${res.status} ${JSON.stringify(rj).slice(0, 400)}`);
  return { rid: sj.request_id, rj };
}
async function doJob(j) {
  const ext = j.model.includes('birefnet') ? 'png' : 'png';
  const out = path.join(outDir, `${j.id}.${ext}`);
  if (fs.existsSync(out)) { console.log('skip', j.id); return; }
  let input;
  if (j.model.includes('birefnet')) input = { image_url: imageRef(j.image), model: 'General Use (Heavy)', operating_resolution: '2048x2048', output_format: 'png', refine_foreground: true };
  else input = { prompt: j.prompt, image_urls: [imageRef(j.image)], aspect_ratio: j.aspect || 'auto', resolution: j.resolution || '2K', output_format: 'png', num_images: 1, safety_tolerance: '4' };
  const { rid, rj } = await run(j.model, input, j.id);
  const img = rj.images ? rj.images[0] : rj.image;
  const buf = Buffer.from(await (await fetch(img.url)).arrayBuffer());
  fs.writeFileSync(out, buf);
  fs.writeFileSync(path.join(outDir, `${j.id}.json`), JSON.stringify({ id: j.id, model: j.model, rid, prompt: j.prompt, source: j.image, url: img.url, w: img.width, h: img.height, description: rj.description || '', at: new Date().toISOString() }, null, 1));
  console.log('done', j.id, img.width + 'x' + img.height, buf.length, rid);
}
// jobs that depend on an earlier output run after it; independent ones run together
const ready = (j) => !j.image.startsWith('@') || fs.existsSync(path.join(outDir, j.image.slice(1) + '.json'));
let pending = [...jobs];
while (pending.length) {
  const batch = pending.filter(ready);
  if (!batch.length) { console.log('unmet dependencies:', pending.map((j) => j.id).join(', ')); break; }
  pending = pending.filter((j) => !batch.includes(j));
  await Promise.all(batch.map((j) => doJob(j).catch((e) => { console.log('FAIL', j.id, e.message); fs.appendFileSync(path.join(outDir, '_failures.log'), `${new Date().toISOString()} ${j.id} ${e.message}\n`); })));
}
