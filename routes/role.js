const express = require("express");
const middleware = require("../middleware/middleware");
const roleController = require("../controllers/roleController.js");
const router = express.Router();

router.get("/", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, roleController.getAll);
router.get("/:id", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, roleController.getById);
router.post("/", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, roleController.create);
router.delete("/:id", middleware.logMethod, middleware.protectRole, middleware.checkAuth, middleware.isAdmin, roleController.deleteRole);
router.put("/:id", middleware.logMethod, middleware.protectRole, middleware.checkAuth, middleware.isAdmin, roleController.updateRole);

module.exports = router;
