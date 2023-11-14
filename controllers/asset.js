const Asset  =require( "../models/Asset.js");
const User =require("../models/User.js");
const Category =require("../models/Category.js");
const Share = require("../models/Shares.js");

const cloudinary = require("../configs/cloudinary.js");
const LikesModel = require("../models/Likes.js");
const DisLikesModel = require("../models/Dislike.js");
const commentModel = require("../models/Comments.js");
const shuffle = require('../middleware/helper.js');

const NodeCache = require( "node-cache" );
const cache = new NodeCache();

/* CREATE */
 const createAsset = async (req, res) => {
  try {
    const { description,keyword_name,name,category_name,upload_type,asset_type,asset_category} = req.body;
    const category=await Category.findOne({category_title:category_name});
    const { user } = req.user
    if(!category) {
      return res.status(400).json({ message: "Invalid Category."});
    }
    if(!user) {
      return res.status(400).json({ message: "invalid user" })
    }
    let upload=null;
    if(upload_type===0){
        upload=req.body.url;
    }
    else if(upload_type===1){

      if(asset_category === 0) {
        if(!upload)upload = await cloudinary.v2.uploader.upload(req.file.path,{folder:"asset"});
      }else if (asset_category === 1){
        if(!upload) upload = await cloudinary.v2.uploader.upload(req.file.path,{folder:"joy"});
      } else if (asset_category === 2) {
        if(!upload) upload = await cloudinary.v2.uploader.upload(req.file.path,{folder:"whack"});
      } else {
        return res.status(400).json({ message: "Wrong asset category." });
      }
      upload=upload.secure_url;
    }
    else{
      return res.status(400).json({ message: "Wrong asset category." });
    }
    if(asset_category === 0)
    {
      const newPost = new Asset({
        user_id:user._id,
        description,
        category_id:category.id,
        keyword_name,
        name,
        url:upload,
        asset_category,
        asset_type:asset_type
      });
      await newPost.save();
      res.status(201).json(newPost);
    } else {
      if (user.role===2) {
       return  res.status(400).json({ message: "User does not have permission to exeute the command." });
      }  else{
        const newPost = new Asset({
          user_id:user._id,
          category_id:category.id,
          url:upload,
          name,
          asset_category,
          asset_type:asset_type
        });
       const joyOrWack= await newPost.save();
        res.status(201).json(joyOrWack);
      }
    }
   
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
 const getFeedAssets = async (req, res) => {
  try {
    
    const assets = await Asset.find({asset_category:0});
    res.status(200).json(assets);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const getAllJoy = async (req, res) => {
  try {
    const assets = await Asset.find({asset_category:1});
    res.status(200).json(assets);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const getAllWack = async (req, res) => {
  try {
    const assets = await Asset.find({asset_category:2});
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
    const { user } = req.user
    const newlike= new LikesModel({
      user_id:user._id,
      asset_id:id
    })
    await newlike.save()
    res.status(200).json({"message":"liked successfully"})
}catch(err){
  res.status(500).json({"message":err.message})
}
 };
 const dislikeAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.user
    const newdislike= new DisLikesModel({
      user_id:user._id,
      asset_id:id
    })
    await newdislike.save()
    res.status(200).json({"message":"liked successfully"})
}catch(err){
  res.status(500).json({"message":err.message})
}
 };
 const commentAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.user
    const {comment}= req.body
    const newlike= new commentModel({
      user_id:user._id,
      asset_id:id,
      comment
    })
    await newlike.save()
    res.status(200).json({"message":"liked successfully"})
}catch(err){
  res.status(500).json({"message":err.message})
}
 };
const updateAsset = async (req, res) => {
  try {
    const {id} = req.params;
    const { description,keyword_name,category_name,url,name,asset_type,asset_category,upload_type} = req.body;

    const asset = await Asset.findById(id);
    if(!asset){
      res.status(404).json({ message:"Asset doesnot exist."});
    }
    const { user } = req.user
    const category=await Category.findOne({category_title:category_name});
    if(!category) {
      return res.status(400).json({ message: "Invalid Category."});
    }
    let upload=null;
    if(upload_type===0){
        upload=req.body.url;
    }
    else if(upload_type===1){

      if(asset_category === 0) {
        if(!upload)upload = await cloudinary.v2.uploader.upload(req.file.path,{folder:"asset"});
      }else if (asset_category === 1){
        if(!upload) upload = await cloudinary.v2.uploader.upload(req.file.path,{folder:"joy"});
      } else if (asset_category === 2) {
        if(!upload) upload = await cloudinary.v2.uploader.upload(req.file.path,{folder:"whack"});
      } else {
        return res.status(400).json({ message: "Wrong asset category." });
      }
      upload=upload.secure_url;
    }
      await Asset.findByIdAndUpdate(id, {
        user_id:user._id,
        description,
        name,
        category_id:category.id,
        keyword_name,
        url:upload,
        asset_category,
        asset_type
      }).then(() => res.status(201).json({
        success: true,
        message: "Asset updated successfully"
      }))
      const allasset = await Asset.find({});
      res.status(200).json(allasset);
      
  } catch (err){
    res.status(500).json({ message: err.message });
  }
}
  /* DELETE POST */

  const deleteComment = async (req, res) => {
    try {
      const {id} = req.params;
      
      const asset = await commentModel.findByIdAndDelete(id)
      res.status(200).json({"message":"comment deleted successfully"})
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  const deleteAsset = async (req, res) => {
    try {
      const {id} = req.params;
      
      const asset = await Asset.findById(id)
      const oldUrl = asset.url;
      const getPublicId = (oldUrl) => oldUrl.split("/").pop().split(".")[0];
      await Asset.findByIdAndDelete(id)
      const deleted = await cloudinary.v2.uploader.destroy(getPublicId(oldUrl));
      res.status(200).json(allasset);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  const deleteOld = async (req, res) => {
    const x = new Date();
    x.setDate(x.getDate() - 7);
    console.log(x);
    try {
      await Asset.deleteMany({
        createdAt: { $gt: x }
      });
      res.status(200).json({ message: 'Old assets deleted successfully' });
    } 
    catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message});
    }
  };
  
  const updateAssetStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { user } = req.user;
      console.log(user)
      const asset = await Asset.findById(id);
      if(!asset){
       return res.status(401).json({ message: "Asset Not Found" })
      }
      if (user.role===2) {
        return  res.status(400).json({ message: "User does not have permission to exeute the command." });
       }  else{
      asset.$set('isActive', !report.isActive);
        asset.save()
      res.status(200).json(asset);
       }
    }
    catch(err){
      res.status(404).json({ message: err.message });
    }
  }

  const randomAsset = async (req, res) => {
    try {
      const user = req.user;
      const {type: typeString} = req.query
      const type = parseInt(typeString);
      const assets = await Asset.find({
        $and: [
          {category_id: {
            $in: user.interests
          }},
          {
            asset_category: 1
          }
        ]
      });
      console.log(assets);
      const output = shuffle(assets);
      const asset = {...output[0]};

      const {puzzleCount,
            commitmentCount,
            statementCount,
            mysteryCount,
            normalCount} = cache.mget(['puzzleCount', 'commitmentCount', 'statementCount', 'mysteryCount', 'normalCount'])

      if (type === 0) {
        asset.openedWith = 0;
        cache.set('puzzleCount', puzzleCount + 1);
        asset.isMystery = false
        cache.set('normalCount', normalCount + 1)
        return res.status(200).json(asset);
      } else if (type === 1) {
        asset.openedWith = 1;
        cache.set('commitmentCount', commitmentCount + 1);
        asset.isMystery = false
        cache.set('normalCount', normalCount + 1)
        return res.status(200).json(asset);
      } else if (type === 2) {
        asset.openedWith = 2;
        cache.set('statementCount', statementCount + 1);
        asset.isMystery = false
        cache.set('normalCount', normalCount + 1)
        return res.status(200).json(asset);
      } else {
        if (commitmentCount - puzzleCount > process.env.ASSET_TYPE_THRESHOLD) {
          asset.openedWith = 0;
          cache.set('puzzleCount', puzzleCount + 1);
        } else if (puzzleCount - commitmentCount > process.env.ASSET_TYPE_THRESHOLD) {
          asset.openedWith = 1;
          cache.set('commitmentCount', commitmentCount + 1);
        } else if (puzzleCount - statementCount > process.env.ASSET_TYPE_THRESHOLD) {
          asset.openedWith = 2;
          cache.set('statementCount', statementCount + 1);
        } else if (statementCount - puzzleCount > process.env.ASSET_TYPE_THRESHOLD) {
          asset.openedWith = 0;
          cache.set('puzzleCount', puzzleCount + 1);
        } else if (statementCount - commitmentCount > process.env.ASSET_TYPE_THRESHOLD) {
          asset.openedWith = 1;
          cache.set('commitmentCount', commitmentCount + 1);
        } else if (commitmentCount - statementCount > process.env.ASSET_TYPE_THRESHOLD) {
          asset.openedWith = 2;
          cache.set('statementCount', statementCount + 1);
        } else {
            let typeRandom = Math.random();
            if (typeRandom % 2 === 0) {
              asset.openedWith = 0;// puzzle
              cache.set('puzzleCount', puzzleCount + 1);
            } else if (typeRandom % 3 === 0) {
              asset.openedWith = 1; //commitment
              cache.set('commitmentCount', commitmentCount + 1);
            } else {
              asset.openedWith = 2; //statement
              cache.set('statementCount', statementCount + 1);
            }
        }
      }
      
      if(type === 3) {
        asset.isMystery = true
        cache.set('mysteryCount', mysteryCount + 1)
      } else {
        if (mysteryCount - normalCount > process.env.ASSET_TYPE_THRESHOLD) {
          asset.isMystery = false
          cache.set('normalCount', normalCount + 1)
        } else if (normalCount - mysteryCount > process.env.ASSET_TYPE_THRESHOLD) {
          asset.isMystery = true
          cache.set('mysteryCount', mysteryCount + 1)
        } else {
          let typeRandom = Math.random();
  
          if (typeRandom % 2 === 0) {
            asset.isMystery = false;
          } else {
            asset.isMystery = true; 
          }
        }
  
      }
      return res.status(200).json(asset);
    } catch(err){
      res.status(404).json({ message: err.message });
    }
  };


  const shareAsset = async (req, res) => {
    try {
      const {user} = req.user;
      const {id} = req.params;
      console.log(user);
      const users = await User.find({})
      const final = shuffle(users);
      const share = new Share({
        user_id: user._id,
        is_forced: false,
        is_opened: false,
        asset_id: id,
        shared_to: final[0]._id,
      })
      await share.save()
              .then(() => {
                res.status(200).json({
                  message: 'Asset shared successfully',
                })
              })
    } catch(err){
      res.status(404).json({ message: err.message });
    }
  };

 const getSharedAsset = async (req, res) => {
  try {
    const {user} = req.user;
    const shares = await Share.find({shared_to: user._id, is_openend: false});
    return res.status(200).json(shares);
  } catch(err){
    res.status(404).json({ message: err.message });
  }
 };

 const openShare = async (req, res) => {
  const{id}=req.params;
  try {
    const dump = await Share.findById(id)
    dump['is_opened']=true;
    console.log(dump)
    dump.save();
    return res.status(200).json({message: 'Asset opened successfully'});
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

 const getAssetWithId = async (req, res) => {
  try {
    const {id} = req.params;
    const assets = await Asset.find({_id: id});
    console.log(assets);
    const output = shuffle(assets);
    const asset = {...output[0]};

    const {puzzleCount,
          commitmentCount,
          statementCount,
          mysteryCount,
          normalCount} = cache.mget(['puzzleCount', 'commitmentCount', 'statementCount', 'mysteryCount', 'normalCount'])

    if (commitmentCount - puzzleCount > process.env.ASSET_TYPE_THRESHOLD) {
      asset.openedWith = 0;
      cache.set('puzzleCount', puzzleCount + 1);
    } else if (puzzleCount - commitmentCount > process.env.ASSET_TYPE_THRESHOLD) {
      asset.openedWith = 1;
      cache.set('commitmentCount', commitmentCount + 1);
    } else if (puzzleCount - statementCount > process.env.ASSET_TYPE_THRESHOLD) {
      asset.openedWith = 2;
      cache.set('statementCount', statementCount + 1);
    } else if (statementCount - puzzleCount > process.env.ASSET_TYPE_THRESHOLD) {
      asset.openedWith = 0;
      cache.set('puzzleCount', puzzleCount + 1);
    } else if (statementCount - commitmentCount > process.env.ASSET_TYPE_THRESHOLD) {
      asset.openedWith = 1;
      cache.set('commitmentCount', commitmentCount + 1);
    } else if (commitmentCount - statementCount > process.env.ASSET_TYPE_THRESHOLD) {
      asset.openedWith = 2;
      cache.set('statementCount', statementCount + 1);
    } else {
        let typeRandom = Math.random();
        if (typeRandom % 2 === 0) {
          asset.openedWith = 0;// puzzle
          cache.set('puzzleCount', puzzleCount + 1);
        } else if (typeRandom % 3 === 0) {
          asset.openedWith = 1; //commitment
          cache.set('commitmentCount', commitmentCount + 1);
        } else {
          asset.openedWith = 2; //statement
          cache.set('statementCount', statementCount + 1);
        }
    }
    
  
    if (mysteryCount - normalCount > process.env.ASSET_TYPE_THRESHOLD) {
      asset.isMystery = false
      cache.set('normalCount', normalCount + 1)
    } else if (normalCount - mysteryCount > process.env.ASSET_TYPE_THRESHOLD) {
      asset.isMystery = true
      cache.set('mysteryCount', mysteryCount + 1)
    } else {
      let typeRandom = Math.random();

      if (typeRandom % 2 === 0) {
        asset.isMystery = false;
      } else {
        asset.isMystery = true; 
      }
    }

    return res.status(200).json(asset);
  } catch(err){
    res.status(404).json({ message: err.message });
  }
 }



  module.exports ={
    updateAssetStatus,
    createAsset,
    getFeedAssets,
    getUserAssets,
    getAllJoy,
    getAllWack,
    likeAsset,
    updateAsset,
    deleteAsset,
    deleteOld,
    dislikeAsset,
    commentAsset,
    deleteComment,
    randomAsset,
    shareAsset,
    getAssetWithId,
    getSharedAsset,
    openShare}
