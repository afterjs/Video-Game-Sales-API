const Sale = require("../models/sales");
const Games = require("../models/games");
const Genres = require("../models/genres");
const Platform = require("../models/platforms");

const Validator = require("fastest-validator");
const v = new Validator();

let getAllWithLabel = (req, res, next) => {
  Sale.findAll({
    attributes: ["id", "rank", "createdAt", "updatedAt"],
    include: [
      {
        model: Games,
        attributes: ["name"],
      },
      {
        model: Genres,
        attributes: ["name"],
      },
      {
        model: Platform,
        attributes: ["name"],
      },
    ],
  })
    .then((result) => {
      let data = result.map((item) => {
        return {
          id: item.id,
          rank: item.rank,
          game: item.game.name,
          genre: item.genre.name,
          platform: item.platform.name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });

      return res.status(200).json({
        message: "Sales fetched successfully",
        result: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

let getAllWithLabelById = (req, res, next) => {
  let id = req.params.id;

  const vResponse = v.validate({ id: id }, { id: { type: "uuid" } });

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }
  id = id.trim();

  Sale.findByPk(id, {
    attributes: ["id", "rank", "createdAt", "updatedAt"],
    include: [
      {
        model: Games,
        attributes: ["name"],
      },
      {
        model: Genres,
        attributes: ["name"],
      },
      {
        model: Platform,
        attributes: ["name"],
      },
    ],
  })
    .then((result) => {
      if (result) {
        let data = {
          id: result.id,
          rank: result.rank,
          game: result.game.name,
          genre: result.genre.name,
          platform: result.platform.name,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        };

        return res.status(200).json({
          message: "Sales fetched successfully",
          result: data,
        });
      } else {
        return res.status(404).json({
          message: "Sale not found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

let getAllWithoutLabel = (req, res, next) => {
  Sale.findAll()
    .then((result) => {
      if (result) {
        return res.status(200).json({
          message: "Sales fetched successfully",
          result: result,
        });
      } else {
        return res.status(404).json({
          message: "Sale not found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

let getAllWithoutLabelById = (req, res, next) => {
  let id = req.params.id;

  const vResponse = v.validate({ id: id }, { id: { type: "uuid" } });

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }
  id = id.trim();

  Sale.findByPk(id)
    .then((result) => {
      if (result) {
        return res.status(200).json({
          message: "Sales fetched successfully",
          result: result,
        });
      } else {
        return res.status(404).json({
          message: "Sale not found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

let deleteSales = (req, res, next) => {
  let id = req.params.id;

  const vResponse = v.validate({ id: id }, { id: { type: "uuid" } });

  if (vResponse !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: vResponse,
    });
  }
  id = id.trim();

  Sale.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      if (result > 0) {
        return res.status(200).json({
          message: "Sale deleted successfully",
        });
      } else {
        return res.status(404).json({
          message: "The sale with the given ID was not found.",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

let updateSale = (req, res, next) => {
  let updateFields = {};

  let id = req.params.id;
  let { genreid, platformid, gameid } = req.body;

  const idValidate = v.validate({ id: id }, { id: { type: "uuid" } });

  if (idValidate !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: idValidate,
    });
  }

  id = id.trim();

  if (genreid) {
    const vResponse = v.validate({ genreid: genreid }, { genreid: { type: "uuid" } });
    if (vResponse !== true) {
      return res.status(400).json({
        message: "Validation error",
        errors: vResponse,
      });
    } else {
      updateFields.genreid = genreid;
    }
  }

  if (platformid) {
    const vResponse = v.validate({ platformid: platformid }, { platformid: { type: "uuid" } });
    if (vResponse !== true) {
      return res.status(400).json({
        message: "Validation error",
        errors: vResponse,
      });
    } else {
      updateFields.platformid = platformid;
    }
  }

  if (gameid) {
    const vResponse = v.validate({ gameid: gameid }, { gameid: { type: "uuid" } });
    if (vResponse !== true) {
      return res.status(400).json({
        message: "Validation error",
        errors: vResponse,
      });
    } else {
      updateFields.gameid = gameid;
    }
  }

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({
      message: "No fields to update",
    });
  } else {
    Sale.update(updateFields, {
      where: {
        id: id,
      },
    })
      .then((result) => {
        if (result[0] > 0) {
          return res.status(200).json({
            message: "Sale updated successfully",
            data: {
              id: id,
              ...updateFields,
            },
          });
        } else {
          return res.status(404).json({
            message: "The sale with the given ID was not found.",
          });
        }
      })
      .catch((err) => {
        if (parseInt(err.original.code) === 23503) {
          return res.status(400).json({
            message: "The role id is not a foreignKey",
            detail: err.original.detail,
          });
        } else {
          return res.status(500).json({
            message: err.message,
          });
        }
      });
  }
};

let createSale = (req, res, next) => {
  const { rank, genreid, platformid, gameid } = req.body;

  const data = {
    rank: rank,
    genreid: genreid,
    platformid: platformid,
    gameid: gameid,
  };

  const requiredSchema = {
    rank: { type: "number", positive: true },
    genreid: { type: "uuid" },
    platformid: { type: "uuid" },
    gameid: { type: "uuid" },
  };

  const Validation = v.validate(data, requiredSchema);

  if (Validation !== true) {
    return res.status(400).json({
      message: "Validation error",
      errors: Validation,
    });
  }

  Sale.findOne({
    where: {
      rank: data.rank,
      genreid: data.genreid,
      platformid: data.platformid,
      gameid: data.gameid,
    },
  }).then((result) => {
    if (result) {
      return res.status(400).json({
        message: "Sale already exists",
      });
    } else {

      Sale.create(data)
        .then((result) => {
          return res.status(201).json({
            message: "Sale created successfully",
            data: result,
          });
        })
        .catch((err) => {
          if (parseInt(err.original.code) === 23503) {
            return res.status(400).json({
              message: "The role id is not a foreignKey",
              detail: err.original.detail,
            });
          } else if (parseInt(err.original.code) === 23505) {
            return res.status(400).json({
              message: "The rank is already taken",
              detail: err.original.detail,
            });
          } else {
            return res.status(500).json({
              message: err.message,
              error: err,
            });
          }
        });
    }
  });
};

module.exports = {
  getAllWithLabel,
  getAllWithoutLabel,
  getAllWithLabelById,
  getAllWithoutLabelById,
  deleteSales,
  updateSale,
  createSale,
};
