const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  associatedDiseases: [String],
  price: { type: Number, required: true },
  quantityPerAge: {
    child: { type: Number, default: 1 },
    adult: { type: Number, default: 2 },
    elderly: { type: Number, default: 1.5 },
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  childQuantity: { type: Number, required: true },
  adultQuantity: { type: Number, required: true }
});

module.exports = mongoose.model('Medicine', medicineSchema);