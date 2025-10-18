interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
}

export async function fetchHeyWorldRSS(username: string): Promise<RSSItem[]> {
  try {
    // Hey World RSS feed URL
    const rssUrl = `https://world.hey.com/${username}/feed.atom`;
    
    // Use a CORS proxy for RSS fetching
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    // Parse the XML content
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
    
    const entries = xmlDoc.querySelectorAll('entry');
    const items: RSSItem[] = [];
    
    entries.forEach((entry) => {
      const title = entry.querySelector('title')?.textContent || '';
      const link = entry.querySelector('link')?.getAttribute('href') || '';
      const pubDate = entry.querySelector('published')?.textContent || '';
      const content = entry.querySelector('content')?.textContent || '';
      const summary = entry.querySelector('summary')?.textContent || '';
      
      // Extract plain text from HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content || summary;
      const description = tempDiv.textContent || tempDiv.innerText || '';
      
      items.push({
        title,
        link,
        pubDate,
        description: description.substring(0, 200) + '...',
        content
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
