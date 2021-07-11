const express = require('express');
const app = express.Router()
const { orderList, orderDetailById, createPayment, checkoutSession } = require('./OrderController')

app.get('/orderList/:user_id', orderList)
app.get('/orderDetailById', orderDetailById)
app.post('/create-payment-intent', createPayment)
app.post('/checkout', checkoutSession)

module.exports = app;