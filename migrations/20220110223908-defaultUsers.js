"use strict";

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
  //create 3 hash passwords


  db.runSql(
    `
      INSERT INTO "users" (
        "id",
        "email",
        "name",
        "password",
        "createdAt",
        "updatedAt",
        "roleid"
      ) VALUES 
      ('3b4922ff-aa73-4a3b-b984-1f2f50b49680','view@ipvc.pt','View Account','$2a$10$aF5qFtV7YWn8Z2.4ta32rOv7YM64uAS3unz4ycYtZPFcjxGQHtDqW', now(), now(), 'a5db994d-a5c2-4796-803e-15272c36ad70'),
      ('f639d0d5-59a8-412d-a582-c8bf5c83b23f','edit@ipvc.pt','Edit Account','$2a$10$aF5qFtV7YWn8Z2.4ta32rOiMWnuP3VDZxwalQZnBzd8vLv2aDVxOy', now(), now(), 'c6f86c31-ab68-4cdf-9ee3-e2dfd04d15d8'),
      ('ac1f1735-4d2e-4399-a8be-53bf33d33d31','admin@ipvc.pt','Admin Account','$2a$10$aF5qFtV7YWn8Z2.4ta32rO.16kT.rKehBeXk5ERgTR28uGUxhmTy.', now(), now(), '70ee9863-4f26-4b56-bfac-31a63d258b0d')
   
`,
    function (err) {
      if (err) return console.log(err);
      callback();
    }
  );
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
