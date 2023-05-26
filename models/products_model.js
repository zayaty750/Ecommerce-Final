import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const productsSchema = new Schema({
    pname:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    Image:{
        type: String,
        required: true
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productsSchema);

export default Product;