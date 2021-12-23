const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, "chaveUltraSecreta");
    req.userData = decoded;
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  checkAuth,
};
