const Product=require('../models/product')


exports.postProduct=(req,resp,next)=>{
  
    const title=req.body.title;

    const product= new Product(title);
    product.save();

    console.log( " hello :  ", req.body.title);
    resp.redirect('/');
    


}

exports.getAddProduct=(req,resp,next)=>{
    // resp.sendFile(path.join(__dirname,"../","views","add-products.html"))
    resp.render('add-products',{title:'Add Products'})
 
    //   resp.send('<html> <form action ="/admin/add-products" method="POST"><input type="text" name="title"><button type="submit"> Submit</button>  </form></html>')

}
exports.getProducts=(req,resp,next)=>{

    // resp.sendFile(path.join(__dirname,"../","views","shops.html"));

    //  now mvc 
    
    // const product= Product.fetchProducts();

    // resp.render('shops',{title:'Shop',Products:product})

    Product.fetchProducts((products)=>{
        resp.render('shops',{title:"Shops",Products:products})
    })

    // console.log("in other middleware ");

    

    // resp.send(" <h1> Hello from express </h1> ")
    
}

