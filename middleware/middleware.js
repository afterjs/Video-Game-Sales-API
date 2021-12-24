const jwt = require("jsonwebtoken");
const User = require("../models/users");
const config = require("../config/config");

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, config.jwtkey, (err, decoded) => {
      if (err) throw new Error(err); // Manage different errors here (Expired, untrusted...)
      req.auth = decoded; // If no error, token info is returned in 'decoded'
      next();
    });
  } catch (e) {
    return res.status(401).json({
      name: "Token Expired Error",
      message: "Token expired",
      expiredAt: 1408621000,
    });
  }
};

exports.logMethod = (req, res, next) => {
  console.log(`[${req.socket.remoteAddress}] ${req.method} ${req.originalUrl} `);
  return next();
};

exports.isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, config.jwtkey, (err, decoded) => {
      if (err) throw new Error(err); // Manage different errors here (Expired, untrusted...)
      const userId = decoded.id;

      User.findByPk(userId)
        .then((result) => {
          if (result) {
            if (result.roleid === "549f2410-6c94-47b2-90a9-c157f632a73a") {
              next();
            } else {
              return res.status(401).json({
                name: "Unauthorized Error",
                message: "Unauthorized",
              });
            }
          } else {
            return res.status(401).json({
              name: "Unauthorized Error",
              message: "Unauthorized",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    });
  } catch (e) {
    return res.status(401).json({
      name: "TokenExpiredError",
      message: "Token expired",
      expiredAt: 1408621000,
    });
  }
};
