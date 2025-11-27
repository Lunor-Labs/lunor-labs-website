// src/pages/BlogPage.tsx
import React, { useEffect, useState } from 'react';

import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import ArticleCard from '../components/blog/ArticleCard';
import ArticleFilter from '../components/blog/ArticleFilter';
import { Article } from '../types';
import { fetchArticles as fetchNotionArticles } from '../utils/notion'; // existing Notion utility
import { articles as sampleArticles } from '../data/articles';

// Define a type for RSS feed items that we'll transform to Article
type FeedItem = {
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

const NOTION_DATABASE_ID = '26ea0d7ead1580f99d8e000cd6646b70'; // keep if you use Notion

// Helper function to extract first image from HTML content
const extractImageFromContent = (content: string): string => {
  if (!content) return '/api/placeholder/400/250';
  
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }
  
  // Fallback placeholder
  return '/api/placeholder/400/250';
};

const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper: normalize Notion article shape into our Article type
  const normalizeNotion = (n: Article): Article => {
    return {
      id: n.id || Math.floor(Math.random() * 100000),
      title: n.title || 'Untitled',
      excerpt: n.excerpt || '',
      content: n.content || '',
      author: n.author || 'Lunor Labs',
      date: n.date || new Date().toISOString(),
      image: n.image || '/api/placeholder/400/250',
      category: n.category || 'General',
      slug: n.slug || n.title?.toLowerCase().replace(/\s+/g, '-') || 'untitled'
    };
  };

  // Helper: normalize feed JSON item into Article
  const normalizeFeedItem = (i: FeedItem): Article => ({
    id: Math.floor(Math.random() * 100000),
    title: i.title || 'Untitled',
    excerpt: i.excerpt || '',
    content: i.content || '',
    author: 'Lunor Labs',
    date: i.date || i.pubDate || new Date().toISOString(),
    image: i.thumbnail || '/api/placeholder/400/250',
    category: 'General',
    slug: i.slug || (i.title || 'untitled').toLowerCase().replace(/\s+/g, '-')
  });

  // Real-time article fetching function
  const fetchLatestArticles = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      // Try Notion first
      try {
        const notionArticles = await fetchNotionArticles(NOTION_DATABASE_ID);
        if (Array.isArray(notionArticles) && notionArticles.length > 0) {
          const normalized = notionArticles.map(normalizeNotion);
          setArticles(normalized);
          setFilteredArticles(normalized);
          setLastFetched(new Date());
          console.log(`✅ Loaded ${normalized.length} articles from Notion`);
          return;
        }
      } catch (err) {
        console.warn('Notion fetch failed, trying Medium RSS:', err);
      }

      // Enhanced Medium RSS fetching with multiple proxies for better reliability
      const corsProxies = [
        'https://api.rss2json.com/v1/api.json?rss_url=',
        'https://api.allorigins.win/get?url=',
      ];

      let success = false;
      
      for (const corsProxy of corsProxies) {
        try {
          console.log(`🔄 Trying Medium RSS via: ${corsProxy}`);
          const mediumRssUrl = 'https://medium.com/feed/@yasith.banula06';
          
          let proxyUrl: string;
          let parseResponse: (json: any) => any[];
          
          if (corsProxy.includes('rss2json')) {
            proxyUrl = `${corsProxy}${encodeURIComponent(mediumRssUrl)}`;
            parseResponse = (json: any) => json.status === 'ok' ? json.items : [];
          } else if (corsProxy.includes('allorigins')) {
            proxyUrl = `${corsProxy}${encodeURIComponent(mediumRssUrl)}`;
            parseResponse = (json: any) => {
              try {
                const rssData = JSON.parse(json.contents);
                return rssData.items || [];
              } catch {
                return [];
              }
            };
          } else {
            continue; // Skip unknown proxy types
          }
          
          const res = await fetch(proxyUrl, {
            cache: 'no-cache',
            headers: {
              'Accept': 'application/json',
            }
          });
          
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          
          const json = await res.json();
          const items = parseResponse(json);
          
          if (items && items.length > 0) {
            const mediumItems = items.map((item: any, index: number) => {
              const cleanTitle = item.title || `Article ${index + 1}`;
              const slug = cleanTitle
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
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
            
            setArticles(mediumItems);
            setFilteredArticles(mediumItems);
            setLastFetched(new Date());
            console.log(`✅ Loaded ${mediumItems.length} real-time articles from Medium`);
            success = true;
            break;
          }
        } catch (err) {
          console.warn(`❌ Proxy ${corsProxy} failed:`, err);
          continue;
        }
      }

      if (!success) {
        throw new Error('All Medium RSS sources failed');
      }

    } catch (err) {
      console.error('❌ Failed to fetch latest articles:', err);
      
      // Fallback to local/sample articles
      try {
        const res = await fetch('/articles.json', { cache: 'no-cache' });
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json.items) ? json.items : [];
          const normalized = items.map(normalizeFeedItem);
          setArticles(normalized);
          setFilteredArticles(normalized);
          console.log('📁 Loaded articles from local cache');
        } else {
          throw new Error('Local cache unavailable');
        }
      } catch {
        console.log('📝 Using sample articles as final fallback');
        setArticles(sampleArticles);
        setFilteredArticles(sampleArticles);
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Auto-refresh articles every 5 minutes for real-time updates
  useEffect(() => {
    fetchLatestArticles();
    
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing articles...');
      fetchLatestArticles(true);
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(refreshInterval);
  }, []);

  // handler for ArticleFilter -> just replace filteredArticles
  const handleFilter = (next: Article[]) => {
    setFilteredArticles(next);
  };

  if (error) {
    return (
      <Layout>
        <PageHeader
          title="Blog & Resources"
          subtitle="Helpful insights and guides for Sri Lankan entrepreneurs navigating the digital world."
        />
        <section className="py-20 bg-white dark:bg-gray-900">
          <Container>
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2 text-brand-dark dark:text-white">
                {error}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Please try again later.
              </p>
            </div>
          </Container>
        </section>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <PageHeader
          title="Blog & Resources"
          subtitle="Helpful insights and guides for Sri Lankan entrepreneurs navigating the digital world."
        />
        <section className="py-20 bg-white dark:bg-gray-900">
          <Container>
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2 text-brand-dark dark:text-white">
                Loading blog posts...
              </h3>
            </div>
          </Container>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="Blog & Resources"
        subtitle="Helpful insights and guides for Sri Lankan entrepreneurs navigating the digital world."
      />

      <section className="py-20 bg-white dark:bg-gray-900">
        <Container>
          {/* Real-time Updates Status */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {lastFetched ? `Last updated: ${lastFetched.toLocaleTimeString()}` : 'Loading latest articles...'}
              </span>
            </div>
            
            <button
              onClick={() => fetchLatestArticles(true)}
              disabled={isRefreshing || isLoading}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-brand-amber hover:text-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>

          {/* ArticleFilter expects `articles` and onFilter callback */}
          <ArticleFilter articles={articles} onFilter={handleFilter} />

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2 text-brand-dark dark:text-white">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </Container>
      </section>
    </Layout>
  );
};

export default BlogPage;
