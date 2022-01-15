const express = require("express");
const middleware = require("../middleware/middleware");
const gameController = require("../controllers/gameController.js");
const router = express.Router();

router.get("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole("view"), gameController.getAll);
router.get("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("view"), gameController.getById);
router.post("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole("edit"), gameController.create);
router.put("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("edit"), gameController.updateGame);
router.delete("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("edit"), gameController.deleteGame);


module.exports = router;