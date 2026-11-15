import { experience } from '../data/profile';
import { BriefcaseIcon } from './Icons';

const Experience = () => (
  <section className="pro-section" id="experience">
    <div className="site-container">
      <p className="section-label shiny-sec reveal">My journey</p>
      <h2 className="section-heading reveal">Work Experience</h2>

      <div className="timeline">
        {experience.map((job) => (
          <article className="timeline-item reveal" key={job.company}>
            <span className="timeline-dot"><BriefcaseIcon size={16} /></span>
            <div className="timeline-card">
              <div className="timeline-head">
                <div>
                  <h3>{job.role}</h3>
                  <p className="timeline-sub">{job.company}</p>
                </div>
                <span className="period-pill">{job.period}</span>
              </div>
              <ul className="timeline-points">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="chip-wrap">
                {job.tags.map((t) => (
                  <span className="chip" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
