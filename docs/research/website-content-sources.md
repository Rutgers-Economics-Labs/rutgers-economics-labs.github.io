# Website content review — September 5, 2026

## Scope

Inventoried the organization's 27 repositories, distinguished public/private and research/infrastructure/demo projects, and inspected the README or root tree of ten research/training repositories. This was a content-evidence review, not a correctness or security audit of all code.

## Published examples

- [Census API workshop](https://github.com/Rutgers-Economics-Labs/python_api_workshop): README documents requests, ACS population data, response parsing and error handling.
- [NJDEP climate risk](https://github.com/Rutgers-Economics-Labs/NJDEPClimateRiskSp2026): README documents panel construction, DiD, diagnostics, dashboards, synthetic benchmark and pre-trend limitations. The website preserves the exploratory-not-causal qualification.
- [Clean energy funding](https://github.com/Rutgers-Economics-Labs/CleanEnergyFundingF24): repository tree contains registration, battery-cost and analysis notebooks, data and graphs. No numerical finding or causal result was inferred from filenames.
- [RAIL](https://github.com/Rutgers-Economics-Labs/RutgersAgenticIntelligenceLabs): default-branch README describes repo-native plans, source definitions, assumptions, artifacts and integrity checks. Presented as internal tooling, not a universal curriculum.

Private repository contents, generated demonstration projects, personal contact records and unapproved results are not reproduced on the public pages. The partner workflow follows the saved September 4 executive-board meeting outcomes; it does not announce unconfirmed Fall engagements, staffing levels or deadlines.

## Discoverability decisions

- One canonical www hostname, unique route metadata, source-linked HTML content, Organization/WebSite/WebPage/BreadcrumbList structured data.
- Preserve the existing REL logo image: its actual dimensions are 500 × 500, not the previously advertised 1200 × 630. Use a square summary card consistently.
- Remove the Google Analytics measurement ID from Search Console verification metadata; an Analytics ID is not a verification token. Search Console ownership and indexing remain unverified.
- Keep check-in and unsubscribe out of the sitemap and noindex their pages. Keep public reading pages crawlable.
- llms.txt is a supplementary navigation file, not a ranking guarantee or a required AI-search standard.
- Existing Cloudflare function code is not executed by GitHub Pages. No claim is made that the site performs Markdown content negotiation.
- Guidance consulted: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features) and [Next.js metadata inheritance](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).

Run `npm run build` then `node scripts/check-seo.mjs` to check exported HTML and generated sitemap metadata.
