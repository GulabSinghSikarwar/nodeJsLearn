const path=require('path');

const express = require('express');

const router=express.Router();

const productControllers=require('../controllers/products')





router.get( '/',productControllers.getProducts)


//for index products page  

{
    /*
    router.get('/products',(req,resp)=>{
    resp.render('shop/index.ejs', {title:"Index Products",Products:[{title:"Halo"}]})
})
    */
}
router.get('/products',productControllers.getIndexProducts)

//  for Cart page 
{
    /*
    router.get('/cart',(req,resp,next)=>{
    resp.render('shop/cart.ejs',{title:'Cart'})
})
    */
}
router.get('/cart',productControllers.getCart)

module.exports=router