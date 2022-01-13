const Genre = require("../models/genre");
const Validator = require("fastest-validator");
const { user } = require("pg/lib/defaults");
const v = new Validator();

let getAll = (req, res, next) => {
  Genre.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
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

  Genre.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Genre found successfully",
          result: result,
        });
      }
      res.status(404).json({
        message: "Genre not found",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

module.exports = {
  getAll,
  getById,
};
