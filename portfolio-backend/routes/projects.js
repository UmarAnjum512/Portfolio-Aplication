const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const Image = require('../models/Image');

// Uploaded file ko MongoDB me save karke uska URL path return karo
const saveImage = async (file) => {
  const image = await Image.create({
    name: file.originalname,
    contentType: file.mimetype,
    data: file.buffer,
  });
  return `/api/images/${image._id}`;
};

// @route   GET /api/projects
// @desc    Get all visible projects (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ isVisible: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/projects/all
// @desc    Get all projects (admin - includes hidden)
// @access  Private
router.get('/all', protect, async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (Admin only)
router.post('/', protect, upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'panelImages', maxCount: 10 }
]), async (req, res) => {
  try {
    const projectData = { ...req.body };

    // Thumbnail handle karo
    if (req.files && req.files['thumbnail']) {
      projectData.thumbnail = await saveImage(req.files['thumbnail'][0]);
    }

    // Tech stack parse karo (JSON string se)
    if (projectData.techStack && typeof projectData.techStack === 'string') {
      projectData.techStack = JSON.parse(projectData.techStack);
    }

    // Panels parse karo
    if (projectData.panels && typeof projectData.panels === 'string') {
      projectData.panels = JSON.parse(projectData.panels);

      // Panel images assign karo
      if (req.files && req.files['panelImages']) {
        for (let index = 0; index < req.files['panelImages'].length; index++) {
          if (projectData.panels[index]) {
            projectData.panels[index].image = await saveImage(req.files['panelImages'][index]);
          }
        }
      }
    }

    const project = await Project.create(projectData);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin only)
router.put('/:id', protect, upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'panelImages', maxCount: 10 }
]), async (req, res) => {
  try {
    const projectData = { ...req.body };

    if (req.files && req.files['thumbnail']) {
      projectData.thumbnail = await saveImage(req.files['thumbnail'][0]);
    }

    if (projectData.techStack && typeof projectData.techStack === 'string') {
      projectData.techStack = JSON.parse(projectData.techStack);
    }

    if (projectData.panels && typeof projectData.panels === 'string') {
      projectData.panels = JSON.parse(projectData.panels);
      if (req.files && req.files['panelImages']) {
        for (let index = 0; index < req.files['panelImages'].length; index++) {
          if (projectData.panels[index] && !projectData.panels[index].image) {
            projectData.panels[index].image = await saveImage(req.files['panelImages'][index]);
          }
        }
      }
    }

    const project = await Project.findByIdAndUpdate(req.params.id, projectData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/projects/:id/toggle-visibility
// @desc    Toggle project visibility
// @access  Private
router.patch('/:id/toggle-visibility', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    project.isVisible = !project.isVisible;
    await project.save();
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
