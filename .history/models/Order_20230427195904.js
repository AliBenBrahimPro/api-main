const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    username:{type:String},
    email:{type:String},
    products: [
      {
        productId: {
          type: String,
        },
        Image:{
          type:String
        },
        productname:{
          type:String
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price:{
          type:Number,
        }
      },
    ],
    phone:{type:Number},
    date:{type:Date },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    paymentMethod:{type:String},
    status: { type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
