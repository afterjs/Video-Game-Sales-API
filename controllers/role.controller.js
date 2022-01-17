const Roles = require("../models/roles");
const Validator = require("fastest-validator");
const v = new Validator();

let getAll = (req, res, next) => {
  Roles.findAll()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

let getById = async (req, res, next) => {
  let id = req.params.id;

  const vResponse = v.validate({ id: id }, { id: { type: "uuid" } });

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }
  id = id.trim();

  Roles.findByPk(id)
    .then((result) => {
      if (result) {
        return res.status(200).json({
          message: "Role found successfully",
          result: result,
        });
      } else {
        return res.status(404).json({
          message: "Role not found",
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
  name = name.trim();

  Roles.create({
    name: name.toLowerCase(),
  })
    .then((result) => {
      return res.status(200).json({
        message: "Role created successfully",
        result: result,
      });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(500).json({
          message: "This role already exists",
        });
      } else {
        return res.status(500).json({
          message: err.message,
        });
      }
    });
};

let deleteRole = (req, res, next) => {
  let id = req.params.id;

  const vResponse = v.validate({ id: id }, { id: { type: "uuid" } });

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }
  id = id.trim();

  Roles.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log(result);
      if (result > 0) {
        return res.status(200).json({
          message: "Role deleted successfully",
        });
      } else {
        return res.status(404).json({
          message: "The role with the given ID was not found.",
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

let updateRole = (req, res, next) => {
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

  name = name.trim();
  id = id.trim();

  Roles.update(
    {
      name: req.body.name.toLowerCase(),
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
          message: "Role updated successfully",
        });
      } else {
        return res.status(404).json({
          message: "The role with the given ID was not found.",
        });
      }
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(500).json({
          message: "This role already exists",
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
  deleteRole,
  updateRole,
};
