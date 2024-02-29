const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productHeader: { type: String },
    productPrice: { type: Number },
    quantity: { type: Number },
    totalPrice: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Revenue = mongoose.model("Vendor_Revenue", revenueSchema);

module.exports = { Revenue };
