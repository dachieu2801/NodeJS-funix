const Product = require('../models/product')

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  const product = new Product({
    title, imageUrl, description, price
  }
  );
  await product.save();
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
};

exports.editProduct = async (req, res, next) => {
  const id = req.body._id
  const product = await Product.findById(id).exec();
  if (product) {
    product.title = req.body.title
    product.description = req.body.description
    product.price = req.body.price
    product.imageUrl = req.body.imageUrl
    await product.save();
  }
}

exports.getToEdit = async (req, res, next) => {
  const id = req.params._id
  const product = await Product.findById(id).exec();
  res.json(product);
}

exports.delete = async (req, res, next) => {
  try {
    const { _id } = req.body
    const product = await Product.findByIdAndRemove(_id)
    await save()
    res.status(200).json({ message: 'oke' });
  } catch (err) {
    next(err)
  }
}