import { useState } from 'react';
import { faqs } from '../data/profile';

const Faq = () => {
  const [open, setOpen] = useState([0]);
  const toggle = (i) => setOpen((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  return (
    <section className="pro-section" id="faq">
      <div className="site-container">
        <p className="section-label shiny-sec reveal">Good to know</p>
        <h2 className="section-heading reveal">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open.includes(i);
            return (
              <div className={`faq-item reveal ${isOpen ? 'open' : ''}`} key={f.q} style={{ transitionDelay: `${i * 50}ms` }}>
                <button type="button" className="faq-q" aria-expanded={isOpen} onClick={() => toggle(i)}>
                  <span>{f.q}</span>
                  <span className="faq-plus" aria-hidden="true" />
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
