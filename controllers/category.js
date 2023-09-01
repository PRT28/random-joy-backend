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
    const user = req.user;
    if(user.role==2)
    {
      return res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
    else{
      const newCategory = new Category({
        category_title,
        category_description,
      });
        await newCategory.save();
        res.status(201).json(newCategory);
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
    const user = req.user
    if(!user || user.role==2)
    {
     return  res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
    const oldCategory = await Category.findOne({category_title});
    if(!oldCategory){
     return res.status(400).json({ message: "Category donot exists."});
    }
    if (user.role ==0 ||user.role ==1){

      const updatedCategory =await Category.updateOne({_id:oldCategory.id}, {  category_title,
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
    const user = req.user;
    if(!user || user.role==2)
    {
     return  res.status(400).json({ message: "Only Admins Are allowed to delete Category." });
    }
    const oldCategory = await Category.findOne({category_title});
    if(!oldCategory){
     return res.status(400).json({ message: "Category donot exists."});
    }
    const deleteResponse=await Category.findByIdAndDelete(oldCategory.id);
    const category = await Category.find();
    res.status(200).json(category);
  }catch(err) {    
    res.status(500).json({ error: err.message });
}
}

  module.exports ={createCategory,getAllCategory,getCategory,updateCategory,deleteCategory}