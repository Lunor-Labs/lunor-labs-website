import React, { useState } from 'react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Card from '../common/Card';
import { portfolio } from '../../data/portfolio';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Portfolio: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Get unique tags from portfolio items
  const allTags = Array.from(
    new Set(portfolio.flatMap(item => item.tags))
  );
  
  // Filter portfolio items based on selected tag
  const filteredPortfolio = activeTag 
    ? portfolio.filter(item => item.tags.includes(activeTag))
    : portfolio;
  
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <Container>
        <SectionHeader 
          title="Our Recent Work"
          subtitle="Take a look at some of the websites we've created for Sri Lankan businesses."
        />
        
        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTag === null 
                ? 'bg-brand-amber text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All Projects
          </button>
          
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTag === tag 
                  ? 'bg-brand-amber text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((item, index) => (
            <Card key={item.id} hoverable className="h-full flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-amber hover:text-amber-600 font-medium flex items-center transition-colors"
                >
                  Visit Website
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Portfolio;