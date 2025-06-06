import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import ArticleCard from '../components/blog/ArticleCard';
import ArticleFilter from '../components/blog/ArticleFilter';
// import { articles } from '../data/articles';
import { Article } from '../types';

const SHEET_ID = '14GbeuKoirW8mle2CnvSD0HuKE8pLdLulnJ1s-WuxLhI'; // Replace with your Google Sheet ID
const SHEET_NAME = 'posts';

const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }

        const text = await response.text();
        // Remove the Google Visualization API wrapper
        const jsonString = text.substring(47).slice(0, -2);
        const data = JSON.parse(jsonString);
        console.log(data)

        // Transform the data into our Article format
        const transformedArticles = data.table.rows.map((row: any, index: number) => {
          const cells = row.c;
          return {
            id: index + 1,
            title: cells[0]?.v || '',
            excerpt: cells[1]?.v || '',
            content: cells[2]?.v || '',
            author: cells[3]?.v || '',
            date: cells[4]?.v || new Date().toISOString(),
            image: cells[5]?.v || 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
            category: cells[6]?.v || 'Uncategorized',
            slug: cells[7]?.v || `post-${index + 1}`,
          };
        });


        setArticles(transformedArticles);
        setFilteredArticles(transformedArticles);
        console.log('Filtered Articles:', filteredArticles);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load blog posts');
        setIsLoading(false);
      }
    };

    fetchArticles();
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


/*
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
*/