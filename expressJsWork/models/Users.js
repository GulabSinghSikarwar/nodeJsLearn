const getDb = require("../utils/database").getDB;
const mongodb = require("mongodb");

module.exports = class Users {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }
    save() {
        const db = getDb();
        return db.collection("Users").insertOne(this);
    }
    static findById(id) {
        const db = getDb();
        id = new mongodb.ObjectId(id);
        return db.collection("Users").find({ _id: id }).next();
    }
    static findInitialUser() {
        const db = getDb();
        return db.collection("Users").find().toArray();
    }
    addToCart(product) {
        const db = getDb();

        if (this.cart) {
            let cartItems = [];
            cartItems = [...this.cart.items];
            console.log("cart items : ", cartItems);

            let exsistingProductIndex = cartItems.findIndex((currentObject) => {
                return currentObject._id.toString() === product._id.toString();
            });
            console.log("e ind : ", exsistingProductIndex);
            if (exsistingProductIndex >= 0) {
                // product exsist
                let updatedItems = [...cartItems];
                updatedItems[exsistingProductIndex].quantity =
                    cartItems[exsistingProductIndex].quantity + 1;

                return db
                    .collection("Users")
                    .updateOne({
                        _id: mongodb.ObjectId(this._id),
                    }, {
                        $set: {
                            cart: {
                                items: [...updatedItems],
                            },
                        },
                    })
                    .then((result) => {
                        console.log("cart Update Result : ", result);
                    })
                    .catch((err) => {
                        console.log("update cart error ::", err);
                    });
            } else {
                //  product not exsist
                let newProduct = {
                    _id: new mongodb.ObjectId(product._id),
                    quantity: 1,
                };
                let updatedCartItems = [...cartItems];
                console.log(" initial updated cart : ,", updatedCartItems);
                updatedCartItems.push(newProduct);
                console.log(" after updated cart items , ", updatedCartItems);

                return db
                    .collection("Users")
                    .updateOne({
                        _id: mongodb.ObjectId(this._id),
                    }, {
                        $set: {
                            cart: {
                                items: [...updatedCartItems],
                            },
                        },
                    })
                    .then((result) => {
                        console.log("cart Update Result : ", result);
                    })
                    .catch((err) => {
                        console.log("update cart error ::", err);
                    });
            }
        } else {
            return db
                .collection("Users")
                .updateOne({
                    _id: mongodb.ObjectId(this._id),
                }, {
                    $set: {
                        cart: {
                            items: [{
                                _id: new mongodb.ObjectId(product._id),
                                quantity: 1,
                            }, ],
                        },
                    },
                })
                .then((result) => {
                    console.log("cart Update Result : ", result);
                })
                .catch((err) => {
                    console.log("update cart error ::", err);
                });
        }
    }
    static fetchAllCartItems() {
        const db = getDb();
        return db
            .collection("Users")
            .find()
            .toArray()
            .then((allUsers) => {
                // const user = allUsers[0];
                return allUsers[0].cart.items;
            });
    }
    getCart() {
        const db = getDb();

        const prods = [];

        this.cart.items.forEach((element) => {
            prods.push(element._id);
        });
        return db
            .collection("products")
            .find({ _id: { $in: prods } })
            .toArray()
            .then((products) => {
                return products.map((prod) => {
                    return {
                        ...prod,
                        quantity: this.cart.items.find((p) => {
                            return p._id.toString() === prod._id.toString();
                        }).quantity,
                    };
                });
            })
            .catch();
    }
    deleteCartItem(prodid, userId) {
        const db = getDb();
        const newid = new mongodb.ObjectId(prodid);

        let updatedCartItems = this.cart.items.filter((prod) => {
            return prod._id.toString() !== newid.toString();
        });
        return db.collection("Users")
            .updateOne({ _id: new mongodb.ObjectId(userId) }, {
                $set: {
                    cart: { items: updatedCartItems },
                },
            })
            .then((result) => {
                console.log("delete result : ", result);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};