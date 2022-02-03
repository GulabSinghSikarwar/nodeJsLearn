const path = require("path");

const http = require("http");
const mongodb = require("mongodb");
const MongoConnect = require("./utils/database").MongoConnect;

const express = require("express");

const PageNotFound = require("./controllers/404Page");

const app = express();
const sequelize = require("./utils/database");
const Users = require("./models/Users");

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require("body-parser");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/Auth");
const session = require("express-session");
const mongodbStore = require('connect-mongodb-session')(session);

const URI = 'mongodb://127.0.0.1:27017/sessions';

const store = new mongodbStore({
    uri: URI,
    collection: 'sessions',


})

app.use(
    session({
        secret: "my session ",
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, resp, next) => {
    // req.user
    const id = "61f7ba82b169145d6a11b84d";

    Users.findById(id)
        .then((user) => {
            // console.log(" User with given Id : ", user);

            // req.user = user;
            let ourUser = new Users(user.username, user.email, user.cart, user._id);

            req.user = ourUser;
            console.log("our user ", ourUser);

            console.log(" new  Object req.user for ID  : ", req.user);
            next();
        })
        .catch((err) => {
            console.log(" finding single User  Error : ", err);
        });
});

app.use("/admin", adminRouter);

// for main home page
app.use(shopRouter);
// for index page

{
    /*
    app.use('/products',(req,resp)=>{
    // resp.sendFile(path.join(__dirname,))
    resp.render('shop/index.ejs',{title:' Products or Index', Products:[{title:'hello'}]})
})
    */
}

// for cart Page

{
    /*
app.use('/cart',(req,resp,next)=>{
    resp.render('shop/cart.ejs',{title:"Cart"})
})
    */
}

app.use(authRouter);

// for page Not
app.use(PageNotFound.pageNotFound);

MongoConnect(() => {
    Users.findInitialUser()
        .then((users) => {
            if (users.length > 0) {} else {
                const firstUser = new Users("Gulab", "test@test.com", null, null);
                firstUser.save();
            }
        })
        .catch((err) => {
            console.log("Intial user Checking error : ", err);
        });

    app.listen("3000");
});
// app.listen(3000)