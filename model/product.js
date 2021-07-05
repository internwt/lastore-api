const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    image: { type: String, required: true },
    status: { type: String, required: false },
    quantity: { type: Number, required: true },
    rating: { type: Number, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Products', Product);