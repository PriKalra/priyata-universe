# Priyata • State of Being

Live site: https://prikalra.github.io/priyata-universe/

A minimalist, cosmic-themed personal site for my work at the intersection of computational pharmacology (PBPK/QSP), AI in pharma, and philosophy of being. Built with Vite + React + Tailwind and optimized for GitHub Pages.

## Features
- **Automated Weekly Content Updates** via GitHub Actions (completely free!)
- Latest Work section combining:
  - Hey World blog posts (auto-fetched weekly)
  - Buy Me a Coffee audio posts (manually curated)
- Beautiful, responsive cosmic-themed UI
- Hash-based routing for reliable GitHub Pages hosting
- SEO-friendly metadata and canonical URLs
- Zero backend costs - pure static site

## Content sources
- Hey World: https://world.hey.com/priyata
- Buy Me a Coffee: https://buymeacoffee.com/priyata

## Content Updates

### Automated Weekly Updates
Content is automatically fetched every Monday at 9 AM UTC via GitHub Actions:
- **Workflow**: `.github/workflows/update-content.yml`
- **Script**: `scripts/fetch-content.js`
- **Output**: `public/content-feed.json` (static file)

### Manual Updates
To update Buy Me a Coffee posts or trigger an immediate update:
1. Edit `scripts/fetch-content.js` → `BMC_POSTS` array
2. Go to **Actions** tab → **Update Content Weekly** → **Run workflow**

See [CONTENT_UPDATE_GUIDE.md](./CONTENT_UPDATE_GUIDE.md) for full details.

## Local development
```bash
npm i
npm run dev
```

To test content fetching:
```bash
node scripts/fetch-content.js
```

## Deployment (GitHub Pages)

Automatic deployment via two GitHub Actions workflows:
1. **Content Update** (`.github/workflows/update-content.yml`)
   - Runs weekly (Monday 9 AM UTC) + manual trigger
   - Fetches latest content and commits to repo
2. **Deploy** (`.github/workflows/deploy.yml`)
   - Triggered by push to `main` branch
   - Builds and deploys to GitHub Pages

Live site: https://prikalra.github.io/priyata-universe/

### Configuration
- Vite base path: `base: '/priyata-universe/'` in `vite.config.ts`
- HashRouter for GitHub Pages routing
- GitHub Pages Source: **GitHub Actions**

If you rename the repository:
- Update `vite.config.ts` → `base: '/<new-repo-name>/'`
- Update `index.html` → canonical link
- Update `src/hooks/useContentFeed.ts` → fetch path

## Troubleshooting
- **Blank page on Pages**: Ensure HashRouter is used and base path matches repo name
- **Content not updating**: Check Actions tab for workflow logs or manually trigger update
- **Workflow failing**: Check Actions logs for RSS fetch or Git permission errors

## Cost
**$0/month** - Completely free using GitHub Actions (2000 minutes/month free tier, uses ~2 min/month)

## Tech stack
- React 18, TypeScript, Vite
- Tailwind CSS, shadcn/ui components
- @tanstack/react-query for future data needs
- GitHub Actions for automated content updates

## License
MIT — feel free to use and adapt with attribution.
