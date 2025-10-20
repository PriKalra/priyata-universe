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

    async function loadStaticFeed() {
      try {
        const feedUrl = `${import.meta.env.BASE_URL}content-feed.json`;
        const res = await fetch(feedUrl, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Static feed not found');
        const data: ContentFeed = await res.json();
        if (!isMounted) return;
        setContent(data.content || []);
        setLoading(false); // Show static content immediately for fast load
      } catch (e) {
        // If static feed is missing, keep loading state until fallback finishes
        console.warn('Static content-feed.json not available yet. Falling back to live fetch.');
      }
    }

    async function enrichWithHeyPosts() {
      try {
        const hey = await fetchHeyWorldRSS('priyata');
        const heyContent: ContentItem[] = hey.slice(0, 5).map((post, index) => ({
          type: 'blog',
          title: post.title,
          excerpt: post.description,
          link: post.link,
          source: 'Hey World',
          date: convertRSSDateToISO(post.pubDate),
          size: index === 0 ? 'large' : 'small',
          image: (post as any).image,
        }));

        if (!isMounted) return;

        // Merge without duplicates (by link)
        const byLink = new Map<string, ContentItem>();
        [...heyContent, ...content].forEach((it) => byLink.set(it.link, it));
        const merged = Array.from(byLink.values()).sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setContent(merged);
        setLoading(false);
      } catch (err) {
        console.error('Error enriching with Hey posts:', err);
        if (isMounted && content.length === 0) {
          setError('Failed to load content');
          setLoading(false);
        }
      }
    }

    // 1) Load static feed quickly
    loadStaticFeed().finally(() => {
      // 2) In background, fetch Hey posts to ensure blog items appear even before cron runs
      enrichWithHeyPosts();
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { content, loading, error };
}

