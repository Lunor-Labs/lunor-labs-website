import React from 'react';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import Mission from '../components/about/Mission';
// import Team from '../components/about/Team';
import Portfolio from '../components/about/Portfolio';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="About LunorLabs" 
        subtitle="Learn about our story, mission, and the team behind LunorLabs."
        background="dark"
      />
      
      <Mission />
            {/* <Team /> */}
      <Portfolio />
    </Layout>
  );
};

export default AboutPage;