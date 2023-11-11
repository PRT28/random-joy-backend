const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");


const commitmentSchema = new  mongoose.Schema(
  {
    user_id: {
      type:mongoose.Schema.Types.ObjectId,ref:"user",
      required: true,
    },
    suggestion_text: {
      type: String,
      required: true, 
  },
  is_commitment: {
    type: Number,
    required: true, 
  },
  complete: {
    type: Boolean,
    required: true, 
  },
  add_user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  mod_user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  category_text: {
    type: String,
    required: true
  },
  suggestion_image: {
    type: String,
    required: false
  }
},
  { timestamps: true }
  
);

const CommitmentModel = mongoose.model("suggestion", commitmentSchema);

module.exports  = CommitmentModel;