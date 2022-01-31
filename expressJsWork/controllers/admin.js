const mongodb = require("mongodb");
const res = require("express/lib/response");
const Product = require("../models/product");
exports.postProduct = (req, resp, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const discription = req.body.discription.trim();
    const id = null;
    // console.log('====================================');
    // console.log("inside posing prod  descrition : ", description);
    // console.log('====================================');

    // const product = new Product(title, price, imageUrl, description, null);
    // product.save();

    // console.log(" hello :  ", req.body.title, " price : ", price, " imageUrl : ", imageUrl, " description : ", description);

    const product = new Product(title, price, imageUrl, discription);
    product.save().then((result) => {
        console.log("SuccesFully added");
    });

    resp.redirect("/");
};

exports.getAddProduct = (req, resp, next) => {
    {
        /*
                 resp.sendFile(path.join(__dirname,"../","views","add-products.html"))
               resp.send('<html> <form action ="/admin/add-products" method="POST"><input type="text" name="title"><button type="submit"> Submit</button>  </form></html>')
    
                */
    }
    resp.render("admin/edit-product", { title: "Add Products", edit: false });
};
exports.getEditProducts = (req, resp, next) => {
    let edit = Boolean(req.query.edit);
    let prodId = req.params.productId;
    let prodId2 = parseFloat(prodId);

    Product.fetchProductById(prodId)
        .then((prod) => {
            console.log("Prod : ", prod);
            resp.render("admin/edit-product", {
                title: "edit Products ",
                product: prod,
                edit: edit,
            });
        })
        .catch((err) => {
            console.log("ERROR :: ", err);
        });

    // resp.render('admin/edit-product', { title: "Edit Product" })
};
exports.getAdminProducts = (req, resp, next) => {
    // resp.render('admin/products.ejs',{title:'Admin  Products'})

    Product.fetchAll().then((prods) => {
        const len = prods.length;

        resp.render("admin/products.ejs", {
            Products: prods,
            title: "Admin Products",
            len: len,
        });
    });
};
exports.PostEditProduct = (req, resp, next) => {
    const product = req.body;
    console.log("Post req", product);



    const prodId = req.body.id;

    const prod = {
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        discription: product.discription,
    }
    console.log("pid : ", prodId);
    Product.updateById(prodId, prod).then((updateResult) => {
        console.log("Update Result : ", updateResult);
        resp.redirect('/admin/products')
    }).catch((err) => {
        console.log(" Update  Error ");
    })


    // resp.redirect('/')
};
exports.delete_Product_Post_Request_Handeler = (req, resp, next) => {
    console.log("Delete Function Call ");
    const requestBody = req.body;
    console.log(" Delete req  : ", requestBody);
    let id = requestBody.id;

    // Product.deleteProductWithId(id, () => {
    //     // alert("delete operation performed ")

    // resp.redirect("/");
    // });

    Product.deleteProductById(id).then((output) => {
        console.log("Product Delete Call Output : ", output);
        resp.redirect("/");
    }).catch((err) => {
        console.log("Product Delete Call Error : ", err);

    })

};