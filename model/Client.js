const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const signupSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },

  Email:{
    type: String,
    required:true,
  },
  Password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Client_registration = mongoose.model('Client_registration', signupSchema);
module.exports = Client_registration;