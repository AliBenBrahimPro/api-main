
const mongoose = require("mongoose");

const otherInfo = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
    dob:{
      type:Date
    },
    phone:{
      type:Number
    },
    address:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("otherInfo", otherInfo);