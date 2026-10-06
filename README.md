# Umar Madni - Full Stack Portfolio Application

A complete MERN/MEVN-style full-stack portfolio application with React Frontend, Node.js/Express Backend, and MongoDB Database.

---

## 📁 Project Architecture

```
d:\All Projects\Projects\
├── portfolio-backend/          # Node.js + Express + MongoDB Backend
│   ├── config/db.js            # MongoDB Atlas connection
│   ├── models/                 # Project, Admin, Contact schemas
│   ├── routes/                 # Auth, Projects (CRUD), Contact APIs
│   ├── middleware/             # JWT auth & Multer file upload
│   ├── uploads/                # Dynamic uploaded project screenshots
│   ├── .env                    # Environment variables (Mongo URI, JWT)
│   ├── seed.js                 # Initial data seeder (auto runs on start)
│   └── server.js               # Express application entry
│
└── portfolio-frontend/         # React + Vite Frontend
    ├── src/
    │   ├── assets/             # Images, icons, personal photos
    │   ├── components/         # Navbar, Footer, PortfolioSection, ContactSection
    │   ├── context/            # AuthContext (JWT management)
    │   ├── pages/              # Home, ProjectDetail (Dynamic :id)
    │   │   └── admin/          # AdminLogin, AdminDashboard
    │   ├── services/api.js     # Axios API service
    │   └── index.css           # Preserved Meyawo theme styling
    └── index.html
```

---

## 🚀 Quick Start Guide (Kese Run Karein)

### 1️⃣ Backend Setup & Start

1. Open a terminal in `d:\All Projects\Projects\portfolio-backend`
2. Open `.env` file and set your **MongoDB Atlas Connection String**:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   *(Or local MongoDB: `mongodb://localhost:27017/portfolio`)*
3. Start the backend:
   ```bash
   npm run dev
   ```
   *Note: On first run, it will automatically connect and create your admin account and seed your existing projects!*

### 2️⃣ Frontend Start

1. Open another terminal in `d:\All Projects\Projects\portfolio-frontend`
2. Start the Vite dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser!

---

## 🔐 Admin Panel Details

- **Admin Login URL:** `http://localhost:5173/admin/login`
- **Default Email:** `admin@umarmadni.com`
- **Default Password:** `Admin@123456`
*(Aap .env file mein se ye credentials change bhi kar sakte hain)*

### Features in Admin Panel:
- ➕ **Add New Project:** Title, category, description, live link, GitHub link, thumbnail upload, tech stack, and modular detail panels.
- ✏️ **Edit Projects:** Modify existing project information and images.
- 👁️ **Toggle Visibility:** Hide or show any project on the live portfolio with one click.
- 🗑️ **Delete Projects:** Remove projects from the database.
- 💬 **Messages Inbox:** Read inquiries from the Contact form on your portfolio and mark as read or delete.
