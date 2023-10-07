const  express = require("express");
const { register,login,getAllUser,authDetails, updateUser, permanentDeleteUser, changeUserStatus, updateUserInterest, skipInterest}= require("../controllers/auth.js");
const  verifyToken  = require( "../middleware/auth.js");
const router = express.Router();

// #swagger.tags = ['Users']
router.post("/register", register);
router.post("/login", login);
router.get("/users",verifyToken, getAllUser);
router.get("/details", verifyToken, authDetails)
router.patch("/update/:id", verifyToken, updateUser)
router.patch("/disableuser/:id", verifyToken, changeUserStatus)
router.delete("/delete/:id", verifyToken, permanentDeleteUser)
router.post("/updateInterest/:id", verifyToken, updateUserInterest);
router.post("/skipInterest/:id", verifyToken, skipInterest)


module.exports =  router 
// export default router;