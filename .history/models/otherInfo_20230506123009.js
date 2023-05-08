
const mongoose = require("mongoose");

const otherInfo = new mongoose.Schema(
  {
    Declaration 
  },
  { timestamps: true }
);

module.exports = mongoose.model("otherInfo", otherInfo);