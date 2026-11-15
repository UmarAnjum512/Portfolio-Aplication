import { education, certifications } from '../data/profile';
import { CapIcon, AwardIcon } from './Icons';

const Education = () => (
  <section className="pro-section" id="education">
    <div className="site-container">
      <p className="section-label shiny-sec reveal">Learning</p>
      <h2 className="section-heading reveal">Education &amp; Certifications</h2>

      <div className="edu-grid">
        <div className="edu-col">
          <h3 className="edu-col-title"><CapIcon size={20} /> Education &amp; Training</h3>
          {education.map((e) => (
            <div className="edu-card reveal reveal-left" key={e.title}>
              <div className="edu-card-top">
                <h4>{e.title}</h4>
                {e.period && <span className="period-pill">{e.period}</span>}
              </div>
              <p className="edu-place">{e.place}</p>
              <p className="edu-text">{e.text}</p>
            </div>
          ))}
        </div>

        <div className="edu-col">
          <h3 className="edu-col-title"><AwardIcon size={20} /> Certifications</h3>
          {certifications.map((c) => (
            <div className="edu-card reveal reveal-right" key={c.title}>
              <div className="edu-card-top">
                <h4>{c.title}</h4>
                <span className="period-pill">{c.year}</span>
              </div>
              <p className="edu-place">{c.issuer}</p>
              <p className="edu-text">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Education;
