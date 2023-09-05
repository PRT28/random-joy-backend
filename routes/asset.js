const  express = require("express");
const {createAsset, getFeedAssets,getAllJoy,getAllWack, getUserAssets, likeAsset,deleteAsset, dislikeAsset, updateAsset } =require( "../controllers/asset.js");
const multer=require("multer")
const  verifyToken  = require( "../middleware/auth.js");
const upload = multer({ storage: multer.diskStorage({}),
limits: { fileSize: 50000000 } });

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedAssets);
router.get("/joy", verifyToken, getAllJoy);
router.get("/wack", verifyToken, getAllWack);

router.get("/:user_id/assets", verifyToken, getUserAssets);
/* POST */
router.post("/", verifyToken, upload.single("filepath"), createAsset)
/* UPDATE */
router.put("/:id/update", verifyToken, updateAsset)
router.put("/:id/like", verifyToken, likeAsset);
router.put("/:id/dislike", verifyToken, dislikeAsset);


/* DELETE POST */
router.delete("/:id/delete", verifyToken, deleteAsset)


module.exports= router;