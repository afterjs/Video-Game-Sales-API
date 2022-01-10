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
    CREATE TABLE IF NOT EXISTS genres
    (
        id uuid NOT NULL,
        name character varying(255) COLLATE pg_catalog."default" NOT NULL,
        "createdAt" timestamp with time zone NOT NULL,
        "updatedAt" timestamp with time zone NOT NULL,
        CONSTRAINT genres_pkey PRIMARY KEY (id),
        CONSTRAINT genres_name_key UNIQUE (name)
    )
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
