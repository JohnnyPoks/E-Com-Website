const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { sendResponseError } = require("../middleware/middleware");
const { checkPassword, newToken } = require("../Authentication/Authenticate");

const signUpUser = async (req, res) => {
  // console.log(req.body);

  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const userData = await User.create({ ...req.body, password: hash });
    // console.log(userData);

    res
      .status(201)
      .send({ status: "ok"});
    return;
  } catch (err) {
    sendResponseError(500, "Something wrong please try again", res);
    console.error("Error in signUpUser", err);
    return;
  }
};

const signInUser = async (req, res) => {
  const { password, email } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      sendResponseError(400, "You have to Sign up first !", res);
    }

    const same = await checkPassword(password, user.password);
    if (user) {
      let token = newToken(user);
      res.status(200).send({ status: "ok", token, user });
      return;
    }
    sendResponseError(400, "InValid password !", res);
  } catch (err) {
    sendResponseError(500, "Something wrong please try again", res);
    console.error("Error in signInUser", err);
  }
};

const getUser = async (req, res) => {
  res.status(200).send({ user: req.user });
};
module.exports = { signUpUser, signInUser, getUser };
