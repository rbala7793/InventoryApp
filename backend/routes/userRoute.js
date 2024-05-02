const express =require("express");
const router =express.Router();
const {registerUser,loginUser,logout,getUser,getLoginStatus,updateUser,changePassword,forgetPassword,resetPassword} =require("../controllers/userController");
const protect = require("../middleware/authMiddleware"); 



router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logout);
router.get("/getUser",protect,getUser);
router.get("/getLoginStatus",getLoginStatus);

router.post("/updateUser",protect,updateUser);
router.post("/changePassword",protect,changePassword);
router.post("/forgetPassword",forgetPassword);

router.post("/resetPassword/:token",resetPassword);

module.exports=router