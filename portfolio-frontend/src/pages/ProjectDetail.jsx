import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assetUrl } from '../services/url';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProject(id)
      .then((res) => setProject(res.data.data))
      .catch(() => setError('Project not found!'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-center" style={{ minHeight: '80vh' }}>
          <div className="spinner"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <div className="site-container" style={{ padding: '12rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--sec)', marginBottom: '1rem' }}>404</h2>
          <p style={{ color: 'var(--white-icon)', marginBottom: '2rem' }}>The project you requested could not be found.</p>
          <Link to="/" className="detail-btn-primary">← Back to Portfolio</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="detail-page-wrapper">
        {/* Detail Hero Header */}
        <section className="detail-hero">
          <div className="site-container">
            <Link to="/#projects" className="detail-back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to all projects</span>
            </Link>

            <span className="project-category-tag" style={{ position: 'static', display: 'inline-block', marginBottom: '1rem' }}>
              {project.category || 'Web Application'}
            </span>

            <h1 className="detail-title">{project.title}</h1>

            <div className="detail-links-group" style={{ marginTop: '1.5rem' }}>
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="detail-btn-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
                  </svg>
                  <span>Source Code (GitHub)</span>
                </a>
              )}

              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="detail-btn-outline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span>Live Preview</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Content Body */}
        <div className="site-container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
          {/* Main Description */}
          {project.description && (
            <div className="panel-card" style={{ marginBottom: '3rem' }}>
              <p className="section-label shiny-sec">Project Overview</p>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--white-pure)', marginBottom: '1rem' }}>
                Architecture &amp; Mission
              </h3>
              <p style={{ color: 'var(--white-icon)', fontSize: '1.05rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {project.description}
              </p>
            </div>
          )}

          {/* Panels (e.g. User Panel, Admin Panel, Staff etc.) */}
          {project.panels && project.panels.length > 0 && (
            <div className="panels-container">
              {project.panels.map((panel, idx) => (
                <div key={idx} className="panel-card">
                  <div className="panel-grid">
                    {panel.imagePosition === 'left' ? (
                      <>
                        <div>
                          {panel.image && (
                            <img src={assetUrl(panel.image)} alt={panel.title} className="panel-img" />
                          )}
                        </div>
                        <div>
                          {panel.subtitle && (
                            <span className="section-label shiny-sec" style={{ display: 'block', fontSize: '0.9rem' }}>
                              {panel.subtitle}
                            </span>
                          )}
                          <h3 style={{ fontSize: '1.8rem', color: 'var(--white-pure)', marginBottom: '1rem' }}>
                            {panel.title}
                          </h3>
                          <p style={{ color: 'var(--white-icon)', fontSize: '1rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                            {panel.description}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          {panel.subtitle && (
                            <span className="section-label shiny-sec" style={{ display: 'block', fontSize: '0.9rem' }}>
                              {panel.subtitle}
                            </span>
                          )}
                          <h3 style={{ fontSize: '1.8rem', color: 'var(--white-pure)', marginBottom: '1rem' }}>
                            {panel.title}
                          </h3>
                          <p style={{ color: 'var(--white-icon)', fontSize: '1rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                            {panel.description}
                          </p>
                        </div>
                        <div>
                          {panel.image && (
                            <img src={assetUrl(panel.image)} alt={panel.title} className="panel-img" />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Box */}
          {project.techStack && (
            <div className="tech-grid-box">
              <h3>🛠 Tech Stack Specifications</h3>
              <div className="tech-grid-items">
                {project.techStack.frontend && (
                  <div className="tech-item-row">
                    <span className="tech-item-label">Frontend</span>
                    <span className="tech-item-value">{project.techStack.frontend}</span>
                  </div>
                )}
                {project.techStack.backend && (
                  <div className="tech-item-row">
                    <span className="tech-item-label">Backend</span>
                    <span className="tech-item-value">{project.techStack.backend}</span>
                  </div>
                )}
                {project.techStack.database && (
                  <div className="tech-item-row">
                    <span className="tech-item-label">Database</span>
                    <span className="tech-item-value">{project.techStack.database}</span>
                  </div>
                )}
                {project.techStack.other && (
                  <div className="tech-item-row">
                    <span className="tech-item-label">Architecture / Security</span>
                    <span className="tech-item-value">{project.techStack.other}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/#projects" className="more-projects-btn">
              ← Return to Projects
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetail;
