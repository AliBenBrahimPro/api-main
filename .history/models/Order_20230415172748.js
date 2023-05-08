const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    username:{type:String},
    products: [
      {
        productId: {
          type: String,
        },
        productname:{
          type:String
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    phone:{

,    }
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
