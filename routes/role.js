const express = require("express");
const middleware = require("../middleware/middleware");
const roleController = require("../controllers/roleController.js");
const router = express.Router();

router.get("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole("admin"), roleController.getAll);
router.get("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("admin"), roleController.getById);
router.post("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole("admin"), roleController.create);
router.delete("/:id", middleware.logMethod, middleware.protectRole, middleware.checkAuth, middleware.checkRole("admin"), roleController.deleteRole);
router.put("/:id", middleware.logMethod, middleware.protectRole, middleware.checkAuth, middleware.checkRole("admin"), roleController.updateRole);

module.exports = router;
