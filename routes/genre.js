const express = require("express");
const middleware = require("../middleware/middleware");
const roleController = require("../controllers/roleController.js");
const router = express.Router();

router.get("/", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, roleController.getAll);


module.exports = router;
