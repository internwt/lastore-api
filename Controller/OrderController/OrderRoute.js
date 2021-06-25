const express = require('express');
const app = express.Router()
const { createOrder, orderList, orderDetailById } = require('./OrderController')

app.post('/create', createOrder)
app.get('/orderList', orderList)
app.get('/orderDetailById', orderDetailById)

module.exports = app;