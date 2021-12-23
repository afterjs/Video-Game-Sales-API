const express = require("express");
const cors = require("cors");
const app = express();

const config = require("./config");
const routes = require("./routes")

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));



app.use("/api/v1/user", routes.user)



app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
