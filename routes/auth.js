const  express = require("express");
const { register,login,getAllUser}= require("../controllers/auth.js");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUser);

module.exports =  router 
// export default router;