import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const orderSchema = new Schema({
    client_id:{
        type: ObjectId,
        required: true
    },
    product_id:{
        type: Object,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    Street_name:{
        type: String,
        required: true
    },
    Building:{
        type: String,
        required: true
    },
    Floor:{
        type: String,
        required: true
    },
    Apartment:{
        type: String,
        required: true
    },
    latit:{
        type: Number,
        required: true
    },
    longit:{
        type: Number,
        required: true
    },
}, {timestamps: true});

const Orders = mongoose.model('Orders', orderSchema);

export default Orders;