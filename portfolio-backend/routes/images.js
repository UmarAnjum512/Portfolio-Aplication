const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Image = require('../models/Image');

// @route   GET /api/images/:id
// @desc    Database me stored image serve karo
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    res.set('Content-Type', image.contentType);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(image.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
