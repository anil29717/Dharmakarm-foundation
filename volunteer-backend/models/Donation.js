const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorType: {
    type: String,
    required: true,
    enum: ['Personal', 'Restaurant'],
  },
  personalDetails: {
    name: String,
    age: Number,
    phoneNumber: String,
    email: String,
  },
  restaurantDetails: {
    name: String,
    location: String,
    contactNumber: String,
    email: String,
    foodItems: [String],
  },
  donationType: String,
  moneyAmount: Number,
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
