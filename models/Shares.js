const mongoose = require("mongoose");


const shareSchema = new  mongoose.Schema(
  {
    user_id: {
      type:mongoose.Schema.Types.ObjectId,ref:"user",
      required: true,
    },
    asset_id: {
    type:mongoose.Schema.Types.ObjectId,ref:"asset",
      required: true, 
  },
  is_forced: {
    type: Boolean,
    required: true, 
  },
  shared_to: {
    type:mongoose.Schema.Types.ObjectId,ref:"user",
    required: true, 
  },
  is_opened: {
    type: Boolean,
    required: true
  },
},
  { timestamps: true }
  
);

const ShareModel = mongoose.model("shares", shareSchema);

module.exports  = ShareModel;