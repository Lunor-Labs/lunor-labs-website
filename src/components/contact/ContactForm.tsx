import React, { useState } from 'react';
import Button from '../common/Button';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to a server
    // For now, we'll just simulate a successful submission
    
    // Create WhatsApp message
    const message = encodeURIComponent(
      `Hello! I have a question about your services.\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message: ${formData.message}`
    );
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
    
    // Reset form and show success message
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
      {formSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 mx-auto bg-brand-emerald/10 rounded-full flex items-center justify-center mb-4">
            <Send size={32} className="text-brand-emerald" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-brand-dark dark:text-white">Message Sent Successfully!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We've opened WhatsApp for you to complete your message. If it didn't open automatically, please try again.
          </p>
          <Button 
            variant="primary"
            onClick={() => setFormSubmitted(false)}
          >
            Send Another Message
          </Button>
        </motion.div>
      ) : (
        <>
          <h3 className="text-2xl font-semibold mb-6 text-brand-dark dark:text-white">Get in Touch</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-amber focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-amber focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              {/* Subject Field */}
              <div className="md:col-span-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-amber focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              {/* Message Field */}
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-amber focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                ></textarea>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                type="submit" 
                variant="primary" 
                size="lg"
                icon={<Send size={16} />}
              >
                Send Message via WhatsApp
              </Button>
              
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                By submitting this form, you'll be redirected to WhatsApp to complete your message.
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactForm;