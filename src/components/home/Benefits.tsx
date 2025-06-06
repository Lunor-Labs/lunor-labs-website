import React from 'react';
import { CheckCircle2, DollarSign, Rocket, Shield } from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import { motion } from 'framer-motion';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <DollarSign size={24} className="text-brand-amber" />,
      title: 'No Monthly Hosting Fees',
      description: 'Save money with our GitHub Pages hosting solution. Pay once for your website, then own it forever with no recurring costs.'
    },
    {
      icon: <Shield size={24} className="text-brand-amber" />,
      title: 'GitHub Pages Setup',
      description: 'We handle the technical setup for secure, reliable hosting that keeps your website online 24/7 without the typical hosting fees.'
    },
    {
      icon: <Rocket size={24} className="text-brand-amber" />,
      title: 'SEO Basics Included',
      description: 'Every website comes with fundamental search engine optimization to help customers find your business online.'
    },
    {
      icon: <CheckCircle2 size={24} className="text-brand-amber" />,
      title: 'WhatsApp Integration',
      description: 'Connect directly with potential customers through WhatsApp buttons that make communication quick and easy.'
    }
  ];
  
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <Container>
        <SectionHeader 
          title="Why Choose LunorLabs?"
          subtitle="We help Sri Lankan entrepreneurs establish their online presence without breaking the bank."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <div className="mr-4 mt-1">{benefit.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-brand-dark dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-white dark:bg-gray-700 p-6 md:p-8 rounded-lg shadow-md"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-brand-dark dark:text-white">
                Ready to take your business online?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get a professional website that's affordable, fast, and tailored to your Sri Lankan business needs.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <a 
                href="https://wa.me/+94702051901?text=I%20want%20to%20get%20a%20website%20for%20my%20business" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-amber hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 inline-flex items-center"
              >
                Contact Us Today
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Benefits;