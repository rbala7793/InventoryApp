const asyncHandler = require("express-async-handler");
const User =require("../models/userModel");
const Token = require("../models/tokenModel")
const bycrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
const crypto = require("crypto");
const { threadId } = require("worker_threads");
 

const generateToken = async (id) =>{

    console.log(id);
    console.log(process.env.JWT_SECRET_1);

   return jwt.sign({id},process.env.JWT_SECRET_1,{expiresIn:"1d"})
}


const registerUser = asyncHandler( async (req,res) =>{
 
    const {name,email,password} = req.body;
1
     if(!name || !email || !password){

        res.status(400);

        throw new Error("Please Enter required fields");

     }
     if(password.length < 6){

        res.status(400);

        throw new Error("Min 6 characters need");

     }

     //Check user exist

     const userExist = await User.findOne({email});
     if(userExist){

        res.status(400);

        throw new Error("User already Exist");

     }

  
     const user= await User.create({
        name,
        email,
        password
    })
    console.log(process.env.JWT_SECRET_1);
    
    const token= await generateToken(user.id);

    res.cookie("token",token,{
       path:"/",
       httpOnly:true,
       expires:new Date(Date.now()+ 1000 * 86400), //1 Day
       samesite:"none",
       secure:true

    });


    if(user){
        const {id,name,email}=user;
       res.status(201).json({_id:id, name:name,token })
    }else{
        res.status(400);
        throw new Error("User already Exist"); 
    }
  

     
})

const loginUser = asyncHandler( async (req,res)=>{

    const {email, password}= req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("User already Exist");
    }
    
    const user = await User.findOne({email});

    if(!user){

        res.status(400);
        throw new Error("User already Exist");

    }

    const passwordMatch = await bycrypt.compare(password,user.password );

    const token= await generateToken(user.id);

    res.cookie("token",token,{
       path:"/",
       httpOnly:true,
       expires:new Date(Date.now()+ 1000 * 86400), //1 Day
       samesite:"none",
       secure:true

    });
    
    if(user && passwordMatch){

        const {id,name,email}=user;

         res.status(200).json({
            id,
            name,
            token
         })

    }else{
        res.status(400);
        throw new Error("User already Exist");

    }


     
})

const logout = asyncHandler( async (req,res)=>{

    res.cookie("token",'',{
        path:"/",
        httpOnly:true,
        expires:new Date(0), //1 Day
        samesite:"none",
        secure:true
    });

 res.status(201).json({
    message:"Logout Successfully"
 });    

})
const getUser =  asyncHandler(async(req,res) => {

    const user = await User.findById(req.user._id);

    if(!user){

        res.status(400);
        throw new Error("User already Exist");

    }

    const {id,name,email}=user;
 
    res.status(200).json({
        id,
        name,
         
     })   
}
);
const getLoginStatus = asyncHandler ( async (req,res)=>{
     const token = req.cookies.token;
     if(!token){

        res.json(false);
        

     }

    const verified = await jwt.verify(token, process.env.JWT_SECRET_1);

     if(verified){
        res.json(true);
     }

     res.json(false);

})

const updateUser = asyncHandler ( async (req,res)=>{
    const user = await User.findById(req.user._id);

    if(user){
       const {id,name,email}=user;
       user.name=req.body.name || name;
  
       const updateUser = await user.save();

       res.json({
          name:updateUser.name
       })
    }else{
      
        res.status(400);
        throw new Error("User already Exist");
    }
   

})


const changePassword = asyncHandler ( async (req,res)=>{
 
    const user = await User.findById(req.user._id);
    if(!user){
        res.status(400);
        throw new Error("Invalid User");
    }
    const {oldPassword, password}= req.body;
    if(!oldPassword || !password){
        res.status(400);
        throw new Error("Invalid User");
    }
    const checkOldPassword= await bycrypt.compare(oldPassword, user.password);
     
    if(!checkOldPassword){
        res.status(400);
        throw new Error("Invalid User");

    }

    if(user && oldPassword){
          user.password = password;
          user.save();

          res.status(200).send("Password Updated Successfully");

    }else{
       
        res.status(400);
        throw new Error("Invalid User");
     
    }
    


 
})



const forgetPassword = asyncHandler ( async (req,res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("Invalid User");
    }
     let resetToken = crypto.randomBytes(32).toString("hex")+user._id;

     let hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

     const checkToken = await Token.findOne({userId:user._id});

     if(checkToken){
         await checkToken.deleteOne();
     }

     await new Token({
       userId: user._id,
       token:hashedToken,
       createdAt:new Date(),
       expiresdAt: new Date() + 30 * (60 * 1000)
 
     }).save();

     const resetUrl = `${process.env.FRONT_URL}/resetPasword/${resetToken}`;


     res.status(201).json({
        message:"Mail sent Successfully"
     });  
 
 
})  

const resetPassword =   asyncHandler ( async (req,res)=>{

    const {password} = req.body;

    const {token} = req.params;

    let hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const userToken = await Token.findOne({
        token:token,
        expiresdAt : {$gt : new Date.now()}
    });

    if(!userToken){
         res.status(200);
         throw new Error("Invalid Token"); 
    }

    const user = await User.findOne({_id:userToken.userId});
    user.password = password;
    user.save()

    res.status(200).json({message:"Success"})


})  

module.exports={
    registerUser,
    loginUser,
    logout,
    getUser,
    getLoginStatus,
    updateUser,
    changePassword,
    forgetPassword,
    resetPassword
}
