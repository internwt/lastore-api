const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newslettersubscription = new Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('newslettersubscription', newslettersubscription);