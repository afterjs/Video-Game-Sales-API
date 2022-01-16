const express = require("express");
const middleware = require("../middleware/middleware");
const saleController = require("../controllers/saleController");
const router = express.Router();

router.get("/ij/", middleware.logMethod, middleware.checkAuth, middleware.checkRole("view"), saleController.getAllWithLabel);
router.get("/ij/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("view"), saleController.getAllWithLabelById);
router.get("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole("view"), saleController.getAllWithoutLabel);
router.get("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("view"), saleController.getAllWithoutLabelById);
router.put("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("edit"), saleController.updateSale);
router.delete("/:id", middleware.logMethod, middleware.checkAuth, middleware.checkRole("edit"), saleController.deleteSales);
router.post("/", middleware.logMethod, middleware.checkAuth, middleware.checkRole("edit"), saleController.createSale);


module.exports = router;