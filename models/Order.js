const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    
 
  
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
    date:{type:Date },
    amount: { type: Number, required: true },
    paymentMethod:{type:String},
    isDelivered: {type: Boolean,default: false},
    deliveredAt: {type: Date},
    isPaid: {type: Boolean,default: false},
    paidAt: {type: Date},
    status: { type: String},
    userId:{
      type: mongoose.Schema.ObjectId,
      ref:'User',
      required:[true,'Order must be belong to parent User'],
  }
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
