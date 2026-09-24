// scripts/fetch-content.mjs
// Syncs the site's public/content-feed.json with the latest posts from
//   - Hey World blog  (https://world.hey.com/priyata)        -> scraped article cards
//   - Buy Me a Coffee (https://buymeacoffee.com/priyata)     -> embedded page JSON
// Also regenerates public/llms.txt and public/agents.txt so AI agents always
// see the latest content together with Priyata's citation requirements.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { parse as parseHTML } from "node-html-parser";

// ---------- Config ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_PATH = path.join(__dirname, "..", "public", "content-feed.json");
const LLMS_PATH = path.join(__dirname, "..", "public", "llms.txt");
const AGENTS_PATH = path.join(__dirname, "..", "public", "agents.txt");
const STATE_PATH = path.join(__dirname, ".cache-state.json");

const SITE_URL = "https://prikalra.github.io/priyata-universe/";

const SOURCES = {
  hey: {
    name: "Hey World",
    site: "https://world.hey.com/priyata",
  },
  bmc: {
    name: "Buy Me a Coffee",
    site: "https://buymeacoffee.com/priyata",
  },
};

const FETCH_OPTS = {
  timeoutMs: 15_000,
  retries: 2,
  backoffMs: 900,
  // Browser-like UA: both sources serve reduced/blocked responses to obvious bots.
  ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 priyata-universe-content-sync",
};

// ---------- tiny fetch with timeout + retries ----------
async function httpGet(url, headers = {}) {
  for (let attempt = 0; attempt <= FETCH_OPTS.retries; attempt++) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), FETCH_OPTS.timeoutMs);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "User-Agent": FETCH_OPTS.ua, Accept: "text/html,application/xhtml+xml", ...headers },
        redirect: "follow",
        signal: controller.signal,
      });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return { status: res.status, headers: res.headers, text: await res.text() };
    } catch (e) {
      clearTimeout(t);
      if (attempt === FETCH_OPTS.retries) throw e;
      await delay(FETCH_OPTS.backoffMs * (attempt + 1));
    }
  }
}

// ---------- persistent state (last good snapshots per source) ----------
function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
  } catch {
    return {};
  }
}
function saveState(state) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

// ---------- helpers ----------
function toISODate(d) {
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? null : dt.toISOString().split("T")[0];
}
function cleanText(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}
function stripHtml(s) {
  return cleanText((s || "").replace(/<[^>]*>/g, " "));
}
function truncate(s, n) {
  const t = cleanText(s);
  return t.length > n ? t.slice(0, n - 1).trimEnd() + "…" : t;
}
function secondsToMmSs(sec) {
  const s = Number(sec);
  if (!Number.isFinite(s) || s <= 0) return undefined;
  const m = Math.floor(s / 60);
  const r = Math.round(s % 60);
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

// ---------- HEY World: scrape article cards ----------
// Card structure (verified 2026-09):
//   <article class="card card--list">
//     <div class="card__date ..."><span>May 31, 2026</span></div>
//     <h2 class="hdg hdg--x-large ...">Title</h2>
//     <div class="card__content">Excerpt…</div>
//     <a class="card__link" href="/priyata/slug-hash">Read more</a>
//   </article>
async function fetchHey(state) {
  const url = SOURCES.hey.site;
  const key = "hey:index";

  try {
    const res = await httpGet(url);
    const root = parseHTML(res.text);
    const cards = root.querySelectorAll("article.card--list");
    const entries = [];

    for (const card of cards) {
      const linkEl = card.querySelector("a.card__link");
      const titleEl = card.querySelector("h2.hdg");
      const dateEl = card.querySelector(".card__date span");
      const excerptEl = card.querySelector(".card__content");
      const href = linkEl?.getAttribute("href");
      if (!href || !titleEl) continue;

      entries.push({
        type: "blog",
        title: cleanText(titleEl.text),
        excerpt: truncate(excerptEl?.text || "", 260),
        link: href.startsWith("http") ? href : `https://world.hey.com${href}`,
        source: SOURCES.hey.name,
        date: toISODate(dateEl?.text || ""),
        size: "small",
        image: null,
      });
    }

    if (entries.length > 0) {
      state[key] = { fetchedAt: new Date().toISOString(), cache: entries };
      console.log(`  Hey World: parsed ${entries.length} posts from live page`);
      return entries;
    }
    throw new Error("no article cards found on Hey page");
  } catch (err) {
    console.warn(`  Hey World live fetch failed (${err.message})`);
    if (state[key]?.cache?.length) {
      console.warn("  -> using last good Hey snapshot from state");
      return state[key].cache;
    }
    console.warn("  -> using built-in Hey fallback list");
    return getHeyFallback();
  }
}

function getHeyFallback() {
  return [
    { type: "blog", title: "Reflections on the Maturing Science of Pharmacometrics: Insights from PAGE 2026 in Dubrovnik", excerpt: "Arrived with high expectations shaped by years of following the field from afar. What I encountered surpassed them: a community not only d…", link: "https://world.hey.com/priyata/reflections-on-the-maturing-science-of-pharmacometrics-insights-from-page-2026-in-dubrovnik-c73fc7b0", source: "Hey World", date: "2026-06-27", size: "small", image: null },
    { type: "blog", title: "The Agentic Shift in MIDD: Verifying becomes the most valuable skill", excerpt: "The core mental model for Model-Informed Drug Development has been quite straightforward. It rewarded scientists who could build robust models…", link: "https://world.hey.com/priyata/the-agentic-shift-in-midd-verifying-becomes-the-most-valuable-skill-13d3b1d0", source: "Hey World", date: "2026-05-31", size: "small", image: null },
    { type: "blog", title: "The Truths We Learn in the Foam", excerpt: "Reflecting on career as a scientist and future as a leader, realizing that friction isn't just bad luck — it's a mathematical certainty of the systems we live in.", link: "https://world.hey.com/priyata/the-truths-we-learn-in-the-foam-6329e7ce", source: "Hey World", date: "2026-04-02", size: "small", image: null },
  ];
}

// ---------- Buy Me a Coffee: parse embedded Inertia page JSON ----------
// The profile page embeds <script data-page="app" type="application/json">
// with props.featured_posts.data = latest posts (verified 2026-09).
async function fetchBMC(state) {
  const key = "bmc:featured";

  try {
    const res = await httpGet(SOURCES.bmc.site);
    const match = res.text.match(/<script data-page="app" type="application\/json">([\s\S]*?)<\/script>/);
    if (!match) throw new Error("embedded page JSON not found");

    const pageData = JSON.parse(match[1]);
    const posts = pageData?.props?.featured_posts?.data;
    if (!Array.isArray(posts) || posts.length === 0) throw new Error("no featured posts in page JSON");

    const entries = posts.map(mapBMCPost).filter(Boolean);
    state[key] = { fetchedAt: new Date().toISOString(), cache: entries };
    console.log(`  Buy Me a Coffee: parsed ${entries.length} latest posts from live page`);
    return entries;
  } catch (err) {
    console.warn(`  Buy Me a Coffee live fetch failed (${err.message})`);
    if (state[key]?.cache?.length) {
      console.warn("  -> using last good BMC snapshot from state");
      return state[key].cache;
    }
    console.warn("  -> BMC live posts unavailable, archive below still provides coverage");
    return [];
  }
}

function mapBMCPost(p) {
  if (!p?.project_update_heading || !p?.project_update_slug) return null;

  const desc = p.post_description_json || {};
  const audioContent = desc?.type === "doc-audio" ? desc.content : null;
  const audioUrl = audioContent?.path || undefined;
  const image = p.featured_image_url || null;
  const slug = p.project_slug || "priyata";

  let type = "blog";
  if (audioUrl) type = "audio";
  else if (image) type = "image";

  return {
    type,
    title: cleanText(p.project_update_heading),
    excerpt: truncate(stripHtml(p.project_update_short_description || p.project_update_description || ""), 260),
    link: `https://buymeacoffee.com/${slug}/${p.project_update_slug}`,
    source: SOURCES.bmc.name,
    date: toISODate(p.project_update_created_on),
    size: type === "image" ? "large" : type === "audio" ? "medium" : "small",
    image,
    ...(audioUrl ? { audioUrl, audioLength: secondsToMmSs(audioContent?.duration) } : {}),
    ...(Number.isFinite(p.view_count) ? { views: p.view_count } : {}),
  };
}

// ---------- Curated BMC archive ----------
// Older posts that fall off the live "featured" window. New posts are picked
// up automatically by fetchBMC(); keep this list for depth. Deduped by link.
function getBMCArchive() {
  return [
    {
      type: "image",
      title: "Liability of Light",
      excerpt: "When something looks lush and successful, what invisible structures made it possible, and what hidden liabilities came with it? Every flourish implies a formula and every bloom may carry a cost.",
      link: "https://buymeacoffee.com/priyata/lia-4696198",
      source: "Buy Me a Coffee",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/6474503/2026/04/22/232118_1776900078438_1000141523.png.png",
      date: "2026-04-22",
      size: "large",
      views: 194,
    },
    {
      type: "image",
      title: "Geometry of Clarity Bloom",
      excerpt: "A visual exploration of clarity emerging through geometric patterns and artistic expression.",
      link: "https://buymeacoffee.com/priyata/the-mid",
      source: "Buy Me a Coffee",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/6474503/2026/03/26/010904_1774487347169_1000137426.png.png",
      date: "2026-03-25",
      size: "large",
    },
    {
      type: "audio",
      title: "LLM + ML + PBPK + Pharmacometrics",
      excerpt: "Exploring the convergence of large language models, machine learning, PBPK modeling, and pharmacometrics.",
      link: "https://buymeacoffee.com/priyata/llm-ml-pbpk-pharmacometrics",
      source: "Buy Me a Coffee",
      audioLength: "01:54",
      audioUrl: "https://cdn.buymeacoffee.com/uploads/project_updates/2026/02/6231735cd580d4e6d049788226403633.mp3",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/2026/02/6231735cd580d4e6d049788226403633.jpg",
      date: "2026-02-18",
      size: "medium",
    },
    {
      type: "image",
      title: "Geometry of Control",
      excerpt: "A visual reflection on structure, control, and the patterns that govern systems and thought.",
      link: "https://buymeacoffee.com/priyata/geometry-control",
      source: "Buy Me a Coffee",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/6474503/2026/02/13/003355_1770942835373_Media_1.jpg.jpeg",
      date: "2026-02-12",
      size: "large",
    },
    {
      type: "image",
      title: "The Intangible Asset",
      excerpt: "Exploring the value of intangible assets through visual art and reflection.",
      link: "https://buymeacoffee.com/priyata/the-intangible-asset-4384017",
      source: "Buy Me a Coffee",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/6474503/2026/01/13/025609_1768272968679_1000127957.jpg.jpeg",
      date: "2026-01-12",
      size: "large",
    },
    {
      type: "image",
      title: "Recursive Surrender (Seed: 12345)",
      excerpt: "A quantum emergence visualization exploring the intersection of computational science and consciousness.",
      link: "https://buymeacoffee.com/priyata/recursive-surrender-seed-12345",
      source: "Buy Me a Coffee",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/6474503/2025/10/30/163350_1761842041931_quantum_emergence_1.jpg.jpeg",
      date: "2025-10-30",
      size: "large",
    },
    {
      type: "image",
      title: "Suffering",
      excerpt: "A visual reflection on the intersection of computational science and human experience.",
      link: "https://buymeacoffee.com/priyata/suffering-4118280",
      source: "Buy Me a Coffee",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/6474503/2025/10/19/162258_1760890979453_1000118344.jpg.jpeg",
      date: "2025-10-19",
      size: "large",
    },
    {
      type: "audio",
      title: "Paper2Agent: Reimagining Research Papers",
      excerpt: "Exploring how research papers can be transformed into interactive and reliable AI agents.",
      link: "https://buymeacoffee.com/priyata/paper2agent-reimagining-research-papers-as-interactive-reliable-ai-agents",
      source: "Buy Me a Coffee",
      audioLength: "34:00",
      audioUrl: "https://cdn.buymeacoffee.com/uploads/project_updates/2024/10/30d206c46073aac17f7c86b0e3c17b45.mp3",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/2024/10/30d206c46073aac17b7c86b0e3c17b45.jpg",
      date: "2025-10-06",
      size: "medium",
    },
    {
      type: "audio",
      title: "LLMs for Data Extraction in Toxicology",
      excerpt: "Implications and lessons learned from using LLMs in toxicology data extraction.",
      link: "https://buymeacoffee.com/priyata/large-language-models-data-extraction-toxicology-implications-lessons-learned",
      source: "Buy Me a Coffee",
      audioLength: "18:54",
      audioUrl: "https://cdn.buymeacoffee.com/uploads/project_updates/2024/09/203b4664c1490ef46d800870a959b3c5.mp3",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/2024/09/203b4664c1490ef46d800870a959b3c5.jpg",
      date: "2025-09-09",
      size: "medium",
    },
    {
      type: "audio",
      title: "Machine Learning Automation of PKPD Modelling",
      excerpt: "Exploring the intersection of machine learning and pharmacokinetic-pharmacodynamic modeling.",
      link: "https://buymeacoffee.com/priyata/machine-learning-automation-pkpd-modelling",
      source: "Buy Me a Coffee",
      audioLength: "20:09",
      audioUrl: "https://cdn.buymeacoffee.com/uploads/project_updates/2024/08/4a7ec3e8b391f35c0a4ded98a734b078.mp3",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/2024/08/4a7ec3e8b391f35c0a4ded98a734b078.jpg",
      date: "2025-08-07",
      size: "medium",
    },
  ];
}
