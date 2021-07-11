const express = require('express');
const app = express.Router()
const { getProductList, getProductDetailById, addProduct,searchProduct } = require('./productController')

app.get('/get', getProductList)
app.get('/detail/:product_id', getProductDetailById)
app.post('/addProduct', addProduct)
app.get('/search',searchProduct)

module.exports = app;