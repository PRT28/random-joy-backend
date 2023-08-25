const mongoose = require("mongoose");


const commentSchema = new  mongoose.Schema(
  {
    user_id: {
        type:mongoose.Schema.Types.ObjectId,ref:"user",
      required: true,
    },
    type_id: {
      type: String,
    },
    comment_type: {
      type: String,
      required: true,
   
  },
  comments:{
    type:Array,
    of:String,
    default:[]
  }
},
  { timestamps: true }
  
);

const CommentModel = mongoose.model("comment", commentSchema);

module.exports  = CommentModel;