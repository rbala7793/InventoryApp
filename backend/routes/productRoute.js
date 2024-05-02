const express =require("express");
const { createProduct } = require("../controllers/productController");
const router =express.Router();
const protect = require("../middleware/authMiddleware"); 

router.post("createProduct", prodect, createProduct);


module.exports =router;