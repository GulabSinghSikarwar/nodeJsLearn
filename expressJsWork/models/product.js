const { error } = require("console");

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
};