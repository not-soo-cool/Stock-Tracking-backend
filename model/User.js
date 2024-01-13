import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "Please Enter your name"],
    maxLength:[30, "Name can not exceed 30 characters"],
    minLength:[4, "Name should have at least 4 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    select: false,
  },

  tiles: [
    {
      title: String,
      size: String,
      quantity: Number,
    },
  ],

  marbles: [
    {
      title: String,
      size: String,
      quantity: Number,
    },
  ],

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ],

});

export const User = mongoose.model("User", userSchema);