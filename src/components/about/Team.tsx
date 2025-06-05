import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import { team } from '../../data/team';
import { motion } from 'framer-motion';

const Team: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <Container>
        <SectionHeader 
          title="Meet Our Team"
          subtitle="The talented people behind LunorLabs who work hard to make your vision a reality."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-w-3 aspect-h-4 relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-80 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-brand-amber font-medium mb-3">{member.role}</p>
                  
                  <div className="flex space-x-3">
                    <a 
                      href="#" 
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-amber transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin size={16} className="text-white" />
                    </a>
                    <a 
                      href="#" 
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-amber transition-colors"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter size={16} className="text-white" />
                    </a>
                    <a 
                      href="#" 
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-amber transition-colors"
                      aria-label={`${member.name}'s Facebook`}
                    >
                      <Facebook size={16} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Team;