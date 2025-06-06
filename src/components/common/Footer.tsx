import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/logo.jpg" 
                alt="LunorLabs Logo" 
                className="w-10 h-10 rounded"
              />
              <span className="ml-2 text-xl font-bold text-white">
                LunorLabs
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              Creating clean, fast & affordable websites for Sri Lankan entrepreneurs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61577257131874" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-amber transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-amber transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-amber transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-amber transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-brand-amber transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-amber transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-brand-amber transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-brand-amber transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-brand-amber transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-amber transition-colors">
                  Static Website Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-amber transition-colors">
                  Domain Purchase & Setup
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-amber transition-colors">
                  GitHub Hosting
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-amber transition-colors">
                  Basic Branding
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-amber transition-colors">
                  Blog Integration
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin size={20} className="text-brand-amber mr-2" />
                <span className="text-gray-400">Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-brand-amber mr-2" />
                <a href="tel:+94123456789" className="text-gray-400 hover:text-brand-amber transition-colors">
                  +94 71 3357 493
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-brand-amber mr-2" />
                <a href="mailto:lunorlabs@gmail.com" className="text-gray-400 hover:text-brand-amber transition-colors">
                  lunorlabs@gmail.com
                </a>
              </li>
              <li className="text-gray-400">
                <p>Operating Hours:</p>
                <p>9 AM – 6 PM, Monday to Saturday</p>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} LunorLabs. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-brand-amber transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-brand-amber transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;