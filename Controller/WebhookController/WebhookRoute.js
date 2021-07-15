const express = require('express');
const app = express.Router()
const { webHookEvents } = require('./WebhookController')

app.post('/', webHookEvents)

module.exports = app;