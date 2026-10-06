const multer = require('multer');
const path = require('path');

// Memory storage - Vercel par disk writable nahi hoti
const storage = multer.memoryStorage();

// File filter - sirf images allow karo
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  const err = new Error('Only image files (jpg, png, gif, webp) are allowed!');
  err.status = 400;
  cb(err);
};

const upload = multer({
  storage,
  fileFilter,
  // Vercel serverless request body limit ~4.5MB hai, isliye 4MB per file
  limits: { fileSize: 4 * 1024 * 1024 },
});

module.exports = upload;
