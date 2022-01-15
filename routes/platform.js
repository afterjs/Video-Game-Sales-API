const express = require("express");
const middleware = require("../middleware/middleware");
const platformController = require("../controllers/platformController");
const router = express.Router();

router.get("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole("view"), platformController.getAll);
router.get("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("view"), platformController.getById);
router.post("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole("edit"), platformController.create);
router.delete("/:id", middleware.logMethod, middleware.protectRole, middleware.checkAuth, middleware.checkRole("edit"), platformController.deletePlatform);
router.put("/:id", middleware.logMethod, middleware.protectRole, middleware.checkAuth, middleware.checkRole("edit"), platformController.updatePlatform);

module.exports = router;
