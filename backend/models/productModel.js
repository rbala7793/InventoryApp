const mongoose =require("mongoose");


const tokenSchema = mongoose.Schema({
  userId:{
     type:mongoose.Schema.Types.ObjectId,
     required:true,
     ref: "User"
   },
   
   name:{
    type:String,
    required:[true,""],
    trim:true
   },
   token:{
    type:String,
    required:true
   },token:{
    type:String,
    required:true
   },token:{
    type:String,
    required:true
   },

})

const Token =mongoose.model("Token",tokenSchema);
module.exports = Token;