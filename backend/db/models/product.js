const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    detailHeader: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      required: [true, "Enter a valid number"],
      maxLength: [3, "Stock cannot exceed 3 characters"],
      default: 1,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productTags: {
      tag: [String],
    },

    product_spec: {
      key: [String],
      value: [String],
    },

    productPictures: [{ img: { type: String } }],
    slug: {
      type: String,
      //required: true,
      //unique: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", //Getting category id from Category table
      required: [true],
    },

    categoryName: {
      type: String,
    },

    productDescription: {
      description: [String],
    },

    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //Getting user Id from User table
        review: String,
      },
    ],

    //Getting seller Id from User table
    productSoldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //Setting the product status. Default is true i.e Visible
    isActive: {
      type: Boolean,
      default: 1,
    },

    unitsSold: {
      type: Number,
      default: 0,
    },

    totalSales:{
      type:Number,
      default:0
    },

    updatedAt: Date,
  },

  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
