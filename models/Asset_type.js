const mongoose = require("mongoose");

const Asset_typeSchema = new  mongoose.Schema(
  {
    name: {
        type: String,
      required: true,
      unique: true,
    }
},
  { timestamps: true }
  
);

const Asset_typeModel = mongoose.model("asset_type", Asset_typeSchema);

module.exports  = Asset_typeModel;