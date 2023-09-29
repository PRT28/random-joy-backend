const mongoose = require("mongoose");


const categorySchema = new  mongoose.Schema(
  {
    category_title: {
        type: String,
        unique: true,
      required: true,
    },
    category_description: {
        type: String,
      required: true,
    },
    sub_category_id:{
      type:Array,
      of: mongoose.Schema.Types.ObjectId,ref:"sub_category",    
  },
  sub_sub_category_id:{
    type:Array,
    of: mongoose.Schema.Types.ObjectId,ref:"sub_sub_category",    
}
},
  { timestamps: true }
  
);

const CategoryModel = mongoose.model("category", categorySchema);

module.exports  = CategoryModel;