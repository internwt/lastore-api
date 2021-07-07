const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
const connectDB = require('./config/db');
connectDB();

const WebHook = require('./Controller/WebHookController/WebhookRoute')
app.use('/api/webhook', express.raw({ type: "*/*" }), WebHook)

app.use(express.json())
// import all controllers
const Users = require('./Controller/UserController/userRoute')
const Product = require('./Controller/ProductController/productRoute')
const Order = require('./Controller/OrderController/OrderRoute')

app.use('/api/users', Users)
app.use('/api/products', Product)
app.use('/api/orders', Order)


app.listen(3001, () => console.log('Example app listening on port 3001!'))