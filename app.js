const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config/config");
const userRoute = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./documentation/swagger.json");
const repo = require("./config/repository");


app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

swaggerDocument.host = `${config.hostname}:${config.port}`;

var options = {
  customCss: ".models {display: none !important}",
};

app.use(`${config.routePrefix}/users`, userRoute.user);
app.use(`${config.routePrefix}/roles`, userRoute.role);
app.use(`${config.routePrefix}/genres`, userRoute.genre);
app.use(`${config.routePrefix}/games`, userRoute.game);
app.use(`${config.routePrefix}/platforms`, userRoute.platform);
app.use(`${config.routePrefix}/sales`, userRoute.sale);
app.use(`${config.routePrefix}/logs`, userRoute.log);
app.use(`${config.routePrefix}/infos`, userRoute.info);
app.use(`${config.routePrefix}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

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

app.use(function(req, res) {
  // Invalid request
        res.json({
          error: {
            'name':'Error',
            'message':'Invalid Request',
            'statusCode':404,
            'docs':'http://localhost:3000/api/v1/api-docs'
          },
           message: 'This route does not exist',
        });
  });

repo.loadRolesId().then((val) => {
  app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
});

