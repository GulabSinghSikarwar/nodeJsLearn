const Product = require('../models/product')
exports.postProduct = (req, resp, next) => {

    const title = req.body.title;

    const product = new Product(title);
    product.save();

    console.log(" hello :  ", req.body.title);
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