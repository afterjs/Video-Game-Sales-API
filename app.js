const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config/config");

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

const userRoute = require("./routes/user");

app.use("/api/v1/user", userRoute);

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));

