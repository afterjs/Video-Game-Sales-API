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
 /* db.runSql(`
  CREATE TABLE IF NOT EXISTS users
  (
      id uuid NOT NULL,
      email character varying(255) COLLATE pg_catalog."default" NOT NULL,
      name character varying(255) COLLATE pg_catalog."default" NOT NULL,
      password character varying(255) COLLATE pg_catalog."default" NOT NULL,
      "createdAt" timestamp with time zone NOT NULL,
      "updatedAt" timestamp with time zone NOT NULL,
      roleid uuid,
      CONSTRAINT users_pkey PRIMARY KEY (id),
      CONSTRAINT users_roleid_fkey FOREIGN KEY (roleid)
          REFERENCES roles (id) MATCH SIMPLE
          ON UPDATE CASCADE
          ON DELETE SET NULL
  )
`, function (err) {
    if (err) return console.log(err);
    callback();
  });*/
  return null
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
