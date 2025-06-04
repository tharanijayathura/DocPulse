const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

router.post('/register', async (req, res) => {
  const { name, username, email, password, phone, nic, specialty } = req.body;
  try {
    let doctor = await Doctor.findOne({ email });
    if (doctor) return res.status(400).json({ message: 'Doctor already exists' });
    doctor = new Doctor({ name, username, email, password, phone, nic, specialty });
    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(password, salt);
    await doctor.save();
    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, doctor: { id: doctor._id, name: doctor.name, email: doctor.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;