const express = require("express");
const middleware = require("../middleware/middleware");
const genreController = require("../controllers/genreController.js");
const router = express.Router();

router.get("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole("view"), genreController.getAll);
router.get("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("view"), genreController.getById);
router.post("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole("edit"), genreController.create);
router.put("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("edit"), genreController.updateGenre);
router.delete("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("edit"), genreController.deleteGenre);


module.exports = router;