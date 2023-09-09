const  express = require("express");
const {createCommitmentOrStatement,getAllCommitment,getAllStatement, deleteCommitment}= require("../controllers/commitment.js");
const  verifyToken  = require( "../middleware/auth.js");
const router = express.Router();
router.post("/",verifyToken, createCommitmentOrStatement);
router.get("/commitment",verifyToken, getAllCommitment);
router.get("/statement",verifyToken, getAllStatement);
router.delete("/delete/:id",verifyToken, deleteCommitment)

module.exports =  router 
// export default router;