const mongoose = require('mongoose');

// CV (PDF) MongoDB me store hoti hai (Vercel par disk writable nahi hoti).
// Sirf ek hi CV rakhi jati hai - nayi upload karne par purani replace ho jati hai.
const resumeSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'main', unique: true },
    fileName: { type: String, default: 'CV.pdf' },
    contentType: { type: String, default: 'application/pdf' },
    size: { type: Number, default: 0 },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
