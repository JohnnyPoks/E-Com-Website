const User = require("../models/User");
const { verifyToken } = require("../Authentication/Authenticate");

const sendResponseError = (statusCode, msg, res) => {
  res.status(statusCode || 400).send({
    status: "error",
    message: msg ? msg : "An error occured at server side",
  });
};

const verifyUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    sendResponseError(400, "You are not authorized ", res);
    return;
  } else if (!authorization.startsWith("Bearer ")) {
    sendResponseError(400, "You are not authorized ", res);
    return;
  }

  try {
    const payload = await verifyToken(authorization.split(" ")[1]);
    // console.log(payload);
    if (payload) {
      const user = await User.findById(payload.id, { password: 0 });

      req["user"] = user;

      next();
    } else {
      sendResponseError(400, `you are not authorizeed`, res);
    }
  } catch (err) {
    sendResponseError(400, "Error User Session Expired", res);
    console.log("Error token expired ");
  }
};

module.exports = {
  sendResponseError,
  verifyUser,
};
