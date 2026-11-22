import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Generates sitemap.xml at build time. The site uses hash routing, so only real URLs are listed.
const SITE_URL = "https://prikalra.github.io/priyata-universe/";
const SITEMAP_PATHS = ["", "llms.txt", "agents.txt"];
const sitemapPlugin = () => ({
  name: "generate-sitemap",
  apply: "build" as const,
  generateBundle(this: any) {
    const urls = SITEMAP_PATHS.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n");
    this.emitFile({
      type: "asset",
      fileName: "sitemap.xml",
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages support - uncomment base if deploying to a repo subdirectory
 base: '/priyata-universe/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), sitemapPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.GITHUB_SHA || process.env.npm_package_version || "dev")
  },
  build: {
    // Optimize for GitHub Pages
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query'],
          radix: ['@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-tooltip'],
        },
      },
    },
  },
}));
