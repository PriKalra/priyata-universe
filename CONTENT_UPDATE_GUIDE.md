# Content Update & Deployment Guide

## 🤖 Automated Weekly Content Updates

Content is now **automatically fetched and updated weekly** using GitHub Actions - completely free with no backend required!

### How It Works

**GitHub Actions runs weekly** (every Monday at 9 AM UTC) and:
1. 📥 Fetches latest Hey World blog posts via RSS
2. 🔀 Merges with Buy Me a Coffee audio posts
3. 📝 Generates `public/content-feed.json`
4. 💾 Commits changes to the repository
5. 🚀 Triggers automatic deployment to GitHub Pages

**Workflow file**: `.github/workflows/update-content.yml`

### ✅ Hey World Blog Posts - **Fully Automated**
- **Source**: RSS feed from `https://world.hey.com/priyata/feed.atom`
- **Automation**: Fetched weekly by GitHub Actions
- **No action needed**: Posts automatically appear when published

### ⚠️ Buy Me a Coffee Posts - **Manual Entry Required**
- **Why**: No public API available from Buy Me a Coffee
- **Location**: `scripts/fetch-content.js` - `BMC_POSTS` array
- **How to update**:
  1. Open `scripts/fetch-content.js`
  2. Add new entries to the `BMC_POSTS` array
  3. Follow the existing format:
  ```javascript
  {
    type: "audio",
    title: "Your Post Title",
    excerpt: "Brief description...",
    link: "https://buymeacoffee.com/priyata/your-post-url",
    source: "Buy Me a Coffee",
    audioLength: "XX:XX",
    audioUrl: "https://cdn.buymeacoffee.com/uploads/...",
    image: "https://cdn.buymeacoffee.com/uploads/...",
    date: "YYYY-MM-DD",
    views: 0,
    size: "medium"
  }
  ```
  4. Push changes to trigger workflow (or run manually)

### 🔄 Manually Trigger Content Update

To update content immediately (without waiting for weekly schedule):

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Update Content Weekly** workflow
4. Click **Run workflow** button
5. Wait for completion - changes deploy automatically

## 🚀 GitHub Pages Deployment

### Automatic Deployment
- **Trigger**: Push to `main` branch
- **Workflow**: `.github/workflows/deploy.yml`
- **Process**: Automatically builds and deploys to GitHub Pages

### Setup Steps
1. Go to your GitHub repository settings
2. Navigate to Pages section
3. Set Source to "GitHub Actions"
4. Push to main branch - deployment starts automatically

### Custom Domain (Optional)
1. Add your domain in repository Settings → Pages → Custom domain
2. Configure DNS records with your domain provider
3. Enable "Enforce HTTPS"

### Base Path Configuration
If deploying to a repository subdirectory (e.g., `username.github.io/repo-name`):
1. Open `vite.config.ts`
2. Uncomment and update the base path:
   ```typescript
   base: '/your-repo-name/',
   ```

## 🧪 Testing Locally

To test the content fetch script on your machine:

```bash
# Install dependencies
npm install

# Run the fetch script
node scripts/fetch-content.js

# View the generated file
cat public/content-feed.json
```

## 🛠️ Technical Details

### How It Works
1. **GitHub Actions** runs Node.js script weekly
2. Script fetches Hey World RSS feed via CORS proxy
3. Merges with manually curated Buy Me a Coffee posts
4. Generates static `public/content-feed.json` file
5. Commits file to repository (triggers deployment)
6. Frontend loads from static JSON file (no runtime fetching)

### Benefits
- ✅ **Completely Free** - GitHub Actions free tier
- ✅ **No Backend** - Pure static site
- ✅ **Fast Loading** - Pre-fetched content
- ✅ **No CORS Issues** - Static JSON file
- ✅ **Reliable** - No runtime dependencies

### Dependencies
- `node-fetch@3` - Fetch RSS feeds in Node.js
- `xmldom` - Parse XML/Atom feeds

## 💰 Cost Summary

| Service | Cost |
|---------|------|
| GitHub Pages | Free |
| GitHub Actions | Free (2000 min/month) |
| Weekly Script | ~30 sec/week = 2 min/month |
| **Total** | **$0/month** |

## 🐛 Troubleshooting

### Content Not Updating
1. Check **Actions** tab for workflow logs
2. Ensure workflow has write permissions
3. Manually trigger workflow

### Workflow Failing
- Network timeout fetching RSS
- XML parsing errors  
- Git push permission denied

Check Actions logs for detailed errors.
