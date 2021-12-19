CREATE TABLE users(
    uid varchar(100) NOT NULL PRIMARY KEY,
    email  varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    name varchar(100) NOT NULL,
    permissions boolean DEFAULT '0',
   CONSTRAINT foreign key (permissions) references perms_roles(id)
);