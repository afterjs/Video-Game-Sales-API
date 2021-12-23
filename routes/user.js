const express = require("express");
const middleware = require("../middleware/middleware");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/login", userController.login);
router.get("/", middleware.logMethod, middleware.checkAuth, userController.teste);

module.exports = router;
