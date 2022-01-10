const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config/config");
const userRoute = require("./routes/user");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./documentation/swagger.json");

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

swaggerDocument.host = `${config.hostname}:${config.port}`;

var options = {
  customCss: ".models {display: none !important}",
};

app.use(`${config.routePrefix}/user`, userRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    let formattedError = {
      status: err.statusCode,
      message: "Json Syntax Error",
      body: err.body,
    };
    return res.status(err.statusCode).json(formattedError); // Bad request
  }
  next();
});

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
