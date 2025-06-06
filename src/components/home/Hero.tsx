import React from 'react';
import { ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-brand-dark to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-brand-amber rounded-full filter blur-3xl" />
        <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-brand-emerald rounded-full filter blur-3xl" />
      </div>
      
      <Container className="py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              We Build Clean, Fast & Affordable Websites for Sri Lankan Entrepreneurs
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl mb-8 text-gray-300"
            >
              Get your business online with a professional website that won't break the bank. No monthly hosting fees, complete ownership, and built for performance.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => window.open('https://wa.me/+94702051901?text=I%20want%20to%20get%20a%20website%20for%20my%20business', '_blank')}
                icon={<ArrowRight size={20} />}
              >
                Get Your Website
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Services
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:w-1/2"
          >
            <div className="relative mx-auto max-w-md">
              {/* Device Frame */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden aspect-[5/3]">
                {/* Website Screenshot */}
                <img 
                  src="https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Modern Website Design" 
                  className="w-full h-full object-cover"
                />
                
                {/* Browser UI */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-gray-100 flex items-center px-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto bg-white rounded-sm text-xs text-gray-600 px-2">
                    yourbusiness.com
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -right-4 -bottom-4 bg-brand-amber text-brand-dark p-3 rounded-lg shadow-lg text-sm font-medium">
                No Monthly Fees!
              </div>
              <div className="absolute -left-4 -top-4 bg-brand-emerald text-white p-3 rounded-lg shadow-lg text-sm font-medium">
                SEO Optimized
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            className="dark:fill-gray-900"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;