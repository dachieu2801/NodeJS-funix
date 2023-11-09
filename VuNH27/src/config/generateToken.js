var jwt = require("jsonwebtoken");
const config = require("./auth.config");
function generateTokenAccess(id, role, username) {
  return jwt.sign({ id: id, role: role, username: username }, config.secret, {
    expiresIn: 20000000,
  });
}
function generateTokehRefresh(id, role, username) {
  return jwt.sign(
    { id: id, role: role, username, username },
    config.refreshTokenSecret,
    {
      expiresIn: 30000000,
    }
  );
}
const generateToken = {
  generateTokenAccess: generateTokenAccess,
  generateTokehRefresh: generateTokehRefresh,
};
module.exports = generateToken;
