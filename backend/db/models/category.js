const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      //Name of the categoy
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    categoryImage: {
      type: String,
    },
    //==================================================================================================
    //Parent id of the category. Null if its the main category and not null if its a Subcategory
    //Eg :-   {id: 1,
    //        name: Electronics}
    // SubCat
    //        {id:10,
    //        parentId: 1,
    //        name: Smartphones}
    //==================================================================================================

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Category"
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
