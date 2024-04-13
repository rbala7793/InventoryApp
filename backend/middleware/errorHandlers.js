const errorHandler = (err,req,res,next) =>{
    var statusCode= res.statusCode ? res.statusCode : 500

     res.status(statusCode);

     res.json({
        message:err.message,
        stack:process.env.ENV_MODE==="development" ? err.stack: null
     })

}

module.exports=errorHandler;