const jwt = require("jsonwebtoken");
const User = require("../models/users");
const config = require("../config/config");
const repo = require("../config/repository");

const checkAuth = (req, res, next) => {
  let token;
  try {
    token = req.headers.authorization.split(" ")[1];
  } catch (e) {
    return res.status(401).json({
      message: "You need a token to access this resource",
    });
  }

  try {
    jwt.verify(token, config.jwtkey, (err, decoded) => {
      if (err) throw new Error(err); // Manage different errors here (Expired, untrusted...)
      req.auth = decoded; // If no error, token info is returned in 'decoded'
      next();
    });
  } catch (e) {
    return res.status(401).json({
      name: "Token Expired Error",
      message: "Token expired",
    });
  }
};

const logMethod = (err, req, res, next) => {
  console.log(`[${req.socket.remoteAddress}] ${req.method} ${req.originalUrl} `);
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
      message: "You don't have permission to access this resource",
    });
  }
};

const checkRole = (roleTypeNeeded) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, config.jwtkey, (err, decoded) => {
        if (err) throw new Error(err);
        const userId = decoded.id;

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
                      message: "You don't have permission to access this resource",
                    });
                  }
                case "view":
                  if (resultId === viewRoleId.trim() || resultId === adminRoleId.trim() || resultId === editRoleId.trim()) {
                    return next();
                  } else {
                    return res.status(401).json({
                      name: "Unauthorized Error",
                      message: "You don't have permission to access this resource",
                    });
                  }
                case "edit":
                  if (resultId === adminRoleId.trim() || resultId === editRoleId.trim()) {
                    return next();
                  } else {
                    return res.status(401).json({
                      name: "Unauthorized Error",
                      message: "You don't have permission to access this resource",
                    });
                  }
                default:
                  return res.status(401).json({
                    name: "Unauthorized Error",
                    message: "You don't have permission to access this resource",
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
      });
    } catch (e) {
      return res.status(401).json({
        name: "TokenExpiredError",
        message: "Token expired",
      });
    }
  };
};

module.exports = {
  checkAuth,
  logMethod,
  protectRole,
  checkRole,
};
