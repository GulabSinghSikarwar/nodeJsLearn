const path=require('path');

const http = require('http');

const express = require('express');
const app =express();

app.set('views','views')
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,"public")))

const bodyParser=require('body-parser')

const adminRouter=require('./routes/admin')
const shopRouter=require('./routes/shop')

app.use(bodyParser.urlencoded({extended:true}))

app.use('/admin',adminRouter);
app.use(shopRouter)

app.use((req,resp,next)=>{
//    resp.status(404).sendFile(path.join(__dirname,"views","pageNotFound.html"))
    // resp.status(404).send("<h1> Page not Found </h1>")
    resp.status(404).render('pageNotFound',{title:"Page Not Found "})

})
 const server = http .createServer(app);
server.listen(3000)

