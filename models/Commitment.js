const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");


const commitmentSchema = new  mongoose.Schema(
  {
    user_id: {
      type:mongoose.Schema.Types.ObjectId,ref:"user",
      required: true,
    },
    commitment_text: {
      type: String,
      required: true, 
  },
  commitment_statement: {
    type: Number,
    required: true, 
},
complete: {
  type: Boolean,
  required: true, 
}
},
  { timestamps: true }
  
);

const CommitmentModel = mongoose.model("commitment", commitmentSchema);

module.exports  = CommitmentModel;