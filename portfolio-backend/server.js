const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars (local .env; Vercel par dashboard ke env vars use hote hain)
dotenv.config();

const connectDB = require('./config/db');
const { ensureDefaultData } = require('./utils/defaultData');

const app = express();

// ---------- CORS ----------
// FRONTEND_URL me comma se alag karke multiple URLs de sakte hain
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''))
  .filter(Boolean);
allowedOrigins.push('http://localhost:5173', 'http://localhost:3000');

app.use(
  cors({
    origin: (origin, cb) => {
      // Postman / server-to-server requests me origin nahi hota
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) return cb(null, true);
      return cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (DB ki zaroorat nahi)
app.get('/', (req, res) => res.json({ status: 'OK', message: 'Portfolio API is running!' }));
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running!' });
});

// Har request se pehle DB connect (cached) aur default data ensure karo
app.use(async (req, res, next) => {
  try {
    await connectDB();
    await ensureDefaultData();
    next();
  } catch (error) {
    console.error('DB error:', error.message);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/images', require('./routes/images'));

// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack || err.message);
  const status = err.status || (err.code === 'LIMIT_FILE_SIZE' ? 400 : 500);
  const message = err.code === 'LIMIT_FILE_SIZE' ? 'Image 4MB se choti honi chahiye' : err.message;
  res.status(status).json({ message: message || 'Something went wrong!' });
});

// Local development me server start karo. Vercel par app export hoti hai (listen nahi).
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}/api`);
  });
}

module.exports = app;
