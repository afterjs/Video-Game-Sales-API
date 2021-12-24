const express = require("express");
const middleware = require("../middleware/middleware");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/login", userController.login);
router.post("/", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, userController.insertUser);
router.delete("/:id", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, userController.deleteUser);
router.get("/", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, userController.getllAllUsers);
router.put("/:id", middleware.logMethod, middleware.checkAuth, middleware.isAdmin, userController.updateUser);


module.exports = router;
