import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle,
  centered = true,
  light = false,
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className={`text-2xl md:text-3xl font-bold mb-4 ${
          light ? 'text-white' : 'text-brand-dark dark:text-white'
        }`}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-base md:text-lg max-w-3xl ${centered ? 'mx-auto' : ''} ${
            light ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;