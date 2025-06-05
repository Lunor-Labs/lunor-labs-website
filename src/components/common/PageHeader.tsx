import React from 'react';
import Container from './Container';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  background?: 'light' | 'dark';
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle,
  background = 'light',
}) => {
  return (
    <div 
      className={`py-16 md:py-24 ${
        background === 'dark' 
          ? 'bg-brand-dark text-white' 
          : 'bg-gray-100 dark:bg-gray-800 text-brand-dark dark:text-white'
      }`}
    >
      <Container className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto opacity-80"
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </div>
  );
};

export default PageHeader;