const express = require("express");
const middleware = require("../middleware/middleware");
const controller = require("../controllers");
const router = express.Router();

router.get("/", middleware.checkAuth, middleware.checkRole("view"), controller.game.getAll);
router.get("/:id", middleware.checkAuth, middleware.checkRole("view"), controller.game.getById);
router.post("/", middleware.checkAuth, middleware.checkRole("edit"), controller.game.create);
router.put("/:id", middleware.checkAuth, middleware.checkRole("edit"), controller.game.updateGame);
router.delete("/:id", middleware.checkAuth, middleware.checkRole("edit"), controller.game.deleteGame);

module.exports = router;
