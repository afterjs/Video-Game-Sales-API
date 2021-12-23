const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

const userRoute = require("./routes/user");

app.use("/api/v1/user", userRoute);

module.exports = app;
