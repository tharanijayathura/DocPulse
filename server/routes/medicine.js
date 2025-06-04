const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const Receipt = require('../models/Receipt');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.doctorId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { name, associatedDiseases, price, quantityPerAge } = req.body;
  try {
    const medicine = new Medicine({ name, associatedDiseases, price, quantityPerAge });
    await medicine.save();
    res.status(201).json({ message: 'Medicine added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/receipt/doctor', auth, async (req, res) => {
  const { patientName, ageGroup, disease, medicines } = req.body;
  try {
    const medicineDocs = await Medicine.find({ name: { $in: medicines.map(m => m.name) } });
    const receiptMedicines = medicines.map(med => {
      const medicine = medicineDocs.find(m => m.name === med.name);
      const quantity = medicine.quantityPerAge[ageGroup] * med.dosage;
      return {
        name: med.name,
        quantity,
        price: medicine.price * quantity,
      };
    });
    const totalPrice = receiptMedicines.reduce((sum, med) => sum + med.price, 0);
    const receipt = new Receipt({
      type: 'doctor',
      doctor: req.doctorId,
      patientName,
      ageGroup,
      disease,
      medicines: receiptMedicines,
      totalPrice,
    });
    await receipt.save();
    res.status(201).json({ message: 'Receipt created successfully', receipt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/receipt/pharmacy', auth, async (req, res) => {
  const { medicines } = req.body;
  try {
    const receipt = new Receipt({
      type: 'pharmacy',
      doctor: req.doctorId,
      medicines,
      totalPrice: medicines.reduce((sum, med) => sum + (med.price * med.quantity), 0),
    });
    await receipt.save();
    res.status(201).json({ message: 'Pharmacy receipt created successfully', receipt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/receipt/medical', auth, async (req, res) => {
  const { details } = req.body;
  try {
    const receipt = new Receipt({
      type: 'medical',
      doctor: req.doctorId,
      details,
    });
    await receipt.save();
    res.status(201).json({ message: 'Medical form created successfully', receipt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;