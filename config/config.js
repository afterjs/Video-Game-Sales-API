require('dotenv').config();

module.exports = {
    port:       process.env.PORT || 3000,
    version:    process.env.VERSION,
    hostname:   process.env.HOSTNAME || "localhost",

    pg: {
        driver : process.env.DRIVER,
        dialect: process.env.DIALECT,
        hostname: process.env.POSTGRES_HOSTNAME,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DATABASE,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        schema : process.env.POSTGRES_SCHEMA
    },
    jwtkey: process.env.JWT_SECRET,
    routePrefix: process.env.ROUTE_PREFIX,
};