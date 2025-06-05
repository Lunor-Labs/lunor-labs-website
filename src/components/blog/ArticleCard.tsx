import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import { Link } from 'react-router-dom';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card hoverable className="h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-amber text-white text-xs font-medium px-2.5 py-1 rounded">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        {/* Meta Info */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center mr-4">
            <User size={14} className="mr-1" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{new Date(article.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric'
            })}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
          {article.excerpt}
        </p>
        
        <Link 
          to={`/blog/${article.slug}`} 
          className="text-brand-amber hover:text-amber-600 font-medium flex items-center transition-colors mt-2"
        >
          Read More
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </Card>
  );
};

export default ArticleCard;