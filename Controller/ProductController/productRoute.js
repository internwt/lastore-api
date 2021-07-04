const express = require('express');
const app = express.Router()
const { getProductList, getProductDetailById, addProduct } = require('./productController')

app.get('/get', getProductList)
app.get('/detail/:product_id', getProductDetailById)
app.post('/addProduct', addProduct)

module.exports = app;