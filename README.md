# Priyata • State of Being

Live site: https://prikalra.github.io/priyata-universe/

A minimalist, cosmic-themed personal site for my work at the intersection of computational pharmacology (PBPK/QSP), AI in pharma, and philosophy of being. Built with Vite + React + Tailwind and optimized for GitHub Pages.

## Features
- Latest Work section combining:
  - Hey World blog posts (auto-fetched via RSS)
  - Buy Me a Coffee audio posts (manual/semi-automated due to no public API)
- Beautiful, responsive UI with subtle animations
- Hash-based routing for reliable GitHub Pages hosting
- SEO-friendly metadata and canonical URLs

## Content sources
- Hey World: https://world.hey.com/priyata
- Buy Me a Coffee: https://buymeacoffee.com/priyata

### How Hey World posts are fetched
Client-side RSS fetch with a CORS-safe proxy.
- Code: src/utils/rssParser.ts and src/hooks/useContentFeed.ts
- If HEY changes its feed or a proxy rate-limits, the site gracefully falls back to showing the audio posts.

### How to update Buy Me a Coffee posts
Because there’s no public API, these are manually curated.
- File: src/hooks/useContentFeed.ts (BMC_POSTS array)
- Add/update entries with title, link, date (YYYY-MM-DD), image, and optional audio metadata

## Local development
```bash
npm i
npm run dev
```

## Deployment (GitHub Pages)
This repo deploys automatically via GitHub Actions to:
https://prikalra.github.io/priyata-universe/

What’s already set up:
- Vite base path configured for the repo: vite.config.ts → base: '/priyata-universe/'
- HashRouter for robust Pages routing: src/App.tsx
- GitHub Actions workflow: .github/workflows/deploy.yml
- Jekyll workflow removed (not needed for React/Vite)

If you rename the repository, update:
- vite.config.ts → base: '/<new-repo-name>/'
- index.html → canonical link to your new Pages URL

## Troubleshooting
- Blank page on Pages: ensure HashRouter is used and the base path matches the repo name
- Latest posts missing HEY items: temporary proxy/RSS issue; will fall back to audio posts; try a hard refresh or check browser console

## Tech stack
- React 18, TypeScript, Vite
- Tailwind CSS, shadcn/ui components
- @tanstack/react-query for future data needs

## License
MIT — feel free to use and adapt with attribution.
