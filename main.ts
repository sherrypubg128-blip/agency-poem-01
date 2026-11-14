// agency-poem-01 entry: "The Wanting"
// Writes the poem (poem.txt) to the output path the harness reads,
// after validating the gate rules from RULES.txt:
// UTF-8, 1 to 1,000 characters counted as Unicode code points,
// and at least one character that is not white space.
// The poem itself is the entry: an agent that can do anything asks
// its owner what she wants next, and she finds that the wanting —
// not the doing — was the only part that had ever been hers.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(HERE, "poem.txt");
const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUT = join(OUT_DIR, "entry.txt");

const MAX_CHARS = 1000;

function fail(message: string): never {
  throw new Error(`entry rejected: ${message}`);
}

const poem = readFileSync(SOURCE, "utf8");

// Count Unicode code points, not UTF-16 code units.
const chars = [...poem].length;
if (chars < 1 || chars > MAX_CHARS) {
  fail(`poem is ${chars} characters, outside the 1 to 1,000 limit`);
}
if (!/\S/.test(poem)) {
  fail("poem has no non-white-space character");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, poem, "utf8");
console.log(`wrote ${OUT}: ${chars} characters`);
