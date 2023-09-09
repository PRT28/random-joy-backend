const mongoose = require("mongoose");


const keywordSchema = new  mongoose.Schema(
  {
    keyword_title: {
        type: String,
        unique: true,
      required: true,
    },
    keyword_description: {
        type: String,
      required: true,
    }
},
  { timestamps: true }
  
);

const KeywordModel = mongoose.model("keyword", keywordSchema);

module.exports  = KeywordModel;