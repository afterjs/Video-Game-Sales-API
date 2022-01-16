const express = require("express");
const middleware = require("../middleware/middleware");
const controller = require("../controllers");
const router = express.Router();

router.get("/ij/",  middleware.checkAuth, middleware.checkRole("view"), controller.sale.getAllWithLabel);
router.get("/ij/:id",  middleware.checkAuth, middleware.checkRole("view"), controller.sale.getAllWithLabelById);
router.get("/",  middleware.checkAuth, middleware.checkRole("view"), controller.sale.getAllWithoutLabel);
router.get("/:id",  middleware.checkAuth, middleware.checkRole("view"), controller.sale.getAllWithoutLabelById);
router.put("/:id",  middleware.checkAuth, middleware.checkRole("edit"), controller.sale.updateSale);
router.delete("/:id",  middleware.checkAuth, middleware.checkRole("edit"), controller.sale.deleteSales);
router.post("/",  middleware.checkAuth, middleware.checkRole("edit"), controller.sale.createSale);


module.exports = router;