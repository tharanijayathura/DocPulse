const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  ageGap: { type: Number, required: true },
  disease: { type: String, required: true },
  medicines: [{ type: String }],
  doctorCharges: { type: Number, required: true }
});

module.exports = mongoose.model('Receipt', receiptSchema);