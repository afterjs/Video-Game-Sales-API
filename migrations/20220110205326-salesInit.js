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
    CREATE TABLE IF NOT EXISTS sales
    (
    id uuid NOT NULL,
    rank integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    genreid uuid,
    plataformid uuid,
    gameid uuid,
    CONSTRAINT sales_pkey PRIMARY KEY (id),
    CONSTRAINT sales_gameid_fkey FOREIGN KEY (gameid)
        REFERENCES games (id) MATCH SIMPLE,
    CONSTRAINT sales_genreid_fkey FOREIGN KEY (genreid)
        REFERENCES genres (id) MATCH SIMPLE,
     
    CONSTRAINT sales_plataformid_fkey FOREIGN KEY (plataformid)
        REFERENCES plataforms (id) MATCH SIMPLE

)
`,
    function (err) {
      if (err) return console.log(err);
      callback();
    }
  );
};

exports.down = function (db, callback) {
  db.runSql("DROP TABLE IF EXISTS sales CASCADE;", function (err) {
    if (err) return console.log(err);
    callback();
  });
};
exports._meta = {
  version: 1,
};
