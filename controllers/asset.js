const Asset  =require( "../models/Asset.js");
const User =require("../models/User.js");
const Category =require("../models/Category.js");

const cloudinary = require("../configs/cloudinary.js")

/* CREATE */
 const createAsset = async (req, res) => {
  try {
    const { user_id, description,keyword_name,category_name,asset_type,is_joy} = req.body;
    const category=await Category.find({category_title:category_name});
    if(!category)
    {
      res.status(400).json({ message: "Invalid Category."});
    }
    const user = await User.findById(user_id);
   
    if(!["picture","video","gif"].includes(asset_type))
    {
      res.status(500).json({ message: "invalid Asset Type" })
    }
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    if(is_joy==true && user.role==0)
    {
      const newPost = new Asset({
        user_id,
        description,
        category_name,
        keyword_name,
        url:upload.secure_url,
        is_joy,
        asset_type,
      });
      await newPost.save();
      res.status(201).json(newPost);
    }
    else if(is_joy==true && user.role!=0)
    {
      res.status(400).json({ message: "Only Admins Are allowed to add joys." });
    }
    else{
    
      const newPost = new Asset({
        user_id,
        description,
        category_name,
        keyword_name,
        url:upload.secure_url,
        likes:{},
        asset_type
      });
      await newPost.save();
      const assets = await Asset.find();
      res.status(201).json(assets);
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
 const getFeedAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

 const getUserAssets = async (req, res) => {
  try {
    const { user_id } = req.params;
    const assets = await Asset.find({ user_id });
    res.status(200).json(assets);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
 const likeAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const user = await User.findById(user_id);
    if(!user_id){
      res.status(401).json({ message: "Unauthorized" })
    }
    const asset = await Asset.findById(id);
    console.log(asset)
    const isLiked = asset.likes.get(user_id);
    if (isLiked==1) {
      asset.likes.delete(user_id);
      asset.like_count=asset.like_count-1;
    } else {
      asset.likes.set(user_id, 1);
      asset.like_count=asset.like_count+1;
    }
    const updatedAsset = await Asset.findByIdAndUpdate(
      id,
      { likes: asset.likes,like_count:asset.like_count },
      { new: true }
    );

    res.status(200).json(updatedAsset);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const dislikeAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const user = await User.findById(user_id);
    const asset = await Asset.findById(id);
    console.log(asset)
    const isLiked = asset.likes.get(user_id);
    if (isLiked==1) {
      asset.likes.set(user_id, 2);
      asset.like_count=asset.like_count-1;
    } else if(isLiked==2){
      asset.likes.delete(user_id);
    } else {
      asset.likes.set(user_id, 2);
    
    }
    const updatedAsset = await Asset.findByIdAndUpdate(
      id,
      { likes: asset.likes,like_count:asset.like_count },
      { new: true }
    );

    res.status(200).json(updatedAsset);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
  /* DELETE POST */
  const deleteAsset = async (req, res) => {
    try {
      const {id} = req.params;
      const { user_id } = req.body;
      const asset = await Asset.findById(id);
      if(!asset){
        res.status(404).json({ message:"Asset doesnot exist." });
      }
      const oldUrl = asset.url;
      const getPublicId = (oldUrl) => oldUrl.split("/").pop().split(".")[0];
      const deleted = await cloudinary.v2.uploader.destroy(getPublicId(oldUrl));
      if (user_id==asset.user_id) {
         await asset.deleteOne()
        const allasset = await Asset.find({});
        res.status(200).json(allasset);
        
      } else {
        res.status(403).json({"message":"You are not the author of asset"})
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  module.exports ={createAsset,getFeedAssets,getUserAssets,likeAsset,dislikeAsset,deleteAsset}