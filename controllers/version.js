const config = require('../config');

exports.get = async(req, res) => {
    console.log("Received request", req.query);
    return res
        .status(200)
        .send({
            version: config.version,
            name: req.query.name
        })
        .end();
}