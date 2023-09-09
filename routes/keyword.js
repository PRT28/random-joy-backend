
const  express = require("express");
const {createKeyword,getAllKeyword,updateKeyword,deleteKeyword}=require( "../controllers/keyword");
const  verifyToken  = require( "../middleware/auth.js");

const router = express.Router();

/* CREATE */
router.post("/", verifyToken,createKeyword);

/* GET */
router.get("/", verifyToken, getAllKeyword);

/*Update*/
router.put("/update", verifyToken, updateKeyword);

/*Delete*/ 
router.delete("/delete", verifyToken, deleteKeyword)


module.exports= router;