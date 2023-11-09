const Cart = require('../models/Cart');

exports.postAddCart = (req, res, next) => {
  Cart.addCart(req.body.id, req.body.price, req.body.title)
  res.send('okeeee')
};

exports.getCart = (req, res, next) => {
  const cart = Cart.fetchAll();
  res.json(cart);
};
