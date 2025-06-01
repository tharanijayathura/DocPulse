const express = require('express');
const MedicalForm = require('../models/MedicalForm');

const router = express.Router();

router.post('/', async (req, res) => {
  const { patientName, symptoms, notes } = req.body;
  try {
    const form = new MedicalForm({ patientName, symptoms, notes });
    await form.save();
    res.status(201).json(form);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const forms = await MedicalForm.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;