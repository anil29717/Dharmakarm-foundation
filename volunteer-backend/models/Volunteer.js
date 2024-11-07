// models/Volunteer.js
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String, required: true },
  email: { type: String, required: true },
  designation: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  termsAccepted: Boolean,
  image: String, // Field to store Cloudinary image URL
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
