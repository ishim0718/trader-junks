const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  addedBy: {
    type: String,
    required: true,
    trim: true
  }
});

const Product = model('Product', productSchema);

module.exports = Product;