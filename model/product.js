const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    main_image: { type: String, required: true },
    gallery_images: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('products', Product);