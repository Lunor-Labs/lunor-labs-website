import React from 'react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Mission: React.FC = () => {
  const values = [
    {
      title: 'Affordability',
      description: 'We believe quality web presence should be accessible to all Sri Lankan businesses, regardless of size or budget.'
    },
    {
      title: 'Simplicity',
      description: 'We create solutions that are easy to use and maintain, avoiding unnecessary complexity.'
    },
    {
      title: 'Empowerment',
      description: 'We give entrepreneurs the tools and knowledge to control their online presence confidently.'
    },
    {
      title: 'Transparency',
      description: 'We maintain clear communication and honest pricing with no hidden fees or surprises.'
    },
  ];
  
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-brand-dark dark:text-white">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              LunorLabs started with a simple goal: to help Sri Lankan entrepreneurs establish their online presence without breaking the bank. We recognized that many small businesses were being priced out of quality web design or locked into expensive monthly contracts.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our mission is to democratize web development by offering affordable, high-quality websites with no recurring hosting fees. We believe that every business, regardless of size, deserves a professional online presence that helps them grow and succeed.
            </p>
            <div className="bg-brand-amber/10 border-l-4 border-brand-amber p-4 rounded">
              <p className="text-brand-dark dark:text-white italic">
                "We're committed to bridging the digital divide for Sri Lankan entrepreneurs, one website at a time."
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-brand-dark dark:text-white">Our Values</h2>
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 mt-1">
                    <CheckCircle2 size={24} className="text-brand-emerald" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-brand-dark dark:text-white">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Mission;