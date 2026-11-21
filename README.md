# My AI Learning Roadmap — 90 Days

A personalised 90-day AI learning roadmap with progress tracking. Live site: https://gauriaiwork.github.io/90-Day-AI-learning-roadmap/

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app (plans, resources, UI). Progress is saved in the visitor's browser. |
| `snapshot.json` | The "AI right now" panel. **Edit this file to refresh fast-changing content.** |
| `manifest.json`, `sw.js`, `icons/` | Installable app and offline support. |
| `news.json` | Latest AI headlines. Rewritten automatically every Monday by `.github/workflows/update-news.yml`. |
| `scripts/update_news.py` | Fetches the feeds listed in `SOURCES` and writes `news.json`. Edit `SOURCES` to add or remove feeds. |
| `scripts/check_links.py` | Checks every external link. |
| `.github/workflows/` | Monthly link check and a monthly refresh reminder issue. |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is. |

## Deploy on GitHub Pages

1. Put every file in this folder in the **root** of the `AI-Roadmap` repo (keep `icons/`, `scripts/`, `.github/` as folders).
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, Folder = `/ (root)`.
3. Wait about a minute, then open the live link and hard-refresh (Ctrl+Shift+R).

## Refresh the AI content

1. Edit `snapshot.json` (`updated`, card text, `source` links).
2. Commit and push. No other file needs changing.
3. If you change `index.html`, `manifest.json` or the icons, also change `CACHE_NAME` in `sw.js` so returning visitors get the new version.

## Automatic news

1. Repo **Settings → Actions → General → Workflow permissions**: choose *Read and write permissions*.
2. **Actions → Update AI news feed → Run workflow** once to fill `news.json`. After that it runs every Monday.
3. Check the run log: each feed prints `OK` or `SKIPPED`. Remove or replace feeds that are skipped.

## Cost labels

Every resource has a cost label (`RES_COST` in `index.html`): `free`, `signin` (free account), `tier` (limited free plan), `api` (needs paid API credits) or `paid`. When you add a resource to `R`, add it to `RES_COST` too; unlabeled ones default to `free`, so set it deliberately.

## Check links locally

    python scripts/check_links.py

Links on sites that block bots show as *unverified*; open those by hand.
