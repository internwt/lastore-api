const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const connectDB = require('./config/db');
connectDB();

// import all controllers
const Users = require('./Controller/UserController/userRoute')
const Product = require('./Controller/ProductController/productRoute')
const Order = require('./Controller/OrderController/OrderRoute')

app.use('/api/users', Users)
app.use('/api/products', Product)
app.use('/api/orders', Order)

app.listen(3001, () => console.log('Example app listening on port 3001!'))