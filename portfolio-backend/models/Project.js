const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Web Application', 'Web Designing', 'Mobile App', 'Desktop App', 'Other'],
      default: 'Web Application',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    thumbnail: {
      type: String, // Image path or URL
      default: '',
    },
    githubLink: {
      type: String,
      default: '',
    },
    liveLink: {
      type: String,
      default: '',
    },
    techStack: {
      frontend: { type: String, default: '' },
      backend: { type: String, default: '' },
      database: { type: String, default: '' },
      other: { type: String, default: '' },
    },
    panels: [
      {
        title: { type: String },
        subtitle: { type: String },
        description: { type: String },
        image: { type: String },
        imagePosition: { type: String, enum: ['left', 'right'], default: 'left' },
      },
    ],
    isVisible: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
