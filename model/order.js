const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const OrdersSchema = new Schema(
    {
        order_Id: { type: String },
        order_number: { type: String, require: true },
        order_status: { type: String, default: "pending" },
        payment_type: { type: String },
        sub_total: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        created: { type: Date, default: Date.now },
        user_id: { type: String, require: true }
    },
    {
        timestamps: true,
    }
);

module.exports = Orders = mongoose.model('orders', OrdersSchema);
