const multer = require('multer');
const path = require('path');

// Sirf PDF allow hai, memory me rakhte hain (Vercel par disk nahi hoti)
const uploadPdf = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isPdf =
      path.extname(file.originalname).toLowerCase() === '.pdf' &&
      file.mimetype === 'application/pdf';
    if (isPdf) return cb(null, true);
    const err = new Error('Sirf PDF file upload kar sakte hain');
    err.status = 400;
    cb(err);
  },
  // Vercel serverless request body limit ~4.5MB hai
  limits: { fileSize: 4 * 1024 * 1024 },
});

module.exports = uploadPdf;
