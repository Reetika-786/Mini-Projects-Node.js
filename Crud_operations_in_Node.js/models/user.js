const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema({
  first_name:{
    type: String,
    required: true}, 
  lastName:{
    type:String},
  email:{
    type: String,
    required: true,
    unique:true}},
  {timestamps: true}
);

//model
const User = mongoose.model('User', userSchema);

module.exports = User;