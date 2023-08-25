
const mongoose = require("mongoose");


const assetSchema = new  mongoose.Schema(
  {
    user_id: {
      type:mongoose.Schema.Types.ObjectId,ref:"user",
    required: true,
  },
    user_role: {
      type: String
    },
    category_name: {
      type: String
    },
    keyword_name: {
      type: String
    },
     name: {
      type: String
    },
    url: {
      type: String,
      required: true,
    },likes: {
      type: Map,
      of: Number,
    default:{}},

    thumbnail: String,
    description: String,
    isfeature: {
      type: String,
    },
    asset_type: {
      type: String,
      required: true,
    },
    like_count:{type:Number,default:0},
    share_count:{type:Number,default:0},
  },
  { timestamps: true }
);

const AssetModel = mongoose.model("asset", assetSchema);

module.exports  = AssetModel;