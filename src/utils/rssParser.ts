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
  
  // Try direct fetch first, fallback to proxy
  const urls = [
    rssUrl,
    `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`,
    `https://cors-anywhere.herokuapp.com/${rssUrl}`
  ];

  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(url, { 
        cache: 'default',
        signal: controller.signal,
        headers: url === rssUrl ? {} : {}
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch RSS: ${res.status}`);
      }

      let xmlText: string;
      
      // Handle different response formats
      if (url === rssUrl) {
        // Direct fetch returns XML
        xmlText = await res.text();
      } else {
        // Proxy returns JSON
        const data = await res.json();
        xmlText = data.contents as string;
        
        // Handle base64-encoded data URIs
        if (xmlText.startsWith('data:')) {
          const base64Match = xmlText.match(/base64,(.+)$/);
          if (base64Match) {
            xmlText = atob(base64Match[1]);
          }
        }
      }

      if (!xmlText) continue;

      // Parse the XML content
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      // Bail out on parser errors
      if (xmlDoc.querySelector('parsererror')) continue;

      const entries = xmlDoc.querySelectorAll('entry');
      if (entries.length === 0) continue;
      
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
      console.error(`Error fetching from ${url}:`, error);
      continue;
    }
  }
  
  // All attempts failed
  console.error('All Hey World RSS fetch attempts failed');
  return [];
}

export function convertRSSDateToISO(rssDate: string): string {
  try {
    const date = new Date(rssDate);
    return date.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}
