const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

const cors = require('cors');
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(cartRoutes);

app.use(errorController.get404);

app.listen(5000);
