const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );
  product.save();
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.json(products);
};
