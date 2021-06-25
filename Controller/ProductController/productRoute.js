const express = require('express');
const app = express.Router()
const { getProductList, getProductDetailById } = require('./productController')

app.get('/get', getProductList)
app.get('/detail/:id', getProductDetailById)

module.exports = app;