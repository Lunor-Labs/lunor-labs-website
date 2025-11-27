import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Layout from '../components/common/Layout';
import Container from '../components/common/Container';
import { Article } from '../types';
import { fetchArticles as fetchNotionArticles } from '../utils/notion';
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

const NOTION_DATABASE_ID = '26ea0d7ead1580f99d8e000cd6646b70';

// Helper function to extract first image from HTML content
const extractImageFromContent = (content: string): string => {
  if (!content) return '/api/placeholder/400/250';
  
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }
  
  return '/api/placeholder/400/250';
};

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const findArticle = async () => {
      if (!slug) {
        setError('Article not found');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Try Notion first
        try {
          const notionArticles = await fetchNotionArticles(NOTION_DATABASE_ID);
          if (Array.isArray(notionArticles) && notionArticles.length > 0) {
            const normalized = notionArticles.map(normalizeNotion);
            const foundArticle = normalized.find(a => a.slug === slug);
            if (foundArticle) {
              setArticle(foundArticle);
              setIsLoading(false);
              return;
            }
          }
        } catch (err) {
          console.warn('Notion fetch failed, trying other sources:', err);
        }

        // Try Medium RSS feed
        try {
          console.log('Trying Medium RSS feed via CORS proxy...');
          const corsProxy = 'https://api.rss2json.com/v1/api.json?rss_url=';
          const mediumRssUrl = 'https://medium.com/feed/@yasith.banula06';
          const proxyUrl = `${corsProxy}${encodeURIComponent(mediumRssUrl)}`;
          
          const res = await fetch(proxyUrl);
          if (!res.ok) throw new Error(`Failed to fetch Medium RSS (status ${res.status})`);
          
          const json = await res.json();
          if (json.status === 'ok' && Array.isArray(json.items) && json.items.length > 0) {
            const mediumItems = json.items.map((item: any, index: number) => {
              const cleanTitle = item.title || `Article ${index + 1}`;
              const itemSlug = cleanTitle
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
              
              // Clean and preserve content better
              const rawContent = item.content || item.description || '';
              const cleanExcerpt = item.description?.replace(/<[^>]*>/g, '').substring(0, 300) + '...' || '';
              
              return normalizeFeedItem({
                id: item.guid || `medium-${index}`,
                title: cleanTitle,
                link: item.link,
                date: item.pubDate,
                excerpt: cleanExcerpt,
                content: rawContent, // Keep full content with HTML for better parsing
                thumbnail: item.thumbnail || extractImageFromContent(rawContent),
                tags: item.categories || [],
                slug: itemSlug
              });
            });
            
            const foundArticle = mediumItems.find((a: Article) => a.slug === slug);
            if (foundArticle) {
              setArticle(foundArticle);
              setIsLoading(false);
              return;
            }
          }
        } catch (err) {
          console.error('Failed to load Medium RSS:', err);
        }

        // Try local articles.json
        try {
          const res = await fetch('/articles.json', { cache: 'no-cache' });
          if (res.ok) {
            const json = await res.json();
            const items = Array.isArray(json.items) ? json.items : [];
            const normalized = items.map(normalizeFeedItem);
            const foundArticle = normalized.find((a: Article) => a.slug === slug);
            if (foundArticle) {
              setArticle(foundArticle);
              setIsLoading(false);
              return;
            }
          }
        } catch (err) {
          console.error('Failed to load articles.json:', err);
        }

        // Finally try sample articles
        const foundArticle = sampleArticles.find(a => a.slug === slug);
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error finding article:', err);
        setError('Failed to load article');
      } finally {
        setIsLoading(false);
      }
    };

    findArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
          <Container>
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2 text-brand-dark dark:text-white">
                Loading article...
              </h3>
            </div>
          </Container>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
          <Container>
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4 text-brand-dark dark:text-white">
                {error || 'Article not found'}
              </h3>
              <Link 
                to="/blog" 
                className="inline-flex items-center text-brand-amber hover:text-amber-600 font-medium transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Link>
            </div>
          </Container>
        </div>
      </Layout>
    );
  }

  // Clean up and format content for better display
  const formatContent = (content: string): string[] => {
    if (!content) return [article.excerpt || ''];
    
    // Remove HTML tags and normalize whitespace
    let cleanText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    
    // If content is very short or seems fragmented, return as single paragraph
    if (cleanText.length < 100) {
      return [cleanText];
    }
    
    // Split by sentences first to get better paragraph breaks
    const sentences = cleanText.split(/(?<=[.!?])\s+/);
    const paragraphs: string[] = [];
    let currentParagraph = '';
    
    sentences.forEach((sentence, index) => {
      const trimmed = sentence.trim();
      if (!trimmed) return;
      
      // Check if this sentence starts a new numbered section
      const isNumberedHeading = /^\d+\.\s/.test(trimmed);
      
      if (isNumberedHeading) {
        // Save current paragraph if it exists
        if (currentParagraph.trim()) {
          paragraphs.push(currentParagraph.trim());
          currentParagraph = '';
        }
        
        // For university headings, extract just the heading part
        const universityMatch = trimmed.match(/^(\d+\.\s+University\s+of[^.]*(?:—[^.]*)?)/i);
        const schoolMatch = trimmed.match(/^(\d+\.\s+[^.]*(?:School\s+of[^.]*)?)/i);
        
        if (universityMatch || schoolMatch) {
          const heading = (universityMatch || schoolMatch)![1].trim();
          paragraphs.push(heading);
          
          // Extract remaining content after the heading
          const remainingContent = trimmed.substring(heading.length).trim();
          if (remainingContent) {
            currentParagraph = remainingContent;
          }
        } else {
          // Generic numbered heading handling
          const headingMatch = trimmed.match(/^(\d+\.\s[^.]{1,100}\.?)\s*(.*)/);
          if (headingMatch) {
            paragraphs.push(headingMatch[1].trim());
            if (headingMatch[2]) {
              currentParagraph = headingMatch[2].trim();
            }
          } else {
            paragraphs.push(trimmed);
          }
        }
      } else {
        // Add sentence to current paragraph
        currentParagraph += (currentParagraph ? ' ' : '') + trimmed;
        
        // Break paragraph if it's getting long (around 2-3 sentences)
        if (currentParagraph.length > 250 && sentences[index + 1] && !(/^\d+\./.test(sentences[index + 1]))) {
          paragraphs.push(currentParagraph.trim());
          currentParagraph = '';
        }
      }
    });
    
    // Add any remaining content
    if (currentParagraph.trim()) {
      paragraphs.push(currentParagraph.trim());
    }
    
    // Filter out very short fragments (likely parsing errors)
    return paragraphs.filter(p => p.length > 5);
  };

  const formattedContent = formatContent(article.content || '');

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header Section - Medium Style */}
        <div className="pt-20 pb-12 bg-white dark:bg-gray-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block bg-brand-amber text-white text-sm font-medium px-4 py-2 rounded-full">
                  {article.category}
                </span>
              </div>
              
              {/* Article Title */}
              <h1 className="text-5xl md:text-6xl font-bold text-brand-dark dark:text-white mb-8 leading-tight tracking-tight">
                {article.title}
              </h1>
              
              {/* Featured Image */}
              <div className="relative mb-8 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Article Content */}
        <div className="pb-12">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <div className="mb-8">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center text-brand-amber hover:text-amber-600 font-medium transition-colors"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Blog
                </Link>
              </div>

              {/* Meta Info */}
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-12 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center mr-6">
                  <User size={16} className="mr-2" />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>
                    {new Date(article.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Article Content - Medium Style Typography */}
              <article className="max-w-none">
                {/* Article Excerpt/Subtitle */}
                <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 font-normal leading-8 md:leading-10 tracking-wide">
                  {article.excerpt}
                </div>
                
                {/* Article Body - Medium-inspired Typography */}
                <div className="article-content space-y-8">
                  {formattedContent.length > 0 ? (
                    formattedContent.map((paragraph: string, index: number) => {
                      // Skip very short fragments that are likely parsing errors
                      if (paragraph.length <= 5 || /^\d+$/.test(paragraph.trim())) {
                        return null;
                      }
                      
                      // Enhanced heading detection for numbered sections
                      const isNumberedHeading = /^\d+\.\s/.test(paragraph);
                      const isUniversityHeading = /^\d+\.\s+University\s+of/.test(paragraph);
                      const isShortTitle = paragraph.length < 200 && /^[A-Z]/.test(paragraph) && paragraph.split('.').length <= 2;
                      
                      if (isNumberedHeading || isUniversityHeading) {
                        return (
                          <div key={index} className="mt-16 mb-8 first:mt-0">
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white leading-tight tracking-tight mb-2">
                              {paragraph}
                            </h2>
                            <div className="w-24 h-1 bg-brand-amber rounded-full"></div>
                          </div>
                        );
                      }
                      
                      if (isShortTitle) {
                        return (
                          <h3 key={index} className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-12 mb-6 first:mt-0 leading-snug">
                            {paragraph}
                          </h3>
                        );
                      }
                      
                      return (
                        <p key={index} className="text-gray-700 dark:text-gray-300 leading-9 text-xl font-normal tracking-wide mb-6 selection:bg-brand-amber selection:bg-opacity-20">
                          {paragraph}
                        </p>
                      );
                    }).filter(Boolean)
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Article content is being loaded or may not be available in full text format.
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 mt-2">
                        Please use the link below to read the complete article on Medium.
                      </p>
                    </div>
                  )}
                </div>
              </article>



              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center text-brand-amber hover:text-amber-600 font-medium transition-colors"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to All Articles
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage;