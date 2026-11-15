import { processSteps } from '../data/profile';

const Process = () => (
  <section className="pro-section" id="process">
    <div className="site-container">
      <p className="section-label shiny-sec reveal">How I work</p>
      <h2 className="section-heading reveal">My Process</h2>
      <div className="process-grid">
        {processSteps.map((step, i) => (
          <div className="process-card reveal" key={step.title} style={{ transitionDelay: `${i * 70}ms` }}>
            <span className="process-num">0{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
