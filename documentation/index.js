const config = require("../config/config");
const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

swaggerDocument.host = `${config.hostname}:${config.port}`;

var options = {
  customCss: ".models {display: none !important}",
};

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.listen(config.swaggerPort || 3001, () => {
  console.log(`swagger server is listening on port ${config.swaggerPort || 3001}`);
});
