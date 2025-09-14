import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import ArticleCard from '../components/blog/ArticleCard';
import ArticleFilter from '../components/blog/ArticleFilter';
import { Article } from '../types';
import { fetchArticles } from '../utils/notion'; // <-- Import Notion utility

const NOTION_DATABASE_ID = '26ea0d7ead1580f99d8e000cd6646b70'; // Replace with your Notion DB ID

const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const notionArticles = await fetchArticles(NOTION_DATABASE_ID);
        setArticles(notionArticles);
        setFilteredArticles(notionArticles);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load blog posts');
        setIsLoading(false);
      }
    };
    getArticles();
  }, []);

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
          <ArticleFilter 
            articles={articles} 
            onFilter={setFilteredArticles} 
          />
          
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
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

