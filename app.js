const express = require("express");
const cors = require("cors");
const app = express();

const config = require("./config");

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

const Users = require("./models/users");

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
