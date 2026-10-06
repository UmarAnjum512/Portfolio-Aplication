const mongoose = require('mongoose');

// Vercel par disk me file save nahi hoti, isliye uploaded images MongoDB me store hoti hain
const imageSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    contentType: { type: String, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Image', imageSchema);
