const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/auth');
const uploadPdf = require('../middleware/uploadPdf');

// @route   GET /api/resume/info
// @desc    CV maujood hai ya nahi + details (file data ke baghair)
// @access  Public
router.get('/info', async (req, res) => {
  try {
    const resume = await Resume.findOne({ key: 'main' }).select('-data');
    if (!resume) return res.json({ success: true, exists: false });
    res.json({
      success: true,
      exists: true,
      fileName: resume.fileName,
      size: resume.size,
      updatedAt: resume.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/resume/download            -> download hoti hai
// @route   GET /api/resume/download?view=1     -> browser me khulti hai
// @access  Public
router.get('/download', async (req, res) => {
  try {
    const resume = await Resume.findOne({ key: 'main' });
    if (!resume) return res.status(404).json({ message: 'CV abhi upload nahi hui' });

    const disposition = req.query.view ? 'inline' : 'attachment';
    const safeName = (resume.fileName || 'CV.pdf').replace(/[^\w.\- ]/g, '_');
    res.set({
      'Content-Type': resume.contentType || 'application/pdf',
      'Content-Length': resume.data.length,
      'Content-Disposition': `${disposition}; filename="${safeName}"`,
      'Cache-Control': 'no-cache',
    });
    res.send(resume.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/resume
// @desc    CV upload / replace (field name: resume)
// @access  Private (Admin only)
router.post('/', protect, uploadPdf.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please select a PDF file' });

    const resume = await Resume.findOneAndUpdate(
      { key: 'main' },
      {
        key: 'main',
        fileName: req.file.originalname,
        contentType: req.file.mimetype,
        size: req.file.size,
        data: req.file.buffer,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).select('-data');

    res.status(201).json({
      success: true,
      exists: true,
      fileName: resume.fileName,
      size: resume.size,
      updatedAt: resume.updatedAt,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/resume
// @access  Private (Admin only)
router.delete('/', protect, async (req, res) => {
  try {
    await Resume.deleteOne({ key: 'main' });
    res.json({ success: true, message: 'CV deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
