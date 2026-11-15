import PageLayout from '../components/PageLayout';
import About from '../components/About';
import Skills from '../components/Skills';
import CtaBanner from '../components/CtaBanner';

const AboutPage = () => (
  <PageLayout>
    <div className="page-top" />
    <About />
    <Skills />
    <CtaBanner />
  </PageLayout>
);

export default AboutPage;
