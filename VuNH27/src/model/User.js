const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    id: String,
    username: String,
    password: String,
    role: String,
    email: String,
    fullname: String,
    address: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Users", userSchema);
