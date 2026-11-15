import { technologies } from '../data/profile';

const Row = ({ items, reverse }) => (
  <div className="marquee-container" aria-hidden="true">
    <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
      {[...items, ...items].map((tech, index) => (
        <div key={index} className="tech-badge">
          <span style={{ color: 'var(--sec)', fontSize: '0.8rem' }}>✦</span>
          <span>{tech}</span>
        </div>
      ))}
    </div>
  </div>
);

const TechMarquee = () => {
  const half = Math.ceil(technologies.length / 2);
  return (
    <div className="marquee-stack">
      <Row items={technologies.slice(0, half)} />
      <Row items={technologies.slice(half)} reverse />
    </div>
  );
};

export default TechMarquee;
