// scripts/fetch-content.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { parse as parseHTML } from "node-html-parser";
import { XMLParser } from "fast-xml-parser";
import crypto from "node:crypto";

// ---------- Config ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_PATH = path.join(__dirname, "..", "public", "content-feed.json");
const STATE_PATH = path.join(__dirname, ".cache-state.json");

const SOURCES = {
  hey: {
    name: "Hey World",
    feed: "https://world.hey.com/priyata/feed",
    site: "https://world.hey.com/priyata",
  },
  bmc: {
    name: "Buy Me a Coffee",
    site: "https://buymeacoffee.com/priyata",
  },
};

const FETCH_OPTS = {
  timeoutMs: 12_000,
  retries: 2,
  backoffMs: 800,
  ua: "priyata-universe-bot (+https://prikalra.github.io/priyata-universe/) node/20",
};

// ---------- tiny fetch with timeout + retries ----------
async function httpGet(url, headers = {}) {
  for (let attempt = 0; attempt <= FETCH_OPTS.retries; attempt++) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), FETCH_OPTS.timeoutMs);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": FETCH_OPTS.ua,
          ...headers,
        },
        redirect: "follow",
        signal: controller.signal,
      });
      clearTimeout(t);
      if (res.status === 304) return { status: 304, headers: res.headers, text: "" };
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      const text = await res.text();
      return { status: res.status, headers: res.headers, text };
    } catch (e) {
      clearTimeout(t);
      if (attempt === FETCH_OPTS.retries) throw e;
      await delay(FETCH_OPTS.backoffMs * (attempt + 1));
    }
  }
}

// ---------- simple state (ETag/Last-Modified) ----------
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
function sha(input) {
  return crypto.createHash("sha1").update(input).digest("hex");
}
function toISO(d) {
  try {
    return new Date(d).toISOString().split('T')[0];
  } catch {
    return null;
  }
}

// ---------- HEY World (Atom feed) ----------
async function fetchHey(state) {
  const url = SOURCES.hey.feed;
  const key = `hey:${url}`;
  const condHeaders = {};
  if (state[key]?.etag) condHeaders["If-None-Match"] = state[key].etag;
  if (state[key]?.lm) condHeaders["If-Modified-Since"] = state[key].lm;

  const res = await httpGet(url, condHeaders);
  if (res.status === 304) {
    return state[key].cache;
  }

  const parser = new XMLParser({ ignoreAttributes: false });
  const xml = parser.parse(res.text);

  const entries = xml?.feed?.entry?.map((e) => {
    const title = e.title || "";
    const link = Array.isArray(e.link)
      ? e.link.find((l) => l["@_rel"] === "alternate")?.["@_href"]
      : e.link?.["@_href"];
    const date = e.updated || e.published || e["dc:date"] || null;

    const html = e.content?.["#text"] || e.content || "";
    const root = parseHTML(String(html));
    const firstImg = root.querySelector("img")?.getAttribute("src") || e["media:content"]?.["@_url"] || null;
    const summary = (root.querySelector("p")?.textContent || "").substring(0, 240);

    return {
      type: "blog",
      title,
      excerpt: summary,
      link: link || SOURCES.hey.site,
      source: SOURCES.hey.name,
      date: toISO(date),
      size: "small",
      image: firstImg,
    };
  }) ?? [];

  state[key] = {
    etag: res.headers.get("etag") || null,
    lm: res.headers.get("last-modified") || null,
    cache: entries,
  };
  return entries;
}

// ---------- Buy Me a Coffee (manual curated posts) ----------
function getBMCPosts() {
  return [
    {
      type: "image",
      title: "Geometry of Clarity Bloom",
      excerpt: "A visual exploration of clarity emerging through geometric patterns and artistic expression.",
      link: "https://buymeacoffee.com/priyata/the-mid",
      source: "Buy Me a Coffee",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/6474503/2026/03/26/010904_1774487347169_1000137426.png.png",
      date: "2026-03-25",
      size: "large"
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
      size: "medium"
    },
    {
      type: "image",
      title: "Geometry of Control",
      excerpt: "A visual reflection on structure, control, and the patterns that govern systems and thought.",
      link: "https://buymeacoffee.com/priyata/geometry-control",
      source: "Buy Me a Coffee",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/6474503/2026/02/13/003355_1770942835373_Media_1.jpg.jpeg",
      date: "2026-02-12",
      size: "large"
    },
    {
      type: "image",
      title: "The Intangible Asset",
      excerpt: "Exploring the value of intangible assets through visual art and reflection.",
      link: "https://buymeacoffee.com/priyata/the-intangible-asset-4384017",
      source: "Buy Me a Coffee",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/6474503/2026/01/13/025609_1768272968679_1000127957.jpg.jpeg",
      date: "2026-01-12",
      size: "large"
    },
    {
      type: "image",
      title: "Recursive Surrender (Seed: 12345)",
      excerpt: "A quantum emergence visualization exploring the intersection of computational science and consciousness.",
      link: "https://buymeacoffee.com/priyata/recursive-surrender-seed-12345",
      source: "Buy Me a Coffee",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/6474503/2025/10/30/163350_1761842041931_quantum_emergence_1.jpg.jpeg",
      date: "2025-10-30",
      size: "large"
    },
    {
      type: "image",
      title: "Suffering",
      excerpt: "A visual reflection on the intersection of computational science and human experience.",
      link: "https://buymeacoffee.com/priyata/suffering-4118280",
      source: "Buy Me a Coffee",
      image: "https://cdn.buymeacoffee.com/uploads/project_updates/6474503/2025/10/19/162258_1760890979453_1000118344.jpg.jpeg",
      date: "2025-10-19",
      size: "large"
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
      size: "medium"
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
      size: "medium"
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
      size: "medium"
    }
  ];
}

// ---------- main ----------
async function main() {
  const state = loadState();

  console.log("Fetching Hey World content...");
  const heyItems = await fetchHey(state).catch(err => {
    console.error("Hey World fetch failed:", err);
    return [];
  });

  console.log(`Fetched ${heyItems.length} Hey World posts`);

  const bmcItems = getBMCPosts();
  console.log(`Using ${bmcItems.length} Buy Me a Coffee posts`);

  const allContent = [...heyItems, ...bmcItems];

  // Dedupe by link
  const seen = new Set();
  const deduped = allContent.filter((it) => {
    if (seen.has(it.link)) return false;
    seen.add(it.link);
    return true;
  });

  // Sort by date descending
  const sorted = deduped.sort((a, b) => {
    const dateA = a.date || "";
    const dateB = b.date || "";
    return dateB.localeCompare(dateA);
  });

  // Persist state + feed
  saveState(state);
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  
  const output = {
    lastUpdated: new Date().toISOString(),
    content: sorted
  };
  
  fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));
  console.log(`✓ Wrote ${sorted.length} items -> ${path.relative(process.cwd(), OUT_PATH)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
