import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getAllProjects,
  getMessages,
  deleteProject,
  toggleProjectVisibility,
  deleteMessage,
  markMessageRead,
  createProject,
  updateProject,
} from '../../services/api';
import toast from 'react-hot-toast';
import { assetUrl } from '../../services/url';

// ============ SIDEBAR ============
const Sidebar = ({ activeTab, setActiveTab }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully!');
  };

  return (
    <aside className="admin-dark-sidebar">
      <div className="admin-dark-sidebar-header">
        <p className="section-label shiny-sec" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>PORTFOLIO CONTROL</p>
        <h3>{admin?.name || 'Umar Madni'}</h3>
      </div>
      <nav className="admin-dark-sidebar-nav">
        <button
          className={`admin-dark-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <span>📊</span> Dashboard
        </button>
        <button
          className={`admin-dark-nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <span>📁</span> Projects
        </button>
        <button
          className={`admin-dark-nav-btn ${activeTab === 'add-project' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-project')}
        >
          <span>➕</span> Add Project
        </button>
        <button
          className={`admin-dark-nav-btn ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <span>💬</span> Messages
        </button>

        <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '1rem 0' }}></div>

        <Link to="/" className="admin-dark-nav-btn" target="_blank">
          <span>🌐</span> View Live Site
        </Link>
        <button
          className="admin-dark-nav-btn"
          onClick={handleLogout}
          style={{ color: '#ff6b6b' }}
        >
          <span>🚪</span> Logout
        </button>
      </nav>
    </aside>
  );
};

// ============ DASHBOARD TAB ============
const DashboardTab = ({ projects, messages }) => (
  <div>
    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--white-pure)', marginBottom: '1.5rem' }}>
      Analytics &amp; Overview
    </h2>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
      <div className="admin-stat-card">
        <span style={{ color: 'var(--white-icon)', fontSize: '0.9rem' }}>Total Projects</span>
        <span className="admin-stat-number">{projects.length}</span>
      </div>
      <div className="admin-stat-card">
        <span style={{ color: 'var(--white-icon)', fontSize: '0.9rem' }}>Visible on Portfolio</span>
        <span className="admin-stat-number" style={{ color: 'var(--green-dot)' }}>
          {projects.filter(p => p.isVisible).length}
        </span>
      </div>
      <div className="admin-stat-card">
        <span style={{ color: 'var(--white-icon)', fontSize: '0.9rem' }}>Total Inquiries</span>
        <span className="admin-stat-number">{messages.length}</span>
      </div>
      <div className="admin-stat-card">
        <span style={{ color: 'var(--white-icon)', fontSize: '0.9rem' }}>Unread Messages</span>
        <span className="admin-stat-number" style={{ color: '#ff7676' }}>
          {messages.filter(m => !m.isRead).length}
        </span>
      </div>
    </div>

    <div className="panel-card" style={{ padding: '1.75rem' }}>
      <h3 style={{ fontSize: '1.25rem', color: 'var(--white-pure)', marginBottom: '1.25rem' }}>Recent Projects</h3>
      {projects.length === 0 ? (
        <p style={{ color: 'var(--white-icon)' }}>No projects available.</p>
      ) : (
        projects.slice(0, 5).map(p => (
          <div
            key={p._id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.85rem 0',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div>
              <strong style={{ color: 'var(--white-pure)', fontSize: '1.05rem' }}>{p.title}</strong>
              <span style={{ color: 'var(--white-icon)', fontSize: '0.85rem', marginLeft: '0.75rem' }}>({p.category})</span>
            </div>
            <span
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                backgroundColor: p.isVisible ? 'rgba(169, 255, 91, 0.15)' : 'rgba(255, 118, 118, 0.15)',
                color: p.isVisible ? 'var(--green-dot)' : '#ff7676',
              }}
            >
              {p.isVisible ? '● Live' : '○ Hidden'}
            </span>
          </div>
        ))
      )}
    </div>
  </div>
);

// ============ PROJECTS TAB ============
const ProjectsTab = ({ projects, setProjects, setActiveTab, setEditProject }) => {
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p._id !== id));
      toast.success('Project deleted!');
    } catch {
      toast.error('Failed to delete project!');
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await toggleProjectVisibility(id);
      setProjects(prev => prev.map(p => p._id === id ? res.data.data : p));
      toast.success('Visibility updated!');
    } catch {
      toast.error('Failed to update visibility!');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--white-pure)' }}>Manage Projects</h2>
        <button
          className="detail-btn-primary"
          onClick={() => setActiveTab('add-project')}
          style={{ border: 'none', cursor: 'pointer' }}
        >
          + Add New Project
        </button>
      </div>

      <div className="panel-card" style={{ padding: '0.5rem', overflowX: 'auto' }}>
        <table className="admin-dark-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Title</th>
              <th>Category</th>
              <th>Visibility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--white-icon)' }}>
                  No projects yet. Click "+ Add New Project" to get started!
                </td>
              </tr>
            ) : (
              projects.map(project => (
                <tr key={project._id}>
                  <td>
                    {project.thumbnail ? (
                      <img
                        src={assetUrl(project.thumbnail)}
                        alt={project.title}
                        style={{ width: '60px', height: '42px', objectFit: 'cover', borderRadius: '0.5rem' }}
                      />
                    ) : (
                      <div style={{ width: '60px', height: '42px', backgroundColor: '#202020', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        📁
                      </div>
                    )}
                  </td>
                  <td>
                    <strong>{project.title}</strong>
                  </td>
                  <td>
                    <span className="project-category-tag" style={{ position: 'static' }}>
                      {project.category}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backgroundColor: project.isVisible ? 'rgba(169, 255, 91, 0.15)' : 'rgba(255, 118, 118, 0.15)',
                        color: project.isVisible ? 'var(--green-dot)' : '#ff7676',
                      }}
                    >
                      {project.isVisible ? 'Live' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="icon-btn"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        onClick={() => { setEditProject(project); setActiveTab('add-project'); }}
                        title="Edit Project"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="icon-btn"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        onClick={() => handleToggle(project._id)}
                        title="Toggle Visibility"
                      >
                        {project.isVisible ? 'Hide' : 'Show'}
                      </button>
                      <button
                        className="icon-btn"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', color: '#ff6b6b' }}
                        onClick={() => handleDelete(project._id, project.title)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============ ADD / EDIT PROJECT TAB ============
const AddProjectTab = ({ setActiveTab, setProjects, editProject, setEditProject }) => {
  const isEdit = !!editProject;
  const [form, setForm] = useState({
    title: editProject?.title || '',
    category: editProject?.category || 'Web Application',
    description: editProject?.description || '',
    githubLink: editProject?.githubLink || '',
    liveLink: editProject?.liveLink || '',
    techStack: {
      frontend: editProject?.techStack?.frontend || '',
      backend: editProject?.techStack?.backend || '',
      database: editProject?.techStack?.database || '',
      other: editProject?.techStack?.other || '',
    },
    panels: editProject?.panels || [],
    isVisible: editProject?.isVisible !== undefined ? editProject.isVisible : true,
    order: editProject?.order || 0,
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('techStack.')) {
      const key = name.split('.')[1];
      setForm(prev => ({ ...prev, techStack: { ...prev.techStack, [key]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const addPanel = () => {
    setForm(prev => ({
      ...prev,
      panels: [...prev.panels, { title: '', subtitle: '', description: '', image: '', imagePosition: 'left' }],
    }));
  };

  const updatePanel = (index, field, value) => {
    const newPanels = [...form.panels];
    newPanels[index] = { ...newPanels[index], [field]: value };
    setForm(prev => ({ ...prev, panels: newPanels }));
  };

  const removePanel = (index) => {
    setForm(prev => ({ ...prev, panels: prev.panels.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('category', form.category);
      formData.append('description', form.description);
      formData.append('githubLink', form.githubLink);
      formData.append('liveLink', form.liveLink);
      formData.append('techStack', JSON.stringify(form.techStack));
      formData.append('panels', JSON.stringify(form.panels));
      formData.append('isVisible', form.isVisible);
      formData.append('order', form.order);
      if (thumbnail) formData.append('thumbnail', thumbnail);

      let res;
      if (isEdit) {
        res = await updateProject(editProject._id, formData);
        setProjects(prev => prev.map(p => p._id === editProject._id ? res.data.data : p));
        toast.success('Project updated successfully!');
      } else {
        res = await createProject(formData);
        setProjects(prev => [res.data.data, ...prev]);
        toast.success('Project added successfully! 🎉');
      }

      setEditProject(null);
      setActiveTab('projects');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--white-pure)' }}>
          {isEdit ? 'Edit Project' : 'Add New Project'}
        </h2>
        <button
          className="detail-btn-outline"
          onClick={() => { setEditProject(null); setActiveTab('projects'); }}
        >
          ← Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Core Info */}
        <div className="panel-card">
          <h3 style={{ fontSize: '1.25rem', color: 'var(--white-pure)', marginBottom: '1.5rem' }}>Basic Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--white-icon)', marginBottom: '0.4rem' }}>
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                className="dark-input"
                placeholder="e.g. Nexus Service Marketing"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--white-icon)', marginBottom: '0.4rem' }}>
                Category *
              </label>
              <select
                name="category"
                className="dark-input"
                value={form.category}
                onChange={handleChange}
                style={{ cursor: 'pointer' }}
              >
                <option value="Web Application">Web Application</option>
                <option value="Web Designing">Web Designing</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Desktop App">Desktop App</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--white-icon)', marginBottom: '0.4rem' }}>
                Full Description *
              </label>
              <textarea
                name="description"
                className="dark-textarea"
                rows="4"
                placeholder="Detailed project summary, goals and architecture..."
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--white-icon)', marginBottom: '0.4rem' }}>
                GitHub Repository URL
              </label>
              <input
                type="url"
                name="githubLink"
                className="dark-input"
                placeholder="https://github.com/..."
                value={form.githubLink}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--white-icon)', marginBottom: '0.4rem' }}>
                Live Demo URL
              </label>
              <input
                type="url"
                name="liveLink"
                className="dark-input"
                placeholder="https://example.com"
                value={form.liveLink}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--white-icon)', marginBottom: '0.4rem' }}>
                Thumbnail Screenshot
              </label>
              {isEdit && editProject.thumbnail && (
                <img
                  src={assetUrl(editProject.thumbnail)}
                  alt="Current"
                  style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '0.5rem', display: 'block' }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="dark-input"
                style={{ padding: '0.6rem' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="checkbox"
                name="isVisible"
                id="isVisibleCheckbox"
                checked={form.isVisible}
                onChange={handleChange}
                style={{ width: '20px', height: '20px', accentColor: 'var(--sec)', cursor: 'pointer' }}
              />
              <label htmlFor="isVisibleCheckbox" style={{ color: 'var(--white-pure)', cursor: 'pointer', fontSize: '0.95rem' }}>
                Show project on public portfolio
              </label>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="panel-card">
          <h3 style={{ fontSize: '1.25rem', color: 'var(--white-pure)', marginBottom: '1.5rem' }}>Tech Stack Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--sec)', fontWeight: '600', marginBottom: '0.4rem' }}>
                Frontend
              </label>
              <input
                type="text"
                name="techStack.frontend"
                className="dark-input"
                placeholder="e.g. React, Bootstrap, Chart.js"
                value={form.techStack.frontend}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--sec)', fontWeight: '600', marginBottom: '0.4rem' }}>
                Backend
              </label>
              <input
                type="text"
                name="techStack.backend"
                className="dark-input"
                placeholder="e.g. ASP.NET Core MVC (C#), Laravel"
                value={form.techStack.backend}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--sec)', fontWeight: '600', marginBottom: '0.4rem' }}>
                Database
              </label>
              <input
                type="text"
                name="techStack.database"
                className="dark-input"
                placeholder="e.g. SQL Server, MySQL, MongoDB"
                value={form.techStack.database}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--sec)', fontWeight: '600', marginBottom: '0.4rem' }}>
                Architecture / Security
              </label>
              <input
                type="text"
                name="techStack.other"
                className="dark-input"
                placeholder="e.g. JWT Auth, Role-Based Access, REST"
                value={form.techStack.other}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Panels */}
        <div className="panel-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--white-pure)' }}>
              Sub-Panels / Modules (User Panel, Admin, etc.)
            </h3>
            <button
              type="button"
              className="detail-btn-outline"
              onClick={addPanel}
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              + Add Sub-Panel
            </button>
          </div>

          {form.panels.length === 0 ? (
            <p style={{ color: 'var(--white-icon)', textAlign: 'center', padding: '2rem 0' }}>
              No custom panels added. Click "+ Add Sub-Panel" to showcase distinct user/admin modules.
            </p>
          ) : (
            form.panels.map((panel, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <strong style={{ color: 'var(--sec)' }}>Panel #{idx + 1}</strong>
                  <button
                    type="button"
                    onClick={() => removePanel(idx)}
                    style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Remove
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-icon)', marginBottom: '0.3rem' }}>Title</label>
                    <input
                      type="text"
                      placeholder="e.g. User Panel"
                      className="dark-input"
                      value={panel.title}
                      onChange={(e) => updatePanel(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-icon)', marginBottom: '0.3rem' }}>Subtitle</label>
                    <input
                      type="text"
                      placeholder="e.g. Customer"
                      className="dark-input"
                      value={panel.subtitle}
                      onChange={(e) => updatePanel(idx, 'subtitle', e.target.value)}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-icon)', marginBottom: '0.3rem' }}>Description</label>
                    <textarea
                      placeholder="Panel workflow details..."
                      className="dark-textarea"
                      rows="2"
                      value={panel.description}
                      onChange={(e) => updatePanel(idx, 'description', e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-icon)', marginBottom: '0.3rem' }}>Image Position</label>
                    <select
                      className="dark-input"
                      value={panel.imagePosition}
                      onChange={(e) => updatePanel(idx, 'imagePosition', e.target.value)}
                    >
                      <option value="left">Image on Left</option>
                      <option value="right">Image on Right</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-icon)', marginBottom: '0.3rem' }}>Image URL / Path</label>
                    <input
                      type="text"
                      placeholder="/uploads/... ya image URL"
                      className="dark-input"
                      value={panel.image}
                      onChange={(e) => updatePanel(idx, 'image', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="detail-btn-primary" disabled={loading} style={{ border: 'none', cursor: 'pointer' }}>
            {loading ? 'Saving to Database...' : (isEdit ? 'Update Project →' : 'Publish Project →')}
          </button>
        </div>
      </form>
    </div>
  );
};

// ============ MESSAGES TAB ============
const MessagesTab = ({ messages, setMessages }) => {
  const handleRead = async (id) => {
    try {
      await markMessageRead(id);
      setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: true } : m));
      toast.success('Marked as read');
    } catch {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(m => m._id !== id));
      toast.success('Message deleted!');
    } catch {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--white-pure)', marginBottom: '2rem' }}>
        Inquiries &amp; Messages
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 ? (
          <div className="panel-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--white-icon)' }}>No messages received yet.</p>
          </div>
        ) : (
          messages.map(msg => (
            <div
              key={msg._id}
              className="panel-card"
              style={{
                borderColor: msg.isRead ? 'var(--border-subtle)' : 'var(--sec)',
                backgroundColor: msg.isRead ? 'var(--card-bg)' : 'rgba(164, 118, 255, 0.05)',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <strong style={{ color: 'var(--white-pure)', fontSize: '1.1rem' }}>{msg.name}</strong>{' '}
                  <span style={{ color: 'var(--white-icon)', fontSize: '0.9rem' }}>&lt;{msg.email}&gt;</span>
                  {!msg.isRead && (
                    <span className="project-category-tag" style={{ position: 'static', marginLeft: '0.75rem', fontSize: '0.7rem' }}>
                      NEW
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--white-icon)', fontSize: '0.8rem' }}>
                    {new Date(msg.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  {!msg.isRead && (
                    <button
                      onClick={() => handleRead(msg._id)}
                      className="icon-btn"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', color: 'var(--green-dot)' }}
                    >
                      ✓ Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="icon-btn"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', color: '#ff6b6b' }}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <p style={{ color: 'var(--white)', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ============ MAIN ADMIN DASHBOARD ============
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllProjects(), getMessages()])
      .then(([pRes, mRes]) => {
        setProjects(pRes.data.data);
        setMessages(mRes.data.data);
      })
      .catch(() => toast.error('Failed to load portfolio data!'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading-center" style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dark-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="admin-dark-main">
        {activeTab === 'dashboard' && <DashboardTab projects={projects} messages={messages} />}
        {activeTab === 'projects' && (
          <ProjectsTab
            projects={projects}
            setProjects={setProjects}
            setActiveTab={setActiveTab}
            setEditProject={setEditProject}
          />
        )}
        {activeTab === 'add-project' && (
          <AddProjectTab
            setActiveTab={setActiveTab}
            setProjects={setProjects}
            editProject={editProject}
            setEditProject={setEditProject}
          />
        )}
        {activeTab === 'messages' && (
          <MessagesTab messages={messages} setMessages={setMessages} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
