import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Page badalne par mobile menu band
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu khula ho to page scroll na ho
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? 'is-scrolled' : ''}`}>
      <div className="site-container header-inner">
        <Link to="/" className="brand" aria-label="Home">
          <Logo />
        </Link>

        <nav id="site-nav" className={`site-nav ${open ? 'open' : ''}`} aria-label="Main navigation">
          <ul>
            {NAV_ITEMS.map(({ to, label }) => {
              // Project detail page (/project/:id) par "Projects" active rahe
              const forced = to === '/projects' && pathname.startsWith('/project/');
              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => `site-link ${isActive || forced ? 'active' : ''}`}
                  >
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <Link to="/contact" className="btn-solid header-cta">Hire Me</Link>
        </nav>

        <button
          type="button"
          className={`menu-btn ${open ? 'open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
