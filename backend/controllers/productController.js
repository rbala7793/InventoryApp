const asyncHandler = require("express-async-handler");
const Product =require("../models/productModel");
const { errorMonitor } = require("nodemailer/lib/xoauth2");

const createProduct = asyncHandler( async(req,res)=>{

    const { name, sku,category,quantity,price,description} = req.body;
if(!name || !sku || !category || !quantity || !price || !description){
    res.status(200);
    throw new Error("Please fill aLL fields");

    //
    
}
     

const product = await Product.create({
    userId:req.user.id,
    name, 
    sku,
    category,
    quantity,
    price,
    description

})

if(product){

    res.status(200).json({message:"", status:true})
    
}



})

module.exports = {
    createProduct,
}