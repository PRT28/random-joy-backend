const  express = require("express");
const {
    createAsset,
    getFeedAssets,
    getAllJoy,
    getAllWack,
    getUserAssets,
    likeAsset,
    deleteAsset,
    dislikeAsset,
    commentAsset,
    deleteComment,
    updateAsset,
    updateAssetStatus,
    randomAsset,
    shareAsset,
    getAssetWithId,
    getSharedAsset,
    shareCommitmentAsset,
    openShare} =require( "../controllers/asset.js");
const  verifyToken  = require( "../middleware/auth.js");

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedAssets);
router.get("/joy", verifyToken, getAllJoy);
router.get("/wack", verifyToken, getAllWack);
router.get("/user/:user_id", verifyToken, getUserAssets);
/* POST */
router.post("/", verifyToken, createAsset)
/* UPDATE */
router.put("/update/:id", verifyToken, updateAsset);
router.post("/like/:id", verifyToken, likeAsset);
router.post("/dislike/:id", verifyToken, dislikeAsset);
router.post("/comment/:id", verifyToken, commentAsset);
router.delete("comment/delete/:id",verifyToken, deleteComment)
router.patch("/status/:id", verifyToken, updateAssetStatus)
/* DELETE POST */
router.delete("/delete/:id", verifyToken, deleteAsset)
router.get('/random/asset', verifyToken, randomAsset);
router.post('/share/:id', verifyToken, shareAsset);
router.post('/share/commitment/:id/:commitId', verifyToken, shareCommitmentAsset)
router.patch('/share/:id', verifyToken, openShare);
router.get('/share', verifyToken, getSharedAsset);
router.get('/:id', verifyToken, getAssetWithId)
// router.delete("/deleteOld/:id", deleteOld)
module.exports= router;