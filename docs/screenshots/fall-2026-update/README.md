# Fall 2026 projects and people — review images

Captured November 6, 2026 in Chrome. Updated screenshots show the local production export, not a deployed release. The before image shows the public Projects page at capture time.

- `projects-before.png`: public production baseline.
- `projects-original-format-desktop.jpg`: original project-card layout with real organization logos and plain-text team rosters.
- `projects-original-format-mobile.jpg`: restored project layout at 390 CSS pixels.
- `people-real-photos-desktop.jpg`: all eight new researchers with LinkedIn portraits and organization logos inside the existing cards.
- `people-real-photos-mobile.jpg`: portraits and affiliation logos at 390 CSS pixels.

The user requested the original visual format. Text placeholders and current-team chips have been replaced by real portraits and affiliation logos. The original project list presentation is restored. Source links are in [image-sources.md](image-sources.md). Superseded screenshots of the chip design were removed.

Content basis: October 24 kickoff follow-up naming four working groups; November 4–6 project coordination; full project scope drafts and November 6 team briefings. Older planning-sheet recommendations were not used as assignments. Private correspondence, applicant records, contact details and partner files are excluded.

Verification: production build, static export, TypeScript and SEO checks passed. Every portrait/logo file exists; member names are unique; all 15 project-to-person assignments resolve. Browser verification confirmed loaded new portraits and logos, no team-chip links, 15 plain-text roster links, roster-to-profile navigation, and no horizontal overflow at desktop and 390px widths. No browser errors were observed in the revised-flow check. The existing ESLint configuration is empty, so build success does not imply substantive lint coverage.
