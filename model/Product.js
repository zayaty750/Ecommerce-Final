const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  pname: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true
  },
  Image: {
    type: String,
    required: true
  },
  Des: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;