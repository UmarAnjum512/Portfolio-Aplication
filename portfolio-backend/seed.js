const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

const initialProjects = [
  {
    title: 'Nexus Service Marketing',
    category: 'Web Application',
    description: 'A comprehensive multi-panel service marketing and management application developed with ASP.NET Core MVC. Features specialized workflows for Customers, Managers, Retail Staff, Technical Field Staff, and Accounts Department.',
    thumbnail: '/uploads/Nexus.PNG',
    githubLink: 'https://github.com/UmarAnjum512/Nexus_Service_Marketing.git',
    liveLink: '',
    techStack: {
      frontend: 'HTML5, CSS3, Bootstrap (Grid & Layouts), JavaScript (jQuery), Chart.js for data visualization.',
      backend: 'ASP.NET Core MVC (C#).',
      database: 'SQL Server (Entity Framework Core).',
      other: 'Secure multi-user authentication system (Customers, Admins) using ASP.NET Sessions.',
    },
    panels: [
      {
        title: 'User Panel',
        subtitle: 'Customer',
        description: 'User system ka end customer hota hai. User apna account register aur login karta hai, profile maintain karta hai, internet/telephone plans explore karta hai, order place karta hai aur order status aur invoices track karta hai.',
        image: '/uploads/Nexus.PNG',
        imagePosition: 'left',
      },
      {
        title: 'Admin Panel',
        subtitle: 'Manager',
        description: 'Admin system ka overall control handle karta hai. Employees ke accounts create/update/delete karta hai, retail outlets manage karta hai, plans define karta hai aur inventory monitor karta hai.',
        image: '/uploads/AdminNexus.PNG',
        imagePosition: 'right',
      },
      {
        title: 'Employee Panel',
        subtitle: 'Retail Staff',
        description: 'Employee customers ke sath direct interaction karta hai. New customer entry, service orders placement, available plans explain karna aur payments record maintain karna handle karta hai.',
        image: '/uploads/EmployeeNexus.PNG',
        imagePosition: 'left',
      },
      {
        title: 'Technical Panel',
        subtitle: 'Technical Staff',
        description: 'Technical staff connection feasibility check karta hai, service availability confirm karta hai, order technically approve/reject karta hai aur active connection setup karta hai.',
        image: '/uploads/TechnicalNexs.PNG',
        imagePosition: 'right',
      },
      {
        title: 'Accounts Panel',
        subtitle: 'Accounts Department',
        description: 'Accounts department billing aur finance handle karta hai. Approved orders ke liye bills generate karna, taxes calculate karna, discounts apply karna aur payment verification maintain karna.',
        image: '/uploads/AccountsNexus.PNG',
        imagePosition: 'left',
      },
    ],
    order: 1,
    isVisible: true,
  },
  {
    title: 'Pizza Ordering Management System',
    category: 'Web Application',
    description: 'Pizza Delicious ek complete, full-stack web application hai jo customers ko behtareen online pizza ordering experience aur admins ko powerful management tools provide karti hai. Front-end ki responsiveness se lekar back-end ki business logic tak seamless integration.',
    thumbnail: '/uploads/Pizza.PNG',
    githubLink: 'https://github.com/UmarAnjum512/Pizza_App.git',
    liveLink: '',
    techStack: {
      frontend: 'HTML5, CSS3, Bootstrap, JavaScript (jQuery), Chart.js.',
      backend: 'ASP.NET Core MVC (C#).',
      database: 'SQL Server (Entity Framework Core).',
      other: 'Session Management, Role-Based Access Control.',
    },
    panels: [
      {
        title: 'Pizza Delicious – End-to-End Pizza Ordering & Management',
        subtitle: 'Customer & Admin Hub',
        description: 'Dynamic Landing Page with interactive menu, streamlined cart and checkout with real-time pricing calculation, dynamic order tracking with animated progress bar, and comprehensive admin dashboard featuring sales analytics via Chart.js.',
        image: '/uploads/pizzaDashboard.PNG',
        imagePosition: 'right',
      },
    ],
    order: 2,
    isVisible: true,
  },
  {
    title: 'Online Web Templates & Portfolios',
    category: 'Web Designing',
    description: 'Creative, ultra-responsive web designs and landing page templates built with modern layout frameworks, custom CSS animations, and smooth UX.',
    thumbnail: '/uploads/Online.PNG',
    githubLink: '',
    liveLink: '',
    techStack: {
      frontend: 'HTML5, SCSS, Bootstrap, JavaScript.',
      backend: 'Node.js / Express.',
      database: 'MongoDB.',
      other: 'Responsive design for all devices.',
    },
    panels: [],
    order: 3,
    isVisible: true,
  },
];

const seedData = async () => {
  try {
    await connectDB();
    console.log('🔄 Seeding database...');

    // Seed Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@umarmadni.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      admin = await Admin.create({
        name: 'Umar Madni',
        email: adminEmail,
        password: adminPassword,
      });
      console.log(`✅ Default Admin Created: ${adminEmail}`);
    } else {
      console.log(`ℹ️ Admin already exists: ${adminEmail}`);
    }

    // Seed Projects (only if empty)
    const existingCount = await Project.countDocuments();
    if (existingCount === 0) {
      await Project.insertMany(initialProjects);
      console.log(`✅ Seeded ${initialProjects.length} initial projects!`);
    } else {
      console.log(`ℹ️ Database already has ${existingCount} projects. Skipping project seeding.`);
    }

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error(`❌ Seeding failed: ${err.message}`);
    process.exit(1);
  }
};

seedData();
