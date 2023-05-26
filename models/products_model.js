import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const productsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productsSchema);

export default Product;