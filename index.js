const http = require('http');
const app = require('./app.js');
const config = require("./config/config");


const server = http.createServer(app);
server.listen(config.port, () => console.log(`Server running on port ${config.port}`));

