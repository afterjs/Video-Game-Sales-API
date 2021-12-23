const express = require("express");
const cors = require("cors");
const app = express();

const config = require("./config");
const controllers = require("./controllers");
const services = require("./services");

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

[
  ["get", "/api/version", controllers.version.get, {requiresAuth: true}]
  

].forEach((route) => {
  const [method, url, controller, permissions] = route;

  app[method](
    url,
    // middleware para fazer log dos requests
    async (req, res, next) => {
      console.log(`[${req.socket.remoteAddress}] ${req.method} ${url} `);
      return next();
    },

    //middleware para vve

    // middleware para verificar autenticação
    async (req, res, next) => {
      if (!permissions.requiresAuth || (await services.users.canAuth(req.headers))) {
        return next();
      }
      return res.status(401).send({ error: "É necessário colocar email e password válidos nos headers" }).end();
    },
    controller
  );
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
