#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { validateManifest } from '../index.mjs';
const path = process.argv[2];
if (!path) { console.error('Usage: shar-delivery-manifest <manifest.json>'); process.exit(2); }
try {
  const result = validateManifest(JSON.parse(await readFile(path, 'utf8')));
  console.log(JSON.stringify(result));
  process.exit(result.valid ? 0 : 1);
} catch (error) { console.error(JSON.stringify({ valid: false, errors: [String(error.message || error)] })); process.exit(2); }
