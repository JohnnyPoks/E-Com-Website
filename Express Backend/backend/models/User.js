const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: String,
    phoneNumber: String,
    address: String,
    city: String,
    country: String,
    zip: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
