const bcrypt = require("bcryptjs");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const config = require("../config");

function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: "Please provide email and password",
    });
  }

  Users.findOne({ where: { email: email } })
    .then((userResult) => {
      if (userResult === null) {
        res.status(401).json({
          message: "Email ou password not found",
        });
      } else {
        bcrypt.compare(password, userResult.password).then((val) => {
          if (val) {
            const acessToken = jwt.sign(
              {
                email: email,
                userId: userResult.id,
              },
              config.jwtkey,
              { expiresIn: "7d" }
            );

            res.status(201).json({
              message: "Auhterization success",
              acessToken: acessToken,
              info: userResult,
            });
          } else {
            res.status(401).json({
              message: "Email ou password not found",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
}

let teste = (req, res) => {
  res.status(200).json({
    message: "zau",
  });
};

module.exports = {
  login,
  teste,
};
