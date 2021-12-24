const bcrypt = require("bcryptjs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Validator = require("fastest-validator");
const v = new Validator();

let login = (req, res, next) => {
  let { email, password } = req.body;

  email = email.trim();
  password = password.trim();

  const userSchema = {
    email: email,
    password: password,
  };

  const schema = {
    email: { type: "email" },
    password: { type: "string", min: 3, max: 255 },
  };

  const vResponse = v.validate(userSchema, schema);

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }

  User.findOne({ where: { email: email } })
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
                id: userResult.id,
              },
              config.jwtkey,
              { expiresIn: "1d" }
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
};

const insertUser = (req, res, next) => {
  let { name, email, password, roleid } = req.body;

  const userSchema = {
    name: name,
    email: email,
    password: password,
    roleid: roleid,
  };

  const schema = {
    name: { type: "string", min: 3, max: 255 },
    email: { type: "email" },
    password: { type: "string", min: 3, max: 255 },
    roleid: { type: "uuid" },
  };

  const vResponse = v.validate(userSchema, schema);

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }

  name = name.trim();
  email = email.trim();
  password = password.trim();
  roleid = roleid.trim();

  User.findOne({ where: { email: email } })
    .then((result) => {
      if (result) {
        res.status(400).json({
          message: "Email already in use",
        });
      } else {
        bcrypt
          .genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt).then((hash) => {
              User.create({
                name: name,
                email: email,
                password: hash,
                roleid: roleid,
              })
                .then((result) => {
                  res.status(201).json({
                    message: "User created",
                    info: result,
                  });
                })
                .catch((err) => {
                  if (parseInt(err.original.code) === 23503) {
                    res.status(400).json({
                      message: "The role id is not a foreignKey",
                      detail: err.original.detail,
                    });
                  } else {
                    res.status(500).json({
                      message: err.message,
                    });
                  }
                });
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

const deleteUser = (req, res, next) => {
  let id = req.params.id;
  id = id.trim();

  const schema = {
    id: { type: "uuid" },
  };

  const vResponse = v.validate({ id: id }, schema);

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }

  User.destroy({ where: { id: id } })
    .then((result) => {
      if (parseInt(result) > 0) {
        res.status(200).json({
          message: "User deleted with success!",
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

const getllAllUsers = (req, res, next) => {
  User.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

const getUserById = (req, res, next) => {
  let id = req.params.id;

  const schema = {
    id: { type: "uuid" },
  };

  const vResponse = v.validate({ id: id }, schema);

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }

  id = id.trim();

  User.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

const updateUser = async (req, res, next) => {
  let updateFields = {};

  let id = req.params.id;
  let { name, email, password, roleid } = req.body;

  const idValidate = v.validate({ id: id }, { id: { type: "uuid" } });

  if (idValidate !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: idValidate,
    });
  }

  id = id.trim();

  if (name) {
    const vResponse = v.validate({ name: name }, { name: { type: "string", min: 3, max: 255 } });
    if (vResponse !== true) {
      return res.status(400).json({
        message: "Validation error",
        errors: vResponse,
      });
    }
    updateFields.name = name.trim();
  }
  if (email) {
    const vResponse = v.validate({ email: email }, { email: { type: "email" } });

    if (vResponse !== true) {
      return res.status(400).json({
        message: "Validation error",
        errors: vResponse,
      });
    }
    updateFields.email = email.trim();
  }
  if (password) {
    const vResponse = v.validate({ password: password }, { password: { type: "string", min: 3, max: 255 } });
    if (vResponse !== true) {
      return res.status(400).json({
        message: "Validation error",
        errors: vResponse,
      });
    }

    updateFields.password = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password.trim(), salt).then((hash) => {
          resolve(hash);
        });
      });
    });
  }
  if (roleid) {
    const vResponse = v.validate({ roleid: roleid }, { roleid: { type: "uuid", optional: false } });

    if (vResponse !== true) {
      return res.status(400).json({
        message: "Validation error",
        errors: vResponse,
      });
    }

    updateFields.roleid = roleid.trim();
  }

  User.update(updateFields, { where: { id: id } })
    .then((result) => {
      if (parseInt(result[0]) > 0) {
        res.status(200).json({
          message: "User updated with success!",
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      if (parseInt(err.original.code) === 23503) {
        res.status(400).json({
          message: "The role id is not a foreignKey",
          detail: err.original.detail,
        });
      } else {
        res.status(500).json({
          message: err.message,
        });
      }
    });
};

module.exports = {
  login,
  insertUser,
  deleteUser,
  getllAllUsers,
  getUserById,
  updateUser,
};
