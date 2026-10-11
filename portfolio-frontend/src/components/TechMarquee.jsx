const technologies = [
  'MERN Stack',
  'MongoDB',
  'Express.js',
  'React',
  'Node.js',
  'Mongoose',
  'ASP.NET Core',
  'C#',
  'PHP',
  'Laravel',
  'Angular',
  'Bootstrap',
  'TailwindCSS',
  'SQL Server',
  'MySQL',
  'Entity Framework Core',
  'JavaScript (ES6+)',
  'jQuery',
  'RESTful APIs',
  'JWT Authentication',
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
