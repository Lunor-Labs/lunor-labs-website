import React, { useState } from 'react';
import Button from '../common/Button';
import { ChevronRight, Send } from 'lucide-react';
import { services } from '../../data/services';
import { motion } from 'framer-motion';

const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceId: '',
    message: '',
    budget: '',
  });
  
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
    service: false,
    budget: false,
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const toggleDropdown = (dropdown: string) => {
    setIsOpen(prev => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };
  
  const selectService = (id: number) => {
    setFormData(prev => ({ ...prev, serviceId: id.toString() }));
    setIsOpen(prev => ({ ...prev, service: false }));
  };
  
  const selectBudget = (budget: string) => {
    setFormData(prev => ({ ...prev, budget }));
    setIsOpen(prev => ({ ...prev, budget: false }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to a server
    // For now, we'll just simulate a successful submission
    
    // Create WhatsApp message
    const selectedService = services.find(s => s.id.toString() === formData.serviceId);
    const message = encodeURIComponent(
      `Hello! I'm interested in your ${selectedService?.title || 'services'}.\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Budget: ${formData.budget}\n\n` +
      `Message: ${formData.message}`
    );
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/+94702051901?text=${message}`, '_blank');
    
    // Reset form and show success message
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceId: '',
      message: '',
      budget: '',
    });
  };
  
  const budgetOptions = [
    'Rs. 10,000 - Rs. 20,000',
    'Rs. 20,000 - Rs. 30,000',
    'Rs. 30,000 - Rs. 50,000',
    'Above Rs. 50,000',
  ];
  
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
            We've opened WhatsApp for you to complete your inquiry. If it didn't open automatically, please try again.
          </p>
          <Button 
            variant="primary"
            onClick={() => setFormSubmitted(false)}
          >
            Send Another Inquiry
          </Button>
        </motion.div>
      ) : (
        <>
          <h3 className="text-2xl font-semibold mb-6 text-brand-dark dark:text-white">Tell Us About Your Project</h3>
          
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
              
              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-amber focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              {/* Service Dropdown */}
              <div className="relative">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Service You're Interested In *
                </label>
                <button
                  type="button"
                  onClick={() => toggleDropdown('service')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-amber focus:border-transparent bg-white dark:bg-gray-700 text-left flex items-center justify-between"
                >
                  <span className={`${!formData.serviceId ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                    {formData.serviceId 
                      ? services.find(s => s.id.toString() === formData.serviceId)?.title 
                      : 'Select a service'}
                  </span>
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform duration-200 ${isOpen.service ? 'rotate-90' : ''}`} 
                  />
                </button>
                
                {isOpen.service && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                    {services.map(service => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => selectService(service.id)}
                        className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        {service.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Budget Dropdown */}
              <div className="relative md:col-span-2">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Budget
                </label>
                <button
                  type="button"
                  onClick={() => toggleDropdown('budget')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-amber focus:border-transparent bg-white dark:bg-gray-700 text-left flex items-center justify-between"
                >
                  <span className={`${!formData.budget ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                    {formData.budget || 'Select your budget range'}
                  </span>
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform duration-200 ${isOpen.budget ? 'rotate-90' : ''}`} 
                  />
                </button>
                
                {isOpen.budget && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                    {budgetOptions.map(budget => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => selectBudget(budget)}
                        className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Message Field */}
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
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
                Send Inquiry via WhatsApp
              </Button>
              
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                By submitting this form, you'll be redirected to WhatsApp to complete your inquiry.
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default InquiryForm;