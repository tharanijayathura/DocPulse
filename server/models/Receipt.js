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
  patientName: { type: String, required: true },
  ageGap: { type: Number, required: true },
  disease: { type: String, required: true },
  medicines: [{ type: String }],
  doctorCharges: { type: Number, required: true }
});

module.exports = mongoose.model('Receipt', receiptSchema);