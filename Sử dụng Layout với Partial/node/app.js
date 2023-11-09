const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');


const route = require('./routes');

const app = express();

const cors = require('cors');
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

route(app)



app.listen(5000);
