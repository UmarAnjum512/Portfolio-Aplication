import PageLayout from '../components/PageLayout';
import Experience from '../components/Experience';
import Education from '../components/Education';
import CtaBanner from '../components/CtaBanner';

const ExperiencePage = () => (
  <PageLayout>
    <div className="page-top" />
    <Experience />
    <Education />
    <CtaBanner />
  </PageLayout>
);

export default ExperiencePage;
