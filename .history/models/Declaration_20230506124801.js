
const mongoose = require("mongoose");

const Declaration = new mongoose.Schema(
  {
    Declaration:{type:Number},
    date:{type:date},
  },
  { timestamps: true }
);

module.exports = mongoose.model("otherInfo", otherInfo);