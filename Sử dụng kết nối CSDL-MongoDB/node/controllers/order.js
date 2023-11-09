const Order = require('../models/order')
const User = require('../models/user')
const Cart = require('../models/cart')

exports.postOrder = async (req, res, next) => {

  const products = req.body.products

  const user = await User.findById(req.body.userId);

  const orders = await Order.find({ 'user.userId': req.body.userId });
  if (orders.length > 0) {
    const order = await Order.findById(orders[0]._id);
    order.products = [...order.products, ...products]
    await order.save();
  } else {
    const order = new Order({
      products,
      user: {
        name: user.name,
        userId: user._id
      }
    })
    await order.save();
  }

  await Cart.deleteMany({})
};

exports.getOrder = async (req, res, next) => {
  const yourOrders = await Order.find({ 'user.userId': req.body.userId });
  res.json(yourOrders);
};
