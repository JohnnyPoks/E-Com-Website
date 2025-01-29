const paymentGateway = require("./paymentGateway");
const { verifyUser } = require("../middleware/middleware");
const express = require("express");

const router = express.Router();

router.post("/", [verifyUser], paymentGateway);

module.exports = router;
