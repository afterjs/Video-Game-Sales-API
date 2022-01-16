const express = require("express");
const middleware = require("../middleware/middleware");
const controller = require("../controllers");
const router = express.Router();

router.get("/", middleware.checkAuth, middleware.checkRole("admin"), controller.log.getAll);
router.get("/:id", middleware.checkAuth, middleware.checkRole("admin"), controller.log.getById);

module.exports = router;
