import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  narrow?: boolean;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  as: Component = 'div',
  narrow = false,
}) => {
  return (
    <Component 
      className={`px-4 mx-auto w-full ${narrow ? 'max-w-4xl' : 'max-w-7xl'} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Container;