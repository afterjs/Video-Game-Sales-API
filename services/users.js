const db = require("../database");
const bcrypt = require("bcryptjs");
const Users = require("../models/users");

exports.canAuth = async ({ email, password }) => {
  if (!email || !password) {
    return false;
  }
  
  return await Users.findOne({ where: { email: email } })
    .then((res) => {
      if (res === null) {
        return false;
      } else {
        return bcrypt.compare(password, res.password).then((result) => {
          if (result) {
            return true;
          } else {
            return false;
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

    
};
