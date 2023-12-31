const Category = require("../models/Category");
const { register } = require("./auth");

/* CREATE */
const createCategory = async (req, res) => {
  try {
    const {
      category_title,
      category_description
    } = req.body;
    const { user } = req.user;
    console.log(user);
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
      const category_title = req.query.search
    if (category_title ) {
      const reg = new RegExp(category_title )
      const cat = await Category.find({category_title:'mystrey'});
      res.status(200).json(cat); 
    }else{  
      const category = await Category.find();
      res.status(200).json(category);
    }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

/* UPDATE */
const updateCategory = async (req, res) => {
  const {id} = req.params;
  try {
    const {
      category_title,
      category_description
    } = req.body;
    const { user } = req.user
    if(!user || user.role==2)
    {
     return  res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
    const oldCategory = await Category.findById(id);
    if(!oldCategory){
     return res.status(400).json({ message: "Category donot exists."});
    }
    if (user.role ==0 ||user.role ==1){

      await Category.findByIdAndUpdate(id, {category_title,
        category_description}).then(() => res.status(201).json({
          success: true,
          message: "Category updated successfully"
        }))
  
        
    } else{
      res.status(400).json({ message: "Only Admins Are allowed to add Category." });
    }
  } catch(err) {    
      res.status(500).json({ error: err.message });
  }
};

/* Delete Category*/ 

const deleteCategory = async (req, res) => {
  const {id} = req.params;
  try {
    const { user } = req.user;
    if(!user || user.role===2)
    {
     return  res.status(400).json({ message: "Only Admins Are allowed to delete Category." });
    }
    const oldCategory = await Category.findById(id);
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

  module.exports ={createCategory,getAllCategory,updateCategory,deleteCategory}