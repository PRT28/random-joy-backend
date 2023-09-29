const  express = require("express");
const  verifyToken  = require( "../middleware/auth.js");
const { createSub_Sub_Category, getAllSub_Sub_Category, updateSub_Sub_Category, deleteSub_Sub_Category } = require("../controllers/sub_sub_category");


const router = express.Router();

/* CREATE */
router.post("/", verifyToken,createSub_Sub_Category);

/* GET */
router.get("/", verifyToken, getAllSub_Sub_Category);
/*Update*/
router.put("/update/:id", verifyToken, updateSub_Sub_Category);
/*Delete*/ 
router.delete("/delete/:id", verifyToken, deleteSub_Sub_Category)


module.exports= router;