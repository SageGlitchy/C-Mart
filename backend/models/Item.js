const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  isSold: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', itemSchema);
