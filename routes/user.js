const express = require("express");
const middleware = require("../middleware/middleware");
const controller = require("../controllers");
const router = express.Router();

router.post("/login", middleware.logMethod, controller.user.login);
router.post("/", middleware.checkAuth, middleware.checkRole("admin"), controller.user.insertUser);
router.get("/", middleware.checkAuth, middleware.checkRole("admin"), controller.user.getllAllUsers);
router.get("/:id", middleware.checkAuth, middleware.checkRole("admin"), controller.user.getUserById);
router.delete("/:id", middleware.checkAuth, middleware.checkRole("admin"), controller.user.deleteUser);
router.put("/:id", middleware.checkAuth, middleware.checkRole("admin"), controller.user.updateUser);

module.exports = router;
