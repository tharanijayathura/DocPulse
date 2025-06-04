const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  type: { type: String, enum: ['doctor', 'pharmacy', 'medical'], required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientName: String,
  ageGroup: { type: String, enum: ['child', 'adult', 'elderly'] },
  disease: String,
  medicines: [{
    name: String,
    quantity: Number,
    price: Number,
  }],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Receipt', receiptSchema);