const Asset_type= require("../models/Asset_type.js");
const User =require("../models/User.js")


/* CREATE */
const createAssetType = async (req, res) => {
    try {
      const {user_id,name}=req.body;
      const user = await User.findById(user_id);
      console.log(user)
    if(!user || user.role)
    {
      res.status(400).json({ message: "Only Admins Are allowed to add Asset Type." });
    }
    if (user.role == 0){
      const assetType = new Asset_type({
        name
      });
        await assetType.save();
        res.status(201).json(assetType);
    } else{
      res.status(400).json({ message: "Only Admins Are allowed to add Asset type."});
    }
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}
  /* READ */
const getAllAssetType = async (req, res) => {
    try {
      const assetType = await Asset_type.find();
      res.status(200).json(assetType);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
const getAssetType = async (req, res) => {
    try {
        const { name } = req.params;
      const assetType = await Asset_type.find({category_title});
      res.status(200).json(assetType);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  module.exports ={createAssetType,getAllAssetType,getAssetType}
