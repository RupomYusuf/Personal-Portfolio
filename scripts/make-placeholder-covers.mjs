import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const projects = [
  { slug: 'lumen-coffee-rebrand', title: 'Lumen Coffee Rebrand', category: 'Branding', year: 2025, bg: '#c9452c' },
  { slug: 'northwind-annual-report', title: 'Northwind Annual Report', category: 'Print', year: 2024, bg: '#1f3a5f' },
  { slug: 'atelier-mono-identity', title: 'Atelier Mono Identity', category: 'Branding', year: 2024, bg: '#2f2a26' },
  { slug: 'kite-festival-posters', title: 'Kite Festival Posters', category: 'Print', year: 2025, bg: '#d98e04' },
  { slug: 'verdant-packaging', title: 'Verdant Packaging System', category: 'Branding', year: 2023, bg: '#3f6212' },
  { slug: 'halcyon-editorial', title: 'Halcyon Editorial', category: 'Print', year: 2026, bg: '#7c3aed' },
];

const svg = ({ title, category, year, bg }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${bg}"/>
  <circle cx="1050" cy="120" r="220" fill="rgba(255,255,255,0.12)"/>
  <text x="80" y="120" font-family="Georgia, serif" font-size="28" fill="rgba(255,255,255,0.75)">
    ${category} · ${year} · PLACEHOLDER COVER
  </text>
  <text x="80" y="380" font-family="Georgia, serif" font-weight="bold" font-size="84" fill="#ffffff">${title}</text>
  <text x="80" y="540" font-family="Georgia, serif" font-size="30" fill="rgba(255,255,255,0.7)">
    Rupom Morol — Graphic Designer
  </text>
</svg>`;

for (const p of projects) {
  const out = `src/assets/projects/${p.slug}`;
  mkdirSync(out, { recursive: true });
  await sharp(Buffer.from(svg(p)))
    .jpeg({ quality: 85 })
    .toFile(`${out}/cover.jpg`);
  // second gallery image: same art, cropped square, so the lightbox has >1 frame
  await sharp(Buffer.from(svg(p)))
    .resize(1000, 1000, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 85 })
    .toFile(`${out}/detail-01.jpg`);
  console.log('wrote', p.slug);
}
