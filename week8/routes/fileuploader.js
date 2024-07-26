const express = require('express');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const { protect } = require('./protectedRoutes');

// Upload route
router.post('/image', protect, async (req, res, next) => {
  try {
    const file = req.files.file;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'uploads'
    });
    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
