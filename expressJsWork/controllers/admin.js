const res = require('express/lib/response');
const Product = require('../models/product')
exports.postProduct = (req, resp, next) => {

    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description.trim();
    const id = null;
    // console.log('====================================');
    // console.log("inside posing prod  descrition : ", description);
    // console.log('====================================');




    const product = new Product(title, price, imageUrl, description, null);
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

    if (!edit) {

        resp.redirect('/')

    } else {

        Product.getProductFromId(prodId, (product) => {
            console.log("Product for form : ", product);
            const description = product.description;
            console.log(" description for form : ", description);



            console.log(" Prod inside get details :  ", product);
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
    const product = req.body;

    const id = product.id;
    const title = product.title;
    const price = product.price;
    const description = product.description;

    const imageUrl = product.imageUrl;

    const updatedProduct = new Product(title, price, imageUrl, description, id);
    updatedProduct.save();



    resp.redirect('/')

}
exports.delete_Product_Post_Request_Handeler = (req, resp, next) => {

    const requestBody = req.body;
    console.log(" Delete req  : ", requestBody);
    let id = requestBody.id;


    Product.deleteProductWithId(id, () => {
        // alert("delete operation performed ")


        resp.redirect('/')


    })


}