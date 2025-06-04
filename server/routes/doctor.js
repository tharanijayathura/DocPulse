const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Receipt = require('../models/Receipt');
const mongoose = require('mongoose');

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

router.get('/dashboard', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todayReceipts = await Receipt.countDocuments({
      doctor: req.doctorId,
      type: 'doctor',
      createdAt: { $gte: today },
    });

    const yesterdayReceipts = await Receipt.countDocuments({
      doctor: req.doctorId,
      type: 'doctor',
      createdAt: { $gte: yesterday, $lt: today },
    });

    const weeklyReceipts = await Receipt.aggregate([
      {
        $match: {
          doctor: new mongoose.Types.ObjectId(req.doctorId),
          type: 'doctor',
          createdAt: { $gte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalRevenue = await Receipt.aggregate([
      { $match: { doctor: new mongoose.Types.ObjectId(req.doctorId), type: 'doctor' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    res.json({
      todayReceipts,
      yesterdayReceipts,
      weeklyReceipts,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;