const Game = require("../models/games");
const Validator = require("fastest-validator");
const v = new Validator();

let getAll = (req, res, next) => {
  Game.findAll()
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

  Game.findByPk(id)
    .then((result) => {
      if (result) {
        return res.status(200).json({
          message: "Game found successfully",
          result: result,
        });
      } else {
        return res.status(404).json({
          message: "Game not found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

let create = (req, res, next) => {
  let name = req.body.name;

  const vResponse = v.validate({ name: name }, { name: { type: "string", min: 3, max: 255, required: true } });
  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }
  name = name.trim().replace(/"/g, "").toLocaleLowerCase();

  Game.create({
    name: name,
  })
    .then((result) => {
      return res.status(200).json({
        message: "Game created successfully",
        result: result,
      });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(500).json({
          message: "This game already exists",
        });
      } else {
        return res.status(500).json({
          message: err.message,
        });
      }
    });
};

let updateGame = (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name;

  const schema = {
    id: { type: "uuid" },
    name: { type: "string", min: 3, max: 255, required: true },
  };

  const vResponse = v.validate({ id: id, name: name }, schema);

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }

  name = name.trim().replace(/"/g, "").toLocaleLowerCase();

  id = id.trim();

  Game.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      if (result[0] > 0) {
        return res.status(200).json({
          message: "Game updated successfully",
        });
      } else {
        return res.status(404).json({
          message: "The game with the given ID was not found.",
        });
      }
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(500).json({
          message: "This game already exists",
        });
      } else {
        return res.status(500).json({
          message: err.message,
        });
      }
    });
};

let deleteGame = (req, res, next) => {
  let id = req.params.id;

  const vResponse = v.validate({ id: id }, { id: { type: "uuid" } });

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }
  id = id.trim();

  Game.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log(result);
      if (result > 0) {
        return res.status(200).json({
          message: "Game deleted successfully",
        });
      } else {
        return res.status(404).json({
          message: "The Game with the given ID was not found.",
        });
      }
    })
    .catch((err) => {
      if (err.name === "SequelizeForeignKeyConstraintError") {
        return res.status(500).json({
          message: "You can't delete a foreign key that is in use",
        });
      } else {
        return res.status(500).json({
          message: err.message,
        });
      }
    });
};

module.exports = {
  getAll,
  getById,
  create,
  updateGame,
  deleteGame,
};
