const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
// const bcrypt = require('bcrypt');


// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the password
    // const isPasswordValid = await Admin.compare(password, admin.password);
    if (!(password == admin.password)) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Authentication successful
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error);
  }
});



module.exports = router;
