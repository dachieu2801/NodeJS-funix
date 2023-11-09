
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Cart = new Schema({
  _id: ObjectId,
  title: String,
  imageUrl: String,
  description: String,
  price: String,
  quantity: Number,
});
module.exports = mongoose.model('Cart', Cart);