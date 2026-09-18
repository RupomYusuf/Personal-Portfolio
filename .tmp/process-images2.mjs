import sharp from 'sharp';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const slugById = {
  '92647753':'rose-lady','93030165':'this-city-is-ours','84310691':'leafiesta-logo',
  '93477463':'red-girl','93320553':'bad-boy','92990361':'zews-logo','92945525':'swag-lady',
  '92596511':'foxer-logo','92564355':'flower-with-a-girl','90162823':'sparrow',
  '90079489':'midnight-owl','90076887':'depict-joker','99226929':'online-store-flyer',
  '99288165':'pizza-flyer','99196711':'food-flyer','99196501':'corporate-design',
  '101219605':'birthday-invitation-card','99197713':'fashion-flyer','99197391':'quarantine-flyer',
  '94090205':'christmas-sale','101096205':'restaurant-flyer','101096379':'event-flyer',
  '101096607':'sale-flyer'
};

for (const id of Object.keys(slugById)) {
  const slug = slugById[id];
  const dir = path.join('.tmp/imgs', id);
  const outDir = path.join('src/assets/projects', slug);
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  // collect unique images in order (hi-1..N = cover then modules)
  const files = fs.readdirSync(dir).filter(f => f.startsWith('hi-')).sort();
  const uniq = [];
  const seen = new Set();
  for (const f of files) {
    const buf = fs.readFileSync(path.join(dir, f));
    const h = crypto.createHash('md5').update(buf).digest('hex');
    if (seen.has(h)) continue;
    seen.add(h);
    const m = await sharp(buf).metadata();
    if (!m.width || !m.height) continue;
    uniq.push({ f, buf, w: m.width, h: m.height });
  }
  if (!uniq.length) { console.log('EMPTY', slug); continue; }

  // cover: from first (Behance cover crop)
  await sharp(uniq[0].buf).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 85 })
    .toFile(path.join(outDir, 'cover.jpg'));

  // details: prefer unique non-cover images; if only the cover art exists, use it
  let details = uniq.slice(1);
  if (!details.length) details = uniq.slice(0, 1);
  let n = 0; const info = [];
  for (const d of details) {
    if (n >= 3) break;
    n++;
    let pipe = sharp(d.buf);
    if (d.w > 1920) pipe = pipe.resize({ width: 1920, withoutEnlargement: true });
    await pipe.jpeg({ quality: 88 }).toFile(path.join(outDir, `detail-${String(n).padStart(2, '0')}.jpg`));
    info.push(`${d.f} ${d.w}x${d.h}`);
  }
  console.log(slug, '| details:', n, '|', info.join(' ; '));
}
console.log('DONE');
