import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import ArticleCard from '../components/blog/ArticleCard';
import ArticleFilter from '../components/blog/ArticleFilter';
import { Article } from '../types';
import { articles as sampleArticles } from '../data/articles';
import { fetchMediumArticles } from '../utils/mediumRss';



const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Real-time article fetching function
  const fetchLatestArticles = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const mediumItems = await fetchMediumArticles();
      setArticles(mediumItems);
      setFilteredArticles(mediumItems);
      setLastFetched(new Date());
      return;

    } catch (err) {
      setError('Failed to load articles');
      setArticles(sampleArticles);
      setFilteredArticles(sampleArticles);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Auto-refresh articles every 5 minutes for real-time updates
  useEffect(() => {
    fetchLatestArticles();
    
    const refreshInterval = setInterval(() => {
      fetchLatestArticles(true);
    }, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const handleFilter = (next: Article[]) => setFilteredArticles(next);

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
