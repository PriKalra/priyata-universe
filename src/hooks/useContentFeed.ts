import { useState, useEffect } from 'react';
import { fetchHeyWorldRSS, convertRSSDateToISO } from '@/utils/rssParser';

interface ContentItem {
  type: string;
  title: string;
  excerpt: string;
  link: string;
  source: string;
  date: string;
  size?: string;
  audioLength?: string;
  audioUrl?: string;
  image?: string;
  views?: number;
}

interface ContentFeed {
  lastUpdated: string;
  content: ContentItem[];
}

export function useContentFeed() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      try {
        // Cache-bust the static JSON fetch
        const url = new URL(`${import.meta.env.BASE_URL}content-feed.json`, location.origin);
        url.searchParams.set("v", __APP_VERSION__ || Date.now().toString());
        
        // Fetch both sources in parallel for efficiency
        const [staticFeed, heyPosts] = await Promise.allSettled([
          fetch(url.toString(), { cache: 'no-store' }).then(res => res.ok ? res.json() : null),
          fetchHeyWorldRSS('priyata')
        ]);

        if (!isMounted) return;

        // Collect all content items
        const allItems: ContentItem[] = [];

        // Add static feed content (BMC posts)
        if (staticFeed.status === 'fulfilled' && staticFeed.value?.content) {
          allItems.push(...staticFeed.value.content);
        }

        // Add fresh Hey World posts
        if (heyPosts.status === 'fulfilled' && heyPosts.value.length > 0) {
          const heyContent: ContentItem[] = heyPosts.value.slice(0, 5).map((post, index) => ({
            type: 'blog',
            title: post.title,
            excerpt: post.description,
            link: post.link,
            source: 'Hey World',
            date: convertRSSDateToISO(post.pubDate),
            size: index === 0 ? 'large' : 'small',
            image: post.image,
          }));
          allItems.push(...heyContent);
        }

        // Deduplicate by link and sort by date
        const byLink = new Map<string, ContentItem>();
        allItems.forEach(item => {
          if (!byLink.has(item.link) || new Date(item.date) > new Date(byLink.get(item.link)!.date)) {
            byLink.set(item.link, item);
          }
        });

        const sortedContent = Array.from(byLink.values()).sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        if (sortedContent.length === 0) {
          throw new Error('No content available');
        }

        setContent(sortedContent);
        setError(null);
      } catch (err) {
        console.error('Error loading content:', err);
        setError('Unable to load latest work. Please try again later.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return { content, loading, error };
}

