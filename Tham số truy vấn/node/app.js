const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

const cors = require('cors');
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const route = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

route(app)

app.use(errorController.get404);

app.listen(5000);
