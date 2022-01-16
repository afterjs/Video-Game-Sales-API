const Log = require("../models/logs");

let getAll = (req, res, next) => {
  Log.findAll()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

let getById = (req, res, next) => {
  let id = req.params.id;

  const vResponse = v.validate({ id: id }, { id: { type: "uuid" } });

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }
  id = id.trim();

  Log.findByPk(id)
    .then((result) => {
      if (result) {
        return res.status(200).json({
          message: "Log found successfully",
          result: result,
        });
      } else {
        return res.status(404).json({
          message: "Log not found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

module.exports = {
  getAll,
  getById,
};
