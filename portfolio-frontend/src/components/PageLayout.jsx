import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Effects from './Effects';
import useReveal from '../hooks/useReveal';

// Har page ka common frame: navbar, effects, footer, scroll-to-top aur reveal animations
const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  useReveal([pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Effects />
      <Navbar />
      <main className="page-main">{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
