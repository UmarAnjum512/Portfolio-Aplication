import PageLayout from '../components/PageLayout';
import Services from '../components/Services';
import Process from '../components/Process';
import WhyMe from '../components/WhyMe';
import CtaBanner from '../components/CtaBanner';

const ServicesPage = () => (
  <PageLayout>
    <div className="page-top" />
    <Services />
    <Process />
    <WhyMe />
    <CtaBanner />
  </PageLayout>
);

export default ServicesPage;
