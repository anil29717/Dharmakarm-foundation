// routes/volunteerRoutes.js
const express = require('express');
const Volunteer = require('../models/Volunteer');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinaryConfig'); // Import Cloudinary configuration

// Set up Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder in your Cloudinary account where images will be stored
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage });

// Create a new volunteer route with file upload
router.post('/volunteers', upload.single('image'), async (req, res) => {
  const { name, age, dob, gender, phone, whatsapp, email, designation, address, state } = req.body;
  const image = req.file ? req.file.path : null; // Access the uploaded file path

  try {
    const { name, age, dob, gender, phone, whatsapp, email, designation, address, state, termsAccepted, image } = req.body;

    // Create a new volunteer with the image URL from Cloudinary
    const newVolunteer = new Volunteer({
      name,
      age,
      dob,
      gender,
      phone,
      whatsapp,
      email,
      designation,
      address,
      state,
      termsAccepted,
      image: req.file.path, // Cloudinary URL for the uploaded image
    });

    await newVolunteer.save();
    res.status(201).json({ message: 'Volunteer created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating volunteer', error });
  }
});

// GET route to fetch all volunteers
router.get('/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.status(200).json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ message: 'Error fetching volunteers' });
  }
});

module.exports = router;
