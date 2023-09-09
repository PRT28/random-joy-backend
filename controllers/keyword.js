const Keyword = require("../models/Keyword");

/* CREATE */
const createKeyword = async (req, res) => {
  try {
    const {
      title,
      description
    } = req.body;
    const user = req.user;
    if(user.role==2)
    {
      return res.status(400).json({ message: "Only Admins Are allowed to add Keyword." });
    }
    else{
      const newKeyword = new Keyword({
        title,
        description
      } );
        await newKeyword.save();
        res.status(201).json(newKeyword);
    } 
  } catch(err) {    
      res.status(500).json({ error: err.message });
  }
};
/* READ */
const getAllKeyword = async (req, res) => {
    try {
      const category = await Keyword.find();
      res.status(200).json(category);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

/* UPDATE */
const updateKeyword = async (req, res) => {
  const {id} = req.query;
  try {
    const {
        title,
        description
      } = req.body;
    const user = req.user
    if(!user || user.role==2)
    {
     return  res.status(400).json({ message: "Only Admins Are allowed to add Keyword." });
    }
    const oldKeyword = await Keyword.findById(id);
    if(!oldKeyword){
     return res.status(404).json({ message: "Keyword donot exists."});
    }
    if (user.role ==0 ||user.role ==1){

      const updatedKeyword =await Keyword.updateOne({id:oldKeyword.id},{
        title,
        description
      });
  
        res.status(201).json(updatedKeyword);
    } else{
      res.status(400).json({ message: "Only Admins Are allowed to add Keyword." });
    }
  } catch(err) {    
      res.status(500).json({ error: err.message });
  }
};

/* Delete Category*/ 

const deleteKeyword = async (req, res) => {
  const { id } = req.query;
  try {
    const user = req.user;
    if(!user || user.role==2)
    {
     return  res.status(400).json({ message: "Only Admins Are allowed to delete Keyword." });
    }
    const oldKeyword = await Keyword.findById(id)
    if(!oldKeyword){
     return res.status(400).json({ message: "Keyword do not exists."});
    }
    const deleteResponse=await Keyword.findByIdAndDelete(id);
    const keyword = await Keyword.find();
    res.status(200).json(keyword);
  }catch(err) {    
    res.status(500).json({ error: err.message });
}
}

  module.exports ={createKeyword,getAllKeyword,updateKeyword,deleteKeyword}