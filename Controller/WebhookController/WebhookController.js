const Order = require('../../model/order')
const stripe = require("stripe")("sk_test_51J9jekDoHVnUxfaGTUuLrL6KeNfzlN0tAbEtvZ6EWadxaAfUtVouXCy9QW7PqqJEALP5S1Jo35MQ5rBsUqHXHiSr00C6j5XsYr");
const endpointSecret = 'whsec_37mQTsrHQeDFfnkueCoxzwBLNN7i1Xyp'
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
            const orderQuery = await Order.updateOne({ payment_intent }, { payment_status })
            console.log(orderQuery)

        }
    }
}

module.exports = {
    webHookEvents
}