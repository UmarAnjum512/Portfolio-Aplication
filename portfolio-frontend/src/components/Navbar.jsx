import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (!isHomePage) return;

      const sections = ['home', 'services', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const scrollTo = (id) => {
    if (!isHomePage) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav className={`main-nav ${scrolled ? 'scrolling' : ''}`} id="main-nav">
      <ul className="nav-list">
        <li>
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
            className={`nav-link ${activeSection === 'home' && isHomePage ? 'active' : ''}`}
          >
            <div className="nav-indicator"></div>
            {/* Mobile Home Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'none' }} className="mobile-icon">
              <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path>
            </svg>
            <span>Home</span>
          </a>
        </li>

        <li>
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); scrollTo('services'); }}
            className={`nav-link ${activeSection === 'services' && isHomePage ? 'active' : ''}`}
          >
            <div className="nav-indicator"></div>
            <span>Services</span>
          </a>
        </li>

        <li>
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}
            className={`nav-link ${activeSection === 'projects' && isHomePage ? 'active' : ''}`}
          >
            <div className="nav-indicator"></div>
            {/* Mobile Projects Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'none' }} className="mobile-icon">
              <path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z"></path>
            </svg>
            <span>Projects</span>
          </a>
        </li>

        <li>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            className={`nav-link ${activeSection === 'contact' && isHomePage ? 'active' : ''}`}
          >
            <div className="nav-indicator"></div>
            {/* Mobile Contact Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'none' }} className="mobile-icon">
              <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path>
            </svg>
            <span>Contact</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
