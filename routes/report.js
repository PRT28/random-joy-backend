const  express = require("express");
const {createReport,getAllReports,takeAction, deleteReport}= require("../controllers/report.js");
const  verifyToken  = require( "../middleware/auth.js");
const router = express.Router();


router.post("/",verifyToken, createReport);
router.get("/",verifyToken,getAllReports);
router.patch("/takeaction/:report_id",verifyToken,takeAction);
router.delete("/:id", verifyToken, deleteReport)


module.exports =  router 
