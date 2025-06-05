import React from 'react';
import { ArrowRight, LayoutDashboard, Globe, Server, Palette, FileText } from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Card from '../common/Card';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedServices: React.FC = () => {
  const services = [
    {
      icon: <LayoutDashboard size={24} />,
      title: 'Portfolio Sites',
      description: 'Showcase your work, skills, and services with a professional online portfolio.',
    },
    {
      icon: <Globe size={24} />,
      title: 'Business Landing Pages',
      description: 'Make a great first impression with a clean, professional landing page.',
    },
    {
      icon: <Server size={24} />,
      title: 'Event Pages',
      description: 'Promote your event, share details, and collect registrations easily.',
    },
    {
      icon: <FileText size={24} />,
      title: 'Blog Sites',
      description: 'Share your expertise and build an audience with a modern blog.',
    },
  ];
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <Container>
        <SectionHeader 
          title="Our Featured Services"
          subtitle="We specialize in creating professional websites that help Sri Lankan businesses establish their online presence."
        />
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card hoverable className="h-full p-6">
                <div className="flex flex-col h-full">
                  <div className="text-brand-amber mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{service.description}</p>
                  <Link 
                    to="/services" 
                    className="text-brand-amber font-medium flex items-center hover:underline mt-2"
                  >
                    Learn more
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Button 
            variant="primary" 
            onClick={() => window.open('https://wa.me/1234567890?text=I%20want%20to%20get%20a%20website%20for%20my%20business', '_blank')}
          >
            Discuss Your Project
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedServices;