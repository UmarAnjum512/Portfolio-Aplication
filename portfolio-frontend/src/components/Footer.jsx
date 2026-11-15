import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import useResume from '../hooks/useResume';
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons';

const Footer = () => {
  const resume = useResume();
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top-grid">
          <div className="footer-col">
            <h4 className="footer-brand">{profile.name}</h4>
            <p className="footer-about">
              Full Stack Developer from Karachi building fast, secure and responsive web applications
              with MERN, ASP.NET Core and PHP Laravel.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href={profile.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub"><GithubIcon size={20} /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn"><LinkedinIcon size={20} /></a>
              <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Email"><MailIcon size={20} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/experience" className="footer-link">Experience</Link></li>
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/projects" className="footer-link">Projects</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Get in touch</h4>
            <ul className="footer-links-list">
              <li><a href={`mailto:${profile.email}`} className="footer-link">{profile.email}</a></li>
              <li><a href={`tel:+${profile.whatsapp}`} className="footer-link">{profile.phone}</a></li>
              <li><span className="footer-link">{profile.location}</span></li>
              <li><a href={resume.downloadUrl} download="Umar_Madni_CV.pdf" className="footer-link">Download CV</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>Copyright © {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>Built with React, Node.js &amp; MongoDB</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
