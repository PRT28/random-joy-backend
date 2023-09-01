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
    if(!req.file){
      res.status(400).json({ message: "Image is required."});
    }
    if(!user || user.role)
    {
      res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
    if (user.role == 0){
      const upload = await cloudinary.v2.uploader.upload(req.file.path,{folder:"category"});
      const newCategory = new Category({
        category_title,
        category_thumbnail: upload.secure_url,
        category_description,
      });
        await newCategory.save();
        res.status(201).json(newCategory);
    } else{
      res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
  } catch(err) {    
      res.status(500).json({ error: err.message });
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

/* UPDATE */
const updateCategory = async (req, res) => {
  const { category_title } = req.params;
  try {
    const {
      user_id,
      category_title,
      category_description
    } = req.body;
    const user = await User.findById(user_id);
    const oldCategory = await Category.findOnr({category_title});
    if(!oldCategory){
      res.status(400).json({ message: "Category donot exists."});
    }
    let image_url=Null;
    if(!req.file){
      image_url=oldCategory.category_thumbnail;
    }
    if(!user || user.role==2)
    {
      res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
    if (user.role ==0 ||user.role ==1){
      if(req.file){
      const upload = await cloudinary.v2.uploader.upload(req.file.path,{folder:"category"});
      const getPublicId = (oldUrl) => oldUrl.split("/").pop().split(".")[0];
      const deleted = await cloudinary.v2.uploader.destroy(getPublicId(image_url));
      image_url=upload.secure_url
    
      }
      const newCategory = new Category({
        category_title,
        category_thumbnail:image_url,
        category_description,
      });
        await newCategory.save();
        res.status(201).json(newCategory);
    } else{
      res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
  } catch(err) {    
      res.status(500).json({ error: err.message });
  }
};


  module.exports ={createCategory,getAllCategory,getCategory}