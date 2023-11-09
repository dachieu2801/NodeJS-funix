const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/FUNiX');
    console.log('success');

  } catch (err) {
    console.log('connect  failure');

  }
}
module.exports = { main }
