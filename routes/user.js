const express = require("express");
const middleware = require("../middleware/middleware");
const userController = require("../controllers/userController.js");
const router = express.Router();

router.post("/login", middleware.logMethod, userController.login);
router.post("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole('admin'), userController.insertUser);
router.get("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole('admin'), userController.getllAllUsers); 
router.get("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole('admin'), userController.getUserById); 
router.delete("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole('admin'), userController.deleteUser); 
router.put("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole('admin'), userController.updateUser);

module.exports = router;