const technologies = [
  'ASP.NET Core',
  'C#',
  'PHP',
  'Laravel',
  'React',
  'Angular',
  'Bootstrap',
  'TailwindCSS',
  'SQL Server',
  'MySQL',
  'Entity Framework Core',
  'JavaScript (ES6+)',
  'jQuery',
  'Node.js',
  'Express.js',
  'MongoDB',
  'RESTful APIs',
  'Git & GitHub',
];

const TechMarquee = () => {
  return (
    <div className="marquee-container" aria-hidden="true">
      <div className="marquee-track">
        {/* Double the list to create a seamless infinite loop */}
        {[...technologies, ...technologies].map((tech, index) => (
          <div key={index} className="tech-badge">
            <span style={{ color: 'var(--sec)', fontSize: '0.8rem' }}>✦</span>
            <span>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
