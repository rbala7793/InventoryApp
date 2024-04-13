const bycrypt = require("bcryptjs");
const mongoose =require("mongoose");
const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Add a name"]
    },
    email:{
        type:String,
        required:[true,"Please Add a name"],
        unique:true,
        trim:true,
        match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ,"Please Enter valid Email"]
       
    },
    password:{
        type:String,
        required:[true,"Please Add a password"],
        minLength:[6,"Password must b upto 6 Characters"],
       // maxLenght :[23,"Password must not be more than 23 characters"]
    },
    photo:{
        type:String,  
        required:[true,"Please Add a photo"],
        default:"https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png"
    },
    phone:{
        type:String, 
        default:"+91"
    }
    ,
    bio:{
        type:String, 
        default:"",
        maxLenght :[250, "Must not be more than 250 characters"]
 
    }

},{
    timestamps:true
}
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bycrypt.genSalt(10);
        console.log(salt);
        console.log(this.password);
        const hashPassword = await bycrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const User =mongoose.model("User",userSchema);
module.exports = User;