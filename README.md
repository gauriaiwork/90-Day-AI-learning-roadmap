# My AI Learning Roadmap — 90 Days

Live site: https://gauriaiwork.github.io/90-Day-AI-learning-roadmap/

A personalised 90-day AI learning roadmap with progress tracking. Progress is saved in the visitor's browser.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app: plans, resources, cost labels, UI. |
| `manifest.json`, `sw.js`, `icons/` | Installable app and offline support. |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is. |
| `scripts/check_links.py` | Checks every external link in `index.html`. |
| `.github/workflows/link-check.yml` | Runs the link check monthly and opens an issue if links are broken. |
| `.github/workflows/monthly-refresh-reminder.yml` | Opens a monthly checklist issue. |

## Deploy on GitHub Pages

1. Put these files in the **root** of the repo (keep `icons/`, `scripts/` and `.github/` as folders).
2. **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, Folder = `/ (root)`.
3. Wait about a minute, then hard-refresh the site (Ctrl+Shift+R).

## Cost labels

Every resource has a label in `RES_COST` inside `index.html`: `free`, `signin` (free account), `tier` (limited free plan), `api` (needs paid API credits) or `paid`. When you add a resource to `R`, add it to `RES_COST` too; unlabeled ones default to `free`.

## After changing the site

If you change `index.html`, `manifest.json` or the icons, also change `CACHE_NAME` in `sw.js` so returning visitors get the new version.

## Check links locally

    python scripts/check_links.py

Sites that block bots show as *unverified*; open those by hand.
