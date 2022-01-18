const path = require('path');

const http = require('http');

const express = require('express');

const PageNotFound = require('./controllers/404Page')

const app = express();


app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, "public")))

const bodyParser = require('body-parser')

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/admin', adminRouter);

app.use(shopRouter)

app.use(PageNotFound.pageNotFound)


const server = http.createServer(app);
server.listen(3000)

