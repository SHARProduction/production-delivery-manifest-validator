import test from 'node:test';
import assert from 'node:assert/strict';
import { validateManifest } from '../index.mjs';
const valid = { project_id: 'demo', delivery_id: 'v1', files: [{ path: 'final.mp4', sha256: 'a'.repeat(64) }], rights: { status: 'cleared', evidence_url: 'https://example.com/rights' } };
test('accepts a cleared delivery manifest', () => assert.deepEqual(validateManifest(valid), { valid: true, errors: [] }));
test('blocks unknown rights', () => { const result = validateManifest({ ...valid, rights: { ...valid.rights, status: 'unknown' } }); assert.equal(result.valid, false); assert.match(result.errors.join(' '), /release blocked/); });
test('rejects missing file digests', () => { const result = validateManifest({ ...valid, files: [{ path: 'final.mp4', sha256: 'bad' }] }); assert.equal(result.valid, false); });
