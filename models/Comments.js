const mongoose = require("mongoose");
const comments = new  mongoose.Schema(
  {
    user_id: {type:mongoose.Schema.Types.ObjectId,ref:"user",
      required: true,
    },
    asset_id: {type:mongoose.Schema.Types.ObjectId,ref:"asset",
    required: true,
  },
  comment: {type: String,
  required: true,
}
}
);

const commentModel = mongoose.model("comments", comments);

module.exports  = commentModel;