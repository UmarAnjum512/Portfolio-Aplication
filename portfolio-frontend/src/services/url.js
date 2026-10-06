// API ka base URL. Production me VITE_API_URL set karo (e.g. https://my-backend.vercel.app/api)
export const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

// Image path ko full URL me convert karo
//  - http(s)/data URL: jaisa hai waisa
//  - /api/images/xxx : backend (database) se aayi hui uploaded image
//  - /uploads/xxx    : frontend ke public folder ki static image
export const assetUrl = (path) => {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith('/api/')) return API_BASE + path.slice(4);
  return path;
};
