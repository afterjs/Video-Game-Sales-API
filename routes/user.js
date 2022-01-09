const express = require("express");
const middleware = require("../middleware/middleware");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/login", middleware.logMethod, userController.login);
router.post("/", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, userController.insertUser);
router.get("/", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, userController.getllAllUsers);
router.get("/:id", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, userController.getUserById);
router.delete("/:id", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, userController.deleteUser);
router.put("/:id", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, userController.updateUser);


module.exports = router;

