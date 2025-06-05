import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  onClick,
  hoverable = false,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={hoverable ? { y: -5, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${
        hoverable ? 'cursor-pointer transition-transform duration-300' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;