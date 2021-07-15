const express = require('express');
const app = express.Router()
const { signUp, login } = require('./userValidation')
const { registerUser, loginUser, resetPassword,forgotPassword ,newsLetterSubscription} = require('./userController')


app.post('/register', signUp, registerUser)
app.post('/login', login, loginUser)

app.post('/resetPassword', resetPassword)
app.post('/forgotPassword',forgotPassword)
app.post('/newslettersubscription',newsLetterSubscription)

module.exports = app;