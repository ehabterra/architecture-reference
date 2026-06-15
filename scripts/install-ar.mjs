// Install authored Arabic content for a whole collection, verbatim.
// Agents produce a FULL structural mirror of each EN block (same HTML tags,
// only the human-readable text translated), so no span re-wrapping is needed —
// we just validate array length/order and copy into the site.
//
// Usage: node scripts/install-ar.mjs <collection> <ar-dir>
//   EN blocks: $EN_DIR/<collection>.json  (run extract-i18n-all.mjs first)
//   <ar-dir>:  directory of <slug>.json, each a FLAT array of AR "innerHTML"
//              strings, SAME length and order as that slug's EN array.
//   Output:    src/i18n/content/<collection>/<slug>.json
import fs from 'node:fs';

const EN_DIR = process.env.EN_DIR || '/tmp/en';
const [collection, arDir] = process.argv.slice(2);
if (!collection || !arDir) { console.error('usage: install-ar.mjs <collection> <ar-dir>'); process.exit(1); }

const en = JSON.parse(fs.readFileSync(`${EN_DIR}/${collection}.json`, 'utf8'));
const destDir = `src/i18n/content/${collection}`;
fs.mkdirSync(destDir, { recursive: true });

let wrote = 0, skipped = 0;
for (const slug of Object.keys(en)) {
  const arPath = `${arDir}/${slug}.json`;
  if (!fs.existsSync(arPath)) { console.warn(`  MISSING AR: ${slug}`); skipped++; continue; }
  let ar;
  try { ar = JSON.parse(fs.readFileSync(arPath, 'utf8')); }
  catch (e) { console.error(`  BAD JSON ${slug}: ${e.message}`); skipped++; continue; }
  if (!Array.isArray(ar)) { console.error(`  NOT ARRAY ${slug}`); skipped++; continue; }
  if (en[slug].length !== ar.length) {
    console.error(`  COUNT MISMATCH ${slug}: EN=${en[slug].length} AR=${ar.length}`); skipped++; continue;
  }
  fs.writeFileSync(`${destDir}/${slug}.json`, JSON.stringify(ar, null, 0));
  wrote++;
}
console.log(`${collection}: wrote ${wrote}, skipped ${skipped}`);
