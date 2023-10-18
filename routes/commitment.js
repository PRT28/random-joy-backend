const  express = require("express");
const {
    createCommitmentOrStatement,
    getAllCommitment,
    getAllStatement,
    deleteCommitment,
    updateCommitment,
    takeAction,
    randomCommitment,
    randomStatement,
    getCommitments,
    assignCommitment,
    assignStatement}= require("../controllers/commitment.js");
const  verifyToken  = require( "../middleware/auth.js");
const router = express.Router();
router.post("/",verifyToken, createCommitmentOrStatement);
router.get("/commitment",verifyToken, getAllCommitment);
router.get("/statement",verifyToken, getAllStatement);
router.delete("/delete/:id",verifyToken, deleteCommitment)
router.put("/update/:id",verifyToken, updateCommitment)
router.patch("/complete",verifyToken, takeAction)
router.get("/random/commitment", verifyToken, randomCommitment);
router.get("/random/statement", verifyToken, randomStatement);
router.get("/user/commitment", verifyToken, getCommitments);
router.post("/commitment", verifyToken, assignCommitment);
router.post("/statement", verifyToken, assignStatement);

module.exports =  router 
// export default router;