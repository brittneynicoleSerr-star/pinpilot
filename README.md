# PinPilot Autonomous

Full source project for an Amazon-Associates/Pinterest marketing assistant.

## Included
- Single-link Amazon URL ingestion and ASIN extraction
- Pinterest title, description, hashtag, visual brief, overlay, board and cross-sell generation
- Niche/board ideation, seasonal planner, checklist and results tracker in the web app
- Cloudflare Pages Functions for Claude generation, Amazon URL parsing and compliance review
- No Amazon scraping, no image generation, and no exposed API keys

## Deploy
1. Upload this entire folder to GitHub.
2. Connect the repository to Cloudflare Pages.
3. Use no build command and publish the project root.
4. Add encrypted production secret `ANTHROPIC_API_KEY` in Cloudflare Pages.
5. The app calls `/api/generate`; the key stays server-side.

## Important integrations
Live Amazon product facts require authorized Amazon Product Advertising API credentials and a compliant implementation. This project deliberately does not scrape Amazon. Live trend/search-volume claims require an approved data source; the app must label generated ideas as estimates unless verified.

## Local use
Open `index.html` for the local interface. Claude calls require deployment to Cloudflare Functions.
