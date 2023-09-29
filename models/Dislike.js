const mongoose = require("mongoose");
const disLikeSchema = new  mongoose.Schema(
  {
    user_id: {type:mongoose.Schema.Types.ObjectId,ref:"user",
      required: true,
    },
    asset_id: {type:mongoose.Schema.Types.ObjectId,ref:"asset",
    required: true,
  }
}
);

const DisLikesModel = mongoose.model("dislikes", disLikeSchema);

module.exports  = DisLikesModel;