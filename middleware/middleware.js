const jwt = require("jsonwebtoken");
const config = require("../config");

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
      name: 'TokenExpiredError',
      message: 'Token expired',
      expiredAt: 1408621000
    });
  }
};


exports.logMethod = (req, res, next) => {
    console.log(`[${req.socket.remoteAddress}] ${req.method} ${req.originalUrl} `);
    return next();
};
