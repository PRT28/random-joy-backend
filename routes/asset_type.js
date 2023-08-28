const  express = require("express");
const {createAssetType,getAllAssetType,getAssetType} =require( "../controllers/asset_type.js");
const  verifyToken  = require( "../middleware/auth.js");

const router = express.Router();

/* CREATE */
router.post("/", verifyToken,createAssetType);

/* GET */
router.get("/", verifyToken,getAllAssetType);
router.get("/:name", verifyToken, getAssetType);


module.exports= router;