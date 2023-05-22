const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const signupSchema = new Schema({
  Full_Name: {
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

const Clients_info = mongoose.model('Client_registration', signupSchema);
module.exports = Clients_info;