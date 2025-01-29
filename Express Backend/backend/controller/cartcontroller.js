const Cart = require("../models/Cart");
const { sendResponseError } = require("../middleware/middleware");

const getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.user._id }).populate(
      "cartProducts.productId"
    );
    // console.log({...carts})
    res.status(200).send({ status: "ok", cart: carts });
  } catch (err) {
    sendResponseError(500, "Could not fetch cart. Please try again", res);
    console.error("Error in getCartProducts", err);
  }
};

const addProductInCart = async (req, res) => {
  console.log(req.body);

  const { userId, productId, productName, count } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        cartProducts: [{ productId, productName, count }],
      });
    } else {
      const existingProduct = cart.cartProducts.find(
        (product) => product.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.count = count;
      } else {
        cart.cartProducts.push({ productId, productName, count });
      }
    }

    const response = await cart.save();
    // console.log(response);

    response && res.status(201).send({ status: "ok" });
  } catch (err) {
    sendResponseError(500, "Could not add product. Please try again", res);
    console.error("Error in addProductInCart", err);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    // console.log(req.body);
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });
    const newCartProducts = cart.cartProducts.filter((item) => {
      return item && item.productId.toString() !== productId;
    });

    if (newCartProducts.length > 0) {
      cart.cartProducts = [...newCartProducts];
      const response = await cart.save();
      // console.log("Cart Item deleted", response);
    } else {
      const response = await Cart.findOneAndDelete({ userId });
      // console.log("Cart deleted", response);
    }

    res.status(200).send({ status: "ok" });
  } catch (err) {
    sendResponseError(500, "Could not delete product. Please try again", res);
    console.error("Error in deleteProductInCart : ", err);
  }
};

const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: "ok" });
  } catch (err) {
    sendResponseError(500, "Could not delete cart. Please try again", res);
    console.error("Error in deleteCart : ", err);
  }
};
module.exports = {
  addProductInCart,
  deleteProductInCart,
  getCartProducts,
  deleteCart,
};
