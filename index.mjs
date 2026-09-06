const required = ['project_id', 'delivery_id', 'files', 'rights'];
const allowedRights = new Set(['cleared', 'restricted', 'unknown']);

export function validateManifest(input) {
  const errors = [];
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { valid: false, errors: ['manifest must be an object'] };
  for (const key of required) if (!(key in input)) errors.push(`missing ${key}`);
  if (typeof input.project_id !== 'string' || !input.project_id.trim()) errors.push('project_id must be a non-empty string');
  if (typeof input.delivery_id !== 'string' || !input.delivery_id.trim()) errors.push('delivery_id must be a non-empty string');
  if (!Array.isArray(input.files) || input.files.length === 0) errors.push('files must be a non-empty array');
  else input.files.forEach((file, index) => {
    if (!file || typeof file.path !== 'string' || !file.path.trim()) errors.push(`files[${index}].path must be a non-empty string`);
    if (!file || !/^[a-f0-9]{64}$/i.test(file.sha256 || '')) errors.push(`files[${index}].sha256 must be a SHA-256 hex digest`);
  });
  if (!input.rights || typeof input.rights !== 'object') errors.push('rights must be an object');
  else {
    if (!allowedRights.has(input.rights.status)) errors.push('rights.status must be cleared, restricted, or unknown');
    if (input.rights.status !== 'cleared') errors.push(`release blocked: rights.status is ${input.rights.status || 'missing'}`);
    if (typeof input.rights.evidence_url !== 'string' || !/^https:\/\//.test(input.rights.evidence_url)) errors.push('rights.evidence_url must be an HTTPS URL');
  }
  return { valid: errors.length === 0, errors };
}
