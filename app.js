const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config/config");

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

const userRoute = require("./routes/user");

app.use(`${config.routePrefix}/user`, userRoute);


app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        let formattedError = {
          status: err.statusCode,
          message: "Json Syntax Error",
          body: err.body
        }
        return res.status(err.statusCode).json(formattedError); // Bad request
    }
    next();
});

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));

