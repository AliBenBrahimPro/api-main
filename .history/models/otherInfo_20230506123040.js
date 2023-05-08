
const mongoose = require("mongoose");

const otherInfo = new mongoose.Schema(
  {
    Declaration:{type:N}
  },
  { timestamps: true }
);

module.exports = mongoose.model("otherInfo", otherInfo);