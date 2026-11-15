import { useState } from 'react';
import { services } from '../data/profile';

const Services = () => {
  const [open, setOpen] = useState([0]);

  const toggle = (idx) =>
    setOpen((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));

  const renderCard = (service, idx) => {
    const isOpen = open.includes(idx);
    return (
      <div
        className={`service-card reveal ${isOpen ? 'open' : ''}`}
        key={service.title}
        style={{ order: idx, transitionDelay: `${idx * 70}ms` }}
      >
        <button type="button" className="service-head" onClick={() => toggle(idx)} aria-expanded={isOpen}>
          <span className="service-number">0{idx + 1}</span>
          <h3>{service.title}</h3>
          <svg className="service-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </button>
        <div className="service-body">
          <ul>
            {service.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section className="pro-section" id="services">
      <div className="site-container">
        <p className="section-label shiny-sec reveal">What I do?</p>
        <h2 className="section-heading reveal">Services &amp; Expertise</h2>

        {/* Do independent columns: ek card khulne se doosre column ki height par asar nahi padta */}
        <div className="services-pro-grid">
          <div className="services-col">{services.map((s, i) => (i % 2 === 0 ? renderCard(s, i) : null))}</div>
          <div className="services-col">{services.map((s, i) => (i % 2 === 1 ? renderCard(s, i) : null))}</div>
        </div>
      </div>
    </section>
  );
};

export default Services;
