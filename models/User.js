const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 100,
    unique: true,
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
    required: true,
  },
  interests: {
    type: Array,
    required: true,
  },
  preferences:{
    type: Number,
    required: true,
  },
  completed_task:{
    type: Number,
    required: true,
  },
  uncompleted_task:{
    type: Number,
    required: true,
  },
  last_seen_ad: {
    type: Date,
    required: true,
  },
  is_skipped: {
    type: Boolean,
    requied: true,
  }
},
{ timestamps: true }
);

const UserModel = model("user", UserSchema);

module.exports = UserModel;
