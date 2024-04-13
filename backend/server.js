const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute= require("./routes/userRoute");
const errorHandler =require("./middleware/errorHandlers")
const cookieParser = require("cookie-parser");




const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
  origin:["http://localhost:3000"],
  credentials:true
}))

//Routes Middleware
app.use("/api/users", userRoute);

//Error Middleware
app.use(errorHandler)

//Routes
app.get("/",(req,res)=>{
   res.send("Home Page");
})



const port = process.env.PORT || 5000; // Change port to 5000 or another available port

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error(error));