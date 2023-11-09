const Cart = require('../models/Cart');

exports.getCart = (req, res, next) => {
  const cart = Cart.fetchAll();
  res.json(cart);
};

exports.postAddCart = (req, res, next) => {
  Cart.addCart(req.body.id, req.body.price, req.body.title)
  res.send('okeeee')
};

exports.deleteCart = (req, res, next) => {
  Cart.deleteCart(req.body.id,)
  res.send('okeeee')
};
