// Build namespaced AR content files for a whole collection from authored
// translations + the EN block templates (so quiz numbering / whitespace / span
// wrappers match exactly what ui.js expects).
//
// Usage: node scripts/build-ar-batch.mjs <collection> <ar-dir>
//   EN blocks: /tmp/en/<collection>.json  (run extract-i18n-all.mjs first)
//   <ar-dir>:  directory of <slug>.json, each a FLAT array of AR "inner" strings
//              of the SAME length as that slug's EN array.
//   Output:    src/i18n/content/<collection>/<slug>.json
import fs from 'node:fs';

const [collection, arDir] = process.argv.slice(2);
if (!collection || !arDir) { console.error('usage: build-ar-batch.mjs <collection> <ar-dir>'); process.exit(1); }

const EN_DIR = process.env.EN_DIR || '/tmp/en';
const en = JSON.parse(fs.readFileSync(`${EN_DIR}/${collection}.json`, 'utf8'));
const destDir = `src/i18n/content/${collection}`;
fs.mkdirSync(destDir, { recursive: true });

const rewrap = (enBlocks, arBlocks) =>
  enBlocks.map((e, i) => {
    const a = arBlocks[i];
    let m;
    if ((m = e.match(/^ (\d+)\.\n<span>[\s\S]*<\/span> $/))) return ` ${m[1]}.\n<span>${a}</span> `;
    if (/^ <span>[\s\S]*<\/span> $/.test(e)) return ` <span>${a}</span> `;
    if (/^<span>[\s\S]*<\/span>$/.test(e)) return `<span>${a}</span>`;
    return a;
  });

let wrote = 0, skipped = 0;
for (const slug of Object.keys(en)) {
  const arPath = `${arDir}/${slug}.json`;
  if (!fs.existsSync(arPath)) { console.warn(`  MISSING AR: ${slug}`); skipped++; continue; }
  const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
  if (en[slug].length !== ar.length) {
    console.error(`  COUNT MISMATCH ${slug}: EN=${en[slug].length} AR=${ar.length}`); skipped++; continue;
  }
  fs.writeFileSync(`${destDir}/${slug}.json`, JSON.stringify(rewrap(en[slug], ar), null, 0));
  wrote++;
}
console.log(`${collection}: wrote ${wrote}, skipped ${skipped}`);
