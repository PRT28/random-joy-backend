const  express = require("express");
const {createReport,getAllReports,getAllUserReport,takeAction, deleteReport}= require("../controllers/report.js");
const  verifyToken  = require( "../middleware/auth.js");
const router = express.Router();


router.post("/",verifyToken, createReport);
router.get("/",verifyToken,getAllReports);
router.get("/:username",verifyToken, getAllUserReport);
router.patch("/:report_id",verifyToken,takeAction);
router.delete("/:id", verifyToken, deleteReport)


module.exports =  router 
