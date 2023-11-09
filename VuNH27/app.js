const express = require("express");
const app = express();
const connect = require("./src/connect/connect");
const session = require('express-session');
const routerUser = require("./src/routes/auth");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  cookie: { maxAge: 60000 }}));

//CONNECT
connect();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use("/auths/", routerUser);
app.listen(3000, () => console.log("Listening port 3000"));
module.exports = app;
