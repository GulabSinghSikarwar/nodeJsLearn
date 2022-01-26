const path = require('path')
const fs = require('fs');
const { dirname } = require('path');
const { error } = require('console');


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
    static deleteProductFromCartWithId(id, price) {
        console.log("cart delete call");
        const p = path.join(path.dirname(process.mainModule.filename),
            'data',
            'cart.json')
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                // either file is blank
                console.log(err);

            } else {
                console.log(" price : ", price, " Id : ", id);
                let cart = {}
                let product = [];

                cart = {...JSON.parse(fileContent) }
                    // console.log("cart : ", cart);

                product = [...cart.products];
                // console.log(product);
                id = parseFloat(id)

                let prodIndex = product.findIndex((ele) => {
                    return ele.id === id
                })
                console.log("prodIndex : ", prodIndex);

                if (prodIndex === (-1)) {
                    console.log("Product is not in the cart");
                } else {
                    const exsistingProd = product[prodIndex];
                    console.log("exsisting product", exsistingProd);
                    const updatedProducts = product.filter((prod) => {
                        return prod.id !== id
                    })
                    const updatedTotalPrice = cart.totalPrice - price;
                    const UpdatedCart = {
                        products: updatedProducts,
                        totalPrice: updatedTotalPrice
                    }
                    console.log(" updated Cart ", UpdatedCart);
                    fs.writeFile(p, JSON.stringify(UpdatedCart), (error) => {
                        if (error) {
                            console.log(" Error while writing updated cart");
                        } else {
                            console.log(" Successfully  Product Deleted from cart");
                        }
                    })

                }







            }


        })





    }
}