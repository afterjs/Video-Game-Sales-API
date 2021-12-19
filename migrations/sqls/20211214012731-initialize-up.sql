CREATE TABLE perms_roles(
    id INTEGER NOT NULL,
    label varchar(100) NOT NULL,
    "updatedAt" timestamp with time zone,
    "createdAt" timestamp with time zone,
    PRIMARY KEY (id)
);

CREATE TABLE users(
    id varchar(100) NOT NULL,
    email  varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    name varchar(100) NOT NULL,
    permissions INTEGER NOT NULL,
    "updatedAt" timestamp with time zone,
    "createdAt" timestamp with time zone,
    PRIMARY KEY(id),
    FOREIGN KEY(permissions) REFERENCES perms_roles (id)
);
