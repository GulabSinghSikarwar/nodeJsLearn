const path = require('path')
const fs = require('fs');
const { dirname } = require('path');


module.exports = class Cart {
    static addToCart(id, price, cb) {

        const p = path.join(__dirname, "../", "data", "cart.json");


        /*
        cartProduct= {
            id: productID,
            quantity : ,
            price:price
        }
        */

        fs.readFile(p, (error, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0


            }

            if (!error) {
                cart = JSON.parse(fileContent);

            }
            let cartProducts = [...cart.products];


            // let exsistingProductIndex = cart.products.findIndex((product) => {
            //     return product.id === id;
            // })

            let exsistingProductIndex = cartProducts.findIndex((product) => {
                return product.id === id;
            })
            let exsistingProduct = cart.products[exsistingProductIndex];

            // analyze the the products ;
            let updatedProduct;

            if (exsistingProduct) {
                updatedProduct = {...exsistingProduct };
                updatedProduct.quantity = updatedProduct.quantity + 1;

                // inserting the  updated product into the  cart products  
                cart.products = [...cart.products];
                cart.products[exsistingProductIndex] = updatedProduct;


            } else {
                updatedProduct = {
                    id: id,
                    quantity: 1
                }
                cart.products = [...cart.products, updatedProduct];

            }
            cart.totalPrice = cart.totalPrice + price;





            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully added ro cart");
                    cb()
                }

            })



        })

    }
}