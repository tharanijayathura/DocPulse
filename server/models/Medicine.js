const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  childQuantity: { type: Number, required: true },
  adultQuantity: { type: Number, required: true }
});

module.exports = mongoose.model('Medicine', medicineSchema);