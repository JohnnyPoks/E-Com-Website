const express = require("express");
const {
  addProductInCart,
  deleteProductInCart,
  getCartProducts,
  deleteCart,
} = require("../controller/cartcontroller");
const { verifyUser } = require("../middleware/middleware");
const router = express.Router();

router
  .route("/")
  .get([verifyUser], getCartProducts)
  .post([verifyUser], addProductInCart);

router.route("/del").post([verifyUser], deleteProductInCart);

router.route("/:id").delete([verifyUser], deleteCart);

module.exports = router;
