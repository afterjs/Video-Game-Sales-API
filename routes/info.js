const express = require("express");
const middleware = require("../middleware/middleware");
const controller = require("../controllers");
const router = express.Router();

router.get("/",  middleware.checkAuth, middleware.checkRole("view"), controller.info.getVersion);


module.exports = router;