import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import ArticleCard from '../components/blog/ArticleCard';
import ArticleFilter from '../components/blog/ArticleFilter';
import { articles } from '../data/articles';
import { Article } from '../types';

const BlogPage: React.FC = () => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  
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
              <h3 className="text-xl font-semibold mb-2 text-brand-dark dark:text-white">No articles found</h3>
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