import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, UserIcon, BriefcaseIcon, LayoutIcon, FolderIcon, SendIcon } from './Icons';

const NAV_ITEMS = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/about', label: 'About', Icon: UserIcon },
  { to: '/experience', label: 'Experience', Icon: BriefcaseIcon },
  { to: '/services', label: 'Services', Icon: LayoutIcon },
  { to: '/projects', label: 'Projects', Icon: FolderIcon },
  { to: '/contact', label: 'Contact', Icon: SendIcon },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`main-nav ${scrolled ? 'scrolling' : ''}`} id="main-nav" aria-label="Main navigation">
      <ul className="nav-list">
        {NAV_ITEMS.map(({ to, label, Icon }) => {
          // Project detail page (/project/:id) par "Projects" active rahe
          const active = to === '/projects' && pathname.startsWith('/project/');
          return (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav-link ${isActive || active ? 'active' : ''}`}
              >
                <div className="nav-indicator"></div>
                <Icon size={18} className="mobile-icon" style={{ display: 'none' }} />
                <span>{label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
