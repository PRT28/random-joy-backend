const  express = require("express");
const {createReport,getAllReports,getAllUserReport,takeAction}= require("../controllers/report.js");
const  verifyToken  = require( "../middleware/auth.js");
const router = express.Router();


router.post("/",verifyToken, createReport);
router.get("/",verifyToken,getAllReports);
router.patch("/takeaction/:report_id",verifyToken,takeAction);


module.exports =  router 
