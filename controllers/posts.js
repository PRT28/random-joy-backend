const Post =require( "../models/Post.js");
const User =require("../models/User.js");
const cloudinary = require("../configs/cloudinary.js")

/* CREATE */
 const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    console.log(req)
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      picturePath:upload.secure_url,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
 const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

 const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
 const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

 const addCommentPost = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId,comment } = req.body;
      const post = await Post.findById(id);
      let updatedcomment=post.comments
      updatedcomment.push([userId,comment])
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { comments: updatedcomment },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  /* DELETE POST */
  const deletePost = async (req, res) => {
    try {
      const {id} = req.params;
      console.log(req.body)
      const { userId } = req.body;
      const post = await Post.findById(id);
      if(!post){
        res.status(404).json({ message:"Post doesnot exist." });
      }
      const oldUrl = post.picturePath;
      const getPublicId = (oldUrl) => oldUrl.split("/").pop().split(".")[0];
      const deleted = await cloudinary.v2.uploader.destroy(getPublicId(oldUrl));
      if (userId==post.userId) {
         await post.deleteOne()
        const allpost = await Post.find({});
        res.status(200).json(allpost);
        
      } else {
        res.status(403).json({"message":"You are not the author of post"})
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  module.exports ={createPost,getFeedPosts,getUserPosts,likePost,addCommentPost,deletePost}