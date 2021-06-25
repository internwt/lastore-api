const express = require('express');
const app = express.Router()
const { signUp, login } = require('./userValidation')
const { registerUser, loginUser, resetPassword } = require('./userController')


app.post('/register', signUp, registerUser)
app.post('/login', login, loginUser)

app.post('/resetPassword', resetPassword)

module.exports = app;