const mongoose = require("mongoose");


const likeSchema = new  mongoose.Schema(
  {
    user_id: {type:mongoose.Schema.Types.ObjectId,ref:"user",
      required: true,
    },
    asset_id: {type:mongoose.Schema.Types.ObjectId,ref:"asset",
    required: true,
  }
}
);

const LikesModel = mongoose.model("like", likeSchema);

module.exports  = LikesModel;