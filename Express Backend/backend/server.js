require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoute = require("./Api/paymentRoute");
const { connectDB } = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");

// const data = require("./data/products");

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoute);

const PORT = process.env.PORT || 7070;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
