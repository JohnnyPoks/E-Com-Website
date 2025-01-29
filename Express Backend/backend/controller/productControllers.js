const Product = require("../models/Product");
const { redisClient } = require("../middleware/cache");
const { sendResponseError } = require("../middleware/middleware");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      throw "No products found";
    }
    await redisClient.set(
      `${process.env.KEY}`,
      JSON.stringify({ status: "ok", products }),
      {
        EX: 300,
        NX: true,
      }
    );
    console.log("Products data cached");

    res.status(200).send({ status: "ok", products });
  } catch (error) {
    sendResponseError(500, "Could not fetch products. Please try again", res);
    console.error("Error in getProducts", error);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).send({ status: "ok", product });
  } catch (error) {
    sendResponseError(500, "Could not fetch product. Please try again", res);
    console.error("Error in getProductById", error);
  }
};

module.exports = {
  getProducts,
  getProductById,
};
