const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  costPrice: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  initialQty: {
    type: Number,
    required: true
  },
  currentQty: {
    type: Number,
    required: true
  }, 
  createdAt: String,
  updatedAt: String
});

module.exports = mongoose.model('Products', productSchema);