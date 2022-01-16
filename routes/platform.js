const express = require("express");
const middleware = require("../middleware/middleware");
const controller = require("../controllers");
const router = express.Router();

router.get("/",  middleware.checkAuth, middleware.checkRole("view"), controller.platform.getAll);
router.get("/:id",  middleware.checkAuth, middleware.checkRole("view"), controller.platform.getById);
router.post("/",  middleware.checkAuth, middleware.checkRole("edit"), controller.platform.create);
router.delete("/:id",  middleware.protectRole, middleware.checkAuth, middleware.checkRole("edit"), controller.platform.deletePlatform);
router.put("/:id",  middleware.protectRole, middleware.checkAuth, middleware.checkRole("edit"), controller.platform.updatePlatform);

module.exports = router;
