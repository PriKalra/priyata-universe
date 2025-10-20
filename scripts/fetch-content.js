import fetch from 'node-fetch';
import { DOMParser } from 'xmldom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Buy Me a Coffee posts (manual updates still needed for new audio posts)
const BMC_POSTS = [
  {
    type: "audio",
    title: "Paper2Agent: Reimagining Research Papers",
    excerpt: "Exploring how research papers can be transformed into interactive and reliable AI agents.",
    link: "https://buymeacoffee.com/priyata/paper2agent-reimagining-research-papers-as-interactive-reliable-ai-agents",
    source: "Buy Me a Coffee",
    audioLength: "34:00",
    audioUrl: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/10/30d206c46073aac17f7c86b0e3c17b45.mp3",
    image: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/10/30d206c46073aac17f7c86b0e3c17b45.jpg",
    date: "2025-10-06",
    views: 54,
    size: "medium"
  },
  {
    type: "audio",
    title: "LLMs for Data Extraction in Toxicology",
    excerpt: "Implications and lessons learned from using LLMs in toxicology data extraction.",
    link: "https://buymeacoffee.com/priyata/large-language-models-data-extraction-toxicology-implications-lessons-learned",
    source: "Buy Me a Coffee",
    audioLength: "18:54",
    audioUrl: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/09/203b4664c1490ef46d800870a959b3c5.mp3",
    image: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/09/203b4664c1490ef46d800870a959b3c5.jpg",
    date: "2025-09-09",
    views: 84,
    size: "medium"
  },
  {
    type: "audio",
    title: "Machine Learning Automation of PKPD Modelling",
    excerpt: "Exploring the intersection of machine learning and pharmacokinetic-pharmacodynamic modeling.",
    link: "https://buymeacoffee.com/priyata/machine-learning-automation-pkpd-modelling",
    source: "Buy Me a Coffee",
    audioLength: "20:09",
    audioUrl: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/08/4a7ec3e8b391f35c0a4ded98a734b078.mp3",
    image: "https://cdn.buymeacoffee.com/uploads/project_updates/2025/08/4a7ec3e8b391f35c0a4ded98a734b078.jpg",
    date: "2025-08-07",
    views: 148,
    size: "medium"
  }
];

async function fetchHeyWorldRSS(username) {
  const rssUrl = `https://world.hey.com/${username}/feed.atom`;
  const getUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

  try {
    const res = await fetch(getUrl, { timeout: 10000 });
    
    if (!res.ok) {
      console.error('Failed to fetch RSS feed');
      return [];
    }

    const data = await res.json();
    let xmlText = data.contents;
    
    // Handle base64-encoded data URIs
    if (xmlText.startsWith('data:')) {
      const base64Match = xmlText.match(/base64,(.+)$/);
      if (base64Match) {
        xmlText = Buffer.from(base64Match[1], 'base64').toString('utf-8');
      }
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    const entries = Array.from(xmlDoc.getElementsByTagName('entry'));
    const items = [];

    entries.forEach((entry) => {
      const title = entry.getElementsByTagName('title')[0]?.textContent || '';
      const link = entry.getElementsByTagName('link')[0]?.getAttribute('href') || '';
      const published = entry.getElementsByTagName('published')[0]?.textContent || 
                       entry.getElementsByTagName('updated')[0]?.textContent || '';
      const content = entry.getElementsByTagName('content')[0]?.textContent || '';
      const summary = entry.getElementsByTagName('summary')[0]?.textContent || '';

      // Strip HTML tags for description
      const description = (content || summary)
        .replace(/<[^>]*>/g, '')
        .trim()
        .substring(0, 200);

      items.push({
        title,
        link,
        pubDate: published,
        description: description + (description.length >= 200 ? '…' : ''),
      });
    });

    return items;
  } catch (error) {
    console.error('Error fetching Hey World RSS:', error);
    return [];
  }
}

function convertRSSDateToISO(rssDate) {
  try {
    const date = new Date(rssDate);
    return date.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

async function main() {
  console.log('Fetching Hey World content...');
  const heyWorldPosts = await fetchHeyWorldRSS('priyata');
  
  const heyWorldContent = heyWorldPosts.slice(0, 5).map((post, index) => ({
    type: "blog",
    title: post.title,
    excerpt: post.description,
    link: post.link,
    source: "Hey World",
    date: convertRSSDateToISO(post.pubDate),
    size: index === 0 ? "large" : "small"
  }));

  console.log(`Fetched ${heyWorldContent.length} Hey World posts`);

  // Merge content
  const allContent = [...heyWorldContent, ...BMC_POSTS];
  
  // Sort by date
  const sortedContent = allContent.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Write to public folder
  const outputPath = path.join(__dirname, '..', 'public', 'content-feed.json');
  const output = {
    lastUpdated: new Date().toISOString(),
    content: sortedContent
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`✓ Content written to ${outputPath}`);
  console.log(`Total items: ${sortedContent.length}`);
}

main().catch(console.error);
