const mongoose = require("mongoose");


const categorySchema = new  mongoose.Schema(
  {
    category_title: {
        type: String,
        unique: true,
      required: true,
    },
    category_thumbnail: {
        type: String,
      required: true,
    },
    category_description: {
        type: String,
      required: true,
    }
},
  { timestamps: true }
  
);

const CategoryModel = mongoose.model("category", categorySchema);

module.exports  = CategoryModel;