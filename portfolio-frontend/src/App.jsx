import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import './index.css';
import './pro.css';
import './navbar.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '0.9rem',
            },
          }}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
                <h1>404 - Page Not Found</h1>
                <a href="/" className="btn btn-primary">Back to Home</a>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
