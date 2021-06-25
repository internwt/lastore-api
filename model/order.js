const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const OrdersSchema = new Schema(
    {
        order_Id: { type: String },
        order_number: { type: String, require: true },
        order_status: { type: String, require: true },
        dealer_email: { type: String },
        payment_type: { type: String },
        sub_total: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        ship_company: { type: String },
        ship_first_name: { type: String },
        tracking_number: { type: String },
        shipped_date: { type: Date, overwrite: true },
        created: { type: Date, default: Date.now },
        createdBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],
        ship_store_lat: { type: String },
        ship_store_lng: { type: String },
        carrier_code: { type: String },
        items: [],
    },
    {
        timestamps: true,
    }
);

module.exports = Orders = mongoose.model('orders', OrdersSchema);
