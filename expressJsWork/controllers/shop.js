const mongodb = require("mongodb");
const Product = require("../models/product");
const Users = require('../models/Users')
    // const Cart = require("../models/cart.js");

exports.getProducts = (req, resp, next) => {
    {
        /*
                            resp.sendFile(path.join(__dirname,"../","views","shops.html"));
                            now mvc 
                           
                           const product= Product.fetchProducts();

                           resp.render('shops',{title:'Shop',Products:product})
                           
                           */
    }
    Product.fetchAll()
        .then((prods) => {
            resp.render("shop/product-list.ejs", {
                Products: prods,
                title: "Product -List ",
            });
        })
        .catch((err) => {
            console.log("err: ", err);
        });

    {
        /*
                            console.log("in other middleware ");
                            resp.send(" <h1> Hello from express </h1> ")
                         */
    }
};

exports.getIndexProducts = (req, resp) => {
    console.log(" Inside index ");
    Product.fetchAll()
        .then((prods) => {
            console.log(" Fetch All Products  in index routes Result : ", prods);
            resp.render("shop/index.ejs", {
                title: "Index Products",
                Products: prods,
            });
        })
        .catch((err) => {
            console.log("Error : ", err);
        });
};

exports.getProductDetails = (req, resp, next) => {
    const id = req.params.productId;

    Product.fetchProductById(id).then((prod) => {
        var len = Object.keys(prod).length;
        console.log(" len : ", len);

        resp.render("shop/product-details.ejs", {
            title: prod.title,
            price: prod.price,
            description: prod.description,
            id: prod.id,
            len: len,
            imageUrl: prod.imageUrl,
        });
    });
};

exports.postCart = (req, resp, next) => {
    let id = req.body.id;
    console.log(" add to cart  post req body  : ", req.body);
    console.log(" req body :  :-> ", req.body);

    id = new mongodb.ObjectId(id)
    Product.fetchProductById(id)
        .then((product) => {

            req.user.addToCart(product)
                .then((result) => {
                    console.log("Final result of cart update : ", result);
                    resp.redirect('/cart');

                })
                .catch((err) => {
                    console.log("Final Error of cart update : ", err);
                });



        })
        .catch((err) => {
            console.log("Error in finding product  ///for cart ", err);
        });
};

exports.getCart = (req, resp, next) => {
    Users.fetchAllCartItems().then((cartItems) => {

        cartItems.forEach(element => {
            console.log(" element : ", element);


        });
        resp.render("shop/cart.ejs", {
            title: "Cart  ",

            products: cartItems,
        });



    }).catch((err) => {
        console.log("inside controller : fetching all cart items err :: ", err);

    })

    // Cart.getProductInCart((products, totalPrice) => {

    //     }

    // })
    // Cart.getProductInCart((products, totalPrice) => {
    //     console.log("Cart products : ", products);

    //     Product.getProductFromIdForCart(
    //         products,
    //         totalPrice,
    //         (CartProducts, totalPrice) => {
    //             // console.log(" cart Products in details : ", cartProd);
    //             resp.render("shop/cart.ejs", {
    //                 title: "Cart  ",
    //                 CartProducts: CartProducts,
    //                 totalPrice: totalPrice,
    //                 products: products,
    //             });
    //         }
    //     );
    // });
};