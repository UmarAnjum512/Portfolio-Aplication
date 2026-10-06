import { useState } from 'react';
import myPic from '../assets/MyPic.jpg';

const servicesData = [
  {
    id: 1,
    title: 'Full-Stack Web Development',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="M6 8h.01"></path>
        <path d="M10 8h.01"></path>
        <path d="M14 8h.01"></path>
      </svg>
    ),
    items: [
      'Enterprise web systems with ASP.NET Core MVC (C#) & PHP Laravel',
      'Scalable, secure RESTful APIs with role-based JWT & Session auth',
      'Robust server-side logic, high throughput & automated workflows',
    ],
  },
  {
    id: 2,
    title: 'Frontend & Modern Interfaces',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="10" height="14" x="3" y="8" rx="2"></rect>
        <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4"></path>
        <path d="M8 18h.01"></path>
      </svg>
    ),
    items: [
      'Single Page Applications (SPAs) with React & Angular',
      'Ultra-responsive mobile-first designs with Bootstrap & modern CSS',
      'Interactive data dashboards & analytics powered by Chart.js',
    ],
  },
  {
    id: 3,
    title: 'Database Architecture & Management',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
      </svg>
    ),
    items: [
      'Relational databases with SQL Server & MySQL (Entity Framework Core)',
      'NoSQL document management with MongoDB & Mongoose',
      'Normalized schema design, query optimization & secure data pipelines',
    ],
  },
  {
    id: 4,
    title: 'Dedicated Work Ethic & Code Quality',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
      </svg>
    ),
    items: [
      'Hafiz-e-Quran discipline brought into every technical problem',
      'Clean, maintainable, modular code adhering to industry best practices',
      'Active developer at Aptech building production-grade web applications',
    ],
  },
];

const Services = () => {
  const [openId, setOpenId] = useState(1);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="services-section" id="services">
      <div className="site-container">
        <p className="section-label shiny-sec">What I do?</p>
        <h2 className="section-heading">Services &amp; Expertise</h2>

        <div className="services-grid">
          {/* Left: Accordion */}
          <div className="accordion-list">
            {servicesData.map((service) => {
              const isOpen = openId === service.id;
              return (
                <div
                  key={service.id}
                  className={`accordion-item ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleAccordion(service.id)}
                >
                  <div className="accordion-header">
                    <div className="accordion-title-wrap">
                      <span className="accordion-icon">{service.icon}</span>
                      <h3 className="accordion-title">{service.title}</h3>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="accordion-arrow"
                    >
                      <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                    </svg>
                  </div>
                  {isOpen && (
                    <div className="accordion-content">
                      <ul>
                        {service.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Avatar Card */}
          <div className="avatar-card">
            <div className="avatar-img-wrap">
              <img src={myPic} alt="Umar Madni" className="avatar-img" />
            </div>
            <div className="avatar-info">
              <h4>Umar Madni</h4>
              <p>Full-Stack Developer • .NET &amp; PHP</p>
              <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <span className="tech-badge" style={{ fontSize: '0.75rem', padding: '0.35rem 0.85rem' }}>
                  <span style={{ color: 'var(--green-dot)' }}>●</span> Available for Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
