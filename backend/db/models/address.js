const mongoose = require("mongoose");

// Address Schema
const addressSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  unitNumber: {
    type: String,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    trim: true,
    min: 1,
  },
  pincode: {
    type: String,
    trim: true,
    required: true,
  },
  addressType: {
    type: String,
    require: true,
    enum: ["Home", "Office"],
    require: true,
    default: "House",
  },
  phoneNumber: {
    type: String,
    trim: true,
    min: 10,
    required: true,
  },
  alternatePhone: {
    type: Number,
    trim: true,
    min: 10,
  },
  isDefault:{
      type: Boolean,
      default: false
  }
});

// User Address Schema
const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", userAddressSchema);

module.exports = { Address };
