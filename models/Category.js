const mongoose = require("mongoose");


const categorySchema = new  mongoose.Schema(
  {
    category_title: {
        type: String,
      required: true,
    },
    category_thumbnai: {
        type: String,
      required: true,
    },
    category_description: {
        type: String,
      required: true,
    },
},
  { timestamps: true }
  
);

const CategoryModel = mongoose.model("category", categorySchema);

module.exports  = CategoryModel;