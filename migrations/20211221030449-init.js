"use strict";

var dbm;
var type;
var seed;

var bcrypt = require("bcryptjs");
const database = require("../config/database");
const exec = require("child_process").exec;

const User = require("../models/users");
const Roles = require("../models/roles");
const Genre = require("../models/genres");
const Plataform = require("../models/plataforms");
const Game = require("../models/games");
const Sales = require("../models/sales");

//const Migrations = require("../models/db-migrate/migrations")

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  syncDataBase();
  return null;
};
let syncDataBase = async () => {
  await database.sync({ force: true }).then(() => {
    console.log("\n");
    console.log("--------------------------------");
    console.log("Successfully Database synced!");
    console.log("--------------------------------");
    console.log("\n");
    insertRoles();
  });
};

let insertRoles = async () => {
  const roles = [
    {
      name: "View",
    },
    {
      name: "Edit",
    },
    {
      name: "Admin",
    },
  ];

  await Roles.bulkCreate(roles).then((data) => {
    console.log("\n");
    console.log("--------------------------------");
    console.log("Successfully inserted roles!");
    console.log("--------------------------------");
    console.log("\n");
    var roles = [];
    roles = [data[0].id, data[1].id, data[2].id];
    insertUsers(roles);
  });
};

let insertUsers = async (roles) => {
  var salt = bcrypt.genSaltSync(10);

  const users = [
    {
      email: "view@view.pt",
      name: "Viewer Account",
      password: bcrypt.hashSync("view", salt),
      rolesid: roles[0],
    },
    {
      email: "edit@edit.pt",
      name: "Edit Account",
      password: bcrypt.hashSync("edit", salt),
      rolesid: roles[1],
    },
    {
      email: "admin@admin.pt",
      name: "Admir Account",
      password: bcrypt.hashSync("admin", salt),
      rolesid: roles[2],
    },
  ];

  await User.bulkCreate(users).then(() => {
    console.log("\n");
    console.log("--------------------------------");
    console.log("Successfully inserted users!");
    console.log("--------------------------------");
    console.log("\n");

    console.log("Wait while we are importing all data to sql...");

    var child = exec("npm run readCsv");
    child.stdout.pipe(process.stdout);
    child.on("exit", () => {
      process.exit();
    });


  });
};

exports.down = function (db, callback) {
  (async () => {
    await Promise.all([User.drop(), Roles.drop(), Sales.drop(),Plataform.drop(), Genre.drop(), Game.drop()])
      .then((data) => {
        callback();
      })
      .catch((error) => {
        // oops some error
        return error;
      });
  })();

};

exports._meta = {
  version: 1,
};
