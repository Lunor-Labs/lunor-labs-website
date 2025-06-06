import React from 'react';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Contact Us" 
        subtitle="Have questions or ready to start your project? Get in touch with our team."
      />
      
      <section className="py-20 bg-white dark:bg-gray-900">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ContactForm />
            </div>
            <div className="md:col-span-1">
              <ContactInfo />
            </div>
          </div>
          
          {/* Google Map */}
          <div className="mt-12 rounded-lg overflow-hidden h-96 shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585989328!2d79.8211856!3d6.9218374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1685433735472!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lunor Labs location"
            ></iframe>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default ContactPage;