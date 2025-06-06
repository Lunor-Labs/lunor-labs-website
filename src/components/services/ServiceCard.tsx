import React from 'react';
import { ArrowRight, Check, ChevronRight, Heart, LayoutDashboard, FileText, Globe, Palette, Server } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Map icon string to Lucide icon component
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      'layout': <LayoutDashboard size={24} />,
      'file-text': <FileText size={24} />,
      'globe': <Globe size={24} />,
      'palette': <Palette size={24} />,
      'server': <Server size={24} />,
      'heart': <Heart size={24} />,
    };
    
    return icons[iconName] || <LayoutDashboard size={24} />;
  };
  
  return (
    <Card className="h-full flex flex-col relative overflow-visible group">
      {/* Service Price Tag */}
      <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-brand-amber text-brand-dark text-sm font-bold py-1 px-3 rounded-full">
        {service.price}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4 text-brand-amber">{getIcon(service.icon)}</div>
        
        <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
        
        {/* Features List */}
        <div className="mb-6 flex-grow">
          <h4 className="font-medium mb-3 text-brand-dark dark:text-white">What's Included:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check size={18} className="text-brand-emerald mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Call to Action */}
        <Button 
          variant="primary" 
          fullWidth
          onClick={() => window.open('https://wa.me/+94702051901?text=I%20am%20interested%20in%20your%20' + service.title + '%20service', '_blank')}
          icon={<ChevronRight size={16} />}
        >
          Get Started
        </Button>
      </div>
    </Card>
  );
};

export default ServiceCard;