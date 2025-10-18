# Content Automation Guide

## 📊 What Gets Automated

### ✅ Hey World Blog Posts - **Fully Automated**
- **Source**: RSS feed from `https://world.hey.com/priyata/feed.atom`
- **Automation**: Automatically fetched on page load
- **Location**: `src/utils/rssParser.ts` and `src/hooks/useContentFeed.ts`
- **No action needed**: Posts automatically appear when published to Hey World

### ⚠️ Buy Me a Coffee Posts - **Manual Updates Required**
- **Why**: No public API available from Buy Me a Coffee
- **Location**: `src/hooks/useContentFeed.ts` - `BMC_POSTS` array
- **How to update**:
  1. Open `src/hooks/useContentFeed.ts`
  2. Add new entries to the `BMC_POSTS` array
  3. Follow the existing format:
  ```typescript
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

## 🔄 Content Refresh
- Hey World posts: Refresh automatically on page load
- Buy Me a Coffee posts: Manual update required (see above)
- Both sources are merged and sorted by date automatically

## 🛠️ Technical Details
- **RSS Parser**: Uses CORS proxy (`api.allorigins.win`) to fetch Hey World RSS
- **Fallback**: If RSS fetch fails, displays Buy Me a Coffee posts only
- **Caching**: No caching implemented - fresh fetch on each page load
- **Error Handling**: Graceful fallback to static content on API errors
