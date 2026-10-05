/**
 * Generates PNG icons, the web manifest and 1200×630 OG images into public/.
 * Run after changing tool names or branding:  node scripts/generate-assets.mjs
 * Output is committed so CI does not need fonts or sharp.
 */
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const pub = new URL('../public/', import.meta.url);
await mkdir(new URL('icons/', pub), { recursive: true });
await mkdir(new URL('og/', pub), { recursive: true });

const favicon = await readFile(new URL('favicon.svg', pub));
for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(favicon, { density: 600 }).resize(size, size).png().toFile(fileURLToPath(new URL(`icons/${name}`, pub)));
}
// Maskable icon: logo on a full-bleed background with safe-zone padding.
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#0F172A' } })
  .composite([{ input: await sharp(favicon, { density: 600 }).resize(360, 360).png().toBuffer(), gravity: 'center' }])
  .png()
  .toFile(fileURLToPath(new URL('icons/icon-maskable-512.png', pub)));

const base = process.env.BASE_PATH ?? '/';
const prefix = base.replace(/\/$/, '');
await writeFile(
  new URL('manifest.webmanifest', pub),
  JSON.stringify(
    {
      name: 'Padhle Beta – Black Notes to White PDF',
      short_name: 'Padhle Beta',
      description: 'Convert dark coaching notes to white, A4 printable PDFs. Free PDF tools for students.',
      start_url: `${prefix}/`,
      scope: `${prefix}/`,
      display: 'standalone',
      background_color: '#FAF7F2',
      theme_color: '#0F172A',
      lang: 'en-IN',
      icons: [
        { src: `${prefix}/icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
        { src: `${prefix}/icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
        { src: `${prefix}/icons/icon-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2
  ) + '\n'
);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const logo = `<g transform="translate(80,70)"><rect width="56" height="56" rx="16" fill="#FAF7F2"/><path transform="scale(0.875)" d="M19 16 L19 48 L25 48 L25 36 L34 36 Q42 36 42 26 Q42 16 34 16 Z M25 21.5 L34 21.5 Q37 21.5 37 26 Q37 30.5 34 30.5 L25 30.5 Z" fill="#0F172A"/><circle cx="41" cy="16.5" r="3.5" fill="#FF6B1A"/><text x="74" y="38" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" fill="#FAF7F2">padhlebeta</text></g>`;

function og(lines, sub) {
  const tspans = lines.map((l, i) => `<tspan x="0" y="${i * 88}"${i === lines.length - 1 ? ' fill="#FF6B1A"' : ''}>${esc(l)}</tspan>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06090F"/><stop offset="1" stop-color="#1E293B"/></linearGradient>
  <radialGradient id="glow" cx="0.85" cy="0.2" r="0.6"><stop offset="0" stop-color="#FF6B1A" stop-opacity="0.28"/><stop offset="1" stop-color="#FF6B1A" stop-opacity="0"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/><rect width="1200" height="630" fill="url(#glow)"/>
  ${logo}
  <g transform="translate(80,${lines.length > 2 ? 250 : 300})"><text font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="800" fill="#FAF7F2" letter-spacing="-2">${tspans}</text></g>
  <text x="80" y="560" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#94A3B8">${esc(sub)}</text>
</svg>`;
}

const FOOT = 'Free · No signup · Files never leave your device';
const images = {
  default: [['Print coaching notes', 'without burning ink.'], FOOT],
  home: [['Black notes to', 'white A4 PDF.'], 'PW · Unacademy · ALLEN · Vedantu — free, no upload'],
  'dark-to-light': [['Dark PDF to', 'white, A4 & printable.'], 'Save up to 60% ink — ' + FOOT],
  'pages-per-sheet': [['2, 4, 6 or 9 pages', 'per A4 sheet.'], FOOT],
  'grayscale-pdf': [['Colour PDF to', 'black & white.'], FOOT],
  merge: [['Merge PDFs', 'into one file.'], FOOT],
  'split-pdf': [['Split a PDF', 'into chapters.'], FOOT],
  'extract-pages': [['Extract just the', 'pages you need.'], FOOT],
  'organize-pdf': [['Reorder, rotate,', 'delete PDF pages.'], FOOT],
  'rotate-pdf': [['Rotate PDF pages', 'permanently.'], FOOT],
  'crop-pdf': [['Crop PDF margins', 'so notes print bigger.'], FOOT],
  'add-page-numbers': [['Add page numbers', 'to any PDF.'], FOOT],
  compress: [['Compress PDF', 'for WhatsApp.'], FOOT],
  'pdf-to-jpg': [['PDF pages to', 'JPG or PNG.'], FOOT],
  'image-to-pdf': [['Photos of notes', 'to one PDF.'], FOOT],
  'focus-timer': [['Pomodoro timer', 'for long study days.'], 'Free focus timer for JEE, NEET & boards'],
};
// NCERT: hub, one per class, one per class+subject (chapter pages reuse the subject image).
const ncert = JSON.parse(await readFile(new URL('../src/data/ncert.json', import.meta.url), 'utf8'));
const NFOOT = 'Free NCERT PDF · Read online or download · No login';
images.ncert = [['Every NCERT chapter.', 'Free PDF, one tap.'], 'Class 9, 10, 11 & 12 · ' + NFOOT];
for (const c of ncert) {
  const n = c.subjects.reduce((a, x) => a + x.chapters.length, 0);
  images[`ncert-class-${c.cls}`] = [[`NCERT Class ${c.cls}`, 'books PDF.'], `${n} chapters · ${NFOOT}`];
  for (const x of c.subjects) {
    images[`ncert-${c.cls}-${x.slug}`] = [[`Class ${c.cls} ${x.name}`, 'NCERT PDF.'], `${x.chapters.length} chapters · ${NFOOT}`];
  }
}
for (const [name, [lines, sub]] of Object.entries(images)) {
  await sharp(Buffer.from(og(lines, sub))).png({ compressionLevel: 9 }).toFile(fileURLToPath(new URL(`og/${name}.png`, pub)));
}
console.log(`Generated ${Object.keys(images).length} OG images, icons and manifest.`);

// Sample dark "board notes" PDF for the "Try a sample" button.
{
  const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  doc.setTitle('Padhle Beta sample – dark board notes');
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const reg = await doc.embedFont(StandardFonts.Helvetica);
  const W = 960, H = 540;
  const white = rgb(0.96, 0.96, 0.95), yellow = rgb(1, 0.83, 0.23), pink = rgb(1, 0.55, 0.78), cyan = rgb(0.4, 0.85, 1);
  const pages = [
    ['Rotational Motion', [['Torque = I x alpha', yellow], ['Angular momentum L = I x omega', pink], ['Ring: I = MR^2     Disc: I = MR^2 / 2', white], ['If external torque = 0, L is conserved', cyan]]],
    ['Laws of Motion', [['F = ma', yellow], ['Friction: f <= mu N', pink], ['Impulse = change in momentum', white], ['Free-body diagram first, always!', cyan]]],
    ['Chemical Bonding', [['Ionic: transfer of electrons', yellow], ['Covalent: sharing of electrons', pink], ['Bond order = (Nb - Na) / 2', white], ['Higher bond order = shorter bond', cyan]]],
    ['Cell: The Unit of Life', [['Prokaryotes: no nuclear membrane', yellow], ['Mitochondria: powerhouse (ATP)', pink], ['Ribosomes: protein synthesis', white], ['70S in prokaryotes, 80S in eukaryotes', cyan]]],
  ];
  for (const [title, lines] of pages) {
    const p = doc.addPage([W, H]);
    p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: rgb(0.05, 0.055, 0.07) });
    p.drawText(title, { x: 60, y: 450, size: 44, font: bold, color: white });
    p.drawRectangle({ x: 60, y: 436, width: bold.widthOfTextAtSize(title, 44), height: 4, color: yellow });
    lines.forEach(([t, c], i) => p.drawText(t, { x: 70, y: 360 - i * 70, size: 30, font: i === 0 ? bold : reg, color: c }));
    p.drawText('padhlebeta sample', { x: 800, y: 24, size: 12, font: reg, color: rgb(0.5, 0.5, 0.55) });
  }
  // One already-white page, to show Auto mode leaves it alone.
  const q = doc.addPage([W, H]);
  q.drawText('Practice Questions (already white)', { x: 60, y: 450, size: 36, font: bold, color: rgb(0.1, 0.1, 0.1) });
  ['1. A disc of mass 2 kg and radius 0.5 m rotates at 10 rad/s. Find L.', '2. State the law of conservation of angular momentum.', '3. Why does an ice skater spin faster with arms folded?'].forEach((t, i) =>
    q.drawText(t, { x: 70, y: 360 - i * 60, size: 22, font: reg, color: rgb(0.15, 0.15, 0.15) }));
  await writeFile(new URL('sample-dark-notes.pdf', pub), await doc.save());
  console.log('Generated sample-dark-notes.pdf');
}
