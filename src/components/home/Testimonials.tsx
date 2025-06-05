import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import { testimonials } from '../../data/testimonials';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Auto advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };
  
  return (
    <section className="py-20 bg-brand-dark text-white">
      <Container>
        <SectionHeader 
          title="What Our Clients Say"
          subtitle="Don't just take our word for it - here's what Sri Lankan businesses have to say about working with us."
          light
        />
        
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center max-w-4xl mx-auto"
              >
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-brand-amber">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3 md:pl-8 text-center md:text-left">
                  <div className="flex mb-3 justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={20} 
                        fill={i < testimonials[activeIndex].rating ? "#F59E0B" : "none"}
                        stroke={i < testimonials[activeIndex].rating ? "#F59E0B" : "#CBD5E1"}
                        className="mr-1"
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl italic mb-6">
                    "{testimonials[activeIndex].quote}"
                  </blockquote>
                  
                  <div>
                    <p className="font-semibold">{testimonials[activeIndex].name}</p>
                    <p className="text-gray-400">{testimonials[activeIndex].business}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={prevTestimonial}
              className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 mr-4 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-brand-amber w-6' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 ml-4 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;