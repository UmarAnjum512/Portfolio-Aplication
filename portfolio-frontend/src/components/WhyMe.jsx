import { whyMe } from '../data/profile';
import { CheckIcon } from './Icons';

const WhyMe = () => (
  <section className="pro-section" id="why">
    <div className="site-container">
      <p className="section-label shiny-sec reveal">Why choose me?</p>
      <h2 className="section-heading reveal">What You Get Working With Me</h2>
      <div className="why-grid">
        {whyMe.map((item, i) => (
          <div className="why-card reveal reveal-zoom" key={item.title} style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
            <span className="icon-chip"><CheckIcon size={20} /></span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyMe;
