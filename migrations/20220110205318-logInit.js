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
  db.runSql(
    `
    CREATE TABLE IF NOT EXISTS logs
(
    id uuid NOT NULL,
    remoteaddress character varying(255) COLLATE pg_catalog."default" NOT NULL,
    method character varying(255) COLLATE pg_catalog."default" NOT NULL,
    path character varying(255) COLLATE pg_catalog."default" NOT NULL,
    usernameid character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT logs_pkey PRIMARY KEY (id)
)
`,
    function (err) {
      if (err) return console.log(err);
      callback();
    }
  );
};

exports.down = function (db, callback) {
  db.runSql("DROP TABLE IF EXISTS logs;", function (err) {
    if (err) return console.log(err);
    callback();
  });
};

exports._meta = {
  version: 1,
};
