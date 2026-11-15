import PageLayout from '../components/PageLayout';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import ExploreGrid from '../components/ExploreGrid';
import CtaBanner from '../components/CtaBanner';

const Home = () => (
  <PageLayout>
    <Hero />
    <TechMarquee />
    <ExploreGrid />
    <CtaBanner />
  </PageLayout>
);

export default Home;
