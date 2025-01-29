const { sendResponseError } = require("../middleware/middleware");
const axios = require("axios");

const baseUrl = process.env.BASE_URL;
const headers = {
  apiuser: process.env.API_USER,
  apikey: process.env.API_KEY,
};

const paymentGateway = async (req, res) => {
  // console.log(req.body);
  // console.log(baseUrl);

  try {
    // const response = await fetch(`${baseUrl}/direct-pay`, {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(req.body),
    // });

    const response = await axios.post(`${baseUrl}/direct-pay`, req.body, {
      headers: headers,
    });
    // const data = await response.text();
    console.log(response.data);

    res.status(200).send({
      status: "ok",
      data: response.data,
    });
  } catch (error) {
    sendResponseError(500, "Payment gateway error. Please try again", res);
    console.error("Payment gateway error", error);
  }
};

module.exports = paymentGateway;
