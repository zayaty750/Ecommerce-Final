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
        type: Number,
        required: true
    },
    Floor:{
        type: Number,
        required: true
    },
    Apartment:{
        type: Number,
        required: true
    },
    latit:{
        type: Number,
    },
    longit:{
        type: Number,
    },
    Charge_id:{
        type: String,
    },
}, {timestamps: true});

const Orders = mongoose.model('Orders', orderSchema);

export default Orders;