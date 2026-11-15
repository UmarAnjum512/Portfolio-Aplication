import { skillGroups } from '../data/profile';
import { CodeIcon, DatabaseIcon, LayoutIcon, RocketIcon } from './Icons';

const icons = [LayoutIcon, CodeIcon, DatabaseIcon, RocketIcon];

const Skills = () => (
  <section className="pro-section" id="skills">
    <div className="site-container">
      <p className="section-label shiny-sec reveal">My toolkit</p>
      <h2 className="section-heading reveal">Skills &amp; Technologies</h2>

      <div className="skills-grid">
        {skillGroups.map((group, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div className="skill-card reveal reveal-zoom" key={group.title} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="skill-card-head">
                <span className="icon-chip"><Icon size={20} /></span>
                <h3>{group.title}</h3>
              </div>
              <div className="chip-wrap">
                {group.items.map((item) => (
                  <span className="chip" key={item}>{item}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Skills;
