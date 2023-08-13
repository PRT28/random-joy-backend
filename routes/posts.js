const  express = require("express");
const {createPost, getFeedPosts, getUserPosts, likePost,addCommentPost,deletePost } =require( "../controllers/posts.js");
const multer=require("multer")
const  verifyToken  = require( "../middleware/auth.js");
const upload = multer({ storage: multer.diskStorage({}),
limits: { fileSize: 50000000 } });

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
/* POST */
router.post("/", verifyToken, upload.single("picturePath"), createPost)
/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, addCommentPost)

/* DELETE POST */
router.post("/:id/delete", verifyToken, deletePost)


module.exports= router;