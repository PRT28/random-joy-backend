const  express = require("express");
const {createSub_Category, getAllSub_Category, updateSub_Category, deleteSub_Category } =require( "../controllers/sub_category");
const  verifyToken  = require( "../middleware/auth.js");


const router = express.Router();

/* CREATE */
router.post("/", verifyToken,createSub_Category);

/* GET */
router.get("/", verifyToken, getAllSub_Category);
/*Update*/
router.put("/update/:id", verifyToken, updateSub_Category);
/*Delete*/ 
router.delete("/delete/:id", verifyToken, deleteSub_Category)


module.exports= router;