
const mongoose = require("mongoose");

const otherInfo = new mongoose.Schema(
  {
    Decla
  },
  { timestamps: true }
);

module.exports = mongoose.model("otherInfo", otherInfo);