const mongoose = require("mongoose");


const likeSchema = new  mongoose.Schema(
  {
    user_id: {type:mongoose.Schema.Types.ObjectId,ref:"user",
      required: true,
    },
    likes_list: {
        type: Map,
        of: Boolean,
      default:[]}},
    
  { timestamps: true }
);

const LikesModel = mongoose.model("likes", likeSchema);

module.exports  = LikesModel;