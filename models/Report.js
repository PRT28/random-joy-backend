const mongoose = require("mongoose");


const reportSchema = new  mongoose.Schema(
  {
    user_id: {
      type:mongoose.Schema.Types.ObjectId,ref:"user",
      required: true,
    },
    asset_id:{
        type:mongoose.Schema.Types.ObjectId,ref:"asset",
      required: true,
    },
    report_text: {
      type: String,
      required: true, 
  },
  author: {
    type:mongoose.Schema.Types.ObjectId,ref:"user",
    required: true,
},
action : {
    type: Boolean,
    required: true,
    default:false 
},


},
  { timestamps: true }
  
);
const ReportModel = mongoose.model("report", reportSchema);
module.exports  = ReportModel;