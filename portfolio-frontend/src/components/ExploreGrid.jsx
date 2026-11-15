import { Link } from 'react-router-dom';
import { ArrowRightIcon, UserIcon, BriefcaseIcon, LayoutIcon, FolderIcon, SendIcon } from './Icons';

const cards = [
  { to: '/about', Icon: UserIcon, title: 'About & Skills', text: 'Who I am, what I believe in and the technologies I work with.' },
  { to: '/experience', Icon: BriefcaseIcon, title: 'Experience & Education', text: 'My work at Digitemb, Aptech training and certifications.' },
  { to: '/services', Icon: LayoutIcon, title: 'Services & Process', text: 'What I can build for you and how a project runs with me.' },
  { to: '/projects', Icon: FolderIcon, title: 'Projects', text: 'Real applications: dashboards, POS systems and e-commerce.' },
  { to: '/contact', Icon: SendIcon, title: 'Contact', text: 'Send a message, email or WhatsApp. I reply quickly.' },
];

const ExploreGrid = () => (
  <section className="pro-section" id="explore">
    <div className="site-container">
      <p className="section-label shiny-sec reveal">Explore</p>
      <h2 className="section-heading reveal">Everything In One Place</h2>
      <div className="explore-grid">
        {cards.map(({ to, Icon, title, text }, i) => (
          <Link to={to} className="explore-card reveal reveal-zoom" key={to} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
            <span className="icon-chip"><Icon size={20} /></span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="explore-go">Open page <ArrowRightIcon size={16} /></span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ExploreGrid;
