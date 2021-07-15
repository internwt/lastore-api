const express = require('express');
const app = express.Router()
const { getProductList, getProductDetailById, addProduct, searchProduct, addProductRating, productRatingByUserId } = require('./productController')

app.get('/get', getProductList)
app.get('/detail/:product_id', getProductDetailById)
app.post('/addProduct', addProduct)
app.get('/search', searchProduct)
app.post('/addRating', addProductRating)
app.get('/getRating/:user_id', productRatingByUserId)


module.exports = app;