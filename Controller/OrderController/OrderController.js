
const stripe = require("stripe")("sk_test_51J9jekDoHVnUxfaGTUuLrL6KeNfzlN0tAbEtvZ6EWadxaAfUtVouXCy9QW7PqqJEALP5S1Jo35MQ5rBsUqHXHiSr00C6j5XsYr");
const Order = require('../../model/order')
const { genrateUniqeId } = require('../../Utlis/common')

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

const createOrder = async (orderDetails) => {
  const { first_name, last_name, company, address, country, city, state, zip, sub_total, payment_intent } = orderDetails;
  const order_number = genrateUniqeId('order_')
  const newOrder = new Order({ first_name, last_name, company, address, country, city, state, zip, payment_intent, sub_total, order_Id: "ufiuwe", order_number, user_id: 1 })
  const createOrder = await newOrder.save()
}

const orderList = async (req, res, next) => {
}

const orderDetailById = async (req, res, next) => {

}
const checkoutSession = async (req, res) => {
  const { cartItem } = req.body
  let line_items = []
  let sub_total = 0
  for (let item of cartItem) {
    line_items.push(
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }
    )
    sub_total += item.price
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `http://localhost:3000/checkout`,
    cancel_url: 'http://localhost:3000/checkout',
  });
  console.log(`sessciot`, session)
  const newOrder = createOrder({ ...req.body, payment_intent: session.payment_intent, sub_total })
  res.send(session.url)
}
module.exports = {
  createOrder,
  orderList,
  orderDetailById,
  createPayment,
  checkoutSession
}