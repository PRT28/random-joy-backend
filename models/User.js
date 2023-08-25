const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  last_name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
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
    type:String
  },
  zip_code:{
    type:String
  }
},
{ timestamps: true }
);

const UserModel = model("user", UserSchema);

module.exports = UserModel;
