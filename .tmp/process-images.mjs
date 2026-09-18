import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const metaDir = '.tmp/meta';
const imgDir = '.tmp/imgs';
const outBase = 'src/assets/projects';

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

for (const f of fs.readdirSync(metaDir)) {
  const id = f.replace('.json','');
  const slug = slugById[id];
  if (!slug) { console.log('NO SLUG', id); continue; }
  const files = fs.readdirSync(path.join(imgDir, id)).filter(x => x.startsWith('img-'));
  const outDir = path.join(outBase, slug);
  fs.mkdirSync(outDir, { recursive: true });

  // img-1 is the Behance cover crop; use it as cover source, fallback to first wide module
  const coverSrc = path.join(imgDir, id, files[0]);
  let mi = null;
  try { mi = await sharp(coverSrc).metadata(); } catch (e) { console.log('BAD COVER', id, files[0], e.message); continue; }
  await sharp(coverSrc).resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85 }).toFile(path.join(outDir, 'cover.jpg'));

  // details: all files except img-1 (cover), in order; if only 2 files total, img-1 is also a designed piece -> use it too
  let detailFiles = files.slice(1);
  if (files.length <= 2) detailFiles = files; // include cover art as a detail too
  let n = 0;
  const dims = [];
  for (const df of detailFiles) {
    const src = path.join(imgDir, id, df);
    let m;
    try { m = await sharp(src).metadata(); } catch (e) { console.log('BAD', id, df, e.message); continue; }
    if (!m.width || !m.height) { console.log('NO DIMS', id, df); continue; }
    n++;
    let pipe = sharp(src);
    if (m.width > 1920) pipe = pipe.resize({ width: 1920, withoutEnlargement: true });
    await pipe.jpeg({ quality: 88 }).toFile(path.join(outDir, `detail-${String(n).padStart(2,'0')}.jpg`));
    dims.push(`${df} ${m.width}x${m.height}`);
  }
  console.log(slug, '| details:', n, '| src:', mi.width + 'x' + mi.height, dims.join(' ; '));
}
console.log('DONE');
