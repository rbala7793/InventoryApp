const express =require("express");
const router =express.Router();
const {registerUser,loginUser,logout,getUser,getLoginStatus,updateUser} =require("../controllers/userController");
const protect = require("../middleware/authMiddleware"); 



router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logout);
router.get("/getUser",protect,getUser);
router.get("/getLoginStatus",getLoginStatus);

router.post("/updateUser",protect,updateUser);

module.exports=router