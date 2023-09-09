const  express = require("express");
const { register,login,getAllUser,authDetails}= require("../controllers/auth.js");
const  verifyToken  = require( "../middleware/auth.js");
const router = express.Router();

// #swagger.tags = ['Users']
router.post("/register", register);
router.post("/login", login);
router.get("/users",verifyToken, getAllUser);
router.get("/details", verifyToken, authDetails)

module.exports =  router 
// export default router;