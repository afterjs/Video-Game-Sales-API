const express = require("express");
const middleware = require("../middleware/middleware");
const controller = require("../controllers");
const router = express.Router();

router.get("/",  middleware.checkAuth, middleware.checkRole("view"), controller.genre.getAll);
router.get("/:id",  middleware.checkAuth, middleware.checkRole("view"), controller.genre.getById);
router.post("/",  middleware.checkAuth, middleware.checkRole("edit"), controller.genre.create);
router.put("/:id",  middleware.checkAuth, middleware.checkRole("edit"), controller.genre.updateGenre);
router.delete("/:id",  middleware.checkAuth, middleware.checkRole("edit"), controller.genre.deleteGenre);


module.exports = router;