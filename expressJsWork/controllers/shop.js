const Product = require('../models/product')



exports.getProducts = (req, resp, next) => {

    {
        /*
            resp.sendFile(path.join(__dirname,"../","views","shops.html"));
            now mvc 
           
           const product= Product.fetchProducts();

           resp.render('shops',{title:'Shop',Products:product})
           
           */
    }
    Product.fetchProducts((products) => {
        resp.render('shop/product-list.ejs', { title: "Shops", Products: products })
    })

    {
        /*
            console.log("in other middleware ");
            resp.send(" <h1> Hello from express </h1> ")
         */
    }


}
exports.getIndexProducts = (req, resp) => {

    Product.fetchProducts((products) => {
        resp.render('shop/index.ejs', { title: "Index Products", Products: products })



    })

}
exports.getCart = (req, resp, next) => {
    resp.render('shop/cart.ejs', { title: "Cart  " })

}
exports.getProductDetails = (req, resp, next) => {
    const id = req.params.productId;

    console.log(id);
    Product.getDetails(id, (productDetails) => {
        const details = productDetails;
        console.log(" Getting details in controller ", details);
        const len = Object.keys(details).length;

        if (len > 0) {
            resp.render('shop/product-details.ejs', {
                title: details.title,
                price: details.price,
                description: details.description,
                id: details.id,
                len: len,
                imageUrl: details.imageUrl

            })
        } else {
            resp.render('shop/product-details.ejs', {
                len: len
            })
        }


    })
}