const { error } = require("console");
const Cart = require('./cart')


const fs = require("fs");
const { dirname } = require("path");
const path = require("path");

var product = [];

module.exports = class Product {
    constructor(title, price, imageUrl, description, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.id = id;
    }
    save() {

        //  if the current id is not  null i.e ( threre is some exsisiting id ) then only we will create the new product 
        if (this.id) {
            const p = path.join(path.dirname(process.mainModule.filename),
                'data',
                'products.json'
            )

            fs.readFile(p, (err, fileContent) => {
                let products = [];


                if (err) {
                    console.log(err);

                } else {
                    products = JSON.parse(fileContent)
                }
                const exsistingFileIndex = products.findIndex((element) => {
                    return this.id === element.id
                })
                products[exsistingFileIndex] = this;
                fs.writeFile(p, JSON.stringify(products), (writingError) => {
                    console.log("Error inside Writing file  for exsisting Product :: ", writingError);
                })


            })


        }
        //  product is  created for the first time  
        else {
            this.id = (Math.random() * 10000000000000000).toString();


            const p = path.join(
                path.dirname(process.mainModule.filename),
                "data",

                "products.json"
            );

            fs.readFile(p, (err, fileContent) => {
                // console.log(err);
                let products = [];

                if (!err) {
                    console.log(fileContent);
                    products = JSON.parse(fileContent);
                }

                products.push(this);

                fs.writeFile(p, JSON.stringify(products), (error) => {
                    console.log(error);
                });
            });
        }
    }
    static fetchProducts(cb) {
        let p = path.join(
            path.dirname(process.mainModule.filename),
            "data",
            "products.json"
        );
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });

        {
            /*
                             let p=path.join(path.dirname(process.mainModule.filename),'data','products.json')
                        fs.readFile(p,(err,data)=>{
                            if (err) {
                                cb([])
                            }
                         //    
                             else if (data.length===0) {
                                 console.log(data.length);
                             cb([])   
                            }
                 
                           else { cb(JSON.parse(data))}
                 
                        })
                         
                         return product;
                        */
        }
    }
    static getDetails(id, cb) {
        let products = [];

        const p = path.join(
            path.dirname(process.mainModule.filename),
            "data",
            "products.json"
        );
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return cb({});
            } else {
                products = JSON.parse(fileContent);
                let productDetails = products.find((element) => element.id === id);
                cb(productDetails);
            }
        });
    }
    static getProductFromId(id, cb) {
        let products = [];
        let p = path.join(path.dirname(process.mainModule.filename),
            "data",
            "products.json"
        )
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                products = [];


            } else {
                products = JSON.parse(fileContent);
                // console.log(" checking  all prod ", products);
                const required = products.find((ele) => {
                    return ele.id === id

                })

                cb(required)

            }

        })


    }
    static deleteProductWithId(id, cb) {
        const p = path.join(path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        )

        let products = [];

        fs.readFile(p, (error, fileContent) => {

            if (!error) {
                products = JSON.parse(fileContent);

            } else {
                console.log("Error while reading File and deleting it :: ", error);
            }
            let prod = products.find((element) => {
                return element.id === id

            });
            const price = prod.price;


            Cart.deleteProductFromCartWithId(id, price);


            const updatedProducts = products.filter((element) => {

                return element.id !== id
            })
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (err) {
                    console.log("Error while deleting  writing the products ,,which is result we get after  deleting  the element ::->", err);
                } else {
                    cb()

                }

            })
        })
    }
};