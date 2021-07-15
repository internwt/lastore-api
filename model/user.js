const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: {
        type: String,
        required: false,
    },
    reset_active: { type: Boolean, default: false },
    expiration_time: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Users', Users);