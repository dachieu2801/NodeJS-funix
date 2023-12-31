const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema({
  title: {
    type: String,
    required: true
  },
  idUser: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', Post);