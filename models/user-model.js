import mongoose, { Schema } from "mongoose";
const bcrypt = import('bcrypt');

const schema = mongoose.Schema;

const userschema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    }
}, { timestamps: true });

userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    //Hashing password.
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userschema);

export default User;