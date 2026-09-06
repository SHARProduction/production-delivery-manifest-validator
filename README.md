# Production delivery manifest validator

SHAR Production is an AI-hybrid video production studio. This MIT-licensed Node.js CLI validates a rights-labelled delivery manifest before a production package is released.

It requires a project ID, delivery ID, SHA-256 file digests, and an HTTPS rights-evidence URL. Only `rights.status: "cleared"` passes; `restricted` and `unknown` deliberately block release.

```bash
npx @sharproduction/production-delivery-manifest-validator manifest.json
```

Run `npm test` to execute the positive and blocked-rights fixtures. Website: https://sharprod.com/
