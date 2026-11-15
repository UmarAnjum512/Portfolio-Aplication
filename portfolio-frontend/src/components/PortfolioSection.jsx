import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/api';
import { assetUrl } from '../services/url';
import { profile } from '../data/profile';
import useReveal from '../hooks/useReveal';
import { GithubIcon, ExternalIcon, ArrowRightIcon, GlobeIcon, FolderIcon } from './Icons';

// techStack ke text se chhote chips banao (max 5)
const buildChips = (techStack = {}) => {
  const chips = [];
  ['frontend', 'backend', 'database'].forEach((key) => {
    const text = techStack[key];
    if (!text) return;
    text
      .replace(/\([^)]*\)/g, '')
      .split(',')
      .map((t) => t.replace(/\.$/, '').split(' for ')[0].trim())
      .filter((t) => t && t.length <= 24)
      .slice(0, key === 'frontend' ? 2 : 1)
      .forEach((t) => {
        if (!chips.includes(t)) chips.push(t);
      });
  });
  return chips.slice(0, 5);
};

const ProjectCard = ({ project, index }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const chips = buildChips(project.techStack);
  const showImage = project.thumbnail && !imgFailed;

  return (
    <article className="project-card reveal" style={{ transitionDelay: `${(index % 2) * 80}ms` }}>
      <div className="project-card-media">
        {showImage ? (
          <img
            src={assetUrl(project.thumbnail)}
            alt={`${project.title} screenshot`}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="project-card-placeholder"><FolderIcon size={44} /></div>
        )}
        <span className="project-category-tag">{project.category || 'Web Application'}</span>
      </div>

      <div className="project-card-body">
        <h3 className="project-card-heading">
          <Link to={`/project/${project._id}`} className="project-stretched-link">
            {project.title}
          </Link>
        </h3>
        <p className="project-card-desc">{project.description}</p>

        {chips.length > 0 && (
          <div className="chip-wrap">
            {chips.map((c) => (
              <span className="chip chip-sm" key={c}>{c}</span>
            ))}
          </div>
        )}

        <div className="project-card-footer">
          <span className="project-more">
            View case study <ArrowRightIcon size={16} />
          </span>
          <div className="project-links">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="mini-icon-btn" title="Source code" aria-label={`${project.title} source code`}>
                <GithubIcon size={18} />
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="mini-icon-btn" title="Live demo" aria-label={`${project.title} live demo`}>
                <ExternalIcon size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const PortfolioSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data.data))
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))], [projects]);
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  useReveal([loading, filter, projects.length]);

  return (
    <section className="pro-section" id="projects">
      <div className="site-container">
        <p className="section-label shiny-sec reveal">My work</p>
        <h2 className="section-heading reveal">Featured Projects</h2>

        {categories.length > 2 && (
          <div className="filter-row reveal" role="tablist" aria-label="Project categories">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filter === c}
                className={`filter-pill ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="loading-center"><div className="spinner"></div></div>
        ) : failed ? (
          <p className="empty-note">Projects could not be loaded right now. Please try again in a moment.</p>
        ) : visible.length === 0 ? (
          <p className="empty-note">No projects to show yet.</p>
        ) : (
          <div className="project-grid">
            {visible.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}

        <div className="more-projects-bar">
          <a href={profile.github} target="_blank" rel="noreferrer" className="more-projects-btn">
            <GlobeIcon size={20} />
            <span>Explore more on GitHub</span>
            <GithubIcon size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
