'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.runSql(
    `
      INSERT INTO "roles" (
        "id",
        "name",
        "createdAt",
        "updatedAt"
      ) VALUES 
      ('a5db994d-a5c2-4796-803e-15272c36ad70','view',now(),now()),
      ('c6f86c31-ab68-4cdf-9ee3-e2dfd04d15d8','edit',now(),now()),
      ('70ee9863-4f26-4b56-bfac-31a63d258b0d','admin',now(),now())
`,
    function (err) {
      if (err) return console.log(err);
      callback();
    }
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
