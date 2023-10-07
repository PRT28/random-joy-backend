
const mongoose = require("mongoose");


const assetSchema = new  mongoose.Schema(
  {
    add_user: {
    type:mongoose.Schema.Types.ObjectId,ref:"user",
    required: true,
  },
    category_id: {
    type:mongoose.Schema.Types.ObjectId,ref:"category",
    required: true,
    },
    keyword_name: {
      type: Array,
      of:String
    },
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  isActive:{
    type:Boolean,
    default: true
  },
    description: String,
    asset_category:{
      type: Number,
      required: true
    },
    asset_type:{
      type: Number,
      required: true,
    },
    sub_category_id: {
      type:mongoose.Schema.Types.ObjectId,ref:"sub_category",
      required: true,
    },
    sub_sub_category_id: {
      type:mongoose.Schema.Types.ObjectId,ref:"sub_sub_category",
      required: true,
    },
    is_announcemnet: {
      type: Boolean,
      required: true,
    },
    mod_user: {
      type:mongoose.Schema.Types.ObjectId,ref:"user",
      required: true,
    }
  },
  { timestamps: true }
);

const AssetModel = mongoose.model("asset", assetSchema);

module.exports  = AssetModel;