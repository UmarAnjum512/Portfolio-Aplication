import PageLayout from '../components/PageLayout';
import ContactSection from '../components/ContactSection';
import Faq from '../components/Faq';

const ContactPage = () => (
  <PageLayout>
    <div className="page-top" />
    <ContactSection />
    <Faq />
  </PageLayout>
);

export default ContactPage;
