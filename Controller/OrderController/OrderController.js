
const stripe = require("stripe")("sk_test_51J9jekDoHVnUxfaGTUuLrL6KeNfzlN0tAbEtvZ6EWadxaAfUtVouXCy9QW7PqqJEALP5S1Jo35MQ5rBsUqHXHiSr00C6j5XsYr");


const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};



const createPayment = async (req, res) => {
    const { items, total: amount } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd"
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
}

const createOrder = async (req, res, next) => {

}

const orderList = async (req, res, next) => {
    console.log(`order`)
}

const orderDetailById = async (req, res, next) => {

}
module.exports = {
    createOrder,
    orderList,
    orderDetailById,
    createPayment
}