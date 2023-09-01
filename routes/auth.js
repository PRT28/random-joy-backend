const  express = require("express");
const { register,login,getAllUser}= require("../controllers/auth.js");
const  verifyToken  = require( "../middleware/auth.js");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/users",verifyToken, getAllUser);

module.exports =  router 
// export default router;