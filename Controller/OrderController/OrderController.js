
const stripe = require("stripe")("sk_test_51J9jekDoHVnUxfaGTUuLrL6KeNfzlN0tAbEtvZ6EWadxaAfUtVouXCy9QW7PqqJEALP5S1Jo35MQ5rBsUqHXHiSr00C6j5XsYr");
const Order = require('../../model/order')
const { genrateUniqeId } = require('../../Utlis/common')




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
  return createOrder;
}

const orderList = async (req, res, next) => {
  const { user_id } = req.params
  try {
    const getData = await Order.find({ user_id })
    return res.status(200).json({
      isFound: true,
      data: getData,
      message: 'List found Successfully'
    })
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      isFound: false,
      message: 'Something went wrong,please try again',
      error: err
    })
  }
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
    success_url: `http://localhost:3000/OrderConfirmation`,
    cancel_url: 'http://localhost:3000/OrderConfirmation',
  });
  const newOrder = await createOrder({ ...req.body, payment_intent: session.payment_intent, sub_total })
  res.status(200).send({
    isError: false,
    data: { url: session.url, order_id: newOrder._id },
    statusCode: 201,
  })
}
module.exports = {
  createOrder,
  orderList,
  orderDetailById,
  createPayment,
  checkoutSession
}