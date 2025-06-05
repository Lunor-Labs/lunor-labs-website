import React from 'react';
import Layout from '../components/common/Layout';
import Hero from '../components/home/Hero';
import FeaturedServices from '../components/home/FeaturedServices';
import Benefits from '../components/home/Benefits';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedServices />
      <Benefits />
      <Testimonials />
    </Layout>
  );
};

export default HomePage;