/**
 * Pulls numbered section headings ("5.4 Isomerism in Coordination Compounds")
 * out of every NCERT chapter PDF in public/ncert and stores them as `topics`
 * in src/data/ncert.json. Re-run after adding or replacing chapter PDFs:
 *   node scripts/extract-ncert-topics.mjs
 * Chapters whose headings can't be read cleanly (small-caps fonts) get none.
 */
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'node:fs';

async function headings(file) {
  const doc = await getDocument({ data: new Uint8Array(fs.readFileSync(file)), verbosity: 0 }).promise;
  const lines = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const tc = await page.getTextContent();
    const map = new Map();
    for (const it of tc.items) {
      const s = it.str; if (!s.trim()) continue;
      const h = Math.round(Math.abs(it.transform[3]) * 2) / 2;
      const key = Math.round(it.transform[5] / 3) + ':' + h;
      if (!map.has(key)) map.set(key, { p, y: it.transform[5], x: it.transform[4], h, parts: [] });
      const l = map.get(key);
      if (!l.parts.includes(s)) l.parts.push(s);
    }
    lines.push(...[...map.values()].sort((a, b) => b.y - a.y || a.x - b.x));
  }
  const freq = {}; for (const l of lines) freq[l.h] = (freq[l.h] || 0) + l.parts.join('').length;
  const body = +Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  return { body, lines };
}
const NUMRE = /^(\d{1,2})\s?\.\s?(\d{1,2})(?:\s?\.\s?(\d{1,2}))?\s+/;
function cleanParts(parts) {
  let p = parts.map((s) => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
  p = p.filter((s, i) => p.indexOf(s) === i);
  p = p.filter((s) => !p.some((o) => o !== s && (o.startsWith(s) || (s.length <= 2 && o.endsWith(s)))));
  return p.join(' ');
}
function untile(t) {
  let w = t.split(' ').filter(Boolean);
  w = w.filter((x, i) => !(w[i + 1] && w[i + 1] !== x && w[i + 1].startsWith(x)) && !(x.length === 1 && /[a-z]/.test(x) && w[i - 1] && w[i - 1].endsWith(x)));
  for (let k = 1; k < w.length; k++) { const tail = w.slice(k); if (tail.length && tail.every((x, i) => x === w[i])) { w = w.slice(0, k); break; } }
  return w.join(' ');
}
const clean = (t) => untile(t).replace(/^(\d{1,2}\s?\.\s?\d{1,2}(\s?\.\s?\d{1,2})?\s*)+/, '').replace(/\b(\w[\w’']*)( \1\b)+/g, '$1').replace(/\s+([,:;?)])/g, '$1').replace(/\s+/g, ' ').replace(/^[\s.:–-]+|[\s.:–-]+$/g, '').trim();
const good = (t) => t.length >= 4 && t.length <= 80 && /[a-z]{3}/.test(t) && !/\b[A-Z] [A-Z]\b/.test(t) && !/\b(EXERCISE|Exercise|Example|Activity)\b/.test(t) && (t.match(/[A-Za-z]/g) || []).length / t.length > 0.7 && !/^[a-z]/.test(t);
async function topics(file, chN) {
  const { body, lines } = await headings(file);
  const L = lines.map((l) => ({ ...l, t: cleanParts(l.parts) }));
  const out = []; let cur = null;
  for (const l of L) {
    const m = l.t.match(NUMRE);
    if (l.h >= body + 0.5 && m && +m[1] === chN) {
      const first = untile(l.t.replace(NUMRE, '').replace(/^(\d{1,2}\s?\.\s?\d{1,2}\s*)+/, ''));
      cur = { n: m[3] ? `${m[1]}.${m[2]}.${m[3]}` : `${m[1]}.${m[2]}`, h: l.h, p: l.p, x: l.x, y: l.y, side: first.split(' ').length <= 2, words: [first] }; out.push(cur); continue;
    }
    if (cur && l.h === cur.h && l.p === cur.p && cur.words.length < 8 && !NUMRE.test(l.t) && !/^(Example|Solution|Intext|Activity|EXERCISE|Think)/i.test(l.t) && (cur.side ? l.x - cur.x > -6 && l.x - cur.x < 40 && cur.y - l.y < 90 : true)) { if (cur.words.at(-1) !== l.t) cur.words.push(untile(l.t)); cur.y = l.y; continue; }
    if (cur && cur.side && l.p === cur.p && l.h < cur.h) continue;
    cur = null;
  }
  const seen = new Set(); const res = [];
  for (const o of out) { const t = clean(o.words.join(' ')); if (good(t) && !seen.has(o.n) && !/^(Introduction|Summary)$/i.test(t)) { seen.add(o.n); res.push({ n: o.n, t }); } }
  return res;
}

const STOP = /\s(of|in|a|an|the|and|to|for|on|by|with|Non)$/i;
const JSON_PATH = 'src/data/ncert.json';
const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
let withTopics = 0;
for (const c of data) for (const s of c.subjects) for (const ch of s.chapters) {
  let t = [];
  try { t = await topics('public' + ch.file, ch.n); } catch { t = []; }
  const truncated = t.some((x) => STOP.test(' ' + x.t));
  t = t
    .map((x) => ({ n: x.n, t: x.t.replace(/\bT he\b/g, 'The') }))
    .filter((x) => !STOP.test(' ' + x.t) && !(truncated && !x.t.includes(' ')) && x.n.split('.').every((d) => +d < 30));
  if (t.length >= 3) { ch.topics = t.slice(0, 16); withTopics++; } else delete ch.topics;
}
fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 1) + '\n');
console.log(`topics written for ${withTopics} chapters`);
