import { Link } from 'react-router-dom';
import { profile, stats, roles } from '../data/profile';
import Counter from './Counter';
import Typewriter from './Typewriter';
import useResume from '../hooks/useResume';
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon, ArrowRightIcon } from './Icons';

const Hero = () => {
  const resume = useResume();

  return (
    <section className="hero-section" id="home">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-orb orb-a" aria-hidden="true" />
      <div className="hero-orb orb-b" aria-hidden="true" />
      <div className="site-container">
        <div className="hero-content">
          <span className="status-pill reveal">
            <span className="status-dot" /> Available for new projects
          </span>

          <p className="hero-greeting shiny-white reveal">Hi, I&apos;m {profile.name}</p>
          <p className="hero-typed reveal">
            I&apos;m a <Typewriter words={roles} />
          </p>

          <div className="hero-main-row reveal">
            <h1 className="hero-title">
              Full Stack <br /> Developer
            </h1>
            <p className="hero-description">
              I design and build fast, secure and responsive web applications with{' '}
              <span className="shiny-sec" style={{ fontWeight: 600 }}>
                MERN Stack (MongoDB, Express, React, Node.js), ASP.NET Core &amp; PHP Laravel
              </span>
              , from the first wireframe to production deployment.
            </p>
          </div>

          <div className="social-buttons-row reveal">
            <Link to="/projects" className="btn-solid">
              View My Work <ArrowRightIcon size={18} />
            </Link>
            <a
              href={resume.downloadUrl}
              download="Umar_Madni_CV.pdf"
              className="cv-download-btn"
            >
              <DownloadIcon size={18} />
              <span>Download CV</span>
            </a>
            <a target="_blank" rel="noreferrer" href={profile.github} aria-label="GitHub" className="icon-btn" title="GitHub">
              <GithubIcon size={22} />
            </a>
            <a target="_blank" rel="noreferrer" href={profile.linkedin} aria-label="LinkedIn" className="icon-btn" title="LinkedIn">
              <LinkedinIcon size={22} />
            </a>
            <Link to="/contact" aria-label="Contact" className="icon-btn" title="Contact">
              <MailIcon size={22} />
            </Link>
          </div>

          <div className="stats-row reveal">
            {stats.map((s) => (
              <div className="stat-item" key={s.label}>
                <span className="stat-value"><Counter value={s.value} /></span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
