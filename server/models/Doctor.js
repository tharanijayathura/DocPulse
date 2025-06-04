const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  nic: String,
  specialty: String,
  registeredDate: { type: Date, default: Date.now },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true }
});

module.exports = mongoose.model('Doctor', doctorSchema);