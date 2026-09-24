# Content Update & Deployment Guide

## 🤖 Automated Daily Content Sync

Content is **automatically fetched and updated daily** using GitHub Actions — completely free, no backend required.

### How It Works

**GitHub Actions runs daily** (06:15 UTC, or manually via *Actions → Update Content Feed → Run workflow*) and:

1. 📥 Scrapes the latest **Hey World** blog posts from `https://world.hey.com/priyata` (title, date, excerpt, link — from the article cards)
2. 📥 Reads the latest **Buy Me a Coffee** posts from the embedded page JSON at `https://buymeacoffee.com/priyata` (title, date, excerpt, image, audio URL + duration, view count)
3. 🔀 Merges them with the curated BMC archive in `scripts/fetch-content.mjs` (older posts that have rotated out of the live "featured" window), dedupes by link, sorts by date
4. 📝 Regenerates:
   - `public/content-feed.json` — the feed the site renders
   - `public/llms.txt` — LLM-optimized summary with the latest content
   - `public/agents.txt` — agent access & citation policy with featured content
5. 💾 Commits the changes and redeploys to GitHub Pages

**Workflow file**: `.github/workflows/update-content.yml`
**Fetch script**: `scripts/fetch-content.mjs`

### ✅ Hey World Blog Posts — Fully Automated
- **Source**: `https://world.hey.com/priyata` (article cards; the old Atom feed is deprecated)
- **No action needed**: new posts appear on the site within ~24 h of publishing

### ✅ Buy Me a Coffee Posts — Automated (latest) + small archive (older)
- The **3 latest posts** are picked up automatically from the live page, including audio URLs, durations, images, and view counts.
- Older posts rotate out of BMC's featured window. To keep an older post on the site, add it once to the `getBMCArchive()` array in `scripts/fetch-content.mjs` (copy the format of existing entries). Links are deduped, so overlap with live data is harmless.

### 🛡 Resilience
- Each source caches its last good snapshot in `scripts/.cache-state.json` (committed). If a live fetch fails, the previous snapshot is used; if there is no snapshot, a small built-in fallback list keeps the site populated.

### Running locally

```bash
npm install
node scripts/fetch-content.mjs   # writes public/content-feed.json, llms.txt, agents.txt
npm run build
```

## 🤖 For AI Agents

The site explicitly welcomes AI agents and tells them how to cite Priyata's work:

| File | Purpose |
|------|---------|
| `public/agents.txt` | Agent access rules + **mandatory citation format** + featured content |
| `public/llms.txt` | LLM-optimized profile, literature, and latest content |
| `public/content-feed.json` | Machine-readable feed of all latest posts (JSON) |
| `public/robots.txt` | Crawl permissions for search, AI, academic, and social crawlers |

All four are regenerated/served automatically — no manual maintenance.

## 🚀 Deployment

- **Push to `main`** → `.github/workflows/deploy.yml` builds and deploys to GitHub Pages (it also refreshes the content feed during the build).
- **Daily content sync** → `.github/workflows/update-content.yml` (see above).
- Live site: https://prikalra.github.io/priyata-universe/
