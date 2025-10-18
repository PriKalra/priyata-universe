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

// Static Buy Me a Coffee posts (manual update required - no public API)
const BMC_POSTS: ContentItem[] = [
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

const CACHE_KEY = 'hey_world_content_cache';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

interface CachedData {
  content: ContentItem[];
  timestamp: number;
}

export function useContentFeed() {
  const [content, setContent] = useState<ContentItem[]>(BMC_POSTS); // Start with BMC posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const cachedData: CachedData = JSON.parse(cached);
            const age = Date.now() - cachedData.timestamp;
            
            if (age < CACHE_DURATION) {
              // Use cached data immediately
              setContent(cachedData.content);
              setLoading(false);
              return;
            }
          } catch (e) {
            // Invalid cache, continue to fetch
          }
        }
        
        // Fetch Hey World RSS
        const heyWorldPosts = await fetchHeyWorldRSS('priyata');
        
        // Convert RSS items to ContentItems (limit to 5 for speed)
        const heyWorldContent: ContentItem[] = heyWorldPosts.slice(0, 5).map((post, index) => ({
          type: "blog",
          title: post.title,
          excerpt: post.description,
          link: post.link,
          source: "Hey World",
          date: convertRSSDateToISO(post.pubDate),
          size: index === 0 ? "large" : "small"
        }));
        
        // Merge Hey World and Buy Me a Coffee content
        const allContent = [...heyWorldContent, ...BMC_POSTS];
        
        // Sort by date
        const sortedContent = allContent.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setContent(sortedContent);
        setLoading(false);
        
        // Cache the result
        try {
          const cacheData: CachedData = {
            content: sortedContent,
            timestamp: Date.now()
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } catch (e) {
          // Ignore cache errors
        }
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content');
        setLoading(false);
        
        // Fallback to Buy Me a Coffee posts only
        setContent(BMC_POSTS);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
}
