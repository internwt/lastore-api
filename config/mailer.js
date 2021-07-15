"use strict";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    //service: 'SendGrid',
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user:  process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
        // "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"
    }, tls: {
        rejectUnauthorized: false
    }
});

transporter.verify(function (error, success) {
    console.log("hey");
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

module.exports.transporter = transporter;