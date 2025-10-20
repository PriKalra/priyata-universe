interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
  image?: string;
}

export async function fetchHeyWorldRSS(username: string): Promise<RSSItem[]> {
  const rssUrl = `https://world.hey.com/${username}/feed.atom`;
  const getUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

  try {
    // Fetch with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(getUrl, { 
      cache: 'default',
      signal: controller.signal 
    });
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch RSS: ${res.status}`);
    }

    const data = await res.json();
    let xmlText = data.contents as string;
    
    // Handle base64-encoded data URIs
    if (xmlText.startsWith('data:')) {
      const base64Match = xmlText.match(/base64,(.+)$/);
      if (base64Match) {
        xmlText = atob(base64Match[1]);
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

      // Extract plain text and first image from HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content || summary;
      const description = (tempDiv.textContent || (tempDiv as any).innerText || '').trim();
      const imgEl = tempDiv.querySelector('img');
      const image = imgEl ? imgEl.getAttribute('src') || undefined : undefined;

      items.push({
        title,
        link,
        pubDate,
        description: description.substring(0, 200) + (description.length > 200 ? '…' : ''),
        content,
        image,
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
