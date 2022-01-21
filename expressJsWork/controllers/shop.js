const Product = require('../models/product')



exports.getProducts = (req, resp, next) => {

    { /*
     resp.sendFile(path.join(__dirname,"../","views","shops.html"));
     now mvc 
    
    const product= Product.fetchProducts();

    resp.render('shops',{title:'Shop',Products:product})
    
    */
    }
    Product.fetchProducts((products) => {
        resp.render('shop/product-list.ejs', { title: "Shops", Products: products })
    })

    {/*
    console.log("in other middleware ");
    resp.send(" <h1> Hello from express </h1> ")
 */ }


}
exports.getIndexProducts=(req,resp)=>{
  
    Product.fetchProducts((products) => {
        resp.render('shop/index.ejs',{title:"Index Products",Products:products})



})

}
exports.getCart=(req,resp,next)=>{
    resp.render('shop/cart.ejs',{title:"Cart  "})

}

