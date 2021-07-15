const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    comment: { type: String, required: false },
    status: { type: Number, enum: [1, 0], default: 1 },
    rating: { type: Number, required: false }
}, { timestamps: true });

module.exports = mongoose.model('rating', Product);