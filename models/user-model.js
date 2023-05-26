import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const userschema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    Image:{
        type: String,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model('User', userschema);

export default User;