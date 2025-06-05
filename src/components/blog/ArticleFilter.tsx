import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Article } from '../../types';

interface ArticleFilterProps {
  articles: Article[];
  onFilter: (filtered: Article[]) => void;
}

const ArticleFilter: React.FC<ArticleFilterProps> = ({ articles, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get unique categories from articles
  const categories = Array.from(
    new Set(articles.map(article => article.category))
  );
  
  // Filter articles based on search term and category
  const handleFilter = (term: string, category: string | null) => {
    setSearchTerm(term);
    setActiveCategory(category);
    
    const filtered = articles.filter(article => {
      const matchesSearch = term === '' || 
        article.title.toLowerCase().includes(term.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(term.toLowerCase());
      
      const matchesCategory = category === null || article.category === category;
      
      return matchesSearch && matchesCategory;
    });
    
    onFilter(filtered);
  };
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => handleFilter(e.target.value, activeCategory)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-amber focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilter(searchTerm, null)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeCategory === null 
                ? 'bg-brand-amber text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All Topics
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleFilter(searchTerm, category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-brand-amber text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleFilter;