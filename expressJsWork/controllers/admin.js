const Product = require('../models/product')
exports.postProduct = (req, resp, next) => {

    const title = req.body.title;
    const price=req.body.price;
    const imageUrl=req.body.imageUrl;
    const description=req.body.description;
    const id=Math.random().toString(); 



    const product = new Product(title,price,imageUrl,description ,id);
    product.save();

    console.log(" hello :  ", req.body.title, " price : ",price, " imageUrl : ",imageUrl ," description : ",description);

    resp.redirect('/');


    
}

exports.getAddProduct = (req, resp, next) => {
    {
        /*
         resp.sendFile(path.join(__dirname,"../","views","add-products.html"))
       resp.send('<html> <form action ="/admin/add-products" method="POST"><input type="text" name="title"><button type="submit"> Submit</button>  </form></html>')
    
        */
    }
    resp.render('admin/add-products', { title: 'Add Products' })

}
exports.getAdminProducts=(req,resp,next)=>{

    // resp.render('admin/products.ejs',{title:'Admin  Products'})

    Product.fetchProducts((products) => {
        resp.render('admin/products.ejs',{title:"Admin Products",Products:products})


})
}