const path = require('path');

const express = require('express');

const router = express.Router();

const shopControllers = require('../controllers/shop');

const adminControllers = require('../controllers/admin')






//for index products page  

{
    /*
    router.get('/products',(req,resp)=>{
    resp.render('shop/index.ejs', {title:"Index Products",Products:[{title:"Halo"}]})
})
    */
}
// router.get('/products',productControllers.getIndexProducts)

//  for Cart page 
{
    /*
    router.get('/cart',(req,resp,next)=>{
    resp.render('shop/cart.ejs',{title:'Cart'})
})
    */
}

router.get('/products/:productId', shopControllers.getProductDetails)
router.get('/products', shopControllers.getProducts)
router.get('/cart', shopControllers.getCart)
router.get('/cart', shopControllers.getCart)


router.get('/', shopControllers.getIndexProducts)


module.exports = router