// Example for Restaurant Donation route (POST /api/donate/restaurant)
app.post('/api/donate/restaurant', async (req, res) => {
    const { restaurantDetails, donationType, moneyAmount } = req.body;
  
    // Store in the database (MongoDB example)
    const donation = new Donation({
      donorType: 'Restaurant',
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
  