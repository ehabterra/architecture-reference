// Extract translatable prose blocks from every built track page, in the exact
// order the client runtime (ui.js i18nBlocks) collects them. Writes one file
// per collection: /tmp/en/<collection>.json  (object: slug -> [inner-HTML, …]).
// Run AFTER `astro build`. Usage: node scripts/extract-i18n-all.mjs
import fs from 'node:fs';
import * as cheerio from 'cheerio';

const EN_DIR = process.env.EN_DIR || '/tmp/en';

const TRACKS = [
  'foundations', 'styles', 'ddd', 'microservices', 'event-driven',
  'distributed-systems', 'apis', 'cloud', 'automation', 'strategy',
];

fs.mkdirSync(EN_DIR, { recursive: true });
let grand = 0;

for (const track of TRACKS) {
  const base = `dist/${track}`;
  if (!fs.existsSync(base)) { console.warn(`skip ${track} (no dist)`); continue; }
  const out = {};
  for (const slug of fs.readdirSync(base)) {
    const file = `${base}/${slug}/index.html`;
    if (!fs.existsSync(file)) continue;
    const $ = cheerio.load(fs.readFileSync(file, 'utf8'));
    const body = $('.dp-article__body').first();
    if (!body.length) continue;
    const blocks = [];
    body.find('h2,h3,h4,p,li,.dp-opt').each((_, el) => {
      const $el = $(el);
      if ($el.closest('pre, .dp-mermaid, .dp-pg, .dp-grid, .dp-pager, table').length) return;
      if ($el.hasClass('dp-card__intent')) return;
      if (!$el.text().trim()) return;
      blocks.push($.html($el.contents())); // innerHTML
    });
    out[slug] = blocks;
  }
  fs.writeFileSync(`${EN_DIR}/${track}.json`, JSON.stringify(out));
  const n = Object.keys(out).length;
  const totalBlocks = Object.values(out).reduce((s, v) => s + v.length, 0);
  grand += totalBlocks;
  console.log(`${track}: ${n} pages, ${totalBlocks} blocks`);
}
console.log(`TOTAL blocks across all tracks: ${grand}`);
