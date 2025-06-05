import React from 'react';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import SectionHeader from '../components/common/SectionHeader';
import ServiceCard from '../components/services/ServiceCard';
import InquiryForm from '../components/services/InquiryForm';
import { services } from '../data/services';

const ServicesPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Our Services" 
        subtitle="Affordable website solutions tailored for Sri Lankan entrepreneurs."
      />
      
      <section className="py-20 bg-white dark:bg-gray-900">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <SectionHeader 
            title="Get a Custom Quote"
            subtitle="Tell us about your project, and we'll create a tailored solution that fits your needs and budget."
          />
          
          <InquiryForm />
        </Container>
      </section>
    </Layout>
  );
};

export default ServicesPage;