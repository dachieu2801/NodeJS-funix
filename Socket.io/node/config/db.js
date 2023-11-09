const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const URI = 'mongodb://127.0.0.1:27017/21'

async function main() {
  try {
    await mongoose.connect(URI);
    console.log('success');

  } catch (err) {
    console.log('connect  failure');
  }
}

const store = new MongoDBStore({
  uri: URI,
  collection: 'sessions'
});
// tao sessio
const sessionsUser = (
  session({
    secret: 'my secret',
    resave: true,
    saveUninitialized: true,
    store: store
  })
);

module.exports = { main, sessionsUser }

