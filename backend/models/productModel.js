const mongoose =require("mongoose");


const tokenSchema = mongoose.Schema({
  userId:{
     type:mongoose.Schema.Types.ObjectId,
     required:true,
     ref: "User"
   },
   
   name:{
    type:String,
    required:[true,"Name Required"],
    trim:true
   },
   sku:{
    type:String,
    required:[true,"Name Required"],
    default:"SKU",
    trim:true

   },
   category:{
    type:String,
    required:true,
    trim:true
   },
   quantity:{
    type:String,
    required:true
   },
   price:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   image:{
    type:Object,
    default:{}
   },

},{
    timestamps:true
})

const Product =mongoose.model("Product",productSchema);
module.exports = Product;