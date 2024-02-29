const mongoose = require("mongoose");

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
    },
    selectedAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addressSchema",
    },
    totalPrice: {
      type: Number,
    },
    cartItems: [
      {
        productId: { type: String },
        vendorId: { type: String },
        productPictures: [{ img: { type: String } }],
        productName: { type: String },
        productPrice: { type: Number },
        quantity: { type: Number },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Cancelled", "Initiated"],
    },

    paymentMode: {
      type: String,
      enum: ["COD", "UPI", "Net banking", "Debit card", "Credit card"],
      required: true,
    },
    paymentId: {
      type: String,
    },
    orderStatus: {
      type: String,
      enum: [
        // "initiated",
        "Packed",
        // "pending",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        // "cancelled",
      ],
      //default: "initiated",
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

//details for vendor
const orderDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendorId: { type: String },
    cartItems: [
      {
        productId: { type: String }, //TODO: to be replaced by product id from product table
        productName: { type: String },
        productPrice: { type: Number },
        quantity: { type: Number },
      },
    ],
    userName: { type: String },
    paymentMode: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const OrderDetails = mongoose.model("order_details", orderDetailsSchema);

module.exports = { Order, OrderDetails };
