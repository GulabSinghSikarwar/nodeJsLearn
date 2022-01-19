const path=require('path');

const express = require('express');

const router=express.Router();

const productControllers=require('../controllers/products')

router.get( '/',productControllers.getProducts)

router.get('/products',(req,resp)=>{
    resp.render('shop/index.ejs', {title:"Index Products",Products:[{title:"Halo"}]})
})

module.exports=router