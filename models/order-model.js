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
        type: string,
        required: true
    },
    Street_name:{
        type: string,
        required: true
    },
    Building:{
        type: string,
        required: true
    },
    Floor:{
        type: string,
        required: true
    },
    Apartment:{
        type: string,
        required: true
    },
}, {timestamps: true});

const Orders = mongoose.model('Orders', orderSchema);

export default Orders;