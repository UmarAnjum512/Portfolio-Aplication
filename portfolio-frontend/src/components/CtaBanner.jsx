import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { ArrowRightIcon, WhatsappIcon } from './Icons';

const CtaBanner = () => (
  <section className="cta-section" id="cta">
    <div className="site-container">
      <div className="cta-banner reveal reveal-zoom">
        <div>
          <h2>Have a project in mind?</h2>
          <p>Let&apos;s turn your idea into a fast, secure and beautiful web application.</p>
        </div>
        <div className="cta-actions">
          <Link to="/contact" className="btn-solid">Start a Conversation <ArrowRightIcon size={18} /></Link>
          <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="cv-download-btn">
            <WhatsappIcon size={18} /> <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CtaBanner;
