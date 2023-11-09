
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Order = new Schema({
  products: Array,
  user: {
    name: { type: String, required: true },
    userId: { type: ObjectId, requided: true, ref: 'User' }
  }
});

module.exports = mongoose.model('Order', Order);