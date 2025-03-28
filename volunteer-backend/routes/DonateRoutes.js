const express = require('express');
const Donation = require('../models/Donation');
const router = express.Router();

// Personal donation
router.post('/donate/personal', async (req, res) => {
  const { donorType, personalDetails, donationType, moneyAmount } = req.body;

  const donation = new Donation({
    donorType,
    personalDetails,
    donationType,
    moneyAmount: donationType === 'Money' ? moneyAmount : null,
  });

  try {
    await donation.save();
    res.status(200).send({ donationId: donation._id });
  } catch (err) {
    res.status(500).send({ error: 'Error saving donation' });
  }
});

// Restaurant donation
router.post('/donate/restaurant', async (req, res) => {
  const { donorType, restaurantDetails, donationType, moneyAmount } = req.body;

  const donation = new Donation({
    donorType,
    restaurantDetails,
    donationType,
    moneyAmount: donationType === 'Money' ? moneyAmount : null,
  });

  try {
    await donation.save();
    res.status(200).send({ donationId: donation._id });
  } catch (err) {
    res.status(500).send({ error: 'Error saving donation' });
  }
});

// Route to get all donations for the admin page
router.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});


module.exports = router;
