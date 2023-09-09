const  express = require("express");
const {createCategory,getCategory,getAllCategory,deleteCategory,updateCategory } =require( "../controllers/category");
const multer=require("multer")
const  verifyToken  = require( "../middleware/auth.js");
const upload = multer({ storage: multer.diskStorage({}),
limits: { fileSize: 10000000 } });

const router = express.Router();

/* CREATE */
router.post("/", verifyToken,upload.single("filepath"),createCategory);

/* GET */
router.get("/", verifyToken, getAllCategory);
router.get("/:category_id", verifyToken, getCategory);
/*Update*/
router.put("/update/:category_id", verifyToken, updateCategory);
/*Delete*/ 
router.delete("/delete/:id", verifyToken, deleteCategory)
router.delete("/delete/:category_id", verifyToken, deleteCategory)


module.exports= router;