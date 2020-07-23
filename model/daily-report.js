const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Reports', reportSchema);