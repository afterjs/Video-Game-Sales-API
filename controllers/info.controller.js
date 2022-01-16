const config = require('../config/config');

let getVersion = (req, res) => {
    return res.status(200).json({
        message: "Welcome to the Game Store API",
        version: config.version
    });
};

module.exports = {
  getVersion,
};
