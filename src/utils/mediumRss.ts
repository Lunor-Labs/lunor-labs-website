import { Article } from '../types';

export type FeedItem = {
  id?: string;
  guid?: string;
  title?: string;
  link?: string;
  date?: string;
  pubDate?: string;
  excerpt?: string;
  content?: string;
  thumbnail?: string;
  tags?: string[];
  slug?: string;
};

export const extractImageFromContent = (content: string): string => {
  if (!content) return '/api/placeholder/400/250';
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i);
  return imgMatch?.[1] || '/api/placeholder/400/250';
};

export const normalizeFeedItem = (i: FeedItem): Article => ({
  id: Math.floor(Math.random() * 100000),
  title: i.title || 'Untitled',
  excerpt: i.excerpt || '',
  content: i.content || '',
  author: 'Lunor Labs',
  date: i.date || i.pubDate || new Date().toISOString(),
  image: i.thumbnail || extractImageFromContent(i.content || ''),
  category: 'General',
  slug: i.slug || (i.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
  link: i.link
});

export const fetchMediumArticles = async (): Promise<Article[]> => {
  const corsProxy = 'https://api.rss2json.com/v1/api.json?rss_url=';
  const mediumRssUrl = 'https://medium.com/feed/@yasith.banula06';
  const timestamp = Date.now();
  const proxyUrl = `${corsProxy}${encodeURIComponent(mediumRssUrl)}&cachebust=${timestamp}`;
  
  const res = await fetch(proxyUrl, {
    cache: 'no-cache',
    headers: { 'Accept': 'application/json' }
  });
  
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
  const json = await res.json();
  
  if (json.status === 'ok' && json.items?.length > 0) {
    return json.items.map((item: any, index: number) => {
      const cleanTitle = item.title || `Article ${index + 1}`;
      const slug = cleanTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      
      const rawContent = item.content || item.description || '';
      const cleanExcerpt = item.description?.replace(/<[^>]*>/g, '').substring(0, 300) + '...' || '';
      
      return normalizeFeedItem({
        id: item.guid || `medium-${index}`,
        title: cleanTitle,
        link: item.link,
        date: item.pubDate,
        excerpt: cleanExcerpt,
        content: rawContent,
        thumbnail: item.thumbnail || extractImageFromContent(rawContent),
        tags: item.categories || [],
        slug: slug
      });
    });
  }
  
  throw new Error('No articles found');
};