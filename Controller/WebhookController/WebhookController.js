const Order = require('../../model/order')

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_END_POINT_SECRET
const webHookEvents = async (request, res) => {
    const sig = request.headers['stripe-signature'];
    let event;
    // Verify webhook signature and extract the event.
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    const { type, data } = event
    if (type === 'checkout.session.completed') {
        const { payment_status, payment_intent } = data.object;
        if (payment_status === 'paid') {
            await Order.updateOne({ payment_intent }, { payment_status })
        }
    }
}

module.exports = {
    webHookEvents
}