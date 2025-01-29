const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
} = require("../controller/productControllers");
const { cacheData } = require("../middleware/cache");

router.get("/", cacheData, getProducts);
router.get("/:id", getProductById);

module.exports = router;
