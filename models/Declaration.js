
const mongoose = require("mongoose");
const Declaration = new mongoose.Schema(
  {
    Declaration:{type:Number},
    date:{type:Date},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Declaration", Declaration);