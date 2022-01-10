'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.runSql(`
  CREATE TABLE IF NOT EXISTS roles
    (
      id uuid NOT NULL
    )
`, function (err) {
    if (err) return console.log(err);
    callback();
  });
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
