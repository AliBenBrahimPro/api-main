const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    ProductName:{
      type:String,
      required:true

  },
  image:{
      type:String,
      required:true,

  },
  description:{
      type:Object,
      required:true,
  },
  Availablity:{
      type:Boolean,
      default:false,
      required:true
  },
  stock:{
      type:Number,
      required:true,
      default:0 
  },
  categories:{
      type:String,
      required:true
  },
  price:{
      type:Number,
      required:true,
      default:0,
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
