const Sub_CategoryModel = require("../models/Sub_Category");
/* CREATE */
const createSub_Category = async (req, res) => {
  try {
    const {
      title,
      description,
      category_id
    } = req.body;
    const { user } = req.user;
    if(user.role==2)
    {
      return res.status(400).json({ message: "Only Admins Are allowed to add sub_Category." });
    }
    else{
      const newCategory = new Sub_CategoryModel({
        title,
        description,
        category_id
      });
        await newCategory.save();
        res.status(201).json(newCategory);
    } 
  } catch(err) {    
      res.status(500).json({ error: err.message });
  }
};
/* READ */
const getAllSub_Category = async (req, res) => {
    try {
      const title = req.query.search
    if (title ) {
      const reg = new RegExp(title )
      const cat = await Sub_CategoryModel.find({title:reg});
      res.status(200).json(cat); 
    }else{  
      const category = await Sub_CategoryModel.find();
      res.status(200).json(category);
    }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

/* UPDATE */
const updateSub_Category = async (req, res) => {
  const {id} = req.params;
  try {
    const {
      title,
      description,
      category_id
    } = req.body;
    const { user } = req.user
    if(!user || user.role==2)
    {
     return  res.status(400).json({ message: "Only Admins Are allowed to add sub_Category." });
    }
    const oldCategory = await Sub_CategoryModel.findById(id);
    if(!oldCategory){
     return res.status(400).json({ message: "sub_Category donot exists."});
    }
    if (user.role ==0 ||user.role ==1){

      await Sub_CategoryModel.findByIdAndUpdate(id, {title,
        description,category_id}).then(() => res.status(201).json({
          success: true,
          message: "sub_Category updated successfully"
        }))
  
        
    } else{
      res.status(400).json({ message: "Only Admins Are allowed to add sub_Category." });
    }
  } catch(err) {    
      res.status(500).json({ error: err.message });
  }
};

/* Delete Category*/ 

const deleteSub_Category = async (req, res) => {
  const {id} = req.params;
  try {
    const { user } = req.user;
    if(!user || user.role===2)
    {
     return  res.status(400).json({ message: "Only Admins Are allowed to delete sub_Category." });
    }
    const oldCategory = await Sub_CategoryModel.findById(id);
    if(!oldCategory){
     return res.status(400).json({ message: "sub_Category donot exists."});
    }
    const deleteResponse=await Sub_CategoryModel.findByIdAndDelete(oldCategory.id);
    const category = await Sub_CategoryModel.find();
    res.status(200).json(category);
  }catch(err) {    
    res.status(500).json({ error: err.message });
}
}

  module.exports ={createSub_Category,getAllSub_Category,updateSub_Category,deleteSub_Category}