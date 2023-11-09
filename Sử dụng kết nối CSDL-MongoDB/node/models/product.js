// const products = [];
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    title: String,
    imageUrl: String,
    description: String,
    price: String,
});
module.exports = mongoose.model('Product', Product);