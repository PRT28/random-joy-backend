const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  status:{
    type: Boolean,
    required: true
  },
  zip_code:{
    type:String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true
  }
},
{ timestamps: true }
);

const UserModel = model("user", UserSchema);

module.exports = UserModel;
