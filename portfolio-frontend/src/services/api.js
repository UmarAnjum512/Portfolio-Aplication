import axios from 'axios';
import { API_BASE } from './url';

const API = axios.create({
  baseURL: API_BASE,
});

// Request interceptor - har request mein token add karo
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - 401 par logout karo
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH ====================
export const loginAdmin = (credentials) => API.post('/auth/login', credentials);
export const getMe = () => API.get('/auth/me');

// ==================== PROJECTS ====================
export const getProjects = () => API.get('/projects');
export const getAllProjects = () => API.get('/projects/all');
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (formData) =>
  API.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateProject = (id, formData) =>
  API.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const toggleProjectVisibility = (id) =>
  API.patch(`/projects/${id}/toggle-visibility`);

// ==================== CONTACT ====================
export const submitContact = (data) => API.post('/contact', data);
export const getMessages = () => API.get('/contact');
export const markMessageRead = (id) => API.patch(`/contact/${id}/read`);
export const deleteMessage = (id) => API.delete(`/contact/${id}`);

export default API;
