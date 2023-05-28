import { Timestamp } from "mongodb";
import mongoose, { Schema } from "mongoose";

const cartchema = new Schema
({
    product_id:
    {
        type: String,
        required:true,
    },
    Client_id:
    {
        type: String,
        required:true,
    },
},{Timestamp: true});


const cart = mongoose("Cart",cart);

export default cart;


