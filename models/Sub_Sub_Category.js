const mongoose = require("mongoose");


const sub_sub_categorySchema = new  mongoose.Schema(
  {
    title: {
        type: String,
        unique: true,
      required: true,
    },
    description: {
        type: String,
      required: true,
    },
    sub_category_id:{
        type:Array,
        of: mongoose.Schema.Types.ObjectId,ref:"sub_category",    
    }
},
  { timestamps: true }
  
);

const Sub_Sub_CategoryModel = mongoose.model("sub_sub_category", sub_sub_categorySchema);

module.exports  = Sub_Sub_CategoryModel;