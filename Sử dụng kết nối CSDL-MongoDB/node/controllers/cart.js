const Cart = require('../models/cart');

exports.postAddCart = async (req, res, next) => {

  const _id = req.body._id
  const isExist = await Cart.findById({ _id })

  if (isExist) {
    isExist.quantity++
    await isExist.save();
  } else {
    const cart = new Cart(req.body)
    cart.quantity = 1
    await cart.save();
  }
}

exports.getCart = async (req, res, next) => {
  const cart = await Cart.find({})

  let totalPrice = 0

  cart.forEach(a => {
    totalPrice += a.price * a.quantity
  })

  res.json({
    products: cart,
    totalPrice
  })
}

exports.deleteCart = async (req, res) => {
  const id = req.body._id
  await Cart.findByIdAndDelete(id)
}