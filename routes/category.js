const  express = require("express");
const {createCategory,getAllCategory,deleteCategory,updateCategory } =require( "../controllers/category");

const  verifyToken  = require( "../middleware/auth.js");


const router = express.Router();

/* CREATE */
router.post("/", verifyToken,createCategory);

/* GET */
router.get("/", verifyToken, getAllCategory);
/*Update*/
router.put("/update/:id", verifyToken, updateCategory);
/*Delete*/ 
router.delete("/delete/:id", verifyToken, deleteCategory)


module.exports= router;