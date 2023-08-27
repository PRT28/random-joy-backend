const  express = require("express");
const {createCategory,getCategory } =require( "../controllers/category");
const multer=require("multer")
const  verifyToken  = require( "../middleware/auth.js");
const upload = multer({ storage: multer.diskStorage({}),
limits: { fileSize: 50000000 } });

const router = express.Router();

/* CREATE */
router.post("/", verifyToken,  upload.single("filepath"),createCategory);

/* GET */
router.get("/:category_title", verifyToken, getCategory);


module.exports= router;