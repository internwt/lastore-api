const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const OrdersSchema = new Schema(
    {
        order_number: { type: String, require: true },
        order_status: { type: String, default: "pending" },
        payment_status: { type: String, default: "unpaid" },
        payment_intent: { type: String, required: true },
        payment_type: { type: String },
        sub_total: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        created: { type: Date, default: Date.now },
        user_id: { type: String, require: true },
        first_name: { type: String, require: true },
        last_name: { type: String, require: true },
        company: { type: String },
        address: { type: String, require: true },
        country: { type: String, require: true },
        state: { type: String, require: true },
        zip: { type: String, require: true }
    },
    {
        timestamps: true,
    }
);

module.exports = Orders = mongoose.model('orders', OrdersSchema);
