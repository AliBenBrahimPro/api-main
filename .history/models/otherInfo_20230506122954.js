
const mongoose = require("mongoose");

const otherInfo = new mongoose.Schema(
  {
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("otherInfo", otherInfo);