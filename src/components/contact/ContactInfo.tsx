import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactInfo: React.FC = () => {
  const contactDetails = [
    /*{
      icon: <Phone size={24} className="text-brand-amber" />,
      title: 'Phone',
      details: '+94 12 345 6789',
      link: 'tel:+94123456789'
    },*/
    {
      icon: <Mail size={24} className="text-brand-amber" />,
      title: 'Email',
      details: 'lunorlabs@gmail.com',
      link: 'mailto:lunorlabs@gmail.com'
    },
    {
      icon: <MapPin size={24} className="text-brand-amber" />,
      title: 'Address',
      details: 'Colombo, Sri Lanka',
      link: 'https://maps.google.com/?q=Colombo,Sri+Lanka'
    },
    {
      icon: <Clock size={24} className="text-brand-amber" />,
      title: 'Operating Hours',
      details: '9 AM – 6 PM, Monday to Saturday',
      link: null
    }
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
      <h3 className="text-2xl font-semibold mb-6 text-brand-dark dark:text-white">Contact Information</h3>
      
      <div className="space-y-6">
        {contactDetails.map((detail, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start"
          >
            <div className="mr-4 mt-1">{detail.icon}</div>
            <div>
              <h4 className="font-medium text-brand-dark dark:text-white mb-1">{detail.title}</h4>
              {detail.link ? (
                <a 
                  href={detail.link} 
                  target={detail.title === 'Address' ? '_blank' : undefined}
                  rel={detail.title === 'Address' ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 dark:text-gray-300 hover:text-brand-amber transition-colors"
                >
                  {detail.details}
                </a>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{detail.details}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8">
        <h4 className="font-medium text-brand-dark dark:text-white mb-4">Connect With Us</h4>
        <div className="flex space-x-4">
          <a 
            href="https://www.facebook.com/profile.php?id=61577257131874" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-brand-amber hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-brand-amber hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-brand-amber hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-brand-amber hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;