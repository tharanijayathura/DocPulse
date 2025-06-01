const express = require('express');
const Medicine = require('../models/Medicine');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, price, childQuantity, adultQuantity } = req.body;
  try {
    const medicine = new Medicine({ name, price, childQuantity, adultQuantity });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;