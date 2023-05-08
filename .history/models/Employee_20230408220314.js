
const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
    dob:{
      type:Date
    },
    phone:{
      
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employees", employeesSchema);