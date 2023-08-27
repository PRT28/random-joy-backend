const Category = require("../models/Category");
const User = require("../models/User.js");
const cloudinary = require("../configs/cloudinary.js")
/* CREATE */
const createCategory = async (req, res) => {
  try {
    const {
      user_id,
      category_title,
      category_description
    } = req.body;
    const user = await User.findById(user_id);
    
    console.log(user.role)
    if(!user || user.role)
    {
      res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
    if (user.role == 0){
      console.log(1)
      
      console.log(1)
      const upload = await cloudinary.v2.uploader.upload(req.file.path);
      const newCategory = new Category({
        category_title,
        category_thumbnail: upload.secure_url,
        category_description,
      });
      console.log(1)
      await newCategory.save();
      res.status(201).json(newCategory);

    } else{
      res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
  } catch {
    (err) => {
      res.status(500).json({ error: err.message });
    };
  }
};
/* READ */
const getAllCategory = async (req, res) => {
    try {
      
      const category = await Category.find();
      res.status(200).json(category);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
const getCategory = async (req, res) => {
    try {
        const { category_title } = req.params;
      const category = await Category.find({category_title});
      res.status(200).json(category);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  module.exports ={createCategory,getAllCategory,getCategory}