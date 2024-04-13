const asyncHandler = require("express-async-handler");
const User =require("../models/userModel");
const bycrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");

const protect = asyncHandler(async(req,res,next) => {

    try{ 

   
    const token= req.cookies.token;

    if(!token){

        res.status(400);
        throw new Error("Invalid Token");
    }

    const verified = await jwt.verify(token, process.env.JWT_SECRET_1);

    const user = await User.findById(verified.id).select("-password");

    if(!user){
        res.status(400);
        throw new Error("Invalid User");  
    }

    req.user =user;
    next();

}catch(e){
    res.status(400);
    throw new Error("Invalid User");  
}




})

module.exports=protect;