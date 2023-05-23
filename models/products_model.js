import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
  Description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;