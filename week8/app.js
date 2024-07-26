const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

dotenv.config();

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/upload', uploadRoutes);

// Global error handler
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
