# PinPilot Studio

A complete local-first Pinterest affiliate planning and content workspace.

## Included

- Automatic niche discovery and custom niche mode
- Board/topic ideas and product research prompts
- Product-to-Pin packages with disclosure, keywords, CTA, and image briefs
- A/B pin variations
- Board descriptions, seasonal planner, publishing checklist
- Manual results tracker and performance tags
- Browser persistence and JSON export/import
- Optional secure Anthropic Claude endpoint for Cloudflare Pages

## Cloudflare + Claude setup

1. Connect this repository to Cloudflare Pages.
2. Add an encrypted production secret named `ANTHROPIC_API_KEY`.
3. Optionally add `ANTHROPIC_MODEL` as a normal variable.
4. Redeploy.

The key is used only by `functions/api/generate.js`; never place it in `index.html`.

Cloudflare Pages Functions are routed from the root `functions` directory. The endpoint is `POST /api/generate` with JSON `{ "prompt": "..." }` and returns `{ "text": "..." }`.
