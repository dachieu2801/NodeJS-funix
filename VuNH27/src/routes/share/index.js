var jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");

//FUNCTION CHECK TOKEN
function checkToken(req, res, next) {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, config.secret, (err, user) => {
      if (err) {
        return res.status(401).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticate");
  }
}
module.exports = checkToken;
