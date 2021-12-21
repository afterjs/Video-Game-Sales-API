'use strict';

var dbm;
var type;
var seed;
var bcrypt = require('bcryptjs');
const database = require("../db");


const User = require("../models/users");
const Roles = require("../models/roles");
const Genre = require("../models/genres");
const Plataform = require("../models/plataforms");
const Game = require("../models/games");
const Sales = require("../models/sales");


/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  syncDataBase()
  return null;
};
let syncDataBase = async () => {
  await database.sync({ force: true }).then(() => {
    console.log("\n")
    console.log("--------------------------------")
    console.log("Successfully Database synced!");
    console.log("--------------------------------")
    console.log("\n")
    insertRoles();
  })
}

let insertRoles = async () => {
  const roles = [
    {
      id: 1,
      name: "View",
    },
    {
      id: 2,
      name: "Edit",
    },
    {
      id: 3,
      name: "Admin",
    },
  ];

  await Roles.bulkCreate(roles).then(()=> {
    console.log("\n")
    console.log("--------------------------------")
    console.log("Successfully inserted roles!");
    console.log("--------------------------------")
    console.log("\n")
    insertUsers()
  })
}

let insertUsers = async () => {
  var salt = bcrypt.genSaltSync(10);

  const users = [
    {
      email: "view@view.pt",
      name: "Viewer Account",
      password: bcrypt.hashSync("view", salt),
      rolesid: 1,
    },
    {
      email: "edit@edit.pt",
      name: "Edit Account",
      password: bcrypt.hashSync("edit", salt),
      rolesid: 2,
    },
    {
      email: "admin@admin.pt",
      name: "Admir Account",
      password: bcrypt.hashSync("admin", salt),
      rolesid: 3,
    },
  ];
    await User.bulkCreate(users).then(()=> {
      console.log("\n")
      console.log("--------------------------------")
      console.log("Successfully inserted users!");
      console.log("--------------------------------")
      console.log("\n")
    })
}

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
