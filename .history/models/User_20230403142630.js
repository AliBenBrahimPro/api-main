const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
       type: String,
        required: true,
         unique: true },
         
    email: { type: String,
       required: true, 
       unique: true },
    phone:{
      type:Number,
  },
  state:{
      type:String,
  },
  city:{
      type:String,
  },
  address:{
      type:String,
  
  } ,
  PostalCode:{
      type:String,
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
