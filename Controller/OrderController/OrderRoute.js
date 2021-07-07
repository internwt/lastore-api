const express = require('express');
const app = express.Router()
const { createOrder, orderList, orderDetailById, createPayment, checkoutSession } = require('./OrderController')

app.post('/create', createOrder)
app.get('/orderList', orderList)
app.get('/orderDetailById', orderDetailById)
app.post('/create-payment-intent', createPayment)
app.post('/checkout', checkoutSession)

module.exports = app;