const res = require('express/lib/response');
const Product = require('../models/product')
exports.postProduct = (req, resp, next) => {

    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const id = (Math.random() * 10000000000000000).toString();



    const product = new Product(title, price, imageUrl, description, id);
    product.save();

    console.log(" hello :  ", req.body.title, " price : ", price, " imageUrl : ", imageUrl, " description : ", description);

    resp.redirect('/');



}

exports.getAddProduct = (req, resp, next) => {
    {
        /*
         resp.sendFile(path.join(__dirname,"../","views","add-products.html"))
       resp.send('<html> <form action ="/admin/add-products" method="POST"><input type="text" name="title"><button type="submit"> Submit</button>  </form></html>')
    
        */
    }
    resp.render('admin/edit-product', { title: 'Add Products', edit: false })

}
exports.getEditProducts = (req, resp, next) => {
    let edit = Boolean(req.query.edit);
    let prodId = (req.params.productId);
    let prodId2 = parseFloat(prodId)
        // console.log(" prodId 1 : ", typeof(prodId), " prodId 2 : ", typeof(prodId2));

    // console.log(" Edit Query : ", edit);
    // console.log(" Product ID  : ", prodId);
    if (!edit) {
        resp.redirect('/')

    } else {
        // find product with reference id and  show the details of the product 

        Product.getProductFromId(prodId, (product) => {
            // const len = Object.keys(details).length;
            // console.log("inside control Prod : ", product);
            resp.render('admin/edit-product', { title: 'edit Products ', product: product, edit: edit })


        })
    }


    // resp.render('admin/edit-product', { title: "Edit Product" })

}
exports.getAdminProducts = (req, resp, next) => {

    // resp.render('admin/products.ejs',{title:'Admin  Products'})

    Product.fetchProducts((products) => {
        resp.render('admin/products.ejs', { title: "Admin Products", Products: products })


    })
}
exports.PostEditProduct = (req, resp, next) => {
    console.log("Post Edit Product", req.body);
    resp.redirect('/')

}