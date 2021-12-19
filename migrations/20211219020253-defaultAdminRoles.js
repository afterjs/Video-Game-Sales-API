"use strict";

var dbm;
var type;
var seed;
const AdminRoles = require("../models/AdminRoles");

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

  const adminSchema = [
    {
      id: 1,
      label: "View",
    },
    {
      id: 2,
      label: "Edit",
    },
    {
      id: 3,
      label: "Admin",
    },
  ]
    
    AdminRoles.bulkCreate(adminSchema)
    .then((res) => {
      console.log("Default Admin Roles Added");
    })
    .catch((err) => {
    console.log(`Error - ${err}`);
    });
  return null;
};

exports.down = function (db) {
  AdminRoles.drop();
  console.log("Admin Roles table dropped;")
  return null;
};

exports._meta = {
  version: 1,
};
