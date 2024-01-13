import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orders: [
        {
            prod: String,
            title: String,
            size: String,
            quantity: Number,
        }
    ],
    items: {
        type: Number,
        default: 1
    },
    amount: {
        type: Number,
        default: 1
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});

export const Order = mongoose.model("Order", orderSchema);