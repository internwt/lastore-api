const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const path = require("path");
app.use(cors())
app.use(express.urlencoded({ extended: true }));
const connectDB = require('./config/db');
const port = process.env.PORT || 3001;
connectDB();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const WebHook = require('./Controller/WebhookController/WebhookRoute')
app.use('/api/webhook', express.raw({ type: "*/*" }), WebHook)

app.use(express.json())
// import all controllers
const Users = require('./Controller/UserController/userRoute')
const Product = require('./Controller/ProductController/productRoute')
const Order = require('./Controller/OrderController/OrderRoute')

app.use('/api/users', Users)
app.use('/api/products', Product)
app.use('/api/orders', Order)


module.exports = app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});