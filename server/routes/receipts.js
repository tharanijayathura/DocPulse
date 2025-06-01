const express = require('express');
const Receipt = require('../models/Receipt');

const router = express.Router();

router.post('/', async (req, res) => {
  const { patientName, ageGap, disease, medicines, doctorCharges } = req.body;
  try {
    const receipt = new Receipt({ patientName, ageGap, disease, medicines, doctorCharges });
    await receipt.save();
    res.status(201).json(receipt);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.json(receipts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;