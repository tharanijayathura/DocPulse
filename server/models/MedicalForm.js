const mongoose = require('mongoose');

const medicalFormSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  symptoms: { type: String, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('MedicalForm', medicalFormSchema);