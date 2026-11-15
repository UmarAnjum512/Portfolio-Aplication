import { Link } from 'react-router-dom';
import { aboutParagraphs, highlights, profile, languages } from '../data/profile';
import { MapPinIcon, MailIcon, CheckIcon } from './Icons';

const About = () => (
  <section className="pro-section" id="about">
    <div className="site-container">
      <p className="section-label shiny-sec reveal">Who am I?</p>
      <h2 className="section-heading reveal">About Me</h2>

      <div className="about-grid">
        <div className="about-text reveal reveal-left">
          {aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}

          <ul className="highlight-list">
            {highlights.map((h) => (
              <li key={h.title}>
                <span className="check-badge"><CheckIcon size={16} /></span>
                <div>
                  <strong>{h.title}</strong>
                  <span>{h.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="info-card reveal reveal-right">
          <h3>Quick Facts</h3>
          <ul>
            <li>
              <MapPinIcon size={18} />
              <div><span>Based in</span><strong>{profile.location}</strong></div>
            </li>
            <li>
              <MailIcon size={18} />
              <div><span>Email</span><strong>{profile.email}</strong></div>
            </li>
            <li>
              <CheckIcon size={18} />
              <div><span>Focus</span><strong>{profile.tagline}</strong></div>
            </li>
            <li>
              <CheckIcon size={18} />
              <div>
                <span>Languages</span>
                <strong>{languages.map((l) => `${l.name} (${l.level})`).join(' • ')}</strong>
              </div>
            </li>
          </ul>
          <Link to="/contact" className="btn-solid btn-block">Let&apos;s work together</Link>
        </aside>
      </div>
    </div>
  </section>
);

export default About;
