import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Laptop } from 'lucide-react';
import Container from './Container';
import Button from './Button';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
      return savedTheme || 'system';
    }
    return 'light';
  });
  
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll event to change header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      if (systemTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };
  
  const ThemeIcon = () => {
    if (theme === 'light') return <Moon size={20} />;
    if (theme === 'dark') return <Sun size={20} />;
    return <Laptop size={20} />;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-brand-dark/90 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <Container className="py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/Untitled design (1).jpg" 
              alt="LunorLabs Logo" 
              className="w-10 h-10 rounded"
            />
            <span className="ml-2 text-xl font-bold text-brand-dark dark:text-white">
              LunorLabs
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-medium hover:text-brand-amber transition-colors ${
                  isActive 
                    ? 'text-brand-amber' 
                    : 'text-brand-dark dark:text-white'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                `text-sm font-medium hover:text-brand-amber transition-colors ${
                  isActive 
                    ? 'text-brand-amber' 
                    : 'text-brand-dark dark:text-white'
                }`
              }
            >
              Services
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-sm font-medium hover:text-brand-amber transition-colors ${
                  isActive 
                    ? 'text-brand-amber' 
                    : 'text-brand-dark dark:text-white'
                }`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/blog" 
              className={({ isActive }) => 
                `text-sm font-medium hover:text-brand-amber transition-colors ${
                  isActive 
                    ? 'text-brand-amber' 
                    : 'text-brand-dark dark:text-white'
                }`
              }
            >
              Blog
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-sm font-medium hover:text-brand-amber transition-colors ${
                  isActive 
                    ? 'text-brand-amber' 
                    : 'text-brand-dark dark:text-white'
                }`
              }
            >
              Contact
            </NavLink>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>
          </nav>
          
          <div className="hidden md:block">
            <Button 
              variant="primary"
              onClick={() => window.open('https://wa.me/1234567890?text=I%20want%20to%20get%20a%20website%20for%20my%20business', '_blank')}
            >
              Get Your Website
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-brand-dark dark:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white dark:bg-brand-dark shadow-lg"
        >
          <Container className="py-4">
            <nav className="flex flex-col space-y-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `text-base font-medium py-2 px-4 rounded-md ${
                    isActive 
                      ? 'bg-gray-100 dark:bg-gray-800 text-brand-amber' 
                      : 'text-brand-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/services" 
                className={({ isActive }) => 
                  `text-base font-medium py-2 px-4 rounded-md ${
                    isActive 
                      ? 'bg-gray-100 dark:bg-gray-800 text-brand-amber' 
                      : 'text-brand-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Services
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `text-base font-medium py-2 px-4 rounded-md ${
                    isActive 
                      ? 'bg-gray-100 dark:bg-gray-800 text-brand-amber' 
                      : 'text-brand-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/blog" 
                className={({ isActive }) => 
                  `text-base font-medium py-2 px-4 rounded-md ${
                    isActive 
                      ? 'bg-gray-100 dark:bg-gray-800 text-brand-amber' 
                      : 'text-brand-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Blog
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `text-base font-medium py-2 px-4 rounded-md ${
                    isActive 
                      ? 'bg-gray-100 dark:bg-gray-800 text-brand-amber' 
                      : 'text-brand-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Contact
              </NavLink>
              
              <Button 
                variant="primary"
                fullWidth
                onClick={() => window.open('https://wa.me/1234567890?text=I%20want%20to%20get%20a%20website%20for%20my%20business', '_blank')}
              >
                Get Your Website
              </Button>
            </nav>
          </Container>
        </motion.div>
      )}
    </header>
  );
};

export default Header;