const  express = require("express");
const {createCommitmentOrStatement,getAllCommitment,getAllStatement}= require("../controllers/commitment.js");
const  verifyToken  = require( "../middleware/auth.js");
const router = express.Router();
router.post("/",verifyToken, createCommitmentOrStatement);
router.get("/commitment",verifyToken, getAllCommitment);
router.get("/statement",verifyToken, getAllStatement);

module.exports =  router 
// export default router;