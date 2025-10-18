interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
}

export async function fetchHeyWorldRSS(username: string): Promise<RSSItem[]> {
  // Robust fetch that works on GitHub Pages (handles CORS)
  const rssUrl = `https://world.hey.com/${username}/feed.atom`;

  // Try the RAW endpoint first (simpler + CORS-enabled)
  const rawUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
  const getUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

  try {
    let xmlText: string | null = null;

    // Attempt RAW fetch
    try {
      const res = await fetch(rawUrl, { cache: 'no-cache' });
      if (res.ok) {
        xmlText = await res.text();
      }
    } catch (e) {
      // ignore and try JSON endpoint next
    }

    // Fallback to JSON endpoint if needed
    if (!xmlText) {
      const res = await fetch(getUrl, { cache: 'no-cache' });
      if (res.ok) {
        const data = await res.json();
        let contents = data.contents as string;
        
        // Handle base64-encoded data URIs
        if (contents.startsWith('data:')) {
          const base64Match = contents.match(/base64,(.+)$/);
          if (base64Match) {
            contents = atob(base64Match[1]);
          }
        }
        
        xmlText = contents;
      }
    }

    if (!xmlText) return [];

    // Parse the XML content
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Bail out on parser errors
    if (xmlDoc.querySelector('parsererror')) return [];

    const entries = xmlDoc.querySelectorAll('entry');
    const items: RSSItem[] = [];

    entries.forEach((entry) => {
      const title = entry.querySelector('title')?.textContent || '';
      const link = entry.querySelector('link')?.getAttribute('href') || '';
      const pubDate =
        entry.querySelector('published')?.textContent ||
        entry.querySelector('updated')?.textContent || '';
      const content = entry.querySelector('content')?.textContent || '';
      const summary = entry.querySelector('summary')?.textContent || '';

      // Extract plain text from HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content || summary;
      const description = (tempDiv.textContent || tempDiv.innerText || '').trim();

      items.push({
        title,
        link,
        pubDate,
        description: description.substring(0, 200) + (description.length > 200 ? '…' : ''),
        content,
      });
    });

    return items;
  } catch (error) {
    console.error('Error fetching Hey World RSS:', error);
    return [];
  }
}

export function convertRSSDateToISO(rssDate: string): string {
  try {
    const date = new Date(rssDate);
    return date.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}
