const path = require('path');
const express=require('express')
const router =express.Router();
const  productController=require('../controllers/products')

//   /admin/add-products => GET request 


router.get('/add-products',productController.getAddProduct

);


// /admin/add-products ==>POST request 


router.post('/add-products',productController.postProduct)
module.exports=router;
