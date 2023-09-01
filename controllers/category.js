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
    if (user.role == 0) {
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
    if(!user || user.role==2)
    {
     return  res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
    const oldCategory = await Category.findOne({category_title});
    if(!oldCategory){
     return res.status(400).json({ message: "Category donot exists."});
    }
    let image_url=Null;
    if (user.role ==0 ||user.role ==1){
      if(!req.file){
        image_url=oldCategory.category_thumbnail;
      }
      else{
      const upload = await cloudinary.v2.uploader.upload(req.file.path,{folder:"category"});
      const getPublicId = (oldUrl) => oldUrl.split("/").pop().split(".")[0];
      const deleted = await cloudinary.v2.uploader.destroy(getPublicId(image_url));
      image_url=upload.secure_url;
      }

      const updatedCategory =await Category.updateOne({_id:oldCategory.id}, {  category_title,
        category_thumbnail:image_url,
        category_description});
  
        res.status(201).json(updatedCategory);
    } else{
      res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
  } catch(err) {    
      res.status(500).json({ error: err.message });
  }
};

/* Delete Category*/ 

const deleteCategory = async (req, res) => {
  const { category_title } = req.params;
  try {
    const {
      user_id,
    } = req.body;
    const user = await User.findById(user_id);
    if(!user || user.role==2)
    {
     return  res.status(400).json({ message: "Only Admins Are allowed to delete Category." });
    }
    const oldCategory = await Category.findOne({category_title});
    if(!oldCategory){
     return res.status(400).json({ message: "Category donot exists."});
    }
    let image_url=oldCategory.category_thumbnail;
    const getPublicId = (oldUrl) => oldUrl.split("/").pop().split(".")[0];
    const deleted = await cloudinary.v2.uploader.destroy(getPublicId(image_url));
    const deleteResponse=await Category.findByIdAndDelete(oldCategory.id);
    const category = await Category.find();
    res.status(200).json(category);
  }catch(err) {    
    res.status(500).json({ error: err.message });
}
}

  module.exports ={createCategory,getAllCategory,getCategory,updateCategory,deleteCategory}