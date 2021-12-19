'use strict';

var dbm;
var type;
var seed;

const User = require('../models/User');
var bcrypt = require('bcryptjs');

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

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync('123456', salt);

  const userSchema = [
    {
      email: 'view@view.pt',
      password: hash,
      name: 'Viewer Account',
      permissions: 1
    },
    {
      email: 'edit@edit.pt',
      password: hash,
      name: 'Edit Account',
      permissions: 1
    },
    {
      email: 'admin@admin.pt',
      password: hash,
      name: 'Admin Account',
      permissions: 3
    }
  ]

  User.bulkCreate(userSchema)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
  });

  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
