const Product = require('../models/product');

exports.putEdit = (req, res, next) => {
  Product.edit(
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price,
    req.body.id,
  );
};








