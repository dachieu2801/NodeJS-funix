const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const errorController = require('./controllers/error');
const User = require('./models/user');
const multer = require('multer')

const app = express();



const store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/16',
  collection: 'sessions'
});

const imagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
// function fileFilter(req, file, cb) {
//   if (file.mimetype === 'imageUrl/png' || file.mimetype === 'imageUrl/jpg' || file.mimetype === 'imageUrl/jpeg') {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// }
const upload = multer({ storage: imagesStorage })

app.use(flash());
const db = require('./config/db');
db.main();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.single('image'));

//docj path ảnh 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true
    },
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

app.listen(5000);
