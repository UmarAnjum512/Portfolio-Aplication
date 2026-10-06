import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginAdmin(form);
      login(res.data.token, res.data.admin);
      toast.success('Welcome back, ' + res.data.admin.name + '! 👋');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--background)', padding: '1.5rem' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p className="section-label shiny-sec" style={{ fontSize: '0.85rem' }}>PORTFOLIO CONTROL</p>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--white-pure)', marginBottom: '0.5rem' }}>
            Admin Access
          </h2>
          <p style={{ color: 'var(--white-icon)', fontSize: '0.9rem' }}>
            Sign in to manage projects and read messages
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--white-icon)', fontWeight: '500' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="dark-input"
              placeholder="admin@umarmadni.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--white-icon)', fontWeight: '500' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              className="dark-input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="dark-submit-btn"
            disabled={loading}
            style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In →'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" style={{ color: 'var(--white-icon)', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
