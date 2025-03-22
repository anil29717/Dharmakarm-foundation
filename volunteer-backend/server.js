// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
// const donorRoutes = require('./routes/donateRoutes.js');
const volunteerRoutes = require('./routes/volunteerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.VITE_FRONTEND_URL, // Use env variable
  methods: "GET,POST,PUT,DELETE",
  credentials: true,  // Important for cookies/auth
}));
app.use(express.json());

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
  }
});

// Initialize Multer
const upload = multer({ storage: storage });

// MongoDB Atlas connection
const MONGODB_URI = process.env.MONGODB_URI; // Use the environment variable

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', volunteerRoutes);

// Basic root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Volunteer API!');
});

// Example route to handle image upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  if (req.file) {
    res.status(200).json({ message: 'Image uploaded successfully', file: req.file });
  } else {
    res.status(400).json({ message: 'Image upload failed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//ADmin 
const adminAuthRoutes = require('./routes/adminAuth');
app.use('/api/admin', adminAuthRoutes);

//Donation
const donationRoutes = require('./routes/DonateRoutes')
app.use('/api', donationRoutes);

//DonorShow
const donorRoutes = require('./routes/donorRoute')
app.use('/api/donors', donorRoutes);

// const donationRoutes = require('./routes/donateRoutes');
// app.use('/api', donationRoutes);

