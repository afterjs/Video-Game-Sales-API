const jwt = require("jsonwebtoken");
const User = require("../models/users");
const config = require("../config/config");
const repo = require("../config/repository");
const Logs = require("../models/logs");

const checkAuth = (req, res, next) => {
  getToken(req, res).then((result) => {
    let usernameId = result.id;
    let remoteAddress = req.socket.remoteAddress;
    let method = req.method;
    let originalUrl = req.originalUrl;

    path = config.hostname_port + originalUrl;

    if (result.statusCode !== 401) {
      Logs.create({
        usernameid: usernameId,
        remoteaddress: remoteAddress,
        method: method,
        path: path,
      });
      return next();
    }
  });
};

const getToken = async (req, res) => {
  let token;
  try {
    token = req.headers.authorization.split(" ")[1];
  } catch (e) {
    return res.status(401).json({
      message: "You need a token to access this resource.",
    });
  }
  try {
    return jwt.verify(token, config.jwtkey, (err, decoded) => {
      if (err) throw new Error(err); // Manage different errors here (Expired, untrusted...)
      return decoded;
    });
  } catch (e) {
    return res.status(401).json({
      name: "Token Expired Error",
      message: "Token expired",
    });
  }
};

const logMethod = async (req, res, next) => {
  let usernameId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  let remoteAddress = req.socket.remoteAddress;
  let method = req.method;
  let originalUrl = req.originalUrl;

  path = config.hostname_port + originalUrl;

  Logs.create({
    usernameid: usernameId,
    remoteaddress: remoteAddress,
    method: method,
    path: path,
  });
  return next();
};

let protectRole = (req, res, next) => {
  let id = req.params.id;
  let adminid = repo.getRoleId("adminId");
  let viewid = repo.getRoleId("viewId");
  let editid = repo.getRoleId("editId");

  if (id !== adminid && id !== viewid && id !== editid) {
    return next();
  } else {
    return res.status(401).json({
      message: "This role is protected.",
    });
  }
};

const checkRole = (roleTypeNeeded) => {
  return (req, res, next) => {
    getToken(req, res).then((result) => {
      if (result.statusCode !== 401) {
        const userId = result.id;

        const adminRoleId = repo.getRoleId("adminId");
        const viewRoleId = repo.getRoleId("viewId");
        const editRoleId = repo.getRoleId("editId");

        User.findByPk(userId)
          .then((result) => {
            if (result) {
              let resultId = result.roleid;

              switch (roleTypeNeeded.trim()) {
                case "admin":
                  if (resultId === adminRoleId.trim()) {
                    return next();
                  } else {
                    return res.status(401).json({
                      name: "Unauthorized Error",
                      message: "You don't have permission to access this resource.",
                    });
                  }
                case "view":
                  if (resultId === viewRoleId.trim() || resultId === adminRoleId.trim() || resultId === editRoleId.trim()) {
                    return next();
                  } else {
                    return res.status(401).json({
                      name: "Unauthorized Error",
                      message: "You don't have permission to access this resource.",
                    });
                  }
                case "edit":
                  if (resultId === adminRoleId.trim() || resultId === editRoleId.trim()) {
                    return next();
                  } else {
                    return res.status(401).json({
                      name: "Unauthorized Error",
                      message: "You don't have permission to access this resource.",
                    });
                  }
                default:
                  return res.status(401).json({
                    name: "Unauthorized Error",
                    message: "You don't have permission to access this resource.",
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
            return res.status(500).json({
              message: err.message,
            });
          });
      }
    });
  };
};

module.exports = {
  checkAuth,
  logMethod,
  protectRole,
  checkRole,
};
