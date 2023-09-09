const  express = require("express");
const {createAsset, getFeedAssets,getAllJoy,getAllWack, getUserAssets, likeAsset,deleteAsset, updateAsset ,updateAssetStatus} =require( "../controllers/asset.js");
const multer=require("multer")
const  verifyToken  = require( "../middleware/auth.js");
const upload = multer({ storage: multer.diskStorage({}),
limits: { fileSize: 50000000 } });

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedAssets);
router.get("/joy", verifyToken, getAllJoy);
router.get("/wack", verifyToken, getAllWack);
router.get("/user/:user_id", verifyToken, getUserAssets);
/* POST */
router.post("/", verifyToken, upload.single("filepath"), createAsset)
/* UPDATE */
router.put("/update/:id", verifyToken, updateAsset);
router.patch("/like/:id", verifyToken, likeAsset);
router.patch("/status/:id", verifyToken, updateAssetStatus)
/* DELETE POST */
router.delete("/delete/:id", verifyToken, deleteAsset)


module.exports= router;