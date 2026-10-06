const Admin = require('../models/Admin');
const Project = require('../models/Project');

// Default admin & initial projects setup (sirf pehli baar chalta hai)
const createDefaultData = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@umarmadni.com').toLowerCase();
    const adminExists = await Admin.findOne({ email: adminEmail });
    if (!adminExists) {
      await Admin.create({
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'Admin@123456',
        name: 'Umar Madni',
      });
      console.log('✅ Default admin created successfully!');
    }

    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      const initialProjects = [
        {
          title: 'Nexus Service Marketing',
          category: 'Web Application',
          description: 'A comprehensive multi-panel service marketing and management application developed with ASP.NET Core MVC. Features specialized workflows for Customers, Managers, Retail Staff, Technical Field Staff, and Accounts Department.',
          thumbnail: '/uploads/Nexus.PNG',
          githubLink: 'https://github.com/UmarAnjum512/Nexus_Service_Marketing.git',
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
          description: 'Pizza Delicious ek complete, full-stack web application hai jo customers ko behtareen online pizza ordering experience aur admins ko powerful management tools provide karti hai.',
          thumbnail: '/uploads/Pizza.PNG',
          githubLink: 'https://github.com/UmarAnjum512/Pizza_App.git',
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
      await Project.insertMany(initialProjects);
      console.log('✅ Initial portfolio projects seeded into database!');
    }
  } catch (error) {
    console.log('Data initialization error or already seeded:', error.message);
  }
};


let done = false;
const ensureDefaultData = async () => {
  if (done) return;
  await createDefaultData();
  done = true;
};

module.exports = { createDefaultData, ensureDefaultData };
