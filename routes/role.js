const express = require("express");
const middleware = require("../middleware/middleware");
const controller = require("../controllers");
const router = express.Router();

router.get("/", middleware.checkAuth, middleware.checkRole("admin"), controller.role.getAll);
router.get("/:id", middleware.checkAuth, middleware.checkRole("admin"), controller.role.getById);
router.post("/", middleware.checkAuth, middleware.checkRole("admin"), controller.role.create);
router.delete("/:id", middleware.protectRole, middleware.checkAuth, middleware.checkRole("admin"), controller.role.deleteRole);
router.put("/:id", middleware.protectRole, middleware.checkAuth, middleware.checkRole("admin"), controller.role.updateRole);

module.exports = router;
